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
  arrow: arrow
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
      className={className}
      onClick={onClick}
    />
  );
};

export default Icon;
