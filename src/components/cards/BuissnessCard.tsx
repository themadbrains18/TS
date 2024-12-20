import { buissnesscardprops } from '@/types/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


/**
 * BuissnessCard component displays a business logo and title.
 * It is styled to provide hover effects for a better user experience.
 *
 * @component
 * @param {buissnesscardprops} props - The properties passed to the component.
 * @param {string} props.logo - The logo file name to be displayed.
 * @param {string} props.title - The title of the business.
 * @returns {JSX.Element} The rendered BuissnessCard component.
 */



const BuissnessCard: React.FC<buissnesscardprops> = ({ logo, title, id, templateType }) => {

  return (
    <>
      <Link href={`/product?template-type=${templateType}&&subcat=${id}`} className='p-[10px] flex items-center gap-x-[10px] md:gap-x-5 hover:border-[#FFF6FF] border border-divider-100 bg-white transition-all duration-300 hover:shadow-md cursor-pointer group hover:bg-[#FFF6FF] animate-fade-up '>
        <div className='rounded-md bg-[#FFF6FF] transition-all duration-300  group-hover:bg-white p-[5px] tab:p-3'>
          <Image className='max-w-[30px] tab:max-w-10 w-full' src={`/icons/${logo}`} width={40} height={40} alt='productlogo' />
        </div>
        <div >
          <h3 className='text-xs md:text-base text-left font-semibold '>{`${title}`}</h3>
        </div>
      </Link>
    </>)
}

export default BuissnessCard