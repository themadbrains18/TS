import React from 'react'

/**
 * TechnicalTab component renders the technical highlights of a product.
 *
 * @component
 * @returns {JSX.Element} The rendered TechnicalTab component.
 */

interface techDetailProps {
    technicalDetails: string[]
}

const TechnicalTab: React.FC<techDetailProps> = ({ technicalDetails }) => {
    return (
        <>
            <div className='md:p-20 p-8'>
                <h3 className='text-xl font-bold leading-7'>Highlight</h3>
                <div className='mt-5 py-5 md:py-10 px-[10px] md:px-[50px] border border-divider-200 '>
                    <ul className='grid grid-cols-1 md:grid-cols-2 pb-5 mb-5 list-disc list-outside'>
                        {technicalDetails && technicalDetails?.length > 0 && technicalDetails?.map((item: string, index: number) => {
                            return (
                                <>
                                    <li className='text-sm md:text-base leading-6 capitalize py-5 border-b max-w-[550px] ' key={index}>
                                        {item}
                                        <span className='border-divider-200'></span>
                                    </li>
                                </>
                            )
                        })}

                        {technicalDetails?.length % 2 !== 0
                            &&
                            <li className='text-sm md:text-base leading-6 py-5 border-b border-divider-200 list-none' >
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </>
    )
}

export default TechnicalTab

