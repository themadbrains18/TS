'use client'
import Image from "next/image";
import React, { Fragment, useRef, useEffect, useState } from "react";
import NavDropdown from "../NavDropdown";
import Icon from "../Icon";
import Button from "../ui/Button";
import { cn } from "@/libs/utils";
import NavTabs from "../NavTabs";
import Accordion from "../ui/Accordion";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import { subCat } from "@/types/type";
import { signOut, useSession } from 'next-auth/react';
import { TemplateType } from "@/app/(dashboard)/dashboard/addtemplate/components/templateForm";
import SearchComponent from "./SearchComponent";
import { useDownload } from "@/app/contexts/DailyDownloadsContext";
import useOnClickOutside from "@/hooks/useOnClickOutside";

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
    freeDownloads: number | undefined | null;

  }
}



const Header = () => {
  const { downloads, imageUrl } = useDownload();

  const [sidebar, setSidebar] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingdata, setLoadingdata] = useState(true);
  const { data, fetchData, loading } = useFetch<TemplateType[]>();
  const [searchbar, setsearchbar] = useState<boolean>()
  const { data: session } = useSession();
  const { data: subCatData, fetchData: fetchsubCatData } = useFetch<subCat[]>();
  const { data: userdata, fetchData: fetchUserdata } = useFetch<User>();
  const [opensearch, setOpensearch] = useState(false)
  const [profile, setProfile] = useState<boolean>(false)
  const [profileres, setProfileres] = useState<boolean>(false)
  const profileRef = useRef<HTMLDivElement>(null);
  const profileresRef = useRef<HTMLDivElement>(null);


  /**
  * Toggles the visibility of the profile section.
  * This function flips the current state of the `profile` variable.
  */
  const openProfile = () => {
    setProfile(!profile); // Toggle the `profile` state to open or close the profile section
  }

  /**
  * Toggles the visibility of the profileres section.
  * This function flips the current state of the `profileres` variable.
  */
  const openProfileres = () => {
    setProfileres(!profileres); // Toggle the `profileres` state to open or close the profileres section
  }

  /**
  * Initializes the state to manage multiple accordion items.
  * The state `openAccordions` is an array of booleans, where each element corresponds to an accordion item.
  */
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



  /**
   * Fetches user data from the server.
   * This function retrieves user data by making a request to the `/get-user` endpoint.
   * 
   * @throws {Error} - If any error occurs during the fetch process, it will be logged to the console.
   */
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


  /**
   * Opens or closes the search bar input.
   * This function toggles the `opensearch` state between true and false, 
   * showing or hiding the search bar input field based on the current state.
   */
  const openinput = () => {
    setOpensearch(!opensearch);
  }

  /**
  * Closes the search bar input.
  * This function sets the `opensearch` state to false, effectively hiding the search bar input.
  */
  const resinputoff = () => {
    setOpensearch(false);
  }

  /**
  * Handles outside clicks to close the profile and profileres sections.
  * These hooks listen for clicks outside the profile and profileres sections,
  * and close them by updating their corresponding state variables when clicked outside.
  * 
  */
  useOnClickOutside(profileRef, () => setProfile(false));
  useOnClickOutside(profileresRef, () => setProfileres(false));


  /**
   * Determines if the user is logged in by checking the `session` and `session.token` values.
   * If the session exists and contains a token, the user is considered logged in.
   */
  const isLoggedIn = session && session?.token;


  /**
   * useEffect hook to fetch necessary data on component mount.
   * This effect runs once when the component is mounted, as indicated by the empty dependency array.
   */
  useEffect(() => {
    try {
      setLoadingdata(true)
      fetchData(`/template-types`, { next: { revalidate: 1800 } });
      fetchsubCatData(`/sub-categories`, { next: { revalidate: 1800 } });
      fetchUserData()
    } catch (error) {
    }
    finally {
      setLoadingdata(false)
    }
  }, [])



  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };



  return (
    <>
      {session && session.user && ["ADMIN"].includes((session?.role).toString()) && <>
        <div className="">
          <Link href="/dashboard" className="fixed  top-[68px] lg:top-[130px] right-0 z-30 bg-primary-700 h-11 flex items-center pl-4 pr-2 rounded-s-3xl text-white gap-1.5">
            <span className="tetx-sm">Go to Dashboard</span>
          </Link>
        </div>
      </>}
      <header className="  bg-white fixed top-0 left-0 right-0  border-b-[1px] border-[#11083319] z-20   ">
        <div className="relative" >
          {/* Destop header */}
          <div className="container hidden min-[1028px]:block">
            <div className="py-10 flex items-center justify-between">
              <div className="flex items-center justify-between xl:max-w-[809px] max-w-[690px] w-full cursor-pointer">
                <Link className="w-[276px]" href={'/'}>
                  <Image
                    src={"/icons/Logo.svg"}
                    width={276}
                    height={40}
                    alt="Logo"
                  />
                </Link>
                <div className="flex xl:gap-5 items-center xl:max-w-[550px] max-w-[500px] w-full justify-center xl:pl-[60px] pl-5 ">
                  {loadingdata ?
                    <>
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

                </div>
              </div>
              <div className={cn`max-w-[576px] w-full flex items-center justify-end gap-x-2.5 `}>

                <SearchComponent
                  classname="max-w-[410px]"
                  searchresults="max-h-60"
                  openinput={openinput}
                  opensearch={opensearch}
                  setOpensearch={setOpensearch}
                  subCat={subCatData || undefined} />
                {
                  isLoggedIn &&
                  <div className="relative" >
                    <div onClick={() => {
                      openProfile()
                    }} className="w-[50px] h-[50px] rounded-full cursor-pointer ">
                      <Image
                        width={50}
                        height={50}
                        className="rounded-full object-cover w-[50px] h-[50px]"
                        src={imageUrl || "/images/userdummy.png"}
                        alt="diamond"
                      />
                    </div>
                    <div ref={profileRef} className={`absolute ${profile ? "opacity-100 visible" : "invisible opacity-0"}  transition-all  duration-[0.5s] top-[94%]  max-[1678px]:right-0 right-[-73px] mt-2 w-[216px] z-60 bg-white shadow-lg rounded-lg`}>
                      <div className="pt-[6px] mt-[-6px]">
                        <div className="py-2.5 ">
                          <h2 className="leading-6 text-[16px] font-semibold text-textheading py-2 pl-[30px] pr-[27px] mb-2.5 max-w-60 truncate">
                            {session?.email}
                          </h2>
                          <div className="px-[30px] mb-2.5 " >
                            <h2 className="text-[13px] font-medium leading-5 text-textheading" >Daily Download Balance</h2>
                            <div className="py-[3px] px-[3px] h-[12px] border-[#E8CFFB] border-[1px] rounded-[6px] my-[5px] "  >
                              {/* <span style={{ width: `${(downloads || 3) * 33.33}%` }} className="h-1 block bg-primary-100 rounded-[5px] " ></span> */}
                              <span
                                style={{ width: `${downloads ? downloads * 33.33 : 0}%` }}
                                className="h-1 block bg-primary-100 rounded-[5px]"
                              ></span>
                            </div>
                            <h3 className="text-[12px] font-normal leading-5 text-textheading" >{downloads === null ? 0 : downloads} remaining out of 3</h3>
                          </div>
                          <div className="flex flex-col">
                            <Link href={"/profile"} >
                              <button onClick={() => { setProfile(false) }} className={` w-full text-textheading text-start leading-6 hover:text-subparagraph py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-l-[2px] border-white hover:border-primary-100`}>
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
                    <Link href='/login'>
                      <button className="text-textheading text-start capitalize border-b-2 border-transparent hover:border-primary-100 ">
                        Log In
                      </button>
                    </Link>
                    <Button link="/register">Sign Up</Button>
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
                <Image className="cursor-pointer h-9 w-[170px]" width={193} height={38} src={'/icons/Logo.svg'} alt="logo" />
              </Link>
              <div className="flex flex-row gap-1 items-center" >
                <div onClick={() => setsearchbar(true)} >
                  <Icon name="solidsearch" className="w-9 h-9 cursor-pointer" />
                </div>
                {
                  session?.user
                  &&
                  <div ref={profileresRef}>
                    <div onClick={openProfileres} className="w-[30px] h-[30px] cursor-pointer object-center overflow-hidden">

                      <Image
                        width={50}
                        height={50}
                        className="rounded-full object-contain"
                        src={imageUrl || "/images/userdummy.png"}
                        alt="diamond"
                      />
                    </div>
                    <div className={`absolute ${profileres ? "opacity-100 visible" : "invisible opacity-0"}  transition-all 
                      duration-[0.5s] top-[90%] right-0 mt-2 max-w-[256px] bg-white shadow-lg rounded-lg`}>
                      <div className="" >
                        <div className="py-2.5 ">
                          <h2 className="leading-6 text-[16px] font-semibold text-textheading py-2 pl-[30px] pr-[27px] mb-2.5 max-w-60 truncate">
                            {session?.email}
                          </h2>
                          <div className="px-[30px] mb-2.5 " >
                            <h2 className="text-[13px] font-medium leading-5 text-textheading" >Daily Download Balance</h2>
                            <div className="py-[3px] px-[3px] h-[12px] border-[#E8CFFB] border-[1px] rounded-[6px] my-[5px] "  >
                              <span style={{ width: `${(downloads || 3) * 33.33}%` }} className="h-1 block bg-primary-100 rounded-[5px] " ></span>
                            </div>
                            <h3 className="text-[12px] font-normal leading-5 text-textheading" >{downloads} remaining out of 3</h3>
                          </div>
                          <div className="flex flex-col " >
                            <Link href={"/profile"} >
                              <button className={` w-full text-textheading text-start leading-6 hover:text-subparagraph py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-l-[2px] border-white hover:border-primary-100`}>
                                Profile
                              </button>
                            </Link>
                            {/* <button onClick={() => signOut()} className={`text-textheading text-start hover:text-subparagraph leading-6 py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-white border-l-[2px] hover:border-primary-100`}>
                              Log out
                            </button> */}
                            <button
                              onClick={handleSignOut}
                              className={`text-textheading text-start hover:text-subparagraph leading-6 py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-white border-l-[2px] hover:border-primary-100`}
                              disabled={isLoading}
                            >
                              {isLoading ? (<Icon name="loadingicon" />) : 'Log out'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>

              <div className={`w-[100%] duration-[0.5s] fixed top-0 bg-white h-full  px-2 ${searchbar ? "right-0 " : "right-[-100%]"}`} >
                <div className="flex flex-row justify-between items-center py-4 " >
                  <Link href={'/'}>
                    <Image className="cursor-pointer h-9" width={193} height={38} src={'/icons/Logo.svg'} alt="logo" />
                  </Link>
                  <div onClick={() => setsearchbar(false)} >
                    <Icon className="w-8 h-5 fill-primary-100" name="crossicon" />
                  </div>
                </div>
                <SearchComponent
                  resinputoff={resinputoff}
                  searchresults="h-screen"
                  mainclass="pt-[30px]"
                  opensearch={true}
                  classname="w-full max-w-[100%]"
                  subCat={subCatData || undefined}
                />
              </div>
            </div>

            <div className={cn`flex z-[2] flex-col fixed bg-white w-full transition-all duration-[1s] h-screen  top-0 ${sidebar ? "left-0" : "left-[-100%]"}`}>
              <div className="flex items-center justify-between p-[15px]">
                <Link onClick={() => { setSidebar(!sidebar) }} href={'/'}>
                  <Image className="cursor-pointer h-9" width={193} height={38} src={'/icons/Logo.svg'} alt="logo" />
                </Link>
                <div onClick={() => { setSidebar(!sidebar) }} >
                  <Icon className="fill-primary-100" name="crossicon" />
                </div>
              </div>
              <div className="overflow-scroll hiddenscroll" >
                <div className="flex flex-col px-2.5">
                  {
                    data && data?.length > 0 && data?.map((item, index) => {
                      return (<Fragment key={index}>
                        <Accordion
                          isOpen={openAccordions[index]} // Check if this specific accordion is open
                          onToggle={() => handleAccordionClick(index)} // Toggle the accordion on click
                          title={`${item?.name}`}
                          titleboxclass="border-b"
                        >
                          <NavTabs classname="max-w-[768px]:min-w-[148px]" setSidebar={() => setSidebar(!sidebar)} subCat={item?.subCategories} />
                        </Accordion>
                      </Fragment>)
                    })
                  }
                </div>
              </div>
              <div className="flex justify-center items-center mt-8 gap-2 px-5">
                {!isLoggedIn ? (
                  <>
                    <Button onClick={() => { setSidebar(!sidebar) }} linkclass="w-full" link="/register" variant="primary" className=" py-2 px-[18px] w-full flex justify-center">
                      sign up
                    </Button>
                    <Button onClick={() => { setSidebar(!sidebar) }} linkclass="w-full" link="/login" variant="primary" className=" py-2 px-[18px] w-full  flex justify-center">
                      log in
                    </Button>
                  </>
                ) : (<>
                  <Button variant="primary" onClick={signOut} className=" py-2 px-[18px] w-full tab:max-w-[50%] max-w-full  flex justify-center">
                    Log out
                  </Button>
                </>)}
              </div>
            </div>
          </div>
        </div>
      </header >
    </>
  );
};

export default Header;
