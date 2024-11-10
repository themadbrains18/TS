'use client';

import FeatureCard from '@/components/cards/FeatureCard'
import useFetch from '@/hooks/useFetch';
import { TemplateResponse } from '@/types/type';
import React, { Fragment, useEffect } from 'react'

const RelatedProducts = () => {

    const { data,  fetchData } = useFetch<TemplateResponse>();

    useEffect(() => {
        fetchData('/templates');
    }, [fetchData]);

    return (
        <>
            <section className='bg-bgcolor py-10 lg:py-[100px] '>
                <div className='bg-[url("/images/featurecolor.png")] bg-no-repeat bg-cover bg-right'>

                    <div className="container">
                        <div>
                            <h2 className='text-subheading leading-9 font-bold text-[28px]'>Related Products</h2>
                            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-[30px] '>
                                {
                                    data && data?.data && data?.data?.length > 0 &&
                                    data?.data?.slice(0, 4).map((item, index) => (
                                        <Fragment key={index}>
                                            <FeatureCard
                                            id={item?.id}
                                                buttonprops={item?.price}
                                                category={item?.subCategory?.name}
                                                poster={item?.sliderImages[0]?.imageUrl}
                                                themeicon={item?.softwareType?.name}
                                                title={item?.title}
                                                uploadericon={item?.user?.profileImg}
                                                uploadername={item?.user?.name}
                                                currentimage={1}
                                                totalimages={item?.sliderImages?.length}
                                                isPaid={item?.isPaid}
                                            />
                                        </Fragment>
                                    ))
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RelatedProducts