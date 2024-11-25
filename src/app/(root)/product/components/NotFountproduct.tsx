import Button from '@/components/ui/Button'
import { NotFoundinter } from '@/types/type'
import Image from 'next/image'
import React from 'react'

/**
 * NotFoundProduct is a React component that displays a message and image
 * when a product search yields no results. It also suggests clearing filters
 * and provides a button to find more products.
 * 
 * @returns {JSX.Element} The rendered NotFoundProduct component.
 */

const NotFoundProduct = ({ clearall }: NotFoundinter): JSX.Element => {
    return (
        <div className='p-5 flex md:p-10 flex-col gap-[80px] text-center items-center bg-white w-full  animate-fade-up'>
            {/* Message to the user */}
            <h2 className='text-lg tab:text-[20px] font-semibold leading-7 text-subheading'>
                Sorry, we could not find any results for this search. Maybe give one of these a try?
            </h2>

            {/* Not found image */}
            <Image width={197} height={140} alt='notfound' src="/images/notfoundproducts.png" />

            <div className='flex justify-between w-full lg:flex-row flex-col gap-5 items-center '>
                {/* Suggest clearing filters */}
                <h3 className='text-[16px] font-normal leading-6 text-subparagraph'>
                    Try <span onClick={clearall} className='text-primary-100 cursor-pointer '>clearing some filters</span> and try again.
                </h3>

                {/* Button to find more products */}
                <Button variant="primary" onClick={clearall} className="py-2 px-4 md:py-3 md:px-9 justify-center">
                    Find more products
                </Button>
            </div>
        </div>
    )
}

export default NotFoundProduct
