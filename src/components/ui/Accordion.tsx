
// 'use client'

// // Accordion.tsx
// import React, { useState, useRef, useEffect } from 'react';
// import Icon from '../Icon';
// import { cn } from '@/libs/utils';

// interface AccordionProps {
//   title: string;
//   children: React.ReactNode;
//   className?: string;
// }

// const Accordion: React.FC<AccordionProps> = ({ title, children, className }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [height, setHeight] = useState<string>('0px');
//   const contentRef = useRef<HTMLDivElement>(null);

//   // Toggle the accordion state
//   const toggleAccordion = () => {
//     setIsOpen(!isOpen);
//   };

//   // Adjust the max-height dynamically based on the content size
//   useEffect(() => {
//     if (contentRef.current) {
//       setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
//     }
//   }, [isOpen]);

//   return (
//     <div className="w-full px-[10px] mt-5">
//       <div
//         onClick={toggleAccordion}
//         className={cn`${className}  bg-white cursor-pointer pb-[10px] flex justify-between items-center border-b border-divider-100`}
//       >
//         <h2 className="font-medium text-subheading leading-6 ">{title}</h2>
//         <Icon name='soliddownicon' className={cn`fill-subheading rotate-90 w-2 transition-all duration-[0.5s] ${isOpen && "rotate-[270deg]"}`} />
//       </div>
//       <div
//         ref={contentRef}
//         style={{ maxHeight: height }}
//         className={cn`transition-max-height transition-all duration-[0.5s] ease overflow-hidden bg-white  ${isOpen ? 'opacity-100 my-5' : 'opacity-0'}`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Accordion;





'use client'

import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon';
import { cn } from '@/libs/utils';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;          // Prop to control if the accordion is open
  onToggle?: () => void;     // Function to handle accordion toggling
}

const Accordion: React.FC<AccordionProps> = ({ title, children, className, isOpen = false, onToggle }) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(isOpen); // Internal state for managing open/close
  const [height, setHeight] = useState<string>('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  // Toggle accordion, either using external `onToggle` or internal state
  const toggleAccordion = () => {
    if (onToggle) {
      onToggle(); // Use the parent-provided onToggle function if available
    } else {
      setInternalOpen(!internalOpen); // Fallback to internal state
    }
  };

  // Synchronize internal open state with the external prop `isOpen`
  useEffect(() => {
    setInternalOpen(isOpen);
  }, [isOpen]);

  // Dynamically calculate height based on the content
  useEffect(() => {
    if (contentRef.current) {
      setHeight(internalOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [internalOpen]);

  return (
    <div className={`w-full px-[10px] mt-5 ${className || ''}`}>
      <div
        onClick={toggleAccordion}
        className={`bg-white cursor-pointer pb-[10px] flex justify-between items-center border-b border-divider-100`}
      >
        <h2 className="font-medium text-subheading leading-6">{title}</h2>
        <Icon
          name='soliddownicon'
          className={`fill-subheading w-2 transition-transform duration-[0.5s] ${internalOpen ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className={`transition-max-height transition-all duration-[0.5s] ease overflow-hidden bg-white ${internalOpen ? 'opacity-100 my-5' : 'opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
