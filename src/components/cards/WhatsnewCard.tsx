import React from 'react'
import Icon from '../Icon'
import { whatsnewprops } from '@/types/type'
import Image from 'next/image'

const WhatsnewCard:React.FC<whatsnewprops> = ({icons,tittle,description}) => {
  return (
    <>
    <div className='py-4 px-5 border-2 border-divider-100 flex gap-x-4'>
        <div>
            <Image src={`/icons/${icons}`} width={30} height={30} alt='icons'/>
        </div>
        <div>
            <h3 className='text-subheading leading-6 font-semibold'>{tittle}</h3>
            <p className='text-subparagraph mt-[10px] leading-6'>{description}</p>
        </div>
    </div>
    </>
  )
}

export default WhatsnewCard