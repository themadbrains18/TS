import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import Icon from '../Icon';
import SearchDropdown from '../SearchDropdown';
import { navtabprops } from '@/types/type';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { Template } from '@/app/(dashboard)/dashboard/components/AddTemplate';

const SearchComponent: React.FC<navtabprops> = ({ subCat, classname, opensearch, openinput, mainclass, searchresults, resinputoff }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data: templates, error, loading, fetchData } = useFetch<Template>();
    // State to manage desktop search bar visibility
    // const [opensearch, setOpensearch] = useState(false)

    const handleSearch = async (query: string, categoryId: string) => {
        fetchData(`/templates/search?query=${query}&subCategoryId=${categoryId || ''}`, {
            method: 'GET',
        });
    };

    useEffect(() => {
        // console.log(searchQuery,"==searchQuery")

        handleSearch(searchQuery, selectedCategory);

    }, [searchQuery, selectedCategory]);

    return (
        <div className={` ${mainclass} flex items-center relative justify-end`}>
            <div className="p-[10px]">
                <Icon name="search" className="cursor-pointer" onClick={openinput} />
            </div>
            <div className={cn`
            ${classname}
            flex items-center justify-between  opacity-0 border-[1px] bg-white border-primary-100 transition-all duration-[0.5s] absolute 
                    ${opensearch !== false ? "opacity-[1] visible  p-[5px] lg:p-[10px] right-0 " : "opacity-0 invisible right-[-100%] p-0 "}`
            }
            >
                <div className="border-r-[1px] border-divider-200 md:pr-[10px] md:mr-[10px] pr-[5px] mr-[5px] ">
                    <SearchDropdown
                        subCat={subCat}
                        onSelect={(id) => setSelectedCategory(id)}
                    />
                </div>

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search all templates...."
                    className="my-[10px] placeholder:text-sm placeholder:text-subparagraph leading-5 outline-none"
                />
                <Icon name="crossicon" className="cursor-pointer fill-primary-100"
                    onClick={() => {
                        setSearchQuery("");
                        if (openinput) openinput(); // Ensure openinput is defined before calling
                    }}
                />
            </div>
            {/* Render search results */}
            {opensearch && <div className={cn`${searchresults} search-results absolute top-[104%] mt-2 w-full min-w-[180px] bg-white shadow-lg rounded-md overflow-y-auto z-[99]`}>
                {loading && <p className="p-4 text-gray-500 text-center">Loading...</p>}
                {templates?.templates && templates?.templates?.length > 0 ? (
                    templates?.templates?.map((template) => (
                        <Link href={`/productdetail/${template?.id}`} key={template?.id}>
                            <div
                                onClick={() => console.log("hell0")}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b w-full last:border-b-0"
                            >
                                <p className="text-sm text-gray-800 font-medium truncate">
                                    {template?.title}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    !loading && <p className="p-4  text-gray-500 text-center">No results found</p>
                )}
            </div>}

        </div>
    );
};

export default SearchComponent;
