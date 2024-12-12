'use client'

import React, { FC, Fragment, useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { PreviewImage } from '@/types/type'
import FullScreen from '../../fullscreen/page'

// Skeleton Loader Component
const Skeleton = () => (
    <div className="w-full h-[400px] bg-gray-300 animate-pulse rounded-md"></div>
);

interface PreviewImagesProps {
    previewImages?: PreviewImage[],
    previewMobileImages?: PreviewImage[],
}

const Previewcom: FC<PreviewImagesProps> = ({ previewImages = [], previewMobileImages = [] }) => {
    const [activeButton, setActiveButton] = useState<number>(0);
    const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
    const [loadingProduct, setLoadingProduct] = useState<boolean>(previewImages.length === 0 && previewMobileImages.length === 0);

    const views = ['desktop', 'mobile responsive'];

    useEffect(() => {
        // Set loading to false when data is loaded
        if ((activeButton === 0 && previewImages.length > 0) ||
            (activeButton === 1 && previewMobileImages.length > 0)) {
            setLoadingProduct(false);
        } else {
            setLoadingProduct(true);
        }
    }, [activeButton, previewImages, previewMobileImages]);


    const handleGoBack = () => {
        setShowFullScreen(false)
    }

    return (
        <>
            {showFullScreen ? (
                <FullScreen handleGoBack={handleGoBack} previewImages={previewImages} previewMobileImages={previewMobileImages} />
            ) : (
                <section className="pt-10 md:pt-20 bg-bgcolor min-h-screen">
                    <div className="container">
                        <div className="flex items-center gap-x-5">
                            {views?.map((item, index) => (
                                <Fragment key={index}>
                                    <Button
                                        onClick={() => {
                                            setActiveButton(index);
                                        }}
                                        className={`capitalize py-2 px-5 ${activeButton === index
                                            ? 'bg-primary-100 text-white'
                                            : 'bg-primary-200 text-textparagraph hover:bg-white hover:text-primary-100'
                                            }`}
                                    >
                                        {item}
                                    </Button>
                                </Fragment>
                            ))}
                        </div>

                        <div className='pt-10'>
                            {activeButton === 0
                                ? (<>
                                    {
                                        previewImages && previewImages.length > 0 ?
                                            <div className='grid gap-y-5  tab:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-x-[30px]'>
                                                {
                                                    previewImages?.map((item, index) => (
                                                        <Fragment key={`desktop-${index}`}>
                                                            <Image
                                                                onClick={() => setShowFullScreen(true)}
                                                                className="cursor-pointer animate-zoom"
                                                                src={item.imageUrl}
                                                                width={358}
                                                                height={1000}
                                                                style={{ width: '100%' }}
                                                                alt="image"
                                                            />
                                                        </Fragment>
                                                    ))
                                                }
                                            </div>
                                            :
                                            previewImages && previewImages.length === 0 ?
                                                <p className='text-subparagraph font-medium items-center text-[30px]'>Template not found</p>
                                                :
                                                <div className='grid gap-y-5  tab:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-x-[30px]'>
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                    <Skeleton />
                                                </div>
                                    }
                                </>)
                                :
                                (<>
                                    {
                                        previewMobileImages && previewMobileImages.length > 0 ?
                                            <div className='grid gap-y-5  tab:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-x-[30px]'>
                                                {
                                                    previewMobileImages?.map((item, index) => (
                                                        <Fragment key={`mobile-${index}`}>
                                                            <Image
                                                                onClick={() => setShowFullScreen(true)}
                                                                className="cursor-pointer animate-zoom"
                                                                src={item.imageUrl}
                                                                width={358}
                                                                height={1000}
                                                                style={{ width: '100%' }}
                                                                alt="image"
                                                            />
                                                        </Fragment>
                                                    ))
                                                }
                                            </div>

                                            : <div className='grid gap-y-5  tab:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-x-[30px]'>
                                                <Skeleton />
                                                <Skeleton />
                                                <Skeleton />
                                                <Skeleton />
                                            </div>
                                    }
                                </>)
                            }
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Previewcom;
