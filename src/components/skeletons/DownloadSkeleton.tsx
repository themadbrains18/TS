import React from 'react'

const DownloadSkeleton = () => {
  return (
    <div className="p-4 md:p-5 bg-gray-200">
    <div className="p-4 md:p-4 bg-gray-300 animate-pulse h-60"></div>
    <div className="pt-5 flex justify-between items-center">
      <div className="flex items-center gap-2 w-full justify-between">
        <div className="border border-gray-200 bg-gray-300 animate-pulse  w-[184px] h-10"></div>
        <div className="p-2 max-w-16 w-full bg-gray-300 animate-pulse h-10"></div>
      </div>
    </div>
  </div>
  )
}

export default DownloadSkeleton