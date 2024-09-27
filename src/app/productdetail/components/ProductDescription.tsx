'use client'
import Icon from '@/components/Icon'
import React, { Fragment, useState } from 'react'
import TechnicalTab from './TechnicalTab'
import DescriptionTab from './DescriptionTab'
import CreditTab from './CreditTab'
import WhatsNewTab from './WhatsNewTab'
import AuthorTab from './AuthorTab'

const ProductDescription = () => {
    const [activetab, setActivetab] = useState(0)

    const btndata = [
        { tittle: "Description" },
        { tittle: "Technical Details" },
        { tittle: "Credits" },
        { tittle: "What's New", icon: "whatsnew" },
        { tittle: "About Author" }
    ]

    // Function to render the correct tab content
    const renderTabContent = () => {
        switch (activetab) {
            case 0:
                return <DescriptionTab />
            case 1:
                return <TechnicalTab />
            case 2:
                return <CreditTab />
            case 3:
                return <WhatsNewTab />
            case 4:
                return <AuthorTab />
            default:
                return null
        }
    }

    return (
        <>
            <section className='py-10 lg:py-20'>
                <div className='container'>
                    <div className='flex items-center md:justify-center gap-x-[30px] max-w-[1560px] overflow-scroll hiddenscroll'>
                        {btndata.map((item, index) => (
                            <Fragment key={index}>
                                <button
                                    onClick={() => setActivetab(index)}
                                    className={`text-nowrap flex items-center gap-x-[6px] py-[6px] px-5 leading-l font-semibold text-subparagraph capitalize bg-divider-100 border-b transition-all duration-200 ${activetab === index ? ' border-primary-100' : ' border-transparent'}`}>
                                    {item.tittle}
                                    {item.icon && <Icon name={'whatsnew'}  />}
                                </button>
                            </Fragment>
                        ))}
                    </div>

                    <div className='tab-content mt-10'>
                        {renderTabContent()} {/* Only render the active tab content */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDescription
