
import NavDropdown from "@/components/NavDropdown";
import SearchDropdown from "@/components/SearchDropdown";
import NavTabs from "@/components/NavTabs";
import Appdata from "@/components/dummy";
import HeroSection from "./home/components/HeroSection";
import TrendingTechnology from "./home/components/TrendingTechnology";
import FeatureSection from "./home/components/FeatureSection";

const Home  = () =>{
return(
  <>
 <HeroSection/>
 <TrendingTechnology/>
 <FeatureSection/>
 {/* <Appdata /> */}
  </>
)
}

export default Home;