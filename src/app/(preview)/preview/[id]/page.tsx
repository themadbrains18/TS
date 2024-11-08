

import React, { FC, Fragment, } from 'react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { PreviewImage } from '@/types/type'
import Previewcom from '../component/previewcom'



interface Params {
    id: string;
}

const Page = async ({ params }: { params: Params }) => {
    const { id } = params;


    const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 1800 }
    })

    if (!response.ok) {
        throw new Error('Template not found');
    }
    const res = await response.json()


    return (
        <>
            <Previewcom previewImages={res?.previewImages} previewMobileImages={res?.previewMobileImages} />
        </>
    )
}

export default Page