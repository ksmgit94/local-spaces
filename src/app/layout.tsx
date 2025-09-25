import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Nooko - Rent Local Spaces for Meetings, Events & More",
  description: "Discover and book local spaces for meetings, studios, event spaces, and offices. Perfect for professionals, creatives, and businesses.",
  keywords: "space rental, meeting rooms, event spaces, offices, studios, local spaces",
  icons: {
    icon: '/Graphics/Logo/Logo type + Icon/DarkAsset 3.svg',
    shortcut: '/Graphics/Logo/Logo type + Icon/DarkAsset 3.svg',
    apple: '/Graphics/Logo/Logo type + Icon/DarkAsset 3.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${montserrat.variable} bg-white`}>
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <main className="flex-1 bg-white">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}