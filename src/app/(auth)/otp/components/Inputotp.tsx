"use client";

import React, { useState, useRef, useEffect } from 'react';

/**
 * InputOtp Component
 * 
 * This component renders an OTP (One Time Password) input field with 6 digits.
 * It manages state for each digit of OTP, handles focus and navigation between input fields,
 * and supports input validation and paste functionality.
 */


const InputOtp: React.FC = () => {
    // State to hold OTP values
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    // State to manage the active input box
    const [activeInput, setActiveInput] = useState<number>(0);
    // Reference to store input elements
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    // Use effect to focus on the current active input
    useEffect(() => {
        inputsRef.current[activeInput]?.focus();
    }, [activeInput]);

    /**
     * Handle input change for each digit of OTP
     * 
     * @param {HTMLInputElement} element - The input element triggering the change
     * @param {number} index - The index of the OTP digit being changed
     */

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value.replace(/[^0-9]/g, "");
        if (value.length > 1) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next input if the current one has a value
        if (value) {
            setActiveInput(Math.min(activeInput + 1, otp.length - 1));
        }
    };


    /**
     * Handle key down events for OTP input fields
     * 
     * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event object
     * @param {number} index - The index of the OTP digit input field
     */


    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace") {
            const newOtp = [...otp];
            if (!otp[index]) {
                // Move to previous input if the current one is empty
                setActiveInput(Math.max(activeInput - 1, 0));
            } else {
                // Clear the current input value
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };


    /**
     * Handle paste event for OTP input fields
     * 
     * @param {React.ClipboardEvent<HTMLInputElement>} event - The clipboard event object
     */
    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = event.clipboardData.getData("text").slice(0, 6).split("");
        setOtp(paste);
    };

    return (
        <div className="flex flex-col items-center bg-primary-200 p-[15px]">
            <div className="flex space-x-[30px]">
                {otp?.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        className=" max-w-[60px] w-full h-[30px] md:h-[50px] text-center border placeholder:text-[#110833] shadow-[0px_1px_2px_0px_rgba(10,57,79,0.05)]  rounded bg-divider-100 border-none outline-none"
                        value={digit}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={() => setActiveInput(index)}
                        ref={(el: HTMLInputElement | null) => {
                            inputsRef.current[index] = el;
                        }}
                        onPaste={handlePaste}
                        maxLength={1}
                    />
                ))}
            </div>
        </div>
    );
};

export default InputOtp;