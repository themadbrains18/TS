
import Button from '@/components/ui/Button'
import React from 'react'
const page = () => {
    return (
        <>
            <div className='flex items-center flex-col py-10 justify-between'>
                <h2 className='text-4xl font-bold leading-10 text-center'>Welcome Template Studio</h2>
                <div className='flex items-center gap-x-5 justify-center mt-5'>
                <Button link="/login">
                    Log in
                </Button>
                <Button link="/register">
                    sign up
                </Button>
                </div>
            </div>
        </>
    )
}

export default page