"use client"
import BuissnessCard from '@/components/cards/BuissnessCard'
import useFetch from '@/hooks/useFetch';
import { subCat } from '@/types/type';
import React, { Fragment, useEffect } from 'react'

/**
 * Component for rendering business products.
 *
 * @component
 * @example
 * return (
 *   <BuissnessProducts />
 * )
 */

const BuissnessProducts = () => {

    /**
   * An array of product data for business services.
   * Each object contains the title and logo of a product.
   * 
   * @type {Array<{title: string, logo: string}>}
   */

    const { data: response, error, loading, fetchData } = useFetch<subCat[]>();

    useEffect(() => {
        fetchData("/sub-categories", {next:{revalidate:2000}});
    }, []);

    
    const data = [
        {
            title: "Website Design",
            logo: "creativity.svg"
        },
        {
            title: "WordPress Themes",
            logo: "wordpress.svg"
        },
        {
            title: "Shopify Themes",
            logo: "shoppify.svg"
        },
        {
            title: "Mobile Apps",
            logo: "mobileapp.svg"
        },
        {
            title: "Landing Page",
            logo: "landingpage.svg"
        },
        {
            title: "E-Commerce Theme",
            logo: "ecommerce.svg"
        },
        {
            title: "Dashboard",
            logo: "dashboard.svg"
        },
        {
            title: "Wireframe Design",
            logo: "wireframe.svg"
        },
    ]
    return (
        <>
            <section className='py-10 lg:py-[100px] bg-[url("/images/buissnessbg.png")] bg-no-repeat bg-contain bg-right'>
                <div className="container">
                    <div>
                        <h2 className='text-subheading sm:leading-9 font-bold text-[22px] tab:text-[28px]'>Free to Download!</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-y-5 gap-x-[15px] md:gap-[30px]'>
                            {
                              response && response?.length>0 &&    response?.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            {/* 
                                        Renders a single business card with a logo and title.
                                        @param {string} item.logo - The path to the product logo.
                                        @param {string} item.title - The title of the business product.
                                    */}
                                            <BuissnessCard logo='dashboard.svg' title={item?.name} id={item?.id} templateType={item?.templateTypeId}/>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BuissnessProducts