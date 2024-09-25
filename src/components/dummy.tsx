// App.tsx
import React from 'react';
import Accordion from './ui/Accordion';
import NavTabs from './NavTabs';

interface AccordionData {
  title: string;
  content: string;
}

const  accordionData = [
    "Ui Templates",
    "HTML Templates",
    "Studio Spacial",
]

const Appdata: React.FC<AccordionData> = () => {
  return (
    <>
    <div className="">
      {accordionData.map((item, index) => (
        <Accordion key={index} title={item}>
       <NavTabs/>
        </Accordion>
      ))}
    </div>
    </>
  );
};

export default Appdata;
