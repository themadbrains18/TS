import React from 'react';
import ProductBanner from './components/ProductBanner';
import RelatedProducts from './components/RelatedProducts';
import ProductDescription from './components/ProductDescription';
import BreadCrumbs from './components/BreadCrumbs';

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
  const { id } = params; // Get the template id from the URL parameters

  // Fetch the template data from the API

  const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 1800 }
  });


  if (!response.ok) {
    throw new Error('Template not found'); // You can also redirect or show a 404 page
  }

  const template = await response.json(); // Parse the JSON response



  return (
    <>
      <BreadCrumbs />
      <ProductBanner template={template} />
      <ProductDescription template={template} />
      <RelatedProducts />
    </>
  );
};

export default Page;
