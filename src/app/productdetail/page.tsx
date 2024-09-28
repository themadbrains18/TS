import React from 'react'
import ProductBanner from './components/ProductBanner'
import RelatedProducts from './components/RelatedProducts'
import ProductDescription from './components/ProductDescription'
import BreadCrumbs from './components/BreadCrumbs'

const Page = () => {
  return (
    <>
    <BreadCrumbs/>
    {/* <ProductBanner/> */}
    <ProductDescription/>
    <RelatedProducts/>
    </>
  )
}

export default Page