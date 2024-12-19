
import { cn } from '@/libs/utils';
import { dashinput } from '@/types/type';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';



/**
 * Props for the DashInput component.
 * Extends `dashinput` type and includes additional properties for error handling and form registration.
 */
interface DashInputProps extends dashinput {
  error?: string;
  register?: UseFormRegisterReturn;
}


/**
 * DashInput component renders a styled input field with optional error handling and react-hook-form integration.
 * 
 * @param {DashInputProps} props - The properties for the DashInput component.
 * @returns {React.FC<DashInputProps>} The rendered DashInput component.
 */
const DashInput: React.FC<DashInputProps> = ({ className, placeholder, type, value, onChange, name, error, register }) => {
  return (
    <div className="flex flex-col w-full">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn`outline-none border ${error ? 'border-red-500' : 'border-neutral-400'} rounded-md placeholder:text-neutral-500  w-full p-3 ${className}`}
        {...register} // Pass the register method to the input
      />
      {/* Conditionally render error message */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default DashInput;
