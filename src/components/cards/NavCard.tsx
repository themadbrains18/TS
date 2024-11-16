import React, { useState } from "react";
import Image from "next/image";
import { navcardprops } from "@/types/type";
import Link from "next/link";
import Icon from "../Icon";



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
  data,
  classname, classnamemain, themeicon
}) => {
  const [imgSrc, setImgSrc] = useState(image ? image : '/images/featureimg.png');
  /**
   * Fallback image with a leading slash
   */
  const handleImageError = () => {
    setImgSrc('/images/featureimg.png');
  };

  return (
    <>
      <div className={` ${classnamemain} cursor-pointer border border-divider-100 `}>
        <div className={`relative ${classname}  `}>
          <div className=" h-auto  object-cover" >
            <Image
              src={data?.sliderImages[0]?.imageUrl || "/images/product1.png"}
              width={218}
              height={106}
              alt="cardimage"
              onError={handleImageError}
              className="  w-full h-auto object-cover"
            />
          </div>
          <Link
            href={`/productdetail/${id}`}
          >
            <div className="bg-subheading opacity-[0] absolute top-0 right-0 left-0 bottom-0 transition-all duration-200 hover:opacity-[0.45] flex justify-center items-center">
              <p className="text-white leading-5 font-semibold opacity-[1] capitalize relative z-10 "  >
                view details
              </p>
            </div>
          </Link>
        </div>
        <div className="flex items-center py-[10px] px-[15px] justify-between " >
          <h4 className="mr-[2px] max-w-[150px] text-sm text-subheading leading-5 font-semibold text-ellipsis overflow-hidden text-nowrap">
            {title}
          </h4>
          <div className="px-1 py-[3.2px] w-6 h-6">
            {
              themeicon === "Figma" ? <Icon className='max-w-6 w-full h-6' name='figma' /> : ""}
            {
              themeicon === "Adobe XD" ? <Icon className='max-w-6 w-full h-6' name='adobexd' /> : ""
            }
            {
              themeicon === "Sketch" ? <Icon className='max-w-6 w-full h-6' name='sketch' /> : ""
            }
            {
              themeicon === "PhotoShop" ? <Icon className='max-w-6 w-full h-6' name='photoshop' /> : ""
            }
            {
              themeicon === "ReactJs" ? <Icon className='max-w-6 w-full h-6' name='reactjs' /> : ""
            }
            {
              themeicon === "Tailwind Css" ? <Icon className='max-w-6 w-full h-6' name='tailwind' /> : ""
            }
            {
              themeicon === "NextJs" ? <Icon className='max-w-6 w-full h-6  fill-black' name="nextjs" /> : ""
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default NavCard;
