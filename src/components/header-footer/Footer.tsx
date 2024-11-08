import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import Button from "../ui/Button";




/**
 * Footer component that displays site branding, social icons, design and coding tags, 
 * newsletter signup, and legal agreements.
 *
 * @component
 * @returns {JSX.Element} The rendered Footer component.
 */


const Footer = () => {
  const socialicons = [
    {
      icon: "dribbble-logo.svg"
    },
    {
      icon: "linkedin.svg"
    },
    {
      icon: "twitter.svg"
    },
    {
      icon: "behance.svg"
    },
    {
      icon: "instagram.svg"
    },
  ];

  const desgintags = [
    "sketch",
    "adobe Xd",
    "figma",
  ];

  const codetypes = [
    "HTML",
    "React",
    "Wordpress",
    "Shopify",
    "Bootstrap",
  ];

  const agreements = [
    "licensing",
    "terms & conditions",
    "privacy policy"
  ]
  const date = new Date()

  return (
    <>
      <footer className=" pt-10 md:pt-20 pb-10 bg-[url('/images/footerpurplebg.jpg')] bg-no-repeat bg-contain bg-left">
        <div className="container ">
          <div className="flex flex-col gap-5 lg:flex-row items-center justify-between">
            <div className=" lg:max-w-[368px] lg:h-[293px] w-full flex flex-col justify-between items-start">
              <div>
                <Link href={'/'} >
                  <Image className=" md:hidden cursor-pointer" src={'/icons/logofooter.svg'} width={247} height={35} alt="logo" />
                  <Image className="hidden md:block cursor-pointer" src={'/icons/footerlogo.svg'} width={247} height={35} alt="logo" />
                </Link>
                <p className=" mt-[15px] md:mt-8 text-subparagraph text-sm leading-5">Template Studio is the place to find free of cost high-quality design resources for designers, creative agencies and developers</p>
              </div>
              <div className=" hidden lg:flex items-center lg:max-w-[250px] w-full justify-between my-10 lg:mt-0">
                {
                  socialicons?.map((item, index) => {
                    return (
                      <Fragment key={index}>
                        <Link href={'#'}>
                          <Image className="transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.1] hover:rotate-6" width={30} height={30} src={`/icons/${item.icon}`} alt="icons" />
                        </Link>
                      </Fragment>
                    )
                  })
                }
              </div>
            </div>
            <div className="lg:max-w-[874px] my-5 lg:my-0 grid grid-cols-2  grid-areas-layout gap-5 w-full md:flex md:justify-between">
              <div>
                <h3 className="text-xl font-semibold leading-7 text-subheading">Design </h3>
                <ul className="flex flex-col gap-y-[10px] md:gap-y-[25px] mt-5 md:mt-10">
                  {
                    desgintags?.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          <Link href={'#'}><div className="h-6  overflow-hidden group inline-block"><p className="flex flex-col transition-all duration-500 group-hover:-translate-y-[26px]">
                            <span className=" text-[14px] md:text-[16px] text-subparagraph leading-6 capitalize ">{item}</span>
                            <span className=" capitalize transition-all duration-500 text-subheading group-hover:border-b-[1px] group-hover:border-primary-100">{item}</span>
                          </p></div></Link>
                        </Fragment>
                      )
                    })
                  }
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold leading-7 text-subheading">Coded  </h3>
                <ul className="flex flex-col gap-y-[10px] md:gap-y-[25px] mt-5 md:mt-10">
                  {
                    codetypes?.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          <Link href={'#'}><div className="h-6  overflow-hidden group inline-block"><p className="flex flex-col transition-all duration-500 group-hover:-translate-y-[26px]">
                            <span className="text-[14px] md:text-[16px] text-subparagraph leading-6 capitalize ">{item}</span>
                            <span className=" capitalize transition-all duration-500 text-subheading group-hover:border-b-[1px] group-hover:border-subheading">{item}</span>
                          </p></div></Link>
                        </Fragment>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="md:max-w-[370px] w-full col-span-2">
                <h3 className="text-xl font-semibold leading-7 text-subheading">Join Our Newsletter</h3>
                <p className="text-subparagraph text-sm leading-5 mt-5 md:mt-10">Sign Up Our Newsletter And Get Notified About Exclusive Freebies!</p>
                <div className="flex items-center border border-primary-100 mt-5">
                  <input className="placeholder:leading-6 placeholder:text-subparagraph ml-[15px] w-full outline-none" type="text" name="" id="" placeholder="Enter your email" />
                  <Button variant="primary" className="py-2 px-4 md:py-3 md:px-9" >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="  md:mt-[30px] pt-[30px] flex justify-between flex-col lg:flex-row gap-y-[30px]  border-t">
            <div className=" col-span-1 lg:hidden flex items-center lg:max-w-[250px] w-full justify-around   ">
              {
                socialicons?.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <Link href={'#'}>
                        <Image className="transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.1] hover:rotate-6" width={30} height={30} src={`/icons/${item.icon}`} alt="icons" />
                      </Link>
                    </Fragment>
                  )
                })
              }
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full items-center" >
              <div>
                <h3 className="text-subparagraph text-[14px] md:text-[16px] leading-6 text-center md:text-start pb-4 md:pb-0">Template Studio | © {date.getFullYear()} All Rights Reserved</h3>
              </div>
              <div className="flex justify-center md:justify-end items-center">
                <ul className="flex items-center gap-[21px] md:gap-x-6 text-center ">
                  {
                    agreements?.map((item, index) => {
                      return (<Fragment key={index}>
                        <Link href={'#'}>
                          <li className="h-6  overflow-hidden group inline-block"><p className="flex flex-col transition-all duration-500 group-hover:-translate-y-[26px]">
                            <span className="text-[14px] md:text-[16px] text-subparagraph leading-6 capitalize text-nowrap ">{item}</span>
                            <span className=" capitalize transition-all duration-500 text-subheading group-hover:border-b-[1px] group-hover:border-subheading text-nowrap">{item}</span>
                          </p>
                          </li></Link>
                      </Fragment>)
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
