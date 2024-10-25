import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  export const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB").format(date); // 'en-GB' format is DD-MM-YYYY
  };