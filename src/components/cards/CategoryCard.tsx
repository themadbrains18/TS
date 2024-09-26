import { cn } from '@/libs/utils'
import { techcardprops } from '@/types/type'
import Image from 'next/image'
import React from 'react'

const CategoryCard: React.FC<techcardprops> = ({ className, image, imageclass, tittle, tittleclass, container }) => {


    return (
        <>
            <div className={cn`p-[10px] md:p-5 bg-[#FFF6FF] w-full cursor-pointer group ${className}`}>
                <div className={cn` p-[5px] ${container}`}>
                    <Image src={`/images/${image}`} className={cn`rounded-md transition-all duration-500 group-hover:scale-[0.95] ${imageclass}`} width={220} height={148} alt='image' />
                </div>
                <h3 className={cn` text-xs md:text-base text-center text-subparagraph md:leading-6 font-semibold capitalize mt-1 ${tittleclass}`}>{`${tittle}`}</h3>
            </div>
        </>)
}

export default CategoryCard