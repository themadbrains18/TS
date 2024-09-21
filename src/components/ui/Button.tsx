import React from 'react';
import { cn } from '@/libs/utils';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', isLoading = false, children, onClick }) => {
    const buttonClasses = cn(
        'rounded focus:outline-none focus:ring',
        {
            'bg-blue-500 hover:bg-blue-600 text-white': variant === 'primary',
            'bg-gray-500 hover:bg-gray-600 text-white': variant === 'secondary',
            'bg-red-500 hover:bg-red-600 text-white': variant === 'danger',
            'px-2 py-1 text-sm': size === 'sm',
            'px-4 py-2 text-md': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
        }
    );

    return (
        <button className={buttonClasses} onClick={onClick} disabled={isLoading}>
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
