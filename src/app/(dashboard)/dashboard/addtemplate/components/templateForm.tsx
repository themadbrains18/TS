'use client';

import React, { useEffect, useState } from 'react';
import QuillEditor from '@/components/ui/Quilleditor';
import DashInput from './DashInput';
import Button from '@/components/ui/Button';
import FileUpload from './InputFile';
import useFetch from '@/hooks/useFetch';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { subCat } from '@/types/type';
import StaticCheckBox from '@/components/ui/StaticCheckbox';
import { uploadTemplateSchema, uploadTemplateUpdateSchema } from '@/validations/uploadTemplate';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Define types for data structures
 */
export interface TemplateType {
    id: string;
    name: string;
    subCategories: subCat[]
}

interface IndustryType {
    id: string;
    name: string;
}

interface Font {
    name: string;
    url: string;
}
interface FormData {
    title: string;
    version: string;
    seoTags: string;
    price: number;
    templateTypeId: string;
    subCategoryId: string;
    softwareTypeId: string;
    sourceFiles: FileList;
    sliderImages: FileList;
    previewImages: FileList;
    previewMobileImages: FileList;
    description: string;
    industry: string
    techDetails: string[]
    isPaid: boolean

}


interface Font {
    name: string;
    url: string;
}

interface TemplateFormProps {
    initialData?: FormData | {} | any;
    type: 'create' | 'edit';
    id?: string
}



const TemplateForm: React.FC<TemplateFormProps> = ({ initialData, type, id }) => {
    /**
     * Fetch data hooks for template types, subcategories, and industries
     */
    const { data, fetchData, loading } = useFetch<TemplateType[]>();
    const { data: templateData, fetchData: fetchTemplateData, } = useFetch<any>();
    const { data: industryData, fetchData: fetchIndustryData } = useFetch<IndustryType[]>();

    /**
     *  State for fonts, images, icons, and illustrations
     */
    const [fonts, setFonts] = useState<Font[]>([{ name: '', url: '' }]);
    const [images, setImages] = useState<Font[]>([{ name: '', url: '' }]);
    const [icons, setIcons] = useState<Font[]>([{ name: '', url: '' }]);
    const [illustrations, setIllustrations] = useState<Font[]>([{ name: '', url: '' }]);
    const [loader, setLoader] = useState(false)
    /**
     * Technical details state (4 inputs by default)
     */
    const [technicalDetails, setTechnicalDetails] = useState(
        initialData?.techDetails?.length ? initialData?.techDetails : Array(4).fill("")
    );

    const { data: session } = useSession()

    /**
     * Dropdown selection states
     */
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [categoryValue, setCategoryValue] = useState<string | null>(null);
    const [staticcheck, setStaticCheck] = useState<boolean>(initialData?.isPaid || false);
    const [showSoftwareType, setShowSoftwareType] = useState('')



    const { register, handleSubmit, control, formState: { errors }, setValue, clearErrors, setError } = useForm<FormData>({
        defaultValues: { ...initialData },
        resolver: zodResolver(type == "create" ? uploadTemplateSchema : uploadTemplateUpdateSchema)
    });



    /**
     * Handle template dropdown selection
     */
    const handleTemplateSelect = (value: string) => {
        setShowSoftwareType(value);
        setSelectedValue(value);
        setValue("templateTypeId", value)
        fetchTemplateData(`/sub-categories/${value}`);
    };

    /**
     * Handle category dropdown selection
     */
    const handleCategorySelect = (value: string) => {
        setCategoryValue(value);
    };


    useEffect(() => {
        fetchData(`/template-types`);
        fetchIndustryData(`/industry-type`);
    }, [fetchData, fetchIndustryData]);

    useEffect(() => {
        if (initialData) {
            setValue('techDetails', initialData?.techDetails);
            handleTemplateSelect(initialData?.templateTypeId)
            setValue('industry', initialData.industryTypeId)
        }
        if (initialData && initialData?.credits.length > 0) {
            const creditData = initialData?.credits[0];

            setFonts(creditData.fonts || [{ name: '', url: '' }]);
            setImages(creditData.images || [{ name: '', url: '' }]);
            setIcons(creditData.icons || [{ name: '', url: '' }]);
            setIllustrations(creditData.illustrations || [{ name: '', url: '' }]);
        }
    }, [initialData])


    /**
     * Generalized function to add new input fields
     */
    const addInputFields = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, values: T[], isObject: boolean) => {
        const newValue = isObject ? { name: '', url: '' } : '';
        setter([...values, newValue as T]);
    };

    /**
     * Function to handle input field changes
     */
    const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number, value: T, values: T[]) => {
        const newValues = [...values];
        newValues[index] = value;
        setter(newValues);
    };

    /**
     * Function to remove input fields
     */
    const removeInputField = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number, values: T[]) => {

        if (values.length > 1) {
            const newValues = [...values];
            newValues.splice(index, 1);
            setter(newValues);

            if (setter == setTechnicalDetails) {
                newValues.forEach((detail: any, i) => setValue(`techDetails.${i}`, detail));
            }
        }

    };

    /**
     * Function to render input fields
     */
    const renderInputFields = (items: Font[], setter: React.Dispatch<React.SetStateAction<Font[]>>, title: string) => (
        <div className='pb-3'>
            <h4 className='text-lg font-semibold capitalize pb-4'>{title}</h4>
            <div className="p-5 border-b border-neutral-400">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-x-3 pb-3">
                        <DashInput
                            type='text'
                            placeholder='font name'
                            value={item?.name}
                            onChange={(e) => handleInputChange(setter, index, { ...item, name: e.target.value }, items)}
                        />
                        <DashInput
                            type='text'
                            placeholder='font url'
                            value={item.url}
                            onChange={(e) => handleInputChange(setter, index, { ...item, url: e.target.value }, items)}
                        />
                        {items.length > 1 && (
                            <Button
                                onClick={() => removeInputField(setter, index, items)}
                                className="py-1 px-2"
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                ))}
                <Button onClick={() => addInputFields(setter, items, true)} variant='primary' className='py-2 mt-2'>Add more</Button>
            </div>
        </div>
    );
    /**
     * Render technical details fields
     */
    const renderTechnicalDetailsFields = () => (
        <div className='pb-3'>
            <div className="p-5 border-b border-neutral-400">
                {technicalDetails.map((detail: string, index: number) => (
                    <div key={index} className="flex items-center gap-x-3 pb-3">
                        <DashInput
                            type='text'
                            placeholder='Detail Name'
                            value={detail}
                            onChange={(e) => { handleInputChange(setTechnicalDetails, index, e.target.value, technicalDetails); setValue(`techDetails.${index}`, e.target.value); }}
                        />
                        {technicalDetails.length > 4 && (
                            <Button
                                onClick={() => removeInputField(setTechnicalDetails, index, technicalDetails)}
                                className="py-1 px-2" >
                                Remove
                            </Button>
                        )}
                    </div>
                ))}
                <Button onClick={() => { addInputFields(setTechnicalDetails, technicalDetails, false), setValue(`techDetails.${technicalDetails.length}`, ""); }} variant='primary' className='py-2 mt-2'>
                    Add more
                </Button>
            </div>
        </div>
    );

    const router = useRouter();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoader(true)
        const formData = new FormData();



        // Append form fields to FormData
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => formData.append(key, item));
            } else {
                formData.append(key, value);
            }
        });
        formData.delete("industry")
        formData.append('industry', data?.industry);
        const credits = [
            {
                fonts: fonts.map(font => ({ name: font.name, url: font.url })),
                images: images.map(image => ({ name: image.name, url: image.url })),
                icons: icons.map(icon => ({ name: icon.name, url: icon.url })),
                illustrations: illustrations.map(illustration => ({ name: illustration.name, url: illustration.url })),
            }
        ];
        formData.append("credits", JSON.stringify(credits));
        // Append slider images, merging previous URLs with new files
        if (initialData?.sliderImages) {
            initialData.sliderImages.forEach((imgUrl: string) => formData.append("sliderImages", imgUrl));
        }
        if (data?.sliderImages) {
            Array.from(data.sliderImages).forEach((file) => formData.append("sliderImages", file));
        }

        // Append preview mobile images, merging previous URLs with new files
        if (initialData?.previewMobileImages) {
            initialData.previewMobileImages.forEach((imgUrl: string) => formData.append("previewMobileImages", imgUrl));
        }
        if (data?.previewMobileImages) {
            Array.from(data.previewMobileImages).forEach((file) => formData.append("previewMobileImages", file));
        }
        // Append preview mobile images, merging previous URLs with new files
        if (initialData?.previewImages) {
            initialData.previewImages.forEach((imgUrl: string) => formData.append("previewImages", imgUrl));
        }
        if (data?.previewImages) {
            Array.from(data.previewImages).forEach((file) => formData.append("previewImages", file));
        }

        const endpoint = type === 'edit' ? `${process.env.NEXT_PUBLIC_APIURL}/templates/${id}` : `${process.env.NEXT_PUBLIC_APIURL}/templates`;
        const method = type === 'edit' ? 'PUT' : 'POST';

        // Redirect only after fetchData completes
        await fetch(endpoint, {
            method: method, body: formData, headers: {
                'Authorization': `Bearer ${session?.token}`, // Adding Authorization header with Bearer token
            },
        }).then(async (res) => {
            const result = await res.json()
            if (!res?.ok) {
                toast.error(result.message)
                setLoader(false)
            }
            else {
                toast.success(result.message)
                setLoader(false)
                router.push('/dashboard')
            }

        }).catch(error => {
            console.error("An error occurred during submission:", error);
        });
    };

    const goback = () => {
        router?.back()
    }   

    return (

        <>
            <section className='pb-10 md:pb-20'>
                <div className='py-10 border-b border-divider-200 bg-[#ffffff80]' >
                    <div className="container">
                        <div className='flex justify-between items-center' >
                            <Link className="w-[276px]" href={'/'}>
                                <Image
                                    src={"/icons/Logo.svg"}
                                    width={276}
                                    height={40}
                                    alt="Logo"
                                />
                            </Link>
                            <div onClick={goback} >
                                <Icon className="fill-primary-100" name="crossicon" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[802px] w-full py-0 px-4 my-0 mx-auto pt-10">
                    <h2 className='text-3xl capitalize font-bold pb-8 '>Upload Product</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-5 justify-center items-center w-full">
                            {/* Template Type Dropdown */}

                            <div className='w-full'>
                                <label className='text-xl font-semibold capitalize' htmlFor="templateType">Template Type</label>
                                <Controller
                                    name="templateTypeId"
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            className='custom-dropdown-template'
                                            id="templateType"
                                            defaultValue=""
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                handleTemplateSelect(e.target.value);
                                            }}
                                            disabled={type === "edit"}
                                        >
                                            <option value="" disabled>Select Template Type</option>
                                            {data && data?.length > 0 && data?.map((option) => (
                                                <option className='cursor-pointer' key={option.id} value={option.id} >
                                                    {option?.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                />


                                {errors.templateTypeId && (
                                    <p style={{ color: 'red' }}>{errors.templateTypeId.message}</p>
                                )}
                            </div>

                            {/* Template SubCategory Dropdown */}
                            <div className='w-full'>
                                <label className='text-xl font-semibold capitalize' htmlFor="subCategoryId">Template SubCategory</label>
                                <Controller
                                    name="subCategoryId"
                                    control={control}
                                    // defaultValue={"Please select category"} // Set a valid default or empty string
                                    render={({ field }) => (
                                        <select className='custom-dropdown-template' id="subCategoryId"  {...field}
                                            defaultValue=""
                                            onChange={(e) => { field.onChange(e.target.value); handleCategorySelect(e.target.value) }}
                                            disabled={type === "edit"}>
                                            <option value="" disabled>Select SubCategory</option>

                                            {templateData?.subCategories?.map((option: any) => {
                                                return (
                                                    <option className='cursor-pointer' key={option.id} value={option.id}>
                                                        {option?.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    )}
                                />
                                {errors.subCategoryId && <p style={{ color: 'red' }}>{errors.subCategoryId.message}</p>}
                            </div>

                            {/* Software Type Dropdown */}
                            {showSoftwareType !== 'cm207q5lf00025lycfdqrpzzb' && <div className='w-full'>
                                <label className='text-xl font-semibold capitalize' htmlFor="softwareTypeId">Software Type</label>
                                <Controller
                                    name="softwareTypeId"
                                    control={control}
                                    // defaultValue="" // Set a valid default or empty string
                                    render={({ field }) => (
                                        <select defaultValue="" className='custom-dropdown-template' id="softwareTypeId" {...field} onChange={(e) => { field.onChange(e.target.value); handleCategorySelect(e.target.value) }}
                                            disabled={type === "edit"}>
                                            <option value="" disabled>Select Software Type</option>
                                            {templateData?.softwareCategories.map((softwareCategory: any) => {
                                                return (
                                                    <option className='cursor-pointer' key={softwareCategory.id} value={softwareCategory.id}>
                                                        {softwareCategory?.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    )}
                                />
                                {errors.softwareTypeId && <p style={{ color: 'red' }}>{errors.softwareTypeId.message}</p>}
                            </div>}

                        </div>

                        <div className='mt-5'>
                            <h3 className='text-xl font-semibold capitalize '>Industry</h3>

                            <div className='flex justify-between gap-x-3  mb-3 max-w-full overflow-scroll hiddenscroll py-2'>
                                {industryData?.map((item) => (
                                    <Controller
                                        key={item.id} // Add key here for each map iteration
                                        name="industry"
                                        control={control}
                                        render={({ field }) => (
                                            <label htmlFor={item.id} className="my-custom-radio-label capitalize cursor-pointer flex items-center">
                                                <input
                                                    type="radio"
                                                    id={item.id}
                                                    {...field}
                                                    value={item.id}
                                                    defaultChecked={(initialData && 'industryTypeId' in initialData) && initialData?.industryTypeId === item?.id}
                                                    onChange={() => field.onChange(item?.id)}
                                                    className="cursor-pointer"
                                                />
                                                <span className="ml-1 text-nowrap">{item?.name}</span> {/* Label text next to the radio */}
                                            </label>
                                        )}
                                    />
                                ))}
                            </div>
                            {errors.industry && (
                                <p style={{ color: 'red' }}>{errors.industry.message}</p>
                            )}

                            <div className='flex flex-col gap-y-5'>
                                <div className='flex flex-col'>
                                    <label className='text-xl font-semibold capitalize' htmlFor="name">Title</label>
                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue="" // Set default value
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                id='title'
                                                type="text"
                                                className='py-[18px] px-5 border border-neutral-400 rounded-md outline-none placeholder:text-neutral-400 bg-white'
                                                placeholder='Template Name'
                                            />
                                        )}
                                    />
                                    {errors.title && (
                                        <p style={{ color: 'red' }}>{errors.title.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col'>
                                    <label className='text-xl font-semibold capitalize' htmlFor="version">Version</label>
                                    <input
                                        {...register("version")}
                                        id='version'
                                        type="text"
                                        name='version'
                                        className='py-[18px] px-5 border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400 bg-white'
                                        placeholder='version'
                                    />
                                    {errors.version &&
                                        <p style={{ color: 'red' }}>{errors.version.message}</p>
                                    }
                                </div>

                            </div>

                            <div className='mt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>Description</h3>
                                <QuillEditor setValue={setValue} clearErrors={clearErrors} setError={setError} initialValue={initialData?.description} />
                                {errors.description &&
                                    <p style={{ color: 'red', marginTop: "10px" }}>{errors.description.message}</p>
                                }
                            </div>


                            <div className='pt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>Credits</h3>
                                <div className='p-5 border border-neutral-400 rounded-md'>
                                    {renderInputFields(fonts, setFonts, 'fonts')}
                                    {renderInputFields(images, setImages, 'images',)}
                                    {renderInputFields(icons, setIcons, 'icons',)}
                                    {renderInputFields(illustrations, setIllustrations, 'illustrations',)}
                                </div>
                            </div>

                            <div className='pt-5'>

                                {/*  technical details */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize  pb-4'>Technical Details</h3>
                                    <div className='p-5 border border-neutral-400 rounded-md'>
                                        {renderTechnicalDetailsFields()}
                                    </div>
                                    {errors.techDetails && <p style={{ color: 'red' }}>{errors.techDetails.message}</p>}
                                </div>

                                {/* File Uploads */}

                                {/*  Source file */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Source File</h3>
                                    <div className='p-5 border border-neutral-400 border-dashed rounded-md'>
                                        <Controller
                                            name="sourceFiles"
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { onChange } }) => (
                                                <FileUpload
                                                    name='sourceFiles'
                                                    onFileSelect={(file) => { onChange(file) }}
                                                    supportedfiles="zip"
                                                    multiple={false}
                                                    id="1"
                                                    register={register}
                                                    fileNameUrl={initialData?.sourceFiles ? initialData?.sourceFiles.map((img: any) => img.fileUrl) : []}
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.sourceFiles && <p style={{ color: 'red' }}>{errors.sourceFiles.message}</p>}
                                </div>

                                {/* Slider Images  */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Slider Images</h3>
                                    <div className='p-5 border border-neutral-400 border-dashed rounded-md'>
                                        <Controller
                                            name="sliderImages"
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { onChange } }) => (
                                                <FileUpload
                                                    name='sliderImages'
                                                    onFileSelect={(file) => { onChange(file) }}
                                                    supportedfiles="jpg,png,jpeg"
                                                    multiple={true}
                                                    id="2"
                                                    register={register}
                                                    initialUrls={initialData?.sliderImages ? initialData?.sliderImages.map((img: any) => img.imageUrl) : []} // Pass URLs here

                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.sliderImages && <p style={{ color: 'red' }}>{errors.sliderImages.message}</p>}
                                </div>

                                {/* Deskto preview images */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Desktop Preview Images</h3>
                                    <div className='p-5 border border-neutral-400 border-dashed rounded-md'>
                                        <Controller
                                            name="previewImages"
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { onChange } }) => (
                                                <FileUpload
                                                    name='previewImages'
                                                    onFileSelect={(file) => { onChange(file) }}
                                                    register={register}

                                                    supportedfiles="jpg,png,jpeg"
                                                    multiple={true}
                                                    id="3"
                                                    initialUrls={initialData?.previewImages ? initialData?.previewImages.map((img: any) => img.imageUrl) : []} // Pass URLs here
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.previewImages && <p style={{ color: 'red' }}>{errors.previewImages.message}</p>}

                                </div>

                                {/* movilePreview Iamges */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Mobile Preview Images</h3>
                                    <div className='p-5 border border-neutral-400 border-dashed rounded-md'>
                                        <Controller
                                            name="previewMobileImages"
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { onChange } }) => (
                                                <FileUpload
                                                    register={register}
                                                    name='previewMobileImages'
                                                    onFileSelect={(file) => { onChange(file) }}
                                                    supportedfiles="jpg,png,jpeg"
                                                    multiple={true}
                                                    id="4"
                                                    initialUrls={initialData?.previewMobileImages ? initialData?.previewMobileImages.map((img: any) => img.imageUrl) : []} // Pass URLs here
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.previewMobileImages && <p style={{ color: 'red' }}>{errors.previewMobileImages.message}</p>}

                                </div>

                                {/* SEO tags and price component */}
                                <div className='mt-5'>

                                    <div className='flex flex-col'>
                                        <label className='text-xl font-semibold capitalize' htmlFor="seoTags">SEO Keywords Tag</label>
                                        <Controller
                                            name='seoTags'
                                            control={control}
                                            rules={{
                                                required: 'SEO Keywords Tag is required',
                                                maxLength: {
                                                    value: 100,
                                                    message: 'SEO Keywords Tag cannot exceed 100 characters'
                                                }
                                            }}
                                            render={({ field }) => (
                                                <input
                                                    {...field} // This spreads the necessary field props from Controller
                                                    {...register('seoTags')} // This can be included for demonstration but is redundant
                                                    id='seoTags'
                                                    type="text"
                                                    className='py-[18px] px-5 border border-neutral-400 rounded-md outline-none placeholder:text-neutral-400 bg-white'
                                                    placeholder='SEO Keywords Tag'
                                                />
                                            )}
                                        />
                                        {errors.seoTags && <p style={{ color: 'red' }}>{errors.seoTags.message}</p>}
                                    </div>
                                    <div className='pt-5'>
                                        <StaticCheckBox onClick={() => { setStaticCheck(!staticcheck), setValue('isPaid', !staticcheck) }} checked={staticcheck} label='Paid' />
                                        {
                                            (initialData?.isPaid || staticcheck) &&
                                            <div className='flex flex-col'>
                                                <label className='text-xl font-semibold capitalize' htmlFor="price">price in dollar</label>
                                                <Controller
                                                    name="price"
                                                    control={control} // Make sure you have `control` passed from `useForm`
                                                    render={({ field }) => (
                                                        <input
                                                            {...field} // This spreads the necessary props like onChange and value
                                                            id="price"
                                                            type="number"
                                                            className="py-[18px] px-5 border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400 bg-white"
                                                            placeholder="price in dollar"
                                                        />
                                                    )}
                                                />
                                                {
                                                    errors.price &&
                                                    <p style={{ color: 'red' }}>{errors.price.message}</p>
                                                }
                                            </div>
                                        }
                                    </div>
                                    {
                                        loading || loader ? <Button disabled type='submit' loadingbtn={true} iconClass='w-7 h-7' variant='primary' className='py-3 mt-5' hideChild='hidden'  >

                                        </Button> : <Button type='submit' variant='primary' className='py-3 mt-5' >
                                            upload
                                        </Button>
                                    }


                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default TemplateForm;



