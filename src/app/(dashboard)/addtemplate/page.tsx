'use client'
import Input from '@/components/ui/Input'
import React, { useState } from 'react'
import CustomDropdown from './components/customtab';
import CheckBox from '@/components/ui/Checkbox';
import QuillEditor from '@/components/ui/Quilleditor';
import DashInput from './components/DashInput';
import Button from '@/components/ui/Button';
import FileUpload from './components/InputFile';
const page = () => {

    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [isChecked1, setIsChecked1] = useState(false);
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const handleSelect = (value: string) => {
        setSelectedValue(value);
    };

    const handleFileSelect = (file: File | null) => {
        if (file) {
            console.log('Selected file:', file);
        } else {
            console.log('No file selected');
        }
    };

    const indusrtdata = ["fintech", "health care", "e-commerce", "real estate", "technology", "crypto", "education"]

    return (
        <>
            <section className='py-10 md:py-20'>
                <div className="max-w-[802px] w-full py-0 px-4 my-0 mx-auto">
                    <div className=''>
                        <h2 className='text-3xl capitalize font-bold pb-8 '>upload product</h2>
                        <div className="flex flex-col gap-y-5 justify-center items-center w-full">
                            <div className='w-full'>
                                <CustomDropdown placeholder='template type' options={options} onSelect={handleSelect} />
                            </div>
                            <div className='w-full'>
                                <CustomDropdown placeholder='template SubCategory' options={options} onSelect={handleSelect} />
                            </div>
                            <div className='w-full'>
                                <CustomDropdown placeholder='software type' options={options} onSelect={handleSelect} />
                            </div>
                            <div className='w-full'>
                                <CustomDropdown placeholder='software type' options={options} onSelect={handleSelect} />
                            </div>
                            <div className='w-full'>
                                <CustomDropdown placeholder='cms type' options={options} onSelect={handleSelect} />
                            </div>
                        </div>
                        <div className='mt-5'>
                            <h3 className='text-xl font-semibold capitalize '>Industry</h3>
                            <div className='flex justify-between mt-5 '>
                                {
                                    indusrtdata?.map((item, index) => {
                                        return (<>
                                            <CheckBox
                                                id="checkbox1"
                                                label={item}
                                                checked={isChecked1}
                                                onChange={() => setIsChecked1(!isChecked1)}
                                                labelPosition="left"
                                                customClass="my-custom-checkbox capitalize cursor-pointer"
                                            />
                                        </>)
                                    })
                                }

                            </div>
                            <div className='flex flex-col gap-y-5'>

                                <Input label='name' lableclass='text-xl font-semibold capitalize' className='border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400' placeholder='Template Name' />
                                <Input label='Version' lableclass='text-xl font-semibold capitalize' className='border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400' placeholder='Template Name' />

                            </div>
                            <div className='mt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>description</h3>
                                <QuillEditor />
                            </div>
                            <div className='pt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>credits</h3>
                                <div className='p-5 border border-neutral-400 rounded-md'>
                                    <div className='flex flex-col gap-y-5'>
                                        <div className='border-b border-neutral-400 pb-3'>
                                            <h4 className='text-lg font-semibold capitalize  pb-4'>fonts</h4>

                                            <div className='flex items-center gap-x-3'>
                                                <DashInput type='text' placeholder='font name' />
                                                <DashInput type='text' placeholder='font url' />
                                            </div>
                                            <Button children="Add more" variant='primary' className='py-2 mt-2' />
                                        </div>
                                        <div className='border-b border-neutral-400 pb-3'>
                                            <h4 className='text-lg font-semibold capitalize  pb-4'>fonts</h4>

                                            <div className='flex items-center gap-x-3'>
                                                <DashInput type='text' placeholder='font name' />
                                                <DashInput type='text' placeholder='font url' />
                                            </div>
                                            <Button children="Add more" variant='primary' className='py-2 mt-2' />
                                        </div>
                                        <div className='border-b border-neutral-400 pb-3'>
                                            <h4 className='text-lg font-semibold capitalize  pb-4'>fonts</h4>

                                            <div className='flex items-center gap-x-3'>
                                                <DashInput type='text' placeholder='font name' />
                                                <DashInput type='text' placeholder='font url' />
                                            </div>
                                            <Button children="Add more" variant='primary' className='py-2 mt-2' />
                                        </div>
                                        <div className='border-b border-neutral-400 pb-3'>
                                            <h4 className='text-lg font-semibold capitalize  pb-4'>fonts</h4>

                                            <div className='flex items-center gap-x-3'>
                                                <DashInput type='text' placeholder='font name' />
                                                <DashInput type='text' placeholder='font url' />
                                            </div>
                                            <Button children="Add more" variant='primary' className='py-2 mt-2' />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='pt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>technical details</h3>
                                <div className='p-5 border border-dashed border-neutral-400 rounded-md '>
                                    <div className='flex flex-col gap-y-5'>
                                        <div className='flex flex-col items-center gap-y-3 '>
                                            <FileUpload supportedfiles='zip' onFileSelect={handleFileSelect} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>slider images</h3>
                                <div className='p-5 border border-dashed border-neutral-400 rounded-md '>
                                    <div className='flex flex-col gap-y-5'>
                                        <div className='flex flex-col items-center gap-y-3 '>
                                            <FileUpload supportedfiles='png , jpg , jpeg' onFileSelect={handleFileSelect} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-5'>
                                <h3 className='text-xl font-semibold capitalize  pb-4'>preview images</h3>
                                <div className='p-5 border border-dashed border-neutral-400 rounded-md '>
                                    <div className='flex flex-col gap-y-5'>
                                        <div className='flex flex-col items-center gap-y-3 '>
                                            <FileUpload supportedfiles='png , jpg , jpeg' onFileSelect={handleFileSelect} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <Input label='SEO keywords tag' lableclass='text-xl font-semibold capitalize' className='pb-3 border border-neutral-400 p-3 rounded-md outline-none placeholder:text-neutral-400' placeholder='Template Name' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page


