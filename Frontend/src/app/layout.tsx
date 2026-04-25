import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RewardSphere | India's #1 Cashback & Rewards Platform",
  description: "Shop at Amazon, Flipkart, Myntra & 500+ stores to earn real cash rewards. Join RewardSphere for the highest cashback rates in India.",
  icons: {
    icon: "/Logo/Browser-Favicon.png",
  },
};

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F3F4F6] text-foreground overflow-x-hidden md:pb-0">
        <GoogleOAuthProvider clientId={googleClientId}>
          <div className="flex-grow md:bg-transparent bg-white md:rounded-none rounded-t-[32px] relative">
            <Header />
            <main className="flex-grow">
              <div className="pb-24 md:pb-0">{children}</div>
              <MobileNav />
            </main>
          </div>
          <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
