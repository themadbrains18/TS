'use client'

import React, { Fragment, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { useRouter } from 'next/navigation';
const page = () => {
    const router = useRouter();

    const handleGoBack = () => {
      router.back(); // Goes back one step in the history
    };
    const swiperRef = useRef<SwiperType | null>(null);
    const desktop = [
        'prev1.png',
        'prev2.png',
        'prev3.png',
        'prev4.png',
        'prev5.png',
        'prev6.png',
        'prev7.png',
        'prev8.png',
        'prev9.png',
        'prev10.png',
        'prev11.png',
        'prev12.png',
        'prev13.png',
        'prev14.png',
        'prev15.png',
        'prev16.png',
        'prev17.png',
        'prev18.png',
        'prev19.png',
        'prev20.png',
        'prev21.png',
        'prev22.png',
    ]
    return (
        <>
            <section className='pt-10'>
                <div className="container">
                    <div>
                        <div onClick={handleGoBack} className='flex items-center gap-x-[2px] cursor-pointer'><Icon name='soliddownicon' className='fill-subparagraph rotate-180 h-3 w-3' /> <p className='text-sm font-semibold leading-5 text-textparagraph capitalize'>back</p></div>
                        <div>

                        </div>
                    </div>
                    <div className='relative'>
                        <Icon className='w-10 h-10 absolute top-[360px] right-0  cursor-pointer z-10' onClick={() => swiperRef.current?.slideNext()} name='swipericon' />
                        <Icon className='w-10 h-10 absolute top-[360px] left-0  cursor-pointer z-10 rotate-180' onClick={() => swiperRef.current?.slidePrev()} name='swipericon' />
                        <Swiper
                            pagination={{
                                type: 'fraction',
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                            onBeforeInit={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                        >
                            {
                                desktop?.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <SwiperSlide>
                                                <Image className='select-none h-fit' src={`/images/${item}`} width={1500} height={10} alt='image' />
                                            </SwiperSlide>
                                        </Fragment>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>

            </section>
        </>
    )
}

export default page