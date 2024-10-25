import React, { Suspense } from 'react'
import TemplateForm from '../../addtemplate/components/templateForm'
import NotFound from '@/app/not-found';
import { TechTemplate } from '@/types/type';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/libs/auth';

const page = async({ params }: { params: { id: string } }) => {

    const template = async (): Promise<TechTemplate | any | number> => {
        let session: Session | null = await getServerSession(authOptions)
        if (!session?.user) return 'Unauthorize'

        const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${params.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        if (!response) return null

    //    console.log(response);
       
        return await response.json();
    };

    let getData = await template();


    // if (getData === 'Unauthorize') {
    //     return <Unauthorize />
    // }

    if (getData == null) {
        return <NotFound />
    }


    return (
        <>
            <Suspense fallback={`<><div>Loading...</div></>`}>
                <TemplateForm  initialData={getData} type='edit' id={params?.id}/>
                {/* {(getData) === null ? <Dashborad404 /> : <Propertyform type="edit" initialData={getData} />} */}

            </Suspense>
        </>
    )
}

export default page