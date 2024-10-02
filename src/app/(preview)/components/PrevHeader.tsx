'use client'

import Icon from '@/components/Icon'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const PrevHeader = () => {
    const router = useRouter();

    const handleGoBack = () => {
      router.back(); // Goes back one step in the history
    };
    return (
        <>
            <header className='bg-white border-b border-divider-100 backdrop:blur-[20px]'>
                <div className='container'>
                    <div className='py-[30px] flex flex-col md:flex-row justify-center gap-y-10 md:gap-0 md:justify-between items-center'>
                        <div>
                            <Image src={'/icons/Logo.svg'} width={276} height={40} alt='logo' />
                        </div>
                        <div className='flex items-center gap-x-5'>
                            <Button className='py-[13px] px-[30px]' children='Free — Download' />
                            <Icon onClick={handleGoBack} name='crossicon' className='fill-subparagraph cursor-pointer' />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default PrevHeader