import { SiteHeader } from "@/components/features/SiteHeader";
import { SiteFooter } from "@/components/features/SiteFooter";
import { StatsBar } from "@/components/features/StatsBar";
import { TestimonialsSection } from "@/components/features/TestimonialsSection";
import { BrandsSection } from "@/components/features/BrandsSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4">Giới thiệu</h1>
            <p className="text-center text-muted-foreground mb-12">
              Tìm hiểu về công ty chúng tôi
            </p>
          </div>
        </section>
        <StatsBar />
        <TestimonialsSection />
        <BrandsSection />
      </main>
      <SiteFooter />
    </div>
  );
}