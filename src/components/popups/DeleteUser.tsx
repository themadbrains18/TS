"use client"

import React, { Fragment } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Icon from '../Icon';

interface deleteuserpopup {
    isPopupOpen: boolean,
    closePopup: () => void;
    deleteAccount: () => void;
    loading?: boolean
}

const DeleteUser = ({ isPopupOpen, closePopup, deleteAccount, loading }: deleteuserpopup) => {
    return (
        <>
            <Modal className='bg-[#E5EFFF] relative' isOpen={isPopupOpen} onClose={closePopup}>
                <Icon onClick={closePopup} name='crossicon' className='absolute top-5 right-5 fill-[#5D5775] w-5 h-5 cursor-pointer z-50' />
                <div className="max-w-[500px] w-full pt-6 relative px-4 py-9 sm:py-10 sm:px-10  bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF]">
                    <h2 className='text-base md:text-xl leading-7 font-semibold open_sans text-subheading capitalize' >are you sure you want Delete Your Account</h2>
                    <div className='flex gap-x-2 pt-3' >
                        <Button onClick={deleteAccount} className='py-2' loadingbtn={loading ? true : false} disabled={loading ? true : false} >{loading ? "" : "Yes"}</Button>
                        <Button onClick={closePopup} className='py-2' >No</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteUser 