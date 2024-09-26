"use client"


import React, { Fragment, useState } from 'react'
import ProductBanner from './ProductBanner'
import ProductFilterside from './ProductFilterside'
import FeatureCard from '@/components/cards/FeatureCard'
import Icon from '@/components/Icon'
import ProductTags from './ProductTags'

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


    const [sort, setSort] = useState(false)
    const sortby = () => {
        setSort(!sort)

    }


    const [filter, setFilter] = useState(false)
    const openFilter = () => {
        setFilter(true)
    }
    const closefilter = () => {
        setFilter(false)
    }

    return (
        <>
            <ProductBanner />
            <ProductTags />
            <section>
                <div className=' pt-10 pb-10 lg:pb-20  bg-bgcolor' >
                    <div className='container' >
                        <div className='flex gap-[30px]  flex-col md:flex-row  justify-between' >
                            <div className={`md:static fixed top-0  h-screen duration-[1s] z-10 transition-all ${filter === true ? "left-0" : "left-[-100%]"} max-w-[357px] w-full `} >
                                <ProductFilterside closefilter={closefilter} items={items} setItems={setItems} />
                            </div>
                            <div className='w-full' >
                                <div className=" flex  max-[768px]:flex-col-reverse   md:flex justify-between pb-5 border-b mb-[30px] ">
                                    <div className='max-w-[600px] w-full  flex flex-wrap gap-[10px] ' >
                                        {items.map((item, index) => {
                                            return (
                                                <div
                                                    key={Date.now() + index}
                                                    className="border-[1px] py-[6px] px-[14px] flex items-center w-full max-w-max bg-primary-300  gap-[5px] "
                                                >
                                                    <span className="whitespace-nowrap  text-[14px] font-normal leading-4 text-subparagraph ">
                                                        {item}
                                                    </span>
                                                    {/* Remove icon for each item */}
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={() => removeItem(index)}
                                                    >
                                                        <Icon color='#5D5775' name="closeicon" />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className='text-end md:text-inherit flex justify-between pb-[10px] md:pb-0  ' >
                                        <div onClick={openFilter} className='flex gap-[5px] items-center md:hidden '  >
                                            <Icon name='filter' />
                                            <h3 className='lg:text-[18px] leading-[28px] font-normal text-subparagraph ' >Filters</h3>
                                        </div>
                                        <button>Sort Bt</button>
                                    </div>
                                </div>
                                <div className='grid gap-[10px] lg:gap-5 lg:grid-cols-2  xl:grid-cols-3  xl:gap-[30px] '  >
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