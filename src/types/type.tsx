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

export interface navcardprops {
  tittle?: string,
  image?: string,
  icon?: string,
  iconclass?: string,
  tittleclass?: string,
  imageclass?: string
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "liquid" | "solidicon";
  isLoading?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: boolean;
  iconClass?: string;
  link?: string;
  className?: string
}

export interface navdropdownprops {
  tittle: string;
}

export interface AccordionProps {
  title: string;
  children: ReactNode;
}

export interface techcardprops {
  image?: string,
  tittle?: string,
  tittleclass?: string,
  imageclass?: string,
  className?: string,
  container?: string
}

export interface featurecardprops {
  poster?: string,
  tittle?: string,
  themeicon?: string,
  uploadericon?: string,
  uploadername?: string,
  category?: string,
  buttonprops?: string,
  totalimages?: number,
  currentimage?: number
}

export interface buissnesscardprops {
  tittle?: string,
  logo?: string
}



export interface ProductFiltersidetype {
  items: any;
  setItems: any;
  closefilter: () => void;
}




export interface CheckboxProps {
  value: string;
  id: string;
  setItems: (items: string[]) => void;
  items: string[];
  className?: string;
  labelClass?: string;
}

export interface whatsnewprops {
  icons?: string,
  tittle?: string,
  description?: string
}
