import BuissnessCard from '@/components/cards/BuissnessCard'
import React, { Fragment } from 'react'
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
   * @type {Array<{tittle: string, logo: string}>}
   */
    const data = [
        {
            tittle: "Website Design",
            logo: "creativity.svg"
        },
        {
            tittle: "WordPress Themes",
            logo: "wordpress.svg"
        },
        {
            tittle: "Shopify Themes",
            logo: "shoppify.svg"
        },
        {
            tittle: "Mobile Apps",
            logo: "mobileapp.svg"
        },
        {
            tittle: "Landing Page",
            logo: "landingpage.svg"
        },
        {
            tittle: "E-Commerce Theme",
            logo: "ecommerce.svg"
        },
        {
            tittle: "Dashboard",
            logo: "dashboard.svg"
        },
        {
            tittle: "Wireframe Design",
            logo: "wireframe.svg"
        },
    ]
    return (
        <>
            <section className='py-10 lg:py-[100px] bg-[url("/images/buissnessbg.png")] bg-no-repeat bg-contain bg-right'>
                <div className="container">
                    <div>
                        <h2 className='text-subheading leading-9 font-bold text-[28px]'>Products For Your Business Free of Cost</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-4 md:gap-[30px]'>
                            {
                                data?.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            {/* 
                                        Renders a single business card with a logo and title.
                                        @param {string} item.logo - The path to the product logo.
                                        @param {string} item.tittle - The title of the business product.
                                    */}
                                            <BuissnessCard logo={item.logo} tittle={item.tittle} />
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