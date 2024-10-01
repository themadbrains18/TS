'use client'
import Image from "next/image";
import React, { Fragment, useState } from "react";
import NavDropdown from "../NavDropdown";
import Icon from "../Icon";
import Button from "../ui/Button";
import SearchDropdown from "../SearchDropdown";
import { cn } from "@/libs/utils";
import Input from "../ui/Input";
import NavTabs from "../NavTabs";
import Accordion from "../ui/Accordion";
import Link from "next/link";



const Header = () => {
  // State to manage desktop search bar visibility
  const [opensearch, setOpensearch] = useState(false)

  // State to manage sidebar visibility
  const [sidebar, setSidebar] = useState<boolean>(false);

  // Sections for the accordion in the sidebar

  const sections = [
    { title: "UI Templates" },
    { title: "HTML Templates" },
    { title: "Studio Specials" },
  ];

  return (
    <>
      {/* Destop header */}
      <header className=" bg-[#ffffff80] backdrop:blur-xl relative border-b-[1px] border-[#11083319] z-10">
        <div className="container hidden lg:block">
          <div className="py-[35px] flex items-center justify-between">
            <div className="flex items-center justify-between max-w-[809px] w-full cursor-pointer">
              <Link href={'/'}>
                <Image
                  src={"/icons/Logo.svg"}
                  width={276}
                  height={40}
                  alt="Logo"
                />
              </Link>
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
                  <Icon name="crossicon" className={`cursor-pointer fill-primary-100  ${opensearch !== false ? "opacity-100" : "opacity-0"}`} onClick={() => setOpensearch(!opensearch)} />
                </div>
              </div>
              <Button link="/register" variant="primary" className=" py-[13px] px-[30px] w-full max-w-[126px] justify-center" >
                sign up
              </Button>
              <Button link="/login" variant="primary" className=" py-[13px] px-[30px] w-full max-w-[126px] justify-center" >
                Log in
              </Button>
            </div>
          </div>
        </div>

        {/* responsive header  */}

        <div className="container lg:hidden ">
          <div className="flex items-center justify-between py-4 relative">
            <div onClick={() => setSidebar(!sidebar)}> <Icon name="menuicon" className="w-8 h-8" /></div>
            <div> <Link href={'/'}>
              <Image className="cursor-pointer h-9" width={193} height={38} src={'/icons/logo.svg'} alt="logo" /> </Link>
            </div>
            <div onClick={() => setSidebar(!sidebar)}> <Icon name="solidsearch" className="w-9 h-9" /></div>
          </div>
          <div className={cn`flex flex-col fixed bg-white w-full transition-all duration-[1s] h-screen p-5 top-0 ${sidebar ? "left-0" : "left-[-100%]"}`}>
            <div className="flex items-center justify-between pb-5">
              <Link href={'/'}>
                <Image className="cursor-pointer h-9" width={193} height={38} src={'/icons/logo.svg'} alt="logo" />
              </Link>
              <div onClick={() => { setSidebar(!sidebar) }}>
                <Icon className="w-8 h-5 fill-primary-100" name="crossicon" />
              </div>
            </div>
            <div className="overflow-scroll hiddenscroll" >
              <div className="p-[10px] flex items-center justify-center gap-x-1 w-full border border-divider-100">
                <Image width={30} height={30} src={'/icons/solidsearch.svg'} alt="searchicon" />
                <Input placeholder="Search" />
              </div>

              <div className="flex flex-col mt-8">

                {
                  sections.map((item, index) => {
                    return (<Fragment key={index}>
                      <Accordion title={`${item.title}`}>
                        <NavTabs />
                      </Accordion>
                    </Fragment>)
                  })
                }
              </div>
            </div>
            <div className="flex justify-center items-center mt-8">
              <Button variant="primary" className=" py-2 px-[18px] w-full max-w-[139px] flex justify-center">
                  sign up
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
