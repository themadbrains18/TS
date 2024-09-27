import WhatsnewCard from '@/components/cards/WhatsnewCard'
import React, { Fragment } from 'react'

const WhatsNewTab = () => {
    const carddata = [
        {
            icon: "publish.svg",
            tittle: "published on",
            description: "23/03-2022"
        },
        {
            icon: "update.svg",
            tittle: "Last Update",
            description: "23/03-2022"
        },
        {
            icon: "update.svg",
            tittle: "Latest Version",
            description: "1.1.0"
        },
    ]
    return (
        <>
            <div className='mt-10 lg:mt-20'>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-[10px] gap-x-[30px]'>
                    {
                        carddata?.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <WhatsnewCard description={item.description} icons={item.icon} tittle={item.tittle} />
                                </Fragment>
                            )
                        })
                    }

                </div>
                <h3 className='text-xl font-bold leading-7 mt-10'>New Updates</h3>
                <div className='mt-5 py-5 px-[10px] md:py-10 md:px-[50px] border border-divider-200'>
                    <div className='grid gap-y-[10px] md:gap-y-0 tab:grid-cols-2 mb-[10px] pb-[10px] md:pb-5 md:mb-5 gap-x-[15px] border-b border-divider-200'>
                        <div><li className='text-sm text-subparagraph md:text-base md:leading-6' >400+ Exclusive Pre-Built Templates</li></div>
                        <div><li className='text-sm text-subparagraph md:text-base md:leading-6' >200+ Components</li></div>
                    </div>
                    <div className='grid gap-y-[10px] md:gap-y-0 tab:grid-cols-2 mb-[10px] pb-[10px] md:pb-5 md:mb-5 gap-x-[15px] border-b border-divider-200'>
                        <div><li className='text-sm text-subparagraph md:text-base md:leading-6' >400+ Exclusive Pre-Built Templates</li></div>
                        <div><li className='text-sm text-subparagraph md:text-base md:leading-6' >200+ Components</li></div>
                    </div>
                    <div className='grid gap-y-[10px] md:gap-y-0 tab:grid-cols-2 mb-[10px] pb-[10px] md:pb-5 md:mb-5 gap-x-[15px] border-b border-divider-200'>
                        <div><li className='text-sm text-subparagraph md:text-base md:leading-6' >400+ Exclusive Pre-Built Templates</li></div>
                        <div><li className='text-sm text-subparagraph md:text-base md:leading-6' >200+ Components</li></div>
                    </div>
                    <div className='grid gap-y-[10px] md:gap-y-0 tab:grid-cols-2 gap-x-[15px] '>
                        <div><li className='text-sm text-subparagraph md:text-base md:leading-6' >400+ Exclusive Pre-Built Templates</li></div>
                        <div><li className='text-sm text-subparagraph md:text-base md:leading-6' >200+ Components</li></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhatsNewTab