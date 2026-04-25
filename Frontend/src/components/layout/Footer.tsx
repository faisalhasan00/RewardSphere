'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Send,
  Share2,
  MessageSquare,
  Globe,
  ShieldCheck,
  Mail,
  ExternalLink,
  MessageCircle,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const isDashboard = pathname.startsWith('/dashboard');

  if (isDashboard) return null;

  return (
    <footer className="bg-[#0F1117] text-white pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Section: Newsletter & Brand Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-white/5 items-center">
           <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tight">Don't miss a single <span className="text-[#00C87A]">Deal.</span></h2>
              <p className="text-[#888888] max-w-sm font-medium">Join 2M+ smart shoppers receiving exclusive high-cashback alerts every week.</p>
           </div>
           <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow h-14 rounded-2xl bg-white/5 border border-white/10 px-6 text-sm outline-none focus:border-[#FF6A00] transition-colors"
                suppressHydrationWarning
              />
              <Button className="h-14 px-10 rounded-2xl bg-[#FF6A00] hover:bg-[#D44E00] shadow-lg shadow-[#FF6A00]/20" suppressHydrationWarning>
                 Subscribe Now
              </Button>
           </div>
        </div>

        {/* Middle Section: Main Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 py-20">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 lg:col-span-1 space-y-8">
            <Link href="/" className="block">
               <img src="/Logo/Logo.png" alt="RewardSphere" className="h-10 w-auto brightness-125" />
            </Link>
            <p className="text-[#888888] text-sm leading-relaxed font-medium">
               India's most trusted cashback destination. Helping smart savers earn daily rewards at 500+ top brands.
            </p>
            <div className="flex items-center gap-4">
               <a href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#FF6A00] hover:scale-110 transition-all group">
                  <Share2 size={18} className="text-[#888888] group-hover:text-white" />
               </a>
               <a href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#FF6A00] hover:scale-110 transition-all group">
                  <Send size={18} className="text-[#888888] group-hover:text-white" />
               </a>
               <a href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#FF6A00] hover:scale-110 transition-all group">
                  <MessageSquare size={18} className="text-[#888888] group-hover:text-white" />
               </a>
               <a href="#" className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#FF6A00] hover:scale-110 transition-all group">
                  <Users size={18} className="text-[#888888] group-hover:text-white" />
               </a>
            </div>
          </div>

          {/* Column 2: Marketplace */}
          <div>
            <h4 className="text-xs font-[900] uppercase tracking-[0.15em] text-white/40 mb-8">Marketplace</h4>
            <ul className="space-y-4">
              <li><Link href="/stores" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold flex items-center gap-2 group transition-colors">Featured Stores <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/deals" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold flex items-center gap-2 group transition-colors">Trending Deals</Link></li>
              <li><Link href="/categories" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold flex items-center gap-2 group transition-colors">Categories</Link></li>
              <li><Link href="/how-it-works" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold flex items-center gap-2 group transition-colors">How it Works</Link></li>
              <li><Link href="/refer-and-earn" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold flex items-center gap-2 group transition-colors">Refer & Earn</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-xs font-[900] uppercase tracking-[0.15em] text-white/40 mb-8">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold transition-colors">About RewardSphere</Link></li>
              <li><Link href="/careers" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold transition-colors">Careers <span className="bg-[#FF6A00] text-white text-[9px] px-1.5 py-0.5 rounded ml-1 uppercase">Hiring</span></Link></li>
              <li><Link href="/blog" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold transition-colors">Daily Blog</Link></li>
              <li><Link href="/partnership" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold transition-colors">Partner with Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-xs font-[900] uppercase tracking-[0.15em] text-white/40 mb-8">Get Help</h4>
            <ul className="space-y-4">
              <li><Link href="/help" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold transition-colors">Customer Support</Link></li>
              <li><Link href="/merchant-help" className="text-[#888888] hover:text-[#FF6A00] text-sm font-semibold transition-colors">Merchant Help</Link></li>
              <li className="flex items-center gap-3 pt-2">
                 <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <MessageCircle size={16} className="text-emerald-500" />
                 </div>
                 <div className="text-[10px]">
                    <span className="block text-white font-bold leading-none">24/7 Chat</span>
                    <span className="text-[#888888]">Live Support</span>
                 </div>
              </li>
            </ul>
          </div>

          {/* Column 5: Trust & App */}
          <div className="space-y-10">
             <div className="space-y-4">
                <h4 className="text-xs font-[900] uppercase tracking-[0.15em] text-white/40 mb-4">Secured By</h4>
                <div className="flex flex-wrap gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                   <div className="bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <ShieldCheck size={14} className="text-[#00C87A]" />
                      <span className="text-[10px] font-bold">PCI DSS</span>
                   </div>
                   <div className="bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                      <Globe size={14} className="text-blue-400" />
                      <span className="text-[10px] font-bold">SSL 256</span>
                   </div>
                </div>
             </div>
             <div className="space-y-4">
                <h4 className="text-xs font-[900] uppercase tracking-[0.15em] text-white/40 mb-4">Mobile Experience</h4>
                <div className="space-y-3">
                   <button className="w-full h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all font-black text-[11px] uppercase tracking-widest" suppressHydrationWarning>
                      <img src="/icons/playstore.png" alt="" className="h-5 w-auto" />
                      Google Play
                   </button>
                   <button className="w-full h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all font-black text-[11px] uppercase tracking-widest" suppressHydrationWarning>
                      <img src="/icons/appstore.png" alt="" className="h-5 w-auto" />
                      App Store
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8">
           <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
              <p className="text-[12px] font-semibold text-[#555555]">
                 &copy; {currentYear} RewardSphere Technologies Pvt Ltd
              </p>
              <div className="flex items-center gap-6">
                 <Link href="/privacy" className="text-[12px] font-bold text-[#555555] hover:text-white transition-colors">Privacy Policy</Link>
                 <Link href="/terms" className="text-[12px] font-bold text-[#555555] hover:text-white transition-colors">Terms of Service</Link>
                 <Link href="/cookies" className="text-[12px] font-bold text-[#555555] hover:text-white transition-colors">Cookie Policy</Link>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="h-2 w-2 rounded-full bg-[#00C87A] animate-pulse" />
              <span className="text-[11px] font-bold text-[#555555]">All Systems Operational</span>
           </div>
        </div>
      </div>
    </footer>
  );
};
