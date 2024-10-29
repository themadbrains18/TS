"use client"

import FeatureCard from '@/components/cards/FeatureCard'
import FeatureSkeleton from '@/components/skeletons/FeatureSkeleton'
import Button from '@/components/ui/Button'
import useFetch from '@/hooks/useFetch'
import { it } from 'node:test'
import React, { Fragment, useEffect, useState } from 'react'
/**
 * Popular section component to display a grid of popular templates with related information.
 * 
 * @component
 * @example
 * return (
 *   <PopularSection />
 * )
 */


type SliderImage = {
    id: string;
    imageUrl: string;
    templateId: string;
};

type TemplateType = {
    id: string;
    name: string;
};

type Template = {
    id: string;
    title: string;
    version: string;
    price: number;
    templateType: TemplateType;
    sliderImages: SliderImage[]; // Updated sliderImages to hold an array of SliderImage objects
};

type ApiResponse = {
    templates: Template[];
    message: string;
};




const PopularSection = () => {
    /**
   * Array of popular templates data.
   * Each object includes information about the poster, title, theme icon, uploader, and other details.
   * 
   * @type {Array<{poster: string, title: string, themeicon: string, uploadericon: string, uploadername: string, category: string, buttonprops: string, currentimage: number, totalimage: number}>}
   */


    const [items, setItems] = useState<Template[]>([]);
    const { data: response, error, loading, fetchData } = useFetch<ApiResponse>();

    useEffect(() => {
        fetchData("/feature-templates");
    }, []);

    useEffect(() => {
        if (response) {
            setItems(response?.templates);
        }
    }, [response]);


    return (
        <>
            <section className='bg-bgcolor py-10 lg:py-[100px] '>
                <div className='bg-[url("/images/featurecolor.png")] bg-no-repeat bg-cover bg-right'>
                    <div className="container">
                        <div>
                            <h2 className='text-subheading leading-9 font-bold text-[22px] tab:text-[28px]'>Popular Template</h2>
                            {loading ? (
                                <div className='transition-all duration-300 w-full grid gap-5 lg:grid-cols-2 xl:grid-cols-3 xl:gap-[30px]'>
                                    <FeatureSkeleton />
                                    <FeatureSkeleton />
                                    <FeatureSkeleton />
                                    <FeatureSkeleton />
                                    <FeatureSkeleton />
                                    <FeatureSkeleton />
                                </div>
                            ) : (
                                <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[30px]'>
                                    {
                                        items?.map((item, index) => (
                                            <Fragment key={index}>
                                                <FeatureCard
                                                    poster={item?.sliderImages[0]?.imageUrl}
                                                    id={item?.id}
                                                    buttonprops={item?.price}
                                                    category={item?.templateType.name}
                                                    themeicon='figma'
                                                    title={item?.title}
                                                    uploadericon='mdb.svg'
                                                    currentimage={1}
                                                    totalimages={item.sliderImages.length}
                                                />
                                            </Fragment>
                                        ))
                                    }
                                </div>

                            )}
                            <div className='mt-10 flex w-full items-center justify-center'>
                                <Button link='/product' linkclass='w-full md:w-auto' className='w-full' variant='secondary' >View All Products</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PopularSection;