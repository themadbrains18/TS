import React from 'react'




/**
 * CreditTab component displays the sources of fonts, icons, images, and illustrations used.
 *
 * @component
 * @example
 * return (
 *   <CreditTab />
 * )
 */

const CreditTab = () => {
    return (
        <>
            <div className='mt-10 lg:mt-20'>
                <h3 className='text-xl font-bold leading-7'>Sources</h3>
                <div className='mt-5 py-5 px-[10px] md:py-10 md:px-[50px] border border-divider-200'>
                    <div className='grid grid-cols-2 mb-[10px] pb-[10px] md:pb-5 md:mb-5 border-b border-divider-200'>
                        <div>
                            <h3 className='text-subparagraph leading-6 mb-5 text-sm tab:text-base'>Fonts Used</h3>
                            <li className=''><p className='text-xs tab:text-sm leading-5 text-primarycyan inline-block' > poppins</p></li>
                            <li className='mt-[10px]'><p className='text-xs tab:text-sm leading-5 text-primarycyan inline-block' > Open Sans</p></li>
                        </div>
                        <div>
                            <h3 className='text-subparagraph leading-6 mb-5 text-sm tab:text-base'>Icons Used</h3>
                            <li className=''><p className='text-xs tab:text-sm leading-5 text-primarycyan inline-block' > Freepik</p></li>
                            <li className='mt-[10px]'><p className='text-xs tab:text-sm leading-5 text-primarycyan inline-block' > flaticon</p></li>
                        </div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div>
                            <h3 className='text-subparagraph leading-6 mb-5 text-sm tab:text-base'>Images Used</h3>
                            <li className=''><p className='text-xs tab:text-sm leading-5 text-primarycyan inline-block' > Freepik</p></li>
                            <li className='mt-[10px]'><p className='text-xs tab:text-sm leading-5 text-primarycyan inline-block' > unsplash </p></li>
                        </div>
                        <div>
                            <h3 className='text-subparagraph leading-6 mb-5 text-sm tab:text-base'>Illustrations Used</h3>
                            <li className=''><p className='text-xs tab:text-sm leading-5 text-primarycyan inline-block' > Freepik</p></li>
                            <li className='mt-[10px]'><p className='text-xs tab:text-sm leading-5 text-primarycyan inline-block' > flaticon</p></li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreditTab