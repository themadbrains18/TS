
'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Icon from '@/components/Icon';
import HideTemplate from '@/components/popups/HideTemplate';
import DeleteTemplate from '@/components/popups/DeleteTemplate';
import DashInput from '../addtemplate/components/DashInput';
import useFetch from '@/hooks/useFetch';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export interface Template {
  templates:
  {
    id: string; // Add ID to template
    title: string;
    templateType: string;
    version: string;
    price: number;
    deleted: boolean
  }[]

}
const AddTemplate = () => {

  const { data: response, error, loading, fetchData } = useFetch<Template>();

  const fetchTemplates = async () => {
    await fetchData("/all-templates", { method: "GET" });
  };
  useEffect(() => {

    fetchTemplates();
  }, [fetchData]);

  const templateheading = [
    { heading: "template name" },
    { heading: "template type" },
    { heading: "version" },
    { heading: "price" },
    { heading: "action" },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState<number | null>(null);
  const [hideIconStates, setHideIconStates] = useState<boolean[]>(Array(response?.templates?.length).fill(false));
  const [deletePopupIndex, setDeletePopupIndex] = useState<number | null>(null);

  const router = useRouter(); 

  const openPopup = (index: number) => {
    setCurrentTemplateIndex(index);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentTemplateIndex(null);
    setDeletePopupIndex(null); 
  };

  const confirmHide = () => {
    if (currentTemplateIndex !== null) {
      setHideIconStates((prev) => {
        const newStates = [...prev];
        newStates[currentTemplateIndex] = !newStates[currentTemplateIndex];
        return newStates;
      });
    }
    closePopup(); 
  };

  /**
   * Function to handle the DELETE request
   */
  const handleDelete = async (id: string) => {
    try {
      await fetchData(`/templates/${id}`, { method: 'DELETE' });
      // Optionally refetch templates after deletion
      await fetchData("/all-templates", { method: "GET" });
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  /**
   * Function to handle navigation to edit page
   */
  const handleEdit = (index: number) => {
    router.push(`/addtemplate`);
  };

  useEffect(() => {
    if (response) {
      closePopup()
    }
  }, [response])


  const handleSearch = async (value: string) => {
    if (value === "") {
      fetchTemplates()
    }
    await fetchData(`/templates/search?query=${value}`)
  }

  return (
    <>
      <section className="py-5">
        {isPopupOpen && (
          <HideTemplate isPopupOpen={isPopupOpen} setHide={confirmHide} closePopup={closePopup} />
        )}
        {deletePopupIndex !== null && (
          <DeleteTemplate setDelete={() => handleDelete(response?.templates[deletePopupIndex]?.id || "")} isPopupOpen={deletePopupIndex !== null} closePopup={closePopup} />
        )}
        <div className="container">

          <div>
            <div>
              <div className='flex justify-between gap-x-2 items-center pt-5 py-10'>

                <div className=''>  <Link className="w-[276px]" href={'/'}>
                  <Image
                    src={"/icons/Logo.svg"}
                    width={276}
                    height={40}
                    alt="Logo"
                  />
                </Link></div>
                <div className="flex items-center justify-end">
                  <Button className="py-2" onClick={() => { signOut() }}>logout</Button>
                </div>
              </div>
              <div className="flex flex-col min-[600px]:flex-row gap-x-5 gap-y-5 min-[600px]:gap-y-0  justify-between items-center">
                <DashInput className="max-w-lg w-full hover:border-primary-100 focus:border-primary-100" placeholder="Search" type="text" onChange={(e) => { handleSearch(e.target.value) }} />
                  <Button link="/dashboard/addtemplate" className="py-2 min-[600px]:py-3 text-nowrap"  >add template</Button>
              </div>
            </div>
          </div>
          <div className="">
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
                  {response?.templates && response?.templates.length > 0 ? (
                    <>
                      {response?.templates.map((template: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize max-w-[200px] truncate md:max-w-full font-semibold">
                            {template.title}
                          </td>
                          <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
                            {template.templateType?.name}
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
                            <Icon onClick={() => router.push(`/dashboard/edit/${template?.id}`)} className="w-5 h-6 fill-subheading cursor-pointer" name="editicon" />
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr className="hover:bg-gray-50 animate-pulse">
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize max-w-[200px] truncate md:max-w-full font-semibold">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </td>
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </td>
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </td>
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </td>
                      <td className="px-6 py-5 text-sm md:text-base text-subparagraph flex gap-x-2 flex-nowrap">
                        <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
                        <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
                        <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
                      </td>
                    </tr>
                  )}
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

