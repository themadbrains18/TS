'use client';
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
    label?: string;
    name?: string;
    type?: 'text' | 'email' | 'password' | 'url' | 'number';
    value?: string;
    placeholder?: string;
    error?: string | any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    lableclass?: string;
    register?: UseFormRegister<any>; // Type from react-hook-form
    disabled?:boolean
}

// Modify Input to accept a ref using React.forwardRef
const Input = React.forwardRef<HTMLInputElement, InputFieldProps>(({
    label,
    name,
    type = 'text',
    value,
    placeholder = '',
    error,
    onChange,
    className = '',
    lableclass,
    register,
    disabled
}, ref) => {
    return (
        <div className='w-full'>
            {/* Render the label if it's provided */}
            {label && (
                <label htmlFor={name} className={`font-openSans antialiased text-sm font-medium text-gray-700 mb-1 ${lableclass}`}>
                    {label}
                </label>
            )}
            {name && <input
                {...register && { ...register(name) }}
                // ref={ref}  
                type={type}
                name={name}
                defaultValue={value}
                disabled={disabled ? true : false}
                onChange={onChange}
                placeholder={placeholder}
                className={`flex text-subparagraph w-full outline-none sm:text-sm placeholder:text-sm placeholder:leading-5 placeholder:text-neutral-400 py-3 md:py-[18px] px-5 bg-divider-100 placeholder:capitalize border border-divider-100 ${error ? 'border-red-500' : ''} ${className}`}
            />}
            {/* Display error message if there is an error */}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
});

// Assign a displayName to help with debugging
Input.displayName = 'Input';

export default Input;
