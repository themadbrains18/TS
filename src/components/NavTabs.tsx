"use client";
import React, { Fragment, useEffect, useState } from "react";
import Button from "./ui/Button";
import NavCard from "./cards/NavCard";
import { cn } from "@/libs/utils";
import headerdata from "@/json/header.json";
import { navtabprops, subCat, TechTemplate, TemplateResponse } from "@/types/type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";

/**
 * NavTabs component displays a set of navigation tabs for product categories.
 * It allows users to select a tab and view related products.
 *
 * @returns {JSX.Element} The rendered NavTabs component.
 */

const NavTabs: React.FC<navtabprops> = ({ subCat }) => {
  const [activetab, setActivetab] = useState(0); // Track the currently active tab
  const searchParams = useSearchParams();
  const [subCategory, setSubCategory] = useState<subCat>()
  const { data, loading, error, fetchData } = useFetch<TemplateResponse>()

  useEffect(() => {
    const subCatId = searchParams.get('subcat');

    // Find the index of the subcategory based on the subcat ID in the URL
    const index = subCat?.findIndex(item => item.id === subCatId) || 0;
    if (index !== -1) {
      setActivetab(index); // Set active tab index based on the URL
    }
  }, [searchParams, subCat]);

  const handleActive = (item:subCat, index:number) => {
    setActivetab(index)
    setSubCategory(item)
    fetchData(`/templates?templateTypeId=${item?.templateTypeId}&subCatId=${item?.id}&page=1&limit=4`)
  }
  console.log(data,"==data");
  

  return (
    <>
      {/* Tabs Section */}
      <div className="bg-white shadow-lg overflow-scroll hiddenscroll ">
        <div className="pt-5 lg:px-10 lg:pt-10 lg:pb-[30px] flex gap-x-[5px] lg:gap-x-5 items-center overflow-scroll hiddenscroll">
          {subCat && subCat.map((item, index) => (
            <Fragment key={index}>
              {/* <Link href={`/product?template-type=${item?.templateTypeId}&&subcat=${item?.id}`}> */}
              <Button
                className={cn`py-[6px] px-[10px] lg:py-2 lg:px-5 text-sm lg:text-base text-nowrap ${index === activetab
                  ? "border-[1px] border-primary-100 text-primary-100"
                  : "text-subparagraph"
                  }`}
                onClick={() => handleActive(item, index)}
                variant="liquid"
              >
                {item.name}
              </Button>
              {/* </Link> */}
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
              link={`/product?template-type=${subCategory?.templateTypeId}&&subcat=${subCategory?.id}`}
            >
              view all products
            </Button>
          </div>

          {/* NavCards Section */}
          <div className="flex justify-between my-5 w-full gap-x-[10px] lg:gap-x-5 overflow-scroll hiddenscroll">
            {data && data?.data?.length>0 && data.data?.map((item:TechTemplate, idx:number) => (
              <Fragment key={idx}>
                <NavCard
                id={item?.id}
                  image={item.sliderImages[0]?.imageUrl}
                  title={item.title}
                  icon={`/icons/figma.svg`}
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
