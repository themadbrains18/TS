import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import Icon from '../Icon';
import SearchDropdown from '../SearchDropdown';
import { navtabprops } from '@/types/type';
import { cn } from '@/libs/utils';
import Link from 'next/link';

interface Template {
    templates:
    {
        id: string; // Add ID to template
        slug: string;
        title: string;
        templateType: string;
        version: string;
        price: number;
        deleted: boolean
    }[]
}

const SearchComponent: React.FC<navtabprops> = ({ subCat, classname, opensearch, openinput, mainclass, searchresults, resinputoff }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data: templates, error, loading, fetchData } = useFetch<Template>();
    const [showSearch, setShowSearch] = useState<boolean>(false)
    // Handle search request
    const handleSearch = async (query: string, categoryId: string) => {
        fetchData(`/templates/search?query=${query}&subCategoryId=${categoryId || ''}`, {
            method: 'GET',
        });
    };

    // Trigger search whenever the searchQuery or selectedCategory changes

    useEffect(() => {
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
                ${opensearch ? "opacity-[1] visible  p-[5px] lg:p-[10px] right-0 " : "opacity-0 invisible right-[-100%] p-0 "}`
            }>
                <div className="border-r-[1px] border-divider-200 md:pr-[10px] md:mr-[10px] pr-[5px] mr-[5px] ">
                    <SearchDropdown
                        subCat={subCat}
                        onSelect={(id) => setSelectedCategory(id)}
                    />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {setSearchQuery(e.target.value) , setShowSearch(true)} }
                    placeholder="Search all templates...."
                    className="my-[10px] placeholder:text-sm placeholder:text-subparagraph leading-5 outline-none"
                />
                <Icon name="crossicon" className="cursor-pointer fill-primary-100"
                    onClick={() => {
                        setSearchQuery("");
                        setShowSearch(false)
                        if (openinput) openinput(); // Ensure openinput is defined before calling
                    }}
                />
            </div>

            {/* Render search results */}
            {showSearch && searchQuery.length > 0 && <div className={cn`${searchresults} search-results absolute top-[104%] mt-2 w-full min-w-[180px] duration-100 bg-white shadow-lg rounded-md overflow-y-auto z-[99] custom-scrollbar-horizon  `}>
                {loading && <p className="p-4 text-gray-500 text-center">Loading...</p>}

                {/* Display results or no results found */}
                {!loading && templates?.templates?.length === 0 && searchQuery !== '' && (
                    <p className="p-4 text-gray-500 text-center">No results found</p>
                )}

                {/* Display the templates */}
                {templates?.templates?.map((template) => (
                    <Link href={`/product/${template?.slug}`} key={template?.id}>
                        <div onClick={resinputoff} className=" cursor-pointer border-b w-full last:border-b-0">
                            <p className="text-subparagraph text-start  leading-6 py-2 px-[30px] capitalize  cursor-pointer  text-nowrap hover:bg-primary-200 border-l-[2px] hover:border-primary-100 text-sm font-medium truncate md:max-w-[200px] ">
                                {template?.title}
                            </p>
                        </div>
                    </Link>
                ))}

            </div>}
        </div>
    );
};

export default SearchComponent;
