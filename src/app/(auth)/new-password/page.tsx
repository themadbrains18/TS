"use client";

import Button from '@/components/ui/Button';
import CheckBox from '@/components/ui/checkbox';
import Input from '@/components/ui/Input';
import useFetch from '@/hooks/useFetch';
import { newChangePassword } from '@/validations/NewPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const NewPassword = ({ formdata }: any) => {
    const router = useRouter();
    const [isChecked1, setIsChecked1] = useState(false);

    /**
     *  Interface defining the form values
     */
    interface FormValues {
        newPassword: string;
        confirmPassword: string;
        otp: string;
        success: boolean;
    }

    /**
     * Fetch hook to handle API request
     */
    const { data: response, loading, fetchData } = useFetch<FormValues>();

    /**
     * React hook form setup with validation using zod
     */
    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(newChangePassword),
    });

    /**
     * 
     * Submit handler for form data
     */
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        formdata.newPassword = data.newPassword;
        formdata.confirmPassword = data.confirmPassword;

        try {
            await fetchData(`/reset-password`, {
                method: "POST",
                body: JSON.stringify(formdata),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );

            // Redirect to login page if the password reset is successful
        } catch (err) {
            console.log(err)
           
        }
    };
    useEffect(() => {
        if (response) {
            router.push('/login')
        }
    }, [response])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
            {/* Left Section with Image and Text */}
            <div className=" bg-[url('/images/authsideimage.png')] lg:bg-[url('/images/authsideimage.png')] bg-no-repeat bg-cover h-[280px] lg:h-screen lg:sticky top-0 left-0 bottom-0 ">
                <div className=" py-[30px] px-5 lg:p-[30px] lg:h-screen flex  items-center lg:items-start  justify-between flex-col ">
                    <Link href={'/'}>
                        <Image
                            className=" lg:ml-[70px]"
                            src={'/images/Logowhite.png'}
                            alt="Madbrains Logo"
                            width={276}
                            height={40}
                        />
                    </Link>
                    <h2 className=" text-[32px] md:text-[50px] xl:text-[62px] text-center lg:text-start font-normal pt-[30px] lg:pt-0 text-white lg:max-w-[700px] lg:m-auto ">
                        Free High-quality UI kits and design resources
                    </h2>
                    <p className=" hidden lg:block ml-[70px] text-[14px] font-medium leading-5 text-white">
                        By Madbrains Technologies LLP.
                    </p>
                </div>
            </div>

            {/* Right Section with Form */}
            <div className="md:pt-20 pt-10 pb-10 px-4  w-full bg-[#FDFCFF]">
                <div className='max-w-[599px] m-auto flex flex-col ' >
                    <h2 className="text-[22px] tab:text-[36px] font-bold leading-[44px]  pb-[30px] md:pb-[60px]">Enter New Password</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-col justify-center h-[559px] md:h-[759px]">
                            <div className='  md:space-y-[30px] space-y-[15px] ' >
                                {/* Input fields for new password and confirm password */}
                                <Controller
                                    name='newPassword'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type={isChecked1 ? "text" : "password"} // Toggle between password visibility
                                            placeholder="Email or Phone"
                                            label="Password"
                                            className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100"
                                            error={errors.newPassword?.message} // Display validation error
                                        />
                                    )}
                                />
                                <Controller
                                    name='confirmPassword'
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type={isChecked1 ? "text" : "password"} // Toggle between password visibility
                                            placeholder="Your Password Again"
                                            label="Confirm Password"
                                            className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100"
                                            error={errors.confirmPassword?.message} // Display validation error
                                        />
                                    )}
                                />
                                {/* Checkbox for showing password */}
                                <CheckBox
                                    id="checkbox1"
                                    label="Show Password"
                                    checked={isChecked1}
                                    onChange={() => setIsChecked1(!isChecked1)} // Toggle password visibility
                                    labelPosition="left"
                                    customClass="my-custom-checkbox"
                                />
                            </div>

                            {/* Password reminder */}
                            <h2 className='text-[14px] font-normal leading-5 text-neutral-600  pt-[60px] ' >New Password Must Be Different From Previous Used Password.</h2>

                            {/* Submit Button */}
                            <div className='my-[60px]' >
                                <Button disabled={loading ? true : false} loadingbtn={loading ? true : false} variant='primary' className='w-full items-center justify-center' type='submit' iconClass='w-7 h-7'>
                                    {
                                        loading ? "" : "Save New Password" // Button text changes based on loading state
                                    }
                                </Button>
                            </div>
                        </div>
                    </form>

                    {/* Registration prompt */}
                    <h3 className="text-[16px] font-normal leading-6 text-textparagraph pt-[30px] ">
                        Not a member yet?{' '}
                        <Link href={"/register"} className="text-textheading font-semibold">Register Now</Link>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default NewPassword;
