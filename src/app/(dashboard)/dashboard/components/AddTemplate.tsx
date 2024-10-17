'use client';

import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import DashInput from '../../addtemplate/components/DashInput';
import Button from '@/components/ui/Button';
import Icon from '@/components/Icon';
import HideTemplate from '@/components/popups/HideTemplate';
import DeleteTemplate from '@/components/popups/DeleteTemplate';

const AddTemplate = () => {
  interface TemplateData {
    name: string;
    type: string;
    version: string;
    price: string;
  }

  const templates: TemplateData[] = [
    {
      name: "Cosmetic Products eCommerce UI Kit",
      type: "UI Template",
      version: "01",
      price: "$9",
    },
    {
      name: "PetCare E-Commerce Project for Shop Food for Pet",
      type: "UI Template",
      version: "01",
      price: "$5",
    },
    {
      name: "Beautify - Landing Page Design For cosmetic products",
      type: "UI Template",
      version: "01",
      price: "$10",
    },
    {
      name: "Organic Food Store Template",
      type: "UI Template",
      version: "01",
      price: "$10",
    },
    {
      name: "Grocery Store - Multipurpose Shopping Delivery Application",
      type: "UI Template",
      version: "01",
      price: "$9",
    },
  ];

  const templateheading = [
    { heading: "template name" },
    { heading: "template type" },
    { heading: "version" },
    { heading: "price" },
    { heading: "action" },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState<number | null>(null);
  const [hideIconStates, setHideIconStates] = useState<boolean[]>(Array(templates.length).fill(false));
  const [deletePopupIndex, setDeletePopupIndex] = useState<number | null>(null); // Add this state
  const [deletePost, setDeletePost] = useState<boolean>(false);

  const router = useRouter(); // Initialize useRouter

  const openPopup = (index: number) => {
    setCurrentTemplateIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentTemplateIndex(null);
    setDeletePopupIndex(null); // Reset delete popup index when closing
  };

  const confirmHide = () => {
    if (currentTemplateIndex !== null) {
      // Toggle the hide icon state for the clicked index
      setHideIconStates((prev) => {
        const newStates = [...prev];
        newStates[currentTemplateIndex] = !newStates[currentTemplateIndex];
        return newStates;
      });
    }
    closePopup(); // Close the popup after confirming
  };

  const setDelete = () => {
    setDeletePost(!deletePost);
    closePopup();
  };

  // Function to handle navigation to edit page
  const handleEdit = (index: number) => {
    console.log(index)
    router.push(`/addtemplate`);
  };

  return (
    <>
      <section className="py-5">
        {isPopupOpen && (
          <HideTemplate isPopupOpen={isPopupOpen} setHide={confirmHide} closePopup={closePopup} />
        )}
        {deletePopupIndex !== null && (
          <DeleteTemplate setDelete={setDelete} isPopupOpen={deletePopupIndex !== null} closePopup={closePopup} />
        )}
        <div className="container">
          <div className="px-5">
            <div className="flex flex-col gap-y-5">
              <div className="flex items-center justify-end">
                <Button className="py-2" children="logout" />
              </div>
              <div className="flex justify-center items-center">
                <DashInput className="max-w-lg w-full hover:border-primary-100 focus:border-primary-100" placeholder="Search" type="text" onChange={() => { }} />
              </div>
            </div>
          </div>
          <div className="py-10">
            <div className="flex justify-center md:justify-end md:pb-6 md:px-5">
              <Button link="/addtemplate" className="py-2" children="add template" />
            </div>

            <div className="overflow-x-scroll w-full mt-10 hiddenscroll">
              <table className="min-w-full border-collapse table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    {templateheading.map((item, index) => (
                      <Fragment key={index}>
                        <th className="text-nowrap px-6 py-5 text-left text-sm md:text-base font-semibold text-subheading capitalize">
                          {item.heading}
                        </th>
                      </Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {templates.map((template, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize max-w-[200px] truncate md:max-w-full font-semibold">
                        {template.name}
                      </td>
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
                        {template.type}
                      </td>
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
                        {template.version}
                      </td>
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
                        {template.price}
                      </td>
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph flex gap-x-2 flex-nowrap">
                        {hideIconStates[index] ? (
                          <Icon onClick={() => openPopup(index)} className="w-6 h-6 fill-subheading cursor-pointer" name="hideicon" />
                        ) : (
                          <Icon onClick={() => openPopup(index)} className="w-6 h-6 fill-subheading cursor-pointer" name="showicon" />
                        )}
                        <Icon onClick={() => setDeletePopupIndex(index)} className="w-6 h-6 fill-subheading cursor-pointer" name="deleteicon" />
                        <Icon onClick={() => handleEdit(index)} className="w-5 h-6 fill-subheading cursor-pointer" name="editicon" /> {/* Edit icon click */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTemplate;
