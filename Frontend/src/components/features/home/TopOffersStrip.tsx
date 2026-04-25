'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, ShieldCheck, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

const OFFERS = [
  { id: 1, store: 'Amazon', cashback: '6% Cashback', category: 'Fashion', title: 'Flat 40% OFF + 6% Cashback on Fashion', expires: '2d 14h', color: '#FF9900', verified: true },
  { id: 2, store: 'Flipkart', cashback: '5.0%', category: 'Electronics', title: 'Big Billion Sale: Extra 5% Real Cashback', expires: '1d 08h', color: '#2874F0', verified: true },
  { id: 3, store: 'Myntra', cashback: '12.0%', category: 'Fashion', title: 'End of Reason Sale: Massive Rewards', expires: '3d 22h', color: '#FF3F6C', verified: true },
  { id: 4, store: 'Swiggy', cashback: '₹100', category: 'Food', title: 'Get ₹100 Flat Cashback on Food Delivery', expires: '5h 30m', color: '#FC8019', verified: true },
  { id: 5, store: 'MakeMyTrip', cashback: '15.0%', category: 'Travel', title: 'Extra 15% Rewards on Global Flights', expires: '5d 12h', color: '#008EC9', verified: false },
  { id: 6, store: 'Nykaa', cashback: '8.0%', category: 'Beauty', title: 'Summer Glow Sale: 8% Extra Cashback', expires: '2d 04h', color: '#E41261', verified: true },
  { id: 7, store: 'BigBasket', cashback: '₹150', category: 'Grocery', title: '₹150 Cashback on Grocery Over ₹999', expires: '1d 20h', color: '#84C225', verified: true },
  { id: 8, store: 'Boat', cashback: '10.0%', category: 'Electronics', title: 'Flash Sale: 10% Cashback on Audio', expires: '4h 15m', color: '#FF0000', verified: true },
];

const TABS = ['All', 'Fashion', 'Electronics', 'Food', 'Travel', 'Beauty', 'Grocery'];

export const TopOffersStrip = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredOffers = activeTab === 'All' 
    ? OFFERS 
    : OFFERS.filter(offer => offer.category === activeTab);

  return (
    <section className="bg-white py-12 md:py-20 border-b border-[#E0E0E0]">
      <div className="container mx-auto px-4 md:px-12">
        
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <h2 className="text-[20px] md:text-[34px] font-[900] text-[#1A1A1A] tracking-tight">
             Today&apos;s Top Deals
          </h2>
          <Link href="/deals" className="flex items-center gap-1 text-primary font-black text-[13px] md:text-[15px] hover:underline">
            View All Deals <ChevronRight size={18} />
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
           {TABS.map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               suppressHydrationWarning
               className={cn(
                 "px-6 py-2.5 rounded-2xl text-[13px] font-[800] border transition-all whitespace-nowrap",
                 activeTab === tab 
                  ? "bg-[#FF6A00] text-white border-[#FF6A00] shadow-lg shadow-primary/10" 
                  : "bg-[#F3F4F6] text-[#888888] border-transparent hover:border-[#E0E0E0]"
               )}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* Offer Cards Grid - Mobile Minimalist Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredOffers.map((offer) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={offer.id}
                className="bg-white border border-[#E0E0E0] rounded-[24px] p-5 md:p-6 transition-all hover:shadow-xl hover:shadow-black/[0.04] group flex flex-col h-full relative"
              >
                {/* Header: Store pill and Cashback badge */}
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                      <div className="bg-[#F3F4F6] px-3 py-1.5 rounded-full border border-[#E0E0E0] text-[11px] font-black text-[#444444] uppercase tracking-wider flex items-center gap-2">
                         <div className="h-4 w-4 rounded-full flex items-center justify-center text-[10px] text-white font-black" style={{ backgroundColor: offer.color }}>{offer.store[0]}</div>
                         {offer.store}
                      </div>
                   </div>
                   <div className="bg-[#E6F8EF] px-3 py-1.5 rounded-full text-[#007A52] text-[11px] font-black uppercase border border-[#007A52]/10">
                      {offer.cashback}
                   </div>
                </div>

                {/* Title */}
                <h3 className="text-[17px] md:text-[20px] font-black text-[#1A1A1A] leading-snug mb-6">
                  {offer.title}
                </h3>

                {/* Footer: Expiry and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[#F0F0F0] mt-auto">
                   <div className="flex items-center gap-1.5 text-[#888888] text-[12px] font-medium">
                      <Clock size={14} className="text-[#888888]" />
                      Expires in {offer.expires}
                   </div>
                   <Link href={`/deals/${offer.id}`} className="text-primary font-black text-[13px] md:text-[14px] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Grab Deal <ArrowRight size={16} />
                   </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
