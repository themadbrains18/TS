"use client"

import React from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

interface HideTemplate {
    isPopupOpen: boolean,
    closePopup: () => void;
    setHide: () => void;
    templateStatusLoader: boolean
}

const HideTemplate = ({ isPopupOpen, closePopup, setHide, templateStatusLoader }: HideTemplate) => {
    return (
        <>
            <Modal className='bg-[#E5EFFF]  p-5' isOpen={isPopupOpen} onClose={closePopup}>
                <div className="max-w-[500px] w-full">
                    <h2 className='text-base md:text-xl leading-7 font-semibold open_sans text-subheading capitalize' >are you sure you want to hide / unhide this template</h2>
                    <div className='flex gap-x-2 pt-3' >
                        <Button loadingbtn={templateStatusLoader} disabled={templateStatusLoader} onClick={setHide} className='py-2' >{templateStatusLoader ? "" : "yes"}</Button>
                        <Button onClick={closePopup} className='py-2' >no</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default HideTemplate 