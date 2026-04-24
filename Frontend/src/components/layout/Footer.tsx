'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) return null;

  return (
    <footer className="bg-footer-bg border-t border-gray-800 pt-16 pb-8 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="mb-6 block">
               <img src="/Logo/Logo.png" alt="RewardSphere" className="h-10 w-auto object-contain brightness-110" />
            </Link>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              RewardSphere helps you save money on every purchase. We bring you the best deals and the highest cashback rates from 500+ top stores in India.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/deals" className="text-muted hover:text-primary text-sm transition-colors">Trending Deals</Link></li>
              <li><Link href="/stores" className="text-muted hover:text-primary text-sm transition-colors">All Stores</Link></li>
              <li><Link href="/categories" className="text-muted hover:text-primary text-sm transition-colors">Categories</Link></li>
              <li><Link href="/refer-and-earn" className="text-muted hover:text-primary text-sm transition-colors">Refer & Earn</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/how-it-works" className="text-muted hover:text-primary text-sm transition-colors">How it works</Link></li>
              <li><Link href="/help" className="text-muted hover:text-primary text-sm transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-primary text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-muted hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted hover:text-primary text-sm transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs text-center sm:text-left">
            &copy; {currentYear} RewardSphere Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <span className="text-muted text-xs">Made with ❤️ for smart savers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
