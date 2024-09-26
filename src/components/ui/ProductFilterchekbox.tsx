"use client";

import React from "react";

interface CheckboxProps {
    value: string;
    id: string;
    setItems: (items: string[]) => void;
    items: string[];
    className?: string;
    labelClass?: string;
}

const CheckboxFilter = ({
    labelClass,
    className,
    value,
    id,
    setItems,
    items,
}: CheckboxProps) => {
    // Determine if the checkbox is checked based on whether value is in items array
    const isChecked = items.includes(value);

    // Handle checkbox change event
    const handleCheckboxChange = () => {
        if (isChecked) {
            // Remove item from filter if already checked
            setItems(items.filter((item) => item !== value));
        } else {
            // Add item to filter if not checked
            setItems([...items, value]);
        }
    };

    return (
        <div className="inline-flex relative items-center w-full">
            <label
                className={`flex ${labelClass} flex-row items-center text_16_2 text-blue_gray_500 rounded-full cursor-pointer justify-between w-full`}
                htmlFor={id}
            >
                {/* Render checkbox label */}
                {value}
                <div
                    className={`relative ${isChecked ? "checked" : ""}
                         w-[20px] h-[20px] border-solid border
                          ${isChecked ? "border-[#AD54F2]" : "border-gray-300"}
                          rounded-[3px] transition-all`}
                >
                    {/* Hidden checkbox input */}
                    <input
                        id={id}
                        type="checkbox"
                        className={`hidden ${className}`}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    {isChecked && (
                        <div className="bg-[#AD54F2] absolute rounded-[2px] top-[4px] right-[4px] h-[10px] w-[10px]"></div>
                    )}
                </div>
            </label>
        </div>
    );
};

export default CheckboxFilter;
