import React from 'react'
import { whatsnewprops } from '@/types/type'
import Image from 'next/image'

/**
 * WhatsnewCard component displays a card showing new updates with an icon, title, and description.
 *
 * @component
 * @param {whatsnewprops} props - The properties passed to the component.
 * @param {string} props.icons - The filename of the icon to be displayed.
 * @param {string} props.title - The title of the update.
 * @param {string} props.description - A brief description of the update.
 * @returns {JSX.Element} The rendered WhatsnewCard component.
 */


const WhatsnewCard: React.FC<whatsnewprops> = ({ icons, title, description }) => {
  return (
    <>
      <div className='py-4 px-5 border-2 border-divider-100 flex gap-x-4'>
        <div>
          <Image src={`/icons/${icons}`} width={30} height={30} alt='icons' />
        </div>
        <div>
          <h3 className='text-subheading leading-6 font-semibold text-sm tab:text-base'>{title}</h3>
          <p className='text-subparagraph mt-[10px] leading-6 text-sm tab:text-base'>{description}</p>
        </div>
      </div>
    </>
  )
}

export default WhatsnewCard