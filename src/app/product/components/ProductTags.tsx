import React from 'react'

const ProductTags = () => {

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


    return (
        <div className='container'>
            <div className="flex justify-between gap-[30px] py-10">
                <div className='max-w-[357px] w-full border-r '>
                    <h2>Catagory Tags</h2>
                </div>
                <div className=''>
                           
                </div>
            </div>
        </div>
    )
}

export default ProductTags