
import NavDropdown from "@/components/NavDropdown";
import SearchDropdown from "@/components/SearchDropdown";
import Footer from "@/components/header-footer/Footer";
import Header from "@/components/header-footer/Header";
import NavTabs from "@/components/NavTabs";
import Appdata from "@/components/dummy";
import HeroSection from "./home/components/HeroSection";
import TrendingTechnology from "./home/components/TrendingTechnology";
import FeatureSection from "./home/components/FeatureSection";

const Home  = () =>{
return(
  <>
 <Header/>
 <HeroSection/>
 <TrendingTechnology/>
 <FeatureSection/>
 <Footer/>
 {/* <Appdata /> */}
  </>
)
}

export default Home;