"use client"

import Icon from '@/components/Icon'
import Accordion from '@/components/ui/Accordion';
import CheckboxFilter from '@/components/ui/ProductFilterchekbox';
import { ProductFiltersidetype } from '@/types/type';
import React, { useState } from 'react'


const ProductFilterside = ({ items, setItems, closefilter }: ProductFiltersidetype) => {
    const filterData = [
        {
            title: "Price Range",
            items: [
                { label: "$0 - $50", value: "0-50" },
                { label: "$50 - $100", value: "50-100" },
                { label: "$100 - $200", value: "100-200" },
            ],
        },
        {
            title: "Discount",
            items: [
                { label: "10% off or more", value: "10" },
                { label: "20% off or more", value: "20" },
                { label: "50% off or more", value: "50" },
            ],
        },
        {
            title: "Category",
            items: [
                { label: "Electronics", value: "electronics" },
                { label: "Fashion", value: "fashion" },
                { label: "Home & Kitchen", value: "home-kitchen" },
            ],
        },
    ];
    return (
        <>
            <div className='max-w-[357px] w-full py-[30px] px-[20px] bg-white h-full' >
                <div className='flex justify-between items-center border-b pb-5 mb-5' >
                    <div className='flex gap-[5px] items-center   '  >
                        <Icon name='filter' />
                        <h3 className='lg:text-[18px] leading-[28px] font-normal text-subparagraph' >Filters</h3>
                    </div>
                    <div className=' md:bl border-l  h-[40px] hidden md:block ' ></div>
                    <div onClick={closefilter} className='md:hidden' >
                        <Icon name='closeiconfilter' />
                    </div>
                </div>
                <div className='overflow-y-scroll h-[calc(100%_-_100px)] ' >
                    {filterData.map((section, sectionIndex) => (
                        <Accordion key={sectionIndex} className="border-none" title={section.title}>
                            <div className="border-b pb-5 mb-5">
                                {section.items.map((item, index) => (
                                    <div key={index + item.value} className="py-[5px] mb-1">
                                        <CheckboxFilter
                                            // labelclass="gap-[10px]"
                                            value={item.value}
                                            id={item.value}
                                            setItems={setItems}
                                            items={items}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Accordion>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductFilterside

