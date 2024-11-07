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
import { newChangePassword } from '@/validations/NewPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import NewPassword from './NewPassword';

interface FormData {
    currentEmail: string;
    newEmail?: string;
    email: string;
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
    const [FormData, setFormData] = useState({})
    console.log(FormData, "check opt filed ")

    /**
     * onSubmit function handles the form submission process.
     * It processes the form data, checks for OTP completion, and sends the updated data to the server.
     * 
     * @param data - The form data that includes user input, such as email and OTP, to be processed and sent to the server.
     */

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
            setFormData(data)
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

    
    /**
     * handleEmailUpdate function handles the process of updating the user's email address.
     * It validates the email, prepares the payload, and sends it to the server for updating.
     * 
     * @returns {void}
     */
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


    /**
     * resendCode function handles the process of resending an OTP (One-Time Password) to the user's email.
     * It checks if the resend action is allowed, sends a request to the server, and manages the UI state accordingly.
     * 
     * @returns {void}
     */
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
                            <NewPassword otp={response?.otp} formData={FormData} />
                        </>)
                    }
                </div>
            </div>
        </Modal>
    );
};

export default NewPasswordProcess;
