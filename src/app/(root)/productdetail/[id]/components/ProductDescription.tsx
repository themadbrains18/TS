'use client'
import Icon from '@/components/Icon'
import React, { Fragment, useState } from 'react'
import TechnicalTab from './TechnicalTab'
import DescriptionTab from './DescriptionTab'
import CreditTab from './CreditTab'
import WhatsNewTab from './WhatsNewTab'
import AuthorTab from './AuthorTab'
import { TechTemplate } from '@/types/type'



/**
 * ProductDescription component renders the product's description, technical details, 
 * credits, what's new, and author information tabs.
 *
 * @component
 * @returns {JSX.Element} The rendered ProductDescription component.
 */

interface ProductDescriptiontype {
    template: TechTemplate
    activetab: any
    setActivetab: any
}


const ProductDescription = ({ template, activetab, setActivetab }: ProductDescriptiontype) => {




    /**
     * Button data for the tab titles and icons
     */
    const btndata = [
        { title: "Description", show: true },
        { title: "Technical Details", show: true },
        { title: "Credits", show: template?.credits?.length > 0 },
        { title: "What's New", icon: "whatsnew", show: false },
        { title: "About Author", show: true }
    ]



    /**
    * Renders the content of the currently active tab.
    *
    * @returns {JSX.Element|null} The rendered tab content or null if no tab is active.
    */

    const renderTabContent = () => {
        switch (activetab) {
            case 0:
                return <DescriptionTab description={template?.description} />
            case 1:
                return <TechnicalTab technicalDetails={template?.techDetails} />
            case 2:
                return <CreditTab credits={template?.credits} />
            case 3:
                return <WhatsNewTab details={template} />
            case 4:
                return <AuthorTab userDetail={template?.user} />
            default:
                return null
        }
    }

    return (
        <>
            <section id="description" className='py-10 lg:py-20 relative z-10' >
                <div className='container'>
                    <div className='flex items-center md:justify-center gap-4 md:gap-x-[30px] max-w-[1560px] overflow-scroll hiddenscroll'>
                        {btndata?.map((item, index) => (
                            <Fragment key={index}>
                                {item?.show && <button
                                    onClick={() => setActivetab(index)}
                                    className={`text-nowrap flex items-center gap-x-[6px] py-[6px] px-5 leading-l font-semibold text-subparagraph capitalize bg-divider-100 border-b transition-all duration-200 hover:border-primary-100 ${activetab === index ? ' border-primary-100' : ' border-transparent'}`}>
                                    {item.title}
                                    {item.icon && <Icon name={'whatsnew'} />
                                    }
                                </button>}
                            </Fragment>
                        ))}
                    </div>

                    <div className='tab-content  border border-[#e8e8e8] rounded-[5px]'>
                        {renderTabContent()} {/* Only render the active tab content */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDescription
