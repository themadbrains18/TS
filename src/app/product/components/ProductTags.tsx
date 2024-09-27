"use client"


import React, { useState } from 'react'

/**
 * ProductTags component displays a list of category tags that users can click to activate.
 * It highlights the active tag and provides a smooth transition effect for the tags.
 *
 * @component
 * @example
 * return (
 *   <ProductTags />
 * )
 */

const ProductTags = () => {
    /**
    * List of available tags.
    * Each tag contains an `id` and a `tagname` property.
    */

    const tags = [
        {
            id: 1,
            tagname: "All"
        },
        {
            id: 2,
            tagname: "HTML"
        },
        {
            id: 3,
            tagname: "React"
        },
        {
            id: 4,
            tagname: "Wordpress"
        },
        {
            id: 5,
            tagname: "Shopify"
        },
        {
            id: 6,
            tagname: "Bootstrap"
        },
        {
            id: 7,
            tagname: "CSS"
        },
        {
            id: 8,
            tagname: "Sketch"
        },
        {
            id: 9,
            tagname: "Adobe XD"
        },
        {
            id: 10,
            tagname: "Figma"
        }
    ]

    /**
     * The state representing the currently active tag index.
     * @type {[number, Function]} 
     */

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className='container'>
            <div className="flex gap-5 md:flex-row flex-col md:gap-[30px] py-5 md:py-10">
                <div className='max-w-[357px] w-full md:border-r '>
                    <h2 className='text-5 font-semibold left-7 text-[#110833]' >Catagory Tags</h2>
                </div>
                <div className='flex overflow-x-scroll xl:overflow-hidden hiddenscroll  '>
                    {tags.map((item, index) => {
                        const isActive = index === activeIndex; // Determine if this tag is active
                        return (
                            <div key={index} onClick={() => setActiveIndex(index)} className={` gap-[7px] cursor-pointer relative mx-[7px] text-nowrap after:content-[''] after:absolute after:bottom-[2px] after:h-[1px] after:bg-primary-100 after:w-0 after:left-[50%] after:transition-all after:duration-[0.5s] hover:after:left-0 hover:after:w-full ${isActive ? 'after:w-full after:left-[0%]' : 'after:w-0 after:left-[50%]'}`}>
                                <h2 className={` px-[10px] py-[5px] leading-7 font-normal transition-all  duration-[0.5s] ${isActive ? 'text-primary-100' : 'text-subparagraph'} cursor-pointer `}>
                                    {item.tagname}
                                </h2>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductTags