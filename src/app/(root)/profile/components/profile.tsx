'use state'

import Button from '@/components/ui/Button'
import Image from 'next/image'
import React, { useState } from 'react'
import profileimage from '@/../public/images/profileimage.png'
import Input from '@/components/ui/Input'
import Toggle from '@/components/ui/ToggleButton'
const Profile = () => {
    // Separate state for each button
    const [isNameActive, setIsNameActive] = useState<boolean>(false)
    const [isUsernameActive, setIsUsernameActive] = useState<boolean>(false)
    const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
    const [isNameDisabled, setIsNameDisabled] = useState<boolean>(true);
    const [isUserDisabled, setIsUserDisabled] = useState<boolean>(true);
    const [isEmailDisabled, setIsEmailDisabled] = useState<boolean>(true);
    return (
        <>
            <section>
                <div className="container">
                    <div className='max-w-[1162px] w-full'>
                        <div className='max-w-[616px] w-full mb-4 md:mb-[50px]'>
                            <h2 className='lg:py-1 text-subheading text-[28px] font-bold leading-9 capitalize mb-5'>Profile details</h2>
                            <div className='pt-10 '>

                                <div className=' flex items-end justify-between'>
                                    <div className='relative max-w-[115px] md:max-w-[168px] w-full'>
                                        <Image src={profileimage} height={168} width={168} alt='userimage' />
                                        <Button className='py-[5px] px-[14px] text-[11px] md:text-base md:py-2  absolute bottom-0 left-[6px] right-[6px] md:left-2  md:right-2 text-center' variant='basic'>change image</Button>

                                    </div>
                                    <Button className='py-[6px] px-5 text-sm md:text-base md:px-7 md:py-2' variant='basic'>Remove</Button>
                                </div>
                                <div className='mt-5 flex flex-col gap-y-4 lg:gap-y-[30px]'>
                                    <div className='flex items-end gap-x-[10px]'>
                                        <Input disabled={isNameDisabled} className='px-4 py-[13px] md:py-[13px]' label='Name' placeholder='Name' name='name' type='text' />
                                        {
                                            isNameActive ?
                                                <Button hideChild='hidden md:block' iconClass='w-6 h-6' direction='flex-row-reverse gap-x-[10px]' className='py-[13px] px-4 md:py-4 md:px-[14px]' onClick={() => {setIsNameActive(false) , setIsNameDisabled(!isNameDisabled)}
                                                 } variant='primary'  saveicon={true}>save</Button> :
                                                <Button hideChild='hidden md:block' direction='flex-row-reverse gap-x-[10px]' className='py-[13px] px-4 md:py-4 md:px-[14px]' onClick={() => {setIsNameActive(true), setIsNameDisabled(!isNameDisabled)}} variant='primary' iconClass='fill-white w-6 h-6' editicon={true}>edit</Button>
                                        }
                                    </div>

                                    <div className='flex items-end gap-x-[10px]'>
                                        <Input disabled={isUserDisabled} className='px-4 py-[13px] md:py-[13px]' label='UserName' placeholder='UserName' name='username' type='text' />
                                        {
                                            isUsernameActive ?
                                                <Button hideChild='hidden md:block' direction='flex-row-reverse gap-x-[10px]' className='py-[13px] px-4 md:py-4 md:px-[14px]' iconClass='w-6 h-6' onClick={() => {setIsUsernameActive(false),setIsUserDisabled(!isUserDisabled)}} variant='primary' saveicon={true}>save</Button> :
                                                <Button hideChild='hidden md:block' direction='flex-row-reverse gap-x-[10px]' className='py-[13px] px-4 md:py-4 md:px-[14px]' onClick={() => {setIsUsernameActive(true),setIsUserDisabled(!isUserDisabled)}} variant='primary' iconClass='fill-white w-6 h-6' editicon={true}>edit</Button>
                                        }
                                    </div>

                                    <div className='flex items-end gap-x-[10px]'>
                                        <Input disabled={isEmailDisabled} className='px-4 py-[13px] md:py-[13px]' label='Email' placeholder='Email' name='email' type='email' />
                                        {
                                            isEmailActive ?
                                                <Button hideChild='hidden md:block' iconClass='w-6 h-6' direction='flex-row-reverse gap-x-[10px]' className='py-[13px] px-4 md:py-4 md:px-[14px]' onClick={() => {setIsEmailActive(false),setIsEmailDisabled(!isEmailDisabled)}} variant='primary' saveicon={true}>save</Button> :
                                                <Button hideChild='hidden md:block' direction='flex-row-reverse gap-x-[10px]' className='py-[13px] px-4 md:py-4 md:px-[14px]' onClick={() => {setIsEmailActive(true),setIsEmailDisabled(!isEmailDisabled)}} variant='primary' iconClass='fill-white w-6 h-6' editicon={true}>edit</Button>
                                        }
                                    </div>

                                    <div className='py-[18px] px-5 border border-divider-100 flex items-center justify-between'>
                                        <h3 className='text-neutral-900 font-semibold capitalize leading-6'>Daily Download Balance :</h3>
                                        <p className='text-neutral-900 font-semibold capitalize leading-6'>3</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='py-4 md:py-[50px] border-y border-[#D9D9D9] flex flex-col md:flex-row items-start md:items-end justify-between'>
                            <div>
                                <h3 className='text-subheading text-[22px] md:text-[28px] font-bold leading-none md:leading-9'>Password</h3>
                                <div className='mt-[10px] md:mt-5'>
                                    <p className=' text-sm md:text-lg font-semibold leading-5 md:leading-7 text-textparagraph'>Update your password through the button below</p>
                                    <p className=' text-sm md:text-base  font-normal leading-5 md:leading-6 text-textparagraph'>You will be redirected to a new page and must follow the instructions</p>
                                </div>
                            </div>
                            <Button className='py-[13px] text-lg mt-5 md:mt-0 text-nowrap' link='/forgot-password' variant='secondary'>Set new password</Button>
                        </div>
                        <div className='py-4 md:py-[50px] border-b border-[#D9D9D9] flex items-end justify-between'>
                            <div>
                                <div className='flex justify-between items-center'>
                                    <h3 className='text-subheading text-[22px] md:text-[28px] font-bold leading-none md:leading-9'>Notifications</h3>
                                    <Toggle />
                                </div>
                                <p className='mt-[10px] md:mt-5 text-sm md:text-lg font-semibold leading-5 md:leading-7 text-textparagraph'>Receive newsletters, promotions and news from Freepik Company</p>
                                <p className='pt-1 md:pt-5 text-sm md:text-base  font-normal leading-5 md:leading-6 text-textparagraph max-w-[1106px]'>Freepik will process your data to send you information about our products and services, promotions, surveys, raffles, based on our legitimate interest, and updates from the creators you follow, if you have consented to this. Your data will not be disclosed to third parties. They will be communicated outside the EU under the terms of the <a href='#' className='text-primary-100'>privacy policy</a> . You can opt out of our notifications with the slider.<a href='#' className='text-primary-100'> More information</a></p>
                            </div>
                        </div>
                        <div className='max-w-[670px] mt-4 md:mt-[50px]'>
                            <Button className='py-[13px] text-lg px-[30px]' variant='secondary'>delete account</Button>
                            <p className='pt-5 text-textparagraph'><strong>Note:</strong> As you have an active paid plan, you can't delete your account directly. Please contact <a href="#" className='text-primary-100 '>support@freepik.com</a> for assistance </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile