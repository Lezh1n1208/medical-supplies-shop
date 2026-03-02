import { BrandsSection } from "@/components/features/BrandsSection";
import { CategoriesSection } from "@/components/features/CategoriesSection";
import { CTABanner } from "@/components/features/CTABanner";
import { FeaturedProducts } from "@/components/features/FeaturedProducts";
import { HeroSection } from "@/components/features/HeroSection";
import { NewsSection } from "@/components/features/NewsSection";
import { SiteFooter } from "@/components/features/SiteFooter";
import { SiteHeader } from "@/components/features/SiteHeader";
import { StatsBar } from "@/components/features/StatsBar";
import { TestimonialsSection } from "@/components/features/TestimonialsSection";
import { WhyUsSection } from "@/components/features/WhyUsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsBar />
        <CategoriesSection />
        <WhyUsSection />
        <FeaturedProducts />
        <BrandsSection />
        <TestimonialsSection />
        <NewsSection />
        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
