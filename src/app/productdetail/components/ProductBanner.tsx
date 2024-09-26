import Image from 'next/image'
import React from 'react'

const ProductBanner = () => {
    return (
        <>
            <section className='py-10'>
                <div className="container">
                    <div className='pt-10'>
                    <div className='flex items-center gap-x-2 my-5'>
                            <Image src={`/icons/mdb.svg`} width={20} height={20} alt='uploadericon' />
                            <p className='text-subparagraph text-sx leading-5 capitalize text-nowrap text-ellipsis overflow-hidden'>by <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{`themadbrains`}</span> <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{`UI templates`}</span></p>
                        </div>
                       <div className='grid grid-cols-[57.5%,42.5%] gap-x-[30px]'>
<div>ss</div>
<div></div>
                       </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductBanner