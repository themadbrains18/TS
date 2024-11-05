import React, { Fragment, useEffect } from 'react';
import Icon from '../Icon';
import Image from 'next/image';
import Button from '../ui/Button';
import Link from 'next/link';
import Modal from '../ui/Modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import useFetch from '@/hooks/useFetch';

// Define the validation schema with Zod
const emailSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
});


interface Downloadpopup {
    isPopupOpen: boolean;
    closePopup: () => void;
    openthirdpopup: () => void;
    id: string;
    url: string;
}


const SendLink = ({ isPopupOpen, closePopup, openthirdpopup, id, url }: Downloadpopup) => {
    const { data: session } = useSession();
    const { data: response, error, loading, fetchData } = useFetch<any>();

    const socialicons = [
        { icon: "dribbble-logo.svg" },
        { icon: "linkedin.svg" },
        { icon: "twitter.svg" },
        { icon: "behance.svg" },
        { icon: "instagram.svg" },
    ];

    // Set up React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(emailSchema),
    });


    // Handle form submission
    const onSubmit = async (data: any) => {
        try {
            data.url = url || "";
            data.userId = session?.id;  // Include userId only if it exists

            // Call your API here. Example:
            await fetchData(`/templates/${id}/download`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

        } catch (error) {
            console.error('Error:', error);
            // Handle error state
        }
    };


    useEffect(() => {
        if (response) {
            // If successful, you can handle the response here
            openthirdpopup(); // Open third popup after successful submission
        }
    }, [response]);

    return (
        <Modal className='bg-[#E5EFFF] py-5 md:py-[30px]' isOpen={isPopupOpen} onClose={closePopup}>
            <div className="max-w-[500px] w-full">
                <div className='flex pb-5 border-b border-[#878787] items-center px-5 md:px-[30px]'>
                    <h2 className='text-lg md:text-[20px] leading-7 font-semibold open_sans text-subheading'>
                        Enefty - NFT Marketplace UI Template Designed With Figma
                    </h2>
                    <div className='w-6 h-6'>
                        <Icon onClick={closePopup} name='closeicon' className='cursor-pointer w-6 h-6' />
                    </div>
                </div>
                <div className="px-[30px] flex justify-center items-center flex-col gap-5 md:gap-[39px] mt-5 md:mt-[50px]">
                    <p className='text-[16px] font-normal leading-6 open_sans text-subparagraph'>
                        You have just completed your 3 free downloads per day. Do not worry! Enter your email to get this product free.
                    </p>
                    <Image className='md:my-[35px] max-w-[232px] w-full' alt='img' src={'/images/sendemailpopimage.png'} width={232} height={148} />
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                        <input
                            type="text"
                            placeholder='Enter your email'
                            {...register('email')}
                            className={`py-[18px] px-[15px] bg-white rounded-[5px] w-full placeholder:text-subparagraph outline-none ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                            <span className="text-red-500">
                                {errors.email?.message }
                            </span>
                        )}
                        <Button type="submit" variant='primary' className='w-full justify-center mt-4'>Send Link</Button>
                    </form>
                </div>
                <div className='flex justify-center items-center flex-col pt-5 md:pt-[60px] px-5'>
                    <h3 className='text-[16p] font-normal leading-6 pb-[15px] open_sans text-subparagraph text-center'>
                        Help us to expand the designer's community
                    </h3>
                    <div className="flex items-center lg:max-w-[250px] w-full justify-between mt-5 md:mt-10 lg:mt-0">
                        {socialicons && socialicons.length>0 && socialicons?.map((item, index) => (
                            <Fragment key={index}>
                                <Link href={'#'}>
                                    <Image className="transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.1] hover:rotate-6" width={30} height={30} src={`/icons/${item?.icon}`} alt="icons" />
                                </Link>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SendLink;
