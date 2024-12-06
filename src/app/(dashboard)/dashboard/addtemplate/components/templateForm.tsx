'use client';

import React, { useEffect, useRef, useState } from 'react';
import QuillEditor from '@/components/ui/Quilleditor';
import DashInput from './DashInput';
import Button from '@/components/ui/Button';
import FileUpload from './InputFile';
import useFetch from '@/hooks/useFetch';
import { Controller, Path, SubmitHandler, useForm } from 'react-hook-form';
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
import NotFound from '@/app/not-found';
import { any } from 'zod';

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
    seoTags: string[];
    price: number;
    templateTypeId: string;
    industryName: string;
    subCategory: string;
    subCategoryId: string;
    softwareTypeId: string;
    // sourceFiles: FileList;
    sourceFiles: string;
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

    const errorRefs = useRef<Record<string, HTMLDivElement | null>>({});

    /**
     * Fetch data hooks for template types, subcategories, and industries
     */

    const { data, fetchData, loading } = useFetch<TemplateType[]>();
    const { data: templateData, fetchData: fetchTemplateData, } = useFetch<any>();
    const { data: industryData, fetchData: fetchIndustryData } = useFetch<IndustryType[]>();

    /**
     *  State for fonts, images, editimagedata, icons, and illustrations
     */

    const [fonts, setFonts] = useState<Font[]>([{ name: '', url: '' }]);
    const [images, setImages] = useState<Font[]>([{ name: '', url: '' }]);
    const [icons, setIcons] = useState<Font[]>([{ name: '', url: '' }]);
    const [illustrations, setIllustrations] = useState<Font[]>([{ name: '', url: '' }]);

    const [loader, setLoader] = useState(false)

    const [deleteAllImages, setDeleteAllImages] = useState<string[]>([])

    // type edit 

    const [editimagedata, setEditImageData] = useState<{ imgId: string; imgName: string }[]>([]);


    // const deleteimages = (imgData: any) => {
    //     setEditImageData((prevState: any) => {
    //         // Check if the data with the same id already exists in the state
    //         const exists = prevState.some((item: any) => item.id === imgData.imgId);
    //         if (!exists) {
    //             // Add the new data if it doesn't already exist
    //             return [...prevState, imgData];
    //         }
    //         // If it already exists, return the state as is
    //         return prevState;
    //     });

    //     let images = initialData?.[imgData?.imgName]

    //     images = images.filter((item: any) => item.id !== imgData.imgId)

    //     setValue(imgData?.imgName, images)

    // };


    /**
     * Technical details state (4 inputs by default)
     */

    const [technicalDetails, setTechnicalDetails] = useState(
        initialData?.techDetails?.length ? initialData?.techDetails : Array(4).fill("")
    );
    const { data: session } = useSession()

    if (type === "edit" && initialData?.error == "Template not found.") {
        return <NotFound />
    }

    /**
     * Dropdown selection states
     */

    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [categoryValue, setCategoryValue] = useState<string | null>(null);
    const [staticcheck, setStaticCheck] = useState<boolean>(initialData?.isPaid || false);
    const [showSoftwareType, setShowSoftwareType] = useState('')

    // upload 
    const { register, handleSubmit, control, formState: { errors }, setValue, clearErrors, setError, getValues } = useForm<FormData>({
        defaultValues: { ...initialData, seoTags: [] },
        resolver: zodResolver(type == "create" ? uploadTemplateSchema : uploadTemplateUpdateSchema)
    });

    // Form for Draft (without validation)
    const {
        register: registerDraft,
        handleSubmit: handleSubmitDraft,
        control: controlDraft,
        formState: { errors: draftErrors },
        setValue: setValueDraft,
        clearErrors: clearErrorsDraft,
        setError: setErrorDraft,
        getValues: getValuesDraft
    } = useForm<FormData>({
        defaultValues: { ...initialData },
    });

    const [isDraft, setIsDraft] = useState(false);

    // Dynamically use the appropriate form handlers
    const activeRegister = isDraft ? registerDraft : register;
    const activeErrors = isDraft ? draftErrors : errors;
    const activeSetValue = isDraft ? setValueDraft : setValue;
    const activeHandleSubmit = handleSubmitDraft
    const activeClearErrors = isDraft ? clearErrorsDraft : clearErrors;
    const activeSetError = isDraft ? setErrorDraft : setError;
    const activeGetValues = isDraft ? getValuesDraft : getValues;
    const activeControl = isDraft ? controlDraft : control;



















    /**
     * Handle template dropdown selection
     */

    const handleTemplateSelect = (value: string) => {
        if (value) {
            setShowSoftwareType(value);
            setSelectedValue(value);
            activeSetValue("templateTypeId", value)
            fetchTemplateData(`/sub-categories/${value}`);
        }
    };

    /**
     * Handle category dropdown selection
     */

    const handleCategorySelect = (value: string) => {
        setCategoryValue(value);
    };

    // State to check if "Mobile" is selected
    const [isMobileSelected, setIsMobileSelected] = useState(false);

    const handleSelectChange = (value: any) => {
        // Call the provided category select handler
        handleCategorySelect(value);
        // Update state based on the selected value
        const isMobile = templateData?.subCategories?.find((option: any) => option.id === value)?.name === 'Mobile Design Mockups';
        setIsMobileSelected(isMobile);
    };

    useEffect(() => {
        fetchData(`/template-types`);
        fetchIndustryData(`/industry-type`);
    }, [fetchData, fetchIndustryData]);



    useEffect(() => {

        if (initialData) {
            activeSetValue('techDetails', initialData?.techDetails);
            handleTemplateSelect(initialData?.templateTypeId)
            activeSetValue('industry', initialData.industryTypeId)
            activeSetValue('seoTags', initialData?.seoTags)
            activeSetValue('sliderImages', initialData?.sliderImages)
            activeSetValue('previewImages', initialData?.previewImages)
            activeSetValue('previewMobileImages', initialData?.previewMobileImages)

            if (initialData?.subCategoryId === "cm48et4wn0004qnnxptj5ioaz") {
                setIsMobileSelected(true)
            }
        }
        if (initialData && initialData?.credits?.length > 0) {
            const creditData = initialData?.credits[0];

            setFonts(creditData.fonts || [{ name: '', url: '' }]);
            setImages(creditData.images || [{ name: '', url: '' }]);
            setIcons(creditData.icons || [{ name: '', url: '' }]);
            setIllustrations(creditData.illustrations || [{ name: '', url: '' }]);
        }

        if (initialData?.industryName != null) {
            let data: any = industryData?.filter((item) => item?.id === initialData?.industryTypeId)
            data && data?.length > 0 && setSelectedIndustry(data[0]?.name)

        }

    }, [initialData, industryData])

    /**
     * Generalized function to add new input fields
     */

    const addInputFields = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, values: T[], isObject: boolean) => {
        const newValue = isObject ? { name: '', url: '' } : '';
        setter([...values, newValue as T]);
    };

    /**
     * delete all images
     *  
     */

    const deleteAll = (name: string[]) => {
        // Update deleteAllImages with new data
        setDeleteAllImages((prev) => {
            const updated = [...prev, ...name]; // Add all items from `name` to the existing list
            return updated;
        });

        // Clear the form fields for all items in the `name` array
        name.forEach((item: any) => {
            activeSetValue(item, []); // Assuming `item` is a valid field name
        });
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

    const removeInputField = (setter: any, index: number, values: any[]) => {

        // let technicalDetails = activeGetValues("techDetails")
        // technicalDetails?.splice(index, 1)
        // setter(technicalDetails);
        // activeSetValue('techDetails', technicalDetails)

        if (values.length > 1) {


            const newValues = [...values];
            newValues.splice(index, 1);
            setter(newValues);

            if (setter == setTechnicalDetails) {
                newValues.forEach((detail: any, i) => {
                }); // Correct the field path
                activeSetValue(`techDetails`, newValues)
            }
        }
    };

    /**
     * Function to render input fields
     */

    const renderInputFields = (items: Font[], setter: React.Dispatch<React.SetStateAction<Font[]>>, title: string) => (
        <div className='pb-3'>
            <h4 className='text-lg font-semibold capitalize pb-4'>{title}</h4>
            <div className=" p-2 md:p-5 border-b border-neutral-400">
                {items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-x-3 pb-3">

                        <DashInput
                            type='text'
                            placeholder={` ${title} name`}
                            value={item?.name}
                            onChange={(e) => handleInputChange(setter, index, { ...item, name: e.target.value }, items)}
                        />

                        <DashInput
                            type='text'
                            placeholder={` ${title} url`}
                            value={item.url}
                            onChange={(e) => handleInputChange(setter, index, { ...item, url: e.target.value }, items)}
                        />

                        {items.length > 1 && (
                            <button
                                type='button'
                                onClick={() => removeInputField(setter, index, items)}
                                className="py-3 px-3 border">
                                <Icon name='closeiconfilter' size={16} />
                            </button>
                        )}

                    </div>
                ))}
                <Button
                    type='button'
                    onClick={() => addInputFields(setter, items, true)}
                    variant='primary'
                    className='py-2 mt-2'>
                    Add more
                </Button>
            </div>
        </div>
    );


    const deleteimages = (imgData: any) => {
        setEditImageData((prevState: any) => {
            // Check if the data with the same id already exists in the state
            const exists = prevState.some((item: any) => item.id === imgData.imgId);
            if (!exists) {
                // Add the new data if it doesn't already exist
                return [...prevState, imgData];
            }
            // If it already exists, return the state as is
            return prevState;
        });

        let images: any = activeGetValues(imgData?.imgName)

        images = images.filter((item: any) => item.id !== imgData.imgId)

        activeSetValue(imgData?.imgName, images)

    };

    /**
     * Render technical details fields
     */

    const renderTechnicalDetailsFields = () => (
        <div className='pb-3'>
            <div className="p-2 md:p-5 border-b border-neutral-400">
                {technicalDetails?.map((detail: string, index: number) => (
                    <div key={index} className="flex items-center gap-x-3 pb-3">
                        <DashInput
                            type='text'
                            placeholder='Detail Name'
                            value={detail}
                            onChange={(e) => { handleInputChange(setTechnicalDetails, index, e.target.value, technicalDetails); activeSetValue(`techDetails.${index}`, e.target.value); }}
                        />
                        {technicalDetails.length > 4 && (
                            <button
                                type='button'
                                onClick={() => removeInputField(setTechnicalDetails, index, technicalDetails)}
                                className="py-3 px-3 border" >
                                <Icon name='closeiconfilter' size={16} />
                            </button>
                        )}
                    </div>
                ))}
                <Button onClick={() => { addInputFields(setTechnicalDetails, technicalDetails, false), activeSetValue(`techDetails.${technicalDetails.length}`, ""); }} variant='primary' className='py-2 mt-2'>
                    Add more
                </Button>
            </div>
        </div>
    );

    const router = useRouter();

    const [errorvalidaiton, seterrorvalidaiton] = useState<string | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (errorvalidaiton && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [errorvalidaiton]);

    interface FormDataObject {
        [key: string]: any; // Define a dynamic type for the form data fields
    }


    // draft data

    const draftsubmit = async (data: any) => {

        console.log(data, "dataF")

        try {
            const formData = new FormData();

            // Append form fields to FormData
            Object.entries(data).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            });

            formData.delete("industry");
            formData.append('industry', data?.industry);

            const credits = [
                {
                    fonts: fonts?.map(font => ({ name: font.name, url: font.url })),
                    images: images?.map(image => ({ name: image.name, url: image.url })),
                    icons: icons?.map(icon => ({ name: icon.name, url: icon.url })),
                    illustrations: illustrations?.map(illustration => ({ name: illustration.name, url: illustration.url })),
                }
            ];
            formData.append("credits", JSON.stringify(credits));


            // Send the request
            const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/drafttemplates`, {
                method: "POST", // Assuming POST for drafts
                body: formData,
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                    "ngrok-skip-browser-warning": "true",
                },
            });

            // Handle response
            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message || "Failed to save draft", { autoClose: 1500 });
            } else {
                toast.success(result.message || "Draft saved successfully", { autoClose: 1500 });
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("An error occurred while saving draft:", error);
            toast.error("An unexpected error occurred.", { autoClose: 1500 });
        }
    };












    const onSubmit: SubmitHandler<FormDataObject> = async (data, status: any) => {

        console.log(data, "real data")


        if (type == "edit") {
            editimagedata?.map((item) => {
                data[item?.imgName] = data[item?.imgName].filter((e: any) => e.id !== item?.imgId)
            })
        }

        let schema = type == "create" ? uploadTemplateSchema : uploadTemplateUpdateSchema
        const result = schema.safeParse(data);

        if (!result.success) {
            const firstError: any = result.error.errors[0]; // Get the first validation error
            seterrorvalidaiton(firstError.message);

            setError(firstError.path[0], { message: firstError?.message })

            return;
        } else {
            seterrorvalidaiton(null);
        }

        if (selectedIndustry === 'Others' && data?.industryName === "") {
            setError('industryName', { message: "This field is required" });
            return;
        }


        if (selectedIndustry !== 'Others' && data?.industryName !== null) {
            data.industryName = null
        }

        setLoader(true);
        const formData = new FormData();

        // Append form fields to FormData
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => formData.append(key, item));
            } else {
                formData.append(key, value);
            }
        });

        formData.delete("industry");
        formData.append('industry', data?.industry);

        const credits = [
            {
                fonts: fonts?.map(font => ({ name: font.name, url: font.url })),
                images: images?.map(image => ({ name: image.name, url: image.url })),
                icons: icons?.map(icon => ({ name: icon.name, url: icon.url })),
                illustrations: illustrations?.map(illustration => ({ name: illustration.name, url: illustration.url })),
            }
        ];
        formData.append("credits", JSON.stringify(credits));


        // Add status field to the form data

        if (status === "DRAFT") {
            formData.append("status", status);
        }


        const endpoint = type === 'edit'
            ? `${process.env.NEXT_PUBLIC_APIURL}/templates/${id}`
            : `${process.env.NEXT_PUBLIC_APIURL}/templates`;
        const method = type === 'edit' ? 'PUT' : 'POST';

        try {
            if (type === "edit" && editimagedata?.length > 0) {
                // Delete images first
                await Promise.all(
                    editimagedata.map(async (item) => {
                        const response = await deleteSliderImage(item?.imgId, item?.imgName);
                        if (response?.ok) {
                            console.log(`Deleted image: ${item?.imgName}`);
                        } else {
                            console.error(`Failed to delete image: ${item?.imgName}`);
                        }
                    })
                );
            }
            if (type == "edit" && deleteAllImages.length > 0) {
                deleteAllImages.map(async (item) => {
                    const response = await fetch(`${process?.env?.NEXT_PUBLIC_APIURL}/${item}/all/${initialData?.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${session?.token}`,
                            'ngrok-skip-browser-warning': 'true'
                        }
                    });

                })
            }

            // Submit the form data
            const response = await fetch(endpoint, {
                method,
                body: formData,
                headers: {
                    'Authorization': `Bearer ${session?.token}`, // Adding Authorization header with Bearer token
                    'ngrok-skip-browser-warning': 'true'
                },
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message, { autoClose: 1500 });
                setLoader(false);
            } else {
                toast.success(result.message, { autoClose: 1500 });
                router.push('/dashboard');
            }
        } catch (error) {
            console.error("An error occurred during submission:", error);
        } finally {
            // setLoader(false);
        }
    };

    const goback = () => {
        router?.back()
    }

    const [tags, setTags] = useState<string[]>(initialData?.seoTags || []);
    const [inputValue, setInputValue] = useState<string>('');

    // Function to handle keydown events (comma for desktop)
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === ',' || event.key === 'Enter') {
            event.preventDefault(); // Prevent default space or comma behavior
            const value = event.currentTarget.value.trim(); // Get trimmed value

            // Validate minimum length and prevent duplicates
            if (value.length >= 2 && !tags.includes(value)) {
                const newTags = [...tags, value];
                setTags(newTags);
                activeSetValue('seoTags', newTags); // Ensure the form value is updated as an array
                setInputValue(''); // Clear the input field after adding the tag
            }

            // Clear the input field even if invalid value is entered
            event.currentTarget.value = ''; // Clear the input field
        }
    };

    // Function to add tag via button click (for mobile)
    const addTag = () => {
        const value = inputValue.trim();
        if (value.length >= 2 && !tags.includes(value)) {
            const newTags = [...tags, value];
            setTags(newTags);
            activeSetValue('seoTags', newTags); // Update the form value as an array
            setInputValue(''); // Clear the input field
        }
    };

    // Function to remove a tag
    const removeTag = (index: number) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
        activeSetValue('seoTags', updatedTags); // Update the form value as an array
    };



    const [otherIndustry, setOtherIndustry] = useState<string>();

    const handleInputChangeindustryvalue = (e: any) => {
        setOtherIndustry(e.target.value); // Correctly updating state
        if (otherIndustry !== "") {
            activeClearErrors('industryName')
        }
    };

    const [selectedIndustry, setSelectedIndustry] = useState();
    const handleIndustryChange = (value: any) => {
        setSelectedIndustry(value);
    };

    const deleteSliderImage = async (id: string, name: string) => {
        try {
            const response = await fetch(`${process?.env?.NEXT_PUBLIC_APIURL}/${name}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${session?.token}`,
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if (response.ok) {
                return response
            } else {
                console.error('Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    /**
      * Scroll to the first error
      */

    useEffect(() => {
        if (activeErrors && Object.keys(activeErrors).length > 0) {
            const firstErrorKey = Object.keys(activeErrors)[0] as keyof FormData;
            const firstErrorElement = errorRefs.current[firstErrorKey];
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeErrors]);

    useEffect(() => {
        if (loader) {
            window.scrollTo(0, 0);
        }
    }, [loader])

    return (
        <>

            {/* Loader Overlay */}
            {loader && (
                <div className="fixed inset-0  bg-[#28204699] flex items-center justify-center z-50">
                    <div className="text-white text-2xl font-bold animate-zoom-out">
                        Please wait
                    </div>
                </div>
            )}

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
                            <div onClick={goback} className="cursor-pointer" >
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
                                    control={activeControl}
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
                                {activeErrors?.templateTypeId && (
                                    <p ref={errorRef} style={{ color: 'red' }}>{activeErrors?.templateTypeId.message}</p>
                                )}
                            </div>

                            {/* Template SubCategory Dropdown */}
                            <div className='w-full'>
                                <label className='text-xl font-semibold capitalize' htmlFor="subCategoryId">Template SubCategory</label>
                                <Controller
                                    name="subCategoryId"
                                    control={activeControl}
                                    // defaultValue={"Please select category"} // Set a valid default or empty string
                                    render={({ field }) => (
                                        <select className='custom-dropdown-template' id="subCategoryId"  {...field}
                                            defaultValue=""
                                            onChange={(e) => { activeSetValue('subCategory', e.target.options[e.target.selectedIndex].text); handleSelectChange(e.target.value); field.onChange(e.target.value); handleCategorySelect(e.target.value) }}
                                            // onChange={(e) => { field.onChange(e.target.value); handleSelectChange(e.target.value); handleCategorySelect(e.target.value) }}
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
                                {activeErrors.subCategoryId && <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.subCategoryId.message}</p>}
                            </div>

                            {/* Software Type Dropdown */}
                            {showSoftwareType !== 'cm207q5lf00025lycfdqrpzzb' && <div className='w-full'>
                                <label className='text-xl font-semibold capitalize' htmlFor="softwareTypeId">Software Type</label>
                                <Controller
                                    name="softwareTypeId"
                                    control={activeControl}
                                    // defaultValue="" // Set a valid default or empty string
                                    render={({ field }) => (
                                        <select defaultValue="" className='custom-dropdown-template' id="softwareTypeId" {...field} onChange={(e) => { field.onChange(e.target.value); handleCategorySelect(e.target.value) }}
                                            disabled={type === "edit"}>
                                            <option value="" disabled>Select Software Type</option>
                                            {templateData?.softwareCategories?.map((softwareCategory: any) => {
                                                return (
                                                    <option className='cursor-pointer' key={softwareCategory.id} value={softwareCategory.id}>
                                                        {softwareCategory?.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    )}
                                />

                                {activeErrors.softwareTypeId && <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.softwareTypeId.message}</p>}

                            </div>}
                        </div>

                        <div className='mt-5'>
                            <h3 className='text-xl font-semibold capitalize '>Industry</h3>
                            <div className='flex flex-col mb-3'>

                                <div className='grid grid-cols-2 lg:grid-cols-4 justify-between gap-3 lg:gap-x-3 max-w-full   py-2'>
                                    {industryData?.map((item) => (
                                        <Controller
                                            key={item?.id}
                                            name="industry"
                                            control={activeControl}
                                            render={({ field }) => (
                                                <label htmlFor={item?.id} className="my-custom-radio-label capitalize cursor-pointer flex items-center">
                                                    <input
                                                        type="radio"
                                                        id={item?.id}
                                                        {...field}
                                                        value={item?.id}
                                                        defaultChecked={initialData && initialData?.industryTypeId === item?.id}
                                                        // defaultChecked={selectedIndustry === item?.id}
                                                        onChange={() => {
                                                            field.onChange(item?.id);
                                                            handleIndustryChange(item?.name);
                                                        }}
                                                        className="cursor-pointer"
                                                    />
                                                    <span className="ml-1 text-nowrap">{item?.name}</span>
                                                </label>
                                            )}
                                        />
                                    ))}
                                </div>

                                {activeErrors.industry && (
                                    <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.industry.message}</p>
                                )}

                                {/* Conditional rendering of input box when "Other" is selected */}

                                {(selectedIndustry === 'Others') && (
                                    <div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <input
                                                {...activeRegister("industryName")}
                                                type="text"
                                                placeholder="Please specify"
                                                name="industryName"
                                                defaultValue={initialData?.industryName != null || initialData?.industryName != undefined ? otherIndustry : ""}
                                                onChange={handleInputChangeindustryvalue} // Use a function to handle the change
                                                className="border h-[50px] rounded p-2 w-full outline-none"
                                            />
                                        </div>
                                        {activeErrors.industryName && (
                                            <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.industryName.message}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className='flex flex-col gap-y-5'>
                                <div className='flex flex-col'>
                                    <label className='text-xl font-semibold capitalize' htmlFor="name">Title</label>
                                    <Controller
                                        name="title"
                                        control={activeControl}
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
                                    {activeErrors.title && (
                                        <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.title.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col'>
                                    <label className='text-xl font-semibold capitalize' htmlFor="version">Version</label>
                                    <input
                                        {...activeRegister("version")}
                                        id='version'
                                        type="text"
                                        name='version'
                                        className='py-[18px] px-5 border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400 bg-white'
                                        placeholder='version'
                                    />
                                    {activeErrors.version &&
                                        <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.version.message}</p>
                                    }
                                </div>

                            </div>

                            <div className='mt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>Description</h3>
                                <QuillEditor setValue={activeSetValue} clearErrors={activeClearErrors} setError={activeSetError} initialValue={initialData?.description} />
                                {activeErrors.description &&
                                    <p ref={(el: any) => (errorRefs.current.description = el)} style={{ color: 'red', marginTop: "10px" }}>{activeErrors.description.message}</p>
                                }
                            </div>


                            <div className='pt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>Credits</h3>
                                <div className=' p-2 md:p-5 border border-neutral-400 rounded-md'>
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
                                    <div className='p-2 md:p-5 border border-neutral-400 rounded-md'>
                                        {renderTechnicalDetailsFields()}
                                    </div>
                                    {activeErrors.techDetails && <p style={{ color: 'red' }}>Required</p>}
                                </div>

                                {/* File Uploads */}

                                {/*  Source file */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Source File</h3>
                                    {/* <div className='p-5 border border-neutral-400 border-dashed rounded-md'>
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
                                                    title='Upload Source File Here only 1'
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.sourceFiles && <p style={{ color: 'red' }}>{errors.sourceFiles.message}</p>} */}

                                    <Controller
                                        name="sourceFiles"
                                        control={activeControl}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                id='sourceFiles'
                                                defaultValue={initialData && initialData?.sourceFiles}
                                                type="text"
                                                placeholder="Enter source files URL"
                                                className="w-full py-3 px-2 border border-neutral-400 rounded-md outline-none"
                                            />
                                        )}
                                    />

                                    {activeErrors.sourceFiles && (
                                        <p ref={errorRef} style={{ color: "red" }}>{activeErrors.sourceFiles.message}</p>
                                    )}

                                </div>

                                {/* Slider Images  */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Slider Images</h3>
                                    <div className='p-2 md:p-5 border border-neutral-400 border-dashed rounded-md'>
                                        <Controller
                                            name="sliderImages"
                                            control={activeControl}
                                            rules={{ required: false }}
                                            render={({ field: { onChange, value = [] } }) => (
                                                <FileUpload
                                                    deleteimages={deleteimages}
                                                    type={type}
                                                    name='sliderImages'
                                                    // onFileSelect={(newFiles) => {
                                                    //     // Convert `value` to an array if it's a FileList
                                                    //     const existingFiles = Array.isArray(value) ? value : Array.from(value);
                                                    //     const updatedFiles = [...existingFiles, ...newFiles]; // Merge existing and new files
                                                    //     onChange(updatedFiles);
                                                    //   }}
                                                    onFileSelect={(file: any) => { onChange(file) }}
                                                    setDeleteAll={deleteAll}
                                                    supportedfiles="jpg,png,jpeg"
                                                    multiple={true}
                                                    id="2"
                                                    register={activeRegister}
                                                    initialUrls={initialData?.sliderImages ? initialData?.sliderImages
                                                        : []} // Pass URLs here
                                                    title='Upload Slider Images Here Upto 5'
                                                />
                                            )}
                                        />
                                    </div>
                                    {activeErrors.sliderImages && <p ref={(el: any) => (errorRefs.current.sliderImages = el)} style={{ color: 'red' }}>{activeErrors.sliderImages.message}</p>}
                                </div>

                                {/* Deskto preview images */}

                                {
                                    !isMobileSelected &&
                                    <div className='pt-5'>
                                        <h3 className='text-xl font-semibold capitalize pb-4'>Desktop Preview Images</h3>
                                        <div className='p-2 md:p-5 border border-neutral-400 border-dashed rounded-md'>
                                            <Controller
                                                name="previewImages"
                                                control={activeControl}
                                                rules={{ required: false }}
                                                render={({ field: { onChange, value = [] } }) => (
                                                    <FileUpload
                                                        deleteimages={deleteimages}
                                                        name='previewImages'
                                                        // onFileSelect={(newFiles) => {
                                                        //     // Convert `value` to an array if it's a FileList
                                                        //     const existingFiles = Array.isArray(value) ? value : Array.from(value);
                                                        //     const updatedFiles = [...existingFiles, ...newFiles]; // Merge existing and new files
                                                        //     onChange(updatedFiles);
                                                        //   }}
                                                        onFileSelect={(file: any) => { onChange(file) }}
                                                        setDeleteAll={deleteAll}
                                                        register={activeRegister}
                                                        type={type}
                                                        supportedfiles="jpg,png,jpeg"
                                                        multiple={true}
                                                        id="3"
                                                        initialUrls={initialData?.previewImages ? initialData?.previewImages : []} // Pass URLs here
                                                        title='Upload Desktop Preview Images Here '
                                                    />
                                                )}
                                            />
                                        </div>
                                        {activeErrors.previewImages && <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.previewImages.message}</p>}
                                    </div>
                                }


                                {/* movilePreview Iamges */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Mobile Preview Images</h3>
                                    <div className='p-2 md:p-5 border border-neutral-400 border-dashed rounded-md'>
                                        <Controller
                                            name="previewMobileImages"
                                            control={activeControl}
                                            rules={{ required: false }}
                                            render={({ field: { onChange, value = [] } }) => (
                                                <FileUpload
                                                    deleteimages={deleteimages}
                                                    setDeleteAll={deleteAll}
                                                    type={type}
                                                    register={activeRegister}
                                                    name='previewMobileImages'
                                                    onFileSelect={(file: any) => { onChange(file) }}
                                                    supportedfiles="jpg,png,jpeg"
                                                    multiple={true}
                                                    id="4"
                                                    initialUrls={initialData?.previewMobileImages ? initialData?.previewMobileImages : []} // Pass URLs here
                                                    title='Upload Mobile Preview Images Here'
                                                />
                                            )}
                                        />
                                    </div>
                                    {activeErrors.previewMobileImages && <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.previewMobileImages.message}</p>}
                                </div>

                                {/* SEO tags and price component */}
                                <div className='mt-5'>
                                    <div className="flex flex-col">
                                        <label className="text-xl font-semibold capitalize" htmlFor="seoTags">
                                            SEO Keywords Tag
                                        </label>
                                        <Controller
                                            name="seoTags"
                                            control={activeControl}
                                            render={() => (
                                                <>
                                                    <div className="flex flex-wrap items-center gap-2 mb-2 pt-3">
                                                        {tags && tags.length > 0 && tags.map((tag, index) => (
                                                            <span
                                                                key={index}
                                                                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md flex items-center"
                                                            >
                                                                {tag}
                                                                <button
                                                                    type="button"
                                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                                    onClick={() => removeTag(index)}
                                                                >
                                                                    &times;
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>

                                                    <div className="flex items-center gap-2 flex-col ">
                                                        <input
                                                            id="seoTags"
                                                            type="text"
                                                            className={`flex-1 w-full py-[18px] px-5 border border-neutral-400 rounded-md outline-none placeholder:text-neutral-400 bg-white ${tags?.length >= 5 && 'bg-neutral-400 cursor-not-allowed'}`}
                                                            placeholder="Type a keyword"
                                                            value={inputValue}
                                                            onChange={(e) => setInputValue(e.target.value)}
                                                            onKeyDown={handleKeyDown}
                                                            disabled={tags?.length >= 5}
                                                        />
                                                        {/* Add Tag button (only visible on mobile) */}
                                                        <button
                                                            type="button"
                                                            className={`py-2 w-full px-4 text-white bg-primary-700 rounded-md ${tags?.length >= 5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-100'} md:hidden`}
                                                            onClick={addTag}
                                                            disabled={tags?.length >= 5 || !inputValue.trim()}
                                                        >
                                                            Add Tag
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        />
                                        <p className="text-xs pt-2">*Note: 5 keywords are allowed</p>
                                        {activeErrors.seoTags && (
                                            <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.seoTags.message}</p>
                                        )}
                                    </div>


                                    <div className='pt-5'>
                                        <StaticCheckBox onClick={() => { setStaticCheck(!staticcheck), activeSetValue('isPaid', !staticcheck) }} checked={staticcheck} label='Paid' />
                                        {
                                            (initialData?.isPaid || staticcheck) &&
                                            <div className='flex flex-col'>
                                                <label className='text-xl font-semibold capitalize' htmlFor="price">price in dollar</label>
                                                <Controller
                                                    name="price"
                                                    control={activeControl} // Make sure you have `control` passed from `useForm`
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
                                                    activeErrors.price &&
                                                    <p ref={errorRef} style={{ color: 'red' }}>{activeErrors.price.message}</p>
                                                }

                                            </div>
                                        }
                                    </div>

                                    {/* <div className='flex gap-6' >
                                        {
                                            loading || loader ? <Button disabled type='submit' loadingbtn={true} iconClass='w-7 h-7' variant='primary' className='py-3 mt-5' hideChild='hidden'  >

                                            </Button> : <Button type='submit' variant='primary' className='py-3 mt-5' >
                                                upload
                                            </Button>
                                        }

                                        <Button type='button' variant='secondary' className='py-3 mt-5' >
                                            Draft Template
                                        </Button>

                                    </div> */}

                                    <div className='flex gap-6' >

                                        {
                                            loading || loader ? <Button disabled type='submit' loadingbtn={true} iconClass='w-7 h-7' variant='primary' className='py-3 mt-5' hideChild='hidden' >

                                            </Button> : <Button type='submit' variant='primary' className='py-3 mt-5' >
                                                upload
                                            </Button>
                                        }

                                        {/* {
                                            isDraft &&
                                            <div onClick={handleSubmitDraft(draftsubmit)}  >
                                                <Button
                                                    type='button'
                                                    variant='secondary'
                                                    className='py-3 mt-5'
                                                >
                                                    Save as Draft
                                                </Button>
                                            </div>
                                        }

                                        <div onClick={() => setIsDraft(!isDraft)} className='cursor-pointer'>
                                            change state
                                        </div> */}

                                    </div>
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
