import React from 'react'

/**
 * TechnicalTab component renders the technical highlights of a product.
 *
 * @component
 * @returns {JSX.Element} The rendered TechnicalTab component.
 */



const TechnicalTab = () => {
    return (
        <>
            <div className='mt-10 lg:mt-20 '>
                <h3 className='text-xl font-bold leading-7'>Highlight</h3>
                <div className='mt-5 py-5 md:py-10 px-[10px] md:px-[50px] border border-divider-200'>
                    <div className='grid grid-cols-1 md:grid-cols-2 pb-5 mb-5 gap-x-[15px] border-b border-divider-200'>
                        <li className='text-sm md:text-base leading-6'>400+ Exclusive Pre-Built Templates</li>
                        <li className='text-sm md:text-base leading-6'>200+ Components</li>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 pb-5 mb-5 gap-x-[15px] border-b border-divider-200'>
                        <li className='text-sm md:text-base leading-6'>400+ Exclusive Pre-Built Templates</li>
                        <li className='text-sm md:text-base leading-6'>200+ Components</li>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 pb-5 mb-5 gap-x-[15px] border-b border-divider-200'>
                        <li className='text-sm md:text-base leading-6'>400+ Exclusive Pre-Built Templates</li>
                        <li className='text-sm md:text-base leading-6'>200+ Components</li>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 pb-5 mb-5 gap-x-[15px] border-b border-divider-200'>
                        <li className='text-sm md:text-base leading-6'>400+ Exclusive Pre-Built Templates</li>
                        <li className='text-sm md:text-base leading-6'>200+ Components</li>
                    </div>



                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default TechnicalTab