"use client"

import React, { Fragment } from 'react'
import Icon from '../Icon'
import Image from 'next/image'
import Link from 'next/link'
import Modal from '../ui/Modal'

interface Downloadpopup {
    isPopupOpen: boolean,
    closePopup: () => void;
    title: string
}

const Checkinbox = ({ isPopupOpen, closePopup, title }: Downloadpopup) => {

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
            <Modal className='bg-[#E5EFFF]  py-[30px]' isOpen={isPopupOpen} onClose={closePopup}>
                <div className="max-w-[500px] w-full">
                    <div className='flex pb-5 border-b border-[#878787]  items-center px-5 md:px-[30px] justify-between'>
                        <h2 className='text-base md:text-xl leading-7 font-semibold open_sans text-subheading'>{title}</h2>
                        <div className='w-6 h-6' >
                            <Icon onClick={closePopup} name='closeicon' className='cursor-pointer ' />
                        </div>
                    </div>
                    <div className="px-5 flex justify-center items-center  flex-col gap-y-5 md:gap-y-[35px] ">
                        <Image className=' max-w-[150px] md:max-w-[232px]  w-full mt-5 md:mt-[35px]' alt='img' src={'/icons/checkinboxicon.svg'} width={217} height={217} />
                        <h2 className='text-center leading-9 text-subheading capitalize font-bold text-xl md:text-[28px] open_sans'>Please Check Your Inbox</h2>
                        <p className='text-center text-lg md:text-base leading-[25px] text-subparagraph open_sans'>You have just received an download link via email. Open the given link for free download </p>
                    </div>
                    <div className='flex justify-center items-center flex-col mt-5 md:mt-[50px] px-5' >
                        <h3 className='text-base text-subparagraph font-normal leading-6 pb-[15px] open_sans text-center' >Join our community on social media for exclusive updates and design tips</h3>
                        <div className="  flex items-center lg:max-w-[250px] w-full justify-between mt-5 md:mt-10 lg:mt-0">
                            {socialicons && socialicons.length > 0 &&
                                socialicons?.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <Link href={'#'}>
                                                <Image className="transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.1] hover:rotate-6" width={30} height={30} src={`/icons/${item?.icon}`} alt="icons" />
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

export default Checkinbox 