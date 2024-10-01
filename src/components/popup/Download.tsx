"use client"

import React, { Fragment, useState } from 'react'
import Icon from '../Icon'
import Image from 'next/image'
import Button from '../ui/Button'
import Link from 'next/link'
import Modal from '../ui/Modal'

const Download = ({ isPopupOpen, closePopup }: any) => {


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
            <Modal className='bg-[#E5EFFF]' isOpen={isPopupOpen} onClose={closePopup} >
                <div className="  ">
                    <div className='flex pb-5 border border-subparagraph '>
                        <h2 className='text-[20px] leading-7 font-semibold ' >Enefty - NFT Marketplace UI Template Designed With Figma</h2>
                        <Icon name='crossicon' />
                    </div>
                    <div className="">
                        <Image className='my-[35px]' alt='img' src={'/images/popimg.png'} width={437} height={270} />
                        <Button variant='primary' className='py-[13px]' >Download Now</Button>
                        <p className='text-[16p] text-subparagraph font-normal leading-6' >Complete your 1st Free Download</p>
                    </div>
                    <div>
                        <h3 className='text-[16p] text-subheading font-normal leading-6' >Help us to expand the designer's community</h3>
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