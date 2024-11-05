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
import { subCat } from "@/types/type";
import { signOut, useSession } from 'next-auth/react';
import { TemplateType } from "@/app/(dashboard)/dashboard/addtemplate/components/templateForm";
import SearchComponent from "./SearchComponent";

interface User {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN"; // Adjust roles as necessary
    profileImg: string | null;
    number: string | null;
    token: string | null;
    freeDownloads: number;

  }
}



const Header = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [loadingdata, setLoadingdata] = useState(true);  // Initially true while loading
  const { data, fetchData, loading } = useFetch<TemplateType[]>();
  const [searchbar, setsearchbar] = useState<boolean>()
  const { data: session } = useSession();
  const { data: subCatData, fetchData: fetchsubCatData } = useFetch<subCat[]>();
  const { data: userdata, fetchData: fetchUserdata } = useFetch<User>();
  const [opensearch, setOpensearch] = useState(false)



  const [openAccordions, setOpenAccordions] = useState<boolean[]>(
    Array(data?.length).fill(true) // Set all accordions to open by default
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



  const fetchUserData = async () => {
    try {
      if (!session?.user) {
        return
      }
      await fetchUserdata(`/get-user`);
    } catch (error) {
      console.log(error)
    }
  };


  // open search bar input 
  const openinput = () => {
    setOpensearch(!opensearch)
  }

  const resinputoff = () => {
    setOpensearch(false)
  }

  const isLoggedIn = session && session.token;

  useEffect(() => {
    try {
      setLoadingdata(true)
      fetchData(`/template-types`, { next: { revalidate: 60 * 10 } });
      fetchsubCatData(`/sub-categories`, { next: { revalidate: 60 * 10 } });
      fetchUserData()
    } catch (error) {
    }
    finally {
      setLoadingdata(false)
    }
  }, [])

  return (
    <>
      {/* Destop header */}
      <header className=" bg-[#ffffff80] backdrop:blur-xl relative border-b-[1px] border-[#11083319] z-10">
        <div className="container hidden min-[1028px]:block">
          <div className="py-10 flex items-center justify-between">
            <div className="flex items-center justify-between max-w-[809px] w-full cursor-pointer">
              <Link className="w-[276px]" href={'/'}>
                <Image
                  src={"/icons/Logo.svg"}
                  width={276}
                  height={40}
                  alt="Logo"
                />
              </Link>
              <div className="flex gap-5 items-center max-w-[550px] w-full justify-between pl-[60px]">
                {loadingdata ? <>
                  <div className="flex items-center animate-pulse w-full">
                    <div className="h-4  bg-gray-200 rounded mr-2 w-full"></div>
                    <div className="h-4  bg-gray-200 rounded mr-2 w-full"></div>
                    <div className="h-4  bg-gray-200 rounded w-full"></div>
                  </div>
                </> : <>
                  {
                    data && data?.length > 0 && data?.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          <NavDropdown title={item?.name} subCat={item?.subCategories} />
                        </Fragment>
                      )
                    })
                  }
                </>}

                {/* <NavDropdown title="HTML Templatess" />
                <NavDropdown title="Studio Spacials" /> */}

              </div>
            </div>
            <div className={cn`max-w-[576px] w-full flex items-center justify-end gap-x-2.5 `}>
              <SearchComponent classname="max-w-[410px]" searchresults="max-h-60" openinput={openinput} opensearch={opensearch} setOpensearch={setOpensearch} subCat={subCatData || undefined} />
              {
                isLoggedIn &&
                <div className="group ">
                  <div className="w-[50px] h-[50px] cursor-pointer ">
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full object-contain"
                      src={userdata?.user?.profileImg || "/images/userdummy.png"}
                      alt="diamond"
                    />
                  </div>
                  <div className="absolute group-hover:opacity-100 transition-all group-hover:visible invisible opacity-0  duration-[0.5s] top-[94%]  max-[1678px]:right-[15px] right-[85px] mt-2 max-w-[256px] w-full bg-white shadow-lg rounded-lg">
                    <div className="pt-[46px] mt-[-46px]" >
                      <div className="py-2.5 ">
                        <h2 className="leading-6 text-[16px] font-semibold text-textheading py-2 pl-[30px] pr-[27px] mb-2.5">
                          {session?.email}
                        </h2>
                        <div className="px-[30px] mb-2.5 " >
                          <h2 className="text-[13px] font-medium leading-5 text-textheading" >Daily Download Balance</h2>
                          <div className="py-[3px] px-[3px] h-[12px] border-[#E8CFFB] border-[1px] rounded-[6px] my-[5px] "  >
                            <span className="h-1 block bg-primary-100 rounded-[5px] w-[33.33%] " ></span>
                          </div>
                          <h3 className="text-[12px] font-normal leading-5 text-textheading" >1 remaining out of 3</h3>
                        </div>
                        <div className="flex flex-col " >
                          <Link href={"/profile"} >
                            <button className={` w-full text-textheading text-start leading-6 hover:text-subparagraph py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-l-[2px] border-white hover:border-primary-100`}>
                              Profile
                            </button>
                          </Link>
                          <button onClick={() => signOut()} className={`text-textheading text-start hover:text-subparagraph leading-6 py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-white border-l-[2px] hover:border-primary-100`}>
                            Log out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }

              {!isLoggedIn && (
                <>
                  <Button link="/register">Sign Up</Button>
                  <Button link="/login">Log In</Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* responsive header  */}

        <div className="container min-[1028px]:hidden ">
          <div className="flex items-center justify-between py-4 relative">
            <div onClick={() => setSidebar(!sidebar)}> <Icon name="menuicon" className="w-8 h-8" /></div>
            <Link href={'/'}>
              <Image className="cursor-pointer h-9" width={193} height={38} src={'/icons/logo.svg'} alt="logo" />
            </Link>
            <div className="flex flex-row gap-1 items-center" >
              <div onClick={() => setsearchbar(true)} >
                <Icon name="solidsearch" className="w-9 h-9 cursor-pointer" />
              </div>

              <div className="group ">
                <div className="w-[30px] h-[30px] cursor-pointer ">
                  <Image
                    width={50}
                    height={50}
                    className="rounded-full object-contain"
                    src={userdata?.user?.profileImg || "/images/userdummy.png"}
                    alt="diamond"
                  />
                </div>
                <div className="absolute group-hover:opacity-100 transition-all group-hover:visible invisible opacity-0  duration-[0.5s] top-[90%] max-[1678px]:right-[0] right-[85px] mt-2 max-w-[256px] w-full bg-white shadow-lg rounded-lg">
                  <div className="pt-[46px] mt-[-46px] " >
                    <div className="py-2.5 ">
                      <h2 className="leading-6 text-[16px] font-semibold text-textheading py-2 pl-[30px] pr-[27px] mb-2.5">
                        {session?.email}
                      </h2>
                      <div className="px-[30px] mb-2.5 " >
                        <h2 className="text-[13px] font-medium leading-5 text-textheading" >Daily Download Balance</h2>
                        <div className="py-[3px] px-[3px] h-[12px] border-[#E8CFFB] border-[1px] rounded-[6px] my-[5px] "  >
                          <span className="h-1 block bg-primary-100 rounded-[5px] w-[33.33%] " ></span>
                        </div>
                        <h3 className="text-[12px] font-normal leading-5 text-textheading" >1 remaining out of 3</h3>
                      </div>
                      <div className="flex flex-col " >
                        <Link href={"/profile"} >
                          <button className={` w-full text-textheading text-start leading-6 hover:text-subparagraph py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-l-[2px] border-white hover:border-primary-100`}>
                            Profile
                          </button>
                        </Link>
                        <button onClick={() => signOut()} className={`text-textheading text-start hover:text-subparagraph leading-6 py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-white border-l-[2px] hover:border-primary-100`}>
                          Log out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`w-[100%] duration-[0.5s] fixed top-0 bg-white h-full  px-2 ${searchbar ? "right-0 " : "right-[-100%]"}`} >
              <div className="flex flex-row justify-between items-center py-4 " >
                <Link href={'/'}>
                  <Image className="cursor-pointer h-9" width={193} height={38} src={'/icons/logo.svg'} alt="logo" />
                </Link>
                <div onClick={() => setsearchbar(false)} >
                  <Icon className="w-8 h-5 fill-primary-100" name="crossicon" />
                </div>
              </div>
              <SearchComponent resinputoff={resinputoff} searchresults="h-screen" mainclass="pt-[30px]" opensearch={true} classname="w-full max-w-[100%]" subCat={subCatData || undefined} />
            </div>
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
              <div className="flex flex-col mt-8">
                {
                  data && data?.length > 0 && data?.map((item, index) => {
                    return (<Fragment key={index}>
                      <Accordion
                        isOpen={openAccordions[index]} // Check if this specific accordion is open
                        onToggle={() => handleAccordionClick(index)} // Toggle the accordion on click
                        title={`${item?.name}`}
                      >
                        <NavTabs />
                      </Accordion>
                    </Fragment>)
                  })
                }
              </div>
            </div>
            <div className="flex justify-center items-center mt-8 gap-2">
              {!isLoggedIn ? (
                <>
                  <Button variant="primary" className=" py-2 px-[18px] w-full max-w-[50%] flex justify-center">
                    sign up
                  </Button>
                  <Button variant="primary" className=" py-2 px-[18px] w-full max-w-[50%] flex justify-center">
                    log in
                  </Button>
                </>
              ) : (<>
                <Button variant="primary" className=" py-2 px-[18px] w-full max-w-[50%] flex justify-center">
                  Log out
                </Button>
              </>)}
            </div>
          </div>


        </div>
      </header>
    </>
  );
};

export default Header;
