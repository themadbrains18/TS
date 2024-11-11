'use client'

import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon';
import { cn } from '@/libs/utils';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;       
  onToggle?: () => void;
  titleclass?: string    
  titleboxclass?: string
}

const Accordion: React.FC<AccordionProps> = ({ title, children, className, titleclass, isOpen = false, onToggle, titleboxclass }) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(isOpen); 
  const [height, setHeight] = useState<string>('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  /**
   * Toggle accordion, either using external `onToggle` or internal state
   */
  const toggleAccordion = () => {
    if (onToggle) {
      onToggle(); 
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  /**
   * Toggle accordion, either using external `onToggle` or internal state
   */
  useEffect(() => {
    setInternalOpen(isOpen);
  }, [isOpen]);

  /**
   * Dynamically calculate height based on the content
   */
  useEffect(() => {
    if (contentRef.current) {
      setHeight(internalOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [internalOpen]);

  return (
    <div className={`w-full px-[10px] mt-5 ${className || ''}`}>
      <div
        onClick={toggleAccordion}
        className={`bg-white  cursor-pointer pb-[10px] ${titleboxclass} flex justify-between items-center  `}
      >
        <h2 className={cn`text-subheading leading-6 font-medium ${titleclass}`}>{title}</h2>
        <Icon
          name='soliddownicon'
          className={`fill-subheading w-2 transition-transform duration-[0.5s] ${internalOpen ? 'rotate-[270deg]' : 'rotate-90'}`}
        />
      </div>
      <div
        ref={contentRef}
        style={{ height: height }}
        className={`transition-max-height transition-all duration-[0.5s] ease overflow-hidden bg-white ${internalOpen ? 'opacity-100 my-5' : 'opacity-0'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
