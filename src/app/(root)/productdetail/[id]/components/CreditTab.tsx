import React from 'react';

/**
 * CreditTab component displays the sources of fonts, icons, images, and illustrations used.
 *
 * @component
 * @example
 * return (
 *   <CreditTab credits={creditsData} />
 * )
 */

export interface Resource {
    url: string;
    name: string;
}

interface Credit {
    id: string;
    templateId: string;
    fonts: Resource[];
    images: Resource[];
    icons: Resource[];
    illustrations: Resource[];
}

interface CreditsProps {
    credits: Credit[];
}

const CreditTab: React.FC<CreditsProps> = ({ credits }) => {
    return (
        <>
            {credits.map((credit, index) => (
                <div key={index} className="mt-10 lg:mt-20">
                    <h3 className="text-xl font-bold leading-7">Sources</h3>
                    <div className="mt-5 py-5 px-[10px] md:py-10 md:px-[50px] border border-divider-200">
                        <div className="grid grid-cols-2 mb-[10px] pb-[10px] md:pb-5 md:mb-5 border-b border-divider-200">
                            {credit?.fonts[0]?.name !== "" && <div>
                                <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Fonts Used</h3>
                                {credit?.fonts?.map((font, fontIndex) => (
                                    <p key={fontIndex} className="text-xs tab:text-sm leading-5 text-primarycyan inline-block">
                                        {font?.name}
                                    </p>
                                ))}
                            </div>}
                            {credit?.icons[0]?.name !== "" && <div>
                                <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Icons Used</h3>
                                {credit?.icons.map((icon, iconIndex) => (
                                    <p key={iconIndex} className="text-xs tab:text-sm leading-5 text-primarycyan inline-block">
                                        {icon?.name}
                                    </p>
                                ))}
                            </div>}
                        </div>
                        <div className="grid grid-cols-2">
                            {credit?.images[0]?.name !== "" && <div>
                                <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Images Used</h3>
                                {credit?.images?.map((image, imageIndex) => (
                                    <p key={imageIndex} className="text-xs tab:text-sm leading-5 text-primarycyan inline-block">
                                        {image?.name}
                                    </p>
                                ))}
                            </div>}
                            {credit?.illustrations[0]?.name !== "" && <div>
                                <h3 className="text-subparagraph leading-6 mb-5 text-sm tab:text-base">Illustrations Used</h3>
                                {credit?.illustrations?.map((illustration, illustrationIndex) => (
                                    <li key={illustrationIndex}>
                                        <p className="text-xs tab:text-sm leading-5 text-primarycyan inline-block">
                                            {illustration?.name}
                                        </p>
                                    </li>
                                ))}
                            </div>}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
export default CreditTab;
