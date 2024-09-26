
import NavDropdown from "@/components/NavDropdown";
import SearchDropdown from "@/components/SearchDropdown";
import Footer from "@/components/header-footer/Footer";
import Header from "@/components/header-footer/Header";
import NavTabs from "@/components/NavTabs";
import Appdata from "@/components/dummy";
import HeroSection from "./home/components/HeroSection";
import TrendingTechnology from "./home/components/TrendingTechnology";
import FeatureSection from "./home/components/FeatureSection";
import BuissnessProducts from "./home/components/BuissnessProducts";
import PopularSection from "./home/components/PopularSection";

const Home  = () =>{
return(
  <>
 <HeroSection/>
 <TrendingTechnology/>
 <FeatureSection/>
 <BuissnessProducts/>
 <PopularSection/>
  </>
)
}

export default Home;