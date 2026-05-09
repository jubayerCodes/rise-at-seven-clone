import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import PageLoader from "@/components/shared/page-loader";
import SmoothScroll from "@/components/smooth-scroll";
import Cursor from "@/components/shared/cursor";
import TextCursor from "@/components/shared/text-cursor";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import OffCanvas from "@/components/shared/modals/off-canvas-menu";

const heebo = Heebo({
  variable: "--font-heebo",
  weight: ["400", "500", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rise at Seven | Award Winning Search-First Content Marketing Agency",
  description: "Award Winning Search-First Content Marketing Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", heebo.variable, "font-sans")}>
      <body className="min-h-full flex flex-col">
        <PageLoader />
        <Header />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
        <OffCanvas />
        <Cursor />
        <TextCursor />
      </body>
    </html>
  );
}
