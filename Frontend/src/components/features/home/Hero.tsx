'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Search, Store, Users, IndianRupee, CheckCircle2, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const BANNERS = [
  {
    store: 'Flipkart',
    logoText: 'Flipkart',
    gradient: 'linear-gradient(135deg, #FF6A00, #FFD700)',
    title: 'UP TO 80% OFF',
    subtitle: 'On Mobiles, Electronics, Fashion & More',
    cashback: '🟢 + 6% Extra Cashback',
    btnColor: 'text-[#FF6A00]',
    icons: ['📱', '💻', '👗', '🛒']
  },
  {
    store: 'Amazon',
    logoText: 'Amazon',
    gradient: 'linear-gradient(135deg, #FF9900, #FF6A00)',
    title: 'Great Indian Sale',
    subtitle: 'Up to 70% OFF on all Categories',
    cashback: '🟢 + 5% Extra Cashback',
    btnColor: 'text-[#FF9900]',
    icons: ['📦', '🎧', '📚', '🏠']
  },
  {
    store: 'Myntra',
    logoText: 'Myntra',
    gradient: 'linear-gradient(135deg, #FF3F6C, #FF6A00)',
    title: 'End of Reason Sale',
    subtitle: 'Up to 80% OFF on Top Brands',
    cashback: '🟢 + 8% Extra Cashback',
    btnColor: 'text-[#FF3F6C]',
    icons: ['👗', '👠', '👜', '🧴']
  },
  {
    store: 'MakeMyTrip',
    logoText: 'MakeMyTrip',
    gradient: 'linear-gradient(135deg, #007A52, #00C87A)',
    title: 'Travel Mega Sale',
    subtitle: 'Flights from ₹999 + Best Hotels',
    cashback: '🟢 + 12% Extra Cashback',
    btnColor: 'text-[#007A52]',
    icons: ['✈️', '🏨', '🌴', '🗺️']
  },
  {
    store: 'Meesho',
    logoText: 'Meesho',
    gradient: 'linear-gradient(135deg, #9B2D8E, #FF3F6C)',
    title: 'LOWEST PRICES',
    subtitle: 'Fashion, Home & Kitchen Items',
    cashback: '🟢 + 10% Extra Cashback',
    btnColor: 'text-[#9B2D8E]',
    icons: ['👚', '🥘', '🛋️', '🧸']
  }
];

export const Hero = () => {
  const [rewardsValue, setRewardsValue] = useState(120000);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = 125359;
    const duration = 2000;
    const startTime = Date.now();
    const startValue = 120000;

    const timer = setInterval(() => {
       const now = Date.now();
       const elapsed = now - startTime;
       if (elapsed >= duration) {
          setRewardsValue(target);
          clearInterval(timer);
          setInterval(() => {
             setRewardsValue(prev => prev + Math.floor(Math.random() * 5) + 1);
          }, 3000);
       } else {
          const progress = elapsed / duration;
          setRewardsValue(Math.floor(startValue + (target - startValue) * progress));
       }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = useCallback(() => {
    setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextBanner, 4000);
    return () => clearInterval(timer);
  }, [isHovered, nextBanner]);

  return (
    <section className="relative min-h-[auto] lg:min-h-[85vh] bg-[#FFF6EE] flex items-center pt-20 lg:pt-12 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col justify-center text-center lg:text-left z-10 w-full max-w-[640px] mx-auto lg:mx-0 order-1 lg:order-1">
            {/* Live Rewards Counter */}
            <div className="mb-4 inline-flex self-center lg:self-start items-center gap-2 bg-white border border-[#E0E0E0] rounded-full px-4 py-1.5 shadow-sm">
               <div className="relative flex h-2 w-2">
                  <span className="animate-pulse-green absolute inline-flex h-full w-full rounded-full bg-[#00C87A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C87A]"></span>
               </div>
               <span className="text-[10px] sm:text-[11px] font-[600] text-[#888888] uppercase tracking-[0.08em]">
                  Live Rewards Distributed
               </span>
               <span className="text-[15px] font-[700] text-[#007A52] tabular-nums" suppressHydrationWarning>
                  ₹{mounted ? rewardsValue.toLocaleString('en-IN') : '120,000'}
               </span>
            </div>

            {/* Headline */}
            <div className="mb-4 space-y-0 text-center lg:text-left">
               <h1 className="text-[32px] sm:text-[44px] lg:text-[56px] font-[800] text-[#1A1A1A] leading-[1.1] tracking-tight">
                  Shop <span className="text-[#FF6A00]">Anything.</span>
               </h1>
               <h1 className="text-[32px] sm:text-[44px] lg:text-[56px] font-[800] text-[#1A1A1A] leading-[1.1] tracking-tight">
                  Earn <span className="text-[#FF6A00]">Everything.</span>
               </h1>
            </div>

            <p className="mb-6 text-[14px] sm:text-[16px] text-[#888888] font-medium max-w-[480px] mx-auto lg:mx-0 leading-relaxed">
              Get up to 30% extra cashback on top of existing discounts at Amazon, Flipkart, Myntra, and 500+ other stores.
            </p>

            {/* Search Bar */}
            <div className="mb-5 relative group w-full lg:max-w-none">
               <div className="flex items-center h-[52px] bg-white rounded-[14px] border-[1.5px] border-[#E0E0E0] shadow-sm focus-within:border-[#FF6A00] transition-all overflow-hidden p-[4px] focus-within:shadow-[0_0_0_3px_rgba(255,106,0,0.1)]">
                  <div className="pl-4 pr-2 text-[#888888]">
                     <Search size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search 500+ stores... Amazon, Flipkart"
                    className="flex-grow bg-transparent outline-none text-[14px] sm:text-[15px] font-semibold text-[#1A1A1A] placeholder:text-[#888888]"
                    suppressHydrationWarning
                  />
                  <button className="h-full px-4 sm:px-6 bg-[#FF6A00] text-white font-[600] text-[14px] rounded-[10px] hover:bg-[#D44E00] transition-colors" suppressHydrationWarning>
                     Explore
                  </button>
               </div>
            </div>

            {/* Stats Row */}
            <div className="mb-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-[#888888] font-[500]">
               <div className="flex items-center gap-1.5 text-[11px] sm:text-[13px]">
                  <Store size={14} className="text-[#FF6A00]" /> 500+ Stores
               </div>
               <div className="hidden sm:block w-[1.5px] h-3 bg-[#E0E0E0]" />
               <div className="flex items-center gap-1.5 text-[11px] sm:text-[13px]">
                  <Users size={14} className="text-[#FF6A00]" /> 2M+ Users
               </div>
               <div className="hidden sm:block w-[1.5px] h-3 bg-[#E0E0E0]" />
               <div className="flex items-center gap-1.5 text-[11px] sm:text-[13px]">
                  <IndianRupee size={14} className="text-[#FF6A00]" /> ₹10Cr+ Paid
               </div>
            </div>

            {/* CTA Button */}
            <div className="mb-8 lg:mb-0">
               <Button className="w-full lg:w-auto h-[52px] sm:h-[56px] px-8 sm:px-10 bg-[#FF6A00] hover:bg-[#D44E00] text-white text-[15px] sm:text-[16px] font-[600] rounded-[14px] shadow-lg shadow-[#FF6A00]/20 hover:scale-[1.02] transition-all" suppressHydrationWarning>
                  Get Started for Free &rarr;
               </Button>
            </div>
          </div>

          {/* Right Column: Featured Banner */}
          <div className="flex flex-col space-y-6 order-2 lg:order-2">
             <div 
               className="relative h-[220px] sm:h-[280px] lg:h-[340px] w-full rounded-[25px] overflow-hidden shadow-2xl group"
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
             >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBanner}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ background: BANNERS[currentBanner].gradient }}
                    className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white"
                  >
                     {/* Top Brand Badge */}
                     <div className="absolute top-4 sm:top-6 left-8 md:left-12">
                        <div className="bg-[#FFE033] px-3 py-1.5 rounded-md shadow-lg transform -rotate-1">
                           <span className="text-[12px] sm:text-[14px] font-[900] text-black uppercase tracking-tight italic">{BANNERS[currentBanner].logoText}</span>
                        </div>
                     </div>

                     {/* Content Section */}
                     <div className="space-y-3 sm:space-y-4 md:space-y-6 mt-10 md:mt-12">
                        <div className="space-y-1">
                           <h3 className="text-[20px] sm:text-[28px] lg:text-[40px] font-[900] leading-[1.1] tracking-tighter">{BANNERS[currentBanner].title}</h3>
                           <p className="text-[11px] sm:text-[12px] lg:text-[14px] opacity-90 font-[700] tracking-wide max-w-[280px]">{BANNERS[currentBanner].subtitle}</p>
                        </div>
                        
                        {/* Premium Cashback Pill */}
                        <div className="inline-flex items-center gap-2.5 bg-white/20 backdrop-blur-md px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 shadow-xl overflow-hidden">
                           <div className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#00C87A] shadow-[0_0_12px_#00C87A] relative">
                               <span className="animate-ping absolute inset-0 rounded-full bg-[#00C87A] opacity-75"></span>
                           </div>
                           <span className="text-[10px] sm:text-[11px] lg:text-[13px] font-[800] tracking-wider uppercase">
                              {BANNERS[currentBanner].cashback.replace('🟢 ', '').replace('+ ', '')}
                           </span>
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                           <button 
                             className={cn("bg-white font-[900] text-[13px] sm:text-[15px] rounded-[12px] px-6 sm:px-8 py-2.5 sm:py-3.5 shadow-2xl hover:shadow-white/20 active:scale-95 transition-all flex items-center gap-2 group/btn", BANNERS[currentBanner].btnColor)}
                             suppressHydrationWarning
                           >
                              Shop Now <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                           </button>
                        </div>
                     </div>

                     {/* Floating Icons (Visible on larger screens/tablets) */}
                     <div className="absolute right-8 md:right-16 hidden sm:flex items-center justify-center pointer-events-none">
                        <div className="grid grid-cols-2 gap-8 md:gap-12 scale-90 md:scale-125">
                           {BANNERS[currentBanner].icons.map((emoji, i) => (
                             <motion.span 
                               key={i}
                               animate={{ 
                                 y: [0, -15, 0],
                                 rotate: [0, 5, -5, 0]
                               }}
                               transition={{ 
                                 duration: 4, 
                                 repeat: Infinity, 
                                 delay: i * 0.4,
                                 ease: "easeInOut"
                               }}
                               className="text-[40px] md:text-[64px] select-none filter drop-shadow-2xl"
                             >
                               {emoji}
                             </motion.span>
                           ))}
                        </div>
                     </div>
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* Dots & Navigation */}
             <div className="flex items-center justify-center lg:justify-start gap-2">
                {BANNERS.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentBanner(i)}
                    suppressHydrationWarning
                    className={cn(
                      "transition-all duration-300",
                      currentBanner === i ? "w-6 h-2 bg-[#FF6A00] rounded-full" : "w-2 h-2 bg-[#E0E0E0] rounded-full hover:bg-[#888888]"
                    )}
                  />
                ))}
             </div>

             {/* Mobile-Friendly Store Tabs */}
             <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-hide max-w-full -mx-4 px-4 sm:mx-0 sm:px-0">
                {BANNERS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentBanner(i)}
                    suppressHydrationWarning
                    className={cn(
                      "flex-shrink-0 px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-bold border transition-all whitespace-nowrap shadow-sm",
                      currentBanner === i 
                        ? "bg-[#FF6A00] text-white border-[#FF6A00] shadow-[#FF6A00]/20" 
                        : "bg-white text-[#888888] border-[#E0E0E0] hover:border-[#FF6A00] hover:text-[#FF6A00]"
                    )}
                  >
                    {item.store}
                  </button>
                ))}
             </div>

             {/* Live Cashback Ticker (Market Proof) */}
             <div className="bg-white border border-[#E0E0E0] rounded-[16px] p-4 flex items-center gap-3 shadow-md shadow-black/5 overflow-hidden">
                <div className="flex items-center gap-2 flex-shrink-0">
                   <div className="h-2.5 w-2.5 rounded-full bg-[#00C87A] animate-pulse relative">
                      <div className="absolute inset-0 rounded-full bg-[#00C87A] animate-ping" />
                   </div>
                   <span className="text-[11px] font-[800] text-[#007A52] uppercase tracking-[0.05em]">Live Feed</span>
                </div>
                <div className="h-4 w-[1.5px] bg-[#E0E0E0]" />
                <div className="flex-grow overflow-hidden relative">
                   <div className="animate-marquee-left whitespace-nowrap text-[12px] font-semibold text-[#444444] flex gap-12">
                      <span>🎉 Rahul earned +₹145 at Flipkart · Priya earned +₹210 at Myntra · Amit earned +₹82 at Amazon · Sneha earned +₹67 at Swiggy ·</span>
                      <span>🚀 Rahul earned +₹145 at Flipkart · Priya earned +₹210 at Myntra · Amit earned +₹82 at Amazon · Sneha earned +₹67 at Swiggy ·</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
