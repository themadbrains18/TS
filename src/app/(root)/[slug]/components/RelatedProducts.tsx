import FeatureCard from '@/components/cards/FeatureCard'
import React, { Fragment } from 'react'

/**
 * RelatedProducts component displays a section of related product cards.
 *
 * @component
 * @returns {JSX.Element} The rendered RelatedProducts component.
 */


const RelatedProducts = () => {

    // Sample data for related products
    const data = [
        {
            poster: "popularbg.png",
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
            poster: "popularbg.png",
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
            poster: "popularbg.png",
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
                            <h2 className='text-subheading leading-9 font-bold text-[28px]'>Related Products</h2>
                            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-[30px] '>
                                {
                                    data.splice(0, 4).map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <FeatureCard buttonprops={item.buttonprops} category={item.category} poster={item.poster} themeicon={item.themeicon} tittle={item.tittle} uploadericon={item.uploadericon} uploadername={item.uploadername} currentimage={item.currentimage} totalimages={item.totalimage} />
                                            </Fragment>
                                        )
                                    })
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