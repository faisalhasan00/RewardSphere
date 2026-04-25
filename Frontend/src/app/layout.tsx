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
import { MobileFooterNav } from "@/components/layout/MobileFooterNav";
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
      <body className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden pb-[60px] md:pb-0">
        <GoogleOAuthProvider clientId={googleClientId}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <MobileFooterNav />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
