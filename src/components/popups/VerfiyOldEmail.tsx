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
import { toast } from 'react-toastify';

interface FormData {
    currentEmail: string;
    newEmail?: string;
    email: string;
    otp?: string[];
    newemail?: string;
}
interface savedData {
    currentEmail?: string;
    newEmail?: string;
    otp?: string[];
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VerfiyOldEmail: FC<verifyoldemail> = ({
    closePopup,
    isPopupOpen,
}) => {

    const { data: response, fetchData } = useFetch<any>();
    const { data: session } = useSession();
    const { register, handleSubmit, setValue, reset, setError, formState: { errors }, clearErrors, getValues } = useForm<FormData>();
    const [disabled, setDisabled] = useState(true);
    const [step, setStep] = useState<number>(1);
    const [loadingbtn, setLoadingbtn] = useState<boolean>(false);
    const [startTimer, setStartTimer] = useState(0); // Timer in seconds
    const [canResend, setCanResend] = useState(false);
    const [resendData, setResendData] = useState<savedData>();
    const [initialSend, setInitialSend] = useState(true);

    // console.log(resendData,"=resendData");
    
    /**
     * This function handles the form submission for updating user email and handling OTP validation.
     * 
     * Error Handling:
     * - If an error occurs during the request, it is caught and logged to the console.
     */
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            if (step === 1) data.currentEmail = session?.email || "";
            else data.newEmail = data?.email || "";

            if (step === 2 &&  !emailRegex.test(data?.email)) {
                setError("email", { message: "Invalid email format" });
                return;
            }

            const joinedOtp = data?.otp?.join('') || "";
            if (joinedOtp.length < 6) {
                setError("otp", { message: "Please enter the complete OTP" });
                return;
            }
            else{
                clearErrors("otp")
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



    /**
      * handleEmailUpdate: This function handles updating the user's email address based on the current step in the process.
      * 
      * Error Handling:
      * - If an error occurs during the request, it is caught and logged to the console.
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
                [step === 1 ? "currentEmail" : "newEmail"]: email || "" ,
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
      * This function handles the process of resending the OTP to the user's email address.
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
     * This effect runs whenever the `response` object changes.
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
     * This effect runs whenever the `startTimer` object changes.
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
                                <Button className="w-full py-2 text-lg font-normal" type="submit" variant="primary" disabled={disabled}>Verify Now</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default VerfiyOldEmail;
