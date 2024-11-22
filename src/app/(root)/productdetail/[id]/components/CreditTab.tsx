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
    // console.log(credits?.length, "credits")

    return (
        <>
            {credits?.map((credit, index) => (
                <div key={index} className="mt-10 lg:mt-20">
                    <h3 className="text-xl font-bold leading-7">Sources</h3>
                    {credits?.length > 0 ? (
                        <div className="mt-5 py-5 px-[10px] md:py-10 md:px-[50px] border border-divider-200">
                            <div className="grid md:grid-cols-2 grid-cols-1 mb-[10px] pb-[10px] md:pb-5 md:mb-5 border-b border-divider-200">
                                {credit?.fonts[0]?.name !== "" && <div>
                                    <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Fonts Used</h3>
                                    <ul className='list-inside list-disc m-0 p-0 '>
                                        {credit?.fonts?.map((font, fontIndex) => (
                                            <li key={fontIndex} className='line-clamp-2 text-xs tab:text-sm leading-5 '>
                                                {font?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>}
                                {credit?.icons[0]?.name !== "" && <div>
                                    <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Icons Used</h3>
                                    <ul className='list-inside list-disc m-0 p-0 '>
                                        {credit?.icons.map((icon, iconIndex) => (

                                            <li key={iconIndex} className='line-clamp-2 text-xs tab:text-sm leading-5 '>
                                                {icon?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>}
                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1">
                                {credit?.images[0]?.name !== "" && <div>
                                    <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Images Used</h3>
                                    <ul className='list-inside list-disc m-0 p-0 '>
                                        {credit?.images?.map((image, imageIndex) => (

                                            <li key={imageIndex} className='line-clamp-2 text-xs tab:text-sm leading-5 '>
                                                {image?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>}
                                {credit?.illustrations[0]?.name !== "" && <div>
                                    <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Illustrations Used</h3>
                                    <ul className='list-inside list-disc m-0 p-0 '>
                                        {credit?.illustrations?.map((illustration, illustrationIndex) => (
                                            <li key={illustrationIndex} className='line-clamp-2 text-xs tab:text-sm leading-5 '>
                                                {illustration?.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>}
                            </div>
                        </div>

                    ) : (
                        <p>Not found</p>
                    )}
                </div>
            ))}
        </>
    );
};
export default CreditTab;
