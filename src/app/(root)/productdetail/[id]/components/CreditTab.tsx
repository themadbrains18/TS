import Icon from '@/components/Icon';
import Link from 'next/link';
import React from 'react';
/*
 * Represents a resource with a URL and a name.
 * This interface is used for various types of resources (e.g., fonts, images, icons) that are referenced in credits.
 */
export interface Resource {
    url: string;
    name: string;
}

/*
 * Represents credits information associated with a template.
 * Each credit entry includes the ID of the credit, the template it belongs to, and arrays of resources (fonts, images, icons, illustrations).
 */
interface Credit {
    id: string;
    templateId: string;
    fonts: Resource[];
    images: Resource[];
    icons: Resource[];
    illustrations: Resource[];
}

/*
 * Props interface for the Credits component.
 * Contains an array of Credit objects, each representing credits information for a particular template.
 */
interface CreditsProps {
    credits: Credit[];
}

const CreditTab: React.FC<CreditsProps> = ({ credits }) => {
    console.log(credits, "creditscredits")

    return (
        <>
            {credits?.map((credit, index) => {
                // Check if all arrays are empty or contain empty names
                const hasContent =
                    credit.fonts.some(font => font.name !== "") ||
                    credit.icons.some(icon => icon.name !== "") ||
                    credit.images.some(image => image.name !== "") ||
                    credit.illustrations.some(illustration => illustration.name !== "");

                return (
                    <div key={index} className="md:p-20 p-8">
                        <h3 className="text-xl font-bold leading-7">Sources</h3>
                        {hasContent ? (
                            <div className="mt-5 py-5 px-[10px] md:py-10 md:px-[50px] border border-divider-200">
                                <div className="grid md:grid-cols-2 grid-cols-1 mb-[10px] pb-[10px] md:pb-5 md:mb-5 border-b border-divider-200 list-disc list-outside">
                                    {credit && credit?.fonts[0]?.name !== "" && (
                                        <div>
                                            <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Fonts Used</h3>
                                            <ul className='list-disc list-outside marker:text-[#5D5775]' >
                                                {credit?.fonts?.map((font, fontIndex) => (
                                                    <li key={fontIndex} className=" group relative text-xs tab:text-[16px] leading-5 text-[#1496F5] cursor-pointer ">
                                                        <Link className=' max-w-[550px] w-full' target='_blank' href={`${font?.url}`}>
                                                            {font?.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {credit?.icons[0]?.name !== "" && (
                                        <div>
                                            <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Icons Used</h3>
                                            <ul className='list-disc list-outside  marker:text-[#5D5775]' >
                                                {credit?.icons?.map((icon, iconIndex) => (
                                                    <li key={iconIndex} className="text-xs tab:text-[16px] leading-5 text-[#1496F5]   cursor-pointer ">
                                                        <Link className='max-w-[550px] w-full' target='_blank' href={`${icon?.url}`}>
                                                            {icon?.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="grid md:grid-cols-2 grid-cols-1">
                                    {credit.images[0]?.name !== "" && (
                                        <div>
                                            <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Images Used</h3>
                                            <ul className='list-disc list-outside marker:text-[#5D5775]' >
                                                {credit?.images?.map((image, imageIndex) => (
                                                    <li key={imageIndex} className="text-xs tab:text-[16px] leading-5 text-[#1496F5]   cursor-pointer ">
                                                        <Link className='max-w-[550px] w-full' target='_blank' href={`${image?.url}`}>
                                                            {image?.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {credit.illustrations[0]?.name !== "" && (
                                        <div>
                                            <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Illustrations Used</h3>
                                            <ul className='list-disc list-outside marker:text-[#5D5775] ' >
                                                {credit?.illustrations?.map((illustration, illustrationIndex) => (
                                                    <li key={illustrationIndex} className="text-xs tab:text-[16px] leading-5 text-[#1496F5]  cursor-pointer ">
                                                        <Link className='max-w-[550px] w-full' target='_blank' href={`${illustration?.url}`}>
                                                            {illustration?.name}
                                                        </Link>

                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 pt-4 text-center">No credits found for this template.</p>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default CreditTab;

