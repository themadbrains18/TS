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
}

const SendLink = ({ isPopupOpen, closePopup }: Downloadpopup) => {

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
                        <Icon onClick={closePopup} name='closeicon' className='cursor-pointer' />
                    </div>
                    <div className="px-[30px] flex justify-center items-center  flex-col gap-[39px] mt-[50px] ">
                        <p className='text-[16px] font-normal leading-6 text-subparagraph' >You have just completed your 3 free downloads per day
                            Do not worry! Enter your email to get this product free.</p>
                        <Image className='my-[35px] max-w-[232px] w-full' alt='img' src={'/images/sendemailpopimage.png'} width={232} height={148} />
                        <input type="text" placeholder='Enter your email' className='py-[18px] px-[15px] bg-white rounded-[5px] w-full placeholder:text-subparagraph outline-none ' />
                        <Button variant='primary' className='py-[13px] w-full justify-center' >Send Link</Button>
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

export default SendLink 