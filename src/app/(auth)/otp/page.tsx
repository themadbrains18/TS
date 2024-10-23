import Icon from '@/components/Icon';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import InputOtp from './components/Inputotp';

const Otp = () => {

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
            <div className="md:pt-20 pt-10 pb-10 px-4  w-full bg-[#FDFCFF]">
                <div className='max-w-[599px] m-auto ' >
                    <h2 className="text-[22px] tab:text-[36px] font-bold leading-[44px]  pb-[30px] md:pb-[60px]">Forgot Password</h2>
                    <Link className='flex gap-[7px] items-center  pb-[30px] md:pb-[60px]' href={"/login"} >
                        <Icon name='iconleft' />
                        <h2 className="text-[18px] font-bold leading-7 text-primary -900">Back To Log In</h2>
                    </Link>
                    <div className="flex flex-col justify-center  h-[500px] md:h-[653px]">
                        <div>
                            <h2 className='text-[18px] font-normal leading-7 text-neutral-900 pb-[30px]' >Please enter one time OTP</h2>
                            <InputOtp />
                        </div>
                        <div className='my-10 md:my-[60px]'>
                            <p className='text-sm leading-5 text-neutral-600'>Please check your mobile, 6-digit confirmation code to (+1234567890), please enter the confirmation code to verify it&apos;s you.</p>
                        </div>
                        {/* Send OTP  Button */}
                        <div className=' mb-[60px] ' >
                            <Button className="w-full items-center  justify-center" variant="primary">
                                Verify Now
                            </Button>
                        </div>

                        <h3 className='text-center text-[14px] leading-5 font-normal text-neutral-600' >
                            Resend OTP After (04:20)
                            <button className='ml-3 text-action-900  ' >Resend Code</button>
                        </h3>

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

export default Otp;
