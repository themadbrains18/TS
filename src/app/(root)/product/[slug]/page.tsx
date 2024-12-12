import React, { Suspense } from 'react';
import MainSection from '../../productdetail/[id]/components/MainSection';
import NotFound from '@/app/not-found';
import { Metadata } from 'next';
import TemplateFetcher from '@/helper/TemplateFetcher';

interface Params {
  slug: string;
}

const page = async ({ params }: { params: Params }) => {
  const { slug } = params;

  const templateid = await TemplateFetcher(slug);


  let id = templateid

  // Fetch the specific template by ID
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      next: { revalidate: 0 },
    }
  );

  if (!response.ok) {
    return <NotFound />;
  }

  // Parse the template data
  const template = await response.json();
  // console.log(template, "templatetemplatetemplate")


  // Custom Spinner Component
  const CustomSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#872fcb] rounded-full animate-spinCustom"></div>
    </div>
  );

  return (
    <Suspense fallback={<CustomSpinner />}>
      <MainSection template={template} />
    </Suspense>
  );
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;

  try {
    // Use `await` to get the ID from the async function
    const id = await TemplateFetcher(slug);

    if (!id) {
      throw new Error("Failed to retrieve template ID");
    }

    // Fetch the product details using the retrieved ID
    const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/templates-by-id/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch template data");
    }

    const siteData = await response.json();

    return {
      title: siteData.metatitle || "Template Studio - Product Details",
      description: siteData.description || "Discover detailed insights about our templates and products.",
      openGraph: {
        title: siteData.title || "Template Studio - Product Details",
        description: siteData.description || "Discover detailed insights about our templates and products.",
        images: siteData.images || ["/images/default-og-image.jpg"],
      },
      twitter: {
        title: siteData.title || "Template Studio - Product Details",
        description: siteData.description || "Discover detailed insights about our templates and products.",
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Template Studio - Discover Our Products",
      description: "Explore our collection of creative templates and innovative products.",
      openGraph: {
        title: "Template Studio - Discover Our Products",
        description: "Explore our collection of creative templates and innovative products.",
        images: ["/images/default-og-image.jpg"],
      },
      twitter: {
        title: "Template Studio - Discover Our Products",
        description: "Explore our collection of creative templates and innovative products.",
      },
    };
  }
}

export default page;