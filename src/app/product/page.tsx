import React from 'react';
import ProductMain from './components/ProductMain';

/**
 * This page component renders the main product section of the application.
 * It simply returns the `ProductMain` component, which contains all the product-related UI.
 *
 * @component
 * @example
 * return (
 *   <page />
 * )
 */
const page = () => {
    return (
        <ProductMain />
    );
}

export default page;
