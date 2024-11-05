'use client'
import Icon from '@/components/Icon'
import React, { Fragment, useState } from 'react'
import TechnicalTab from './TechnicalTab'
import DescriptionTab from './DescriptionTab'
import CreditTab from './CreditTab'
import WhatsNewTab from './WhatsNewTab'
import AuthorTab from './AuthorTab'
import { ProductDetailProps, TechTemplate } from '@/types/type'



/**
 * ProductDescription component renders the product's description, technical details, 
 * credits, what's new, and author information tabs.
 *
 * @component
 * @returns {JSX.Element} The rendered ProductDescription component.
 */



const ProductDescription: React.FC<ProductDetailProps> = ({ template }) => {
    // State to manage the active tab index
    const [activetab, setActivetab] = useState(0);

    

    // Button data for the tab titles and icons
    const btndata = [
        { title: "Description" },
        { title: "Technical Details" },
        { title: "Credits" },
        { title: "What's New", icon: "whatsnew" },
        { title: "About Author" }
    ]

    

    /**
    * Renders the content of the currently active tab.
    *
    * @returns {JSX.Element|null} The rendered tab content or null if no tab is active.
    */
    const renderTabContent = () => {
        switch (activetab) {
            case 0:
                return <DescriptionTab description={template?.description}/>
            case 1:
                return <TechnicalTab technicalDetails={template?.techDetails }/>
            case 2:
                return <CreditTab credits={template?.credits}/>
            case 3:
                return <WhatsNewTab details={template}/>  
            case 4:
                return <AuthorTab userDetail={template?.user}/>
            default:
                return null
        }
    }

    return (
        <>
            <section className='py-10 lg:py-20'>
                <div className='container'>
                    <div className='flex items-center md:justify-center gap-4 md:gap-x-[30px] max-w-[1560px] overflow-scroll hiddenscroll'>
                        {btndata.map((item, index) => (
                            <Fragment key={index}>
                                <button
                                    onClick={() => setActivetab(index)}
                                    className={`text-nowrap flex items-center gap-x-[6px] py-[6px] px-5 leading-l font-semibold text-subparagraph capitalize bg-divider-100 border-b transition-all duration-200 hover:border-primary-100 ${activetab === index ? ' border-primary-100' : ' border-transparent'}`}>
                                    {item.title}
                                    {item.icon && <Icon name={'whatsnew'} />}
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
