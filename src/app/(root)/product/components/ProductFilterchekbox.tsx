"use client";

import { CheckboxProps } from "@/types/type";
import React from "react";


/**
 * CheckboxFilter is a custom checkbox component that allows users to select or deselect items for filtering.
 * The selected items are stored in the parent component's state.
 * 
 * @param {string} value - The label for the checkbox.
 * @param {string} id - The unique identifier for the checkbox.
 * @param {Function} setItems - Function to update the selected items in the parent component.
 * @param {string[]} items - Array of currently selected items.
 * @param {string} [className] - Optional class name for the checkbox.
 * @param {string} [labelClass] - Optional class name for the label.
 */

const CheckboxFilter = ({
    labelClass,
    className,
    value,
    id,
    setItems,
    items,
}: CheckboxProps) => {
    /**
       * Determines if the checkbox should be checked based on whether the `value` exists in the `items` array.
       * 
       * @type {boolean}
       */
    const isChecked = items.includes(id);

    /**
     * Handles the checkbox state change. If the checkbox is checked, it removes the item from the `items` array,
     * otherwise, it adds the item to the array.
     */
    const handleCheckboxChange = () => {
        if (isChecked) {
            // Remove item from filter if already checked
            setItems(items.filter((item) => item !== id));
        } else {
            // Add item to filter if not checked
            setItems([...items, id]);
        }
    };

    return (
        <div className="inline-flex relative items-center w-full">
            <label
                className={`flex ${labelClass} flex-row items-center text_16_2 text-blue_gray_500 rounded-full cursor-pointer justify-between w-full`}
                htmlFor={id}
            >
                {/* Render checkbox label */}
                <h2 className={`text-[16px] font-normal leading-6 ${isChecked ? "text-subheading" : "text-subparagraph"}  `} >
                    {value}
                </h2>
                <div
                    className={`relative flex justify-center items-center ${isChecked ? "checked" : ""}
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
                        <div className="bg-[#AD54F2] absolute rounded-[2px] h-[10px] w-[10px]"></div>
                    )}
                </div>
            </label>
        </div>
    );
};

export default CheckboxFilter;
