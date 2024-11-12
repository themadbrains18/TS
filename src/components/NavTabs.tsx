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
  const [activetab, setActivetab] = useState(0);
  const searchParams = useSearchParams();
  const [subCategory, setSubCategory] = useState<subCat>(subCat && subCat?.[0])
  const { data, loading, error, fetchData } = useFetch<TemplateResponse>()

  /**
   * useEffect Hook: This effect runs when either `searchParams` or `subCat` changes.
   */
  useEffect(() => {

    const subCatId = searchParams.get('subcat');

    const index = subCat?.findIndex(item => item.id === subCatId) || 0;
    if (index !== -1) {
      setActivetab(index);
    }
  }, [searchParams, subCat]);

  /**
   * Handle the activation of a sub-category tab and fetch the corresponding templates.
   */
  const handleActive = (item: subCat | any, index: number) => {
    setActivetab(index)
    setSubCategory(item)
    fetchData(`/templates?templateTypeId=${item?.templateTypeId}&subCatId=${item?.id}&page=1&limit=4`, { next: { revalidate: 0 } })
  }

  useEffect(() => {
    fetchData(`/templates?templateTypeId=${subCat?.[0]?.templateTypeId}&subCatId=${subCat?.[0]?.id}&page=1&limit=4`, { next: { revalidate: 0 } })
  }, [])

  return (
    <>
      {/* Tabs Section */}
      <div className="bg-white lg:shadow-lg overflow-scroll hiddenscroll  w-full">
        <div className=" lg:px-10 lg:pt-10 lg:pb-[30px] flex gap-x-[5px] lg:gap-x-5 items-center overflow-scroll hiddenscroll">
          {subCat && subCat?.length > 0 && subCat?.map((item, index) => (
            <Fragment key={Date.now() + index + "subCatitem"}>
              {/* <Link href={`/product?template-type=${item?.templateTypeId}&&subcat=${item?.id}`}> */}
              <Button
                className={cn`py-[6px] px-[10px] lg:py-2 lg:px-5 text-sm lg:text-base text-nowrap ${index === activetab
                  ? "border-[1px] border-primary-100 text-primary-100"
                  : "text-subparagraph"
                  }`}
                onClick={() => handleActive(item, index)}
                variant="liquid"
              >
                {item?.name}
              </Button>
              {/* </Link> */}
            </Fragment>
          ))}
        </div>

        {/* Feature Product Section */}
        <div className="lg:px-10 lg:pb-10">
          <div className="flex justify-between items-center lg:border-t-[1px] border-divider-100 lg:pt-[30px] pt-[20px] ">
            <h4 className="border-l-[1px] pl-[6px] border-subparagraph text-subheading text-lg font-bold leading-7 bg-gradient-to-r from-primary-300 to-primary-200 cursor-pointer">
              Feature Product
            </h4>
            {data && data?.data?.length > 0 ? (
              <Button
                variant="solidicon"
                icon={true}
                iconClass="w-5 h-5 py-1 fill-primary-100"
                link={`/product?template-type=${subCategory?.templateTypeId}&&subcat=${subCategory?.id}`}
              >
                view all products
              </Button>
            ) : (
              <Button
                variant="solidicon"
                icon={true}
                iconClass="w-5 h-5 py-1 fill-primary-100"
                link={`/product`}
              >
                view all products
              </Button>
            )}
          </div>

          {/* NavCards Section */}
          <div className="" >
            <div className="flex my-5   gap-x-[10px] lg:gap-x-5 overflow-scroll hiddenscroll">
              {data && data.data?.length > 0 ? (
                data?.data?.map((item: TechTemplate, idx: number) => (
                  <Fragment key={Date.now() + idx + "idx"}>
                    <NavCard
                      id={item?.id}
                      image={item?.sliderImages[0]?.imageUrl}
                      title={item?.title}
                      data={item}
                      icon="/icons/figma.svg"
                      classnamemain="md:min-w-[248px] w-[148px] "
                    />
                  </Fragment>
                ))
              ) : (
                <div className="w-full text-center lg:py-5 py-2 h-[152px] flex justify-center items-center">
                  <p className="text-subparagraph" >No Template Found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavTabs;
