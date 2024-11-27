import React, { Suspense } from 'react';
import ProductBanner from './components/ProductBanner';
import RelatedProducts from './components/RelatedProducts';
import ProductDescription from './components/ProductDescription';
import BreadCrumbs from './components/BreadCrumbs';
import { Metadata } from 'next';
import NotFound from '@/app/not-found';

/**
 * Page component renders the product detail page, including the breadcrumbs,
 * product banner, product description, and related products sections.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.template - The template data fetched from the server.
 * @returns {JSX.Element} The rendered Page component.
 */


interface Params {
  id: string;
}



const Page = async ({ params }: { params: Params }) => {


  const { id } = params;

  /**
   *  Fetch the template data from the API
   */

  const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 0 }
  });


  /**
   * You can also redirect or show a 404 page
  */
  if (!response.ok) {
    return < NotFound />
    //  throw new Error('Template not found');
  }

  /**
   * Parse the JSON response
  */

  const template = await response.json();

  // Custom Spinner Component
  const CustomSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#872fcb] rounded-full animate-spinCustom"></div>
    </div>
  );


  return (
    <>
      <Suspense fallback={<CustomSpinner />}>
        <div>
          <div className=' relative xl:after:h-full xl:after:w-full xl:after:absolute xl:after:top-0 xl:after:left-0 xl:after:bg-[url(/images/bgeffect.png)] after:z-[-1] ' >
            <BreadCrumbs />
            <ProductBanner template={template} />
            <ProductDescription template={template} />
          </div>
          <RelatedProducts />
        </div>
      </Suspense>

    </>
  );
};



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

export default Page;
