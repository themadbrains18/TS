import { featurecardprops } from '@/types/type'
import Image from 'next/image'
import React from 'react'
import Icon from '../Icon'
import Button from '../ui/Button'

const FeatureCard: React.FC<featurecardprops> = ({ buttonprops, category, currentimage, poster, themeicon, tittle, totalimages, uploadericon, uploadername }) => {

    return (
        <>
            <div>
                <div className='relative group'>
                    <Image src={`/images/${poster}`} className='w-full' width={370} height={278} alt='productimg' />
                    <div className='absolute top-0 right-0 left-0 bottom-0 bg-subheading opacity-0 transition-all duration-[0.5s] group-hover:opacity-50 flex items-center justify-center gap-x-1 cursor-pointer'>
                        <div className='flex items-center justify-center cursor-pointer'>
                            <h3 className='capitalize text-white text-lg font-bold leading-7'>view details</h3>
                            <Icon name='share' />
                        </div>
                        <span className='py-[5px] px-10px rounded-[30px] absolute top-5 right-5 text-white z-10 inline-block bg-[#00000019]'>{`${currentimage}/${totalimages}`}</span>
                    </div>
                </div>
                <div>
                    <div className='px-5 pt-5 bg-white '>
                        <div className=' flex items-center justify-between w-full border-b border-divider-100 pb-5'>

                            <h3 className='text-subparagraph font-semibold leading-6 capitalize'>{`${tittle}`}</h3>
                            <Image src={`/icons/${themeicon}`} width={20} height={20} alt='themeicon' />
                        </div>
                    </div>
                    <div className='flex items-center justify-between bg-white px-5 py-3 ' >
                        <div className='flex items-center gap-x-2'>
                            <Image src={`/icons/${uploadericon}`} width={20} height={20} alt='uploadericon' />
                            <p className='text-subparagraph text-sx leading-5 capitalize'>by <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{`${uploadername}`}</span> <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{`${category}`}</span></p>
                        </div>
                        <Button variant='primary' className='py-[5px] px-[10px] text-sm leading-5 font-semibold capitalize' children={`${buttonprops}`} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeatureCard