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
import { useDownload } from '@/app/contexts/DailyDownloadsContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Define the validation schema with Zod
 */
const emailSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
});


interface Downloadpopup {
    isPopupOpen: boolean;
    closePopup: () => void;
    openthirdpopup: () => void;
    id: string;
    url: string;
    tittle: string
}


const SendLink = ({ isPopupOpen, closePopup, openthirdpopup, id, url, tittle }: Downloadpopup) => {
    const { data: session } = useSession();
    const { data: response, error, loading, fetchData } = useFetch<any>();
    const { fetchDailyDownloads, downloads } = useDownload()

    const socialicons = [
        { icon: "dribbble-logo.svg" },
        { icon: "linkedin.svg" },
        { icon: "twitter.svg" },
        { icon: "behance.svg" },
        { icon: "instagram.svg" },
    ];

    /**
     * Set up React Hook Form
     */
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(emailSchema),
    });


    /**
     * Handle form submission
     */
    const onSubmit = async (data: any) => {
        try {
            data.url = url || "";
            data.userId = session?.id;
            await fetchData(`/templates/${id}/download`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
                false
            );
        } catch (err) {
            console.error('Error:', err);
        }
        reset()
    };

    /**
     * This `useEffect` hook listens for changes in the `response` object and performs two actions when `response` is available:
     * 
     * Dependencies:
     * - This effect runs every time the `response` object changes (i.e., when `response` is updated with new data).
     */
    useEffect(() => {

        if (response) {
            fetchDailyDownloads()
            openthirdpopup();
        }
    }, [response]);

    return (
        <Modal className='bg-[#E5EFFF] py-5 md:py-[30px] relative' isOpen={isPopupOpen} onClose={() => {
            closePopup();
            reset();
        }}>

            <div onClick={() => { closePopup(); reset(); }}>
                <Icon name="closeicon" className="cursor-pointer w-6 h-6 absolute top-5 right-5" />
            </div>

            <div className="max-w-[500px] w-full">
                <div className='flex pb-5 border-b border-[#878787] items-center px-5 md:px-[30px]'>
                    <h2 className='text-lg md:text-[20px] leading-7 font-semibold open_sans text-subheading'>
                        {tittle}
                    </h2>
                </div>
                <div className="px-[30px] flex justify-center items-center flex-col gap-5 md:gap-[39px] mt-5 md:mt-[50px]">
                    <p className='text-[16px] font-normal leading-6 open_sans text-subparagraph'>
                        You have 3 free downloads per day. Enter your email to get this product free.
                    </p>
                    <Image className='md:my-[35px] max-w-[232px] w-full' alt='img' src={'/images/sendemailpopimage.png'} width={232} height={148} />
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                        <input
                            type="text"
                            placeholder='Enter your email'
                            {...register('email')}
                            className={` auto-fill-color py-[18px] px-[15px] bg-white rounded-[5px] w-full placeholder:text-subparagraph outline-none ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                            <span className="text-red-500">
                                Email is invalid
                            </span>
                        )}
                        {error && <p className='mt-1 text-xs text-red-600'>{error}</p>}

                        <Button loadingbtn={loading} disabled={loading} type="submit" iconClass='w-7 h-7' variant='primary' className='w-full justify-center mt-4'>{
                            loading ? "" : "Send Link"
                        }</Button>
                    </form>
                </div>
                <div className='flex justify-center items-center flex-col pt-5 md:pt-[60px] px-5'>
                    <h3 className='text-[16p] font-normal leading-6 pb-[15px] open_sans text-subparagraph text-center'>
                        Join our community on social media for exclusive updates and design tips.
                    </h3>
                    <div className="flex items-center lg:max-w-[250px] w-full justify-between mt-5 md:mt-10 lg:mt-0">
                        {socialicons && socialicons.length > 0 && socialicons?.map((item, index) => (
                            <Fragment key={index}>
                                <Link href={'#'}>
                                    <Image className="transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.1] hover:rotate-6" width={30} height={30} src={`/icons/${item?.icon}`} alt="icons" />
                                </Link>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </Modal >
    );
};

export default SendLink;
