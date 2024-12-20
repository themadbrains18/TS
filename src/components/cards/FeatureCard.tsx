"use client"
import { featurecardprops } from '@/types/type'
import Image from 'next/image'
import React, { useState } from 'react'
import Icon from '../Icon'
import Button from '../ui/Button'
import Link from 'next/link'


const FeatureCard: React.FC<featurecardprops> = ({ id, slug, buttonprops, category, currentimage, poster, themeicon, title, totalimages, uploadericon, uploadername, isPaid }) => {

    const [imgSrc, setImgSrc] = useState(poster ? poster : '/images/featureimg.png');

    /**
     * Fallback image with a leading slash
     */
    const handleImageError = () => {
        setImgSrc('/images/featureimg.png');
    };
    console.log(themeicon, "heloooooooooooooooooooo")
    return (
        <>
            <div className='group  border border-divider-100 animate-zoom flex flex-col bg-white justify-between'>
                <div className='relative h-auto'>
                    <Image
                        src={imgSrc}
                        onError={handleImageError}
                        className='w-full h-auto object-cover  '
                        width={370}
                        height={278}
                        alt='productimg'
                    />

                    <Link href={`/product/${slug}`}>
                        <div className='absolute top-0 right-0 left-0 bottom-0 group-hover:bg-[#28204699]  max-[500px]:bg-[#28204699] transition-all duration-[0.5s] flex items-center justify-center gap-x-1 cursor-pointer'>
                            <div className='flex items-center justify-center cursor-pointer z-10 group-hover:opacity-100 sm:opacity-0 duration-[0.5s]'>
                                <h3 className='capitalize text-white text-lg font-bold leading-7'>view details</h3>
                                <Icon name='share' />
                            </div>
                            <span className=' p-2 rounded-[30px] absolute top-5 right-5 text-white z-0 inline-block bg-[#00000019]'>{`${currentimage}/${totalimages}`}</span>
                        </div>
                    </Link>
                </div>
                <div className='flex flex-col h-full justify-between'>

                    <div className='px-[10px] pt-[10px] md:px-5 md:pt-3 bg-white'>
                        <div className='flex items-start justify-between w-full  pb-[10px] md:pb-5'>
                            <h3 className='text-subparagraph font-semibold leading-6 capitalize text-xs tab:text-[15px] max-w-[190px] sm:max-w-[400px] '>{title}</h3>
                            {
                                themeicon === "Figma" ? <Icon className='max-w-6 w-full h-6' name='figma' /> : ""}
                            {
                                themeicon === "Adobe XD" ? <Icon className='max-w-6 w-full h-6' name='adobexd' /> : ""
                            }
                            {
                                themeicon === "Sketch" ? <Icon className='max-w-6 w-full h-6' name='sketch' /> : ""
                            }
                            {
                                themeicon === "Photoshop" ? <Icon className='max-w-6 w-full h-6' name='photoshop' /> : ""
                            }
                            {
                                themeicon === "ReactJs" ? <Icon className='max-w-6 w-full h-6' name='reactjs' /> : ""
                            }
                            {
                                themeicon === "Tailwind Css" ? <Icon className='max-w-6 w-full h-6' name='tailwind' /> : ""
                            }
                            {
                                themeicon === "NextJs" ? <Icon className='max-w-6 w-full h-6  fill-black' name="nextjs" /> : ""
                            }

                        </div>
                    </div>
                    <div className='flex items-center justify-between bg-white p-[10px] md:px-5 md:py-3 border-t border-divider-100 '>
                        <div className='flex items-center gap-x-2'>
                            <Image className='w-5 h-5 object-cover rounded-full ' src={`${uploadericon ? uploadericon : '/icons/mdb.svg'}`} width={20} height={20} alt='uploadericon' />
                            <p className='text-subparagraph text-xs leading-5 capitalize text-nowrap text-ellipsis overflow-hidden flex'>
                                <span className='text-subheading pr-[4px] '>by </span>
                                <span className='text-xs text-subheading font-semibold leading-5 capitalize  pr-[6px]'>{uploadername ? uploadername : "The Mad Brains"}</span>
                                {/* <Icon className="w-[1px] h-4 " name='linevertical' /> */}
                                {/* <span className='text-xs max-w-[130px] truncate  text-subheading font-semibold leading-5 capitalize pl-[6px]'>{category}</span> */}
                            </p>
                        </div>
                        <Button variant='primary' className='py-[5px] px-[10px] text-sm leading-5 font-semibold capitalize'>
                            {/* {isPaid && buttonprops && buttonprops > 0
                                ? `$${buttonprops}` : "Free"
                            } */}
                            {isPaid && buttonprops && buttonprops > 0
                                ? (<>
                                    <span className='md:text-[14px] text-[12px] font-semibold leading-5' >{`$${buttonprops}`}</span>
                                </>)
                                : (
                                    <>
                                        <span className='md:text-[14px] text-[12px] font-semibold leading-5'>{"Free Download"}</span>
                                    </>
                                )
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeatureCard;


