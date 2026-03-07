import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { QueryProvider } from "@/lib/query/provider";
import "./globals.css";
import { Metadata } from "next";

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
    <html lang="vi">
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
