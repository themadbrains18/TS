import { buissnesscardprops } from '@/types/type'
import Image from 'next/image'
import React from 'react'

const BuissnessCard:React.FC<buissnesscardprops> = ({logo,tittle}) => {
  return (
<>
<div className='p-[10px] flex items-center gap-x-[10px] md:gap-x-5 border border-divider-100 bg-white transition-all duration-300 hover:shadow-md cursor-pointer group hover:bg-[#FFF6FF] '>
<div className='rounded-md bg-[#FFF6FF] transition-all duration-300  group-hover:bg-white p-3'>
    <Image src={`/icons/${logo}`} width={40} height={40} alt='productlogo'/>
</div>
<div >
    <h3 className='text-xs md:text-base text-left'>{`${tittle}`}</h3>
</div>
</div>
</>  )
}

export default BuissnessCard