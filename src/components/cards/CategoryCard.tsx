import { cn } from '@/libs/utils'
import { techcardprops } from '@/types/type'
import Image from 'next/image'
import Link from 'next/link'
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
 * @param {string} props.title - The title of the category.
 * @param {string} props.titleclass - Additional CSS classes for the title.
 * @param {string} props.container - Additional CSS classes for the container.
 * @returns {JSX.Element} The rendered CategoryCard component.
 */



const CategoryCard: React.FC<techcardprops> = ({ className, image, imageclass, title, titleclass, container, id, templateid }) => {


    return (
        <>
            <Link
                href={`/product?template-type=${templateid}&subcat=${id}`} className={cn`p-[10px] md:p-5 bg-[#FFF6FF] w-full cursor-pointer group max-w-[370px]
                 ${className} animate-zoom `}>
                <div className={cn` p-[5px] ${container}`}>
                    <Image quality={50} src={`/images/${image}`} className={cn`rounded-md transition-all duration-500 group-hover:scale-[0.95] ${imageclass}`} width={220} height={148} alt='image' />
                </div>
                <p className={cn` text-xs md:text-base text-center text-subparagraph md:leading-6 font-semibold capitalize mt-[10px] ${titleclass}`}>{`${title}`}</p>
            </Link>
        </>)
}

export default CategoryCard