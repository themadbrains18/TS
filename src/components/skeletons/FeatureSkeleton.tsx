import React from 'react'

const FeatureSkeleton = () => {
    return (
        <>
            <div className=' animate-pulse'>
                <div className="relative">
                    <div className="w-full h-60 bg-gray-200 rounded"></div>
                    <div className="absolute top-0 right-0 left-0 bottom-0 bg-gray-200 opacity-50 flex items-center justify-center">
                        <div className="mt-3 h-6 bg-gray-200 rounded w-1/3"></div>
                    </div>
                </div>
                <div className="px-5 pt-5 bg-white">
                    <div className="flex items-center justify-between border-b border-divider-100 pb-5">
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                        <div className="rounded-md h-6 w-6 bg-gray-200"></div>
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white px-5 py-3">
                    <div className="rounded h-6 w-1/2 bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                        <div className="rounded-md h-6 w-6 bg-gray-200"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeatureSkeleton