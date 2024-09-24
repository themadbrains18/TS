'use client'
import Image from "next/image";
import React, { useState } from "react";
import NavDropdown from "../NavDropdown";
import Icon from "./Icon";
import Button from "./Button";
import SearchDropdown from "../SearchDropdown";
import { cn } from "@/libs/utils";
import Input from "./Input";
import { sidebarAccordion } from "@/libs/Accordion";
import NavTabs from "./NavTabs";

const Header = () => {

  const [opensearch, setOpensearch] = useState(false) /* state to manage desktop searchbar */

  const [sidebar, setSidebar] = useState(false); // managing side bar

  const [ rotate , setRoate] = useState(false)
  return (
    <>
      {/* destop header */}
      <header className=" bg-[#ffffff80] backdrop:blur-xl relative">
        <div className="container hidden lg:block">
          <div className="py-[35px] flex items-center justify-between">
            <div className="flex items-center justify-between max-w-[809px] w-full cursor-pointer">
              <Image
                src={"/icons/Logo.svg"}
                width={276}
                height={40}
                alt="Logo"
              />
              <div className="flex items-center max-w-[473px] w-full justify-between">
                <NavDropdown tittle="Ui Templates" />
                <NavDropdown tittle="HTML Templates" />
                <NavDropdown tittle="Studio Spacials" />
              </div>
            </div>
            <div className={cn`max-w-[576px] w-full flex items-center justify-end gap-x-5 `}>
              <div className={cn`flex items-center relative  justify-end ${opensearch !== false ? "" : "overflow-hidden"}`}>
                <Icon name="search" className={cn`w-9 h-9 cursor-pointer transition-all duration-[0.3s] ${opensearch !== false ? " opacity-0 invisible" : "visible opacity-[1]"}`} onClick={() => setOpensearch(!opensearch)} />
                <div className={cn` flex items-center justify-between max-w-[410px] opacity-0 border-[1px] bg-white border-primary-100 mr-5 transition-all duration-[0.5s] absolute   ${opensearch !== false ? "opacity-[1] visible  p-[10px] right-0 " : "opacity-0 invisible right-[-100%] p-0 "}`}>
                  <div className="border-r-[1px] border-divider-200 pr-[10px] mr-[10px]">
                    <SearchDropdown />
                  </div>
                  <input type="text" placeholder="Search all templates...." className="my-[10px] placeholder:text-sm placeholder:text-subparagraph leading-5 outline-none " />
                  <Icon name="crossicon" className=" cursor-pointer" onClick={() => setOpensearch(!opensearch)} />
                </div>
              </div>
              <Button variant="primary" className=" py-[13px] px-[30px] w-full max-w-[126px]" children="sign up" />
            </div>
          </div>
        </div>

        {/* responsive header  */}

        <div className="container lg:hidden ">
          <div className="flex items-center justify-between py-4 relative">
            {!sidebar  && <div onClick={()=> setSidebar(!sidebar)}> <Icon name="menuicon" className="w-8 h-8" /></div>}
            <div><Image className="cursor-pointer h-9" width={193} height={38} src={'/icons/logo.svg'} alt="logo" /></div>
            <div className="" onClick={()=>setSidebar(!sidebar)}>{sidebar ? <Icon className="w-8 h-5" name="crossicon" /> :  <Icon name="solidsearch" className="w-9 h-9" />} </div>
          </div>
          <div className={cn`flex flex-col absolute bg-white w-full transition-all duration-[0.5s] h-screen p-5 ${sidebar ? "left-0" : "left-[-100%]"}`}>
            <div className="p-[10px] flex items-center justify-center gap-x-1 w-full border border-divider-100">
              <Image width={30} height={30} src={'/icons/solidsearch.svg'} alt="searchicon" />
              <Input placeholder="Search" className="" />
            </div>
            <div className="flex flex-col px-[10px] mt-8">
              <div onClick={(e)=>{sidebarAccordion(e) , setRoate(!rotate)}} className="flex justify-between items-center pb-[10px] border-b-[1px] border-divider-100]">
            <h2>Ui Templates</h2>
            <Icon name="soliddownicon" className={cn`fill-subheading rotate-90 w-2 transition-all duration-[0.5s] ${rotate && "rotate-[270deg]"}`}/>
              </div>
              <div className="overflow-hidden h-0 duration-[0.5s]">
             <NavTabs/>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
