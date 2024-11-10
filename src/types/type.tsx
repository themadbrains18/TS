import { Resource } from "@/app/(root)/productdetail/[id]/components/CreditTab";
import { ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

/**
 * Interface for defining properties of a navigation card.
 * @interface navcardprops
 */
export interface navcardprops {
  id?: string; // Unique identifier for the card
  title?: string; // Title of the card
  image?: string; // Image URL for the card
  icon?: string; // Icon for the card
  iconclass?: string; // Additional CSS classes for the icon
  titleclass?: string; // Additional CSS classes for the title
  imageclass?: string; // Additional CSS classes for the image
  classname?: string; // CSS class for the card container
  classnamemain?: string; // Main CSS class for the card container
  data?:TechTemplate
}

/**
 * Interface for defining properties of a button component.
 * @interface ButtonProps
 */
export interface ButtonProps {
  variant?: "primary" | "secondary" | "liquid" | "solidicon" | "basic"; // Button style variant
  isLoading?: boolean; // If true, shows loading state
  type?: "button" | "submit" | "reset"; // Type of the button
  children?: React.ReactNode; // Button content
  onClick?: () => void; // Click handler
  icon?: boolean; // If true, includes an icon
  iconClass?: string; // Additional CSS class for the icon
  link?: string; // URL for a link button
  className?: string; // Additional CSS classes for the button
  linkclass?: string; // CSS classes for the link
  saveicon?: boolean; // If true, show save icon
  downloadicon?: boolean; // If true, show download icon
  editicon?: boolean; // If true, show edit icon
  direction?: string; // Icon direction (e.g., left or right)
  hideChild?: string; // CSS class to hide child components
  disabled?: boolean; // If true, disables the button
  loadingbtn?: boolean; // If true, shows loading state for button
}

/**
 * Interface for defining properties of a navigation dropdown.
 * @interface navdropdownprops
 */
export interface navdropdownprops {
  title: string; // Title of the dropdown
  subCat?: subCat[]; // List of subcategories for the dropdown
}

/**
 * Interface for defining properties of a navigation tab.
 * @interface navtabprops
 */
export interface navtabprops {
  subCat?: subCat[]; // List of subcategories for the tab
  onSelect?: (id: string) => void; // Callback function to handle selection
  classname?: string; // CSS class for the tab
  opensearch?: boolean; // Whether the search is open
  setOpensearch?: React.Dispatch<React.SetStateAction<boolean>>; // State setter to toggle search
  openinput?: () => void; // Function to open input field
  mainclass?: string; // Main CSS class
  searchresults?: string; // Search result content
  resinputoff?: () => void; // Function to disable input
}

/**
 * Interface for defining subcategory structure.
 * @interface subCat
 */
export interface subCat {
  id: string; // Subcategory ID
  name: string; // Subcategory name
  templateTypeId?: string; // Template type ID associated with the subcategory
}

/**
 * Interface for defining properties of an accordion component.
 * @interface AccordionProps
 */
export interface AccordionProps {
  title: string; // Title of the accordion
  children: ReactNode; // Content to be displayed within the accordion
}

/**
 * Interface for defining properties of a tech card.
 * @interface techcardprops
 */
export interface techcardprops {
  image?: string; // Image URL for the card
  title?: string; // Title of the card
  titleclass?: string; // CSS class for the title
  imageclass?: string; // CSS class for the image
  className?: string; // CSS class for the card
  container?: string; // Container class for the card
  id?: string; // id for the card
  templateid?: string; //template id for the card
}

/**
 * Interface for defining properties of a feature card.
 * @interface featurecardprops
 */
export interface featurecardprops {
  id?: string; // Feature card ID
  poster?: string; // Poster image URL
  title?: string; // Title of the feature
  themeicon?: string; // Icon for the theme
  uploadericon?: string; // Icon for the uploader
  uploadername?: string; // Name of the uploader
  category?: string; // Category of the feature
  buttonprops?: number; // Number of buttons associated with the feature
  totalimages?: number; // Total number of images in the feature
  currentimage?: number; // Currently displayed image index
  isPaid?: boolean; // Whether the feature is paid or free
}

/**
 * Interface for defining properties of a business card component.
 * @interface buissnesscardprops
 */
export interface buissnesscardprops {
  title?: string; // Title for the business card
  logo?: string; // Logo image URL for the business
  id?: string; // id for the business
  templateType?: string; //template type id for the business
}

/**
 * Interface for defining product filter structure.
 * @interface ProductFiltersidetype
 */
export interface ProductFiltersidetype {
  items: string[]; // Selected filter items
  setItems: (items: string[]) => void; // Function to set selected filter items
  closefilter: () => void; // Function to close the filter panel
  setSelectedFilters: any; // Function to set selected filters
}


/**
 * Interface for defining checkbox component properties.
 * @interface CheckboxProps
 */

export interface CheckboxProps {
  value: string; // Checkbox value
  id: string; // ID of the checkbox
  setItems: (items: string[]) => void; // Function to update selected items
  items: string[]; // List of selected items
  classname?: string; // CSS class for the checkbox
  labelClass?: string; // CSS class for the label
}

/**
 * Interface for defining "What's New" section.
 * @interface whatsnewprops
 */
export interface whatsnewprops {
  icons?: string; // Icon URL for the "What's New" section
  title?: string; // Title of the section
  description?: string; // Description of the section
}

/**
 * Interface for defining properties of a checkbox component with an image.
 * @interface CheckBoxComponentProps
 */
export interface CheckBoxComponentProps {
  label: string; // Label for the checkbox
  detailText: string; // Detail text to be shown with the checkbox
  image: string; // Image URL associated with the checkbox
}

/**
 * Interface for defining accordion data structure.
 * @interface AccordionData
 */
export interface AccordionData {
  title: string; // Title of the accordion
  content: string; // Content within the accordion
}

/**
 * Interface for defining properties for download popup functionality.
 * @interface Downloadpopuptype
 */
export interface Downloadpopuptype {
  openPopup: () => void; // Function to open the popup
  closePopup: () => void; // Function to close the popup
}

/**
 * Interface for defining template download popup structure.
 * @interface DownloadTemplatetype
 */
export interface DownloadTemplatetype {
  isFirstPopupOpen: boolean; // Whether the first popup is open
  setIsFirstPopupOpen: React.Dispatch<React.SetStateAction<boolean>>; // State setter to control popup visibility
  id: string; // Template ID
  url: string; // Template download URL
  tittle: string,
  poster: string
}

/**
 * Interface for defining dashboard input properties.
 * @interface dashinput
 */
export interface dashinput {
  name?: string; // Name of the input field
  placeholder?: string; // Placeholder text for the input
  value?: string; // Value of the input field
  className?: string; // CSS class for the input field
  type?: string; // Input type (e.g., text, password)
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change handler for the input field
}

/**
 * Interface for defining form data structure.
 * @type FormData
 */
export type FormData = {
  name: string; // Name of the user
  email: string; // Email address of the user
  password: string; // Password of the user
};

/**
 * Valid field names for form data.
 * @type ValidFieldNames
 */
export type ValidFieldNames = | "email" | "password" | "name";

/**
 * Interface for defining form field properties.
 * @interface FormFieldProps
 */
export type FormFieldProps = {
  type: string; // Type of the field (e.g., text, password)
  placeholder: string; // Placeholder for the field
  name: ValidFieldNames; // Field name
  register: UseFormRegister<FormData>; // React Hook Form register function
  error: FieldError | undefined; // Error object for validation
  valueAsNumber?: boolean; // Whether to parse the value as a number
};

/**
 * Interface for defining form values.
 * @interface FormValues
 */
export interface FormValues {
  email: string; // Email value from the form
}

/**
 * Interface for defining properties of download popup component.
 * @interface Downloadpopup
 */
export interface Downloadpopup {
  isPopupOpen: boolean; // Whether the popup is open
  closePopup: () => void; // Function to close the popup
  opensecoundpopup: () => void; // Function to open second popup
  tittle: string,
  poster: string
}

/**
 * Interface for defining the structure of template response.
 * @interface TemplateResponse
 */
export interface TemplateResponse {
  data: TechTemplate[]; // Array of template data
  pagination?: Pagination; // Pagination information for template listing
}

/**
 * Interface for pagination details.
 * @interface Pagination
 */
interface Pagination {
  totalTemplates: number; // Total number of templates available
  totalPages: number; // Total number of pages
  currentPage: number; // Current page number
  limit: number; // Number of templates per page
}

/**
 * Interface for defining the structure of a tech template.
 * @interface TechTemplate
 */
export interface TechTemplate {
  id: string; // Template ID
  title: string; // Template title
  price: number; // Template price
  description: string; // Template description
  imageUrl: string | null; // Template image URL
  version: string; // Template version
  userId: string; // User ID who created the template
  downloads: number; // Number of downloads
  createdAt: string; // Date the template was created
  updatedAt: string; // Date the template was last updated
  industryTypeId: string; // Industry type ID associated with the template
  templateTypeId: string; // Template type ID
  subCategoryId: string; // Subcategory ID
  softwareTypeId: string; // Software type ID
  mobileVersion: string | null; // Mobile version (if applicable)
  documentationReady: boolean | null; // Whether documentation is ready for the template
  techDetails: string[]; // Technical details associated with the template
  seoTags: string[]; // SEO tags for the template
  isPaid: boolean; // Whether the template is paid
  credits: Credit[]; // Credits associated with the template
  sliderImages: PreviewImage[]; // Images for the slider
  previewImages: PreviewImage[]; // Preview images
  previewMobileImages: PreviewImage[]; // Mobile preview images
  sourceFiles: SourceFile[]; // Source files associated with the template
  softwareType: SoftwareType; // Software type associated with the template
  subCategory: SubCategory; // Subcategory information
  templateType: SubCategory; // Template type information
  user: User; // User who created the template
}

/**
 * Interface for defining credit information associated with the template.
 * @interface Credit
 */
interface Credit {
  id: string; // Credit ID
  fonts: Resource[]; // List of fonts used in the template
  images: Resource[]; // List of images used in the template
  icons: Resource[]; // List of icons used in the template
  illustrations: Resource[]; // List of illustrations used in the template
  templateId: string; // Template ID
}

/**
 * Interface for defining preview image details.
 * @interface PreviewImage
 */
export interface PreviewImage {
  id: string; // Image ID
  imageUrl: string; // Image URL
  templateId: string; // Associated template ID
}

/**
 * Interface for defining source file details.
 * @interface SourceFile
 */
interface SourceFile {
  id: string; // Source file ID
  fileUrl: string; // URL of the source file
  templateId: string; // Associated template ID
}

/**
 * Interface for defining software type.
 * @interface SoftwareType
 */
export interface SoftwareType {
  id: string; // Software type ID
  name: string; // Software type name
  templateTypeId: string; // Template type ID associated with the software
}

/**
 * Interface for defining subcategory structure.
 * @interface SubCategory
 */
interface SubCategory {
  id: string; // Subcategory ID
  name: string; // Subcategory name
  templateTypeId: string; // Template type ID associated with the subcategory
}

/**
 * Interface for defining industry type.
 * @interface Industry
 */
export interface Industry {
  id: string; // Industry type ID
  name: string; // Industry type name
  templateTypeId: string; // Template type ID associated with the industry
}

/**
 * Interface for defining user details.
 * @interface User
 */
interface User {
  name: string; // User's name
  id?: string; // User's ID
  profileImg?:string
}

/**
 * Interface for defining product detail properties.
 * @interface ProductDetailProps
 */
export interface ProductDetailProps {
  template: TechTemplate; // Template data to display in the product detail
}

/**
 * Interface for defining user login data.
 * @interface UserLogin
 */
export interface UserLogin {
  email: string; // User's email
  password: string; // User's password
}

/**
 * Interface for defining download card properties.
 * @interface downloadcard
 */
export interface downloadcard {
  image: string; // Image for the download card
  tittle: string; // Title of the download card
  date: string; // Date of the download card
  tittleClass?: string; // Optional CSS class for the title
  dateClass?: string; // Optional CSS class for the date
  downloadClass?: string; // Optional CSS class for download text
  bgClass?: string; // Background CSS class
  parentClass?: string; // Parent container CSS class
  bgParentClass?: string; // Parent background CSS class
  url?: string; // URL for the download
  premium?: boolean; // If true, indicates premium content
}

/**
 * Interface for defining verify old email popup structure.
 * @interface verifyoldemail
 */
export interface verifyoldemail {
  isPopupOpen: boolean; // Whether the popup is open
  closePopup: () => void; // Function to close the popup
  register?: UseFormRegister<any>; // Register function for form
  handlepasswordUpdate?: () => void; // Handler for updating password
}

/**
 * Interface for defining template structure.
 * @interface Template
 */
interface Template {
  title: string; // Title of the template
  price: number; // Price of the template
  sliderImages: PreviewImage[]; // Slider images associated with the template
  sourceFiles: SourceFile[]; // Source files associated with the template
}

/**
 * Interface for defining download interface.
 * @interface DownloadInterface
 */
export interface DownloadInterface {
  id: string; // Download ID
  userId: string; // User ID who downloaded the template
  email: string; // User's email
  templateId: string; // Template ID
  downloadedAt: string; // Date the template was downloaded
  template: Template; // Template details associated with the download
}

/**
 * Interface for defining user details.
 * @interface UserDetail
 */
export interface UserDetail {
  user: {
    id: string; // User's ID
    email: string; // User's email
    name: string; // User's name
    password: string; // User's password
    token: string | null; // Authentication token for the user
    profileImg: string; // Profile image URL
    number: string | null; // User's contact number
    freeDownloads: number; // Number of free downloads remaining
    role: "ADMIN" | "USER"; // User role (Admin or User)
    createdAt: string; // Date the user was created (ISO string)
    updatedAt: string; // Date the user was last updated (ISO string)
  }
}





export interface NotFoundinter {
  clearall: () => void
}