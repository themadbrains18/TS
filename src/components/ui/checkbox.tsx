import React from 'react';

interface CheckBoxProps {
    id: string;
    label: string;
    index?:number;
    checked: boolean;
    onChange: (id: string) => void;
    labelPosition?: 'left' | 'right'; // New prop for label position
    disabled?: boolean; // New prop for disabling the checkbox
    customClass?: string; // New prop for adding custom classes
}

const CheckBox: React.FC<CheckBoxProps> = ({
    id,
    label,
    index,
    checked,
    onChange,
    labelPosition = 'right', // Default label position is right
    disabled = false, // Default is not disabled
    customClass = '', // Empty class by default
}) => {
    return (
        <div className={`form-group mb-4 flex items-center ${customClass}`}>

            <input
                type="checkbox"
                id={`${id+index}`}
                checked={checked}
                onChange={() => onChange(id)}
                disabled={disabled} // Checkbox can be disabled
                className="hidden"
            />
            <label
                htmlFor={id}
                className={` relative cursor-pointer flex items-center ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
            >
                <span
                    className={` block border-2 border-gray-300 p-2 mr-2 transition duration-200
            ${checked ? 'bg-purple-100 border-transparent' : ''}`}
                >
                </span>
                {labelPosition === 'right' && label}
                {
                    checked && (
                        <span className="absolute top-[2px] left-[7px] w-[6px] h-[11px] border-b border-r border-purple-600 transform rotate-45"></span>
                    )
                }
            </label >
            <label htmlFor={id} className={` ${checked ? "text-primary-900" : "text-subparagraph"}mr-2`}>
                <span className={` capitalize ${checked ? "text-primary-900" : "text-subparagraph"}  text-[14px] font-semibold leading-5`} >
                    {label}
                </span>
            </label>
        </div >
    );
};

export default CheckBox;
