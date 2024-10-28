'use client'

import DownloadCard from '@/components/cards/DownloadCard';
import Icon from '@/components/Icon';
import Button from '@/components/ui/Button';
import React, { Fragment, useState } from 'react'

const Download = () => {
  const [sort, setSort] = useState(false);
  const [category, setCategory] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Last Day");
  const [selectedCategory, setselectedCategory] = useState("All");
  const sorthandledropdown = () => setSort(!sort);
  const handleItemClick = (itemTitle: string) => {
    setSelectedSort(itemTitle);
    setSort(false);
  };
  const handleCategoryClick = (itemTitle: string) => {
    setselectedCategory(itemTitle);
    setSort(false);
  };
  const Sortdata = [
    {
      title: "Last Day",
    },
    {
      title: "Last 7 Day",
    },
    {
      title: "Last 30 Day",
    },
    {
      title: "Last Quarter",
    },
    {
      title: "Last Year",
    },
  ];
  const Categorydata = [
    {
      title: "All",
    },
    {
      title: "Free Download",
    },
    {
      title: "Premium",
    },
  ];

  const downloadTemplate = [
    {
      tittle: "Landing page",
      date: "24 Oct 2024",
      image: "download.pnf",
    },
    {
      tittle: "Landing page",
      date: "24 Oct 2024",
      image: "download.pnf",
    },
    {
      tittle: "Landing page",
      date: "24 Oct 2024",
      image: "download.pnf",
    },
    {
      tittle: "Landing page",
      date: "24 Oct 2024",
      image: "download.pnf",
    },
    {
      tittle: "Landing page",
      date: "24 Oct 2024",
      image: "download.pnf",
    },
    {
      tittle: "Landing page",
      date: "24 Oct 2024",
      image: "download.pnf",
    },
  ]
  return (
    <>
      <section>
        <div className="container">
          <div className='flex flex-col sm:flex-row items-start gap-[10px] sm:gap-0 sm:items-center justify-start sm:justify-between'>
            <h2 className='text-[28px] font-bold leading-9 text-subheading '>Downloads</h2>
            <div className='flex gap-x-4 max-w-full w-full sm:w-auto'>
              <div className='relative cursor-pointer w-full sm:w-auto' onMouseEnter={() => setCategory(true)} onMouseLeave={() => setCategory(false)}>
                <div onClick={sorthandledropdown} className={`w-full border duration-[0.5s] flex gap-x-[5px] bg-white ${category ? "border-primary-100" : "border-divider-100"} group py-2 px-[10px] sm:px-5 flex gap-[6px] items-center`}>
                  <Icon className={`w-5 h-5 ${category ? "[&>*]:fill-primary-100" : "[&>*]:fill-[#5D5775]"}`} name="setting" />
                  <h2 className={`text-primary text-lg font-normal leading-7 duration-[0.2s] ${category ? "text-primary-100" : "text-subheading"} text-nowrap`}>
                    {selectedCategory}
                  </h2>
                </div>
                <div className={`absolute right-0 ${category ? "opacity-1 visible" : "opacity-0 invisible"} duration-[0.5s] top-[45px] z-10 bg-white`}>
                  {Categorydata?.map((item, index) => (
                    <h4 key={index + item.title} onClick={() => handleCategoryClick(item.title)} className={`text-subparagraph text-start leading-6 py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-l-[2px] hover:border-primary-100`}>
                      {item.title}
                    </h4>
                  ))}
                </div>
              </div>
              <div className='relative cursor-pointer w-full sm:w-auto' onMouseEnter={() => setSort(true)} onMouseLeave={() => setSort(false)}>
                <div onClick={sorthandledropdown} className={`w-full border duration-[0.5s] ${sort ? "border-primary-100" : "border-divider-100"} group py-2 px-[10px] sm:px-5 flex gap-[6px] items-center`}>
                  <h2 className={`text-primary text-base font-semibold leading-6 duration-[0.2s] ${sort ? "text-primary-100" : "text-subheading"} text-nowrap`}>
                    {selectedSort}
                  </h2>
                  <div className={`${sort ? "rotate-0" : "rotate-[180deg]"} duration-[0.5s]`}>
                    <Icon className={`p-1 w-5 h-5 ${sort ? "[&>*]:fill-primary-100" : "[&>*]:fill-[#5D5775]"}`} name="sortaroow" />
                  </div>
                </div>
                <div className={`absolute right-0 ${sort ? "opacity-1 visible" : "opacity-0 invisible"} duration-[0.5s] top-[45px] z-10 bg-white`}>
                  {Sortdata?.map((item, index) => (
                    <h4 key={index + item.title} onClick={() => handleItemClick(item.title)} className={`text-subparagraph text-start leading-6 py-2 px-[30px] capitalize cursor-pointer text-nowrap hover:bg-primary-200 border-l-[2px] hover:border-primary-100`}>
                      {item.title}
                    </h4>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='py-10 sm:py-0'>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-[30px] mt-5'>
            {
              downloadTemplate?.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <DownloadCard date={item.date} image={item.image} tittle={item.tittle}/>
                  </Fragment>
                )
              })
            }
          </div>
            <div className='mt-5 flex justify-center'>
              <Button className='w-full justify-center sm:w-auto' variant='primary'>load more</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Download