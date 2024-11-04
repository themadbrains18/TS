

import React, { FC, Fragment, useState } from 'react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { PreviewImage } from '@/types/type'
import Previewcom from '../component/previewcom'


interface previewimagesprops {
    previewImages?: PreviewImage[],
    previewMobileImages?: PreviewImage[],
    params: Params;
}


interface Params {
    id: string;
}


const Page: FC<previewimagesprops> = ({ previewImages, previewMobileImages, params }) => {

    return (
        <>
            {/* <Previewcom /> */}
        </>
    )
}

export default Page