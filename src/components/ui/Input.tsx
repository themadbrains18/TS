'use client';
import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password';
    value: string;
    placeholder?: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        <div className="mb-4">
            <label htmlFor={name} className="block font-openSans antialiased text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`block w-full px-4 py-3 text-gray-700 bg-purple-50 border border-purple-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm placeholder-gray-400 ${error ? 'border-red-500' : ''} ${className}`}
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default Input;
