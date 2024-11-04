import React, { FC, useEffect, useRef, useState } from 'react'
import Modal from '../ui/Modal'
import { verifyoldemail } from '@/types/type'
import Input from '../ui/Input'
import Button from '../ui/Button'
import InputOtp from '@/app/(auth)/otp/components/Inputotp'
import { SubmitHandler, useForm } from 'react-hook-form'
import Icon from '../Icon'
import { signOut, useSession } from 'next-auth/react'
import useFetch from '@/hooks/useFetch'
import { useRouter } from 'next/navigation'


interface FormData {
    currentEmail: String
    newEmail?: String
    email: string
    otp?: string[]
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VerfiyOldEmail: FC<verifyoldemail> = ({
    closePopup,
    isPopupOpen,
    handlepasswordUpdate
}) => {
    const router = useRouter();
    const { data: response, error, loading, fetchData } = useFetch<any>();
    const { data: session } = useSession()
    const { register, handleSubmit, setValue, reset, setError,formState: { errors }, clearErrors,getValues } = useForm<FormData>();
    const [disabled, setDisabled] = useState(true)
    const [step, setStep] = useState<number>(1)


    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            // console.log(data, "==dhfhkjdh");

            if (step === 1) data.currentEmail = session ? session?.email : ""
            else data.newEmail = data?.email || ""
            if (step===2 && !emailRegex.test(data.email)) {
                setError("email",{message:"Invalid current email format"});
                return
            }
            const joinedOtp = data?.otp && data?.otp.join('') || "";

            if( joinedOtp.length<6){
                setError("otp",{message:"Please enter otp"})
                return
            }

            delete data?.otp
            // console.log(data,"===data");
            

            await fetchData('/update-details', {
                method: 'PUT',
                body: JSON.stringify({
                    ...data,
                    ...(joinedOtp !== "" && { otp: joinedOtp })
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
          
        } catch (error) {
            console.error("Error updating password:", error);
        }
    }

    // console.log(errors,"==errors");
    
    const handleEmmailUpdate = async () => {
        try {
            const email = step === 1
                ? (session ? session.email : "")
                : getValues("email");
    
            // Validate the email format
            if (!emailRegex.test(email)) {
                setError("email", { message: "Invalid email format" });
                return;  // Stop execution if the email is invalid
            }
    
            // Construct the payload based on the step
            const payload = {
                [step === 1 ? "currentEmail" : "newEmail"]: email,
            };
    
            // Perform the fetch request
            await fetchData('/update-details', {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
        } catch (error) {
            console.error("Error updating email:", error);
        }
    };
    
    // console.log(response, "==response");


    useEffect(() => {
        if (response?.otp === true) {
            setStep(2)
            setValue('otp', ['', '', '', '', '', '']); // Reset OTP fields to empty strings
            reset()
            setDisabled(true)
        }
        if (response?.sendotp === true) {
          setDisabled(false)
        }
        if(response?.redirect){
           signOut()
        }

    }, [response])



    return (
        <>
            <Modal isOpen={isPopupOpen} onClose={()=>{closePopup(), setStep(1)}}>
                <div className='relative px-4 py-9 sm:py-[30px] sm:px-10 max-w-[616px] bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF]'>
                    <Icon onClick={() => {closePopup(),setStep(1)}} className='absolute top-5 right-5 fill-[#5D5775] w-5 h-5 cursor-pointer z-50' name="crossicon" />
                    <div className='py-[50px]'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex justify-between items-end gap-x-[10px] sm:gap-x-5'>
                                <Input
                                    register={register}
                                    label={step === 1 ? 'Current Email*' : "New Email*"}
                                    name='email'
                                    placeholder={`Enter ${step === 1 ? "current" : "new"} email`}
                                    value={step === 1 ? session?.email : ""}
                                    disabled={step === 1}
                                    onChange={()=>{clearErrors("email")}}
                                />
                                <Button
                                    onClick={()=>handleEmmailUpdate()}
                                    // type='submit'
                                    className='text-nowrap py-[13px] px-[10px] text-sm sm:text-lg font-normal leading-6'>
                                    Send OTP
                                </Button>
                            </div>
                            {errors?.email &&  <p className='text-red-500'>{errors?.email?.message}</p>}
                           
                        </form>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mt-[30px] sm:mt-[60px]'>
                                <label className='text-lg font-normal leading-7 text-neutral-900'>Please enter one time OTP</label>
                                <InputOtp
                                    className='space-x-[10px] sm:space-x-[30px] m-[10px] sm:m-[15px]'
                                    register={register}
                                    setValue={setValue}
                                    clearErrors={clearErrors}
                                />
                                {errors?.otp &&  <p className='text-red-500'>{errors?.otp?.message}</p>}
                                <p className='mt-5 text-xs sm:text-sm font-normal leading-5 sm:leading-6 text-[#4B5563]'>Please check your mail, 6-digit confirmation code to {session?.email}, please enter the confirmation code to verify it's you.</p>
                                <div className='mt-[30px] sm:mt-[60px]'>
                                    <Button className='w-full justify-center py-2 sm:py-[13px] text-lg font-normal leading-6' type='submit' variant='primary' disabled={disabled}>verify now</Button>
                                    <Button className='w-full justify-center bg-transparent border-transparent mt-4 py-2 sm:py-[13px] text-lg font-normal leading-6' variant='liquid'>Resend Code</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default VerfiyOldEmail





