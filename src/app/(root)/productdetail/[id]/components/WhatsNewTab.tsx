import WhatsnewCard from '@/components/cards/WhatsnewCard'
import { formatDate } from '@/libs/utils'
import { TechTemplate } from '@/types/type'
import React, { Fragment } from 'react'

interface whatsNewProps {
    details: TechTemplate
}

const WhatsNewTab: React.FC<whatsNewProps> = ({ details }) => {

    /**
     * Data for the update cards
     */
    const carddata = [
        {
            icon: "publish.svg",
            title: "published on",
            description: formatDate(details.createdAt)
        },
        {
            icon: "update.svg",
            title: "Last Update",
            description: formatDate(details.updatedAt)
        },
        {
            icon: "update.svg",
            title: "Latest Version",
            description: details.version
        },
    ]
    return (
        <>
            <div className='md:p-20 p-8p-20'>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-y-[10px] gap-x-[30px]'>
                    {
                        carddata?.map((item, index) => {
                            return (
                                <Fragment key={index}>
                                    <WhatsnewCard description={item.description} icons={item.icon} title={item.title} />
                                </Fragment>
                            )
                        })
                    }
                </div>
                <h3 className='text-xl font-bold leading-7 mt-10'>New Updates</h3>
                <div className='mt-5 py-5 px-[10px] md:py-10 md:px-[50px] border border-divider-200'>
                    <div className='grid gap-y-[10px] md:gap-y-0 tab:grid-cols-2 mb-[10px] pb-[10px] md:pb-5 md:mb-5 gap-x-[15px] border-b border-divider-200'>
                        <ul className='list-inside list-disc m-0 p-0'>
                            <li className='text-sm text-subparagraph md:text-base md:leading-6 capi' >400+ Exclusive Pre-Built Templates</li>
                            <li className='text-sm text-subparagraph md:text-base md:leading-6 capi' >200+ Components</li>
                        </ul>
                    </div>
                    <div className='grid gap-y-[10px] md:gap-y-0 tab:grid-cols-2 mb-[10px] pb-[10px] md:pb-5 md:mb-5 gap-x-[15px] border-b border-divider-200'>
                        <ul className='list-inside list-disc m-0 p-0'>
                            <li className='text-sm text-subparagraph md:text-base md:leading-6 capi' >400+ Exclusive Pre-Built Templates</li>
                            <li className='text-sm text-subparagraph md:text-base md:leading-6 capi' >200+ Components</li>
                        </ul>
                    </div>
                    <div className='grid gap-y-[10px] md:gap-y-0 tab:grid-cols-2 mb-[10px] pb-[10px] md:pb-5 md:mb-5 gap-x-[15px] border-b border-divider-200'>
                        <ul className='list-inside list-disc m-0 p-0'>
                            <li className='text-sm text-subparagraph md:text-base md:leading-6 capi' >400+ Exclusive Pre-Built Templates</li>
                            <li className='text-sm text-subparagraph md:text-base md:leading-6 capi' >200+ Components</li>
                        </ul>
                    </div>
                    <div className='grid gap-y-[10px] md:gap-y-0 tab:grid-cols-2 gap-x-[15px] '>
                        <ul className='list-inside list-disc m-0 p-0'>
                            <li className='text-sm text-subparagraph md:text-base md:leading-6 capi' >400+ Exclusive Pre-Built Templates</li>
                            <li className='text-sm text-subparagraph md:text-base md:leading-6 capi' >200+ Components</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhatsNewTab