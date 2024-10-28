"use client"
import { featurecardprops } from '@/types/type'
import Image from 'next/image'
import React, { useState } from 'react'
import Icon from '../Icon'
import Button from '../ui/Button'
import Link from 'next/link'


const FeatureCard: React.FC<featurecardprops> = ({ id, buttonprops, category, currentimage, poster, themeicon, title, totalimages, uploadericon, uploadername, isPaid }) => {
    // console.log(id, buttonprops, category, currentimage, poster, themeicon, title, totalimages, uploadericon, uploadername, isPaid, "id")
    // Ensure poster URL starts with a leading slash or is an absolute URL
    const [imgSrc, setImgSrc] = useState(poster ? poster : '/images/featureimg.png');

    const handleImageError = () => {
        setImgSrc('/images/featureimg.png'); // Fallback image with a leading slash
    };
    return (
        <>
            <div className='group'>

                <div className='relative h-[278px]'>
                    <Image
                        src={imgSrc}
                        onError={handleImageError}
                        className='w-full h-[278px] object-cover  '
                        width={370}
                        height={278}
                        alt='productimg'
                    />

                    <Link href={`/productdetail/${id}`}>
                        <div className='absolute top-0 right-0 left-0 bottom-0 bg-subheading opacity-0 transition-all duration-[0.5s] group-hover:opacity-50 flex items-center justify-center gap-x-1 cursor-pointer'>
                            <div className='flex items-center justify-center cursor-pointer'>
                                <h3 className='capitalize text-white text-lg font-bold leading-7'>view details</h3>
                                <Icon name='share' />
                            </div>
                            <span className='py-[5px] px-10px rounded-[30px] absolute top-5 right-5 text-white z-10 inline-block bg-[#00000019]'>{`${currentimage}/${totalimages}`}</span>
                        </div>
                    </Link>
                </div>

                <div>
                    <div className='px-[10px] pt-[10px] md:px-5 md:pt-3 bg-white'>
                        <div className='flex items-center justify-between w-full border-b border-divider-100 pb-[10px] md:pb-5'>
                            <h3 className='text-subparagraph font-semibold leading-6 capitalize text-xs tab:text-base'>{title}</h3>
                            {/* <Image src={`/icons/${themeicon}`} width={20} height={20} alt='themeicon' /> */}
                            {
                                themeicon === "figma" ? <Icon className='max-w-6 w-full h-6' name='figma' /> : ""}
                            {
                                themeicon === "adobexd" ? <Icon className='max-w-6 w-full h-6' name='adobexd' /> : ""
                            }
                            {
                                themeicon === "sketch" ? <Icon className='max-w-6 w-full h-6' name='xd' /> : ""
                            }
                            {
                                themeicon === "photoshop" ? <Icon className='max-w-6 w-full h-6' name='photoshop' /> : ""
                            }
                        </div>
                    </div>
                    <div className='flex items-center justify-between bg-white p-[10px] md:px-5 md:py-3'>
                        <div className='flex items-center gap-x-2'>
                            <Image src={`/icons/${uploadericon}`} width={20} height={20} alt='uploadericon' />
                            <p className='text-subparagraph text-sx leading-5 capitalize text-nowrap text-ellipsis overflow-hidden'>
                                by <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{uploadername}</span> <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{category}</span>
                            </p>
                        </div>
                        <Button variant='primary' className='py-[5px] px-[10px] text-sm leading-5 font-semibold capitalize'>
                            {isPaid ? `$${buttonprops}` : "Free"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeatureCard;
