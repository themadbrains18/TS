'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/ui/Input';
import QuillEditor from '@/components/ui/Quilleditor';
import DashInput from './components/DashInput';
import Button from '@/components/ui/Button';
import FileUpload from './components/InputFile';
import useFetch from '@/hooks/useFetch';
import StaticCheckBox from '@/components/ui/StaticCheckbox';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadTemplate } from '@/validations/uploadTemplate';
import CustomDropdown from './components/customtab';
import { subCat } from '@/types/type';
import CheckBox from '@/components/ui/checkbox';
import { z } from 'zod';

// Define types for data structures
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



const Page: React.FC = () => {
  // Fetch data hooks for template types, subcategories, and industries
  const { data, fetchData, loading, error } = useFetch<TemplateType[]>();
  const { data: templateData, fetchData: fetchTemplateData, } = useFetch<any>();
  const { data: industryData, fetchData: fetchIndustryData } = useFetch<IndustryType[]>();


  // State for fonts, images, icons, and illustrations
  const [fonts, setFonts] = useState<Font[]>([{ name: '', url: '' }]);
  const [images, setImages] = useState<Font[]>([{ name: '', url: '' }]);
  const [icons, setIcons] = useState<Font[]>([{ name: '', url: '' }]);
  const [illustrations, setIllustrations] = useState<Font[]>([{ name: '', url: '' }]);
  // Technical details state (4 inputs by default)
  const [technicalDetails, setTechnicalDetails] = useState<string[]>(['', '', '', '']); // Initialize with four empty strings


  // Dropdown selection states
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [categoryValue, setCategoryValue] = useState<string | null>(null);
  const [softwareType, setSoftwareType] = useState<string | null>(null);

  const [staticcheck, setStaticCheck] = useState(false);

  // Checkbox selection for industries
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // Handle template dropdown selection
  const handleTemplateSelect = (value: string) => {
    setSelectedValue(value);
    fetchTemplateData(`/sub-categories/${value}`);
  };

  // Handle category dropdown selection
  const handleCategorySelect = (value: string) => {
    setCategoryValue(value);
  };

  // Handle software dropdown selection
  const handleSoftwareSelect = (value: string) => {
    setSoftwareType(value);
  };

  // Handle file selection from FileUpload component
  const handleFileSelect = (file: File[] | null) => {
    if (file) {
      console.log('Selected file:', file);
    } else {
      console.log('No file selected');
    }
  };
  // Handle file selection from FileUpload component
  const handlePreviewFileSelect = (file: File[] | null) => {
    if (file) {
      console.log('Selected file:', file);
    } else {
      console.log('No file selected');
    }
  };
  // Handle file selection from FileUpload component
  const handleSliderFileSelect = (file: File[] | null) => {
    if (file) {
      console.log('Selected file:', file);
    } else {
      console.log('No file selected');
    }
  };

  // Handle checkbox change for industries
  const handleIndustryChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedIndustries((prev) => [...prev, id]);
    } else {
      setSelectedIndustries((prev) => prev.filter((industry) => industry !== id));
    }
  };
  // const handlepaid = (id: string, isChecked: boolean) => {
  //   if (isChecked) {
  //     setIsPaid((prev) => [...prev, id]);
  //   } else {
  //     setIsPaid((prev) => prev.filter((industry) => industry !== id));
  //   }
  // };

  useEffect(() => {
    // Fetch template types and industries on mount
    fetchData(`/template-types`);
    // fetchData(`/sub-categories`);
    fetchIndustryData(`/industry-type`);
  }, [fetchData, fetchIndustryData]);

  // Generalized function to add new input fields
  const addInputFields = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, values: T[], isObject: boolean) => {
    const newValue = isObject ? { name: '', url: '' } : ''; // Create an empty object or string based on type
    setter([...values, newValue as T]); // Add the new value to the state
  };

  // Function to handle input field changes
  const handleInputChange = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number, value: T, values: T[]) => {
    const newValues = [...values];
    newValues[index] = value; // Update the value at the specified index
    setter(newValues);
  };

  // Function to remove input fields
  const removeInputField = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number, values: T[]) => {
    if (values.length > 4) { // Ensure there are at least 4 fields
      const newValues = [...values];
      newValues.splice(index, 1); // Remove the input at the specified index
      setter(newValues);
    }
  };

  const renderInputFields = (items: Font[], setter: React.Dispatch<React.SetStateAction<Font[]>>, title: string) => (
    <div className='pb-3'>
      <h4 className='text-lg font-semibold capitalize pb-4'>{title}</h4>
      <div className="p-5 border-b border-neutral-400">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-x-3 pb-3">
            <DashInput
              type='text'
              placeholder='font name'
              value={item.name}
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
  // Render technical details fields
  const renderTechnicalDetailsFields = () => (
    <div className='pb-3'>
      <div className="p-5 border-b border-neutral-400">
        {technicalDetails.map((detail, index) => (
          <div key={index} className="flex items-center gap-x-3 pb-3">
            <DashInput
              type='text'
              placeholder='Detail Name'
              value={detail}
              onChange={(e) => handleInputChange(setTechnicalDetails, index, e.target.value, technicalDetails)}
            />
            {technicalDetails.length > 4 && (
              <Button
                onClick={() => removeInputField(setTechnicalDetails, index, technicalDetails)}
                className="py-1 px-2"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button onClick={() => addInputFields(setTechnicalDetails, technicalDetails, false)} variant='primary' className='py-2 mt-2'>
          Add more
        </Button>
      </div>
    </div>
  );

  interface FormData {
    name: string;
    version: string;
    seoTags: string;
    dollarPrice: number;
    templateType: string;
    templateSubCategory: string;
    softwareType: string;
    zipfile: FileList;
    sliderimg: FileList;
    previewimg: FileList;
    mobileimg: FileList;
  }


  const { register, reset, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(uploadTemplate)
  });
  console.log(errors)
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  };


  return (
    <>
      <section className='py-10 md:py-20'>
        <div className="max-w-[802px] w-full py-0 px-4 my-0 mx-auto">
          <h2 className='text-3xl capitalize font-bold pb-8 '>Upload Product</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-5 justify-center items-center w-full">
              {/* <CustomDropdown placeholder='Template Type' options={data || []} onSelect={handleTemplateSelect} />
              <CustomDropdown placeholder='Template SubCategory' options={templateData?.subCategories} onSelect={handleCategorySelect} />
              <CustomDropdown placeholder='Software Type' options={templateData?.softwareCategories} onSelect={handleSoftwareSelect} />

                  {/* Template Type Dropdown */}
              <div className='w-full'>
                <select
                  className='custom-dropdown-template'
                  id="templateType"
                  {...register}
                  name='templateType'
                  onChange={(e) => handleTemplateSelect(e.target.value)} // Use onChange here
                >
                  {data?.map((option) => {
                    return (
                      <option className='cursor-pointer' key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    )
                  }

                  )}
                </select>

                {
                  errors?.templateType && (
                    <p style={{ color: 'red' }}>{errors.templateType.message}</p>
                  )}
              </div>

              {/* Template SubCategory Dropdown */}
              <div className='w-full'>
                <select className='custom-dropdown-template' id="templateSubCategory" {...register} name='templateSubCategory' onChange={(e) => handleCategorySelect(e.target.value)}>
                  {templateData?.subCategories?.map((option: any) => {
                    return (
                      <option className='cursor-pointer' key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    )
                  })}
                </select>
                {errors.templateSubCategory && <p style={{ color: 'red' }}>{errors.templateSubCategory.message}</p>}
              </div>

              {/* Software Type Dropdown */}
              <div className='w-full'>
                <select className='custom-dropdown-template' id="softwareType" {...register} name='softwareType' onChange={(e) => handleSoftwareSelect(e.target.value)}>
                  {templateData?.softwareCategories.map((softwareCategory: any) => {
                    return (

                      <option className='cursor-pointer' key={softwareCategory.id} value={softwareCategory.id}>
                        {softwareCategory.name}
                      </option>
                    )
                  })}
                </select>
                {errors.softwareType && <p style={{ color: 'red' }}>{errors.softwareType.message}</p>}
              </div>
            </div>
            <div className='mt-5'>
              <h3 className='text-xl font-semibold capitalize '>Industry</h3>
              <div className='flex justify-between mt-5'>
                {industryData?.map((item) => (
                  <CheckBox
                    key={item.id}
                    id={item.id}
                    label={item.name}
                    checked={selectedIndustries.includes(item.id)}
                    onChange={handleIndustryChange}
                    labelPosition="left"
                    customClass="my-custom-checkbox capitalize cursor-pointer"
                  />
                ))}
              </div>

              <div className='flex flex-col gap-y-5'>
                <div className='flex flex-col'>
                  <label className='text-xl font-semibold capitalize' htmlFor="seoTags">Name</label>
                  <input {...register} id='name' type="text" name='name' className='py-[18px] px-5 border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400 bg-white  ' placeholder='Template Name' />
                  {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                </div>
                <div className='flex flex-col'>
                  <label className='text-xl font-semibold capitalize' htmlFor="seoTags">Version</label>
                  <input {...register} id='version' type="text" name='version' className='py-[18px] px-5 border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400 bg-white  ' placeholder='version' />
                  {errors.version && <p style={{ color: 'red' }}>{errors.version.message}</p>}
                </div>
              </div>

              <div className='mt-5'>
                <h3 className='text-xl font-semibold capitalize  pb-4'>Description</h3>
                <QuillEditor />
              </div>

              <div className='pt-5'>
                <h3 className='text-xl font-semibold capitalize  pb-4'>Credits</h3>
                <div className='p-5 border border-neutral-400 rounded-md'>
                  {renderInputFields(fonts, setFonts, 'fonts')}
                  {renderInputFields(images, setImages, 'images')}
                  {renderInputFields(icons, setIcons, 'icons')}
                  {renderInputFields(illustrations, setIllustrations, 'illustrations')}
                </div>
              </div>

              <div className='pt-5'>
                <h3 className='text-xl font-semibold capitalize  pb-4'>Technical Details</h3>
                <div className='p-5 border border-neutral-400 rounded-md'>
                  {renderTechnicalDetailsFields()}
                </div>
              </div>

              {/* File Uploads */}
              <div className='pt-5'>
                <h3 className='text-xl font-semibold capitalize pb-4'>Source File</h3>
                <div className='p-5 border border-neutral-400 border-dashed rounded-md'>
                  <FileUpload
                    name='zipfile'
                    onFileSelect={(file) => handleFileSelect(file)}
                    supportedfiles="zip"
                    multiple={false}
                    id="1"
                    register={register}
                  />
                </div>
                {errors.zipfile && <p style={{ color: 'red' }}>{errors.zipfile.message}</p>}
              </div>

              <div className='pt-5'>
                <h3 className='text-xl font-semibold capitalize pb-4'>Slider Images</h3>
                <div className='p-5 border border-neutral-400 border-dashed rounded-md'>
                  <FileUpload
                    name='sliderimg'
                    onFileSelect={(file) => handleSliderFileSelect(file)}
                    supportedfiles="jpg,png,jpeg"
                    multiple={true}
                    id="2"
                    register={register}

                  />
                </div>
                {errors.sliderimg && <p style={{ color: 'red' }}>{errors.sliderimg.message}</p>}
              </div>

              <div className='pt-5'>
                <h3 className='text-xl font-semibold capitalize pb-4'>Preview Images</h3>
                <div className='p-5 border border-neutral-400 border-dashed rounded-md'>
                  <FileUpload
                    name='previewimg'
                    onFileSelect={(file) => handlePreviewFileSelect(file)}
                    register={register}

                    supportedfiles="jpg,png,jpeg"
                    multiple={true}
                    id="3"

                  />
                </div>
                {errors.previewimg && <p style={{ color: 'red' }}>{errors.previewimg.message}</p>}

              </div>
              <div className='pt-5'>
                <h3 className='text-xl font-semibold capitalize pb-4'>Mobile Images</h3>
                <div className='p-5 border border-neutral-400 border-dashed rounded-md'>
                  <FileUpload
                    register={register}
                    name='mobileimg'
                    onFileSelect={(file) => handlePreviewFileSelect(file)}

                    supportedfiles="jpg,png,jpeg"
                    multiple={true}
                    id="4"

                  />
                </div>
                {errors.mobileimg && <p style={{ color: 'red' }}>{errors.mobileimg.message}</p>}

              </div>
              <div className='mt-5'>
                {/* <div className='flex flex-col'>
                  <label className='text-xl font-semibold capitalize' htmlFor="seoTags">SEO Keywords Tag</label>
                  <input {...register} id='seoTags' type="text" name='seoTags' className='py-[18px] px-5 border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400 bg-white  ' placeholder='SEO Keywords Tag' />
                  {errors.seoTags && <p style={{ color: 'red' }}>{errors.seoTags.message}</p>}
                </div> */}
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
                  <StaticCheckBox onClick={() => setStaticCheck(!staticcheck)} checked={staticcheck} label='Paid' />
                  {
                    staticcheck &&
                    <div className='flex flex-col'>
                      <label className='text-xl font-semibold capitalize' htmlFor="dollarPrice">price in dollar</label>
                      <input {...register} id='dollarPrice' type="text" name='dollarPrice' className='py-[18px] px-5 border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400 bg-white  ' placeholder='price in dollar' />
                      {errors.dollarPrice && <p style={{ color: 'red' }}>{errors.dollarPrice.message}</p>}
                    </div>
                  }
                </div>
                <Button type='submit' variant='primary' className='py-3 mt-5' >Upload</Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Page;






