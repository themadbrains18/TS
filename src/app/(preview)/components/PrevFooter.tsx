import Link from 'next/link'
import React, { Fragment } from 'react'

const PrevFooter = () => {
    const agreements = [
        "licensing",
        "terms & conditions",
        "privacy policy"
    ]
    const date = new Date()
    return (
        <>
            <footer className='bg-bgcolor'>
                <div className='container'>
                    <div className='flex flex-col md:flex-row items-center justify-center md:justify-between item-center py-5 gap-y-5 md:gap-0 md:pt-[30px] md:pb-10'>
                        <div>
                            <p className='cursor-pointer text-center'>Template Studio | © {date.getFullYear()} All Rights Reserved</p>
                        </div>
                        <div className='flex items-center md:flex-row flex-col gap-y-[15px]   gap-x-[25px]'>
                            {
                                agreements?.map((item, index) => {
                                    return (<Fragment key={index}>
                                        <Link href={'#'}><div className="h-6  overflow-hidden group inline-block"><p className="flex flex-col transition-all duration-500 group-hover:-translate-y-[26px]">
                                            <span className="text-subparagraph leading-6 capitalize text-nowrap ">{item}</span>
                                            <span className=" capitalize transition-all duration-500 text-subheading group-hover:border-b-[1px] group-hover:border-subheading text-nowrap">{item}</span>
                                        </p></div></Link>
                                    </Fragment>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default PrevFooter