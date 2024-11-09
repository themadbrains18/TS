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

        return await response.json();
    };

    const getData = await template();

    if (getData == null) {
        return <NotFound />
    }


    return (
        <>
            <Suspense fallback={`<><div>Loading...</div></>`}>
                <TemplateForm  initialData={getData} type='edit' id={params?.id}/>
            </Suspense>
        </>
    )
}

export default page