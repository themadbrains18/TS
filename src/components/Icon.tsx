import React from "react";

// Import all SVG icons
import Search from "/public/icons/Search.svg";
import Cross from "/public/icons/crossicon.svg";
import Soliddownicon from "/public/icons/soliddownicon.svg";
import Figma from "/public/icons/figma.svg";
import SolidSearch from "/public/icons/solidsearch.svg";
import Menuicon from "/public/icons/Menu.svg";
import XD from "/public/icons/diamondlogo.svg";
import Diamond from "/public/icons/XDlogo.svg";
import Share from "/public/icons/share.svg";
import Mdb from "/public/icons/mdb.svg";
import filter from "/public/icons/filtericon.svg";
import arrow from "/public/icons/arrow.svg";
import closeicon from "/public/icons/closeicon.svg";
import closeiconfilter from "/public/icons/closeiconfilter.svg";
import sortaroow from "/public/icons/sortaroow.svg";
import Whatsnew from "/public/icons/whatsnew.svg";
import Publish from "/public/icons/publish.svg";
import Update from "/public/icons/update.svg";
import Star from "/public/icons/star.svg";
import Rightarrow from "/public/icons/rightarrow.svg";
import Facebook from "/public/icons/facebook.svg";
import Twitter from "/public/icons/twitterlogo.svg";
import Goggle from "/public/icons/goggle.svg";
import Iconleft from "/public/icons/Iconleft.svg";
import Rating from "/public/icons/Rating.svg";
import Ratingbottom from "/public/icons/ratingbottom.svg";
import Swipericon from "/public/icons/swipericon.svg";
import Showicon from '@/../public/icons/showicon.svg'
import Hideicon from '@/../public/icons/hiddenicon.svg'
import Deleteicon from '@/../public/icons/deleteicon.svg'
import Editicon from '@/../public/icons/editicon.svg'
import Sketch from '@/../public/icons/sketch.svg'
import Photoshop from '@/../public/icons/photoshop.svg'
import Adobexd from '@/../public/icons/adobexd.svg'
import Saveicon from '@/../public/icons/saveicon.svg'
import Setting from '@/../public/icons/setting.svg'
import DownloadIcon from '@/../public/icons/downloadicon.svg'
import Premium from '@/../public/icons/premium.svg'
import Reactjs from '@/../public/icons/reactjs.svg'
import Nextjs from '@/../public/icons/nextjs.svg'
import Tailwind from '@/../public/icons/tailwind.svg'
import Productfilterclose from '@/../public/icons/productfilterclose.svg'
import LoadingIcon from '@/../public/icons/loadingicon.svg'
import PurpleLoader from '@/../public/icons/purpleloader.svg'
import Linevertical from '@/../public/icons/linevertical.svg'
import Bouncingcircles from '@/../public/icons/bouncingcircles.svg'
import { cn } from "@/libs/utils";

// Map icon names to components
const icons = {
  search: Search,
  crossicon: Cross,
  soliddownicon: Soliddownicon,
  figma: Figma,
  solidsearch: SolidSearch,
  menuicon: Menuicon,
  xd: XD,
  diamond: Diamond,
  share: Share,
  mdb: Mdb,
  filter: filter,
  arrow: arrow,
  closeicon: closeicon,
  closeiconfilter: closeiconfilter,
  sortaroow: sortaroow,
  whatsnew: Whatsnew,
  publish: Publish,
  update: Update,
  star: Star,
  rightarrow: Rightarrow,
  facebook: Facebook,
  twitter: Twitter,
  goggle: Goggle,
  iconleft: Iconleft,
  rating: Rating,
  ratingbottom: Ratingbottom,
  swipericon: Swipericon,
  showicon: Showicon,
  deleteicon: Deleteicon,
  editicon: Editicon,
  hideicon: Hideicon,
  sketch: Sketch,
  photoshop: Photoshop,
  adobexd: Adobexd,
  saveicon: Saveicon,
  setting: Setting,
  downloadIcon: DownloadIcon,
  premium: Premium,
  reactjs: Reactjs,
  nextjs: Nextjs,
  tailwind: Tailwind,
  productfilterclose: Productfilterclose,
  loadingicon: LoadingIcon,
  purpleloader: PurpleLoader,
  linevertical: Linevertical,
  bouncingcircles: Bouncingcircles
};

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
  onClick?: () => void
};

const Icon: React.FC<IconProps> = ({ name, size = 20, color, className, onClick }) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      width={size}
      height={size}
      fill={color ? color : "transparent"}
      className={cn`${className}`}
      onClick={onClick}
    />
  );
};

export default Icon;
