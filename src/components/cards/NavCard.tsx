import React, { useState } from "react";
import Image from "next/image";
import { navcardprops } from "@/types/type";
import Link from "next/link";



/**
 * NavCard component displays a navigation card with an image, title, and icon.
 * It includes a hover effect that shows a link to view details.
 *
 * @component
 * @param {navcardprops} props - The properties passed to the component.
 * @param {string} props.icon - The filename of the icon to be displayed.
 * @param {string} props.iconclass - Additional CSS classes for the icon (not used in the current implementation).
 * @param {string} props.image - The filename of the image to be displayed.
 * @param {string} props.imageclass - Additional CSS classes for the image (not used in the current implementation).
 * @param {string} props.title - The title of the navigation card.
 * @param {string} props.titleclass - Additional CSS classes for the title (not used in the current implementation).
 * @returns {JSX.Element} The rendered NavCard component.
 */


const NavCard: React.FC<navcardprops> = ({
  id,
  icon,
  image,
  title,
  classname
}) => {
  const [imgSrc, setImgSrc] = useState(image ? image : '/images/featureimg.png');

  const handleImageError = () => {
    setImgSrc('/images/featureimg.png'); // Fallback image with a leading slash
  };
  return (
    <>
      <div className=" cursor-pointer border border-divider-100">
        <div className={`relative ${classname} `}>
          <div className=" h-[106px]  object-cover" >
            <Image
              src={imgSrc}
              width={218}
              height={106}
              alt="cardimage"
              onError={handleImageError}
              className=" max-h-[106px] w-full object-cover"
            />
          </div>
          <div className="bg-subheading opacity-[0] absolute top-0 right-0 left-0 bottom-0 transition-all duration-200 hover:opacity-[0.45] flex justify-center items-center">
            <Link
              className="text-white leading-5 font-semibold opacity-[1] capitalize"
              href={`productdetail/${id}`}
            >
              view details
            </Link>
          </div>
        </div>
        <div className="flex items-center py-[10px] px-[15px] justify-between " >
          <h4 className="mr-[2px] text-sm text-subheading leading-5 font-semibold text-ellipsis overflow-hidden text-nowrap">
            {title}
          </h4>
          <div className="px-1 py-[3.2px] w-6 h-6">
            <Image
              width={20}
              height={20}
              src={`/icons/figma.svg`}
              alt="icon"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavCard;
