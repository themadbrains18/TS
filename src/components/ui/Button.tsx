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
  type = "button",
  icon,
  iconClass,
  link,
  className,
  linkclass,
  saveicon,
  editicon,
  direction,
  hideChild,
  downloadicon,
  disabled,
  loadingbtn
}) => {

  const buttonClasses = cn({
    "bg-primary-100 text-white capitalize font-semibold leading-6 transition-all duration-300 hover:bg-[#872fcb] py-[13px] px-[30px]":
      variant === "primary",
    "text-primary-100 py-2 px-4  tab:py-[13px] tab:px-[30px] bg-white shadow-sm transition-all duration-300 hover:bg-primary-100 hover:text-white text-sm tab:text-lg leading-6 font-semibold": variant === "secondary",
    "bg-white trasition-all duration-[0.3s] font-semibold leading-6 border-[1px] border-divider-100 hover:border-transparent hover:text-primary-100 capitalize py-2 px-5 hover:border-primary-100":
      variant === "liquid",
    "bg-white text-primary-100 capitalize leading-5 font-semibold tab:py-[13px] tab:px-[30px] text-sm font-semibold ":
      variant === "solidicon",
    "py-2 px-5 bg-primary-300 text-darkblue capitalize cursor-pointer border-b transition-all duration-200 hover:border-primary-100 text-base font-regular leading-6":
      variant === "basic",
  });

  return (
    <>
      {
        link === undefined ?
          <button
            className={cn`${buttonClasses} ${className}  lowercase  flex items-center gap-x-[2px] cursor-pointer  ${disabled ? 'cursor-not-allowed opacity-80' : "cursor-pointer opacity-100"}`}
            onClick={onClick}
            disabled={isLoading || disabled}
            type={type}
          >
            <div className={cn`flex items-center ${direction}`}>
              <div className={cn`${hideChild}`}>
                {isLoading ? "Loading..." : children}
              </div>

              {icon ? (
                <Icon className={cn`${iconClass}`} name="soliddownicon" />
              ) : (
                ""
              )}
              {editicon ? (
                <Icon className={cn`${iconClass}`} name="editicon" />
              ) : (
                ""
              )}
              {saveicon ? (
                <Icon className={cn`${iconClass}`} name="saveicon" />
              ) : (
                ""
              )}
              {downloadicon ? (
                <Icon className={cn`${iconClass}`} name="downloadIcon" />
              ) : (
                ""
              )}
              {loadingbtn ? (
                <Icon className={cn`${iconClass}`} name="loadingicon" />
              ) : (
                ""
              )}
            </div>
          </button>
          :
          <Link href={`${link}`} className={cn`${linkclass}`}>  <button
            className={cn`${buttonClasses} ${className} lowercase  flex items-center gap-x-[2px] cursor-pointer justify-center`}
            onClick={onClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : children}

            {icon === true ? (
              <Icon className={cn`${iconClass}`} name="soliddownicon" />
            ) : (
              ""
            )}
            {editicon === true ? (
              <Icon className={cn`${iconClass}`} name="editicon" />
            ) : (
              ""
            )}
            {saveicon === true ? (
              <Icon className={cn`${iconClass}`} name="saveicon" />
            ) : (
              ""
            )}
          </button> </Link>}
    </>
  );
};

export default Button;
