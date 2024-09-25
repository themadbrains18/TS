
'use client'

// Accordion.tsx
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<string>('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  // Toggle the accordion state
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Adjust the max-height dynamically based on the content size
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div className="w-full px-[10px] mt-5">
      <div
        onClick={toggleAccordion}
        className="bg-white cursor-pointer pb-[10px] flex justify-between items-center border-b border-divider-100"
      >
        <h2 className="font-medium text-subheading leading-6 ">{title}</h2>
       <Icon name='soliddownicon' className={`fill-subheading rotate-90 w-2 transition-all duration-[0.5s] ${isOpen && "rotate-[270deg]"}`}/>
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className={`transition-max-height transition-all duration-[0.5s] ease overflow-hidden bg-white  ${isOpen ? 'opacity-100 my-5' : 'opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
