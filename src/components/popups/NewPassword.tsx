"use client"

import React, { Fragment, useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Icon from '../Icon';
import CheckBox from '../ui/checkbox';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useFetch from '@/hooks/useFetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { newChangePassword } from '@/validations/NewPassword';
import Input from '../ui/Input';

interface newpasswordpopup {
    isPopupOpen: boolean,
    closePopup: () => void;
}


const NewPassword = ({ isPopupOpen, closePopup }: newpasswordpopup) => {
    const [isChecked1, setIsChecked1] = useState(false);
    interface FormValues {
        newPassword: string,
        confirmPassword: string,
        otp: string,
        success: boolean
    }

    const { data: response, error, loading, fetchData } = useFetch<FormValues>();


    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(newChangePassword)
    });


    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        console.log(data)
    };

    return (
        <>
            <Modal className='bg-[#E5EFFF]  relative max-w-[616px]' isOpen={isPopupOpen} onClose={closePopup}>
                <div className=' p-5 tab:py-[30px] tab:px-10'>
                    <Icon onClick={closePopup} name='crossicon' className='absolute top-5 right-5  fill-[#5D5775] w-5 h-5' />
                    <div className="max-w-[616px] w-full bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF] py-[50px]">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='  md:space-y-[30px] space-y-[15px] ' >
                                <Controller
                                    name='newPassword'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type={isChecked1 ? "text" : "password"}
                                            placeholder="Email or Phone"
                                            label=" Password"
                                            className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100"
                                            error={errors.newPassword?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name='confirmPassword'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type={isChecked1 ? "text" : "password"}
                                            placeholder="Your Password Again"
                                            label=" Confirm Password"
                                            className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100 w-full"
                                            error={errors.confirmPassword?.message}
                                        />
                                    )}
                                />
                                {/* Checkbox to Toggle Password Visibility */}
                                <CheckBox
                                    id="checkbox1"
                                    label="Show Password"
                                    checked={isChecked1}
                                    onChange={() => setIsChecked1(!isChecked1)}
                                    labelPosition="left"
                                    customClass="my-custom-checkbox"
                                />
                            </div>
                            {/* Register Button */}
                            <div className='mt-6' >
                                {
                                    loading ? <Button disabled type='submit' loadingbtn={true} iconClass='w-7 h-7' variant='primary' className='w-full items-center justify-center' hideChild='hidden'  >

                                    </Button> : <Button type='submit' variant='primary' className='w-full items-center justify-center' >
                                        Save
                                    </Button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default NewPassword 