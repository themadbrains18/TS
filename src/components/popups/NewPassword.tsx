"use client"
import React, { Fragment, useEffect, useState } from 'react'
import Button from '../ui/Button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useFetch from '@/hooks/useFetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { newChangePassword } from '@/validations/NewPassword';
import Input from '../ui/Input';
import { signOut } from 'next-auth/react';
import CheckBox from '../ui/checkbox';

interface newpasswordpopup {
    formData?: {
        email?: string;
        currentEmail?: string
    }
    otp?: boolean;
}

interface FormValues {
    newPassword: string,
    confirmPassword: string,
}

const NewPassword = ({ formData, otp }: newpasswordpopup) => {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isLoading , setisLoading] = useState(false);

    const { data: response, error, loading, fetchData } = useFetch<FormValues>();

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(newChangePassword)
    });

    /**
     * onSubmit function handles form submission.
     * It sends a POST request to reset the user's password.
     * 
     * @param data - The form data submitted by the user, which includes the new password, confirmation password, email, and OTP.
     */
    const onSubmit: SubmitHandler<FormValues> = async (data) => {

        try {
            setisLoading(true)
            const result = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword,
                    email: formData?.currentEmail,
                    otp: otp
                }),
            });

            if (result.ok) {
                const res = await result.json();
                signOut()

                // Handle success (e.g., display a success message)
            } else {
                console.error("Failed to reset password:", result.statusText);
                setisLoading(false)
                // Handle failure (e.g., display an error message)
            }
        } catch (error) {   
            console.error("Error during password reset:", error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='  md:space-y-[30px] space-y-[15px] ' >
                    <Controller
                        name='newPassword'
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type={isChecked1 ? "text" : "password"}
                                placeholder="New Password"
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
                                placeholder="Confirm Password"
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

                    <Button
                        disabled={isLoading}
                        type='submit'
                        loadingbtn={isLoading}
                        iconClass='w-7 h-7'
                        variant='primary'
                        className='w-full items-center justify-center'
                    >
                        {isLoading ? "" : "save"}
                    </Button>
                </div>
            </form>

        </>
    )
}
export default NewPassword
