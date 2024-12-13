
import Button from '@/components/ui/Button'
import React from 'react'
import AddTemplate from './components/AddTemplate'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';
import { redirect } from 'next/navigation';
const page = async () => {
    const session = await getServerSession(authOptions);

    /**
     * If the user is logged in, redirect to the home page
     */
    if (!session) {
        redirect('/login');
    }
    if (session?.role !== "ADMIN") {
        redirect('/')
    }

    return (
        <>
            <AddTemplate />
        </>
    )
}

export default page