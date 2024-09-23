import React, { Fragment } from "react";
import Icon from "./Icon";
import Image from "next/image";
import Navimg from "@/../public/images/navimg.png";
import { navcardprops } from "@/types/type";
import Link from "next/link";
const NavCard: React.FC<navcardprops> = ({
  icon,
  iconclass,
  image,
  imageclass,
  tittle,
  tittleclass,
}) => {
  const data = [
    {
      tittle: "Room Sharing - UI Kit Te UI Kit Te UI Kit Te",
      image: "navimg.png",
      icon: "figma.svg",
    },
    {
      tittle: "Room Sharing - UI Kit Te UI Kit Te UI Kit Te",
      image: "navimg.png",
      icon: "figma.svg",
    },
    {
      tittle: "Room Sharing - UI Kit Te UI Kit Te UI Kit Te",
      image: "navimg.png",
      icon: "figma.svg",
    },
    {
      tittle: "Room Sharing - UI Kit Te UI Kit Te UI Kit Te",
      image: "navimg.png",
      icon: "figma.svg",
    },
    {
      tittle: "Room Sharing - UI Kit Te UI Kit Te UI Kit Te",
      image: "navimg.png",
      icon: "figma.svg",
    },
  ];

  return (
    <>
      {data?.splice(0, 4)?.map((item, index) => {
        return (
          <Fragment key={index}>
            <div className="max-w-[248px]  cursor-pointer drop-shadow-md">
              <div className="relative">
                <Image
                  src={`/images/${item.image}`}
                  width={248}
                  height={122}
                  alt="cardimage"
                />
                <div className="bg-subheading opacity-[0] absolute top-0 right-0 left-0 bottom-0 transition-all duration-200 hover:opacity-[0.45] flex justify-center items-center">
                  <Link
                    className="text-white leading-5 font-semibold opacity-[1] capitalize"
                    href={""}
                  >
                    {" "}
                    view details
                  </Link>
                </div>
              </div>
              <div className="flex items-center py-[10px] px-[15px]">
                <h4 className="mr-[2px] text-sm text-subheading leading-5 font-semibold text-ellipsis overflow-hidden text-nowrap">
                  {item.tittle}
                </h4>
                <div className="px-1 py-[3.2px]">
                  <Image
                    width={20}
                    height={20}
                    src={`/icons/${item.icon}`}
                    alt="icon"
                  />
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default NavCard;
