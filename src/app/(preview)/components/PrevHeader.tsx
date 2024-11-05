'use client'

import Icon from '@/components/Icon'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const PrevHeader = () => {
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/")
    };

    return (
        <div className='bg-bgcolor border-b border-divider-100 backdrop:blur-xl sticky top-0 z-20'>
            <div className='container'>
                <div className='py-[30px] flex flex-col md:flex-row justify-center gap-y-5  md:gap-0 md:justify-between items-center'>
                    <div>
                        <Link href={'/'}>
                            <Image src={'/icons/Logo.svg'} width={276} height={40} alt='logo' />
                        </Link>
                    </div>
                    <div className='flex items-center justify-between max-[768px]:w-full  gap-x-5'>
                        <Button className='py-2 px-5 tab:py-[13px] tab:px-[30px]'  >
                            Free — Download
                        </Button>
                        <Icon onClick={handleGoBack} name='crossicon' className='fill-subparagraph cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrevHeader