"use client";
import React, { Fragment, useState } from "react";
import Button from "./Button";
import NavCard from "./NavCard";
import { cn } from "@/libs/utils";
const NavTabs = () => {
  const [activetab, setActivetabs] = useState(0);
  const tabsdata = [
    {
      tittle: "Web Templates",
    },
    {
      tittle: "Mobile App",
    },
    {
      tittle: "Dashboards",
    },
    {
      tittle: "Landing Page",
    },
    {
      tittle: "Web Templates",
    },
  ];
  return (
    <>
      <div className="bg-white drop-shadow-lg shadow-lg overflow-scroll">
        <div className="pt-5 lg:px-10 lg:pt-10 lg:pb-[30px] flex gap-x-5 items-center ">
          {tabsdata?.map((item, index) => {
            console.log(activetab)
            return (
              <Fragment key={index}>
                <Button
                  className={cn` py-[6px] px-[10px] lg:py-2 lg:px-5 text-sm lg:text-base text-nowrap ${
                    index == activetab
                      ? "border-[1px] border-primary-100 text-primary-100"
                      : "text-subparagraph "
                  }`}
                  onClick={() => setActivetabs(index)}
                  variant="liquid"
                  children={`${item.tittle}`}
                />
              </Fragment>
            );
          })}
        </div>
        <div className="lg:px-10 lg:pb-10">
          <div className="flex justify-between items-center border-t-[1px] border-divider-100  pt-[30px]">
            <h4 className="border-l-[1px] pl-[6px] border-subparagraph text-subheading text-lg font-bold leading-7 bg-gradient-to-r from-primary-300 to-primary-200 cursor-pointer ">
              Feature Product
            </h4>
            <Button
              variant="solidicon"
              icon={true}
              iconClass="w-5 h-5 py-1 fill-primary-100"
              children={"view all products"}
            />
          </div>
          <div className=" flex justify-between my-5 w-full">
            {
                activetab === 0 && (<>
                <NavCard />
                </>)
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default NavTabs;
