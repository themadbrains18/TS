// 'use client';

// import React, { Fragment, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Button from '@/components/ui/Button';
// import Icon from '@/components/Icon';
// import HideTemplate from '@/components/popups/HideTemplate';
// import DeleteTemplate from '@/components/popups/DeleteTemplate';
// import DashInput from '../addtemplate/components/DashInput';
// import useFetch from '@/hooks/useFetch';

// const AddTemplate = () => {
//   // interface TemplateData {
//   //   name: string;
//   //   type: string;
//   //   version: string;
//   //   price: string;
//   // }

//   // const templates: TemplateData[] = [

//   //   {
//   //     name: "Cosmetic Products eCommerce UI Kit",
//   //     type: "UI Template",
//   //     version: "01",
//   //     price: "$9",
//   //   },

//   //   {
//   //     name: "PetCare E-Commerce Project for Shop Food for Pet",
//   //     type: "UI Template",
//   //     version: "01",
//   //     price: "$5",
//   //   },

//   //   {
//   //     name: "Beautify - Landing Page Design For cosmetic products",
//   //     type: "UI Template",
//   //     version: "01",
//   //     price: "$10",
//   //   },

//   //   {
//   //     name: "Organic Food Store Template",
//   //     type: "UI Template",
//   //     version: "01",
//   //     price: "$10",
//   //   },

//   //   {
//   //     name: "Grocery Store - Multipurpose Shopping Delivery Application",
//   //     type: "UI Template",
//   //     version: "01",
//   //     price: "$9",
//   //   },

//   // ];

//   interface Template {
//     templates: [
//       {
//         title: string;
//         templateType: string;
//         version: string;
//         price: number;
//       }
//     ]
//   }

//   const { data: response, error, loading, fetchData } = useFetch<Template[]>();

//   console.log(error)
//   // Fetch templates data on component mount
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       const result = await fetchData("/all-templates", {
//         method: "GET",
//         // body: JSON.stringify({ someKey: "someValue" }), // Optional body if needed
//       });
//     };

//     fetchTemplates();
//   }, [fetchData]);
//   console.log(response, "response")

//   const templateheading = [
//     { heading: "template name" },
//     { heading: "template type" },
//     { heading: "version" },
//     { heading: "price" },
//     { heading: "action" },
//   ];

//   const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
//   const [currentTemplateIndex, setCurrentTemplateIndex] = useState<number | null>(null);
//   const [hideIconStates, setHideIconStates] = useState<boolean[]>(Array(response?.templates?.length).fill(false));
//   const [deletePopupIndex, setDeletePopupIndex] = useState<number | null>(null); // Add this state
//   const [deletePost, setDeletePost] = useState<boolean>(false);

//   const router = useRouter(); // Initialize useRouter

//   const openPopup = (index: number) => {
//     setCurrentTemplateIndex(index);
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setCurrentTemplateIndex(null);
//     setDeletePopupIndex(null); // Reset delete popup index when closing
//   };

//   const confirmHide = () => {
//     if (currentTemplateIndex !== null) {
//       // Toggle the hide icon state for the clicked index
//       setHideIconStates((prev) => {
//         const newStates = [...prev];
//         newStates[currentTemplateIndex] = !newStates[currentTemplateIndex];
//         return newStates;
//       });
//     }
//     closePopup(); // Close the popup after confirming
//   };

//   const setDelete = () => {
//     setDeletePost(!deletePost);
//     closePopup();
//   };

//   // Function to handle navigation to edit page
//   const handleEdit = (index: number) => {
//     console.log(index)
//     router.push(`/addtemplate`);
//   };

//   return (
//     <>
//       <section className="py-5">
//         {isPopupOpen && (
//           <HideTemplate isPopupOpen={isPopupOpen} setHide={confirmHide} closePopup={closePopup} />
//         )}
//         {deletePopupIndex !== null && (
//           <DeleteTemplate setDelete={setDelete} isPopupOpen={deletePopupIndex !== null} closePopup={closePopup} />
//         )}
//         <div className="container">
//           <div className="px-5">
//             <div className="flex flex-col gap-y-5">
//               <div className="flex items-center justify-end">
//                 <Button className="py-2"  >logout</Button>
//               </div>
//               <div className="flex justify-center items-center">
//                 <DashInput className="max-w-lg w-full hover:border-primary-100 focus:border-primary-100" placeholder="Search" type="text" onChange={() => { }} />
//               </div>
//             </div>
//           </div>
//           <div className="py-10">
//             <div className="flex justify-center md:justify-end md:pb-6 md:px-5">
//               <Button link="/addtemplate" className="py-2"  >add template</Button>
//             </div>

//             <div className="overflow-x-scroll w-full mt-10 hiddenscroll">
//               <table className="min-w-full border-collapse table-auto">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     {templateheading.map((item, index) => (
//                       <Fragment key={index}>
//                         <th className="text-nowrap px-6 py-5 text-left text-sm md:text-base font-semibold text-subheading capitalize">
//                           {item.heading}
//                         </th>
//                       </Fragment>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {
//                     response?.templates && response?.templates.length > 0 ? (<>
//                       {response?.templates?.map((template: any, index: any) => (
//                         <tr key={index} className="hover:bg-gray-50">
//                           <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize max-w-[200px] truncate md:max-w-full font-semibold">
//                             {template.title}
//                           </td>
//                           <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
//                             {template.templateType?.name}
//                           </td>
//                           <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
//                             {template.version}
//                           </td>
//                           <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
//                             {template.price}
//                           </td>
//                           <td className="px-6 py-5 text-sm md:text-base text-subparagraph flex gap-x-2 flex-nowrap">
//                             {hideIconStates[index] ? (
//                               <Icon onClick={() => openPopup(index)} className="w-6 h-6 fill-subheading cursor-pointer" name="hideicon" />
//                             ) : (
//                               <Icon onClick={() => openPopup(index)} className="w-6 h-6 fill-subheading cursor-pointer" name="showicon" />
//                             )}
//                             <Icon onClick={() => setDeletePopupIndex(index)} className="w-6 h-6 fill-subheading cursor-pointer" name="deleteicon" />
//                             <Icon onClick={() => handleEdit(index)} className="w-5 h-6 fill-subheading cursor-pointer" name="editicon" /> {/* Edit icon click */}
//                           </td>
//                         </tr>
//                       ))}
//                     </>) : (<>
//                       <tr className="hover:bg-gray-50 animate-pulse">
//                         <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize max-w-[200px] truncate md:max-w-full font-semibold">
//                           <div className="h-4 bg-gray-200 rounded w-full"></div>
//                         </td>
//                         <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
//                           <div className="h-4 bg-gray-200 rounded w-full"></div>
//                         </td>
//                         <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
//                           <div className="h-4 bg-gray-200 rounded w-full"></div>
//                         </td>
//                         <td className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
//                           <div className="h-4 bg-gray-200 rounded w-full"></div>
//                         </td>
//                         <td className="px-6 py-5 text-sm md:text-base text-subparagraph flex gap-x-2 flex-nowrap">
//                           <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
//                           <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
//                           <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
//                         </td>
//                       </tr>
//                     </>)
//                   }

//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default AddTemplate;


'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Icon from '@/components/Icon';
import HideTemplate from '@/components/popups/HideTemplate';
import DeleteTemplate from '@/components/popups/DeleteTemplate';
import DashInput from '../addtemplate/components/DashInput';
import useFetch from '@/hooks/useFetch';

const AddTemplate = () => {
  interface Template {
    templates: [
      {
        id: string; // Add ID to template
        title: string;
        templateType: string;
        version: string;
        price: number;
        deleted:boolean
      }
    ]
  }

  const { data: response, error, loading, fetchData } = useFetch<Template[]>();

  useEffect(() => {
    const fetchTemplates = async () => {
      await fetchData("/all-templates", { method: "GET" });
    };

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
      setHideIconStates((prev) => {
        const newStates = [...prev];
        newStates[currentTemplateIndex] = !newStates[currentTemplateIndex];
        return newStates;
      });
    }
    closePopup(); // Close the popup after confirming
  };

  // Function to handle the DELETE request
  const handleDelete = async (id: string) => {
    console.log(id,"i am id ")
    try {
      await fetchData(`/templates/${id}`, { method: 'DELETE' });
      // Optionally refetch templates after deletion
      await fetchData("/all-templates", { method: "GET" });
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  // Function to handle navigation to edit page
  const handleEdit = (index: number) => {
    router.push(`/addtemplate`);
  };

  return (
    <>
      <section className="py-5">
        {isPopupOpen && (
          <HideTemplate isPopupOpen={isPopupOpen} setHide={confirmHide} closePopup={closePopup} />
        )}
        {deletePopupIndex !== null && (
          <DeleteTemplate setDelete={() => handleDelete(response?.templates[deletePopupIndex].id)} isPopupOpen={deletePopupIndex !== null} closePopup={closePopup} />
        )}
        <div className="container">
          <div className="px-5">
            <div className="flex flex-col gap-y-5">
              <div className="flex items-center justify-end">
                <Button className="py-2" >logout</Button>
              </div>
              <div className="flex justify-center items-center">
                <DashInput className="max-w-lg w-full hover:border-primary-100 focus:border-primary-100" placeholder="Search" type="text" onChange={() => { }} />
              </div>
            </div>
          </div>
          <div className="py-10">
            <div className="flex justify-center md:justify-end md:pb-6 md:px-5">
              <Button link="/dashboard/addtemplate" className="py-2"  >add template</Button>
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
                  {response?.templates && response?.templates.length > 0 ? (
                    <>
                      {response?.templates.map((template:any, index:any) => (
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
                            <Icon onClick={() => handleEdit(index)} className="w-5 h-6 fill-subheading cursor-pointer" name="editicon" />
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

