import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import SmartTechnologySection from "../components/SmartTechnologySection";
import HowItWorksSection from "../components/HowItWorksSection";
import HomeCTA from "../components/HomeCTA";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-white">

      <HeroSection />

      <CategorySection />

      <FeaturedProducts />

      <SmartTechnologySection />

      <HowItWorksSection />

      <HomeCTA />

    </main>
  );
};

export default HomePage;