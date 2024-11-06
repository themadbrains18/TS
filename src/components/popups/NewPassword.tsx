// "use client"

// import React, { Fragment, useState } from 'react'
// import Modal from '../ui/Modal'
// import Button from '../ui/Button'
// import Icon from '../Icon';
// import CheckBox from '../ui/Checkbox';
// import { Controller, SubmitHandler, useForm } from 'react-hook-form';
// import useFetch from '@/hooks/useFetch';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { newChangePassword } from '@/validations/NewPassword';
// import Input from '../ui/Input';

// interface newpasswordpopup {
//     isPopupOpen: boolean,
//     closePopup: () => void;
// }


// const NewPassword = ({ isPopupOpen, closePopup }: newpasswordpopup) => {
//     const [isChecked1, setIsChecked1] = useState(false);
//     interface FormValues {
//         newPassword: string,
//         confirmPassword: string,
//         otp: string,
//         success: boolean
//     }

//     const { data: response, error, loading, fetchData } = useFetch<FormValues>();


//     const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
//         resolver: zodResolver(newChangePassword)
//     });


//     const onSubmit: SubmitHandler<FormValues> = async (data) => {
//         console.log(data)
//     };

//     return (
//         <>
//             <Modal className='bg-[#E5EFFF]  relative max-w-[616px]' isOpen={isPopupOpen} onClose={closePopup}>
//                 <div className=' p-5 tab:py-[30px] tab:px-10'>
//                     <Icon onClick={closePopup} name='crossicon' className='absolute top-5 right-5  fill-[#5D5775] w-5 h-5' />
//                     <div className="max-w-[616px] w-full bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF] py-[50px]">
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className='  md:space-y-[30px] space-y-[15px] ' >
//                                 <Controller
//                                     name='newPassword'
//                                     control={control}
//                                     render={({ field }) => (
//                                         <Input
//                                             {...field}
//                                             type={isChecked1 ? "text" : "password"}
//                                             placeholder="Email or Phone"
//                                             label=" Password"
//                                             className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100"
//                                             error={errors.newPassword?.message}
//                                         />
//                                     )}
//                                 />
//                                 <Controller
//                                     name='confirmPassword'
//                                     control={control}
//                                     render={({ field }) => (
//                                         <Input
//                                             {...field}
//                                             type={isChecked1 ? "text" : "password"}
//                                             placeholder="Your Password Again"
//                                             label=" Confirm Password"
//                                             className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100 w-full"
//                                             error={errors.confirmPassword?.message}
//                                         />
//                                     )}
//                                 />
//                                 {/* Checkbox to Toggle Password Visibility */}
//                                 <CheckBox
//                                     id="checkbox1"
//                                     label="Show Password"
//                                     checked={isChecked1}
//                                     onChange={() => setIsChecked1(!isChecked1)}
//                                     labelPosition="left"
//                                     customClass="my-custom-checkbox"
//                                 />
//                             </div>
//                             {/* Register Button */}
//                             <div className='mt-6' >
//                                 {
//                                     loading ? <Button disabled type='submit' loadingbtn={true} iconClass='w-7 h-7' variant='primary' className='w-full items-center justify-center' hideChild='hidden'  >
//                                     </Button> : <Button type='submit' variant='primary' className='w-full items-center justify-center' >
//                                         Save
//                                     </Button>
//                                 }
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </Modal>
//         </>
//     )
// }

// export default NewPassword 












import React, { FC, useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import { verifyoldemail } from '@/types/type';
import Input from '../ui/Input';
import Button from '../ui/Button';
import InputOtp from '@/app/(auth)/otp/components/Inputotp';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Icon from '../Icon';
import { signOut, useSession } from 'next-auth/react';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CheckBox from '../ui/Checkbox';
import { newChangePassword } from '@/validations/NewPassword';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormData {
    currentEmail: string;
    newEmail?: string;
    email: string;
    otp?: string[];
    newemail?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VerfiyOldEmail: FC<verifyoldemail> = ({
    closePopup,
    isPopupOpen,
    handlepasswordUpdate
}) => {
    const router = useRouter();
    const { data: response, error, loading, fetchData } = useFetch<any>();
    const { data: session } = useSession();
    const { register, handleSubmit, setValue, reset, setError, formState: { errors }, clearErrors, getValues } = useForm<FormData>();
    const [disabled, setDisabled] = useState(true);
    const [step, setStep] = useState<number>(1);
    const [loadingbtn, setLoadingbtn] = useState<boolean>(false);
    const [startTimer, setStartTimer] = useState(0); // Timer in seconds
    const [canResend, setCanResend] = useState(false);
    const [resendData, setResendData] = useState({});
    const [initialSend, setInitialSend] = useState(true);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            if (step === 1) data.currentEmail = session?.email || "";
            else data.newEmail = data?.email || "";


            const joinedOtp = data?.otp?.join('') || "";
            if (joinedOtp.length < 6) {
                setError("otp", { message: "Please enter the complete OTP" });
                return;
            }

            delete data.otp;

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
            console.error("Error updating email:", error);
        }
    };

    const handleEmmailUpdate = async () => {
        try {
            setLoadingbtn(true);

            const email = step === 1
                ? (session?.email || "")
                : getValues("email");

            if (email === "") {
                setError("email", { message: "Please fill out this field" });
                return;
            }

            if (!emailRegex.test(email)) {
                setError("email", { message: "Invalid email format" });
                return;
            }

            const payload = {
                ["currentEmail"]: email,
            };

            setResendData(payload);

            await fetchData('/update-details', {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        } catch (error) {
            console.error("Error updating email:", error);
        } finally {
            setLoadingbtn(false);
        }
    };

    const resendCode = async () => {
        if (!canResend) return;

        try {
            await fetch(`${process.env.NEXT_PUBLIC_APIURL}/resend-otp`, {
                method: "POST",
                body: JSON.stringify({ email: resendData?.currentEmail }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: session?.token ? `Bearer ${session?.token}` : "",
                }
            }).then(res => {
                if (res.ok) {
                    setStartTimer(60); // Reset timer to 60 seconds
                    setCanResend(false); // Disable resend option temporarily
                    toast.success("OTP resent successfully");
                } else {
                    toast.error("Failed to resend OTP");
                }
            });
        } catch (error) {
            console.log("Error resending OTP:", error);
        }
    };

    useEffect(() => {
        if (response?.otp === true) {
            setStep(2);
            setValue('otp', ['', '', '', '', '', '']);
            reset();
            setDisabled(true);
        }

        if (response?.sendotp === true) {
            setInitialSend(false);
            setStartTimer(60);
            setDisabled(false);
        }

        if (response?.redirect) {
            signOut();
        }
    }, [response]);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (startTimer > 0) {
            timer = setInterval(() => {
                setStartTimer(prev => prev - 1);
            }, 1000);
        } else if (startTimer === 0) {
            setCanResend(true);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [startTimer]);




    // step 2 
    const [isChecked1, setIsChecked1] = useState(false);
    interface FormValues {
        newPassword: string,
        confirmPassword: string,
        otp: string,
        success: boolean
    }

    // const { data: response, error, loading, fetchData } = useFetch<FormValues>();


    const { handleSubmit: sdsd, control, } = useForm<FormValues>({
        resolver: zodResolver(newChangePassword)
    });


    const onSubmitstep2: SubmitHandler<FormValues> = async (data) => {
        console.log(data)
    };



    return (
        <Modal isOpen={isPopupOpen} onClose={() => { closePopup(); setStep(1); }}>
            <div className="relative px-4 py-9 sm:py-10 sm:px-10 max-w-[616px] bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF]">
                <Icon onClick={() => { closePopup(); setStep(1); }} className="absolute top-5 right-5 fill-[#5D5775] w-5 h-5 cursor-pointer z-50" name="crossicon" />
                <div className="py-10">

                    {step === 1 && (

                        <>


                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex justify-between items-end gap-x-5">
                                    <Input
                                        register={register}
                                        label={"Current Email"}
                                        name="email"
                                        placeholder={`Enter email Current Email `}
                                        value={session?.email}
                                        disabled={step === 1}
                                        onChange={() => clearErrors("email")}
                                    />
                                    {startTimer > 0 ? (
                                        <span className="text-[14px] font-normal text-neutral-600">
                                            Resend OTP in {Math.floor(startTimer / 60)}:{(startTimer % 60).toString().padStart(2, '0')}
                                        </span>
                                    ) : (
                                        // <button className="text-action-900" type="button" onClick={() => !initialSend ? resendCode() : handleEmmailUpdate()}>
                                        //     {initialSend ? (`${loadingbtn ? (<Icon name='loadingicon' />) : ("send otp")}`) : (`${loadingbtn ? (<Icon name='loadingicon' />) : ("Resend Code")}`)}
                                        // </button>
                                        <button
                                            className="text-action-900"
                                            type="button"
                                            onClick={() => !initialSend ? resendCode() : handleEmmailUpdate()}
                                        >
                                            {initialSend ? (
                                                loadingbtn ? <Icon name="loadingicon" /> : "send otp"
                                            ) : (
                                                loadingbtn ? <Icon name="loadingicon" /> : "Resend Code"
                                            )}
                                        </button>

                                    )}
                                    {errors?.email && <p className="text-red-500">{errors?.email?.message}</p>}
                                </div>
                            </form>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-10">
                                    <label className="text-lg font-normal leading-7 text-neutral-900">Please enter one time OTP</label>
                                    <InputOtp
                                        className="space-x-5 m-5"
                                        register={register}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                    />
                                    {errors?.otp && <p className="text-red-500">{errors?.otp?.message}</p>}
                                    <p className="mt-5 text-xs font-normal text-[#4B5563]">
                                        Please check your mail for a 6-digit confirmation code to {session?.email}. Enter the confirmation code to verify.
                                    </p>
                                    <div className="mt-10">
                                        <Button className="w-full py-2 text-lg font-normal" type="submit" variant="primary" >Verify Now</Button>
                                    </div>
                                </div>
                            </form>
                        </>

                    )}


                    {
                        step === 2 && (<>

                            <div className=' p-5 tab:py-[30px] tab:px-10'>
                                <Icon onClick={closePopup} name='crossicon' className='absolute top-5 right-5  fill-[#5D5775] w-5 h-5' />
                                <div className="max-w-[616px] w-full bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF] py-[50px]">
                                    <form onSubmit={sdsd(onSubmitstep2)}>
                                        <div className='  md:space-y-[30px] space-y-[15px] ' >
                                            <Controller
                                                name='newPassword'
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type={isChecked1 ? "text" : "password"}
                                                        placeholder="Email or Phone"
                                                        label=" Password"
                                                        className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100"
                                                        // error={errors.newPassword?.message}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                name='confirmPassword'
                                                control={control}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        type={isChecked1 ? "text" : "password"}
                                                        placeholder="Your Password Again"
                                                        label=" Confirm Password"
                                                        className=" placeholder:text-neutral-400 py-3 md:py-[18px]  px-5 bg-divider-100 w-full"
                                                        // error={errors.confirmPassword?.message}
                                                    />
                                                )}
                                            />
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
                                        <div className='mt-6' >
                                            {
                                                loading ? <Button disabled type='submit' loadingbtn={true} iconClass='w-7 h-7' variant='primary' className='w-full items-center justify-center' hideChild='hidden'  >
                                                </Button> : <Button type='submit' variant='primary' className='w-full items-center justify-center' >
                                                    Save
                                                </Button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </>)
                    }
                </div>
            </div>
        </Modal>
    );
};

export default VerfiyOldEmail;
