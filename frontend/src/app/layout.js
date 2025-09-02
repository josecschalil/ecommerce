"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import NewsletterFooter from "./components/footer";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// import your refresh function
import { refreshToken } from "./lib/auth"; // <- make sure this file exists

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
    // Run refresh once when app loads
    refreshToken();

    // Optionally: schedule refresh every 14 min (if token lifespan = 15 min)
    const interval = setInterval(() => {
      refreshToken();
    }, 0.45 * 60 * 1000);

    return () => clearInterval(interval); // cleanup
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
