'use client'

import FeatureCard from '@/components/cards/FeatureCard'
import useFetch from '@/hooks/useFetch';
import { TemplateResponse } from '@/types/type';
import React, { Fragment, useEffect } from 'react'

/**
 * RelatedProducts component displays a section of related product cards.
 *
 * @component
 * @returns {JSX.Element} The rendered RelatedProducts component.
 */


const RelatedProducts = () => {

    // Sample data for related products
    // const data = [
    //     {
    //         poster: "/images/popularbg.png",
    //         title: "Room Sharing - UI Kit Template...",
    //         themeicon: "figma.svg",
    //         uploadericon: "mdb.svg",
    //         uploadername: "themadbrains",
    //         category: "UI templates",
    //         buttonprops: 0,
    //         currentimage: 1,
    //         totalimage: 20,
    //         isPaid:false

    //     },
    //     {
    //         poster: "/images/featureimg.png",
    //         title: "Room Sharing - UI Kit Template...",
    //         themeicon: "figma.svg",
    //         uploadericon: "mdb.svg",
    //         uploadername: "themadbrains",
    //         category: "UI templates",
    //         buttonprops: 50,
    //         currentimage: 1,
    //         totalimage: 20,
    //         isPaid:true


    //     },
    //     {
    //         poster: "/images/popularbg.png",
    //         title: "Room Sharing - UI Kit Template...",
    //         themeicon: "figma.svg",
    //         uploadericon: "mdb.svg",
    //         uploadername: "themadbrains",
    //         category: "UI templates",
    //         buttonprops: 49,
    //         currentimage: 1,
    //         totalimage: 20,
    //         isPaid:true


    //     },
    //     {
    //         poster: "/images/featureimg.png",
    //         title: "Room Sharing - UI Kit Template...",
    //         themeicon: "figma.svg",
    //         uploadericon: "mdb.svg",
    //         uploadername: "themadbrains",
    //         category: "UI templates",
    //         buttonprops: 0,
    //         currentimage: 1,
    //         totalimage: 20,
    //         isPaid:false


    //     },
    //     {
    //         poster: "/images/popularbg.png",
    //         title: "Room Sharing - UI Kit Template...",
    //         themeicon: "figma.svg",
    //         uploadericon: "mdb.svg",
    //         uploadername: "themadbrains",
    //         category: "UI templates",
    //         buttonprops: 199,
    //         currentimage: 1,
    //         totalimage: 20,
    //         isPaid:true


    //     },
    //     {
    //         poster: "/images/featureimg.png",
    //         title: "Room Sharing - UI Kit Template...",
    //         themeicon: "figma.svg",
    //         uploadericon: "mdb.svg",
    //         uploadername: "themadbrains",
    //         category: "UI templates",
    //         buttonprops: 99,
    //         currentimage: 1,
    //         totalimage: 20,
    //         isPaid:true


    //     },
    // ]

    // const RelatedProducts = () => {
    const { data, error, loading, fetchData } = useFetch<TemplateResponse>(); // Adjust type if you have a specific data structure

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
                                    data && data.data && data.data.length > 0 &&
                                    data.data.slice(0, 4).map((item, index) => (
                                        <Fragment key={index}>
                                            <FeatureCard
                                                buttonprops={item.price}
                                                category={item.subCategory.name}
                                                poster={item.sliderImages[0]?.imageUrl}
                                                themeicon={item.softwareType.name}
                                                title={item.title}
                                                uploadericon={"mdb.svg"}
                                                currentimage={1}
                                                totalimages={item?.sliderImages?.length}
                                                isPaid={item.isPaid}
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