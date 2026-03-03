import { SiteHeader } from "@/components/features/SiteHeader";
import { SiteFooter } from "@/components/features/SiteFooter";
import { NewsSection } from "@/components/features/NewsSection";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <NewsSection />
      </main>
      <SiteFooter />
    </div>
  );
}