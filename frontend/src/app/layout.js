"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import NewsletterFooter from "./components/footer";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { refreshToken } from "./lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    // Run once on load
    refreshToken();

    // Schedule periodic refresh
    const interval = setInterval(() => {
      refreshToken();
    }, 28 * 60 * 1000);

    // ✅ cleanup runs correctly now
    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="layout-container">
          <Navbar isHome={isHome} />
          <main className="main-content">{children}</main>
          <NewsletterFooter />
        </div>
      </body>
    </html>
  );
}
