import React, { FC } from 'react'
import Modal from '../ui/Modal'
import { verifyoldemail } from '@/types/type'
import Input from '../ui/Input'
import Button from '../ui/Button'
import InputOtp from '@/app/(auth)/otp/components/Inputotp'
import { SubmitHandler, useForm } from 'react-hook-form'
import Icon from '../Icon'
interface FormData {
    otp: String[]
}
const VerfiyOldEmail: FC<verifyoldemail> = ({
    closePopup, isPopupOpen
}) => {

    const { register, handleSubmit, setValue } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data)
    }
    return (
        <>
            <Modal isOpen={isPopupOpen} onClose={closePopup}>
                <div className='relative px-4 py-9 sm:py-[30px] sm:px-10 max-w-[616px] bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF]'>
                    <Icon onClick={() => closePopup()} className='absolute top-5 right-5 fill-[#5D5775] w-5 h-5 cursor-pointer z-50' name="crossicon" />
                    <div className='py-[50px]'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex justify-between items-end gap-x-[10px] sm:gap-x-5'>
                                <Input register={register} label='Current Email*' name='email' placeholder='Enter current email' />
                                <Button type='submit' className='text-nowrap py-[13px] px-[10px] text-sm sm:text-lg font-normal leading-6'>Send OTP</Button>
                            </div>
                        </form>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mt-[30px] sm:mt-[60px]'>
                                <label className='text-lg font-normal leading-7 text-neutral-900'>Please enter one time OTP</label>
                                <InputOtp className='space-x-[10px] sm:space-x-[30px] m-[10px] sm:m-[15px]' register={register} setValue={setValue} />
                                <p className='mt-5 text-xs sm:text-sm font-normal leading-5 sm:leading-6 text-[#4B5563]'>Please check your mail, 6-digit confirmation code to (+1234567890), please enter the confirmation code to verify it's you.</p>
                                <div className='mt-[30px] sm:mt-[60px]'>
                                    <Button className='w-full justify-center py-2 sm:py-[13px] text-lg font-normal leading-6' type='submit' variant='primary'>verify now</Button>
                                    <Button className='w-full justify-center bg-transparent border-transparent mt-4 py-2 sm:py-[13px] text-lg font-normal leading-6' variant='liquid'>Resend Code</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default VerfiyOldEmail