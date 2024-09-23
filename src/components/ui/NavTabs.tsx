"use client";
import React, { Fragment, useState } from "react";
import Button from "./Button";
import NavCard from "./NavCard";
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
      <div className="bg-white  drop-shadow-xl">
        <div className="px-10 pt-10 pb-[30px] flex gap-x-5 items-center ">
          {tabsdata?.map((item, index) => {
            console.log(activetab)
            return (
              <Fragment key={index}>
                <Button
                  className={`${
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
        <div className="px-10 pb-10">
          <div className="flex justify-between items-center border-t-[1px] border-divider-100  pt-[30px]">
            <h4 className="border-l-[1px] pl-[6px] border-subparagraph text-subheading text-lg font-bold leading-7 bg-gradient-to-r from-primary-300 to-primary-200 cursor-pointer ">
              Feature Product
            </h4>
            <Button
              variant="solidicon"
              icon={true}
              iconClass="w-5 h-5 py-1"
              children={"view all products"}
            />
          </div>
          <div className="flex justify-between my-5">
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
