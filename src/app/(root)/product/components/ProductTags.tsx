"use client";

import useFetch from '@/hooks/useFetch';
import { subCat } from '@/types/type';
import React, { useEffect, useState } from 'react';

/**
 * ProductTags component displays a list of category tags that users can click to activate.
 * It highlights the active tag and provides a smooth transition effect for the tags.
 *
 * @component
 * @example
 * return (
 *   <ProductTags />
 * )
 */

const ProductTags = () => {
    const { data: subCatData, fetchData: fetchsubCatData } = useFetch<subCat[]>();

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        fetchsubCatData(`/sub-categories`);
    }, []);

    return (
        <div className='container'>
            <div className="flex gap-5 md:flex-row flex-col md:gap-[30px] py-5 md:py-10">
                <div className='max-w-[357px] w-full md:border-r '>
                    <h2 className='text-5 font-semibold left-7 text-[#110833]' >Category Tags</h2>
                </div>
                <div className='flex overflow-x-scroll xl:overflow-hidden hiddenscroll'>
                    {/* Add an "All" tab at the beginning */}
                    <div
                        onClick={() => setActiveIndex(0)} // Set active index to 0 for "All"
                        className={`relative mx-[7px] cursor-pointer text-nowrap group`}
                    >
                        <h2
                            className={`px-[10px] py-[5px] leading-7 font-normal transition-all duration-500 
                                ${activeIndex === 0 ? 'text-primary-100' : 'text-subparagraph'}
                            `}
                        >
                            All
                        </h2>

                        {/* Bottom border effect for "All" tab */}
                        <span
                            className={`absolute bottom-[2px] left-1/2 transform -translate-x-1/2 h-[1px] bg-primary-100 transition-all duration-500
                                ${activeIndex === 0 ? 'w-full' : 'w-0 group-hover:w-full'}
                            `}
                        />
                    </div>

                    {subCatData && subCatData.map((item, index) => {
                        const isActive = index + 1 === activeIndex; // Adjust for "All" being at index 0
                        return (
                            <div
                                key={index}
                                onClick={() => setActiveIndex(index + 1)} // Adjust index for subCategories
                                className={`relative mx-[7px] cursor-pointer text-nowrap group`}
                            >
                                <h2
                                    className={`px-[10px] py-[5px] leading-7 font-normal transition-all duration-500 
                                        ${isActive ? 'text-primary-100' : 'text-subparagraph'}
                                    `}
                                >
                                    {item.name}
                                </h2>

                                {/* Bottom border effect */}
                                <span
                                    className={`absolute bottom-[2px] left-1/2 transform -translate-x-1/2 h-[1px] bg-primary-100 transition-all duration-500
                                        ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                                    `}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ProductTags;
