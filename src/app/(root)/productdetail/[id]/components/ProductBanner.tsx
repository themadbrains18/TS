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
import DownloadTemplete from '@/components/popups/DownloadTemplete';
import { ProductDetailProps, TechTemplate } from '@/types/type';

/**
 * ProductBanner component displays the main product image and allows users to 
 * navigate through multiple images of the product. It also provides product details 
 * and options to download or preview the product.
 * 
 * @component
 * @returns {JSX.Element} The rendered ProductBanner component.
 */


const ProductBanner: React.FC<ProductDetailProps> = ({ template }) => {

    const [showFullDescription, setShowFullDescription] = useState(false);

    console.log(template, "==template");


    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const maxLength = 300; // Set the max length for the description preview
    const description = template?.description || '';
    const isLongDescription = description.length > maxLength;

    // swiper images
    const images = template.sliderImages


    // State to manage the currently active image ID
    const [activeImageId, setActiveImageId] = useState(images[0].id);
    const activeImage = images.find(image => image.id === activeImageId)?.imageUrl; // Get the active image src

    // Reference to Swiper instance for custom navigation
    const swiperRef = useRef<SwiperType | null>(null);

    // pop up handler

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const openPopup = () => {
        setIsPopupOpen(true);
        setIsFirstPopupOpen(true)
    }

    const [isFirstPopupOpen, setIsFirstPopupOpen] = useState<boolean>(true);
    console.log(template.softwareType.name, "softwaretype")

    type SoftwareType = "Figma" | "Adobe XD" | "PhotoShop" | "Sketch";

    interface SoftwareDetail {
        image: string;
        label: string;
        detailText: string;
    }
    return (
        <>
            <section className='pb-10'>
                <div className="container">
                    <div>
                        <div className='flex items-center gap-x-2 pt-2.5 md:pt-5 border-t md:mt-5 mb-5'>
                            <Image src={`/icons/mdb.svg`} width={20} height={20} alt='uploadericon' />
                            <p className='text-subparagraph text-sx leading-5 capitalize text-nowrap text-ellipsis overflow-hidden'>by <span className='text-[12px] font-semibold leading-5 text-subheading  capitalize'>{template?.user?.name}</span> <span className='text-primary-100' >|</span> <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{`UI templates`}</span></p>
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
                                                    <Link href='/preview' className='text-white text-[18px] font-bold leading-7 group-hover:opacity-100'>Preview</Link>
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
                                        {images?.length > 0 && (
                                            <div className='rotate-[180deg]' onClick={() => swiperRef.current?.slidePrev()}>
                                                <Icon name='rightarrow' />
                                            </div>
                                        )}

                                        <Swiper
                                            navigation={false}
                                            modules={[Navigation]}
                                            slidesPerView={6}
                                            spaceBetween={10}
                                            loop={true}
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
                                            className="mySwiper !flex justify-center w-full"
                                        >
                                            {images?.map(({ id, imageUrl }) => (
                                                <SwiperSlide className='w-full' key={id}>
                                                    <div
                                                        onClick={() => setActiveImageId(id)} // Set active image by ID
                                                        className={`cursor-pointer min-w-[50px] md:max-w-[120px] w-full border-2 ${activeImageId === id ? 'border-primary-900' : 'border-transparent'} rounded-lg`}
                                                    >
                                                        <Image className="w-full object-cover rounded-lg" src={`${imageUrl}`} height={100} width={120} alt={`Thumbnail ${id}`} />
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
                                <h2 className='pb-2.5 md:pb-5 text-[18px] md:text-[28px] leading-8 font-bold text-[#110833] capitalize'>{template?.title} </h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: showFullDescription || !isLongDescription
                                            ? template?.description
                                            : template?.description.slice(0, maxLength)
                                    }}
                                    className=' text-[14px] md:text-[16px] font-normal leading-6 text-subparagraph'
                                />
                                {isLongDescription && (
                                    <button onClick={toggleDescription} className=" text-[14px] font-normal leading-5 text-primary-100">
                                        {showFullDescription ? 'Read Less' : 'Read More'}
                                    </button>
                                )}

                                <div className=' py-5 md:py-10 flex gap-2.5 md:gap-[18px] flex-col' >

                                    {
                                        template.softwareType.name === "Figma" ? <ProductDetailcheckbox image='/images/figmalogo.png' label="Figma Design File" detailText="View Detail" /> : ""
                                    }
                                    {
                                        template.softwareType.name === "Adobe XD" ? <ProductDetailcheckbox image='/images/XD.png' label="Figma Design File" detailText="View Detail" /> : ""
                                    }
                                    {
                                        template.softwareType.name === "PhotoShop" ? <ProductDetailcheckbox image='/icons/photoshop.svg' label="Figma Design File" detailText="View Detail" /> : ""
                                    }
                                    {
                                        template.softwareType.name === "Sketch" ? <ProductDetailcheckbox image='/images/diamond.png' label="Figma Design File" detailText="View Detail" /> : ""
                                    }
                                </div>
                                <div className='p-2.5 md:p-5 flex items-center bg-divider-100 justify-between ' >
                                    <Button className='py-[5px] px-2.5' variant='primary' >{template?.isPaid ? template?.price : 'FREE'}</Button>
                                    <div className='flex gap-5 items-center' >
                                        <h3 className='text-[14px] font-normal leading-5 text-subparagraph' >Total Price</h3>
                                        <span className='text-[20px] leading-7 text-subparagraph font-bold' >{template?.isPaid ? '$' + template?.price : "$0.00"}</span>
                                    </div>
                                </div>
                                <Button onClick={openPopup} className='w-full mb-2.5 mt-5  md:mt-[30px] md:mb-5 justify-center py-2 md:py-[13px]' variant='primary' > Download</Button>
                                <Button className='w-full justify-center' variant='liquid' >Preview</Button>
                                {
                                    isPopupOpen &&
                                    <DownloadTemplete isFirstPopupOpen={isFirstPopupOpen} setIsFirstPopupOpen={setIsFirstPopupOpen} />
                                }
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default ProductBanner
