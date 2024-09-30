import FeatureCard from '@/components/cards/FeatureCard'
import Button from '@/components/ui/Button'
import React, { Fragment } from 'react'

/**
 * Section component for displaying featured products.
 *
 * @component
 * @example
 * return (
 *   <FeatureSection />
 * )
 */


const FeatureSection = () => {


     /**
     * An array of featured product data.
     * Each object contains details about the featured product, such as the poster, title, theme icon, uploader information, and more.
     * 
     * @type {Array<{poster: string, tittle: string, themeicon: string, uploadericon: string, uploadername: string, category: string, buttonprops: string, currentimage: number, totalimage: number}>}
     */
    const data = [
        {
            poster: "featureimg.png",
            tittle: "Room Sharing - UI Kit Template...",
            themeicon: "figma.svg",
            uploadericon: "mdb.svg",
            uploadername: "themadbrains",
            category: "UI templates",
            buttonprops: "free",
            currentimage: 1,
            totalimage: 20

        },
        {
            poster: "featureimg.png",
            tittle: "Room Sharing - UI Kit Template...",
            themeicon: "figma.svg",
            uploadericon: "mdb.svg",
            uploadername: "themadbrains",
            category: "UI templates",
            buttonprops: "free",
            currentimage: 1,
            totalimage: 20

        },
        {
            poster: "featureimg.png",
            tittle: "Room Sharing - UI Kit Template...",
            themeicon: "figma.svg",
            uploadericon: "mdb.svg",
            uploadername: "themadbrains",
            category: "UI templates",
            buttonprops: "free",
            currentimage: 1,
            totalimage: 20

        },
        {
            poster: "featureimg.png",
            tittle: "Room Sharing - UI Kit Template...",
            themeicon: "figma.svg",
            uploadericon: "mdb.svg",
            uploadername: "themadbrains",
            category: "UI templates",
            buttonprops: "free",
            currentimage: 1,
            totalimage: 20

        },
        {
            poster: "featureimg.png",
            tittle: "Room Sharing - UI Kit Template...",
            themeicon: "figma.svg",
            uploadericon: "mdb.svg",
            uploadername: "themadbrains",
            category: "UI templates",
            buttonprops: "free",
            currentimage: 1,
            totalimage: 20

        },
        {
            poster: "featureimg.png",
            tittle: "Room Sharing - UI Kit Template...",
            themeicon: "figma.svg",
            uploadericon: "mdb.svg",
            uploadername: "themadbrains",
            category: "UI templates",
            buttonprops: "free",
            currentimage: 1,
            totalimage: 20

        },
    ]
    return (
        <>
            <section className='bg-bgcolor py-10 lg:py-[100px] '>
                <div className='bg-[url("/images/featurecolor.png")] bg-no-repeat bg-cover bg-right'>
                    <div className="container">
                        <div>
                            <h2 className='text-subheading leading-9 font-bold text-[28px]'>Feature Products</h2>
                            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-[30px] '>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <FeatureCard buttonprops={item.buttonprops} category={item.category} poster={item.poster} themeicon={item.themeicon} tittle={item.tittle} uploadericon={item.uploadericon} uploadername={item.uploadername} currentimage={item.currentimage} totalimages={item.totalimage} />
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                            <div className='mt-10 flex w-full items-center justify-center'>
                                <Button link='/productdetail' className='text-primary-100 py-3 px-[30px] bg-white shadow-sm hover:text-white' children='View All Products' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeatureSection