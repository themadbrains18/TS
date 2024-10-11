"use client";
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

// Define schema for validation
const schema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.number().positive("Price must be positive"),
    description: z.string().optional(),
    templateTypeId: z.string().min(1, "Template Type is required"),
    subCategoryId: z.string().min(1, "Subcategory is required"),
    softwareTypeId: z.string().min(1, "Software Type is required"),
    mobileVersion: z.boolean().optional(),
    documentationReady: z.boolean().optional(),
    seoTags: z.string().optional(),
    isPaid: z.boolean().optional(),
    sourceFiles: z.array(z.object({
        file: z.instanceof(File).refine(file => file.type === 'application/zip', {
            message: "Only ZIP files are allowed"
        }),
    })).optional(),
    sliderImages: z.array(z.object({
        file: z.instanceof(File).refine(file => file.type.startsWith('image/'), {
            message: "Only image files are allowed"
        }),
    })).optional(),
    previewImages: z.array(z.object({
        file: z.instanceof(File).refine(file => file.type.startsWith('image/'), {
            message: "Only image files are allowed"
        }),
    })).optional(),
});

// Define the type for form data based on the schema
type FormData = z.infer<typeof schema>;

const UploadProduct: React.FC = () => {
    const { control, handleSubmit, register, watch, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            price: 0,
            description: '',
            templateTypeId: '',
            subCategoryId: '',
            softwareTypeId: '',
            mobileVersion: false,
            documentationReady: false,
            seoTags: '',
            isPaid: false,
            sourceFiles: [],
            sliderImages: [],
            previewImages: [],
        }
    });

    const [templateTypes, setTemplateTypes] = useState<{ id: string; name: string; }[]>([]);
    const [subCategories, setSubCategories] = useState<{ id: string; name: string; }[]>([]);
    const [softwareTypes, setSoftwareTypes] = useState<{ id: string; name: string; }[]>([]);

    const selectedTemplateType = watch("templateTypeId");

    useEffect(() => {
        // Fetch Template Types
        const fetchTemplateTypes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/template-types`);
                setTemplateTypes(response.data);
            } catch (error) {
                console.error("Error fetching template types:", error);
            }
        };

        fetchTemplateTypes();
    }, []);

    useEffect(() => {
        // Fetch Subcategories based on selected Template Type
        const fetchSubCategories = async () => {
            if (selectedTemplateType) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/sub-categories/${selectedTemplateType}`);
                    setSubCategories(response.data);
                    setValue("subCategoryId", ""); // Reset subCategoryId
                    setValue("softwareTypeId", ""); // Reset softwareTypeId
                } catch (error) {
                    console.error("Error fetching subcategories:", error);
                }
            }
        };

        fetchSubCategories();
    }, [selectedTemplateType, setValue]);

    useEffect(() => {
        // Fetch Software Types based on selected Template Type
        const fetchSoftwareTypes = async () => {
            if (selectedTemplateType) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/software-types/${selectedTemplateType}`);
                    setSoftwareTypes(response.data);
                    setValue("softwareTypeId", ""); // Reset softwareTypeId
                } catch (error) {
                    console.error("Error fetching software types:", error);
                }
            }
        };

        fetchSoftwareTypes();
    }, [selectedTemplateType, setValue]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const files = Array.from(event.target.files || []);
        setValue(field, files.map(file => ({ file })));
    };

    const onSubmit = async (data: FormData) => {
        console.log("Form data:", data); // Log the form data
    if (Object.keys(errors).length > 0) {
        console.log("Validation errors:", errors); // Log validation errors
    }
        try {
            // Prepare form data for submission
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('price', String(data.price)); // Convert price to string
            formData.append('description', data.description || ''); // Default to empty string if undefined
            formData.append('templateTypeId', data.templateTypeId);
            formData.append('subCategoryId', data.subCategoryId);
            formData.append('softwareTypeId', data.softwareTypeId);
            formData.append('mobileVersion', String(data.mobileVersion)); // Convert boolean to string
            formData.append('documentationReady', String(data.documentationReady)); // Convert boolean to string
            formData.append('seoTags', data.seoTags || ''); // Default to empty string if undefined
            formData.append('isPaid', String(data.isPaid)); // Convert boolean to string

            // Append source files
            if (data.sourceFiles) {
                data.sourceFiles.forEach(sourceFile => {
                    formData.append('sourceFiles', sourceFile.file);
                });
            }

            // Append slider images
            if (data.sliderImages) {
                data.sliderImages.forEach(sliderImage => {
                    formData.append('sliderImages', sliderImage.file);
                });
            }

            // Append preview images
            if (data.previewImages) {
                data.previewImages.forEach(previewImage => {
                    formData.append('previewImages', previewImage.file);
                });
            }

            await axios.post(`http://localhost:5000/api/templates`, formData, { // Route to create a new template
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert("Template uploaded successfully!");
        } catch (error) {
            console.error("Error uploading template:", error);
            alert("Error uploading template");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-[800px] mx-auto">
            <h1 className="text-xl font-bold">Upload Template</h1>

            <div>
                <label className="block mb-1">Title</label>
                <input {...register("title")} className="w-full border border-gray-300 p-2 rounded" />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Price</label>
                <input type="number" {...register("price", {
                    valueAsNumber: true // This will ensure the input is treated as a number
                })} className="w-full border border-gray-300 p-2 rounded" />
                {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Description</label>
                <textarea {...register("description")} className="w-full border border-gray-300 p-2 rounded" />
            </div>

            <div>
                <label className="block mb-1">Template Type</label>
                <Controller
                    name="templateTypeId"
                    control={control}
                    render={({ field }) => (
                        <select {...field} className="w-full border border-gray-300 p-2 rounded">
                            <option value="">Select Template Type</option>
                            {templateTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    )}
                />
                {errors.templateTypeId && <p className="text-red-500">{errors.templateTypeId.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Subcategory</label>
                <Controller
                    name="subCategoryId"
                    control={control}
                    render={({ field }) => (
                        <select {...field} className="w-full border border-gray-300 p-2 rounded">
                            <option value="">Select Subcategory</option>
                            {subCategories.map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </select>
                    )}
                />
                {errors.subCategoryId && <p className="text-red-500">{errors.subCategoryId.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Software Type</label>
                <Controller
                    name="softwareTypeId"
                    control={control}
                    render={({ field }) => (
                        <select {...field} className="w-full border border-gray-300 p-2 rounded">
                            <option value="">Select Software Type</option>
                            {softwareTypes.map(software => (
                                <option key={software.id} value={software.id}>{software.name}</option>
                            ))}
                        </select>
                    )}
                />
                {errors.softwareTypeId && <p className="text-red-500">{errors.softwareTypeId.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Mobile Version</label>
                <input type="checkbox" {...register("mobileVersion")} />
            </div>

            <div>
                <label className="block mb-1">Documentation Ready</label>
                <input type="checkbox" {...register("documentationReady")} />
            </div>

            <div>
                <label className="block mb-1">SEO Tags</label>
                <input {...register("seoTags")} className="w-full border border-gray-300 p-2 rounded" />
            </div>

            <div>
                <label className="block mb-1">Is Paid</label>
                <input type="checkbox" {...register("isPaid")} />
            </div>

            <div>
                <label className="block mb-1">Source Files (ZIP)</label>
                <input type="file" accept="application/zip" multiple onChange={(e) => handleFileChange(e, 'sourceFiles')} />
                {errors.sourceFiles && <p className="text-red-500">{errors.sourceFiles.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Slider Images</label>
                <input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, 'sliderImages')} />
                {errors.sliderImages && <p className="text-red-500">{errors.sliderImages.message}</p>}
            </div>

            <div>
                <label className="block mb-1">Preview Images</label>
                <input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, 'previewImages')} />
                {errors.previewImages && <p className="text-red-500">{errors.previewImages.message}</p>}
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Upload Template</button>
        </form>
    );
};

export default UploadProduct;
