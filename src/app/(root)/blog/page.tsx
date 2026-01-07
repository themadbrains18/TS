"use client";
import React, { useState, useEffect } from 'react';
import BlogCard from '@/components/cards/BlogCard';
import FeatureSkeleton from '@/components/skeletons/FeatureSkeleton';

interface CustomBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string | null;
  categories: string[];
}

interface CustomBlogResponse {
  page: number;
  total_posts: number;
  posts: CustomBlogPost[];
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<CustomBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  // WordPress API endpoint
  const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  useEffect(() => {
    // Debug: Log the env variable (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('WordPress API URL:', WORDPRESS_API_URL || 'NOT SET');
    }

    if (!WORDPRESS_API_URL || WORDPRESS_API_URL.trim() === '') {
      setError('WordPress API URL is not configured. Please add NEXT_PUBLIC_WORDPRESS_API_URL to your .env.local file and restart the dev server.');
      setLoading(false);
      return;
    }

    fetchBlogs(currentPage);
  }, [currentPage, WORDPRESS_API_URL]);

  const fetchBlogs = async (page: number) => {
    if (!WORDPRESS_API_URL) {
      setError('WordPress API URL is not configured.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Use URL directly from env and add pagination params
      const cleanUrl = WORDPRESS_API_URL.replace(/\/$/, '');
      const apiUrl = `${cleanUrl}?page=${page}&limit=12`;

      // WordPress REST API endpoint for posts
      // Include _embed to get featured image and author
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
      }

      const data: CustomBlogResponse = await response.json();
      
      // Calculate total pages from total_posts (12 posts per page)
      const calculatedTotalPages = Math.ceil(data.total_posts / 12);
      setTotalPages(calculatedTotalPages);
      setTotalPosts(data.total_posts);

      setBlogs(data.posts);
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while fetching blogs';
      setError(errorMessage);
      console.error('Error fetching blogs:', err);
      console.error('WordPress API URL used:', WORDPRESS_API_URL);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#872fcb]">
            Our Blog
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <FeatureSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4 text-[#872fcb]">Our Blog</h1>
            <div className="text-red-500 mb-4 whitespace-pre-line text-left max-w-2xl mx-auto bg-red-50 p-4 rounded">
              {error}
            </div>
            <div className="text-gray-600 space-y-2 max-w-2xl mx-auto">
              <p className="font-semibold">Troubleshooting Steps:</p>
              <ol className="list-decimal list-inside text-left space-y-2">
                <li>Verify WordPress REST API is working:
                  <br />
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {WORDPRESS_API_URL || 'YOUR_URL'}/wp-json/
                  </code>
                  <br />
                  <span className="text-sm text-gray-500">Open this URL in browser - you should see JSON response</span>
                </li>
                <li>Check if posts endpoint exists:
                  <br />
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {WORDPRESS_API_URL || 'YOUR_URL'}/wp-json/wp/v2/posts
                  </code>
                </li>
                <li>In WordPress admin, go to Settings → Permalinks and click "Save Changes" (this refreshes permalink structure)</li>
                <li>Make sure your WordPress site allows REST API access</li>
                <li>Check browser console (F12) for detailed error logs</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center my-8 text-[#872fcb]">
          Our Blog
        </h1>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No blogs found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  featuredImage={blog.image || undefined}
                  date={blog.date}
                  slug={blog.slug}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#872fcb] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#6a1fa0] transition-colors"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#872fcb] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#6a1fa0] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;

