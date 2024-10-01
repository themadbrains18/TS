"use client"

import React, { Fragment, useState } from 'react'
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
                    <div className='flex pb-5 border-b border-subparagraph  items-center px-[30px]'>
                        <h2 className='text-[20px] leading-7 font-semibold ' >Enefty - NFT Marketplace UI Template Designed With Figma</h2>
                        <div className='cursor-pointer' >
                            <Icon onClick={closePopup} name='closeicon' className='' />
                        </div>
                    </div>
                    <div className="px-[30px]">
                        <Image className='my-[35px] w-full' alt='img' src={'/images/popimg.png'} width={437} height={270} />
                        <Button onClick={opensecoundpopup} variant='primary' className='py-[13px] w-full justify-center' >Download Now</Button>
                        <p className='text-[16p] text-subparagraph font-normal leading-6 pt-[15px] text-center' >Complete your 1st Free Download</p>
                    </div>
                    <div className='flex justify-center items-center flex-col pt-[60px]' >
                        <h3 className='text-[16p] text-subheading font-normal leading-6 pb-[15px]' >Help us to expand the designer's community</h3>
                        <div className="flex items-center lg:max-w-[250px] w-full justify-between mt-10 lg:mt-0">
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