import Image from "next/image";
import React from "react";
import NavDropdown from "../NavDropdown";
import Icon from "./Icon";
import Button from "./Button";
const Header = () => {
  return (
    <>
      <header className=" bg-[#ffffff80] backdrop:blur-xl relative">
        <div className="container">
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
            <div className="max-w-[576px] w-full flex items-center justify-end">
              <div className="flex items-center">
                <Icon name="search" className="w-10 h-10 cursor-pointer"/>
                <Button variant="primary" className=" py-[13px] px-[30px]" children="sign up"/>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
