import Footer from "@/components/landing/Footer";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import Pricing from "@/components/landing/Pricing";
import StatComponent from "@/components/landing/StatComponent";
import Testimonials from "@/components/landing/Testimonials";

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
