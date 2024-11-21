"use client";
import Icon from '@/components/Icon';
import Accordion from '@/components/ui/Accordion';
import { Industry, ProductFiltersidetype, SoftwareType } from '@/types/type';
import React, { useEffect, useState } from 'react';
import CheckboxFilter from './ProductFilterchekbox';
import useFetch from '@/hooks/useFetch';
const ProductFilterside = ({ items, setItems, closefilter, setSelectedFilters }: ProductFiltersidetype) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([0]);
    const { data: industryData, fetchData: fetchIndustryData } = useFetch<Industry[]>();
    const { data: softwareData, fetchData: fetchSoftwareData } = useFetch<SoftwareType[]>();
    useEffect(() => {
        fetchIndustryData('/industry-type');
        fetchSoftwareData('/software-types');

    }, []);
    console.log(softwareData, "softwareData")
    const filterData = [
        {
            title: "Price Range",
            items: [
                { name: "0$ - 50$", id: "0-50" },
                { name: "50$ - 100$", id: "50-100" },
                { name: "100$ - 200$", id: "100-200" },
                { name: "200$ - more..", id: "200-more" },
            ],
        },
        // {
        //     title: "Template Studio Special",
        //     items: [
        //         { name: "Feature Products", id: "Feature Products" },
        //         { name: "Popular Template", id: "Popular Template" },
        //         { name: "Browse Trending Categories", id: "Browse Trending Categories" },
        //     ],
        // },
        {
            title: "Industries",
            items: industryData,
        },
        {
            title: "Software Type",
            items: softwareData,
        },
    ];
    const toggleAccordion = (sectionIndex: number) => {
        if (openIndexes?.includes(sectionIndex)) {
            setOpenIndexes(openIndexes.filter(index => index !== sectionIndex));
        } else {
            setOpenIndexes([...openIndexes, sectionIndex]);
        }
    };
    return (
        <div className="max-w-full sm:max-w-[357px] w-full py-[30px] px-[20px] bg-white  h-screen">
            <div className="flex justify-between items-center border-b border-divider-100 pl-5 pr-2.5 md:px-0 pb-5 mb-5 ">
                <div className="flex gap-[5px] items-center">
                    <Icon name="filter" />
                    <h5 className="font-normal text-[18px] leading-7 text-subparagraph text-h5">Filters</h5>
                </div>
                <span className='md:block hidden border-r h-[30px]' ></span>
                <button className='md:hidden' onClick={closefilter}>
                    <Icon name="productfilterclose" />
                </button>
            </div>
            <div className='overflow-y-scroll  h-[calc(100%_-_100px)] custom-scrollbar-horizon   ' >
                {filterData?.map((filterSection, index) => (
                    <Accordion
                        key={index}
                        title={filterSection?.title}
                        isOpen={openIndexes.includes(index)}
                        onToggle={() => toggleAccordion(index)}
                        titleclass='md:text-[18px] text-[16px] font-semibold leading-7'
                        className='border-b border-divider-100 '
                    >
                        <div className="grid gap-[10px]">
                            {filterSection && filterSection?.items?.map((item, itemIndex) => (
                                <div className='md:pl-5 md:pr-2  py-[5px]' >
                                    <CheckboxFilter
                                        key={itemIndex}
                                        value={item?.name}
                                        id={`${item?.id},${filterSection?.title},${item?.name}`}
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
    );
};
export default ProductFilterside;