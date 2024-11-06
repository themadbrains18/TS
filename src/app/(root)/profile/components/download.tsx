// import React, { Fragment, useEffect, useState } from 'react';
// import DownloadCard from '@/components/cards/DownloadCard';
// import Icon from '@/components/Icon';
// import Button from '@/components/ui/Button';
// import useFetch from '@/hooks/useFetch';
// import { DownloadInterface } from '@/types/type';

// const Download = () => {
//   const [sort, setSort] = useState(false);
//   const [category, setCategory] = useState(false);
//   const [selectedSort, setSelectedSort] = useState("Last Day");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [page, setPage] = useState(1);
//   const [downloads, setDownloads] = useState<DownloadInterface[]>([]);
//   const [hasMoreData, setHasMoreData] = useState(true);  // Track if more data is available
//   const { data, loading, error, fetchData } = useFetch<{ downloads: DownloadInterface[] }>();

//   const sorthandledropdown = () => setSort(!sort);
//   const sortcategory = () => setCategory(!category);

//   const Sortdata = [
//     { title: "Last Day" },
//     { title: "Last 7 Day" },
//     { title: "Last 30 Day" },
//     { title: "Last Quarter" },
//     { title: "Last Year" },
//   ];

//   const Categorydata = [
//     { title: "All" },
//     { title: "Free Download" },
//     { title: "Premium" },
//   ];
//   // Handle sorting and resetting data
//   const handleItemClick = (itemTitle: string) => {
//     setSelectedSort(itemTitle);
//     resetDownloads();
//   };

//   // Handle category changes and resetting data
//   const handleCategoryClick = (itemTitle: string) => {
//     setSelectedCategory(itemTitle);
//     resetDownloads();
//   };

//   // Reset downloads for sorting or category change
//   const resetDownloads = () => {
//     setPage(1);
//     setDownloads([]);
//     setHasMoreData(true);
//   };

//   // Fetch data when page, sort, or category changes
//   useEffect(() => {
//     fetchData(`/get-user-downloads?page=${page}&sort=${selectedSort}&category=${selectedCategory}`);
//   }, [page, selectedSort, selectedCategory]);

//   useEffect(() => {
//     if (data) {
//       const newDownloads = data.downloads.filter(
//         (download) => !downloads.some((prev) => prev.id === download.id)
//       );
//       if (newDownloads.length === 0) {
//         setHasMoreData(false);  // No more data to load
//       } else {
//         setDownloads((prevDownloads) => [...prevDownloads, ...newDownloads]);
//       }
//     }
//   }, [data]);

//   // // Edge case: handle when no downloads are available
//   // if (!loading && downloads.length === 0 && !error) {
//   //   return <p className="text-center py-10 text-subheading">No downloads available.</p>;
//   // }

//   return (
//     <>
//       <section>
//         <div className="container">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row items-start gap-[10px] sm:gap-0 sm:items-center justify-start sm:justify-between">
//             <h2 className="text-[28px] font-bold leading-9 text-subheading">Downloads</h2>
//             <div className="flex gap-x-4 max-w-full w-full sm:w-auto">
//               {/* Category Selector */}
//               <div className="relative cursor-pointer w-full sm:w-auto" onMouseEnter={() => setCategory(true)} onMouseLeave={() => setCategory(false)}>
//                 <div onClick={sortcategory} className={`w-full border duration-[0.5s] flex gap-x-[5px] bg-white   ${category ? "border-primary-100" : "border-divider-100"} group py-2 px-[10px] sm:px-5 items-center`}>
//                   <Icon className={`w-5 h-5 ${category ? "[&>*]:fill-primary-100" : "[&>*]:fill-[#5D5775]"}`} name="setting" />
//                   <h2 className={`text-primary text-lg font-normal leading-7 duration-[0.2s] ${category ? "text-primary-100" : "text-subheading"} text-nowrap max-w-14 truncate`}>
//                     {selectedCategory}
//                   </h2>
//                 </div>
//                 <div className={`absolute right-0 max-[640px]:left-0 ${category ? "opacity-1 visible" : "opacity-0 invisible"} duration-[0.5s] top-[45px] z-10 bg-white`}>
//                   {Categorydata.map((item, index) => (
//                     <h4 key={index + item.title} onClick={() => handleCategoryClick(item.title)} className="text-subparagraph text-start leading-6 py-2 px-3 sm:px-[30px]  capitalize cursor-pointer hover:bg-primary-200 border-l-[2px] hover:border-primary-100 text-nowrap max-w-[208px] truncate">
//                       {item.title}
//                     </h4>
//                   ))}
//                 </div>
//               </div>
//               {/* Sort Selector */}
//               <div className="relative cursor-pointer w-full sm:w-auto" onMouseEnter={() => setSort(true)} onMouseLeave={() => setSort(false)}>
//                 <div onClick={sorthandledropdown} className={`w-full border duration-[0.5s] flex flex-nowrap gap-x-[6px] ${sort ? "border-primary-100" : "border-divider-100"} group py-2 px-[10px] sm:px-5 sm:pr-[15px] items-center`}>
//                   <h2 className={`text-primary text-base font-semibold leading-6 duration-[0.2s] ${sort ? "text-primary-100" : "text-subheading"} text-nowrap max-w-20 truncate`}>
//                     {selectedSort}
//                   </h2>
//                   <Icon className={`p-1 w-5 h-5 transition-all duration-300 ${sort ? "[&>*]:fill-primary-100 rotate-180 " : " rotate-0 [&>*]:fill-[#5D5775]"}`} name="sortaroow" />
//                 </div>
//                 <div className={`absolute right-0 max-[640px]:left-0 ${sort ? "opacity-1 visible" : "opacity-0 invisible"} duration-[0.5s] top-[45px] z-10 bg-white`}>
//                   {Sortdata.map((item, index) => (
//                     <h4 key={index + item.title} onClick={() => handleItemClick(item.title)} className="text-subparagraph text-start leading-6 py-2 px-[30px] capitalize cursor-pointer hover:bg-primary-200 border-l-[2px] hover:border-primary-100 text-nowrap max-w-[208px] truncate">
//                       {item.title}
//                     </h4>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Error Message */}
//           {error && <p className="text-center py-10 text-error">Failed to load downloads. Please try again later.</p>}
//           {/* Download Cards */}
//           <div className="py-10 sm:py-0">
//             <div className="grid sm:grid-cols-2 min-[1042px]:grid-cols-3 gap-5 xl:gap-[30px] mt-5">
//               {downloads.map((item) => (
//                 <Fragment key={item.id}>
//                   <DownloadCard
//                     tittle={item.template.title}
//                     date={new Date(item.downloadedAt).toLocaleDateString()}
//                     image={item.template.sliderImages[0]?.imageUrl}
//                     premium={item.template.price > 0}
//                     url={item?.template?.sourceFiles[0]?.fileUrl}
//                   />
//                 </Fragment>
//               ))}
//             </div>
//             {/* Load More Button */}
//             {hasMoreData && !error && (
//               <div className="mt-5 flex justify-center">
//                 <Button
//                   className="w-full justify-center sm:w-auto"
//                   variant="primary"
//                   onClick={() => setPage((prevPage) => prevPage + 1)}
//                 >
//                   {loading ? "Loading..." : "Load More"}
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Download;


import React, { useEffect, useState } from 'react';
import DownloadCard from '@/components/cards/DownloadCard';
import Icon from '@/components/Icon';
import Button from '@/components/ui/Button';
import useFetch from '@/hooks/useFetch';
import { DownloadInterface } from '@/types/type';
import DownloadSkeleton from '@/components/skeletons/DownloadSkeleton';

const Download = () => {
  const [sort, setSort] = useState(false);
  const [category, setCategory] = useState(false);
  const [selectedSort, setSelectedSort] = useState("All Downloads"); // Default to show all downloads
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to show all downloads
  const [page, setPage] = useState(1);
  const [downloads, setDownloads] = useState<DownloadInterface[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const { data, loading, error, fetchData } = useFetch<{ downloads: DownloadInterface[] }>();

  const Sortdata = [
    { title: "All Downloads" },
    { title: "Last Day" },
    { title: "Last 7 Day" },
    { title: "Last 30 Day" },
    { title: "Last Quarter" },
    { title: "Last Year" },
  ];

  const Categorydata = [
    { title: "All" },
    { title: "Free Download" },
    { title: "Premium" },
  ];


  const handleItemClick = (itemTitle: string) => {
    if (selectedSort !== itemTitle) { // Only update if the sort option changes
      setSelectedSort(itemTitle);
      resetDownloads();
    }
  };

  const handleCategoryClick = (itemTitle: string) => {
    if (selectedCategory !== itemTitle) { // Only update if the category option changes
      setSelectedCategory(itemTitle);
      resetDownloads();
    }
  };

  const resetDownloads = () => {
    setPage(1);
    setDownloads([]);
    setHasMoreData(true);
  };

  useEffect(() => {
    fetchData(`/get-user-downloads?page=${page}&sort=${selectedSort}&category=${selectedCategory}`);
  }, [page, selectedSort, selectedCategory]);

  useEffect(() => {
    if (data) {
      const newDownloads = data.downloads.filter(
        (download) => !downloads.some((prev) => prev.id === download.id)
      );
      if (newDownloads.length === 0) {
        setHasMoreData(false);
      } else {
        setDownloads((prevDownloads) => [...prevDownloads, ...newDownloads]);
      }
    }
  }, [data]);

  return (
    <section>
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start gap-[10px] sm:gap-0 sm:items-center justify-start sm:justify-between">
          <h2 className="text-[28px] font-bold leading-9 text-subheading">Downloads</h2>
          <div className="flex gap-x-4 max-w-full w-full sm:w-auto">
            {/* Category Dropdown */}
            <div
              className="relative cursor-pointer w-full sm:w-auto"
              onMouseEnter={() => setCategory(true)}
              onMouseLeave={() => setCategory(false)}
            >
              <div
                onClick={() => setCategory(!category)}
                className={`w-full border duration-[0.5s] flex gap-x-[5px] bg-white ${category ? "border-primary-100" : "border-divider-100"
                  } group py-2 px-[10px] sm:px-5 items-center`}
              >
                <Icon
                  className={`w-5 h-5 ${category ? "[&>*]:fill-primary-100" : "[&>*]:fill-[#5D5775]"
                    }`}
                  name="setting"
                />
                <h2
                  className={`text-primary text-lg font-normal leading-7 duration-[0.2s] ${category ? "text-primary-100" : "text-subheading"
                    } text-nowrap max-w-14 truncate`}
                >
                  {selectedCategory}
                </h2>
              </div>
              {/* Category Dropdown Items */}
              <div
                className={`absolute right-0 max-[640px]:left-0 ${category ? "opacity-1 visible" : "opacity-0 invisible"
                  } duration-[0.5s] top-[45px] z-10 bg-white`}
              >
                {Categorydata.map((item, index) => (
                  <h4
                    key={index + item.title}
                    onClick={() => handleCategoryClick(item.title)}
                    className="text-subparagraph text-start leading-6 py-2 px-3 sm:px-[30px] capitalize cursor-pointer hover:bg-primary-200 border-l-[2px] hover:border-primary-100 text-nowrap max-w-[208px] truncate"
                  >
                    {item.title}
                  </h4>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div
              className="relative cursor-pointer w-full sm:w-auto"
              onMouseEnter={() => setSort(true)}
              onMouseLeave={() => setSort(false)}
            >
              <div
                onClick={() => setSort(!sort)}
                className={`w-full border duration-[0.5s] flex flex-nowrap gap-x-[6px] ${sort ? "border-primary-100" : "border-divider-100"
                  } group py-2 px-[10px] sm:px-5 sm:pr-[15px] items-center`}
              >
                <h2
                  className={`text-primary text-base font-semibold leading-6 duration-[0.2s] ${sort ? "text-primary-100" : "text-subheading"
                    } text-nowrap max-w-20 truncate`}
                >
                  {selectedSort}
                </h2>
                <Icon
                  className={`p-1 w-5 h-5 transition-all duration-300 ${sort ? "[&>*]:fill-primary-100 rotate-180 " : " rotate-0 [&>*]:fill-[#5D5775]"
                    }`}
                  name="sortaroow"
                />
              </div>
              {/* Sort Dropdown Items */}
              <div
                className={`absolute right-0 max-[640px]:left-0 ${sort ? "opacity-1 visible" : "opacity-0 invisible"
                  } duration-[0.5s] top-[45px] z-10 bg-white`}
              >
                {Sortdata.map((item, index) => (
                  <h4
                    key={index + item.title}
                    onClick={() => handleItemClick(item.title)}
                    className="text-subparagraph text-start leading-6 py-2 px-3 sm:px-[30px] capitalize cursor-pointer hover:bg-primary-200 border-l-[2px] hover:border-primary-100 text-nowrap max-w-[208px] truncate"
                  >
                    {item.title}
                  </h4>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Download Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[28px] mb-10">
          {loading ? (
            <>
              <DownloadSkeleton />
              <DownloadSkeleton />
              <DownloadSkeleton />
              <DownloadSkeleton />
              <DownloadSkeleton />
              <DownloadSkeleton />
            </>
          ) : downloads.length > 0 ? (
            downloads.map((item) => (
              <DownloadCard
                key={item.id}
                tittle={item.template.title}
                date={new Date(item.downloadedAt).toLocaleDateString()}
                image={item.template.sliderImages[0]?.imageUrl}
                premium={item.template.price > 0}
                url={item?.template?.sourceFiles[0]?.fileUrl}
              />
            ))
          ) : (
            <div className="text-center col-span-full text-gray-500">
              Oops! the content you looking for was not found
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMoreData && !error && downloads.length > 0 && (
          <div className="mt-5 flex justify-center">
            <Button
              className="w-full justify-center sm:w-auto"
              variant="primary"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              {loading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Download;

