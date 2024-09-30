"use client"

import Image from 'next/image'
import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Button from '@/components/ui/Button';
import Icon from '@/components/Icon';
import ProductDetailcheckbox from './ProductDetailcheckbox';

// Import Swiper styles and any other modules


/**
 * ProductBanner component displays the main product image and allows users to 
 * navigate through multiple images of the product. It also provides product details 
 * and options to download or preview the product.
 * 
 * @component
 * @returns {JSX.Element} The rendered ProductBanner component.
 */


const ProductBanner = () => {

    const images = [
        '/images/product1.png',
        '/images/product2.png',
        '/images/product3.png',
        '/images/product4.png',
        '/images/product5.png',
        '/images/product6.png',
        '/images/product6.png',
        '/images/product6.png',
        '/images/product6.png',
    ];

    // State to manage the currently active image
    const [activeImage, setActiveImage] = useState(images[0]);

    // Reference to Swiper instance for custom navigation
    const swiperRef = useRef<any>(null);

    return (
        <>
            <section className='pb-10'>
                <div className="container">
                    <div>
                        <div className='flex items-center gap-x-2 pt-2.5 border-t md:mt-5 mb-5'>
                            <Image src={`/icons/mdb.svg`} width={20} height={20} alt='uploadericon' />
                            <p className='text-subparagraph text-sx leading-5 capitalize text-nowrap text-ellipsis overflow-hidden'>by <span className='text-[12px] font-semibold leading-5 text-subheading  capitalize'>{`themadbrains`}</span> <span className='text-primary-100' >|</span> <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{`UI templates`}</span></p>
                        </div>

                        {/* Main Grid Section */}
                        <div className='grid grid-cols-1 gap-5 lg:grid-cols-[57.5%,40.5%] lg:gap-x-[30px]'>
                            <div    >
                                <div className="lg:max-w-[874px] w-full">
                                    {/* Large Image */}
                                    <div className="p-[10px] md:p-5">
                                        <img
                                            src={activeImage}
                                            alt="Selected"
                                            className="  lg:max-w-[874px]  w-full h-96 lg:object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 lg:gap-7">
                                        {/* Custom Previous Button */}
                                        {
                                            images.length > 0 &&
                                            <div onClick={() => swiperRef.current?.slidePrev()} >
                                                <Icon name='rightarrow' />
                                            </div>

                                        }
                                        <Swiper
                                            navigation={false}
                                            modules={[Navigation]}
                                            slidesPerView={6}
                                            breakpoints={{
                                                315: {
                                                    slidesPerView: 3,
                                                },
                                                500: {
                                                    slidesPerView: 5,
                                                },
                                                768: {
                                                    slidesPerView: 7,
                                                },
                                            }}
                                            onBeforeInit={(swiper) => {
                                                swiperRef.current = swiper;
                                            }}
                                            className="mySwiper"
                                        >
                                            {
                                                images.map((image, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div
                                                            onClick={() => setActiveImage(image)}
                                                            className={`cursor-pointer  min-w-[50px]  md:max-w-[120px] w-full border-2 ${activeImage === image ? 'border-w-[2px] p-[5px] border-primary-900' : 'border-w-[2px] p-1 border-transparent'
                                                                } rounded-lg`}
                                                        >
                                                            <img
                                                                src={image}
                                                                alt={`Thumbnail ${index}`}
                                                                className="  w-full object-cover rounded-lg"
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>

                                        {/* Custom Next Button */}
                                        <div onClick={() => swiperRef.current?.slideNext()} >
                                            <Icon name='rightarrow' />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className='pb-2.5 md:pb-5 text-[18px] md:text-[28px] leading-8 font-bold text-[#110833]'>Room - UI Kit for Room Sharing UI Template </h2>
                                <p className=' text-[14px] md:text-[16px] font-normal leading-6 text-subparagraph'>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <span className=' text-[14px] font-normal leading-5 text-subheading'>View more</span></p>
                                <div className=' py-5 md:py-10 flex gap-2.5 md:gap-[18px] flex-col' >
                                    <ProductDetailcheckbox image='/images/figmalogo.png' label="Figma Design File" detailText="View Detail" />
                                    <ProductDetailcheckbox image='/images/figmalogo.png' label="XD Design File" detailText="View Detail" />
                                    <ProductDetailcheckbox image='/images/figmalogo.png' label="Sketch Design File" detailText="View Detail" />
                                </div>
                                <div className='p-2.5 md:p-5 flex items-center bg-divider-100 justify-between ' >
                                    <Button className='px-2.5' variant='primary' >FREE</Button>
                                    <div className='flex gap-5 items-center' >
                                        <h3 className='text-[14px] font-normal leading-5 text-subparagraph' >Total Price</h3>
                                        <span className='text-[20px] leading-7 text-subparagraph font-bold' >$0.00</span>
                                    </div>
                                </div>
                                <Button className='w-full mb-2.5 mt-5  md:mt-[30px] md:mb-5 justify-center py-2 md:py-[13px]' variant='primary' >Free — Download</Button>
                                <Button className='w-full justify-center py-[13px]' variant='liquid' >Preview</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductBanner
