
'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Icon from '@/components/Icon';
import HideTemplate from '@/components/popups/HideTemplate';
import DeleteTemplate from '@/components/popups/DeleteTemplate';
import DashInput from '../addtemplate/components/DashInput';
import useFetch from '@/hooks/useFetch';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface Template {
  templates:
  {
    id: string; // Add ID to template
    title: string;
    templateType: string;
    version: string;
    price: number;
    deleted: boolean
    active: boolean
  }[]

}
const AddTemplate = () => {
  const { data: session } = useSession()
  const { data: response, loading, fetchData } = useFetch<Template>();
  const { loading: deletealltemplateloading, fetchData: deletealltemplate } = useFetch<Template>();

  /**
 * Fetches all templates for the dashboard using a GET request.
 *
 * @async
 * @function fetchTemplates
 * @description This function sends a GET request to the specified endpoint (`/all-templatesdashboard`) 
 *              to retrieve all templates.
 *              The results are expected to be stored in the `response` state.
 *
 * @returns {Promise<void>} A Promise that resolves when the fetch operation is complete.
 *                          It updates the `fetchData` state with the fetched templates.
 */
  const fetchTemplates = async () => {
    await fetchData(`/all-templatesdashboard`, { method: "GET" });
  };

  useEffect(() => {
    fetchTemplates();
  }, [fetchData]);

  /**
 * Array representing the headings for the templates table.
 *
 * @constant {Array<{heading: string}>}
 * @description This array holds objects with heading labels for columns in a templates table.
 *              Each object contains a `heading` key with the column name as the value.
 */

  const templateheading = [
    { heading: "No." },
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

  // template status active and inactive 
  /**
 * State variable to store the status of the template.
 * @type {boolean | undefined}
 */
  const [templateStatus, setTemplateStatus] = useState<boolean>()

  /**
   * State variable to store the ID of the template.
   * @type {any}
   */
  const [templateid, setTemplateid] = useState<any>()
  /**
 * State variable to indicate whether the status update loader is active.
 * @type {boolean}
 */
  const [templateStatusLoader, setTemplateStatusLoader] = useState(false)



  /**
 * Handles updating the status of a template by sending a POST request to the server.
 * 
 * - Retrieves the `templateid` and sends it along with the `templateStatus` to the API.
 * - Displays a loader while the update is in progress.
 * - Logs the response on success or error.
 * - Calls additional functions (`fetchTemplates` and `closePopup`) after a successful update.
 *
 * @async
 * @function handleupdatestatus
 * @returns {Promise<void>} - Resolves when the status update operation completes.
 */
  const handleupdatestatus = async () => {
    const id = templateid
    setTemplateStatusLoader(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templatestatus/${id}`, {
        method: "POST",
        body: JSON.stringify({
          "active": templateStatus
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        console.error("Failed to update template status:", errorResponse);
        return;
      }

      const data = await res.json();
      console.log("Template status updated successfully:", data);
      fetchTemplates();
      closePopup();

    } catch (error) {
      console.error("Error updating template status:", error);
    }
    finally {
      setTimeout(() => {
        setTemplateStatusLoader(false)
      }, 1500);
    }
  };

  /**
 * Opens a popup dialog by setting the current template index and displaying the popup.
 *
 * @function openPopup
 * @param {number} index - The index of the template to display in the popup.
 * @description This function sets the `currentTemplateIndex` and opens the popup by setting `isPopupOpen` to `true`.
 */

  const openPopup = (index: number) => {
    setCurrentTemplateIndex(index);
    setIsPopupOpen(true);
  };

  /**
   * Closes the popup dialog by resetting the relevant state variables.
   *
   * @function closePopup
   * @description This function sets `isPopupOpen` to `false`, clears `currentTemplateIndex` and `deletePopupIndex`.
   */

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentTemplateIndex(null);
    setDeletePopupIndex(null);
  };

  /**
   * Confirms the action to hide or unhide an icon associated with a template.
   *
   * @function confirmHide
   * @description This function toggles the visibility state of an icon based on the current template index.
   *              It then closes the popup using `closePopup()`.
   */

  const confirmHide = () => {
    handleupdatestatus()
    if (currentTemplateIndex !== null) {
      setHideIconStates((prev) => {
        const newStates = [...prev];
        newStates[currentTemplateIndex] = !newStates[currentTemplateIndex];
        return newStates;
      });
    }
  };



  /**
 * Handles the deletion of a template.
 *
 * @function handleDelete
 * @param {string} id - The ID of the template to be deleted.
 * @async
 * @description This function sends a DELETE request to remove a template by its ID. After a successful deletion,
 *              it optionally refetches the list of templates.
 * @throws {Error} If the deletion operation fails, an error is thrown.
 */
  const handleDelete = async (id: string) => {
    try {
      await fetchData(`/templates/${id}`, { method: 'DELETE' });
      // Optionally refetch templates after deletion
      await fetchData(`/all-templatesdashboard`, { method: "GET" });
    } catch (error) {
      console.log('Error deleting template:', error);
    }
  };



  useEffect(() => {
    if (response) {
      closePopup()
    }
  }, [response])


  const handleSearch = async (value: string) => {
    await fetchData(`/templateswithdraft/search?query=${value}`)
  }

  // delete all template functions

  const [confirmationpopup, setConfirmationPopup] = useState(false);
  const [loadingdeletetemplate, setLoadingdeletetemplate] = useState(false);

  const deletealltemplatepopupopen = () => {
    setConfirmationPopup(true);
  };

  const deletealltemplatepopupclose = () => {
    setConfirmationPopup(false);
  };


  /**
 * Handles the deletion of all templates.
 *
 * @function handleDeleteAllTemplate
 * @async
 * @description This function sends a DELETE request to remove all templates.
 *              After successful deletion, it refetches the list of templates.
 * @throws {Error} If the deletion operation fails, an error is thrown.
 */

  const handleDeleteAllTemplate = async () => {
    console.log("Delete All Template initiated");
    setLoadingdeletetemplate(true);
    try {
      await deletealltemplate(`/deletealltemplates`, { method: 'DELETE' });

      await fetchData(`/all-templatesdashboard`, { method: "GET" });
    } catch (error) {
      console.error('Error deleting template:', error);
    } finally {
      setLoadingdeletetemplate(false);
      deletealltemplatepopupclose();
    }
  };

  return (
    <>
      {confirmationpopup && (
        <DeleteTemplate
          loading={loadingdeletetemplate}
          customtext="Are you sure you want to delete all templates?"
          isPopupOpen={confirmationpopup}
          closePopup={deletealltemplatepopupclose}
          setDelete={handleDeleteAllTemplate}
        />
      )}

      <section className="py-5">

        {isPopupOpen && (
          <HideTemplate templateStatusLoader={templateStatusLoader} isPopupOpen={isPopupOpen} setHide={confirmHide} closePopup={closePopup} />
        )}

        {deletePopupIndex !== null && (
          <DeleteTemplate
            loading={loading}
            setDelete={() => handleDelete(response?.templates[deletePopupIndex]?.id || "")}
            isPopupOpen={deletePopupIndex !== null}
            closePopup={closePopup} />
        )}

        <div className="container">
          <div>
            <div>
              <div className='flex justify-between gap-x-2 items-center pt-5 py-10'>
                <div className=''><Link className="w-[276px]" href={'/'}>
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
                {
                  response && response?.templates?.length > 0 &&
                  < Button onClick={deletealltemplatepopupopen} variant='primary' className="py-2 min-[600px]:py-3 text-nowrap"  >
                    delete all template
                  </Button>
                }
              </div>
            </div>
          </div>
          <div className="">
            <div className="overflow-x-scroll w-full mt-10 hiddenscroll">
              <table className="min-w-full border-collapse table-auto">

                <thead>
                  <tr className="bg-gray-100">
                    {templateheading?.map((item, index) => (
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
                      {response?.templates?.map((template: any, index: number) => (
                        <tr key={index} className={`  ${template?.isdraft ? "bg-yellow-50 group hover:bg-yellow-100" : "hover:bg-gray-50"} `}>
                          <td className="px-6 py-5 text-sm  md:text-base text-subparagraph capitalize  md:max-w-full font-semibold">
                            {index + 1}
                          </td>
                          <td className="   px-6 py-5 text-sm  md:text-base text-subparagraph capitalize  md:max-w-full font-semibold">
                            <h2 className='max-w-[300px] truncate'>

                              {template.title}
                              <span className={`  group-hover:text-red-400 text-yellow-700`} >
                                {
                                  template?.isdraft && `  (Draft)`
                                }
                              </span>
                            </h2>
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
                            {
                              !template?.isdraft && (
                                <>
                                  <Icon
                                    onClick={() => {
                                      openPopup(index);
                                      setTemplateid(template?.id);
                                      setTemplateStatus(!template?.active);
                                    }}
                                    className="w-6 h-6 fill-subheading cursor-pointer"
                                    name={template?.active == true ? "showicon" : "hideicon"}
                                  />
                                </>
                              )
                            }
                            <Icon
                              onClick={() => setDeletePopupIndex(index)}
                              className="w-6 h-6 fill-subheading cursor-pointer"
                              name="deleteicon"
                            />

                            <Icon
                              onClick={() => { router.push(`/dashboard/edit/${template.id}`); router.refresh(); }}
                              className="w-5 h-6 fill-subheading cursor-pointer"
                              name="editicon"
                            />
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : response?.templates && response?.templates.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-5 text-center text-sm md:text-base text-gray-500">
                        No Templates Found.
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default AddTemplate;

