"use client"

import Image from 'next/image'
import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Button from '@/components/ui/Button';
import Icon from '@/components/Icon';
import ProductDetailcheckbox from './ProductDetailcheckbox';
import Link from 'next/link';
import DownloadTemplete from '@/components/popup/DownloadTemplete';

/**
 * ProductBanner component displays the main product image and allows users to 
 * navigate through multiple images of the product. It also provides product details 
 * and options to download or preview the product.
 * 
 * @component
 * @returns {JSX.Element} The rendered ProductBanner component.
 */


const ProductBanner = () => {

    // swiper images
    const images = [
        { id: 'product1', src: '/images/product1.png' },
        { id: 'product2', src: '/images/product1.png' },
        { id: 'product3', src: '/images/product1.png' },
        { id: 'product4', src: '/images/product1.png' },
        { id: 'product5', src: '/images/product1.png' },
        { id: 'product6', src: '/images/product1.png' },
        { id: 'product7', src: '/images/product1.png' },
        { id: 'product8', src: '/images/product1.png' },
        { id: 'product9', src: '/images/product1.png' },
        { id: 'product10', src: '/images/product1.png' },
    ];


    // State to manage the currently active image ID
    const [activeImageId, setActiveImageId] = useState(images[0].id);
    const activeImage = images.find(image => image.id === activeImageId)?.src; // Get the active image src

    // Reference to Swiper instance for custom navigation
    const swiperRef = useRef<SwiperType | null>(null);

    // pop up handler

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const openPopup = () => {
        setIsPopupOpen(true);
        setIsFirstPopupOpen(true)
    }

    const [isFirstPopupOpen, setIsFirstPopupOpen] = useState<boolean>(true);

    return (
        <>
            <section className='pb-10'>
                <div className="container">
                    <div>
                        <div className='flex items-center gap-x-2 pt-2.5 md:pt-5 border-t md:mt-5 mb-5'>
                            <Image src={`/icons/mdb.svg`} width={20} height={20} alt='uploadericon' />
                            <p className='text-subparagraph text-sx leading-5 capitalize text-nowrap text-ellipsis overflow-hidden'>by <span className='text-[12px] font-semibold leading-5 text-subheading  capitalize'>{`themadbrains`}</span> <span className='text-primary-100' >|</span> <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{`UI templates`}</span></p>
                        </div>

                        {/* Main Grid Section */}
                        <div className='grid grid-cols-1 gap-5 lg:grid-cols-[57.5%,40.5%] lg:gap-x-[30px]'>
                            <div>
                                <div className="lg:max-w-[874px] w-full">
                                    {/* Large Image */}
                                    <div className="p-[10px]  md:p-5 h-[250px]  md:h-[540px] group overflow-hidden border border-divider-100">
                                        <div className="overflow-hidden relative   h-[225px]  md:h-[500px] ">
                                            <div className='absolute z-[1] top-0 left-0 right-0 bottom-0 group-hover:bg-[#28204699]  duration-[0.5s]'>
                                                <div className='w-full h-full flex justify-center items-center overflow-hidden  '>
                                                    <Link href='/productdetail' className='text-white text-[18px] font-bold leading-7 group-hover:opacity-100'>Preview</Link>
                                                </div>
                                            </div>
                                            <Image
                                                src={`${activeImage}`}
                                                width={850}
                                                height={500}
                                                alt="Selected"
                                                className="overflow-hidden group-hover:scale-[1.1] duration-[0.5s] lg:max-w-[874px] w-full h-full lg:object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 lg:gap-7 md:p-5 md:border pt-2.5  border-divider-100">
                                        {/* Custom Previous Button */}
                                        {images.length > 0 && (
                                            <div className='rotate-[180deg]' onClick={() => swiperRef.current?.slidePrev()}>
                                                <Icon name='rightarrow' />
                                            </div>
                                        )}

                                        <Swiper
                                            navigation={false}
                                            modules={[Navigation]}
                                            slidesPerView={6}
                                            spaceBetween={10}
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
                                            {images.map(({ id, src }) => (
                                                <SwiperSlide key={id}>
                                                    <div
                                                        onClick={() => setActiveImageId(id)} // Set active image by ID
                                                        className={`cursor-pointer min-w-[50px] md:max-w-[120px] w-full border-2 ${activeImageId === id ? 'border-primary-900' : 'border-transparent'} rounded-lg`}
                                                    >
                                                        <Image className="w-full object-cover rounded-lg" src={`${src}`} height={100} width={120} alt={`Thumbnail ${id}`} />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>

                                        {/* Custom Next Button */}
                                        <div onClick={() => swiperRef.current?.slideNext()}>
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
                                    <ProductDetailcheckbox image='/images/XD.png' label="XD Design File" detailText="View Detail" />
                                    <ProductDetailcheckbox image='/images/diamond.png' label="Sketch Design File" detailText="View Detail" />
                                </div>
                                <div className='p-2.5 md:p-5 flex items-center bg-divider-100 justify-between ' >
                                    <Button className='px-2.5' variant='primary' >FREE</Button>
                                    <div className='flex gap-5 items-center' >
                                        <h3 className='text-[14px] font-normal leading-5 text-subparagraph' >Total Price</h3>
                                        <span className='text-[20px] leading-7 text-subparagraph font-bold' >$0.00</span>
                                    </div>
                                </div>
                                <Button onClick={openPopup} className='w-full mb-2.5 mt-5  md:mt-[30px] md:mb-5 justify-center py-2 md:py-[13px]' variant='primary' >Free — Download</Button>
                                <Button className='w-full justify-center py-[13px]' variant='liquid' >Preview</Button>
                                {
                                    isPopupOpen &&
                                    <DownloadTemplete isFirstPopupOpen={isFirstPopupOpen} setIsFirstPopupOpen={setIsFirstPopupOpen} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductBanner
