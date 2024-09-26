"use client"


import React, { Fragment, useState } from 'react'
import ProductBanner from './ProductBanner'
import ProductFilterside from './ProductFilterside'
import FeatureCard from '@/components/cards/FeatureCard'

const ProductMain = () => {


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



    const [items, setItems] = useState<string[]>([]);
    const removeItem = (index: number) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };




    return (
        <>
            <ProductBanner />
            <section>
                <div className=' pt-10 pb-10 lg:pb-20  bg-bgcolor' >
                    <div className='container' >
                        <div className='flex gap-[30px]  flex-col lg:flex-row ' >
                            <ProductFilterside />
                            <div className='' >
                                <div className="flex flex-wrap gap-[10px]">
                                    {items.map((item, index) => {
                                        return (
                                            <div
                                                key={Date.now() + index}
                                                className="border-[1px] border-[rgba(0, 0, 0, 0.16)] rounded-[16px] py-[3px] px-[4px] flex items-center w-full max-w-max "
                                            >
                                                <span className="whitespace-nowrap px-[6px] text-Light_Text_Secondary  ">
                                                    {item}
                                                </span>
                                                {/* Remove icon for each item */}
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() => removeItem(index)}
                                                >
                                                    {/* <Icons type="cuticon" /> */}
                                                    X
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className='grid grid-cols-3 gap-[30px]'  >
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
                                <div></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </>
    )
}

export default ProductMain