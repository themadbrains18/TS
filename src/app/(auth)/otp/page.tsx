"use client";

import Icon from '@/components/Icon';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import InputOtp from './components/Inputotp';
import NewPassword from '../new-password/page';
import { signIn, useSession } from 'next-auth/react';

interface FormData {
    otp: string[];  // OTP should be an array of strings if you have multiple inputs
}

const Otp = ({ formData, api, setFormData }: any) => {
    const [path, setPath] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm<FormData>();
    const { data: response, error, loading, fetchData } = useFetch<any>();
    const { data: session } = useSession()
    const [startTimer, setStartTimer] = useState(60); // Timer set to 10 minutes (600 seconds)
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        // Declare timer variable
        let timer: NodeJS.Timeout | null = null;

        if (startTimer > 0) {
            timer = setInterval(() => {
                setStartTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true); // Allow resending OTP after 10 minutes
        }

        return () => {
            if (timer) {
                clearInterval(timer); // Clear the timer on unmount
            }
        };
    }, [startTimer]);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            formData.otp = data.otp.join('');  // Join array into a single string
            setFormData(formData);

            if (api === "login") {
                const result = await signIn('credentials', {
                    redirect: false,
                    email: formData.email,
                    otp: formData.otp,
                    password: formData.password
                });
                console.log(result,"==result");
                
                if (result?.ok) {
                    router.push('/');
                }
                else{
                    toast.error("Invalid or expire otp")
                }
            } else {
                await fetchData(`/${api}`, {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (err) {
            toast.error("Submission error");
        }
    };

    const resendCode = async () => {
        if (!canResend) return; // Prevent resend if the timer has not completed

        try {
            await fetch(`${process.env.NEXT_PUBLIC_APIURL}/resend-otp`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: session?.token ? `Bearer ${session?.token}` : "",
                }
            }).then(res => {
                if (res.ok) {
                    setStartTimer(60); // Reset timer to 10 minutes
                    setCanResend(false); // Reset resend availability
                    toast.success("OTP resent successfully");
                } else {
                    toast.error("Failed to resend OTP");
                }
            });
        } catch (error) {
            console.log(error, "==error");
        }
    };

    useEffect(() => {

        
        if (response && api === "login") {
            signIn('credentials', response?.results?.data);
        }
        if (response && api === "register") {
            router.push('/login');
        }
        if (response?.otp) {
            setPath(true);
        }
        if (error) {
            toast.error("Invalid OTP");
        }
    }, [response,error]);

    return (
        <>
            {path ? (
                <NewPassword formdata={formData} />
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
                            <h2 className="text-[32px] md:text-[50px] xl:text-[62px] text-center lg:text-start font-normal pt-[30px] lg:pt-0 text-white lg:max-w-[700px] lg:m-auto">
                                Free High-quality UI kits and design resources
                            </h2>
                            <p className="hidden lg:block ml-[70px] text-[14px] font-medium leading-5 text-white">
                                By Madbrains Technologies LLP.
                            </p>
                        </div>
                    </div>

                    {/* Right Section */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="md:pt-20 pt-10 pb-10 px-4 w-full bg-[#FDFCFF]">
                            <div className='max-w-[599px] m-auto'>
                                <h2 className="text-[22px] tab:text-[36px] font-bold leading-[44px] pb-[30px] md:pb-[60px]">Forgot Password</h2>
                                <Link className='flex gap-[7px] items-center pb-[30px] md:pb-[60px]' href={"/login"}>
                                    <Icon name='iconleft' />
                                    <h2 className="text-[18px] font-bold leading-7 text-primary-900">Back To Log In</h2>
                                </Link>

                                <div className="flex flex-col justify-center h-[500px] md:h-[653px]">
                                    <div>
                                        <h2 className='text-[18px] font-normal leading-7 text-neutral-900 pb-[30px]'>Please enter one-time OTP</h2>
                                        <InputOtp setValue={setValue} register={register} reset={resendCode}/>
                                    </div>
                                    <div className='my-10 md:my-[60px]'>
                                        <p className='text-sm leading-5 text-neutral-600'>Please check your email, 6-digit confirmation code sent to {formData.email}, please enter the confirmation code to verify it's you.</p>
                                    </div>


                                    <div className='mb-[60px]'>
                                            {
                                                loading ? <Button disabled type='submit' loadingbtn={true} iconClass='w-7 h-7' variant='primary' className='w-full items-center justify-center' hideChild='hidden' >
                                                  
                                                </Button> : <Button type='submit' variant='primary' className='w-full items-center justify-center' >
                                                    Verify Now
                                                </Button>
                                            }
                                        </div>
                                    {startTimer > 0 ? (
                                        <h3 className='text-center text-[14px] leading-5 font-normal text-neutral-600'>
                                            Resend OTP in {Math.floor(startTimer / 60)}:{(startTimer % 60).toString().padStart(2, '0')}
                                        </h3>
                                    ) : (
                                        <h3 className='text-center text-[14px] leading-5 font-normal text-neutral-600'>
                                            <button className='text-action-900' type='button' onClick={resendCode}>Resend Code</button>
                                        </h3>
                                    )}
                                </div>

                                <h3 className="text-[16px] font-normal leading-6 text-textparagraph pt-[30px] md:pt-[60px]">
                                    Not a member yet?{' '}
                                    <Link href={"/register"} className="text-textheading font-semibold">Register Now</Link>
                                </h3>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Otp;
