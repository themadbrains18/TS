import Icon from '@/components/Icon'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className='grid lg:grid-cols-2 lg:gap-x-5'>
                        <div className='pt-[125px] lg:max-w-[570px] w-full'>
                            <div className='relative'>
                                <Image width={200} height={40} src={"/images/Vector.png"} alt='vectorsicon' className='absolute top-0 left-0' />
                                <h3 className='text-lg text-subheading leading-7 font-semibold capitalize '>Trading of the Day</h3>
                            </div>
                            <div className='lg:max-w-[570px] w-full mt-2'>
                                <h1 className='text-[#1f124d] text-4xl leading-10 md:text-[55px] md:leading-[70px] font-extrabold' >Free High-quality UI kits and design resources</h1>
                            </div>
                            <div className='lg:max-w-[517px] w-full border-l-[4px] border-[#CCE0A5] pl-4 my-8'>
                                <p className='text-subheading text-xl leading-7'>
                                    Template Studio is the place to find high-quality design resources for designers, creative agencies and developers
                                </p>
                            </div>
                            <div className='flex gap-x-5'>
                                <div className='py-[10px] px-4 bg-[#cce0a519]'>
                                    <Icon className='w-[14px] h-6' name='figma' />
                                </div>
                                <div className='p-[10px] bg-[#cce0a519]'>
                                    <Icon className='w-6 h-6' name='xd' />
                                </div>
                                <div className='p-[10px] bg-[#cce0a519]'>
                                    <Icon className='w-6 h-6' name='diamond' />
                                </div>
                            </div>
                        </div>
                        <div className='relative pl-5 flex lg:max-w-[657px] w-full items-end h-[300px]  lg:h-auto mt-8 lg:mt-0 '>
                            <Image className='absolute top-0 left-0 w-[50%] h-[100%]' src={'/images/purplebg.png'} width={230} height={587} alt='purplebg' />
                            <div className=' lg:max-w-[635px] w-full relative'>
                                <div className='p-[10px] rounded-2xl  bg-white relative z-[4] inline-block '>
                                    <Image className='relative z-[4] max-w-[262px] md:max-w-[470px] w-full' src={'/images/scrollbg.png'} width={470} height={324} alt='purplebg' />

                                </div>
                                <p className='text-xs leading-5 text-subparagraph flex items-center gap-x-[6px] mt-[10px] mb-6 md:mb-[50px]'><span className='max-w-10 md:max-w-[129px] w-full h-[1px] bg-subheading'></span> NFT (Buy & Sell) <span className='text-textheading font-semibold'>Enefty</span> Template</p>
                            </div>
                            <Image className='max-w-[195px] md:max-w-[382px] w-full  absolute z-[2] top-[0rem] md:top-[4.6rem] right-[0%] lg:right-0' src={'/images/transparentbg.png'} width={382} height={229} alt='transparentbg' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection