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
 * @returns {JSX.Element} The rendered Page component.
 */
const Page = () => {
  return (
    <>
      <BreadCrumbs />
      <ProductBanner />
      <ProductDescription />
      <RelatedProducts />
    </>
  );
}

export default Page;
