import { WhyUsSection } from "@/components/features/WhyUsSection";
import { SiteHeader } from "@/components/features/SiteHeader";
import { SiteFooter } from "@/components/features/SiteFooter";

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <WhyUsSection />
      </main>
      <SiteFooter />
    </div>
  );
}

