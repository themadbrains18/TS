import Button from '@/components/ui/Button'
import Image from 'next/image'
import React from 'react'
import profileimage from '@/../public/images/profileimage.png'
import Input from '@/components/ui/Input'
const Profile = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className='max-w-[1162px] w-full'>
                        <div className='max-w-[616px] w-full mb-[50px]'>
                            <h2 className='py-1 text-subheading text-[28px] font-bold leading-9 capitalize mb-5'>Profile details</h2>
                            <div className='pt-[30px] flex items-end justify-between'>
                                <div className='relative max-w-[168px] w-full'>
                                    <Image src={profileimage} height={168} width={168} alt='userimage' />
                                    <Button className='absolute bottom-0 left-2 right-2' variant='basic'>change image</Button>

                                </div>
                                <Button variant='basic'>Remove</Button>
                            </div>
                            <div className='mt-5 flex flex-col gap-y-[30px]'>
                                <Input label='Name' placeholder='Name' name='name' type='text' />
                                <Input label='UserName' placeholder='UserName' name='name' type='text' />
                                <Input label='Email' placeholder='Email' name='email' type='email' />
                                <div className='py-[18px] px-5 border border-divider-100 flex items-center justify-between'>
                                    <h3 className='text-neutral-900 font-semibold capitalize leading-6'>Daily Download Balance :</h3>
                                    <p className='text-neutral-900 font-semibold capitalize leading-6'>3</p>
                                </div>
                            </div>
                        </div>
                        <div className='py-[50px] border-y border-[#D9D9D9] flex items-end justify-between'>
                            <div>
                                <h3 className='text-subheading text-[28px] font-bold leading-9'>Password</h3>
                                <div className='mt-5'>
                                    <p className='text-lg font-semibold leading-7 text-textparagraph'>Update your password through the button below</p>
                                    <p className='text-base  font-normal leading-6 text-textparagraph'>You will be redirected to a new page and must follow the instructions</p>
                                </div>
                            </div>
                            <Button className='py-[13px] text-lg' variant='secondary'>Set new password</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile