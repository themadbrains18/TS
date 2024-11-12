"use client"
import { TemplateType } from '@/app/(dashboard)/dashboard/addtemplate/components/templateForm';
import CategoryCard from '@/components/cards/CategoryCard';
import useFetch from '@/hooks/useFetch';
import { subCat } from '@/types/type';
import React, { Fragment, useEffect } from 'react';

/**
 * TrendingTechnology component to display a grid of trending technology categories.
 * Each category contains a title and an associated image.
 * 
 * @component
 * @example
 * return (
 *   <TrendingTechnology />
 * )
 */
const TrendingTechnology = () => {
    const { data: response, loading, fetchData } = useFetch<subCat[]>();

    useEffect(() => {
        fetchData("/sub-categories");
    }, []);

    /**
     * Function to determine the image URL based on template name or type.
     * 
     * @param {string} name - The name of the template
     * @param {string} type - The type of the template
     * @returns {string} - The corresponding image file name
     */
    const getImageForTemplate = (name: string, type: string): string => {
        if (name === "Website Design Mockups") return "shopify.png";
        if (name === "Mobile Design Mockups") return "html.png";
        if (type === "UI Template") return "web.png";
        return "default.png"; // Fallback image if none of the conditions match
    };

    

    return (
        <section className='bg-white py-10 lg:py-[100px]'>
            <div className='container'>
                {/* <div className='grid grid-cols-2 lg:grid-cols-4 gap-[15px] md:gap-[30px]'>
                    {response && response.length > 0 && response.map((item, index) => {
                        const imageSrc = getImageForTemplate(item?.name, item?.name);
                        return (
                            <Fragment key={index}>
                                <CategoryCard 
                                    image={imageSrc} 
                                    imageclass='w-full' 
                                    title={item?.name} 
                                    id={item?.id}
                                />
                            </Fragment>
                        );
                    })}
                </div> */}
                <div className='flex justify-center items-center gap-[15px] md:gap-[30px]'>
                    {response && response.length > 0 && response.map((item, index) => {
                        const imageSrc = getImageForTemplate(item?.name, item?.name);
                        return (
                            <Fragment key={index}>
                                <CategoryCard 
                                    image={imageSrc} 
                                    imageclass='w-full' 
                                    title={item?.name} 
                                    id={item?.id}
                                    templateid={item?.templateTypeId}
                                />
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default TrendingTechnology;
