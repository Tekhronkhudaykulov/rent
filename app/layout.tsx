import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RENTCAR - Car Rental Management System",
  description: "A professional car rental management system with drivers",
  openGraph: {
    title: "RENTCAR - Car Rental Management System",
    description: "A professional car rental management system with drivers",
    locale: "en_US",
    siteName: "RENTCAR",
  },
  metadataBase: new URL("https://rent-rosy-two.vercel.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
