
import { cn } from '@/libs/utils';
import { dashinput } from '@/types/type';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface DashInputProps extends dashinput {
  error?: string;
  register?: UseFormRegisterReturn;
}

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
