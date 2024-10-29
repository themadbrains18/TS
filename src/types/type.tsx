import { Resource } from "@/app/(root)/productdetail/[id]/components/CreditTab";
import { ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface navcardprops {
  title?: string,
  image?: string,
  icon?: string,
  iconclass?: string,
  titleclass?: string,
  imageclass?: string
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "liquid" | "solidicon" | "basic";
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: boolean;
  iconClass?: string;
  link?: string;
  className?: string;
  linkclass?: string;
  saveicon?: boolean;
  downloadicon?: boolean;
  editicon?: boolean;
  direction?: string;
  hideChild?: string
}


export interface navdropdownprops {
  title: string;
  subCat?: subCat[]
}
export interface navtabprops {
  // title: string;
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
  title?: string,
  titleclass?: string,
  imageclass?: string,
  className?: string,
  container?: string
}

export interface featurecardprops {
  id?: string
  poster?: string,
  title?: string,
  themeicon?: string,
  uploadericon?: string,
  uploadername?: string,
  category?: string,
  buttonprops?: string | number,
  totalimages?: number,
  currentimage?: number,
  isPaid?: boolean,
}

export interface buissnesscardprops {
  title?: string,
  logo?: string
}



export interface ProductFiltersidetype {
  items: string[];
  setItems: (items: string[]) => void;
  closefilter: () => void;
  setSelectedFilters: any
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
  title?: string,
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
  id:string
  url:string
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

export interface TemplateResponse {
  data: TechTemplate[];
  pagination: Pagination;
}

interface Pagination {
  totalTemplates: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface TechTemplate {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string | null;
  version: string;
  userId: string;
  downloads: number;
  createdAt: string;
  updatedAt: string;
  industryTypeId: string;
  templateTypeId: string;
  subCategoryId: string;
  softwareTypeId: string;
  mobileVersion: string | null;
  documentationReady: boolean | null;
  techDetails: string[];
  seoTags: string[];
  isPaid: boolean;
  credits: Credit[];
  sliderImages: Image[];
  previewImages: Image[];
  previewMobileImages: Image[];
  sourceFiles: SourceFile[];
  softwareType: SoftwareType;
  subCategory: SubCategory;
  templateType: SubCategory;
  user: User;
}

interface Credit {
  id: string;
  fonts: Resource[];
  images: Resource[];
  icons: Resource[];
  illustrations: Resource[];
  templateId: string;
}

interface Image {
  id: string;
  imageUrl: string;
  templateId: string;
}

interface SourceFile {
  id: string;
  fileUrl: string;
  templateId: string;
}

export interface SoftwareType {
  id: string;
  name: string;
  templateTypeId: string;
}

interface SubCategory {
  id: string;
  name: string;
  templateTypeId: string;
}
export interface Industry {
  id: string;
  name: string;
  templateTypeId: string;
}

interface User {
  name: string;
  id?:string | undefined
}

export interface ProductDetailProps {
  template: TechTemplate;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface downloadcard {
  image: string,
  tittle: string,
  date: string,
  tittleClass?: string,
  dateClass?: string,
  downloadClass?: string,
  bgClass?: string,
  parentClass?: string,
  bgParentClass?: string,
  premium?:boolean
}

export interface verifyoldemail {
  isPopupOpen: boolean,
  closePopup: () => void;
  register?:UseFormRegister<any>
}