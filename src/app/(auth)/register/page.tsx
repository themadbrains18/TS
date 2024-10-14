"use client";
import Icon from '@/components/Icon';
import Button from '@/components/ui/Button';
import CheckBox from '@/components/ui/checkbox';
// import CheckBox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { ValidFieldNames } from '@/types/type';
import FormField from './components/FormField';

export const UserSchema: ZodType<FormData> = z
    .object({
        name: z.string(),
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password is too short" })
            .max(20, { message: "Password is too long" }),
    })
    .refine((data) => data.password === data?.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // path of error
    });

const Page = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(UserSchema), 
    });

    const [isChecked1, setIsChecked1] = useState(false);

    const onSubmit = async (data: FormData) => {
        try {
            console.log(data,"========data");
            
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/register`, data); 
            const { errors = {} } = response.data; 

            const fieldErrorMapping: Record<string, ValidFieldNames> = {
                name:'name',
                email: "email",
                password: "password",
            };

            const fieldWithError = Object.keys(fieldErrorMapping).find(
                (field) => errors[field]
            );

            if (fieldWithError) {
                setError(fieldErrorMapping[fieldWithError], {
                    type: "server",
                    message: errors[fieldWithError],
                });
            }
        } catch (error) {
            alert("Submitting form failed!");
        }
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
                    <h2 className="text-[32px] md:text-[50px] xl:text-[62px] text-center lg:text-start font-normal pt-[30px] lg:pt-0 text-white lg:max-w-[700px] lg:m-auto">
                        Free High-quality UI kits and design resources
                    </h2>
                    <p className=" hidden lg:block ml-[70px] text-[14px] font-medium leading-5 text-white">
                        By Madbrains Technologies LLP.
                    </p>
                </div>
            </div>

            {/* Right Section with Form */}
            <div className="md:pt-20 pt-10 pb-10 px-4  w-full bg-[#FDFCFF] ">
                <div className='max-w-[599px] m-auto ' >
                    <h2 className="text-[22px] tab:text-[36px] font-bold leading-[44px]  tab:pb-[30px] md:pb-[60px]">Register Here!</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center h-[759px]">
                        {/* Name Input */}
                        <div className='md:space-y-[30px] space-y-[15px] ' >

                            {/*  Input name */}

                            {/* <Input
                                placeholder="Name"
                                label="Name"
                                name='name'
                                error={errors.password}
                                className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100"
                            /> */}

                            <FormField
                                type="text"
                                placeholder="Name"
                                name="name"
                                register={register}
                                error={errors?.name}
                            />
                            <FormField
                                type="email"
                                placeholder="Email"
                                name="email"
                                register={register}
                                error={errors?.email}
                            />
                            <FormField
                                type="password"
                                placeholder="Password"
                                name="password"
                                register={register}
                                error={errors?.password}
                            />


                            {/* <Input
                                placeholder="Your Details"
                                label="Email or Phone"
                                name='email'
                                className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100"
                            />

                            <Input
                                type={isChecked1 ? "text" : "password"}
                                placeholder="Password"
                                name='password'
                                label="Password"
                                className=" placeholder:text-neutral-400 py-3 md:py-[18px] px-5 bg-divider-100"
                            /> */}

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
                        <div className='my-[30px] tab:my-[60px]' >
                            <Button className="w-full items-center justify-center" type="submit"  variant="primary">
                                Create Account
                            </Button>
                            {/* Forgot Password Link */}
                            <div className="text-end pt-5">
                                <Link href={'/forgot-password'} className="text-[16px] font-semibold leading-6 text-subparagraph">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

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

                    </form>
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
