import Footer from "@/components/LandingElements/Footer";
import Header from "@/components/LandingElements/Header";
import HeroSection from "@/components/LandingElements/HeroSection";
import Pricing from "@/components/LandingElements/Pricing";
import StatComponent from "@/components/LandingElements/StatComponent";
import Testimonials from "@/components/LandingElements/Testimonials";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <StatComponent />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}
