import { ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

// export interface dropdownprops {
//   testclass?: string;
//   heading: string;
//   children: ReactNode;
//   image?: string;
//   className?: string;
//   directionshovercontent?: string;
//   arrow?: string;
//   allcateDropdown?: any;
//   onclick?: boolean;
//   arrowimageclass?: string;
//   positionsta?: boolean;
// }

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
  type?: "button" | "submit" | "reset"; 
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: boolean;
  iconClass?: string;
  link?: string;
  className?: string;
  linkclass?: string;
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
  items: string[];
  setItems: (items: string[]) => void;
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


export interface CheckBoxComponentProps {
  label: string;
  detailText: string;
  image: string
}



export interface AccordionData {
  title: string;
  content: string;
}


export interface Downloadpopuptype {
  openPopup: () => void;
  closePopup: () => void;
}





export interface DownloadTemplatetype {
  isFirstPopupOpen: boolean
  setIsFirstPopupOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface dashinput{
  placeholder?:string,
  value?:string,
  className?:string,
  type?:string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export type FormData = {
  name: string;
  email: string;
  password: string;
};

export type ValidFieldNames = | "email"| "password" | "name" ;

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};