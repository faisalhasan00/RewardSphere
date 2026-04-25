'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import {
  Search, Bell, ChevronDown, Plus, Zap, Store,
  LayoutGrid, Flame, Plane, Shirt, Utensils,
  Sparkles, Smartphone, Menu, X, Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const CATEGORIES = [
  { name: 'Stores', icon: Store, href: '/stores' },
  { name: 'Categories', icon: LayoutGrid, href: '/categories' },
  { name: 'Top Deals', icon: Flame, href: '/deals' },
  { name: 'Travel', icon: Plane, href: '/travel' },
  { name: 'Fashion', icon: Shirt, href: '/fashion' },
  { name: 'Food', icon: Utensils, href: '/food' },
  { name: 'Beauty', icon: Sparkles, href: '/beauty' },
  { name: 'Electronics', icon: Smartphone, href: '/electronics' },
];

export const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDashboard = pathname?.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDashboard) return null;

  return (
    <>
      <div className={cn(
        "sticky top-0 z-50 transition-shadow duration-300 bg-white md:rounded-none rounded-t-[32px]",
        isScrolled ? "shadow-[0_4px_12px_rgba(0,0,0,0.06)]" : ""
      )}>
        <nav className="fixed md:relative top-0 left-0 right-0 h-[56px] md:h-[64px] bg-white md:bg-white/90 md:backdrop-blur-[12px] flex items-center pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-8 lg:pr-8 border-none z-[70] md:rounded-none rounded-t-[32px]">
          <div className="container mx-auto flex items-center justify-between gap-4">
            {/* Mobile Hamburger (Visible on Mobile only) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-[#888888] hover:text-[#1A1A1A]"
              suppressHydrationWarning
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img src="/Logo/Logo.png" alt="RewardSphere" className="h-8 w-auto object-contain" />
            </Link>

            {/* Center Search Bar (Desktop Only) */}
            <div className="hidden md:flex flex-grow max-w-[45%] relative">
              <div className={cn(
                "flex items-center w-full h-[38px] bg-white border-[1.5px] rounded-full px-4 transition-all",
                "border-[#E0E0E0] focus-within:border-[#FF6A00] focus-within:ring-4 focus-within:ring-[#FF6A00]/10"
              )}>
                <Search size={18} className="text-[#888888] mr-2" />
                <input
                  type="text"
                  placeholder="Search stores, brands, deals..."
                  className="flex-grow bg-transparent outline-none text-sm font-medium text-[#1A1A1A] placeholder:text-[#888888]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-[#FF6A00] text-white px-4 py-1 rounded-full text-[12px] font-black hover:bg-[#D44E00] transition-colors ml-2">
                  Search
                </button>
              </div>
            </div>

            {/* Right Side Items */}
            <div className="flex items-center gap-1 sm:gap-5">
              {/* Mobile Icons */}
              <button className="md:hidden p-2 text-[#888888]" suppressHydrationWarning>
                <Search size={22} />
              </button>

              {/* Locale Selector */}
              <div className="hidden sm:flex items-center gap-1 text-[#888888] cursor-pointer hover:text-[#1A1A1A]">
                <span className="text-[14px]">🇮🇳</span>
                <span className="text-[13px] font-bold">IN</span>
                <ChevronDown size={14} />
              </div>

              {/* Notifications */}
              <div className="relative p-2 text-[#888888] cursor-pointer hover:text-[#1A1A1A]">
                <Bell size={22} />
                <span className="absolute top-1 right-1 bg-[#FF6A00] text-white text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                  2
                </span>
              </div>

              {/* Wallet Pill - Optimized for Mobile visibility */}
              <Link href="/dashboard/wallet" className="shrink-0">
                <div className="flex items-center gap-1 sm:gap-2 bg-[#E6F8EF] text-[#007A52] px-2 sm:px-3 text-[11px] sm:text-[13px] h-[34px] sm:h-[38px] rounded-full font-black border border-[#007A52]/10 active:scale-95 transition-all shadow-sm">
                  <Wallet size={14} className="text-[#007A52]" />
                  <span className="tabular-nums">₹100</span>
                </div>
              </Link>

              {/* Auth */}
              <div className="flex items-center gap-2 sm:gap-4">
                {isAuthenticated ? (
                  <Link href="/dashboard" className="hidden sm:block text-[14px] font-black text-[#1A1A1A] hover:text-[#FF6A00]">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="hidden sm:block text-[14px] font-black text-[#1A1A1A] hover:text-[#FF6A00]">
                      Sign In
                    </Link>
                    <Link href="/register" className="hidden sm:block">
                      <Button className="bg-[#FF6A00] hover:bg-[#D44E00] text-white px-4 sm:px-6 h-[34px] sm:h-[38px] rounded-full text-[13px] sm:text-[14px] font-black shadow-lg shadow-[#FF6A00]/20">
                        Join Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* ─── BOTTOM NAVBAR ─── */}
        <nav className="hidden md:flex h-[44px] bg-white border-b border-[#E0E0E0] items-center px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto flex items-center justify-between h-full">
            {/* Categories */}
            <div className="flex h-full items-center">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = pathname === cat.href;
                return (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className={cn(
                      "flex items-center gap-1.5 px-3 h-full text-[13px] font-[500] transition-all relative border-b-2",
                      isActive ? "text-[#FF6A00] border-[#FF6A00]" : "text-[#444444] border-transparent hover:text-[#FF6A00]"
                    )}
                  >
                    <Icon size={14} className={isActive ? "text-[#FF6A00]" : "text-[#888888]"} />
                    {cat.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Extras */}
            <div className="flex items-center gap-4 h-full">
              <button className="flex items-center gap-1 text-[13px] text-[#888888] hover:text-[#1A1A1A] transition-colors">
                <Plus size={14} /> Submit Coupon
              </button>
              <div className="w-[1.5px] h-3 bg-[#E0E0E0]" />
              <Link href="/deals-of-the-day" className="flex items-center gap-1 text-[13px] font-[600] text-[#FF6A00] hover:text-[#D44E00] transition-all">
                <Zap size={14} fill="#FF6A00" /> Deals of the Day
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* ─── MOBILE DRAWER (SIDE MENU) ─── */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[310px] bg-white z-[70] shadow-2xl flex flex-col"
            >
              {/* Auth Top Section (Screenshot Style) */}
              <div className="p-6 bg-[#F5F8FF] border-b border-[#E8EEFF]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#2D60FF]">Login / Sign Up,</h3>
                    <p className="text-[14px] font-medium text-[#444444]">save big with exclusive offers!</p>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="p-1 text-[#888888] -mt-8">
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-white border border-[#E0E0E0] rounded-xl h-[52px] shadow-sm active:scale-95 transition-all">
                    <img src="https://www.google.com/favicon.ico" alt="GP" className="h-4 w-4" />
                    <span className="text-[14px] font-bold text-[#444444]">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white border border-[#E0E0E0] rounded-xl h-[52px] shadow-sm active:scale-95 transition-all">
                    <span className="text-[#1877F2] font-black text-[18px]">f</span>
                    <span className="text-[14px] font-bold text-[#444444]">Facebook</span>
                  </button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto py-6">
                <p className="px-6 text-[10px] font-black text-[#888888] uppercase tracking-[0.2em] mb-4">Pages</p>
                <nav className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = pathname === cat.href;
                    return (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-6 py-3.5 text-[14px] font-semibold transition-colors",
                          isActive ? "bg-[#FFF0E6] text-[#FF6A00]" : "text-[#444444] hover:bg-[#F9F9F9]"
                        )}
                      >
                        <Icon size={18} className="text-[#888888]" />
                        {cat.name}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-8">
                  <p className="px-6 text-[10px] font-black text-[#888888] uppercase tracking-[0.2em] mb-4">Submit</p>
                  <div className="px-6 space-y-4">
                    <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-[14px] font-semibold text-[#444444] group">
                      <Plus size={18} className="text-[#888888]" />
                      <span>Submit Coupon / Merchant</span>
                    </button>
                    <div className="h-[1px] bg-[#F0F0F0] w-full" />
                    <Link href="/deals-of-the-day" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-[#FF6A00] font-bold text-[14px]">
                      <Zap size={18} fill="#FF6A00" /> Deals of the Day
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border-t border-[#F0F0F0] text-center">
                <p className="text-[12px] text-[#888888] font-medium">RewardSphere &copy; 2024</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
