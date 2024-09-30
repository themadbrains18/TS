"use client"

import Icon from '@/components/Icon'
import Accordion from '@/components/ui/Accordion';
import { ProductFiltersidetype } from '@/types/type';
import React from 'react'
import CheckboxFilter from './ProductFilterchekbox';

/**
 * ProductFilterside is a sidebar component that allows users to filter products
 * by various categories such as price range, industries, tags, and more. It includes 
 * an accordion for each filter category and checkboxes for the individual filter options.
 *
 * @param {Object} props - The props for the component.
 * @param {string[]} props.items - The currently selected filter items.
 * @param {Function} props.setItems - Function to update the selected filter items.
 * @param {Function} props.closefilter - Function to close the filter sidebar on mobile.
 * 
 * @returns {JSX.Element} The rendered ProductFilterside component.
 */

const ProductFilterside = ({ items, setItems, closefilter }: ProductFiltersidetype) => {
    // Define filter data for different categories
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
            title: "Template Studio Special",
            items: [
                { label: "Feature Products", value: "Feature Products" },
                { label: "Popular Template", value: "Popular Template" },
                { label: "Browse Trending Categories", value: "Browse Trending Categories" },
            ],
        },
        {
            title: "Industries",
            items: [
                { label: "Real Estate", value: "Real Estate" },
                { label: "Insurance", value: "Insurance" },
                { label: "Education", value: "Education" },
                { label: "Entertainment", value: "Entertainment" },
                { label: "Real Estate", value: "Real Estate" },
                { label: "Retail", value: "Retail" },
                { label: "Sports", value: "Sports" },
                { label: "Technology", value: "Technology" },
                { label: "Crypto", value: "Crypto" },
                { label: "NFT", value: "NFT" },
            ],
        },
        {
            title: "Tags",
            items: [
                { label: "Real Estate", value: "Real Estate" },
                { label: "Insurance", value: "Insurance" },
                { label: "Education", value: "Education" },
                { label: "Entertainment", value: "Entertainment" },
                { label: "Real Estate", value: "Real Estate" },
                { label: "Retail", value: "Retail" },
                { label: "Sports", value: "Sports" },
                { label: "Technology", value: "Technology" },
                { label: "Crypto", value: "Crypto" },
                { label: "NFT", value: "NFT" },
            ],
        },
        {
            title: "Software Type",
            items: [
                { label: "Software Type", value: "Software Type" },
                { label: "HTML / CSS", value: "HTML / CSS" },
                { label: "React", value: "React" },
                { label: "Bootstrap", value: "Bootstrap" },
                { label: "Figma", value: "Figma" },
                { label: "Sketch", value: "Sketch" },
                { label: "Adobe XD ", value: "Adobe XD " },
            ],
        },
    ];
    return (
        <>
            <div className='max-w-full sm:max-w-[357px] w-full py-[30px] px-[20px] bg-white h-full' >
                <div className='flex justify-between items-center border-b border-divider-100  pb-5 mb-5' >
                    <div className='flex gap-[5px] items-center   '  >
                        <Icon name='filter' />
                        <h3 className='lg:text-[18px] leading-[28px] font-normal text-subparagraph' >Filters</h3>
                    </div>
                    <div className=' md:bl border-l  h-[30px] hidden md:block ' ></div>
                    <div onClick={closefilter} className='md:hidden' >
                        <Icon name='closeiconfilter' />
                    </div>
                </div>
                <div className='overflow-y-scroll h-[calc(100%_-_100px)] hiddenscroll ' >
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

