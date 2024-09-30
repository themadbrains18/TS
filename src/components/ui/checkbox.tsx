import React, { useState } from 'react';

interface CheckBoxProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (id: string) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, label, checked, onChange }) => {
    return (
        <div className="form-group mb-4">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={() => onChange(id)}
                className="hidden"
            />
            <label htmlFor={id} className="relative cursor-pointer flex items-center">
                <span
                    className={`block border-2 border-gray-300 p-2 mr-2 transition duration-200 
          ${checked ? 'bg-purple-100 border-transparent' : ''}`}
                ></span>
                {label}
                {checked && (
                    <span className="absolute top-0 left-2 w-2 h-4 border-b border-r border-purple-600 transform rotate-45"></span>
                )}
            </label>
        </div>
    );
};

export default CheckBox;
