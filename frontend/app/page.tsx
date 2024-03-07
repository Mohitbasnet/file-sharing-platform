import Footer from "@/components/elements/Footer";
import Header from "@/components/elements/Header";
import HeroSection from "@/components/elements/HeroSection";
import Pricing from "@/components/elements/Pricing";
import StatComponent from "@/components/elements/StatComponent";
import Testimonials from "@/components/elements/Testimonials";

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
