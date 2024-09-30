import { cn } from '@/libs/utils'
import { techcardprops } from '@/types/type'
import Image from 'next/image'
import React from 'react'



/**
 * CategoryCard component displays a category image and title.
 * It includes hover effects for better user interaction.
 *
 * @component
 * @param {techcardprops} props - The properties passed to the component.
 * @param {string} props.className - Additional CSS classes for the card.
 * @param {string} props.image - The image file name to be displayed.
 * @param {string} props.imageclass - Additional CSS classes for the image.
 * @param {string} props.tittle - The title of the category.
 * @param {string} props.tittleclass - Additional CSS classes for the title.
 * @param {string} props.container - Additional CSS classes for the container.
 * @returns {JSX.Element} The rendered CategoryCard component.
 */



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