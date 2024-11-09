"use client";

import React, { Fragment, useRef, useState, useEffect } from 'react';
import ProductBanner from './ProductBanner';
import ProductFilterside from './ProductFilterside';
import FeatureCard from '@/components/cards/FeatureCard';
import Icon from '@/components/Icon';
import ProductTags from './ProductTags';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Button from '@/components/ui/Button';
import { useSearchParams } from 'next/navigation';
import { TechTemplate, TemplateResponse } from '@/types/type';
import useDebounce from '@/hooks/useDebounce'; // Import the useDebounce hook
import FeatureSkeleton from '@/components/skeletons/FeatureSkeleton';
import NotFoundProduct from './NotFountproduct';

const ProductMain = () => {
    const searchParams = useSearchParams();
    const templateTypeId = searchParams.get('template-type');
    const subCatId = searchParams.get('subcat');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [items, setItems] = useState<string[]>([]);
    const [products, setProducts] = useState<TemplateResponse | null>(null);
    const [loading, setLoading] = useState(true);  // Initially true while loading


    // State to manage selected filters and debounced filter values
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const debouncedFilters = useDebounce(items, 300); // Debounce the filters

    const Sortdata = [
        {
            title: "Newest releases",
        },
        {
            title: "Most popular",
        },
        {
            title: "Best Seller",
        }
    ];
    const removeItem = (index: number) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };

    const [filter, setFilter] = useState(false);
    const openFilter = () => setFilter(true);
    const closefilter = () => setFilter(false);

    const [sort, setSort] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Sort by");

    const sorthandledropdown = () => setSort(!sort);

    const handleItemClick = (itemTitle: string) => {
        setSelectedSort(itemTitle);

        setSort(false);
    };

    const dropdownRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(dropdownRef, sorthandledropdown);

    /*
    * Fetches products (templates) from an API with optional filters, sorting, and pagination.
    *
    * This function is used to retrieve a list of templates based on the provided filters, sorting options, and pagination information.
    * It constructs a dynamic API URL based on the parameters, makes a request to the backend, and returns the data in a standardized response format.
    *
    * @param page - The current page number for pagination.
    * @param filters - An array of filters to apply to the API query (optional).
    * @param sort - A string representing the sorting parameter (optional).
    *
    */

    const fetchProducts = async (page: number, filters: string[] = [], sort: string): Promise<TemplateResponse> => {
        try {
            setLoading(true);
            let apiUrl = `${process.env.NEXT_PUBLIC_APIURL}/templates?page=${page}&limit=12`;

            if (templateTypeId !== null && subCatId !== null) {
                apiUrl = `${process.env.NEXT_PUBLIC_APIURL}/templates?templateTypeId=${templateTypeId}&subCatId=${subCatId}&page=${page}&limit=12`;
            }

            if (filters.length > 0) {
                // Group filters by filterType
                const groupedFilters: { [key: string]: string[] } = {};

                filters.forEach(filter => {
                    const [value, filterType] = filter.split(',');
                    const trimmedValue = value.trim();
                    const trimmedFilterType = filterType.trim();

                    if (!groupedFilters[trimmedFilterType]) {
                        groupedFilters[trimmedFilterType] = [];
                    }
                    groupedFilters[trimmedFilterType].push(trimmedValue);
                });


                // Construct the query string
                const filterQueryParts: string[] = [];

                // Check each filter type and build the query accordingly
                if (groupedFilters['Price Range']) {
                    const priceRanges = groupedFilters['Price Range'].map(range => range.replace('$', '').trim()).join(','); // Remove dollar signs if needed
                    filterQueryParts.push(`priceRanges=${priceRanges}`);
                }

                if (groupedFilters['Industries']) {
                    const industryTypeIds = groupedFilters['Industries'].join(','); // Join industries with commas
                    filterQueryParts.push(`industryTypeIds=${industryTypeIds}`);
                }

                if (groupedFilters['Software Type']) {
                    const softwareTypeIds = groupedFilters['Software Type'].join(','); // Join software types with commas
                    filterQueryParts.push(`softwareTypeIds=${softwareTypeIds}`);
                }

                // Combine all query parts into the final query string
                const filterQuery = filterQueryParts.join('&');

                if (filterQuery) {
                    apiUrl += `&${filterQuery}`;
                }
            }
            if (sort) {
                apiUrl += `&sortBy=${sort}`;
            }

            const response = await fetch(apiUrl);
            const data: TemplateResponse = await response.json();

            setTotalPages(data?.pagination?.totalPages || 1);
            setCurrentPage(data?.pagination?.currentPage || 1);
            return data;

        } catch (error) {
            console.error("Error fetching products:", error);
            return { data: [], pagination: { totalTemplates: 0, totalPages: 0, currentPage: 1, limit: 12 } };
        }
        finally {
            setLoading(false);
        }
    };

    /**
     * Effect to fetch products based on filters
    */
    useEffect(() => {
        const getProducts = async () => {
            const initialProducts = await fetchProducts(1, debouncedFilters, selectedSort);
            setProducts(initialProducts);
        };
        getProducts();
    }, [templateTypeId, subCatId, debouncedFilters, selectedSort]); 


    /*
    * Handles the loading of more products (templates) when the user scrolls to the bottom of the list or clicks a "Load More" button.
    *
    * This function checks if the current page is less than the total number of pages, and if so, it fetches the next page of products,
    * updates the products state with the new data, and maintains the existing data in the list.
    *
    * @param currentPage - The current page number of the products being displayed.
    * @param totalPages - The total number of available pages of products.
    * @param fetchProducts - A function used to fetch products (templates) from the API.
    * @param debouncedFilters - The filters to be applied to the products list (debounced to avoid excessive API calls).
    * @param selectedSort - The current sorting option for the products (e.g., by price, by name).
    */
    const handleLoadMore = async () => {
        if (currentPage < totalPages) {
            const newProducts = await fetchProducts(currentPage + 1, debouncedFilters, selectedSort);
            setProducts((prev) => ({
                ...prev,
                data: [...(prev?.data || []), ...newProducts.data],
                pagination: newProducts.pagination
            }));
        }
    };
    
    return (
        <>
            <ProductBanner />
            <ProductTags />
            <section>
                <div className='pt-[50px] pb-10 lg:pb-20 bg-bgcolor'>
                    <div className='container'>
                        <div className='flex gap-[30px] flex-col md:flex-row justify-between'>
                            <div className={`md:sticky md:top-10 fixed top-0 h-screen duration-[1s] z-10 transition-all ${filter ? "left-0" : "left-[-100%]"} max-w-full sm:max-w-[357px] w-full`}>
                                <ProductFilterside closefilter={closefilter} items={items} setItems={setItems} setSelectedFilters={setSelectedFilters} /> {/* Pass setSelectedFilters */}
                            </div>
                            <div className='w-full'>
                                <div className="flex max-[768px]:flex-col-reverse md:flex justify-between pb-5 md:border-b md:mb-[30px] items-center">
                                    <div className='md:max-w-[600px] w-full overflow-x-scroll md:overflow-hidden flex-nowrap flex md:flex-wrap gap-[10px] hiddenscroll'>
                                        {items.map((item, index) => (
                                            <div key={Date.now() + index}>
                                                <div className="border-[1px] py-[6px] px-[14px] flex items-center w-full max-w-max bg-primary-300 gap-[5px]">
                                                    <span className="whitespace-nowrap text-xs tab:text-sm font-normal leading-5 text-subparagraph">
                                                        {item.split(',')[2]}
                                                    </span>
                                                    <div className="cursor-pointer" onClick={() => removeItem(index)}>
                                                        <Icon color='#5D5775' name="closeicon" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {items.length > 0 && (
                                            <button className="py-[2px] px-[15px] flex gap-1 items-center" onClick={() => setItems([])}>
                                                <h2 className='text-[14px] font-normal text-subparagraph text-nowrap'>Clear All</h2>
                                                <Icon color='#5D5775' name="closeicon" />
                                            </button>
                                        )}
                                    </div>
                                    <div className='text-end md:text-inherit flex justify-between pb-[10px] md:pb-0 items-center md:items-start max-[768px]:w-full'>
                                        <div onClick={openFilter} className='flex gap-[5px] items-center md:hidden'>
                                            <Icon name='filter' />
                                            <h3 className='lg:text-[18px] leading-[28px] font-normal text-subparagraph'>Filters</h3>
                                        </div>
                                        <div className='relative cursor-pointer' onMouseEnter={() => setSort(true)} onMouseLeave={() => setSort(false)}>
                                            <div onClick={sorthandledropdown} className={`border duration-[0.5s] ${sort ? "border-primary-100" : "border-divider-100"} group pr-[15px] pl-5 py-[8px] flex gap-[6px] items-center`}>
                                                <h2 className={`text-primary text-4 font-semibold leading-6 duration-[0.2s] ${sort ? "text-primary-100" : "text-subheading"} text-nowrap`}>
                                                    {selectedSort}
                                                </h2>
                                                <div className={`${sort ? "rotate-0" : "rotate-[180deg]"} duration-[0.5s]`}>
                                                    <Icon className={`p-1 ${sort ? "[&>*]:fill-primary-100" : "[&>*]:fill-[#5D5775]"}`} name="sortaroow" />
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

                                <div className='flex flex-col gap-[30px] justify-center items-center'>
                                    {loading ? (
                                        <div className='transition-all duration-300 w-full grid gap-5 lg:grid-cols-2 xl:grid-cols-3 xl:gap-[30px]'>
                                            <FeatureSkeleton />
                                            <FeatureSkeleton />
                                            <FeatureSkeleton />
                                            <FeatureSkeleton />
                                            <FeatureSkeleton />
                                            <FeatureSkeleton />
                                        </div>
                                    ) : products && products.data && products.data.length > 0 ? (
                                        // Show products when data is loaded and length is greater than 0
                                        <div className='grid gap-5  w-full lg:grid-cols-2 xl:grid-cols-3 xl:gap-[30px]'>
                                            {products && products?.data?.length > 0 && products?.data?.map((item: TechTemplate, index: number) => (
                                                <Fragment key={index}>
                                                    <FeatureCard
                                                        id={item?.id}
                                                        buttonprops={item?.price}
                                                        category={item?.templateType?.name}
                                                        poster={item?.sliderImages[0]?.imageUrl}
                                                        themeicon={item?.softwareType?.name}
                                                        title={item?.title}
                                                        uploadericon={item?.user?.profileImg}
                                                        uploadername={item?.user?.name}
                                                        currentimage={1}
                                                        totalimages={item?.sliderImages?.length}
                                                        isPaid={true}
                                                    />
                                                </Fragment>
                                            ))}
                                        </div>
                                    ) : (
                                        <NotFoundProduct />
                                    )}
                                    {currentPage < totalPages && (
                                        <Button
                                            className='w-fit mt-[30px] py-[13px] px-[30px] text-[18px] leading-6 font-semibold'
                                            variant='solidicon'
                                            onClick={handleLoadMore}
                                        >
                                            Load More Products
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};



export default ProductMain;
