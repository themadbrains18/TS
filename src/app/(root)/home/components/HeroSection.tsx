"use client"
import Icon from '@/components/Icon'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {

    /**
     * Hero section component that highlights the main features, design resources, and animations.
     * 
     * @component
     * @example
     * return (
     *   <HeroSection />
     * )
     */

    return (
        <>
            <section className='bg-[url("/images/heropurplebg.png")] bg-no-repeat bg-cover bg-right animate-fade-up'>
                <div className="container">
                    <div className='grid lg:grid-cols-2 lg:gap-x-5 '>
                        <div className='pt-10 lg:pt-[125px] lg:max-w-[570px] w-full'>
                            <div className='relative'>
                                <Image width={200} height={40} src={"/images/Vector.png"} alt='vectorsicon' className='absolute top-0 left-0' />
                                {/* <h3 className='text-sm tab:text-lg text-subheading leading-7 font-semibold capitalize '>Trending of the Day</h3> */}
                                {/* animation text */}
                                <div className="animate two">
                                    <span>T</span><span>r</span><span>e</span><span>n</span><span>d</span><span>i</span><span>n</span><span>g</span>
                                    <span>&nbsp;</span><span>O</span><span>f</span><span>&nbsp;</span><span>T</span><span>h</span><span>e</span>
                                    <span>&nbsp;</span><span>D</span><span>a</span><span>y</span>
                                </div>
                            </div>
                            <div className='lg:max-w-[570px] w-full mt-[10px] tab:mt-5'>
                                <h1 className='text-darkpureple text-4xl leading-[43px] md:text-[55px] md:leading-[70px] font-extrabold' >Free High-quality UI kits and design resources</h1>
                            </div>

                            <div className='lg:max-w-[517px] w-full border-l md:border-l-[4px] border-[#CCE0A5] pl-1 md:pl-4 my-5 md:my-[30px]'>
                                <p className='text-subheading text-sm md:text-xl font-normal md:leading-7'>
                                    Template Studio is the place to find high-quality design resources for designers, creative agencies and developers
                                </p>
                            </div>

                            <div className='max-w-[200px] w-full overflow-hidden slider'>
                                <div className='flex gap-x-5 slide-track'>
                                    <div className='py-[10px] px-4 bg-[#cce0a519] slide'>
                                        <Icon className='w-[14px] h-6' name='figma' />
                                    </div>
                                    <div className='p-[10px] bg-[#cce0a519] slide'>
                                        <Icon className='w-6 h-6' name='xd' />
                                    </div>
                                    <div className='p-[10px] bg-[#cce0a519] slide'>
                                        <Icon className='w-6 h-6' name='diamond' />
                                    </div>
                                    <div className='py-[10px] px-4 bg-[#cce0a519] slide'>
                                        <Icon className='w-[14px] h-6' name='figma' />
                                    </div>
                                    <div className='p-[10px] bg-[#cce0a519] slide'>
                                        <Icon className='w-6 h-6' name='xd' />
                                    </div>
                                    <div className='p-[10px] bg-[#cce0a519] slide'>
                                        <Icon className='w-6 h-6' name='diamond' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='relative pl-5 flex lg:max-w-[657px] w-full items-end mt-[30px] lg:mt-0 '>
                            <Image className='absolute top-0 left-0 lg:max-w-[230px] w-[50%] h-[100%]' src={'/images/purplebg.png'} width={230} height={587} alt='purplebg' />
                            <div className='lg:max-w-[635px] w-full relative'>
                                <div className='p-[10px] rounded-2xl bg-white relative z-[4] inline-block max-w-[262px] tab:max-w-full mt-[50px] lg:mt-0 md:w-[70%] lg:max-w-[490px] lg:w-full  group cursor-pointer'>
                                    <div className='overflow-hidden h-[187px] tab:h-[344px]'>
                                        <Image className='relative z-[4] max-w-full lg:max-w-[470px] w-full transition-all ease-in-out duration-[7s] group-hover:translate-y-[-81%]' src={'/images/heroscroll.png'} width={470} height={324} alt='purplebg' />
                                    </div>

                                </div>
                                <p className='text-xs leading-5 text-subparagraph flex items-center gap-x-[6px] mt-[10px] mb-6 md:mb-[50px]'><span className='max-w-10 md:max-w-[129px] w-full h-[1px] bg-subheading'></span> NFT (Buy & Sell) <span className='text-textheading font-semibold'>Enefty</span> Template</p>
                                <Image className='lg:hidden absolute top-[1rem] tab:top-0 right-0 h-[167px] w-[200px] tab:w-auto tab:h-auto ' src={'/images/transparentbg.png'} width={382} height={229} alt='transparentbg' />
                            </div>
                            <Image className='hidden lg:block absolute top-[5rem] right-0 h-[167px] w-[200px] tab:w-auto tab:h-auto ' src={'/images/transparentbg.png'} width={382} height={229} alt='transparentbg' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection