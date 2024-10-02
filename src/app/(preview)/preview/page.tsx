'use client'

import React, { Fragment, useState } from 'react'
import MobileView from '../components/MobileView'
import WebView from '../components/WebView'
import Button from '@/components/ui/Button'
import Image from 'next/image'

const page = () => {
    const [activebutton, setActiveButton] = useState(0)

    const views = [
        'desktop',
        'mobile responsive'
    ];

    const dummyimages = [
        {
            desktop: [
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
            ],
            mobile: [
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
                'mobileprev1.png',
            ]
        }
    ]
    console.log(activebutton)
    return (
        <>
            <section className='pt-10 md:pt-20 bg-bgcolor'>
                <div className="container">
                    <div className='flex items-center gap-x-5'>
                        {
                            views?.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Button onClick={() => { setActiveButton(index) }} className={` capitalize py-2 px-5 ${activebutton === index ? 'bg-primary-100 text-white ' : ' bg-primary-200 text-textparagraph hover:bg-white hover:text-primary-100'
                                            }`} children={item} />
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                    <div className='pt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-x-[30px] md:gap-y-10'>
                        {
                            dummyimages?.map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        {
                                            activebutton === 0 ? (<>
                                                {
                                                    item.desktop.map((item, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <Image className='cursor-pointer' key={index} src={`/images/${item}`} width={358} height={1000} style={{ width: "100%", }} alt='images' />
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </>) :
                                                (<>
                                                    {
                                                        item.mobile.map((item, index) => {
                                                            return (
                                                                <Fragment key={index}>
                                                                    <Image className='cursor-pointer' key={index} src={`/images/${item}`} width={358} height={1000} style={{ width: "100%", }} alt='images' />
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                </>)
                                        }



                                    </Fragment>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default page