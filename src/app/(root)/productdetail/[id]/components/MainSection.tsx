"use client"

import React, { useState } from 'react'
import BreadCrumbs from './BreadCrumbs'
import ProductBanner from './ProductBanner'
import ProductDescription from './ProductDescription'
import RelatedProducts from './RelatedProducts'
import { ProductDetailProps } from '@/types/type'

const MainSection: React.FC<ProductDetailProps> = ({ template }) => {

     /**
     * State to manage the active tab index
     */
     const [activetab, setActivetab] = useState(0);
     
    
    return (
        <>
            <div className=' relative xl:after:h-full xl:after:w-full xl:after:absolute xl:after:top-0 xl:after:left-0 xl:after:bg-[url(/images/bgeffect.png)] after:z-[-1] ' >
                {/* <BreadCrumbs /> */}
                <ProductBanner template={template}  setActivetab={setActivetab} />
                <ProductDescription template={template} activetab={activetab} setActivetab={setActivetab} />
            </div>
            <RelatedProducts />
        </>
    )
}

export default MainSection