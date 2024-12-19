import React, { Suspense } from 'react'
import TemplateForm from '../../addtemplate/components/templateForm'
import NotFound from '@/app/not-found';
import { TechTemplate } from '@/types/type';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/libs/auth';

const page = async ({ params }: { params: { id: string } }) => {

  const template = async (): Promise<TechTemplate | any | number> => {
    // Get server session
    let session: Session | null = await getServerSession(authOptions)
    // Check if user session exists
    if (!session?.user) return 'Unauthorize'


    // Fetch template data by ID
    const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${params.id}`, {
      method: 'GET', // HTTP GET method for fetching data
      headers: {
        'Content-Type': 'application/json', // Specify content type
        'ngrok-skip-browser-warning': 'true' // Skip browser warning for ngrok
      },

    });


    // Return null if no response is received

    if (!response) return null

    // Parse and return JSON data from the response
    return await response.json();
  };

  const getData = await template();// Execute the template function



  // Check if the fetched data is null
  if (getData == null) {
    return <NotFound />  // Render NotFound component if no data is found
  }



  return (
    <>
      <Suspense
        fallback={<>
          <div className="hover:bg-gray-50 animate-pulse">
            <div className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize max-w-[200px] truncate md:max-w-full font-semibold">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="px-6 py-5 text-sm md:text-base text-subparagraph capitalize">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="px-6 py-5 text-sm md:text-base text-subparagraph flex gap-x-2 flex-nowrap">
              <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
              <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
              <div className="w-6 h-6 bg-gray-200 rounded mr-2"></div>
            </div>
          </div>
        </>}>
        <TemplateForm initialData={getData} type='edit' id={params?.id} />
      </Suspense>
    </>
  )
}

export default page