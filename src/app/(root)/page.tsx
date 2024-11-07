
import HeroSection from "./home/components/HeroSection";
import TrendingTechnology from "./home/components/TrendingTechnology";
import FeatureSection from "./home/components/FeatureSection";
import BuissnessProducts from "./home/components/BuissnessProducts";
import PopularSection from "./home/components/PopularSection";


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
      <HeroSection />
      <TrendingTechnology />
      <FeatureSection />
      <BuissnessProducts />
      <PopularSection />
    </>
  );
}

export default Home;
