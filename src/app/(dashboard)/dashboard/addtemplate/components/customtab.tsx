// import useOnClickOutside from '@/hooks/useOnClickOutside';
// import { useRef, useState } from 'react';

// interface Option {
//     id: string;
//     name: string;
// }

// interface CustomDropdownProps {
//     options: Option[];
//     onSelect: (id: string) => void;
//     placeholder?: string;
// }

// const CustomDropdown: React.FC<CustomDropdownProps> = ({
//     options,
//     onSelect,
//     placeholder = 'Select an option',
// }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selected, setSelected] = useState<string | null>(null);
//     const dropdownRef = useRef<HTMLDivElement>(null);

//     const handleOptionClick = (option: Option) => {
//         setSelected(option.name);
//         onSelect(option.id);
//         setIsOpen(false);
//     };

//     // Close the dropdown if clicked outside
//     useOnClickOutside(dropdownRef, () => setIsOpen(false));


//     return (
//         <div ref={dropdownRef} className="relative w-full">
//             {/* Dropdown Button */}
//             <button
//                 type="button"
//                 className="w-full p-3 text-neutral-500 text-left bg-white border transition-all duration-300 rounded-md border-neutral-400 md shadow-sm capitalize"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 {selected || placeholder}
//                 <span className="float-right">
//                     <svg
//                         className={`w-5 h-5 transform transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 9l-7 7-7-7"
//                         />
//                     </svg>
//                 </span>
//             </button>

//             {/* Dropdown Menu */}
//             {isOpen && (
//                 <div className="absolute z-10 w-full mt-1 bg-white border  rounded-md shadow-lg">
//                     {options?.map((option) => (
//                         <div
//                             key={option?.id}
//                             onClick={() => handleOptionClick(option)}
//                             className="px-4 py-2 cursor-pointer hover:bg-primary-200 text-neutral-500"
//                         >
//                             {option?.name}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomDropdown;




import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useRef, useState } from 'react';

interface Option {
    id: string;
    name: string;
}

interface CustomDropdownProps {
    options: Option[];
    onSelect: (id: string) => void;
    placeholder?: string;
    error?: string | undefined | null;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    onSelect,
    placeholder = 'Select an option',
    error,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    /*
      * Handles the click event on an option in a selection list or dropdown.
      * @param option - The selected option object, which includes details like the option's `name` and `id`.
    */
    const handleOptionClick = (option: Option) => {
        setSelected(option?.name);
        onSelect(option?.id);
        // setIsOpen(false);
    };

    /**
     * Close the dropdown if clicked outside
    */
    useOnClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div ref={dropdownRef} className="relative w-full">
            {/* Dropdown Button */}
            <button
                type="button"
                className={`w-full p-3 text-neutral-500 text-left bg-white border transition-all duration-300 rounded-md border-neutral-400 shadow-sm capitalize ${error ? 'border-red-500' : ''}`} // Apply error style if needed
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected || placeholder}
                <span className="float-right">
                    <svg
                        className={`w-5 h-5 transform transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
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

            {/* Error Message */}
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    {options?.map((option) => (
                        <div
                            key={option?.id}
                            onClick={() => handleOptionClick(option)}
                            className="px-4 py-2 cursor-pointer hover:bg-primary-200 text-neutral-500"
                        >
                            {option?.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
