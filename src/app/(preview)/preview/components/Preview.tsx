'use client'

import React, { FC, Fragment, useState } from 'react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { PreviewImage } from '@/types/type'

interface previewimagesprops {
    previewImages?: PreviewImage[],
    previewMobileImages?: PreviewImage[]
}

const Preview: FC<previewimagesprops> = ({ previewImages, previewMobileImages }) => {
    const [activebutton, setActiveButton] = useState<number>(0)
    const views = [
        'desktop',
        'mobile responsive'
    ];


    // const dummyimages = [
    //     {
    //         desktop: [
    //             'prev1.png',
    //             'prev2.png',
    //             'prev3.png',
    //             'prev4.png',
    //             'prev5.png',
    //             'prev6.png',
    //             'prev7.png',
    //             'prev8.png',
    //             'prev9.png',
    //             'prev10.png',
    //             'prev11.png',
    //             'prev12.png',
    //             'prev13.png',
    //             'prev14.png',
    //             'prev15.png',
    //             'prev16.png',
    //             'prev17.png',
    //             'prev18.png',
    //             'prev19.png',
    //             'prev20.png',
    //             'prev21.png',
    //             'prev22.png',
    //         ],
    //         mobile: [
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //             'mobileprev1.png',
    //         ]
    //     }
    // ]
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
                                            }`}  >
                                            {item}
                                        </Button>
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                    <div className='pt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-x-[30px] md:gap-y-10'>
                        {/* {
                            previewImages?.map((item, index) => {
                                return (
                                    <Fragment key={index}> */}
                        {
                            activebutton === 0 ? (<>
                                {
                                    previewImages?.map((item, index) => {
                                        return (
                                            <>
                                            {console.log(item.imageUrl,"heloo ji")}
                                            <Fragment key={Date.now() + index + "imagesdesktop"}>
                                                <Image className='cursor-pointer' src={item.imageUrl} width={358} height={1000} style={{ width: "100%", }} alt='images' />
                                            </Fragment>
                                            </>
                                        )
                                    })
                                }
                            </>) :
                                (<>
                                    {
                                        previewMobileImages?.map((item, index) => {
                                            return (
                                                <Fragment key={Date.now() + index + "imagesmobile"}>
                                                    <Image className='cursor-pointer' src={item.imageUrl} width={358} height={1000} style={{ width: "100%", }} alt='images' />
                                                </Fragment>
                                            )
                                        })
                                    }
                                </>)
                        }
                        {/* </Fragment> */}
                        {/* )
                            })
                        } */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Preview