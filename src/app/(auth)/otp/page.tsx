"use client"

import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import CheckBox from '@/components/ui/checkbox'

const page = () => {

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleCheckboxChange = (id: string) => {
        setSelectedOptions(prevOptions =>
            prevOptions.includes(id)
                ? prevOptions.filter(option => option !== id) // Deselect option
                : [...prevOptions, id] // Select option
        );
    };


    return (
        <div>otp
            <Input className='bg-[#F2EEFE] p-5 ' placeholder='efererere' label='sdsdsdsdsdsd' />
            {/* <InputOtp /> */}
            <CheckBox
                id="html"
                label="HTML"
                checked={selectedOptions.includes('html')}
                onChange={handleCheckboxChange}
            />
            <CheckBox
                id="html"
                label="HTML"
                checked={selectedOptions.includes('html')}
                onChange={handleCheckboxChange}
            />
        </div>

    )
}

export default page

