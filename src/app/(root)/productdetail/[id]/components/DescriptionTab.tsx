import React, { useState } from 'react';


/**
 * Define the props interface
 */
interface DescriptionTabProps {
    description: string;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({ description }) => {

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const maxLength = 1500; // Set the max length for the description preview
    const descriptions = description || '';
    const isLongDescription = descriptions.length > maxLength;
    return (
        <div className='mt-10 lg:mt-20'>
            <h3 className='text-xl font-bold leading-7'>Overview</h3>
            <div className='flex flex-col items-center gap-y-5 pt-[15px] md:pt-5'>
                <div
                    dangerouslySetInnerHTML={{
                        __html: showFullDescription || !isLongDescription
                            ? descriptions
                            : descriptions.slice(0, maxLength)
                    }}
                    className='text-subparagraph leading-7 text-sm md:text-base'
                />
                {isLongDescription && (
                    <button onClick={toggleDescription} className=" text-[14px] font-normal leading-5 text-primary-100">
                        {showFullDescription ? 'Read Less' : 'Read More'}
                    </button>
                )}

            </div>
        </div>
    );
}

export default DescriptionTab;
