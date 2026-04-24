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

  useEffect(() => {
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
    <section className="relative min-h-[auto] lg:min-h-[85vh] bg-[#FFF6EE] flex items-center pt-8 md:pt-12 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Content (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col justify-center text-left z-10 w-full max-w-[640px] mx-auto lg:mx-0">
            {/* Live Rewards Counter */}
            <div className="mb-4 inline-flex self-center lg:self-start items-center gap-2 bg-white border border-[#E0E0E0] rounded-full px-4.5 py-2 shadow-sm">
               <div className="relative flex h-2 w-2">
                  <span className="animate-pulse-green absolute inline-flex h-full w-full rounded-full bg-[#00C87A] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C87A]"></span>
               </div>
               <span className="text-[11px] font-[600] text-[#888888] uppercase tracking-[0.08em]">
                  Live Rewards Distributed
               </span>
               <span className="text-[15px] font-[700] text-[#007A52] tabular-nums">
                  ₹{rewardsValue.toLocaleString('en-IN')}
               </span>
            </div>

            {/* Headline */}
            <div className="mb-4 space-y-0 text-center lg:text-left">
               <h1 className="text-[36px] md:text-[56px] font-[800] text-[#1A1A1A] leading-[1.1] tracking-tight">
                  Shop <span className="text-[#FF6A00]">Anything.</span>
               </h1>
               <h1 className="text-[36px] md:text-[56px] font-[800] text-[#1A1A1A] leading-[1.1] tracking-tight">
                  Earn <span className="text-[#FF6A00]">Everything.</span>
               </h1>
            </div>

            <p className="mb-5 text-[16px] text-[#888888] font-medium max-w-[480px] mx-auto lg:mx-0 leading-relaxed">
              Get up to 30% extra cashback on top of existing discounts at Amazon, Flipkart, Myntra, and 500+ other stores.
            </p>

            {/* Search Bar */}
            <div className="mb-4 relative group w-full lg:max-w-none">
               <div className="flex items-center h-[52px] bg-white rounded-[14px] border-[1.5px] border-[#E0E0E0] shadow-sm focus-within:border-[#FF6A00] transition-all overflow-hidden p-[4px] focus-within:shadow-[0_0_0_3px_rgba(255,106,0,0.1)]">
                  <div className="pl-4 pr-2 text-[#888888]">
                     <Search size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search 500+ stores... Amazon, Flipkart"
                    className="flex-grow bg-transparent outline-none text-[15px] font-semibold text-[#1A1A1A] placeholder:text-[#888888]"
                  />
                  <button className="h-full px-5 bg-[#FF6A00] text-white font-[600] text-[14px] rounded-[10px] hover:bg-[#D44E00] transition-colors">
                     Explore
                  </button>
               </div>
            </div>

            {/* Stats Row */}
            <div className="mb-6 flex items-center justify-center lg:justify-start gap-4 text-[#888888] font-[500]">
               <div className="flex items-center gap-1.5 text-[11px] md:text-[13px]">
                  <Store size={14} /> 500+ Stores
               </div>
               <div className="w-[1px] h-3 bg-[#E0E0E0]" />
               <div className="flex items-center gap-1.5 text-[11px] md:text-[13px]">
                  <Users size={14} /> 2M+ Users
               </div>
               <div className="w-[1px] h-3 bg-[#E0E0E0]" />
               <div className="flex items-center gap-1.5 text-[11px] md:text-[13px]">
                  <IndianRupee size={14} /> ₹10Cr+ Paid
               </div>
            </div>

            {/* CTA Button */}
            <div className="mb-6">
               <Button className="w-full lg:w-auto h-[52px] px-8 bg-[#FF6A00] hover:bg-[#D44E00] text-white text-[16px] font-[600] rounded-[12px] shadow-sm hover:scale-[1.02] transition-all">
                  Get Started for Free &rarr;
               </Button>
            </div>

             {/* Benefit Pills (Mobile Only) */}
             <div className="md:hidden flex flex-wrap items-center justify-center gap-2 mt-4">
               <div className="flex items-center gap-1 bg-[#F7F7F7] text-[#444] px-3.5 py-1.5 rounded-full border border-[#E0E0E0] text-[12px] font-[500]">
                  <CheckCircle2 size={13} className="text-[#007A52]" /> 100% Verified
               </div>
               <div className="flex items-center gap-1 bg-[#F7F7F7] text-[#444] px-3.5 py-1.5 rounded-full border border-[#E0E0E0] text-[12px] font-[500]">
                  <Zap size={13} className="text-[#FF6A00]" /> Instant Track
               </div>
               <div className="flex items-center gap-1 bg-[#F7F7F7] text-[#444] px-3.5 py-1.5 rounded-full border border-[#E0E0E0] text-[12px] font-[500]">
                  <TrendingUp size={13} className="text-[#FFE033]" /> Best Rates
               </div>
            </div>
          </div>

          {/* Right Column: Featured Banner (NEW) */}
          <div className="flex flex-col space-y-6">
             <div 
               className="relative h-[200px] md:h-[320px] w-full rounded-[20px] overflow-hidden shadow-2xl group"
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
                    className="absolute inset-0 flex items-center px-8 md:px-12 text-white"
                  >
                     <div className="flex-1 space-y-4 md:space-y-6">
                        <div className="inline-block bg-yellow-400 px-3 py-1 rounded-md">
                           <span className="text-[18px] md:text-[22px] font-black text-black">{BANNERS[currentBanner].logoText}</span>
                        </div>
                        <div className="space-y-1">
                           <h3 className="text-[22px] md:text-[28px] font-[800] leading-tight">{BANNERS[currentBanner].title}</h3>
                           <p className="text-[11px] md:text-[13px] opacity-90 font-medium">{BANNERS[currentBanner].subtitle}</p>
                        </div>
                        <div className="inline-flex bg-white/20 px-4 py-2 rounded-full text-[11px] md:text-[12px] font-bold">
                           {BANNERS[currentBanner].cashback}
                        </div>
                        <div className="pt-2">
                           <button className={cn("bg-white font-bold text-[14px] rounded-[8px] px-6 py-2.5 shadow-lg active:scale-95 transition-all", BANNERS[currentBanner].btnColor)}>
                              Shop Now &rarr;
                           </button>
                        </div>
                     </div>
                     <div className="hidden sm:flex relative h-full w-[160px] items-center justify-center">
                        <div className="grid grid-cols-2 gap-6 scale-125">
                           {BANNERS[currentBanner].icons.map((emoji, i) => (
                             <motion.span 
                               key={i}
                               animate={{ y: [0, -10, 0] }}
                               transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                               className="text-[48px] select-none"
                             >
                               {emoji}
                             </motion.span>
                           ))}
                        </div>
                     </div>
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* Dots Indicator */}
             <div className="flex items-center justify-center gap-2">
                {BANNERS.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentBanner(i)}
                    className={cn(
                      "transition-all duration-300",
                      currentBanner === i ? "w-6 h-2 bg-[#FF6A00] rounded-full" : "w-2 h-2 bg-[#E0E0E0] rounded-full hover:bg-[#888888]"
                    )}
                  />
                ))}
             </div>

             {/* Store Tabs Strip */}
             <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide max-w-full">
                {BANNERS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentBanner(i)}
                    className={cn(
                      "flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all whitespace-nowrap",
                      currentBanner === i 
                        ? "bg-[#FF6A00] text-white border-[#FF6A00]" 
                        : "bg-[#F7F7F7] text-[#888888] border-[#E0E0E0] hover:border-[#FF6A00] hover:text-[#FF6A00]"
                    )}
                  >
                    {item.store}
                  </button>
                ))}
             </div>

             {/* Live Cashback Ticker (New Layout) */}
             <div className="bg-white border border-[#E0E0E0] rounded-[12px] p-3 flex items-center gap-3 shadow-sm overflow-hidden">
                <div className="flex items-center gap-1.5 flex-shrink-0">
                   <div className="h-2 w-2 rounded-full bg-[#00C87A] animate-pulse" />
                   <span className="text-[12px] font-[700] text-[#007A52] uppercase">Live</span>
                </div>
                <div className="h-4 w-[1px] bg-[#E0E0E0]" />
                <div className="flex-grow overflow-hidden relative">
                   <div className="animate-marquee-left whitespace-nowrap text-[12px] font-medium text-[#444444] flex gap-8">
                      <span>Rahul earned +₹145 at Flipkart · Priya earned +₹210 at Myntra · Amit earned +₹82 at Amazon · Sneha earned +₹67 at Swiggy ·</span>
                      <span>Rahul earned +₹145 at Flipkart · Priya earned +₹210 at Myntra · Amit earned +₹82 at Amazon · Sneha earned +₹67 at Swiggy ·</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
