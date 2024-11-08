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
 
 
    return (
        <>
            {showFullScreen ? (
                <FullScreen previewImages={previewImages} previewMobileImages={previewMobileImages} />
            ) : (
                <section className="pt-10 md:pt-20 bg-bgcolor h-screen">
                    <div className="container">
                        <div className="flex items-center gap-x-5">
                            {views.map((item, index) => (
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

                        <div className="pt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-x-[30px] md:gap-y-10">
                            {activeButton === 0
                                ? previewImages.map((item, index) => (
                                    <Fragment key={`desktop-${index}`}>
                                        {loadingProduct ? (
                                            <Skeleton />
                                        ) : (
                                            <Image
                                                onClick={() => setShowFullScreen(true)}
                                                className="cursor-pointer"
                                                src={item.imageUrl}
                                                width={358}
                                                height={1000}
                                                style={{ width: '100%' }}
                                                alt="image"
                                            />
                                        )}
                                    </Fragment>
                                ))
                                : previewMobileImages.map((item, index) => (
                                    <Fragment key={`mobile-${index}`}>
                                        {loadingProduct ? (
                                            <Skeleton />
                                        ) : (
                                            <Image
                                                onClick={() => setShowFullScreen(true)}
                                                className="cursor-pointer"
                                                src={item.imageUrl}
                                                width={358}
                                                height={1000}
                                                style={{ width: '100%' }}
                                                alt="image"
                                            />
                                        )}
                                    </Fragment>
                                ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default Previewcom;
