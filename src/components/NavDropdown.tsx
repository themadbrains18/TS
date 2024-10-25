import React from "react";
import Icon from "./Icon";
import NavTabs from "./NavTabs";
import { navdropdownprops } from "@/types/type";


/**
 * NavDropdown component displays a dropdown menu for navigation,
 * including a title and a set of navigation tabs.
 *
 * @param {navdropdownprops} props - The props for the NavDropdown component.
 * @param {string} props.title - The title of the dropdown.
 * @returns {JSX.Element} The rendered NavDropdown component.
 */

const NavDropdown: React.FC<navdropdownprops> = ({ title, subCat }) => {

  return (
    <>
      <section className=" group">
        <div className="inline-block gap-[7px]  cursor-pointer after:content-[''] after:absolute after:bottom-[-6px]  after:h-[1px] after:bg-primary-100 after:w-0 after:left-[50%] after:transition-all after:duration-[0.5s] group-hover:after:w-full group-hover:after:left-0 relative mx-[7px] text-nowrap">
          <h2 className='text-textheading leading-6 font-inter font-medium transition-all duration-[0.5s] group-hover:text-primary-100 cursor-pointer inline-block'>
            {title}
          </h2>
          <Icon
            className="inline-block w-5 h-5 py-1 fill-subheading  rotate-90 leading-6 transition-all duration-[0.5s] group-hover:fill-primary-100 group-hover:rotate-[270deg]  "
            name="soliddownicon"
          />
        </div>
        <div className="hiddenscroll max-w-[60.3vw]  overflow-scroll flex absolute top-[110px] left-[24.8%] transition-all duration-[0.5s] opacity-0 invisible    group-hover:visible group-hover:opacity-[1] cursor-pointer shadow-md">
          <NavTabs subCat={subCat} />
        </div>
      </section>
      <div className="overflow-hidden h-0 duration-[0.5s]">dsfdefdsfdfdfgd</div>
    </>
  );
};

export default NavDropdown;
