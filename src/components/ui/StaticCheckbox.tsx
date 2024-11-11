import React from 'react';

interface StaticCheckBoxProps {
    label: string;
    labelPosition?: 'left' | 'right';
    checked: boolean;
    customClass?: string;
    onClick:()=>void
}

const StaticCheckBox: React.FC<StaticCheckBoxProps> = ({
    label,
    labelPosition = 'right',
    checked,
    customClass = '',
    onClick
}) => {
    return (
        <div onClick={onClick} className={`form-group mb-4 w-max flex items-center cursor-pointer ${customClass}`}>
            {/* Static checkbox box */}
            <span
                className={`block border-2 border-gray-300 p-2 mr-2 transition duration-200 relative
                    ${checked ? 'bg-purple-100 border-transparent' : ''}`}
            >
                {checked && (
                    <span className="absolute top-[0px] left-[5px] w-[6px] h-[11px] border-b border-r border-purple-600 transform rotate-45"></span>
                )}
            </span>

            {/* Label */}
            {labelPosition === 'right' && (
                <span className={`capitalize ${checked ? "text-primary-900" : "text-subparagraph"} text-[14px] font-semibold leading-5`}>
                    {label}
                </span>
            )}
        </div>
    );
};
 
export default StaticCheckBox;
