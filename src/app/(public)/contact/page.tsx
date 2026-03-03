import { SiteHeader } from "@/components/features/SiteHeader";
import { SiteFooter } from "@/components/features/SiteFooter";
import { CTABanner } from "@/components/features/CTABanner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}