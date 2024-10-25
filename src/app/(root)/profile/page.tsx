import React from 'react'
import Profile from './components/profile'

const page = () => {
    return (
        <>
            <section className='py-[100px] bg-bgcolor'>
                <div className="container">
                    <div className='flex justify-end'>
                        <div className='flex gap-x-[30px]'>
                            <button
                                className={`text-nowrap flex items-center gap-x-[6px] py-[6px] px-5 leading-l font-semibold text-subparagraph capitalize bg-divider-100 border-b transition-all duration-200 hover:border-primary-100`}>
                                User
                            </button>
                            <button
                                className={`text-nowrap flex items-center gap-x-[6px] py-[6px] px-5 leading-l font-semibold text-subparagraph capitalize bg-divider-100 border-b transition-all duration-200 hover:border-primary-100`}>
                                Downloads
                            </button>
                        </div>
                    </div>
                </div>
                <div className='mt-[10px]'>
                <Profile />
                </div>
            </section>
        </>
    )
}

export default page