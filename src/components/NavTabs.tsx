"use client";
import React, { Fragment, useEffect, useState } from "react";
import Button from "./ui/Button";
import NavCard from "./cards/NavCard";
import { cn } from "@/libs/utils";
import headerdata from "@/json/header.json";
import { navtabprops } from "@/types/type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * NavTabs component displays a set of navigation tabs for product categories.
 * It allows users to select a tab and view related products.
 *
 * @returns {JSX.Element} The rendered NavTabs component.
 */

const NavTabs: React.FC<navtabprops> = ({ subCat }) => {
  const [activetab, setActivetab] = useState(0); // Track the currently active tab
  const searchParams = useSearchParams();

  useEffect(() => {
    const subCatId = searchParams.get('subcat');
    
    // Find the index of the subcategory based on the subcat ID in the URL
    const index = subCat?.findIndex(item => item.id === subCatId) || 0;
    if (index !== -1) {
      setActivetab(index); // Set active tab index based on the URL
    }
  }, [searchParams, subCat]);

  return (
    <>
      {/* Tabs Section */}
      <div className="bg-white shadow-lg overflow-scroll hiddenscroll ">
        <div className="pt-5 lg:px-10 lg:pt-10 lg:pb-[30px] flex gap-x-[5px] lg:gap-x-5 items-center overflow-scroll hiddenscroll">
          {subCat && subCat.map((item, index) => (
            <Fragment key={index}>
              <Link href={`/product?template-type=${item?.templateTypeId}&&subcat=${item?.id}`}>
                <Button
                  className={cn`py-[6px] px-[10px] lg:py-2 lg:px-5 text-sm lg:text-base text-nowrap ${index === activetab
                    ? "border-[1px] border-primary-100 text-primary-100"
                    : "text-subparagraph"
                  }`}
                  onClick={() => setActivetab(index)}
                  variant="liquid"
                >
                  {item.name}
                </Button>
              </Link>
            </Fragment>
          ))}
        </div>

        {/* Feature Product Section */}
        <div className="lg:px-10 lg:pb-10">
          <div className="flex justify-between items-center border-t-[1px] border-divider-100 pt-[30px]">
            <h4 className="border-l-[1px] pl-[6px] border-subparagraph text-subheading text-lg font-bold leading-7 bg-gradient-to-r from-primary-300 to-primary-200 cursor-pointer">
              Feature Product
            </h4>
            <Button
              variant="solidicon"
              icon={true}
              iconClass="w-5 h-5 py-1 fill-primary-100"
              link="/product"
            >
              view all products
            </Button>
          </div>

          {/* NavCards Section */}
          <div className="flex justify-between my-5 w-full gap-x-[10px] lg:gap-x-5 overflow-scroll hiddenscroll">
            {headerdata[activetab]?.data?.map((item, idx) => (
              <Fragment key={idx}>
                <NavCard
                  image={item.image}
                  title={item.title}
                  icon={item.icon}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavTabs;
