// "use client";

// import { cn } from '@/libs/utils';
// import React, { useState, useRef, useEffect } from 'react';
// import { UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

// interface InputOtpProps {
//     register: UseFormRegister<any>;
//     setValue: UseFormSetValue<any>; // Add setValue to props
//     className?: string
//     clearErrors?: UseFormClearErrors<any>;
// }

// const InputOtp: React.FC<InputOtpProps> = ({ register, setValue, className, clearErrors }) => {
//     const [activeInput, setActiveInput] = useState<number>(0);
//     const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

//     useEffect(() => {
//         inputsRef.current[activeInput]?.focus();
//     }, [activeInput]);

//     const handleChange = (element: HTMLInputElement, index: number) => {
//         const value = element.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
//         if (value.length > 1) return; // Prevent input of more than 1 character

//         element.value = value; // Update input value directly
//         clearErrors && clearErrors("otp")
//         setValue(`otp[${index}]`, value); // Update form value with react-hook-form's setValue

//         // Move to the next input if a value is entered
//         if (value) {
//             setActiveInput(Math.min(activeInput + 1, 5));
//         } else {
//             setActiveInput(index); // If backspacing, stay on current input
//         }
//     }

//     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//         if (event.key === "Backspace" && !event.currentTarget.value) {
//             setActiveInput(Math.max(activeInput - 1, 0));
//         }
//     };

//     const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
//         const paste = event.clipboardData.getData("text").slice(0, 6).split(""); // Get only the first 6 characters
//         paste.forEach((char, index) => {
//             setValue(`otp[${index}]`, char); // Update the form values using setValue from react-hook-form
//             if (inputsRef.current[index]) {
//                 inputsRef.current[index]!.value = char; // Update the input value directly
//             }
//         });

//         setActiveInput(Math.min(paste.length, 5)); // Set focus to the next input after paste
//         event.preventDefault(); // Prevent the default paste behavior
//     };

//     return (
//         <div className="flex flex-col items-center bg-primary-200 ">
//             <div className={cn`flex space-x-[30px] m-[15px] ${className}`}>
//                 {new Array(6).fill("").map((_, index) => (
//                     <input

//                         key={index}
//                         type="text"
//                         className="max-w-[60px] w-full h-[30px] md:h-[50px] text-center border placeholder:text-[#110833] shadow-[0px_1px_2px_0px_rgba(10,57,79,0.05)] rounded bg-divider-100 border-none outline-none"
//                         {...register(`otp[${index}]`, {
//                             maxLength: 1,
//                         })}
//                         onChange={(e) => handleChange(e.target, index)}
//                         onKeyDown={(e) => handleKeyDown(e, index)}
//                         onFocus={() => setActiveInput(index)}
//                         ref={(el) => {
//                             inputsRef.current[index] = el;
//                         }}
//                         onPaste={handlePaste} // Handle the paste event
//                         maxLength={1} // Ensure only 1 character can be typed
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default InputOtp;



"use client";

import { cn } from '@/libs/utils';
import React, { useState, useRef, useEffect } from 'react';
import { UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface InputOtpProps {
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    className?: string;
    clearErrors?: UseFormClearErrors<any>;
    reset?: boolean | undefined; // Add reset prop
}

const InputOtp: React.FC<InputOtpProps> = ({ register, setValue, className, clearErrors, reset }) => {
    const [activeInput, setActiveInput] = useState<number>(0);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputsRef.current[activeInput]?.focus();
    }, [activeInput]);

    useEffect(() => {
        // Clear the input values if reset is true
        if (reset) {
            inputsRef.current.forEach((input, index) => {
                if (input) {
                    input.value = ""; // Clear the input's visible value
                    setValue(`otp[${index}]`, ""); // Clear the react-hook-form value
                }
            });
            setActiveInput(0); // Reset focus to the first input
        }
    }, [reset, setValue]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        const value = element.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
        if (value.length > 1) return; // Prevent input of more than 1 character

        element.value = value; // Update input value directly
        clearErrors && clearErrors("otp");
        setValue(`otp[${index}]`, value); // Update form value with react-hook-form's setValue

        // Move to the next input if a value is entered
        if (value) {
            setActiveInput(Math.min(activeInput + 1, 5));
        } else {
            setActiveInput(index); // If backspacing, stay on current input
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace" && !event.currentTarget.value) {
            setActiveInput(Math.max(activeInput - 1, 0));
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = event.clipboardData.getData("text").slice(0, 6).split(""); // Get only the first 6 characters
        paste.forEach((char, index) => {
            setValue(`otp[${index}]`, char); // Update the form values using setValue from react-hook-form
            if (inputsRef.current[index]) {
                inputsRef.current[index]!.value = char; // Update the input value directly
            }
        });

        setActiveInput(Math.min(paste.length, 5)); // Set focus to the next input after paste
        event.preventDefault(); // Prevent the default paste behavior
    };

    return (
        <div className="flex flex-col items-center bg-primary-200 ">
            <div className={cn`flex space-x-[30px] m-[15px] ${className}`}>
                {new Array(6).fill("").map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        className="max-w-[60px] w-full h-[30px] md:h-[50px] text-center border placeholder:text-[#110833] shadow-[0px_1px_2px_0px_rgba(10,57,79,0.05)] rounded bg-divider-100 border-none outline-none"
                        {...register(`otp[${index}]`, {
                            maxLength: 1,
                        })}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={() => setActiveInput(index)}
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        onPaste={handlePaste} // Handle the paste event
                        maxLength={1} // Ensure only 1 character can be typed
                    />
                ))}
            </div>
        </div>
    );
};

export default InputOtp;
