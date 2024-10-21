import { ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

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
  subCat?: subCat[]
}
export interface navtabprops {
  // tittle: string;
  subCat?: subCat[]
}

export interface subCat {
  id: string,
  name: string,
  templateTypeId?: string
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

export interface dashinput {
  name?: string,
  placeholder?: string,
  value?: string,
  className?: string,
  type?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export type FormData = {
  name: string;
  email: string;
  password: string;
};

export type ValidFieldNames = | "email" | "password" | "name";

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};


export interface FormValues {
  email: string;
}

export interface Downloadpopup {
  isPopupOpen: boolean,
  closePopup: () => void;
  opensecoundpopup: () => void;
}
