import CategoryCard from '@/components/cards/CategoryCard'
import React, { Fragment } from 'react'


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


    /**
    * Array of technology category data.
    * Each object includes the title and image of the technology.
    * 
    * @type {Array<{tittle: string, image: string}>}
    */


    const data = [
        {
            tittle: "Web & Landing Template",
            image: "web.png"
        },
        {
            tittle: "Mobile Apps",
            image: "mobile.png"
        },
        {
            tittle: "Shopify Themes",
            image: "shopify.png"
        },
        {
            tittle: "HTML Development",
            image: "html.png"
        },
    ]
    return (
        <>
            <section className='bg-white py-10 lg:py-[100px]'>
                <div className='container'>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[30px]'>
                        {
                            data?.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <CategoryCard image={`${item.image}`} imageclass='w-full' tittle={`${item.tittle}`} />
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default TrendingTechnology