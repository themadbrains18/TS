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
import NewPassword from './NewPassword';
import VerfiyNewEmail from './VerfiyNewEmail';

interface FormData {
    currentEmail: string;
    newEmail?: string;
    email?: string;
    otp?: string[];
    confirmPassword?: string,
    newPassword?: string

}




const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NewPasswordProcess: FC<verifyoldemail> = ({
    closePopup,
    isPopupOpen,
    handlepasswordUpdate
}) => {
    const { data: response, fetchData } = useFetch<any>();
    const { data: session } = useSession();
    const { register, handleSubmit, setValue, reset, setError, formState: { errors }, clearErrors, getValues } = useForm<FormData>();
    const [disabled, setDisabled] = useState(true);
    const [step, setStep] = useState<number>(1);
    const [loadingbtn, setLoadingbtn] = useState<boolean>(false);
    const [loadingOtp, setLoadingOtp] = useState<boolean>(false);
    const [startTimer, setStartTimer] = useState(0); // Timer in seconds
    const [canResend, setCanResend] = useState(false);
    const [resendData, setResendData] = useState<FormData>();
    const [initialSend, setInitialSend] = useState(true);
    const [FormData, setFormData] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * onSubmit function handles the form submission process.
     * It processes the form data, checks for OTP completion, and sends the updated data to the server.
     * 
     * @param data - The form data that includes user input, such as email and OTP, to be processed and sent to the server.
     */

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {


            if (step === 1) data.currentEmail = session?.email || "";
            else data.newEmail = data?.email || "";


            const joinedOtp = data?.otp?.join('') || "";
            if (joinedOtp.length < 6) {
                setError("otp", { message: "Please enter the complete OTP" });
                return;
            }

            delete data.otp;
            setFormData(data)
            setLoadingOtp(true)
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
            if (!response.ok) {
                setTimeout(() => {
                    setLoadingOtp(false)
                }, 2500)
            }
        } catch (error) {
            console.error("Error updating email:", error);
            setLoadingOtp(false)

        }
        setTimeout(() => {
            setIsSubmitting(false);
        }, 2500);
    };


    /**
     * handleEmailUpdate function handles the process of updating the user's email address.
     * It validates the email, prepares the payload, and sends it to the server for updating.
     * 
     * @returns {void}
     */
    const handleEmmailUpdate = async () => {

        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            setLoadingbtn(true);
            const email = step === 1
                ? (session?.email || "")
                : getValues("email");

            if (email === "") {
                setError("email", { message: "Please fill out this field" });
                return;
            }

            if (email && !emailRegex.test(email)) {
                setError("email", { message: "Invalid email format" });
                return;
            }

            const payload = {
                ["currentEmail"]: email || "",
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
            setTimeout(() => {
                setIsSubmitting(false);
            }, 2500);

        }
    };


    /**
     * resendCode function handles the process of resending an OTP (One-Time Password) to the user's email.
     * It checks if the resend action is allowed, sends a request to the server, and manages the UI state accordingly.
     * 
     * @returns {void}
     */

    const resendCode = async () => {

        if (!canResend) return;

        try {
            setLoadingbtn(true)
            await fetch(`${process.env.NEXT_PUBLIC_APIURL}/resend-otp`, {
                method: "POST",
                body: JSON.stringify({ email: resendData?.currentEmail }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: session?.token ? `Bearer ${session?.token}` : "",
                }
            }).then(res => {
                if (res.ok) {
                    setStartTimer(180); // Reset timer to 60 seconds
                    setCanResend(false); // Disable resend option temporarily
                    toast.success("OTP resent successfully", { autoClose: 1500 });
                } else {
                    toast.error("Failed to resend OTP", { autoClose: 1500 });
                }
            });
        } catch (error) {
            console.log("Error resending OTP:", error);
        }
        finally {
            setTimeout(() => {
                setLoadingbtn(false)
            }, 2500)
        }

    };


    /**
     * This hook listens for changes in the `response` object and updates various states accordingly.
     * 
     * Dependencies:
     * - This effect runs every time `response` changes.
    */


    useEffect(() => {
        if (response?.otp === true) {
            setStep(2);
            setValue('otp', ['', '', '', '', '', '']);
            reset();
            setStartTimer(0)
            setInitialSend(true)
        }

        if (response?.sendotp === true) {
            setInitialSend(false);
            setStartTimer(180);
            setDisabled(false);
        }

        if (response?.redirect) {
            signOut();
        }
    }, [response]);



    /**
     * This hook listens for changes in the `startTimer` object and updates various states accordingly.
     * 
     * Dependencies:
     * - This effect runs every time `startTimer` changes.
    */
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

    console.log("errors", errors);


    return (
        <Modal isOpen={isPopupOpen} className='max-w-[616px] w-full' onClose={() => { closePopup(); setStep(1); setStartTimer(0); setInitialSend(true); setDisabled(true); reset() }}>
            <div className="relative px-4 py-9 sm:py-[30px] sm:px-10 max-w-[616px] bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF]">
                <Icon onClick={() => { closePopup(); setStep(1); setStartTimer(0); setInitialSend(true); setDisabled(true); reset() }} className="absolute top-5 right-5 fill-[#5D5775] w-5 h-5 cursor-pointer z-50" name="crossicon" />
                <div className="py-4 sm:py-[50px]">
                    {step === 1 && (
                        <>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex justify-between items-end gap-x-[10px] sm:gap-x-5 ">
                                    <Input
                                        register={register}
                                        label={"Current Email"}
                                        name="email"
                                        placeholder={`Enter email Current Email `}
                                        value={session?.email}
                                        disabled={step === 1}
                                        onChange={() => clearErrors("email")}
                                        className='!py-[13px] px-4 sm:px-5 auto-fill-color'
                                    />
                                    {startTimer > 0 ? (
                                        <Button className='bg-primary-100 text-white capitalize  leading-6 transition-all duration-300 hover:bg-[#872fcb] py-[13px] px-[10px] sm:px-[30px] text-nowrap text-sm sm:text-base font-normal' variant='primary' type='button' disabled={true} >
                                            Resend OTP in {Math.floor(startTimer / 60)}:{(startTimer % 60).toString().padStart(2, '0')}
                                        </Button>
                                    ) : (
                                        <button
                                            className="bg-primary-100 text-white capitalize  leading-6 transition-all duration-300 hover:bg-[#872fcb] py-[13px] px-[10px] sm:px-[30px] text-nowrap text-sm sm:text-base font-normal"
                                            type="button"
                                            disabled={loadingbtn}
                                            onClick={() => !initialSend ? resendCode() : handleEmmailUpdate()}
                                        >
                                            {initialSend ? (
                                                loadingbtn ? <Icon className='w-7 h-7' name="loadingicon" /> : "send otp"
                                            ) : (
                                                loadingbtn ? <Icon className='w-7 h-7' name="loadingicon" /> : "Resend Code"
                                            )}
                                        </button>

                                    )}
                                    {errors?.email && <p className="text-red-500">{errors?.email?.message}</p>}
                                </div>
                            </form>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-10">
                                    <label className="text-lg font-normal leading-7 text-neutral-900 mb-2 ">Please enter OTP</label>
                                    <InputOtp
                                        className="space-x-5  mt-[10px] mx-4 sm:m-5"
                                        register={register}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                    />
                                    {errors?.otp && <p className="text-red-500">{errors?.otp?.length && errors?.otp?.length > 0 && `Please enter otp`}</p>}
                                    <p className="mt-5 text-xs font-normal text-[#4B5563]">
                                        Please check your mail for a 6-digit confirmation code to {session?.email}. Enter the confirmation code to verify.
                                    </p>
                                    <div className="mt-[30px] sm:mt-10">
                                        <Button disabled={disabled ||isSubmitting} loadingbtn={loadingOtp  ? true : false} iconClass='w-7 h-7' className="w-full py-2 sm:py-[13px] text-lg font-normal text-center justify-center" type="submit" variant="primary" >{loadingOtp  ? "" : "Verify Now"}</Button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}

                    {
                        step === 2 && (<>
                            <VerfiyNewEmail formData={FormData} />
                        </>)
                    }

                </div>
            </div>
        </Modal>
    );
};

export default NewPasswordProcess;
