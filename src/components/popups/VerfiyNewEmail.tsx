import React, { FC, useEffect } from 'react'
import Modal from '../ui/Modal'
import { verifyoldemail } from '@/types/type'
import Input from '../ui/Input'
import Button from '../ui/Button'
import InputOtp from '@/app/(auth)/otp/components/Inputotp'
import { SubmitHandler, useForm } from 'react-hook-form'
import Icon from '../Icon'
import { useSession } from 'next-auth/react'
import useFetch from '@/hooks/useFetch'
import { useRouter } from 'next/navigation'

interface FormData {
  newEmail: String
  otp?: string[]
}

const VerfiyNewEmail: FC<verifyoldemail> = ({
  closePopup,
  isPopupOpen,
  handlepasswordUpdate
}) => {
  const router = useRouter();
  const { data: response, error, loading, fetchData } = useFetch<any>();
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // console.log(data, "==dhfhkjdh");

      // data.currentEmail = session ? session?.email : ""
      const joinedOtp = data?.otp && data?.otp.join('') || "";

      delete data?.otp
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
      if (response?.success) {
        router.push('/')
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  }


  useEffect(() => {
    if (response?.otp === true) {

    }

  }, [response])

  return (
    <>
    <p>New EMail</p>
      {/* <Modal isOpen={isPopupOpen} onClose={closePopup}>
        <div className='relative px-4 py-9 sm:py-[30px] sm:px-10 max-w-[616px] bg-gradient-to-b from-[#E5EFFF] to-[#E5EFFF]'>
          <Icon onClick={() => closePopup()} className='absolute top-5 right-5 fill-[#5D5775] w-5 h-5 cursor-pointer z-50' name="crossicon" />
          <div className='py-[50px]'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex justify-between items-end gap-x-[10px] sm:gap-x-5 gap-y-6'>
                <Input
                  register={register}
                  label='Enter New Password*'
                  name='email'
                  placeholder='Your Password'
                />
                <Input
                  register={register}
                  label='Confirm Password'
                  name='email'
                  placeholder='Your Password Again'
                />

                <Button className='w-full justify-center py-2 sm:py-[13px] text-lg font-normal leading-6' type='submit' variant='primary'>Save</Button>
              </div>

            </form>

          </div>
        </div>
      </Modal> */}
    </>
  )
}

export default VerfiyNewEmail