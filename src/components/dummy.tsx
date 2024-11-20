// App.tsx
import React from 'react';
import Accordion from './ui/Accordion';
import NavTabs from './NavTabs';
import { AccordionData } from '@/types/type';


/**
 * Accordion data array containing titles for the accordion sections.
 * 
 * @type {string[]}
 */
const accordionData = [
  "Ui Templates",
  "HTML Templates",
  "Studio Spacial",
]


/**
 * Appdata component renders a series of accordions,
 * each containing navigation tabs.
 * 
 * @component
 * @returns {JSX.Element} The rendered Appdata component.
 */
const Appdata: React.FC<AccordionData> = () => {
  return (
    <>
      <div className="">
        {accordionData?.map((item, index) => (
          <Accordion key={index} title={item}>
            <NavTabs />
          </Accordion>
        ))}
      </div>
    </>
  );
};

export default Appdata;
