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
                <div className='flex overflow-x-scroll xl:overflow-hidden hiddenscroll'>
                    {tags.map((item, index) => {
                        const isActive = index === activeIndex; // Determine if this tag is active
                        return (
                            <div
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`relative mx-[7px] cursor-pointer text-nowrap group`}
                            >
                                <h2
                                    className={`
                                        px-[10px] py-[5px] leading-7 font-normal transition-all duration-500 
                                        ${isActive ? 'text-primary-100' : 'text-subparagraph'}
                                    `}
                                >
                                    {item.tagname}
                                </h2>

                                {/* Bottom border effect */}
                                <span
                                    className={`
                                                absolute bottom-[2px] left-1/2 transform -translate-x-1/2 h-[1px] bg-primary-100 transition-all duration-500
                                                ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                                            `}
                                />
                            </div>
                        );
                    })}
                </div>



            </div>
        </div>
    )
}

export default ProductTags