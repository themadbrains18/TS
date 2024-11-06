"use client"

import FeatureCard from '@/components/cards/FeatureCard'
import Icon from '@/components/Icon'
import FeatureSkeleton from '@/components/skeletons/FeatureSkeleton' // Import your skeleton component
import Button from '@/components/ui/Button'
import useFetch from '@/hooks/useFetch'
import { SoftwareType, TechTemplate } from '@/types/type'
import React, { Fragment, useEffect, useState } from 'react'


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
    sliderImages: SliderImage[]; // Updated sliderImages to hold an array of SliderImage objects
};

type ApiResponse = {
    templates: Template[];
    message: string;
};

const FeatureSection = () => {

    const [items, setItems] = useState<Template[]>([]);
    const { data: response, error, loading, fetchData } = useFetch<ApiResponse>();

    useEffect(() => {
        fetchData("/feature-templates");
    }, []);


    useEffect(() => {
        if (response) {
            setItems(response.templates);
        }
    }, [response]);


    return (
        <section className='bg-bgcolor py-10 lg:py-[100px] '>
            <div className='bg-[url("/images/featurecolor.png")] bg-no-repeat bg-cover bg-right'>
                <div className="container">
                    <h2 className='text-subheading sm:leading-9 font-bold text-[22px] tab:text-[28px]'>Feature Products</h2>

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
                        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[30px]'>
                            {
                                items?.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <FeatureCard
                                                id={item?.id}
                                                buttonprops={item?.price}
                                                category={item?.templateType?.name}
                                                themeicon={item?.softwareType?.name}
                                                title={item?.title}
                                                uploadericon='mdb.svg'
                                                currentimage={1}
                                                poster={item?.sliderImages[0]?.imageUrl}
                                                totalimages={item?.sliderImages?.length}
                                                isPaid={true}
                                            />
                                        </Fragment>
                                    )
                                })
                            }
                        </div>

                    )}

                    <div className='mt-10 flex w-full items-center justify-center'>
                        <Button link='/product' linkclass='w-full md:w-auto' className='w-full' variant='secondary'>
                            View All Products
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
