"use client";
import React, { useState } from "react";
import Icon from "./Icon";
import { cn } from "@/libs/utils";

const SearchDropdown = () => {
  const [open, setOpen] = useState(false);
  const [prodcuts, setProducts] = useState("all products");

  const category = [
    {
      tittle: "all products",
    },
    {
      tittle: "Sports",
    },
    {
      tittle: "Insurance",
    },

    {
      tittle: "Sports",
    },
    {
      tittle: "Insurance",
    },

    {
      tittle: "Sports",
    },
    {
      tittle: "Insurance",
    },
    {
      tittle: "Insurance",
    },

    {
      tittle: "Sports",
    },
    {
      tittle: "Insurance",
    },
    {
      tittle: "Insurance",
    },

    {
      tittle: "Sports",
    },
    {
      tittle: "Insurance",
    },
  ];

  return (
    <>
      <div className="relative">
        <div
          className="flex items-center justify-between bg-primary-300 cursor-pointer py-[5px] px-[15px] min-w-[125px] w-full" 
          onClick={() => setOpen(!open)}
        >
          <h4 className="capitalize text-subparagraph inline-block max-w-[80px]  leading-5 text-sm text-nowrap overflow-hidden text-ellipsis ">
            {prodcuts}
          </h4>
          <Icon
            name="soliddownicon"
            className={cn`inline-block stroke-subparagraph w-[10px] stroke-[1px] h-[10px] rotate-90 transition-all duration-[0.3s] ${
              open !== false ? "rotate-[270deg]" : ""
            }`}
          />
        </div>
        <div
          className={cn`absolute max-h-[420px] overflow-y-scroll scroll-smooth shadow-1 transition-all duration-[0.3s] navsearch bg-white ${
            open !== false ? "visible opacity-[1]" : "opacity-0 invisible"
          } `}
        >
          {category?.map((item, index) => {
            return (
              <>
                <h4
                  className={cn`text-subparagraph leading-6 py-2 px-[30px] capitalize cursor-pointer text-nowrap  hover:bg-primary-200 border-l-[2px] hover:border-primary-100`}
                  onClick={() => {setProducts(item.tittle) 
                    setOpen(!open)}
                  }
                >
                  {item.tittle}
                </h4>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchDropdown;
