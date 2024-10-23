import { ProductDetailProps } from '@/types/type';
import React from 'react';

/**
 * DescriptionTab component displays an overview with multiple paragraphs.
 *
 * @component
 * @example
 * return (
 *   <DescriptionTab description="Your description here" />
 * )
 */

// Define the props interface
interface DescriptionTabProps {
    description: string;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ description }) => {
    return (
        <div className='mt-10 lg:mt-20'>
            <h3 className='text-xl font-bold leading-7'>Overview</h3>
            <div className='flex flex-col items-center gap-y-5 pt-4 md:pt-5'>
                <p className='text-subparagraph leading-7 text-sm md:text-base'>{description}</p>
            </div>
        </div>
    );
}

export default DescriptionTab;
