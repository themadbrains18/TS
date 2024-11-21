

import React, { FC, Fragment, } from 'react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { PreviewImage } from '@/types/type'
import Previewcom from '../component/previewcom'
import { Metadata } from 'next'
import NotFound from '@/app/not-found'



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
        next: { revalidate: 0 }
    })

    if (!response.ok) {
        return < NotFound />
    }
    const res = await response.json()


    return (
        <>
            <Previewcom previewImages={res?.previewImages} previewMobileImages={res?.previewMobileImages} />
        </>
    )
}


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = params;

    try {
        const siteData = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${id}`).then((res) => res.json());

        return {
            title: siteData.title || 'Template Studio - Product Details',
            description: siteData.description || 'Discover detailed insights about our templates and products.',
            openGraph: {
                title: siteData.title || 'Template Studio - Product Details',
                description: siteData.description || 'Discover detailed insights about our templates and products.',
                images: siteData.images || ['/images/default-og-image.jpg'],
            },
            twitter: {
                title: siteData.title || 'Template Studio - Product Details',
                description: siteData.description || 'Discover detailed insights about our templates and products.',
            },
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return {
            title: 'Template Studio - Discover Our Products',
            description: 'Explore our collection of creative templates and innovative products.',
            openGraph: {
                title: 'Template Studio - Discover Our Products',
                description: 'Explore our collection of creative templates and innovative products.',
                images: ['/images/default-og-image.jpg'],
            },
            twitter: {
                title: 'Template Studio - Discover Our Products',
                description: 'Explore our collection of creative templates and innovative products.',
            },
        };
    }
}

export default Page