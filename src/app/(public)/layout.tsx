import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/features/SiteHeader";
import { SiteFooter } from "@/components/features/SiteFooter";
import { FloatingContacts } from "@/components/ui/FloatingContacts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatingContacts />
      </body>
    </html>
  );
}
