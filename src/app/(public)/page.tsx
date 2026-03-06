import { BrandsSection } from "@/components/features/public/pages/BrandsSection";
import { CategoriesSection } from "@/components/features/public/pages/CategoriesSection";
import { FeaturedProducts } from "@/components/features/public/pages/FeaturedProducts";
import { HeroSection } from "@/components/features/public/pages/HeroSection";
import { TestimonialsSection } from "@/components/features/public/pages/TestimonialsSection";

export default function Home() {
  return (
    <div className="bg-white">
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <BrandsSection />
        <TestimonialsSection />
      </main>
    </div>
  );
}

