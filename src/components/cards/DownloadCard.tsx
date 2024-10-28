import Image from 'next/image'
import React, { FC } from 'react'
import downloadtemp from "@/../public/images/download.png"
import Icon from '../Icon'
import Button from '../ui/Button'
import { downloadcard } from '@/types/type'
import { cn } from '@/libs/utils'
const DownloadCard: FC<downloadcard> = ({
    date,
    image,
    tittle,
    bgClass,
    bgParentClass,
    dateClass,
    downloadClass,
    parentClass,
    tittleClass,
}) => {



    return (
        <>
            <section className={cn`p-[10px] md:p-5 bg-white ${parentClass}`}>
                <div className={cn`p-[10px] md:p-4 bg-primary-300 cursor-pointer ${bgParentClass}`}>
                    <Image className={cn`max-w-full w-full ${bgClass}`} src={downloadtemp} width={415} height={342} alt='download template' />
                </div>
                <div className= 'p-[10px] md:px-5  md:py-[15px] flex justify-between items-center'>
                    <div>
                        <h3 className={cn`text-subheading text-base md:text-xl leading-6 md:leading-7 font-semibold ${tittleClass}`}>{tittle}</h3>
                        <p className={cn`text-subheading text-xs leading-5 font-normal ${dateClass}`}>{date}</p>
                    </div>
                    <Button variant='primary' className={cn`p-2 max-w-[66px] w-full flex justify-center ${downloadClass}`} downloadicon={true} iconClass='w-5 h-5'></Button>
                </div>
            </section>
        </>
    )
}

export default DownloadCard