import React from "react";

// Import all SVG icons
import Search from "/public/icons/Search.svg";
import Cross from "/public/icons/crossicon.svg";
import Soliddownicon from "/public/icons/soliddownicon.svg";
import Figma from "/public/icons/figma.svg";
// Map icon names to components
const icons = {
  search: Search,
  crossicon: Cross,
  soliddownicon: Soliddownicon,
  figma: Figma,
};

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
};

const Icon: React.FC<IconProps> = ({ name, size = 20, color, className }) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      width={size}
      height={size}
      fill={color ? color : "transparent"}
      className={className}
    />
  );
};

export default Icon;
