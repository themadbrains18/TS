'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomDropdown from './CustomTab'; // Adjust the path accordingly

// Define schema with zod
const schema = z.object({
    selectedOption: z.string().min(1, 'Please select an option'), // Validation rule
});

const DropdownForm = () => {
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
      
    });

    const onSubmit = (data:any) => {
        console.log(data?.name);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* CustomDropdown usage */}
            <CustomDropdown
                options={[
                    { id: '1', name: 'Option 1' },
                    { id: '2', name: 'Option 2' },
                    { id: '3', name: 'Option 3' },
                ]}
                onSelect={(id) => setValue('selectedOption', id)} // Set value in form
            />

            {/* Error message from form validation */}
            {errors.selectedOption && (
                <span className="text-red-500 text-sm block">
                    please select an option
                </span>
            )}

            <button
                type="submit"
                className="mt-4 p-2 bg-green-500 text-white rounded-md"
            >
                Submit Form
            </button>
        </form>
    );
};

export default DropdownForm;
