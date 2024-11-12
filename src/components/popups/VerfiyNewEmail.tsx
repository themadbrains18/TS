import React, { FC, useEffect, useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import InputOtp from '@/app/(auth)/otp/components/Inputotp';
import { SubmitHandler, useForm } from 'react-hook-form';
import Icon from '../Icon';
import { signOut, useSession } from 'next-auth/react';
import useFetch from '@/hooks/useFetch';
import { toast } from 'react-toastify';

interface FormData {
  newEmail?: string;
  otp?: string[];
}
interface savedData {
  currentEmail?: string;
  newEmail?: string;
  otp?: string[];
}

interface verifyNewemail {
  formData?: {
    email?: string;
  }
}


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VerfiyNewEmail: FC<verifyNewemail> = ({

}) => {

  const { data: response,loading, fetchData } = useFetch<any>();
  const { data: session } = useSession();
  const { register, handleSubmit, setValue, reset, setError, formState: { errors }, clearErrors, getValues } = useForm<FormData>();
  const [disabled, setDisabled] = useState(true);
  const [step, setStep] = useState<number>(2);
  const [loadingbtn, setLoadingbtn] = useState<boolean>(false);
  const [loadingbtnverify, setLoadingbtnverify] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState(0); // Timer in seconds
  const [canResend, setCanResend] = useState(false);
  const [resendData, setResendData] = useState<savedData>();
  const [initialSend, setInitialSend] = useState(true);
  const [clearotptime, setClearotptime] = useState<boolean>()



  /**
   * This function handles the form submission for updating user email and handling OTP validation.
   * 
   * Error Handling:
   * - If an error occurs during the request, it is caught and logged to the console.
   */



  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setLoadingbtnverify(true)
      if (step === 2 && data?.newEmail && !emailRegex.test(data?.newEmail)) {
        setError("newEmail", { message: "Invalid email format" });
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
      setClearotptime(true)

    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      setLoadingbtnverify(false)
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
      const newEmail = getValues("newEmail");
      if (newEmail === "" || newEmail === null || newEmail === undefined) {
        setError("newEmail", { message: "Please fill out this field" });
        return;
      }

      if (!emailRegex.test(newEmail)) {
        setError("newEmail", { message: "Invalid email format" });
        return;
      }

      const payload = {
        newEmail: newEmail,
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
      setLoadingbtn(true)
      await fetch(`${process.env.NEXT_PUBLIC_APIURL}/resend-otp`, {
        method: "POST",

        body: JSON.stringify({ email: getValues('newEmail') }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: session?.token ? `Bearer ${session?.token}` : "",
        }
      }).then(res => {
        if (res.ok) {
          setStartTimer(180); // Reset timer to 60 seconds
          setCanResend(false); // Disable resend option temporarily
          toast.success("OTP resent successfully");
        } else {
          toast.error("Failed to resend OTP");
        }
      });
    } catch (error) {
      console.log("Error resending OTP:", error);
    } finally {
      setLoadingbtn(false)
    }
  };



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



  /**
   * This effect runs whenever the `response` object changes.
   */
  useEffect(() => {
    
    if (response?.otp === true) {
      // setValue('otp', ['', '', '', '', '', '']);
      // reset();
      // setStartTimer(0)
      // setInitialSend(false)
      // setDisabled(true);

      setValue('otp', ['', '', '', '', '', '']);
      reset();
      setStartTimer(0)
      setInitialSend(true)
      setStep(2);
      setDisabled(true);
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



  return (
    <div className="py-4 sm:py-[30px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className='flex justify-between items-end gap-x-[10px] sm:gap-x-5' >
            <Input
              register={register}
              label={"New Email"}
              name="newEmail"
              placeholder={`Enter new email`}
              onChange={() => clearErrors("newEmail")}
                className='!py-[13px] px-4 sm:px-5'
            />
            {startTimer > 0 ? (
              <Button className='bg-primary-100 text-white capitalize  leading-6 transition-all duration-300 hover:bg-[#872fcb] py-[13px] px-[10px] sm:px-[30px] text-nowrap text-sm sm:text-base font-normal' variant='primary' type='button' disabled={true} >
                Resend OTP in {Math.floor(startTimer / 60)}:{(startTimer % 60).toString().padStart(2, '0')}
              </Button>
            ) : (

              <button
                className="bg-primary-100 text-white capitalize font-normal leading-6 transition-all duration-300 hover:bg-[#872fcb] py-[13px] px-[10px] sm:px-[30px] text-nowrap text-sm sm:text-base"
                type="button"
                onClick={() => !initialSend ? resendCode() : handleEmmailUpdate()}
              >
                {initialSend ? (
                  loadingbtn ? <Icon className='w-7 h-7' name="loadingicon" /> : "send otp"
                ) : (
                  loadingbtn ? <Icon className='w-7 h-7' name="loadingicon" /> : "Resend Code"
                )}
              </button>
            )}
          </div>
          {errors?.newEmail && <p className="text-red-500">{errors?.newEmail?.message}</p>}
        </div>
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10">
          <label className="text-lg font-normal leading-7 text-neutral-900 mb-2">Please enter one time OTP</label>
          <InputOtp
            className="space-x-5 mt-[10px] mx-4 sm:m-5"
            register={register}
            setValue={setValue}
            clearErrors={clearErrors}
            reset={step === 2}
          />
          {errors?.otp && <p className="text-red-500">{errors?.otp?.message}</p>}
          <p className="mt-5 text-xs font-normal text-[#4B5563]">
            Please check your mail for a 6-digit confirmation code to {session?.email}. Enter the confirmation code to verify.
          </p>
          <div className="mt-[30px] sm:mt-10">
            <Button
              loadingbtn={loadingbtnverify}
              iconClass='w-7 h-7' className="w-full py-2 sm:py-[13px] text-lg font-normal text-center justify-center"   type="submit" variant="primary"
              disabled={disabled}>
              {
                loadingbtnverify ? "" : "Verify Now"
              }
            </Button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default VerfiyNewEmail;