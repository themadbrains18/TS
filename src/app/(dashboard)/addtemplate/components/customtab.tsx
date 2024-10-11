import { useState } from 'react';

interface Option {
    value: string;
    label: string;
}

interface CustomDropdownProps {
    options: Option[];
    onSelect: (value: string) => void;
    placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    onSelect,
    placeholder = 'Select an option',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const handleOptionClick = (option: Option) => {
        setSelected(option.label);
        onSelect(option.value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            {/* Dropdown Button */}
            <button
                type="button"
                className="w-full p-5 text-neutral-500 text-left bg-white border transition-all duration-300 rounded-md border-neutral-400 md shadow-sm  capitalize"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected || placeholder}
                <span className="float-right">
                    <svg
                        className={`w-5 h-5 transform transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border  rounded-md shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 cursor-pointer hover:bg-primary-200 text-neutral-500"
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
