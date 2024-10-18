'use client'
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import NavDropdown from "../NavDropdown";
import Icon from "../Icon";
import Button from "../ui/Button";
import SearchDropdown from "../SearchDropdown";
import { cn } from "@/libs/utils";
import Input from "../ui/Input";
import NavTabs from "../NavTabs";
import Accordion from "../ui/Accordion";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { TemplateType } from "@/app/(dashboard)/addtemplate/page";



const Header = () => {
  const { data, fetchData } = useFetch<TemplateType[]>();
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


  const [openAccordions, setOpenAccordions] = useState<boolean[]>(
    Array(sections.length).fill(true) // Set all accordions to open by default
  );

  /**
   * Toggles the accordion for a specific index.
   * If the accordion is open, it will close. If it is closed, it will open.
   * 
   * @param {number} index - The index of the accordion item.
   */
  const handleAccordionClick = (index: number) => {
    setOpenAccordions((prev) => {
      const newOpenAccordions = [...prev];
      newOpenAccordions[index] = !newOpenAccordions[index]; // Toggle the state of the specific accordion
      return newOpenAccordions;
    });
  };

  useEffect(() => {
    fetchData(`${process.env.NEXT_PUBLIC_APIURL}/template-types`);
  }, [])


  


  return (
    <>
      {/* Destop header */}
      <header className=" bg-[#ffffff80] backdrop:blur-xl relative border-b-[1px] border-[#11083319] z-10">
        <div className="container hidden min-[1028px]:block">
          <div className="py-[35px] flex items-center justify-between">
            <div className="flex items-center justify-between max-w-[809px] w-full cursor-pointer">
              <Link className="w-[276px]" href={'/'}>
                <Image
                  src={"/icons/Logo.svg"}
                  width={276}
                  height={40}
                  alt="Logo"
                />
              </Link>
              <div className="flex items-center max-w-[473px] w-full justify-between">
                {
                 data && data?.map((item,index)=>{
                    return(
                      <Fragment key={index}>
                    <NavDropdown tittle={item?.name} />
                      </Fragment>
                    )
                  })
                }
                {/* <NavDropdown tittle="HTML Templatess" />
                <NavDropdown tittle="Studio Spacials" /> */}
              </div>
            </div>
            <div className={cn`max-w-[576px] w-full flex items-center justify-end gap-x-5 `}>
              <div className={cn`flex items-center relative  justify-end ${opensearch !== false ? "" : "overflow-hidden"}`}>
                <div className="p-[11px]" >
                  <Icon name="search" className={cn` cursor-pointer transition-all duration-[0.3s] ${opensearch !== false ? " opacity-0 invisible" : "visible opacity-[1]"}`} onClick={() => setOpensearch(!opensearch)} />
                </div>
                <div className={cn` flex items-center justify-between max-w-[410px] opacity-0 border-[1px] bg-white border-primary-100 transition-all duration-[0.5s] absolute   ${opensearch !== false ? "opacity-[1] visible  p-[10px] right-0 " : "opacity-0 invisible right-[-100%] p-0 "}`}>
                  <div className="border-r-[1px] border-divider-200 pr-[10px] mr-[10px]">
                    <SearchDropdown />
                  </div>
                  <input type="text" placeholder="Search all templates...." className="my-[10px] placeholder:text-sm placeholder:text-subparagraph leading-5 outline-none " />
                  <Icon name="crossicon" className={`cursor-pointer fill-primary-100  ${opensearch !== false ? "opacity-100" : "opacity-0"}`} onClick={() => setOpensearch(!opensearch)} />
                </div>
              </div>
              <Button link="/register">
                sign up
              </Button>
              <Button link="/login">
                Log in
              </Button>
            </div>
          </div>
        </div>

        {/* responsive header  */}

        <div className="container min-[1028px]:hidden ">
          <div className="flex items-center justify-between py-4 relative">
            <div onClick={() => setSidebar(!sidebar)}> <Icon name="menuicon" className="w-8 h-8" /></div>
            <div> <Link href={'/'}>
              <Image className="cursor-pointer h-9" width={193} height={38} src={'/icons/logo.svg'} alt="logo" /> </Link>
            </div>
            <div onClick={() => setSidebar(!sidebar)}> <Icon name="solidsearch" className="w-9 h-9" /></div>
          </div>
          <div className={cn`flex z-[2] flex-col fixed bg-white w-full transition-all duration-[1s] h-screen p-5 top-0 ${sidebar ? "left-0" : "left-[-100%]"}`}>
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
                {/* <Input register={} name="search" placeholder="Search" /> */}
              </div>
              <div className="flex flex-col mt-8">
                {
                  sections.map((item, index) => {
                    return (<Fragment key={index}>
                      <Accordion
                        isOpen={openAccordions[index]} // Check if this specific accordion is open
                        onToggle={() => handleAccordionClick(index)} // Toggle the accordion on click
                        title={`${item.title}`}
                      >
                        <NavTabs />
                      </Accordion>
                    </Fragment>)
                  })
                }
              </div>
            </div>
            <div className="flex justify-center items-center mt-8 gap-2">
              <Button variant="primary" className=" py-2 px-[18px] w-full max-w-[50%] flex justify-center">
                sign up
              </Button>
              <Button variant="primary" className=" py-2 px-[18px] w-full max-w-[50%] flex justify-center">
                log in
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
