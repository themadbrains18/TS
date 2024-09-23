import { ReactNode } from "react";

export interface dropdownprops {
    testclass?: string;
    heading: string;
    children: ReactNode;
    image?: string;
    className?: string;
    directionshovercontent?: string;
    arrow?: string;
    allcateDropdown?: any;
    onclick?: boolean;
    arrowimageclass?: string;
    positionsta?: boolean;
  }
  
  export interface navcardprops{
    tittle?: string,
    image?:string,
    icon?:string,
    iconclass?:string,
    tittleclass?:string,
    imageclass?:string
  }

  export interface ButtonProps {
    variant?: "primary" | "secondary" | "liquid" | "solidicon";
    isLoading?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
    icon?: boolean;
    iconClass?: string;
    link?: string;
    className?:string
  }

  export interface navdropdownprops {
    tittle: string;
  }