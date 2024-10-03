"use client"

import React, { Fragment } from 'react'
import Icon from '../Icon'
import Image from 'next/image'
import Button from '../ui/Button'
import Link from 'next/link'
import Modal from '../ui/Modal'


interface Downloadpopup {
    isPopupOpen: boolean,
    closePopup: () => void;
    opensecoundpopup: () => void;
}


const Download = ({ isPopupOpen, closePopup, opensecoundpopup }: Downloadpopup) => {

    const socialicons = [
        {
            icon: "dribbble-logo.svg"
        },
        {
            icon: "linkedin.svg"
        },
        {
            icon: "twitter.svg"
        },
        {
            icon: "behance.svg"
        },
        {
            icon: "instagram.svg"
        },
    ];
    return (
        <>
            <Modal className='bg-[#E5EFFF]  py-[30px]' isOpen={isPopupOpen} onClose={closePopup} >
                <div className="max-w-[500px] w-full">
                    <div className='flex pb-5 border-b border-[#878787] items-start md:items-center px-4 md:px-[30px] '>
                        <h2 className='text-lg md:text-[20px] leading-7 font-semibold text-subheading open_sans' >Enefty - NFT Marketplace UI Template Designed With Figma</h2>
                        <div className='cursor-pointer' >
                            <Icon onClick={closePopup} name='closeicon' className='w-6 h-6' />
                        </div>
                    </div>
                    <div className="px-5 md:px-[30px]">
                        <Image className='my-[35px] w-full' alt='img' src={'/images/popimg.png'} width={437} height={270} />
                        <Button onClick={opensecoundpopup} variant='primary' className='w-full justify-center open_sans' >Download Now</Button>
                        <p className='text-[16p]  font-normal leading-6 pt-[15px] text-center text-subparagraph open_sans' >Complete your 1st Free Download</p>
                    </div>
                    <div className='flex justify-center items-center flex-col pt-5 md:pt-[60px] px-5' >
                        <h3 className=' open_sans font-normal leading-6 pb-[15px] text-subparagraph text-center' >Help us to expand the designer&apos;s community</h3>
                        <div className="flex items-center lg:max-w-[250px] w-full justify-between mt-5 lg:mt-0">
                            {
                                socialicons?.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Link href={'#'}>
                                                <Image className="transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.1] hover:rotate-6" width={30} height={30} src={`/icons/${item.icon}`} alt="icons" />
                                            </Link>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Download 