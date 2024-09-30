import Icon from '@/components/Icon'
import Link from 'next/link'
import React from 'react'


/**
 * BreadCrumbs component displays the breadcrumb navigation and rating.
 *
 * @component
 * @example
 * return (
 *   <BreadCrumbs />
 * )
 */


const BreadCrumbs = () => {
  return (
    <>
      <div className='container' >
        <div className='flex items-center justify-between pb-[20px] md:pb-[40px] pt-[40px] '>
          <h2 className='text-[16px] font-normal leading-6 text-subparagraph'>
            <Link href="/" >Home</Link> /
            <Link href="/product" > Products</Link> /
            <Link href="/productdetail" > Product Details</Link>
          </h2>
          <div className='flex gap-[6px] items-center' >
            <p className='text-sm text-subparagraph leading-5 '>4.9</p>
            <Icon className='inline-block w-6 h-6' name='star' />
          </div>
        </div>
      </div>
    </>
  )
}

export default BreadCrumbs