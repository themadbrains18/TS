'use client'
import Input from '@/components/ui/Input'
import React, { useState } from 'react'
import CustomDropdown from './components/customtab';

const page = () => {

    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const handleSelect = (value: string) => {
        setSelectedValue(value);
    };

    return (
        <>
            <section className='py-10 md:py-20'>
                <div className="max-w-[802px] w-full py-0 px-4 my-0 mx-auto">
                    <div className=''>
                        <h2 className='text-3xl capitalize font-bold pb-8 '>upload product</h2>
                        <div className="flex flex-col gap-y-5 justify-center items-center w-full">
                            <div className='w-full'>
                                <CustomDropdown placeholder='template type'  options={options} onSelect={handleSelect} />
                            </div>
                            <div className='w-full'>
                                <CustomDropdown placeholder='template SubCategory'  options={options} onSelect={handleSelect} />
                            </div>
                            <div className='w-full'>
                                <CustomDropdown placeholder='software type'  options={options} onSelect={handleSelect} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page