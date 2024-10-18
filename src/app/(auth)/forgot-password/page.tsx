"use client";

import Icon from '@/components/Icon';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { forgotPassword } from '@/validations/ForgotPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const Page = () => {

    interface FormValues {
        email: string;
    }

    const { register, reset, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(forgotPassword)
    });

    console.log(errors);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        reset();
    };


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
                    <h2 className="text-[32px] md:text-[50px] xl:text-[62px] text-center lg:text-start font-normal pt-[30px] lg:pt-0 text-white lg:max-w-[700px] lg:m-auto ">
                        Free High-quality UI kits and design resources
                    </h2>
                    <p className=" hidden lg:block ml-[70px] text-[14px] font-medium leading-5 text-white">
                        By Madbrains Technologies LLP.
                    </p>
                </div>
            </div>

            {/* Right Section with Form */}
            <div className="md:pt-20 pt-10 pb-10 px-4  w-full bg-[#FDFCFF]">
                <div className='max-w-[599px] m-auto ' >
                    <h2 className="text-[22px] tab:text-[36px] font-bold leading-[44px]  pb-[30px] md:pb-[60px]">Forgot Password</h2>
                    <Link className='flex gap-[7px] items-center  pb-[30px] md:pb-[60px]' href={"/login"} >
                        <Icon name='iconleft' />
                        <h2 className="text-[18px] font-bold leading-7 text-primary-900">Back To Log In</h2>
                    </Link>
                    <div className="flex flex-col justify-center h-[653px]">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className='md:space-y-[30px] space-y-[15px]'>
                                {/*  Input Email or Phone */}
                                <Input
                                    register={register}
                                    name='email'
                                    placeholder="Email or Phone"
                                    label=" Your Details"
                                    className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100"
                                />
                            </div>
                            {/* Send OTP  Button */}
                            <div className='my-[60px]' >
                                <Button type='submit' className="w-full items-center justify-center" variant="primary">
                                    Send OTP
                                </Button>
                            </div>
                        </form>
                        {/* Social Media Buttons */}
                        <div className="flex flex-col lg:flex-row gap-[15px] items-center">
                            <button
                                aria-label="Sign in with Google"
                                className="px-6 py-[10px] flex items-center border border-divider-100 justify-center lg:max-w-[189px] w-full gap-[10px]"
                            >
                                <Icon name="goggle" />
                                <h2 className="text-[16px] font-normal leading-6 text-action-900">Google</h2>
                            </button>
                            <button
                                aria-label="Sign in with Facebook"
                                className="px-6 py-[10px] flex items-center border border-divider-100 justify-center lg:max-w-[189px] w-full gap-[10px]"
                            >
                                <Icon name="facebook" />
                                <h2 className="text-[16px] font-normal leading-6 text-action-900">Facebook</h2>
                            </button>
                            <button
                                aria-label="Sign in with Twitter"
                                className="px-6 py-[10px] flex items-center border border-divider-100 justify-center lg:max-w-[189px] w-full gap-[10px]"
                            >
                                <Icon name="twitter" />
                                <h2 className="text-[16px] font-normal leading-6 text-action-900">Twitter</h2>
                            </button>
                        </div>
                    </div>
                    {/* Registration Prompt */}
                    <h3 className="text-[16px] font-normal leading-6 text-textparagraph pt-[30px] md:pt-[60px]">
                        Not a member yet?{' '}
                        <Link href={"/register"} className="text-textheading font-semibold">Register Now</Link>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Page;
