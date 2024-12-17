
import Icon from '@/components/Icon'
import Link from 'next/link'
import React from 'react'

interface breadcrumbs{
  title:string
}

const BreadCrumbs: React.FC<breadcrumbs> = ({title}) => {

  return (
    <>
      <div className='container'>
        <div className='flex items-center justify-between pb-[20px] md:pb-[40px] pt-[40px]'>
          <h2 className='text-[16px] font-normal leading-6 text-subparagraph'>
            <Link href="/">Home</Link> /
            <Link href="/product"> Product / </Link> 
            <span >{title}</span>
            {/* <Link href="/product/"> Product Details</Link> */}
          </h2>
          <div className='relative group flex gap-[6px] items-center cursor-pointer'>

            {/* <p className='text-sm   :text-subparagraph leading-5'>4.9</p> */}
            {/* <Icon className='inline-block w-6 h-6' name='star' /> */}

            {/* The button and ratingbottom icon */}
            <div className='absolute z-[30] duration-500 transition-all opacity-0 invisible group-hover:visible group-hover:opacity-100 max-[1700px]:right-0 min-[1700px]:left-[-46px]  group-hover:translate-y-[-40px] translate-y-[20px]'>
              <button className='bg-subparagraph whitespace-nowrap rounded-full flex gap-2 items-center px-5 py-2 text-white'>
                <Icon name='rating' />
                Rate Product
              </button>
              <div className='absolute z-[12] bottom-[-19px] max-[1700px]:right-[10%] right-[48%]' >
                <Icon name='ratingbottom' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BreadCrumbs
