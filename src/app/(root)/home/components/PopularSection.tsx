"use client"

import FeatureCard from '@/components/cards/FeatureCard'
import FeatureSkeleton from '@/components/skeletons/FeatureSkeleton'
import Button from '@/components/ui/Button'
import useFetch from '@/hooks/useFetch'
import { SoftwareType } from '@/types/type'
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
    softwareType: SoftwareType;
    templateType: TemplateType;
    sliderImages: SliderImage[];
    user:{
        name:string,
        id:string,
        profileImg:string
    }
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
    const { data: response,  loading, fetchData } = useFetch<ApiResponse>();

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
                    <div className="container bg-[url('/images/bgfeature2.png')] bg-no-repeat bg-contain bg-left">
                        <div>
                            <h2 className='text-subheading sm:leading-9 font-bold text-[22px] tab:text-[28px]'>Popular Template</h2>
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
                                                    category={item?.templateType?.name}
                                                    themeicon={item?.softwareType?.name}
                                                    title={item?.title}
                                                    uploadericon={item?.user?.profileImg}
                                                uploadername={item?.user?.name}
                                                    currentimage={1}
                                                    totalimages={item.sliderImages?.length}
                                                    isPaid={true}
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
            </section>
        </>
    )
}

export default PopularSection;