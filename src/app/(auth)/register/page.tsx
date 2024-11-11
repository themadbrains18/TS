'use client';

import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { signupSchema } from '@/validations/signUp.validation';
import Link from 'next/link';
import Image from 'next/image';
import useFetch from '@/hooks/useFetch';
import 'react-toastify/dist/ReactToastify.css';
import CheckBox from '@/components/ui/checkbox';
import Otp from '../otp/page';

// Define FormData interface
interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ApiResponse {
    otp: string;
    success: boolean;
}
const Page = () => {

    const [isChecked1, setIsChecked1] = useState(false);
    const [otpPath, setOtppath] = useState(false);
    const [formData, setFormData] = useState({})

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(signupSchema)
    });

    const { data: response, loading, fetchData } = useFetch<ApiResponse>();

    /*
     * Handles form submission for user registration.
     */
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setFormData(data)
        await fetchData("/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };



    const backstate = () => {
        setOtppath(false)
    }

    useEffect(() => {
        if (response?.otp) {
            setOtppath(true)
        }
    }, [response]);


    return (
        <>
            {
                otpPath ? (

                    <Otp
                        backstate={backstate}
                        prevRouteName={"Register"}
                        prevRoute={'/register'}
                        tittle={'Register With OTP'}
                        formData={formData}
                        api="register"
                        setFormData={setFormData}
                        setOtppath={setOtppath}
                    />

                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Section */}
                        <div className="bg-[url('/images/authsideimage.png')] bg-no-repeat bg-cover h-[280px] lg:h-screen lg:sticky top-0 left-0 bottom-0">
                            <div className="py-[30px] px-5 lg:p-[30px] lg:h-screen flex items-center lg:items-start justify-between flex-col">
                                <Link href={'/'}>
                                    <Image
                                        className="lg:ml-[70px]"
                                        src={'/images/Logowhite.png'}
                                        alt="Madbrains Logo"
                                        width={276}
                                        height={40}
                                    />
                                </Link>
                                <h2 className="text-[32px] md:text-[50px] xl:text-[62px] text-center lg:text-start font-normal pt-[30px] lg:pt-0 text-white lg:px-[70px] lg:max-w-[700px] lg:m-auto">
                                    Free High-quality UI kits and design resources
                                </h2>
                                <p className="hidden lg:block ml-[70px] text-[14px] font-medium leading-5 text-white">
                                    By Madbrains Technologies LLP.
                                </p>
                            </div>
                        </div>

                        {/* Right Section with Form */}
                        <div className="md:pt-20 pt-10 pb-10 px-4 w-full bg-[#FDFCFF]">
                            <div className="max-w-[599px] m-auto">
                                <h2 className="text-[22px] tab:text-[36px] font-bold leading-[44px] tab:pb-[30px] md:pb-[60px]">Register Here!</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center h-[759px]">
                                    {/* Name Input */}
                                    <div className="md:space-y-[30px] space-y-[15px]">
                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Name"
                                                    label="Name"
                                                    error={errors.name?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="email"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    placeholder="Email"
                                                    label="Email"
                                                    error={errors.email?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="password"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type={isChecked1 ? "text" : "password"}
                                                    placeholder="Password"
                                                    label="Password"
                                                    error={errors.password?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name="confirmPassword"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type={isChecked1 ? "text" : "password"}
                                                    placeholder="Confirm Password"
                                                    label="Confirm Password"
                                                    error={errors.confirmPassword?.message}
                                                />
                                            )}
                                        />
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
                                    <div className="my-[30px] tab:my-[60px]">
                                        <Button disabled={loading ? true : false} loadingbtn={loading ? true : false} variant='primary' className='w-full items-center justify-center' type='submit' iconClass='w-7 h-7'>
                                            {
                                                loading ? "" : "Create Account"
                                            }
                                        </Button>
                                        <div className="text-end pt-5">
                                            <Link href={'/forgot-password'} className="text-[16px] font-semibold leading-6 text-subparagraph">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <div className=" mt-[60px] py-[6px]">
                                            <p className='text-[16px] font-normal leading-6 text-textparagraph'>Already Have Account ?   <Link href={'/login'} className="text-textheading font-semibold">
                                                Login
                                            </Link></p>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default Page;
