"use client"
import React, { useState } from 'react'
import Profile from './profile'
import Download from './download'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { UserDetail } from '@/types/type'

interface profileProps{
    userData:UserDetail
}

const MainScreen:React.FC<profileProps> = ({userData}) => {
    
    const [activeTab, setActiveTab] = useState<number>(0)
    const { data: session } = useSession();
 
    

    return (
        <>
            <section className='py-5 lg:py-[100px] bg-bgcolor'>
                <div className="container">
                    <div className='flex justify-center'>
                        <div className='pt-5 pb-4 md:p-0 flex gap-x-[10px] tab:gap-x-[30px]'>
                            <button
                                onClick={() => setActiveTab(0)}
                                className={`text-nowrap flex items-center gap-x-[6px] py-[6px] px-5 leading-l font-semibold text-subparagraph capitalize bg-divider-100 border-b transition-all duration-200 hover:border-primary-100 ${activeTab === 0 ? 'border-primary-100' : 'border-transparent'}`}>
                                User
                            </button>
                            <button
                                onClick={() => setActiveTab(1)}
                                className={`text-nowrap flex items-center gap-x-[6px] py-[6px] px-5 leading-l font-semibold text-subparagraph capitalize bg-divider-100 border-b transition-all duration-200 hover:border-primary-100 ${activeTab === 1 ? 'border-primary-100' : 'border-transparent'}`}>
                                Downloads
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mt-[10px]'>
                    {activeTab === 0 ? <Profile session={session as Session}  userData={userData}/> : <Download />}
                </div>
            </section>
        </>
    )
}

export default MainScreen