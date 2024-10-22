"use client"

import Icon from '@/components/Icon'
import Accordion from '@/components/ui/Accordion';
import { Industry, ProductFiltersidetype, SoftwareType } from '@/types/type';
import React, { useEffect, useState } from 'react'
import CheckboxFilter from './ProductFilterchekbox';
import useFetch from '@/hooks/useFetch';

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
    const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // Track multiple open sections, default to first open

    const { data: industryData, fetchData: fetchIndustryData } = useFetch<Industry[]>();
    const { data: softwareData, fetchData: fetchSoftwareData } = useFetch<SoftwareType[]>();

    useEffect(() => {

        fetchIndustryData('/industry-type')
        fetchSoftwareData('/software-types')

    }, [])


    const filterData = [
        {
            title: "Price Range",
            items: [
                { name: "$0 - $50", id: "0-50" },
                { name: "$50 - $100", id: "50-100" },
                { name: "$100 - $200", id: "100-200" },
            ],
        },
        {
            title: "Template Studio Special",
            items: [
                { name: "Feature Products", id: "Feature Products" },
                { name: "Popular Template", id: "Popular Template" },
                { name: "Browse Trending Categories", id: "Browse Trending Categories" },
            ],
        },
        {
            title: "Industries",
            items:industryData,
        },
        // {
        //     title: "Tags",
        //     items: [
        //         { label: "Real Estate", value: "Real Estate" },
        //         { label: "Insurance", value: "Insurance" },
        //         { label: "Education", value: "Education" },
        //         { label: "Entertainment", value: "Entertainment" },
        //         { label: "Real Estate", value: "Real Estate" },
        //         { label: "Retail", value: "Retail" },
        //         { label: "Sports", value: "Sports" },
        //         { label: "Technology", value: "Technology" },
        //         { label: "Crypto", value: "Crypto" },
        //         { label: "NFT", value: "NFT" },
        //     ],
        // },
        {
            title: "Software Type",
            items: softwareData,
        },
    ];


    const toggleAccordion = (sectionIndex: number) => {
        if (openIndexes.includes(sectionIndex)) {
            // If section is open, remove it from the openIndexes array
            setOpenIndexes(openIndexes.filter(index => index !== sectionIndex));
        } else {
            // Otherwise, add it to the array
            setOpenIndexes([...openIndexes, sectionIndex]);
        }
    };

    return (
        <>

            <div className="max-w-full sm:max-w-[357px] w-full py-[30px] px-[20px] bg-white h-full">
                <div className="flex justify-between items-center border-b border-divider-100 pb-5 mb-5">
                    <div className="flex gap-[5px] items-center">
                        <Icon name="filter" />
                        <h3 className="lg:text-[18px] leading-[28px] font-normal text-subparagraph">Filters</h3>
                    </div>
                    <div className="md:bl border-l h-[30px] hidden md:block"></div>
                    <div onClick={closefilter} className="md:hidden">
                        <Icon name="closeiconfilter" />
                    </div>
                </div>
                <div className="overflow-y-scroll h-[calc(100%_-_100px)] hiddenscroll">
                    {filterData.map((section, sectionIndex) => (
                        <Accordion
                            key={sectionIndex}
                            titleclass=' tab:text-xl font-semibold leading-7'
                            className="border-none"
                            title={section.title}
                            isOpen={openIndexes.includes(sectionIndex)} // Check if the section is open
                            onToggle={() => toggleAccordion(sectionIndex)} // Toggle the accordion
                        >
                            <div className="border-b pb-5 mb-5">
                                {section && section?.items?.map((item, index) => (
                                    <div key={index + item?.id} className="py-[5px] px-5 mb-1 hover:bg-primary-300">
                                        <CheckboxFilter
                                            value={item?.name}
                                            id={item?.name}
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
    );
}

export default ProductFilterside;
