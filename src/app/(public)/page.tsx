import { BrandsSection } from "@/components/features/BrandsSection";
import { CategoriesSection } from "@/components/features/CategoriesSection";
import { FeaturedProducts } from "@/components/features/FeaturedProducts";
import { HeroSection } from "@/components/features/HeroSection";
import { TestimonialsSection } from "@/components/features/TestimonialsSection";

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

