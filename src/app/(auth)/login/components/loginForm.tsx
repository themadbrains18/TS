"use client";
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { loginSchema } from '@/validations/loginValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import CheckBox from '@/components/ui/checkbox';
import useFetch from '@/hooks/useFetch';
import Otp from "../../otp/page"
import {  useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const LoginForm = () => {
    const { data: session, status } = useSession(); 
    const router = useRouter(); 

    const [isChecked1, setIsChecked1] = useState(false); 
    const [otpPath, setOtppath] = useState(false); 
    const [formData, setFormData] = useState({}); 

    /**
     * Interface to define structure of form values
     */
    interface FormValues {
        email: string; 
        password: string; 
    }

    /**
     * React Hook Form setup with Zod validation
     */
    const { control, reset, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(loginSchema),
    });

    /**
     * Interface to define structure of API response
     */
    interface ApiResponse {
        otp: string; 
        success: boolean; 
    }

    /**
     * Fetch hook to handle API requests for login
     */
    const { data: response, error, loading, fetchData } = useFetch<ApiResponse>();

    /**
     * Submit handler for the login form
     */
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setFormData(data); 
        // Make API request to login
        await fetchData("/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Reset the form upon successful login response
        if (response?.success) {
            reset();
        }
    };

    /**
     * Effect hook to manage redirection or OTP flow
     */
    useEffect(() => {
        if (response?.otp) {
            setOtppath(true); 
        }
        if (session) {
            router.push('/'); 
        }
    }, [response, session, router]);

    return (
        <>
            {
                otpPath ? (
                    <Otp formData={formData} api="login" setFormData={setFormData} /> 
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Section with Image and Text */}
                        <div className="bg-[url('/images/authsideimage.png')] lg:bg-[url('/images/authsideimage.png')] bg-no-repeat bg-cover h-[280px] lg:h-screen lg:sticky top-0 left-0 bottom-0">
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
                                <h2 className="text-[32px] md:text-[50px] xl:text-[62px] text-center lg:text-start font-normal pt-[30px] lg:pt-0 text-white lg:max-w-[700px] lg:m-auto">
                                    Free High-quality UI kits and design resources
                                </h2>
                                <p className="hidden lg:block ml-[70px] text-[14px] font-medium leading-5 text-white">
                                    By Madbrains Technologies LLP.
                                </p>
                            </div>
                        </div>

                        {/* Right Section with Form */}
                        <div className="md:pt-20 pt-10 pb-10 px-4 w-full bg-[#FDFCFF]">
                            <div className="max-w-[599px] m-auto flex flex-col">
                                <h2 className="text-[22px] tab:text-[36px] font-bold leading-[44px] pb-[30px] md:pb-[60px]">Hi, Welcome Back!</h2>
                                <div className="flex flex-col justify-center h-[759px]">
                                    {/* Login Form */}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="md:space-y-[30px] space-y-[15px]">
                                            {/* Email Input */}
                                            <Controller
                                                name="email"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type="email"
                                                        placeholder="Your Details"
                                                        label="Email"
                                                        className="placeholder:text-neutral-400 py-3 md:py-[18px] px-5 bg-divider-100"
                                                        error={errors.email?.message}
                                                    />
                                                )}
                                            />

                                            {/* Password Input */}
                                            <Controller
                                                name="password"
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type={isChecked1 ? "text" : "password"}
                                                        placeholder="Password"
                                                        label="Password"
                                                        className="placeholder:text-neutral-400 py-3 md:py-[18px] px-5 bg-divider-100"
                                                        error={errors.password?.message}
                                                    />
                                                )}
                                            />

                                            {/* Show Password Checkbox */}
                                            <CheckBox
                                                id="checkbox1"
                                                label="Show Password"
                                                checked={isChecked1}
                                                onChange={() => setIsChecked1(!isChecked1)}
                                                labelPosition="left"
                                                customClass="my-custom-checkbox"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <div className="my-[60px]">
                                            <Button disabled={loading ? true : false} loadingbtn={loading ? true : false} variant='primary' className='w-full items-center justify-center' type='submit' iconClass='w-7 h-7'>
                                                {
                                                    loading ? "" : "Login"
                                                }
                                            </Button>
                                            {/* Error message display (commented out) */}
                                            {/* {error && <p className="text-red-500 mt-2">Failed to login. Please try again.</p>} */}

                                            {/* Forgot Password Link */}
                                            <div className="text-end pt-5">
                                                <Link href={'/forgot-password'} className="text-[16px] font-semibold leading-6 text-subparagraph">
                                                    Forgot Password?
                                                </Link>
                                            </div>
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
                    </div>
                )}
        </>
    );
};

export default LoginForm;