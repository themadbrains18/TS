'use client'

import Button from '@/components/ui/Button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import profileimage from '@/../public/images/profileimage.png'
import Input from '@/components/ui/Input'
import Toggle from '@/components/ui/ToggleButton'
import VerfiyOldEmail from '@/components/popups/VerfiyOldEmail'
import useFetch from '@/hooks/useFetch'
import { Session } from 'next-auth'
import NewPassword from '@/components/popups/NewPassword'
import DeleteUser from '@/components/popups/DeleteUser'
import { METHODS } from 'http'
import { useDownload } from '@/app/contexts/DailyDownloadsContext'
// import { useDownload } from '@/app/contexts/DailyDownloadsContext'
import { UserDetail } from '@/types/type'
import NewPasswordProcess from '@/components/popups/NewPasswordProcess'
import { signOut } from 'next-auth/react'


interface sessionProps {
    session: Session,
    userData: UserDetail
}

const Profile: React.FC<sessionProps> = ({ session, userData }) => {

    // Separate state for each button
    const [isNameActive, setIsNameActive] = useState<boolean>(false)
    const [isUsernameActive, setIsUsernameActive] = useState<boolean>(false)
    const [isEmailActive, setIsEmailActive] = useState<boolean>(false);
    const [isNameDisabled, setIsNameDisabled] = useState<boolean>(true);
    const [isUserDisabled, setIsUserDisabled] = useState<boolean>(true);
    const [isEmailDisabled, setIsEmailDisabled] = useState<boolean>(true);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [profileImage, setProfileImage] = useState<any>(userData?.user?.profileImg || "/images/profileimage.png");
    const [name, setName] = useState(userData?.user ? userData?.user?.name : '');
    const [isDeletepopup, setisDeletepopup] = useState<boolean>(false);
    const [isDeleteUSer, setIsDeleteUser] = useState<boolean>(false);
    const [nameError, setNameeror] = useState<string>();
    const [number, setNumber] = useState(userData?.user ? userData?.user.number : '');
    const [phoneNumberError, setPhoneNumberError] = useState<string>();
    const { fetchDailyDownloads } = useDownload()

    const closePopup = () => {
        setIsPopupOpen(false);
        setisDeletepopup(false);
    }

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    console.log(userData, "==user data");

    const { data: response, error, loading, fetchData } = useFetch<any>();
    const { data: deleteUseracc, error: deleteerror, loading: deleteloading, fetchData: deleteuser } = useFetch<any>();
    const { data: updateData, error: updateError, loading: updateLoading, fetchData: updateFetchData } = useFetch<any>();
    const { data: updateNumberdata, error: updateNumbererror, loading: updateloadingNumber, fetchData: updateNumber } = useFetch<any>();
    const { data: updatePassworddata, error: updatePassworderror, loading: updateloadingPassword, fetchData: updatePassword } = useFetch<any>();



    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // Preview image
            const formData = new FormData();
            formData.append('profileImg', file);
            try {
                await fetchData("/user/update-image", {
                    method: "PUT",
                    body: formData,
                });
            } catch (error) {
                console.error("Error updating profile image:", error);
            }
        }
    };

    const fetchUserData = async () => {
        try {
            fetchData(`/get-user`);

        } catch (error) {
            console.log(error)
        }
    };

    const handleNameUpdate = async () => {
        try {
            if (name === "") {
                setNameeror("User Name Is Empty")
                return
            }
            if (name === userData?.user?.name) {
                setNameeror("This User Already Exists ")
                return
            }
            await updateFetchData('/update-details', {
                method: 'PUT',
                body: JSON.stringify({ name, id: userData?.user?.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setNameeror("")
            setIsNameActive(false);
            setIsNameDisabled(true);
        } catch (error) {
            console.error("Error updating name:", error);
        }
    };

    const handlePhonenumberUpdate = async () => {
        try {
            if (number === "") {
                setPhoneNumberError("Number Is Empty")
                return
            }

            if (number === userData?.user?.number) {
                setPhoneNumberError("This Number Is  Already Exists")
                return
            }

            await updateNumber('/update-details', {
                method: 'PUT',
                body: JSON.stringify({ number, id: session?.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setPhoneNumberError("")
        } catch (error) {
            console.error("Error updating number:", error);
        }
    };

    const handlepasswordUpdate = async () => {
        try {
            await updatePassword('/update-details', {
                method: 'PUT',
                body: JSON.stringify({ currentEmail: session.email, id: session?.id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    const deleteUser = async () => {
        try {
            await deleteuser(`/delete-account`, {
                method: "delete",
            }).then(()=>{
                signOut()
            })
        } catch (error) {
            console.log(deleteerror)
        }

    }

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {

        if (response) {
            //   console.log(response,"==response");

            fetchDailyDownloads()
            setProfileImage(response?.user?.profileImageUrl || response?.user?.profileImg || profileimage);
        }
    }, [response])


    // console.log(response,"==response");

    return (
        <>
            <section>
                <VerfiyOldEmail closePopup={() => closePopup()} isPopupOpen={isPopupOpen} handlepasswordUpdate={handlepasswordUpdate} />
                <NewPasswordProcess closePopup={() => closePopup()} isPopupOpen={isDeletepopup} />
                <DeleteUser isPopupOpen={isDeleteUSer} closePopup={() => { setIsDeleteUser(false) }} deleteAccount={() => { deleteUser() }} />

                <div className="container">
                    <div className='max-w-[1162px] w-full'>
                        <div className='max-w-[616px] w-full mb-4 md:mb-[50px]'>
                            <h2 className='lg:py-1 text-subheading text-[28px] font-bold leading-9 capitalize mb-5'>Profile details</h2>
                            <div className='pt-10 '>
                                <div className=' flex items-end justify-between'>
                                    <div className='relative max-w-[115px] md:max-w-[168px] w-full h-[168px]'>
                                        <Image
                                            className='rounded-full h-[168px]'
                                            // src={
                                            //     loading ? '/images/profileimage.png' :
                                            //         response?.user?.profileImg
                                            // }
                                            src={profileImage}
                                            height={168}
                                            width={168}
                                            alt='userimage'
                                        />



                                        <label htmlFor="profilepic" className='py-[5px] px-[14px] text-[11px] md:text-base md:py-2 text-nowrap absolute bottom-0 left-[6px] right-[6px] md:left-2 md:right-2 text-center bg-primary-300 text-[#282827] capitalize cursor-pointer border-b transition-all duration-200 hover:border-primary-100 font-regular leading-6'>change image</label>
                                        <input
                                            className='hidden'
                                            id='profilepic'
                                            type='file'
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    {/* <Button className='py-[6px] px-5 text-sm md:text-base md:px-7 md:py-2' variant='basic'>Remove</Button> */}
                                </div>
                                <div className='mt-5 flex flex-col gap-y-4 lg:gap-y-[30px]'>
                                    <div >
                                        <div className='flex items-end gap-x-[10px]'>
                                            <Input
                                                disabled={isNameDisabled}
                                                className='px-4 py-[13px] md:py-[13px]'
                                                label='Name'
                                                placeholder='Name'
                                                name='name'
                                                type='text'
                                                value={response?.user ? response?.user?.name : name}
                                                onChange={(e) => setName(e?.target?.value)}
                                            />

                                            {
                                                isNameActive ?
                                                    <Button
                                                        hideChild='hidden md:block'
                                                        iconClass='w-6 h-6'
                                                        direction='flex-row-reverse gap-x-[10px]'
                                                        className='py-[13px] px-4 md:py-4 md:px-[14px]'
                                                        onClick={() => { setIsNameActive(false), setIsNameDisabled(!isNameDisabled), handleNameUpdate() }}
                                                        variant='primary'
                                                        saveicon={true}
                                                    >
                                                        {updateLoading ? 'Saving...' : 'Save'}
                                                    </Button>
                                                    :
                                                    <Button
                                                        hideChild='hidden md:block'
                                                        direction='flex-row-reverse gap-x-[10px]'
                                                        className='py-[13px] px-4 md:py-4 md:px-[14px]'
                                                        onClick={() => { setIsNameActive(true), setIsNameDisabled(!isNameDisabled) }}
                                                        variant='primary'
                                                        iconClass='fill-white w-6 h-6'
                                                        editicon={true} >edit</Button>
                                            }
                                        </div>
                                        {
                                            nameError && <p className='text-red-500'> {nameError}</p>
                                        }
                                    </div>

                                    <div>
                                        <div className='flex items-end gap-x-[10px]' >
                                            <Input
                                                disabled={isUserDisabled}
                                                className='px-4 py-[13px] md:py-[13px]'
                                                label='Number'
                                                placeholder='Number'
                                                name='number'
                                                type='text'
                                                value={response?.user ? response?.user?.number : number}
                                                onChange={(e) => setNumber(e.target.value)}
                                            />
                                            {
                                                isUsernameActive ?
                                                    <Button
                                                        hideChild='hidden md:block'
                                                        direction='flex-row-reverse gap-x-[10px]'
                                                        className='py-[13px] px-4 md:py-4 md:px-[14px]'
                                                        iconClass='w-6 h-6'
                                                        onClick={() => { setIsUsernameActive(false), setIsUserDisabled(!isUserDisabled), handlePhonenumberUpdate() }}
                                                        variant='primary'
                                                        saveicon={true}> {updateloadingNumber ? 'Saving...' : 'Save'}</Button> :
                                                    <Button
                                                        hideChild='hidden md:block'
                                                        direction='flex-row-reverse gap-x-[10px]'
                                                        className='py-[13px] px-4 md:py-4 md:px-[14px]' onClick={() => { setIsUsernameActive(true), setIsUserDisabled(!isUserDisabled) }} variant='primary' iconClass='fill-white w-6 h-6' editicon={true}>edit</Button>
                                            }
                                        </div>
                                        {
                                            phoneNumberError && <p className='text-red-500'> {phoneNumberError}</p>
                                        }
                                    </div>

                                    <div className='flex items-end gap-x-[10px]'>
                                        <Input
                                            disabled={isEmailDisabled}
                                            className='px-4 py-[13px] md:py-[13px]'
                                            label='Email'
                                            placeholder='Email'
                                            name='email'
                                            type='email'
                                            value={session?.email}
                                        />
                                        {

                                            <Button
                                                hideChild='hidden md:block'
                                                direction='flex-row-reverse gap-x-[10px]'
                                                className='py-[13px] px-4 md:py-4 md:px-[14px]'
                                                onClick={() => { setIsEmailActive(true), setIsEmailDisabled(!isEmailDisabled), openPopup() }}
                                                variant='primary'
                                                iconClass='fill-white w-6 h-6'
                                                editicon={true}>
                                                edit
                                            </Button>
                                        }
                                    </div>




                                    <div className='py-[18px] px-5 border border-divider-100 flex items-center justify-between'>
                                        <h3 className='text-neutral-900 font-semibold capitalize leading-6'>Daily Download Balance :</h3>
                                        <p className='text-neutral-900 font-semibold capitalize leading-6'>{userData?.user?.freeDownloads || 0}</p>
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
                            <Button onClick={() => setisDeletepopup(true)} className='py-[13px] text-lg mt-5 md:mt-0 text-nowrap' variant='secondary'>Set new password</Button>
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
                            <Button className='py-[13px] text-lg px-[30px]' variant='secondary' type='button' onClick={() => { setIsDeleteUser(true) }}>delete account</Button>
                            <p className='pt-5 text-textparagraph'><strong>Note:</strong> As you have an active paid plan, you can't delete your account directly. Please contact <a href="#" className='text-primary-100 '>support@freepik.com</a> for assistance </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile