'use client';

import React, { useEffect, useRef, useState } from 'react';
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
import NotFound from '@/app/not-found';

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
    titleinfo: string;
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
    metatitle: string,
    slug: string,
    metadescription: string
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
    const [draft, setdraftloader] = useState(false)

    const [loader, setLoader] = useState(false)

    const [deleteAllImages, setDeleteAllImages] = useState<string[]>([])

    // type edit 

    const [editimagedata, setEditImageData] = useState<{ imgId: string; imgName: string }[]>([]);


    /**
     * Technical details state (4 inputs by default)
     */

    const [technicalDetails, setTechnicalDetails] = useState(
        initialData?.techDetails?.length > 0 ? initialData?.techDetails : Array(4).fill("")
    );


    const { data: session } = useSession()


    /**
 * Renders a `NotFound` component if the type is "edit" and the initial data indicates the template is not found.
 */
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




    /**
  * React Hook Form initialization with Zod schema validation.
  * 
  * @type {import('react-hook-form').UseFormReturn<FormData>}
  * @property {Function} register - Registers the input field to the form.
  * @property {Function} handleSubmit - Handles the form submission process.
  * @property {Function} control - Controls the form inputs (used for advanced features like custom components).
  * @property {object} formState - Contains metadata about the form's state.
  * @property {object} formState.errors - Contains validation errors for form fields.
  * @property {Function} setValue - Dynamically sets the value of a form field.
  * @property {Function} clearErrors - Clears specific or all errors in the form.
  * @property {Function} setError - Sets a specific error message for a form field.
  * @property {Function} getValues - Retrieves the current values of form fields.
  * 
  * @param {FormData} defaultValues - The initial default values for the form.
  * @param {string} type - Specifies the form type ("create" or "update") to select the appropriate validation schema.
  * @returns {UseFormReturn<FormData>} The initialized form instance.
  */
    const { register, handleSubmit, control, formState: { errors }, setValue, clearErrors, setError, getValues } = useForm<FormData>({
        defaultValues: { ...initialData, seoTags: [] },
        resolver: zodResolver(type == "create" ? uploadTemplateSchema : uploadTemplateUpdateSchema),
        mode: "onChange",
    });


    /**
  * Handles the selection of a template.
  *
  * @param {string} value - The ID of the selected template.
  * @returns {void}
  *
  * @description
  * - Updates the UI by setting the selected software type and value.
  * - Sets the "templateTypeId" field in the form state.
  * - Fetches sub-category data for the selected template using the provided endpoint.
  */
    const handleTemplateSelect = (value: string) => {
        if (value) {
            setShowSoftwareType(value);
            setSelectedValue(value);
            setValue("templateTypeId", value)
            fetchTemplateData(`/sub-categories/${value}`);
        }
    };



    /**
 * Handles the selection of a category by updating the category value state.
 *
 * @param {string} value - The selected category value.
 */
    const handleCategorySelect = (value: string) => {
        setCategoryValue(value);
    };


    /**
   * State to track if "Mobile" is selected.
   * @type {boolean}
   */
    const [isMobileSelected, setIsMobileSelected] = useState(false);


    /**
 * Handles changes in the selected category and updates the "Mobile" selection state.
 *
 * @param {any} value - The selected category ID or value.
 */
    const handleSelectChange = (value: any) => {
        // Call the provided category select handler
        handleCategorySelect(value);
        // Update state based on the selected value
        const isMobile = templateData?.subCategories?.find((option: any) => option.id === value)?.name === 'Mobile Design Mockups';
        setIsMobileSelected(isMobile);
    };




    /**
 * Fetches template types and industry types when the component mounts.
 * 
 * Dependencies: [fetchData, fetchIndustryData]
 */
    useEffect(() => {
        fetchData(`/template-types`);
        fetchIndustryData(`/industry-type`);
    }, [fetchData, fetchIndustryData]);




    /**
 * Populates the form with initial data and updates related states when initial data or industry data changes.
 * 
 * Dependencies: [initialData, industryData]
 */
    useEffect(() => {

        if (initialData) {
            setValue('techDetails', initialData?.techDetails);
            handleTemplateSelect(initialData?.templateTypeId)
            setValue('industry', initialData.industryTypeId)
            setValue('seoTags', initialData?.seoTags)
            setValue('sliderImages', initialData?.sliderImages)
            setValue('previewImages', initialData?.previewImages)
            setValue('previewMobileImages', initialData?.previewMobileImages)

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
    * Adds a new input field to the provided state array, either as an object or a string.
    *
    * @template T - The type of elements in the state array.
    * @param {React.Dispatch<React.SetStateAction<T[]>>} setter - The state setter function to update the array.
    * @param {T[]} values - The current array of values.
    * @param {boolean} isObject - Determines whether the new field should be an object or a string.
    */
    const addInputFields = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, values: T[], isObject: boolean) => {
        const newValue = isObject ? { name: '', url: '' } : '';
        setter([...values, newValue as T]);
    };


    /**
 * Deletes all specified items by updating the state and clearing the form fields.
 *
 * @param {string[]} name - An array of field names to be cleared and added to the delete list.
 */

    const deleteAll = (name: string[]) => {
        // Update deleteAllImages with new data
        setDeleteAllImages((prev) => {
            const updated = [...prev, ...name]; // Add all items from `name` to the existing list
            return updated;
        });

        // Clear the form fields for all items in the `name` array
        name.forEach((item: any) => {
            setValue(item, []); // Assuming `item` is a valid field name
        });
    };





    /**
 * Handles changes to an input field in an array of values by updating the specified index.
 *
 * @template T - The type of the values in the array.
 * @param {React.Dispatch<React.SetStateAction<T[]>>} setter - The state setter function to update the array.
 * @param {number} index - The index of the value to be updated.
 * @param {T} value - The new value to set at the specified index.
 * @param {T[]} values - The current array of values.
 */
    const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number, value: T, values: T[]) => {
        const newValues = [...values];
        newValues[index] = value;
        setter(newValues);
    };




    /**
 * Removes an input field at the specified index from the given values array and updates the state.
 *
 * @param {React.Dispatch<React.SetStateAction<any[]>>} setter - The state setter function to update the array.
 * @param {number} index - The index of the input field to be removed.
 * @param {any[]} values - The current array of values.
 */

    const removeInputField = (setter: any, index: number, values: any[]) => {

        // let technicalDetails = getValues("techDetails")
        // technicalDetails?.splice(index, 1)
        // setter(technicalDetails);
        // setValue('techDetails', technicalDetails)

        if (values.length > 1) {


            const newValues = [...values];
            newValues.splice(index, 1);
            setter(newValues);

            if (setter == setTechnicalDetails) {
                newValues.forEach((detail: any, i) => {
                }); // Correct the field path
                setValue(`techDetails`, newValues)
            }
        }
    };




    /**
 * Renders a dynamic list of input fields for managing an array of items with "name" and "url" properties.
 *
 * @param {Font[]} items - The current array of items to render input fields for.
 * @param {React.Dispatch<React.SetStateAction<Font[]>>} setter - The state setter function to update the array of items.
 * @param {string} title - The title of the input group, used for placeholders and headings.
 * @returns {JSX.Element} A JSX element containing the rendered input fields and controls.
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




    /**
 * Handles the deletion of an image by updating the edit state and removing it from the form values.
 *
 * @param {any} imgData - The data of the image to be deleted, including its `imgId` and `imgName`.
 */

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

        let images: any = getValues(imgData?.imgName)

        images = images.filter((item: any) => item.id !== imgData.imgId)

        setValue(imgData?.imgName, images)

    };



    /**
     * Render technical details fields
     */

    const renderTechnicalDetailsFields = () => (
        <div className='pb-3'>
            <div className="p-2 md:p-5 border-b border-neutral-400">
                {technicalDetails !== null && technicalDetails && technicalDetails?.length > 0 && technicalDetails?.map((detail: string, index: number) => (
                    <div key={index} className="flex items-center gap-x-3 pb-3">
                        <DashInput
                            type='text'
                            placeholder='Detail Name'
                            value={detail}
                            onChange={(e) => { handleInputChange(setTechnicalDetails, index, e.target.value, technicalDetails); setValue(`techDetails.${index}`, e.target.value); }}
                        />
                        {technicalDetails?.length > 4 && (
                            <button
                                type='button'
                                onClick={() => removeInputField(setTechnicalDetails, index, technicalDetails)}
                                className="py-3 px-3 border" >
                                <Icon name='closeiconfilter' size={16} />
                            </button>
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




    /**
 * Manages error validation state and handles scrolling to the error message.
 *
 * @param {string | null} errorvalidaiton - The error message to display, if any.
 */
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



    // title checking 

    // title checking 
    const [formData, setFormData] = useState({
        title: initialData?.title || '', // Use initialData?.title if available, otherwise use an empty string
    });



    /**
 * Handles input changes by updating the corresponding field in the form data.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input element.
 */

    const handleInputChangee = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // Update the specific field dynamically
        }));
    };




    /**
 * Handles form submission, validation, and data processing for both create and edit operations.
 *
 * @param {FormDataObject} data - The form data object containing all input fields and values.
 * @param {any} status - The current status or state associated with the form submission.
 */

    const onSubmit: SubmitHandler<FormDataObject> = async (data, status: any) => {

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

        // if (type === "edit") {
        //     try {
        //         const response = await fetch(`${process?.env?.NEXT_PUBLIC_APIURL}/templates?query=${formData}`, {
        //             method: 'PUT', // Use PUT or PATCH for editing
        //             headers: {
        //                 'Content-Type': 'application/json', // Specify content type
        //                 'Authorization': `Bearer ${session?.token}`, // Include auth token
        //                 'ngrok-skip-browser-warning': 'true'
        //             },
        //         });

        //         if (!response.ok) {
        //             throw new Error(`Failed to edit template: ${response.status}`);
        //         }

        //         const data = await response.json();
        //         console.log('Template edited successfully:', data);
        //     } catch (error) {
        //         console.error('Error editing template:', error);
        //     }
        // }

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





    /**
 * Handles the editing of a template by sending a PUT request to update the template.
 *
 * @async
 * @function editTemplate
 * @description Sends a PUT request to the API to update the template data.
 *              The function constructs the request URL using the template title,
 *              sends the form data, and handles the API response.
 * 
 * @returns {Promise<void>} A Promise that resolves when the template is successfully edited, or rejects with an error.
 * 
 * @throws Will throw an error if the request fails or if the response is not successful.
 */
    const editTemplate = async () => {
        if (type === "edit") {
            try {
                const response = await fetch(`${process?.env?.NEXT_PUBLIC_APIURL}/templates?query=${formData.title}`, {
                    method: 'PUT', // Use PUT or PATCH for editing
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.token}`,
                        'ngrok-skip-browser-warning': 'true',
                    },
                    body: JSON.stringify(formData), // Send formData as the request body
                });
                const data = await response.json();
                console.log('Template edited successfully:', data);
            } catch (error) {
                console.error('Error editing template:', error);
            }
        }
    };



    useEffect(() => {
    }, [onSubmit, editTemplate])




    /**
 * Navigates the user back to the previous page in the browser history.
 *
 * @function goback
 * @description Uses the `router.back()` method to navigate one step back in the browser history stack.
 *              This is useful for users to return to the previous page without refreshing.
 *
 * @returns {void}
 */

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
                setValue('seoTags', newTags); // Ensure the form value is updated as an array
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
            setValue('seoTags', newTags); // Update the form value as an array
            setInputValue(''); // Clear the input field
        }
    };



    // Function to remove a tag
    const removeTag = (index: number) => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);
        setValue('seoTags', updatedTags); // Update the form value as an array
    };



    const [otherIndustry, setOtherIndustry] = useState<string>();

    const handleInputChangeindustryvalue = (e: any) => {
        setOtherIndustry(e.target.value); // Correctly updating state
        if (otherIndustry !== "") {
            clearErrors('industryName')
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
        if (errors && Object.keys(errors).length > 0) {
            const firstErrorKey = Object.keys(errors)[0] as keyof FormData;
            const firstErrorElement = errorRefs.current[firstErrorKey];
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [errors]);

    useEffect(() => {
        if (loader) {
            window.scrollTo(0, 0);
        }
    }, [loader])




    // save as draft option 2
    const handleSaveAsDraft = async () => {
        try {
            setdraftloader(true)
            // Step 1: Get Draft Data
            const draftData = getValues();

            // Step 2: Initialize FormData
            const formData = new FormData();

            // Step 3: Populate FormData with draftData
            Object.entries(draftData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            });

            // Step 4: Handle special case for "industry"
            formData.delete("industry");
            formData.append('industry', draftData?.industry);

            // Step 5: Construct and append "credits"
            const credits = [
                {
                    fonts: fonts?.map(font => ({ name: font.name, url: font.url })),
                    images: images?.map(image => ({ name: image.name, url: image.url })),
                    icons: icons?.map(icon => ({ name: icon.name, url: icon.url })),
                    illustrations: illustrations?.map(illustration => ({ name: illustration.name, url: illustration.url })),
                }
            ];

            formData.delete("credits");
            formData.append("credits", JSON.stringify(credits));

            // Step 6: Make API call
            const response = await fetch(`${process?.env?.NEXT_PUBLIC_APIURL}/draftemplate`, {
                method: 'POST', // Or another method depending on your API
                body: formData,
                headers: {
                    'Authorization': `Bearer ${session?.token}`,
                    'ngrok-skip-browser-warning': 'true',
                },
            });

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message, { autoClose: 1500 });
                setdraftloader(false);
            } else {
                toast.success(result.message, { autoClose: 1500 });
                router.push('/dashboard');
            }

        } catch (error) {
            console.error("Error saving draft:", error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    };


    return (
        <>

            {/* Loader Overlay */}
            {(loader || draft) && (
                <div className="fixed inset-0  bg-[#28204699] flex items-center justify-center z-50">
                    <div className="text-white text-2xl font-bold animate-zoom-out  ">
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
                                {errors?.templateTypeId && (
                                    <p ref={errorRef} style={{ color: 'red' }}>{errors?.templateTypeId.message}</p>
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
                                            onChange={(e) => { setValue('subCategory', e.target.options[e.target.selectedIndex].text); handleSelectChange(e.target.value); field.onChange(e.target.value); handleCategorySelect(e.target.value) }}
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
                                {errors.subCategoryId && <p ref={errorRef} style={{ color: 'red' }}>{errors.subCategoryId.message}</p>}
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

                                {errors.softwareTypeId && <p ref={errorRef} style={{ color: 'red' }}>{errors.softwareTypeId.message}</p>}

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
                                            control={control}
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

                                {errors.industry && (
                                    <p ref={errorRef} style={{ color: 'red' }}>{errors.industry.message}</p>
                                )}

                                {/* Conditional rendering of input box when "Other" is selected */}

                                {(selectedIndustry === 'Others') && (
                                    <div>
                                        <div className="mt-3 flex items-center gap-2">
                                            <input
                                                {...register("industryName")}
                                                type="text"
                                                placeholder="Please specify"
                                                name="industryName"
                                                defaultValue={initialData?.industryName != null || initialData?.industryName != undefined ? otherIndustry : ""}
                                                onChange={handleInputChangeindustryvalue} // Use a function to handle the change
                                                className="border h-[50px] rounded p-2 w-full outline-none"
                                            />
                                        </div>
                                        {errors.industryName && (
                                            <p ref={errorRef} style={{ color: 'red' }}>{errors.industryName.message}</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className='flex flex-col gap-y-5'>
                                <div className="flex flex-col">
                                    <label className="text-xl font-semibold capitalize" htmlFor="title">
                                        Title
                                    </label>
                                    <Controller
                                        name="title"
                                        control={control}
                                        // defaultValue={searchQuery} // Set default value
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                id='title'
                                                type="text"
                                                className='py-[18px] px-5 border border-neutral-400 rounded-md outline-none placeholder:text-neutral-400 bg-white'
                                                placeholder='Template Name'
                                                // value={searchQuery} // Bind searchQuery state to input field
                                                defaultValue={initialData?.title}
                                                onChange={(e) => {
                                                    field.onChange(e); // Update React Hook Form's control
                                                    handleInputChangee(e); // Update local state
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.title && (
                                        <p ref={errorRef} style={{ color: 'red' }}>{errors.title.message}</p>
                                    )}
                                </div>

                                <div className='flex flex-col'>
                                    <label className='text-xl font-semibold capitalize' htmlFor="name">Title Info</label>
                                    <Controller
                                        name="titleinfo"
                                        control={control}
                                        defaultValue="" // Set default value
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                id='titleinfo'
                                                type="text"
                                                className='py-[18px] px-5 border border-neutral-400 rounded-md outline-none placeholder:text-neutral-400 bg-white'
                                                placeholder='Template info'
                                            />
                                        )}
                                    />
                                    {errors.titleinfo && (
                                        <p ref={errorRef} style={{ color: 'red' }}>{errors.titleinfo.message}</p>
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
                                        <p ref={errorRef} style={{ color: 'red' }}>{errors.version.message}</p>
                                    }
                                </div>

                            </div>

                            <div className='mt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>Description</h3>
                                <QuillEditor setValue={setValue} clearErrors={clearErrors} setError={setError} initialValue={initialData?.description} />
                                {errors.description &&
                                    <p ref={(el: any) => (errorRefs.current.description = el)} style={{ color: 'red', marginTop: "10px" }}>{errors.description.message}</p>
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
                                    {errors.techDetails && <p style={{ color: 'red' }}>Required</p>}
                                </div>

                                {/* File Uploads */}


                                {/*  Source file */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Source File</h3>
                                    <Controller
                                        name="sourceFiles"
                                        control={control}
                                        render={({ field }) => (

                                            <input
                                                {...field}
                                                id='sourceFiles'
                                                defaultValue={(initialData && initialData?.sourceFiles != "undefined") ? initialData?.sourceFiles : ''}
                                                type="text"
                                                placeholder="Enter source files URL"
                                                className="w-full py-3 px-2 border border-neutral-400 rounded-md outline-none"
                                            />
                                        )}
                                    />

                                    {errors.sourceFiles && (
                                        <p ref={errorRef} style={{ color: "red" }}>{errors.sourceFiles.message}</p>
                                    )}

                                </div>

                                {/* Slider Images  */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Slider Images</h3>
                                    <div className='p-2 md:p-5 border border-neutral-400 border-dashed rounded-md'>
                                        <Controller
                                            name="sliderImages"
                                            control={control}
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
                                                    register={register}
                                                    initialUrls={initialData?.sliderImages ? initialData?.sliderImages
                                                        : []} // Pass URLs here
                                                    title='Upload Slider Images Here Upto 5'
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.sliderImages && <p ref={(el: any) => (errorRefs.current.sliderImages = el)} style={{ color: 'red' }}>{errors.sliderImages.message}</p>}
                                </div>

                                {/* Deskto preview images */}

                                {
                                    !isMobileSelected &&
                                    <div className='pt-5'>
                                        <h3 className='text-xl font-semibold capitalize pb-4'>Desktop Preview Images</h3>
                                        <div className='p-2 md:p-5 border border-neutral-400 border-dashed rounded-md'>
                                            <Controller
                                                name="previewImages"
                                                control={control}
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
                                                        register={register}
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
                                        {errors.previewImages && <p ref={errorRef} style={{ color: 'red' }}>{errors.previewImages.message}</p>}
                                    </div>
                                }


                                {/* movilePreview Iamges */}
                                <div className='pt-5'>
                                    <h3 className='text-xl font-semibold capitalize pb-4'>Mobile Preview Images</h3>
                                    <div className='p-2 md:p-5 border border-neutral-400 border-dashed rounded-md'>
                                        <Controller
                                            name="previewMobileImages"
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { onChange, value = [] } }) => (
                                                <FileUpload
                                                    deleteimages={deleteimages}
                                                    setDeleteAll={deleteAll}
                                                    type={type}
                                                    register={register}
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
                                    {errors.previewMobileImages && <p ref={errorRef} style={{ color: 'red' }}>{errors.previewMobileImages.message}</p>}
                                </div>

                                {/* meta info */}
                                <div className='pt-5' >
                                    <label >
                                        Meta Title
                                    </label>
                                    <input
                                        id="metaTitle"
                                        {...register("metatitle")}
                                        className="w-full border px-2 py-3  rounded mt-1 outline-none"
                                        placeholder="Enter meta title"
                                    />
                                    {errors?.metatitle && (
                                        <p ref={errorRef} className="text-red-500 text-sm mt-1">{errors?.metatitle.message}</p>
                                    )}
                                </div>

                                <div className='pt-5' >
                                    <label htmlFor="metaDescription" className="block font-medium">
                                        Meta Description
                                    </label>
                                    <textarea
                                        id="metaDescription"
                                        {...register("metadescription")}
                                        className=" h-[200px] w-full border px-2 py-3  rounded mt-1 outline-none"
                                        placeholder="Enter meta description"
                                    />
                                    {errors?.metadescription && (
                                        <p ref={errorRef} className="text-red-500 text-sm mt-1">{errors.metadescription.message}</p>
                                    )}
                                </div>

                                <div className='pt-5'>
                                    <label htmlFor="slug" className="block font-medium">
                                        Slug
                                    </label>
                                    <input
                                        id="slug"
                                        {...register("slug")}
                                        className="w-full border px-2 py-3 rounded mt-1 outline-none"
                                        placeholder="Enter slug"
                                    />
                                    {errors?.slug && (
                                        <p ref={errorRef} className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                                    )}
                                </div>

                                {/* meta info */}

                                {/* SEO tags and price component */}
                                <div className='mt-5'>
                                    <div className="flex flex-col">
                                        <label className="text-xl font-semibold capitalize" htmlFor="seoTags">
                                            SEO Keywords Tag
                                        </label>
                                        <Controller
                                            name="seoTags"
                                            control={control}
                                            render={() => (
                                                <>
                                                    <div className="flex flex-wrap items-center gap-2 mb-2 pt-3">
                                                        {tags && tags?.length > 0 && tags?.map((tag, index) => (
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
                                        {errors.seoTags && (
                                            <p ref={errorRef} style={{ color: 'red' }}>{errors.seoTags.message}</p>
                                        )}
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
                                                    <p ref={errorRef} style={{ color: 'red' }}>{errors.price.message}</p>
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div className='flex gap-6' >
                                        {
                                            loading || loader ? <Button disabled type='submit' loadingbtn={true} iconClass='w-7 h-7' variant='primary' className='py-3 mt-5 w-[50%] justify-center' hideChild='hidden' >

                                            </Button> : <Button type='submit' variant='primary' className='py-3 mt-5 w-[50%] justify-center'>
                                                upload
                                            </Button>
                                        }

                                        <Button loadingbtn={draft} disabled={draft} type="button" className='py-3 mt-5 w-[50%] justify-center' onClick={handleSaveAsDraft}>
                                            {draft ? "" : "Save as Draft"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            {/* <div className="hidden fixed lg:flex gap-3 bottom-5 right-5 z-10">
                <Button
                    variant='primary'
                    onClick={scrollToTop}
                    className='w-[200px] justify-center'
                >
                    Scroll to Top
                </Button>
                <Button
                    variant='primary'
                    onClick={scrollToBottom}
                    className='w-[200px] justify-center '
                >
                    Scroll to Bottom
                </Button>
            </div> */}

            <div className='hidden fixed lg:flex flex-col justify-start items-center gap-4 bottom-5 right-5 z-10' >
                <div className='p-5 bg-primary-100 rounded-full cursor-pointer' onClick={scrollToTop}>

                <Icon color='white' size={12} className='text-center  '  name='toparrow' />
                </div>
                <div className=' p-5 bg-primary-100 rounded-full cursor-pointer' onClick={scrollToBottom}>
                    <Icon color='white' className=' rotate-180 ' size={12}  name='toparrow' />
                </div>
            </div>

        </>
    );
};

export default TemplateForm;
