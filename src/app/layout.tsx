import { Inter, Plus_Jakarta_Sans, Geist } from "next/font/google";
import { QueryProvider } from "@/lib/query/provider";
import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Ánh Dương Phát",
  description: "Cửa hàng vật tư y tế",
  icons: {
    icon: "/logo.png",
  },
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              fontFamily: "var(--font-jakarta)",
            },
          }}
        />
      </body>
    </html>
  );
}
