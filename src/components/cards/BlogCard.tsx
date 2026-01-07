"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  featuredImage?: string;
  date: string;
  slug: string;
  author?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  id, 
  title, 
  excerpt, 
  featuredImage, 
  date, 
  slug,
  author 
}) => {
  const [imgSrc, setImgSrc] = useState(featuredImage || '/images/dummy1.png');

  const handleImageError = () => {
    setImgSrc('/images/dummy1.png');
  };

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Strip HTML tags from excerpt
  const cleanExcerpt = excerpt.replace(/<[^>]*>/g, '').substring(0, 120) + '...';

  return (
    <div className='group border border-divider-100 animate-zoom flex flex-col bg-white justify-between h-full'>
      <div className='relative h-auto'>
      
        <Image
          src={imgSrc}
          onError={handleImageError}
          className='w-full h-auto object-cover max-h-[170px]'
          width={370}
          height={278}
          alt={title}
        />
        <Link href={`/blog/${slug}`}>
          <div className='absolute top-0 right-0 left-0 bottom-0 group-hover:bg-[#28204699] max-[500px]:bg-[#28204699] transition-all duration-[0.5s] flex items-center justify-center cursor-pointer'>
            <div className='flex items-center justify-center cursor-pointer z-10 group-hover:opacity-100 sm:opacity-0 duration-[0.5s]'>
              <h3 className='capitalize text-white text-lg font-bold leading-7'>Read More</h3>
            </div>
          </div>
        </Link>
      </div>
      <div className='flex flex-col h-full justify-between'>
        <div className='px-[10px] pt-[10px] md:px-5 md:pt-3 bg-white'>
          <div className='flex items-start justify-between w-full pb-[10px] md:pb-5'>
            <h3 className='text-subparagraph font-semibold leading-6 capitalize text-xs tab:text-[15px] max-w-[190px] sm:max-w-[400px] line-clamp-2'>
              {title}
            </h3>
          </div>
          <p className='text-subheading text-xs leading-5 mb-3 line-clamp-3'>
            {cleanExcerpt}
          </p>
        </div>
        <div className='flex items-center justify-between bg-white p-[10px] md:px-5 md:py-3 border-t border-divider-100'>
          <div className='flex items-center gap-x-2'>
            <p className='text-subparagraph text-xs leading-5'>
              <span className='text-subheading pr-[4px]'>{formattedDate}</span>
            </p>
          </div>
          <Link href={`/blog/${slug}`}>
            <button className='py-[5px] px-[10px] text-sm leading-5 font-semibold capitalize bg-[#872fcb] text-white rounded hover:bg-[#6a1fa0] transition-colors'>
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

