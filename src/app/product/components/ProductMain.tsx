"use client"

import React, { Fragment, useRef, useState } from 'react'
import ProductBanner from './ProductBanner'
import ProductFilterside from './ProductFilterside'
import FeatureCard from '@/components/cards/FeatureCard'
import Icon from '@/components/Icon'
import ProductTags from './ProductTags'
import { cn } from '@/libs/utils'
import NotFountproduct from './NotFountproduct'
import useOnClickOutside from '@/hooks/useOnClickOutside'

/**
 * Renders the main product page layout with filters, tags, sorting, and product grid.
 *
 * @component
 * @returns {JSX.Element} The product main page.
 */

const ProductMain = () => {
    /**
        * Sample product data for displaying feature cards.
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


    /**
     * State to store selected filter items.
     *
     * @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]}
     */
    const [items, setItems] = useState<string[]>([]);


    /**
     * Removes a selected filter item from the items array by index.
     *
     * @param {number} index - The index of the item to be removed.
     */
    const removeItem = (index: number) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };



    /**
     * State to control the visibility of the filter sidebar.
     *
     * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
     */
    const [filter, setFilter] = useState(false)

    /**
    * Opens the filter sidebar.
    */
    const openFilter = () => {
        setFilter(true)
    }


    /**
    * Closes the filter sidebar.
    */
    const closefilter = () => {
        setFilter(false)
    }

    /**
   * Sorting options data.
   */


    /**
  * State to toggle the sorting dropdown visibility.
  *
  * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
  */
    const Sortdata = [
        {
            tittle: "Newest releases",
        },
        {
            tittle: "Most popular",
        },
        {
            tittle: "Most popular",
        },
    ];

    const [sort, setSort] = useState(false)

    const sorthandledropdown = () => {
        setSort(!sort)
    }

    const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown element


    // Apply the hook to detect clicks outside the dropdown
    useOnClickOutside(dropdownRef, sorthandledropdown);

    return (
        <>
            <ProductBanner />
            <ProductTags />
            <section>
                <div className=' pt-10 pb-10 lg:pb-20  bg-bgcolor' >
                    <div className='container' >
                        <div className='flex gap-[30px]  flex-col md:flex-row  justify-between' >
                            <div className={`md:static fixed top-0  h-screen duration-[1s] z-10 transition-all ${filter === true ? "left-0" : "left-[-100%]"} max-w-full sm:max-w-[357px] w-full `} >
                                <ProductFilterside closefilter={closefilter} items={items} setItems={setItems} />
                            </div>
                            <div className='w-full' >
                                <div className=" flex  max-[768px]:flex-col-reverse   md:flex justify-between pb-5 border-b mb-[30px]  items-center">
                                    <div className='md:max-w-[600px] w-full overflow-x-scroll md:overflow-hidden flex-nowrap flex md:flex-wrap gap-[10px] ' >
                                        {items.map((item, index) => {
                                            return (
                                                <>
                                                    <div>
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
                                                    </div>
                                                </>

                                            );
                                        })}

                                    </div>
                                    <div className='text-end md:text-inherit flex justify-between pb-[10px] md:pb-0 items-center md:items-start max-[768px]:w-full ' >
                                        <div onClick={openFilter} className='flex gap-[5px] items-center md:hidden '>
                                            <Icon name='filter' />
                                            <h3 className='lg:text-[18px] leading-[28px] font-normal text-subparagraph '>Filters</h3>
                                        </div>
                                        <div ref={dropdownRef} className='relative' >
                                            <div onClick={sorthandledropdown} className='pr-[15px] pl-5 py-[8px] flex gap-[6px] items-center  ' >
                                                <h2 className='text-primary text-4 font-semibold leading-6 text-primary-100  text-nowrap' >Sort by</h2>
                                                <div className={` ${sort === true ? "rotate-0" : "rotate-[180deg]"} duration-[0.5s] `}>
                                                    <Icon className='p-1' name='sortaroow' />
                                                </div>
                                            </div>
                                            <div className={`absolute  right-0 ${sort === true ? "opacity-1" : "opacity-0"}  duration-[0.5s] top-[45px] z-10 bg-white`}>
                                                {Sortdata?.map((item, index) => {
                                                    return (
                                                        <h4
                                                            key={index + item.tittle}
                                                            className={cn`text-subparagraph  text-start leading-6 py-2 px-[30px] capitalize cursor-pointer text-nowrap  hover:bg-primary-200 border-l-[2px] hover:border-primary-100`}

                                                        >
                                                            {item.tittle}
                                                        </h4>
                                                    );
                                                })}
                                            </div>
                                        </div>
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
                                {/* <div>
                                    <NotFountproduct />
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>
            </section >


        </>
    )
}

export default ProductMain