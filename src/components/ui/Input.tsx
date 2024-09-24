'use client';
import React from 'react';

interface InputFieldProps {
    label?: string;
    name?: string;
    type?: 'text' | 'email' | 'password';
    value?: string;
    placeholder?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input: React.FC<InputFieldProps> = ({ 
    label, 
    name, 
    type = 'text', 
    value, 
    placeholder = '', 
    error, 
    onChange, 
    className = '',
}) => {
    return (
        <div className='w-full'>
            <label htmlFor={name} className=" font-openSans antialiased text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={` flex text-subparagraph w-full outline-none sm:text-sm placeholder:text-sm placeholder:text-subparagraph placeholder:leading-5  ${error ? 'border-red-500' : ''} ${className}`}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
