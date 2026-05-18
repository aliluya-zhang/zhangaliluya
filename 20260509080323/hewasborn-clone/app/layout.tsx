import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import ScrollContainer from "@/components/ScrollContainer";
import Navbar from "@/components/Navbar";
import HamburgerMenu from "@/components/HamburgerMenu";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "He Was Born — Clone",
  description: "Creative portfolio clone with advanced motion effects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="bg-[#0a0a0a] text-white overflow-x-hidden">
        <Cursor />
        <ScrollContainer>
          <Navbar />
          <HamburgerMenu />
          {children}
        </ScrollContainer>
      </body>
    </html>
  );
}
