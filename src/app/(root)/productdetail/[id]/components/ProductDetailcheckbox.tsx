import { CheckBoxComponentProps } from '@/types/type';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Props for the CheckBoxComponent.
 * 
 * @typedef {Object} CheckBoxComponentProps
 * @property {string} label - The label text displayed next to the checkbox.
 * @property {string} detailText - The detail text displayed on the right side.
 */

/**
 * A functional component that renders a custom checkbox with a label and detail text.
 * 
 * @param {CheckBoxComponentProps} props - The properties passed to the component.
 * @returns {JSX.Element} The CheckBoxComponent.
 */
const ProductDetailcheckbox: React.FC<CheckBoxComponentProps> = ({ label, detailText, image }) => {
    const [isChecked, setIsChecked] = useState(false);

    /**
     * Handles the checkbox click event by toggling the `isChecked` state.
     */
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div onClick={handleCheckboxChange} className="grid grid-cols-2 w-full justify-between items-center border  border-gray-200 p-2.5 md:p-4 rounded-lg  cursor-pointer">
            <div className="flex items-center space-x-2">
                {/* Custom Checkbox */}
                <div
                    className={`w-5 h-5 flex justify-center items-center overflow-hidden  
                        ${isChecked ? '' : 'border-gray-300  border-2   bg-white'}`}
                >

                    <div className={` duration-[0.5s]  bg-primary-300 p-1 ${isChecked ? "translate-y-[0px]  " : "translate-y-[-20px]"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.9881 1.92853L3.91703 8.99959L0.0119401 5.09451L1.42615 3.68029L3.91703 6.17117L9.57388 0.514312L10.9881 1.92853Z" fill="#AD54F2" />
                        </svg>
                    </div>
                </div>
                {/* Label */}
                <span className={`font-semibold text-[14px] leading-5 ${isChecked ? 'text-primary-100' : 'text-subparagraph'}`}>
                    {label}
                </span>
            </div>
            {/* Right side text and icon */}
            <div className="flex items-center space-x-2 justify-between border-l pl-2">
                <span className="text-subparagraph font-semibold text-[14px] leading-5 text-center max-w-[217px] w-full">
                    {detailText}
                </span>
                <div className='bg-bgcolor flex justify-center w-[30px] h-[30px] '>
                    <Image className={`${isChecked ? 'opacity-1  ' : 'opacity-[0.5]'} duration-[0.5s] object-contain `} src={`${image}`} height={22} width={15} alt={image}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailcheckbox;
