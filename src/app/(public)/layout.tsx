import { SiteHeader } from "@/components/features/public/header/SiteHeader";
import { SiteFooter } from "@/components/features/public/footer/SiteFooter";
import { FloatingContacts } from "@/components/ui/FloatingContacts";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingContacts />
    </>
  );
}
