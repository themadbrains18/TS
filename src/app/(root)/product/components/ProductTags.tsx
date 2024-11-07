"use client";

import useFetch from '@/hooks/useFetch';
import { subCat } from '@/types/type';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

/**
 * ProductTags component displays a list of category tags that users can click to activate.
 * It highlights the active tag and provides a smooth transition effect for the tags.
 *
 */

const ProductTags = () => {
    const { data: subCatData, fetchData: fetchsubCatData } = useFetch<subCat[]>();
    const [activeIndex, setActiveIndex] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter();

    /**
     * Get template type and subcat from URL
     */
    const templateTypeId = searchParams.get('template-type');
    const subCatId = searchParams.get('subcat');

    useEffect(() => {
        fetchsubCatData(`/sub-categories`);
    }, []);

    /**
     * Filter the subcategories based on template type if applicable
     */
    const filteredSubCatData = templateTypeId
        ? (subCatData?.filter(item => item.templateTypeId === templateTypeId) || [])
        : subCatData;

    /**
     *  Set the active index based on subCatId
     */
    useEffect(() => {
        if (subCatId) {
            const index = filteredSubCatData?.findIndex(item => item.id === subCatId) || 0;
            if (index !== -1) {
                setActiveIndex(index + 1); 
            }
        } else {
            setActiveIndex(0);
        }
    }, [subCatId, filteredSubCatData]);

    const handleAllClick = () => {
        setActiveIndex(0); 
        router.push(`/product`);
    };

    const handleTabClick = (item: any) => {
        setActiveIndex(item.id + 1);
        router.push(`/product?template-type=${templateTypeId || item?.templateTypeId}&subcat=${item.id}`);
    };

    return (
        <div className='container'>
            <div className="flex gap-5 md:flex-row flex-col md:gap-[30px] py-5 md:py-10">
                <div className='max-w-[357px] w-full '>
                    <h2 className='text-[22px] md:text-[20px] font-semibold left-7 text-[#110833] md:border-r'>Category Tags</h2>
                </div>
                <div className='flex overflow-x-scroll hiddenscroll'>
                    {/* Add an "All" tab at the beginning */}
                    <div
                        onClick={handleAllClick}
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

                    {filteredSubCatData?.map((item, index) => {
                        const isActive = index + 1 === activeIndex; // Adjust for "All" being at index 0
                        return (
                            <div
                                key={item.id} // Use item.id as key for better performance
                                onClick={() => handleTabClick(item)} // Call the new handler with the subcategory ID
                                className={`relative mx-[7px] cursor-pointer text-nowrap group`}
                            >
                                <h2
                                    className={`px-[10px] py-[5px] text-lg leading-7 font-normal transition-all duration-500
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
};

export default ProductTags;
