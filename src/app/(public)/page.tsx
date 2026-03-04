import { BrandsSection } from "@/components/features/BrandsSection";
import { CategoriesSection } from "@/components/features/CategoriesSection";
import { FeaturedProducts } from "@/components/features/FeaturedProducts";
import { HeroSection } from "@/components/features/HeroSection";
import { SiteFooter } from "@/components/features/SiteFooter";
import { SiteHeader } from "@/components/features/SiteHeader";
import { TestimonialsSection } from "@/components/features/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <BrandsSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </div>
  );
}
