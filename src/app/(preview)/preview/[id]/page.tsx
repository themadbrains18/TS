

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



/**
 * The `Page` component fetches data based on the provided template ID and renders a preview of the template.
 * 
 * @param {Object} params - The route parameters.
 * @param {Params} params.id - The template ID to fetch data for.
 * 
 * @returns {JSX.Element} - A preview of the template or a NotFound component if the response is not valid.
 */
const Page = async ({ params }: { params: Params }) => {
    const { id } = params;


    const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        },
        next: { revalidate: 0 }
    })

    if (!response.ok) {
        return < NotFound />
    }

    // Parse the response as JSON
    const res = await response.json()

    // Render the preview component with the fetched data
    return (
        <>
            <Previewcom previewImages={res?.previewImages} previewMobileImages={res?.previewMobileImages} />
        </>
    )
}


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = params;

    try {
        const siteData = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${id}`, { headers: { 'ngrok-skip-browser-warning': 'true' } }).then((res) => res.json());

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