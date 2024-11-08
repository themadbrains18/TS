"use client"

import React, { Fragment } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

interface deletetemplate {
    isPopupOpen: boolean,
    closePopup: () => void;
    setDelete:()=> void;
    loading?:boolean
}

const DeleteTemplate = ({ isPopupOpen, closePopup,setDelete,loading }: deletetemplate) => {
    return (
        <>
            <Modal className='bg-[#E5EFFF]  p-5' isOpen={isPopupOpen} onClose={closePopup}>
                <div className="max-w-[500px] w-full">
                        <h2 className='text-base md:text-xl leading-7 font-semibold open_sans text-subheading capitalize' >are you sure you want to delete this template</h2>
                        <div className='flex gap-x-2 pt-3' >
                            <Button disabled={loading} loadingbtn={loading} onClick={setDelete} className='py-2' >{loading ? "" : "yes"}</Button>
                            <Button onClick={closePopup} className='py-2' >no</Button>
                        </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteTemplate 