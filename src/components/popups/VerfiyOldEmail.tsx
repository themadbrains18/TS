// import React, { FC, useEffect, useRef, useState } from 'react'
// import Modal from '../ui/Modal'
// import { verifyoldemail } from '@/types/type'
// import Input from '../ui/Input'
// import Button from '../ui/Button'
// import InputOtp from '@/app/(auth)/otp/components/Inputotp'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import Icon from '../Icon'
// import { signOut, useSession } from 'next-auth/react'
// import useFetch from '@/hooks/useFetch'
// import { useRouter } from 'next/navigation'
// import { toast } from 'react-toastify'


// interface FormData {
//     currentEmail: String
//     newEmail?: String
//     email: string
//     otp?: string[]
//     newemail?: string
// }

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const VerfiyOldEmail: FC<verifyoldemail> = ({
//     closePopup,
//     isPopupOpen,
//     handlepasswordUpdate
// }) => {
//     const router = useRouter();
//     const { data: response, error, loading, fetchData } = useFetch<any>();
//     const { data: session } = useSession()
//     const { register, handleSubmit, setValue, reset, setError, formState: { errors }, clearErrors, getValues } = useForm<FormData>();
//     const [disabled, setDisabled] = useState(true)
//     const [step, setStep] = useState<number>(1)
//     const [loadingbtn, setLoadingbtn] = useState<boolean>(false)
//     const [startTimer, setStartTimer] = useState(0); // Timer set to 10 minutes (600 seconds)
//     const [canResend, setCanResend] = useState(false);
//     const [resendData, SetresendData] = useState({})
//     const [initialSend, setInitialSend] = useState(true); // Track initial send state


//     const onSubmit: SubmitHandler<FormData> = async (data) => {
//         try {

//             if (step === 1) data.currentEmail = session ? session?.email : ""
//             else data.newEmail = data?.email || ""
//             if (step === 2 && !emailRegex.test(data.email)) {
//                 setError("email", { message: "Invalid current email format" });
//                 return
//             }
//             const joinedOtp = data?.otp && data?.otp.join('') || "";

//             if (joinedOtp.length < 6) {
//                 setError("otp", { message: "Please enter otp" })
//                 return
//             }

//             delete data?.otp


//             await fetchData('/update-details', {
//                 method: 'PUT',
//                 body: JSON.stringify({
//                     ...data,
//                     ...(joinedOtp !== "" && { otp: joinedOtp })
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//         } catch (error) {
//             console.error("Error updating password:", error);
//         }

//     }


//     const handleEmmailUpdate = async () => {
//         try {
//             setLoadingbtn(true)

//             const email = step === 1
//                 ? (session ? session.email : "")
//                 : getValues("email");

//             if (email === "") {
//                 setError("email", { message: "Please fill out this field" });
//                 return;  // Stop execution if the email is invalid
//             }

//             // Validate the email format
//             if (!emailRegex.test(email)) {
//                 setError("email", { message: "Invalid email format" });
//                 return;  // Stop execution if the email is invalid
//             }

//             // Construct the payload based on the step
//             const payload = {
//                 [step === 1 ? "currentEmail" : "newEmail"]: email,
//             };

//             SetresendData(payload)
//             // Perform the fetch request
//             await fetchData('/update-details', {
//                 method: 'PUT',
//                 body: JSON.stringify(payload),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//         } catch (error) {
//             console.error("Error updating email:", error);
//         }
//         finally {
//             setLoadingbtn(false)
//         }
//     };

//     const resendCode = async () => {
//         if (!canResend) return; // Prevent resend if the timer has not completed


//         try {
//             await fetch(`${process.env.NEXT_PUBLIC_APIURL}/resend-otp`, {
//                 method: "POST",
//                 body: JSON.stringify({ email: resendData?.currentEmail }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: session?.token ? `Bearer ${session?.token}` : "",
//                 }
//             }).then(res => {
//                 if (res.ok) {
//                     setStartTimer(60); // Reset timer to 10 minutes
//                     setCanResend(false); // Reset resend availability
//                     toast.success("OTP resent successfully");
//                 } else {
//                     toast.error("Failed to resend OTP");
//                 }
//             });
//         } catch (error) {
//             console.log(error, "==error");
//         }
//     };



//     useEffect(() => {
//         if (response?.otp === true) {
//             setStep(2)
//             setValue('otp', ['', '', '', '', '', '']); // Reset OTP fields to empty strings
//             reset()
//             setDisabled(true)
//         }
//         if (response?.sendotp === true) {
//             setInitialSend(false); // Switch to resend state
//             setStartTimer(60)
//             setDisabled(false)
//         }
//         if (response?.redirect) {
//             signOut()
//         }

//     }, [response])



//     useEffect(() => {
//         // Declare timer variable
//         let timer: NodeJS.Timeout | null = null;

//         if (startTimer > 0) {
//             timer = setInterval(() => {
//                 console.log("herereer");

//                 setStartTimer((prev) => prev - 1);
//             }, 1000);
//         }
//         else {
//             setCanResend(true)
//         }
//         return () => {
//             if (timer) {
//                 clearInterval(timer); // Clear the timer on unmount
//             }
//         };

//     }, [startTimer]);



//     console.log(canResend);



//     return (
//         <>
//             <Modal isOpen={isPopupOpen} onClose={() => { closePopup(), setStep(1) }}>
//                 <div className='relative px-4 py-9 sm:py-[30px] sm:px-10 max-w-[616px] bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF]'>
//                     <Icon onClick={() => { closePopup(), setStep(1) }} className='absolute top-5 right-5 fill-[#5D5775] w-5 h-5 cursor-pointer z-50' name="crossicon" />
//                     <div className='py-[50px]'>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className='flex justify-between items-end gap-x-[10px] sm:gap-x-5'>
//                                 {step === 1 ? <Input
//                                     register={register}
//                                     label='Current Email*'
//                                     name='email'
//                                     placeholder={`Enter current email`}
//                                     value={session?.email}
//                                     disabled={true}
//                                     onChange={() => { clearErrors("email") }}
//                                 /> :
//                                     <Input
//                                         register={register}
//                                         label="New Email"
//                                         name='email'
//                                         placeholder={`Enter new email`}
//                                         onChange={() => { clearErrors("email") }}
//                                     />
//                                 }

//                                 {/* <Button
//                                     loadingbtn={loadingbtn}
//                                     onClick={handleEmmailUpdate}
//                                     disabled={loadingbtn}
//                                     className={`text-nowrap py-[13px] justify-center max-w-[142px] md:h-[54px] h-[50px] px-[10px] text-sm sm:text-lg w-full font-normal leading-6 ${loadingbtn ? "opacity-50 cursor-not-allowed" : ""
//                                         }`}
//                                 >
//                                     {loadingbtn ? (
//                                         // You can add a spinner or loading indicator here
//                                         <></>
//                                     ) : (
//                                         <h3 className="text-center text-[14px] leading-5 font-normal text-neutral-600">
//                                            Send OTP
//                                         </h3>
//                                     )}
//                                 </Button> */}

//                                 {startTimer > 0 ? (
//                                     <h3 className='text-center text-[14px] leading-5 font-normal text-neutral-600'>
//                                         Resend OTP in {Math.floor(startTimer / 60)}:{(startTimer % 60).toString().padStart(2, '0')}
//                                     </h3>
//                                 ) : (
//                                     <h3 className='text-center text-[14px] leading-5 font-normal text-neutral-600'>
//                                         <button className='text-action-900' type='button' onClick={() => { !initialSend ? resendCode() : handleEmmailUpdate() }}>{initialSend ? 'Send OTP' : 'Resend Code'}</button>
//                                     </h3>
//                                 )}

//                             </div>
//                             {errors?.email && <p className='text-red-500'>{errors?.email?.message}</p>}

//                         </form>
//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             <div className='mt-[30px] sm:mt-[60px]'>
//                                 <label className='text-lg font-normal leading-7 text-neutral-900'>Please enter one time OTP</label>
//                                 <InputOtp
//                                     className='space-x-[10px] sm:space-x-[30px] m-[10px] sm:m-[15px]'
//                                     register={register}
//                                     setValue={setValue}
//                                     clearErrors={clearErrors}
//                                     reset={step === 2 && true}
//                                 />
//                                 {errors?.otp && <p className='text-red-500'>{errors?.otp?.message}</p>}
//                                 <p className='mt-5 text-xs sm:text-sm font-normal leading-5 sm:leading-6 text-[#4B5563]'>Please check your mail, 6-digit confirmation code to {session?.email}, please enter the confirmation code to verify it's you.</p>
//                                 <div className='mt-[30px] sm:mt-[60px]'>
//                                     <Button className='w-full justify-center py-2 sm:py-[13px] text-lg font-normal leading-6' type='submit' variant='primary' disabled={disabled}>verify now</Button>
//                                     {/* <Button className='w-full justify-center bg-transparent border-transparent mt-4 py-2 sm:py-[13px] text-lg font-normal leading-6' variant='liquid'>Resend Code</Button> */}
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </Modal>
//         </>
//     )
// }

// export default VerfiyOldEmail







import React, { FC, useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import { verifyoldemail } from '@/types/type';
import Input from '../ui/Input';
import Button from '../ui/Button';
import InputOtp from '@/app/(auth)/otp/components/Inputotp';
import { SubmitHandler, useForm } from 'react-hook-form';
import Icon from '../Icon';
import { signOut, useSession } from 'next-auth/react';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

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

            if (step === 2 && !emailRegex.test(data.email)) {
                setError("email", { message: "Invalid email format" });
                return;
            }

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
                [step === 1 ? "currentEmail" : "newEmail"]: email,
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

    return (
        <Modal isOpen={isPopupOpen} onClose={() => { closePopup(); setStep(1); }}>
            <div className="relative px-4 py-9 sm:py-10 sm:px-10 max-w-[616px] bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF]">
                <Icon onClick={() => { closePopup(); setStep(1); }} className="absolute top-5 right-5 fill-[#5D5775] w-5 h-5 cursor-pointer z-50" name="crossicon" />
                <div className="py-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between items-end gap-x-5">
                            <Input
                                register={register}
                                label={step === 1 ? "Current Email*" : "New Email"}
                                name="email"
                                placeholder={`Enter ${step === 1 ? 'current' : 'new'} email`}
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
                                // <Button variant='primary' type='button' onClick={() => !initialSend ? resendCode() : handleEmmailUpdate()} ></Button>

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
                                reset={step === 2}
                            />
                            {errors?.otp && <p className="text-red-500">{errors?.otp?.message}</p>}
                            <p className="mt-5 text-xs font-normal text-[#4B5563]">
                                Please check your mail for a 6-digit confirmation code to {session?.email}. Enter the confirmation code to verify.
                            </p>
                            <div className="mt-10">
                                <Button className="w-full py-2 text-lg font-normal" type="submit" variant="primary" disabled={loading ? true : false}>Verify Now</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default VerfiyOldEmail;
