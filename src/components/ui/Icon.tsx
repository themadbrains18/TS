 

import React from 'react';

// Import all SVG icons
import Search from '/public/icons/Search.svg';
// Map icon names to components
const icons = {
    search:Search
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
    return <IconComponent width={size} height={size} fill={color ? color : 'transparent'} className={className} />;
};

export default Icon;