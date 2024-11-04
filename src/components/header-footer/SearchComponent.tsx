import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';
import Icon from '../Icon';
import SearchDropdown from '../SearchDropdown';
import { navtabprops } from '@/types/type';
import { cn } from '@/libs/utils';
import Link from 'next/link';
import { Template } from '@/app/(dashboard)/dashboard/components/AddTemplate';

const SearchComponent: React.FC<navtabprops> = ({ subCat }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { data: templates, error, loading, fetchData } = useFetch<Template>();
    // State to manage desktop search bar visibility
    const [opensearch, setOpensearch] = useState(false)

    const handleSearch = async (query: string, categoryId: string) => {
        fetchData(`/templates/search?query=${query}&subCategoryId=${categoryId || ''}`, {
            method: 'GET',
        });
    };

    useEffect(() => {
        console.log(searchQuery,"==searchQuery")
            
            handleSearch(searchQuery, selectedCategory);
        
    }, [searchQuery, selectedCategory]);

    return (
        <div className="flex items-center relative justify-end">
            <div className="p-[11px]">
                <Icon name="search" className="cursor-pointer" onClick={() => setOpensearch(!opensearch)} />
            </div>
            <div className={cn`flex items-center justify-between max-w-[410px] opacity-0 border-[1px] bg-white border-primary-100 transition-all duration-[0.5s] absolute ${opensearch !== false ? "opacity-[1] visible  p-[10px] right-0 " : "opacity-0 invisible right-[-100%] p-0 "}`}>
                <div className="border-r-[1px] border-divider-200 pr-[10px] mr-[10px]">
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
                <Icon name="crossicon" className="cursor-pointer fill-primary-100" onClick={() => { setSearchQuery(''), setOpensearch(!opensearch) }} />
            </div>
            {/* Render search results */}
           {opensearch &&  <div className="search-results absolute top-full mt-2 w-full min-w-[180px] bg-white shadow-lg rounded-md overflow-y-auto max-h-60 z-10">
                {loading && <p className="p-4 text-gray-500 text-center">Loading...</p>}
                {templates?.templates && templates?.templates?.length > 0 ? (
                    templates?.templates?.map((template) => (
                        <Link href={`/productdetail/${template?.id}`} key={template?.id}>
                        <div
                            
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b w-full last:border-b-0"
                            >
                            <p className="text-sm text-gray-800 font-medium truncate">
                                {template?.title}
                            </p>
                        </div>
                            </Link>
                    ))
                ) : (
                    !loading && <p className="p-4 text-gray-500 text-center">No results found</p>
                )}
            </div>}

        </div>
    );
};

export default SearchComponent;
