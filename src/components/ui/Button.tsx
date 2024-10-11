import React from "react";
import { cn } from "@/libs/utils";
import Icon from "../Icon";
import Link from "next/link";
import { ButtonProps } from "@/types/type";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  children,
  onClick,
  icon,
  iconClass,
  link,
  className
}) => {
  const buttonClasses = cn({
    "bg-primary-100 text-white capitalize font-semibold leading-6 transition-all duration-300 hover:bg-[#872fcb] py-[13px] px-[30px]":
      variant === "primary",
    "bg-primary-300  text-subheading capitalize ": variant === "secondary",
    "bg-white trasition-all duration-[0.3s] font-semibold leading-6 border-[1px] border-divider-100 hover:border-transparent hover:text-primary-100 capitalize py-2 px-5 hover:border-primary-100":
      variant === "liquid",
    "bg-white text-primary-100 capitalize leading-5 font-semibold":
      variant === "solidicon",
  });

  return (
    <>
      {
        link === undefined ?
          <button
            className={cn`${buttonClasses} ${className} flex items-center gap-x-[2px] cursor-pointer `}
            onClick={onClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : children}

            {icon === true ? (
              <Icon className={cn`${iconClass}`} name="soliddownicon" />
            ) : (
              ""
            )}
          </button>
          :
          <Link href={`${link}`}>  <button
            className={cn`${buttonClasses} ${className} flex items-center gap-x-[2px] cursor-pointer`}
            onClick={onClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : children}

            {icon === true ? (
              <Icon className={cn`${iconClass}`} name="soliddownicon" />
            ) : (
              ""
            )}
          </button> </Link>}
    </>
  );
};

export default Button;
