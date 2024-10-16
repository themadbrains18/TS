import { cn } from '@/libs/utils'
import { dashinput } from '@/types/type'
import React from 'react'

const DashInput:React.FC<dashinput> = ({className,placeholder,type,value, onChange}) => {
  return (
    <>
    <input type={type} placeholder={placeholder} value={value} className={cn` outline-none border border-neutral-400 rounded-md placeholder:text-neutral-500 placeholder:capitalize capitalize w-full p-3 ${className}`} />
    </>
  )
}

export default DashInput