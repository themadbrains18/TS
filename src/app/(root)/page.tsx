import HeroSection from "./home/components/HeroSection";
import TrendingTechnology from "./home/components/TrendingTechnology";
import FeatureSection from "./home/components/FeatureSection";
import BuissnessProducts from "./home/components/BuissnessProducts";
import PopularSection from "./home/components/PopularSection";
import type { Metadata } from "next";

/**
 * Home component serves as the main landing page of the application.
 * It includes several sections that highlight features, trending technologies,
 * business products, and popular items.
 *
 * @component
 * @returns {JSX.Element} The rendered Home component containing various sections.
 */
const Home = () => {
  return (
    <>
      {/* Various sections of the home page */}
      <HeroSection />
      <TrendingTechnology />
      <FeatureSection />
      <BuissnessProducts />
      {/* <PopularSection /> */}
    </>
  );
};

// Dynamic metadata (for SEO customization)
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Example logic to fetch data or build metadata dynamically
    // const siteData = await fetch('https://api.example.com/home').then((res) => res.json());

    return {
      title:  'Template Studio - High Quality Web & Mobile UI/UX Templates',
      description: 'Explore our homepage for more details.',
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'Welcome to Mad Brains, where creativity meets innovation. Explore our homepage to discover cutting-edge designs, insights, and tools that empower your projects. Dive into a world where your ideas come to life.',
      description: 'Welcome to Template Studio, where creativity meets innovation. Explore our homepage to discover cutting-edge designs, insights, and tools that empower your projects. Dive into a world where your ideas come to life',
      twitter: {
        title: 'Welcome to Mad Brains, where creativity meets innovation. Explore our homepage to discover cutting-edge designs, insights, and tools that empower your projects. Dive into a world where your ideas come to life.',
        description: 'Welcome to Template Studio, where creativity meets innovation. Explore our homepage to discover cutting-edge designs, insights, and tools that empower your projects. Dive into a world where your ideas come to life',
      },
    };
  }
}

export default Home;
