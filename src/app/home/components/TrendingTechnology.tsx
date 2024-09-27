import CategoryCard from '@/components/cards/CategoryCard'
import React, { Fragment } from 'react'
const TrendingTechnology = () => {
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