import Link from 'next/link'
import React from 'react'



/**
 * ProductBanner is a React component that renders a banner section 
 * with a background image and text promoting free high-quality UI kits 
 * and design resources. The banner is responsive and adjusts for different 
 * screen sizes.
 * 
 * @returns {JSX.Element} The rendered ProductBanner component.
 */



const ProductBanner = () => {
    return (
        <>
            <section>
                <div className='bg-[url(/images/productbanner.png)]  h-[363px] bg-cover bg-no-repeat'>
                    <div className='container' >
                        <div className='lg:pt-10 lg:pb-20 pt-[50px] pb-[50px] ' >
                            <h3 className='text-4 font-normal leading-6 inline text-divider-100' >
                                <Link href={"/"} >Home </Link>
                                /
                                <Link href={'/Product'} >  Products </Link>
                            </h3>
                            <div className='flex min-[991px]:flex-row flex-col gap-4  max-[1024px]:pt-4  justify-between ' >
                                <h2 className=' text-[36px] xl:text-[40px]  2xl:text-[55px] font-bold 2xl:leading-[70px]  lg:leading-[50px] text-[#FFF]  min-[991px]:pt-20 max-w-[662px] w-full  leading-[1.3]' >
                                    Free High-quality UI kits
                                    and design resources
                                </h2>
                                <div className='flex justify-end items-end  max-w-[600px] w-full ' >
                                    <div className='flex' >
                                        <div className='border-l border-[1px] mr-4 border-red border-[#CCE0A5]' ></div>
                                        <p className='text-[14px] sm:text-[18px]  inline font-normal leading-[28px] text-[#fff] opacity-[0.7] ' >Template Studio is the place to find high-quality design resources for designers, creative agencies and developers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductBanner