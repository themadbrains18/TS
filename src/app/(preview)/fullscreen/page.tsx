'use client';

import React, { FC, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { useRouter } from 'next/navigation';
import { PreviewImage } from '@/types/type';



const FullScreen: FC<any> = ({
    previewImages, previewMobileImages, handleGoBack
}) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0); // Track the current active slide


    return (
        <section className="pt-10 relative h-fit">
            <div className="container">
                <div className=" flex  items-center gap-x-[2px] justify-between cursor-pointer pb-[6px]">
                    <div onClick={handleGoBack} className='flex  items-center  gap-1' >
                        <Icon name="soliddownicon" className="fill-subparagraph rotate-180 h-3 w-3" />
                        <p className="text-sm font-semibold leading-5 text-textparagraph capitalize">Back</p>
                    </div>
                    {/* Custom Number Pagination */}
                    <div className=" text-sm text-subparagraph">
                        {activeIndex + 1}/
                        {(previewMobileImages?.length ?? 0) + (previewImages?.length ?? 0)}
                    </div>
                </div>
            </div>
            <div className="container h-fit pb-[228px] md:pb-[100px] ">
                <Swiper
                    modules={[Navigation]}
                    className="mySwiper"
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    onBeforeInit={(swiper) => (swiperRef.current = swiper)}
                    autoHeight={true} // Automatically adjusts height based on slide content
                >

                    {previewImages && previewImages?.map((image: PreviewImage, index: number) => (
                        <SwiperSlide key={index}>
                            <div className="flex justify-center h-auto">
                                <Image
                                    className="select-none" // Ensure the image adjusts its height automatically
                                    src={image.imageUrl}
                                    width={1000}
                                    height={1000}
                                    alt={`Slide image ${index + 1}`}
                                    priority={index === 0} // Optimizes loading for the first image
                                />
                            </div>
                        </SwiperSlide>
                    ))}

                    {previewMobileImages && previewMobileImages?.map((image: PreviewImage, index: number) => (
                        <SwiperSlide key={index}>
                            <div className="flex justify-center h-auto">
                                <Image
                                    className="select-none" // Ensure the image adjusts its height automatically
                                    src={image.imageUrl}
                                    width={1000}
                                    height={1000}
                                    alt={`Slide image ${index + 1}`}
                                    priority={index === 0} // Optimizes loading for the first image
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Icon
                className="w-10 fixed md:right-[40px] right-[15px]  z-10 h-10 top-[40%] cursor-pointer"
                onClick={() => swiperRef.current?.slideNext()}
                name="swipericon"
            />
            <Icon
                className="w-10 h-10 fixed z-10 top-[40%] left-[15px] md:left-[40px] rotate-180 cursor-pointer"
                onClick={() => swiperRef.current?.slidePrev()}
                name="swipericon"
            />
        </section>
    );
};

export default FullScreen;