import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Author {
  id: number;
  name: string;
  bio: string;
}

interface CustomBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string | null;
  content: string;
  categories: Category[];
  tags: string[];
  author: Author;
}

interface Params {
  slug: string;
}

// Custom Spinner Component
const CustomSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-[#872fcb] rounded-full animate-spinCustom"></div>
  </div>
);

const BlogDetailPage = async ({ params }: { params: Params }) => {
  const { slug } = params;

  const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!WORDPRESS_API_URL || WORDPRESS_API_URL.trim() === '') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">
              WordPress API URL is not configured. Please add NEXT_PUBLIC_WORDPRESS_API_URL to your .env.local file and restart the dev server.
            </p>
          </div>
        </div>
      </div>
    );
  }

  try {
    // Use URL directly from env and construct single post endpoint
    // Change /posts to /post and append slug
    const cleanUrl = WORDPRESS_API_URL.replace(/\/$/, '');
    const baseUrl = cleanUrl.replace('/posts', '/post');
    const apiUrl = `${baseUrl}/${slug}`;
    
    // Fetch single post by slug
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      notFound();
    }

    const blog: CustomBlogPost = await response.json();

    const featuredImage = blog.image;
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <Suspense fallback={<CustomSpinner />}>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#872fcb]">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 text-sm mb-3 flex-wrap">
                {blog.author && (
                  <span>
                    By <span className="font-semibold">{blog.author.name}</span>
                  </span>
                )}
                <span>•</span>
                <span>{formattedDate}</span>
              </div>
              
              {/* Categories */}
              {blog.categories && blog.categories.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-gray-600 text-sm font-medium">Categories:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {blog.categories.map((category) => (
                      <span
                        key={category.id}
                        className="px-3 py-1 bg-[#872fcb] text-white text-xs font-medium rounded-full hover:bg-[#6a1fa0] transition-colors"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-gray-600 text-sm font-medium">Tags:</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 text-gray-800 text-xs font-medium rounded-full hover:bg-gray-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {featuredImage && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <Image
                  src={featuredImage}
                  alt={blog.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover max-h-[600px]"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Back Button */}
            <div className="mt-12">
              <a
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#872fcb] text-white rounded hover:bg-[#6a1fa0] transition-colors"
              >
                ← Back to Blog
              </a>
            </div>
          </div>
        </div>
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching blog:', error);
    notFound();
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  try {
    if (!WORDPRESS_API_URL || WORDPRESS_API_URL.trim() === '') {
      return {
        title: 'Blog Post - Template Studio',
        description: 'Read our latest blog posts and articles.',
      };
    }

    // Use URL directly from env and construct single post endpoint
    const cleanUrl = WORDPRESS_API_URL.replace(/\/$/, '');
    const baseUrl = cleanUrl.replace('/posts', '/post');
    const apiUrl = `${baseUrl}/${slug}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        title: 'Blog Post - Template Studio',
        description: 'Read our latest blog posts and articles.',
      };
    }

    const blog: CustomBlogPost = await response.json();

    const featuredImage = blog.image;
    const excerpt = blog.excerpt.replace(/<[^>]*>/g, '').substring(0, 160);

    return {
      title: `${blog.title} - Template Studio Blog`,
      description: excerpt || 'Read our latest blog posts and articles.',
      openGraph: {
        title: blog.title,
        description: excerpt || 'Read our latest blog posts and articles.',
        images: featuredImage ? [featuredImage] : ['/images/default-og-image.jpg'],
        type: 'article',
        publishedTime: blog.date,
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: excerpt || 'Read our latest blog posts and articles.',
        images: featuredImage ? [featuredImage] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'Blog Post - Template Studio',
      description: 'Read our latest blog posts and articles.',
    };
  }
}

export default BlogDetailPage;

