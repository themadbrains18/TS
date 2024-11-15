"use client"

import React, { Fragment } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

interface HideTemplate {
    isPopupOpen: boolean,
    closePopup: () => void;
    setHide:()=> void;
}

const HideTemplate = ({ isPopupOpen, closePopup,setHide }: HideTemplate) => {
    return (
        <>
            <Modal className='bg-[#E5EFFF]  p-5' isOpen={isPopupOpen} onClose={closePopup}>
                <div className="max-w-[500px] w-full">
                        <h2 className='text-base md:text-xl leading-7 font-semibold open_sans text-subheading capitalize' >are you sure you want to hide / unhide this template</h2>
                        <div className='flex gap-x-2 pt-3' >
                            <Button onClick={setHide} className='py-2' >yes</Button>
                            <Button onClick={closePopup} className='py-2' >no</Button>
                        </div>
                </div>
            </Modal>
        </>
    )
}

export default HideTemplate 