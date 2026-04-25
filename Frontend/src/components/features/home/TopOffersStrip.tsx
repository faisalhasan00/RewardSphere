'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, ShieldCheck, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

const OFFERS = [
  { id: 1, store: 'Amazon', cashback: '6.5%', category: 'Fashion', title: 'Up to 70% OFF + 6.5% Cashback on Apparel', expires: '2d 14h', color: '#FF9900', verified: true },
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
    <section className="bg-[#FBFBFB] py-20 border-b border-[#E0E0E0]">
      <div className="container mx-auto px-6 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-[28px] sm:text-[34px] font-[900] text-[#1A1A1A] leading-tight flex items-center justify-center md:justify-start gap-3">
               <Zap className="text-[#FF6A00] animate-pulse" size={28} />
               Today&apos;s Top Deals
            </h2>
            <p className="text-[#888888] font-medium text-[15px]">Handpicked high-cashback offers manually verified by our team.</p>
          </div>
          <Link href="/deals" className="group flex items-center justify-center gap-2 bg-white border border-[#E0E0E0] px-6 py-3 rounded-2xl text-[#1A1A1A] text-[14px] font-black hover:border-primary hover:text-primary transition-all shadow-sm">
            View All Stores <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
           {TABS.map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "px-6 py-2.5 rounded-2xl text-[13px] font-[800] border transition-all whitespace-nowrap",
                 activeTab === tab 
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg shadow-black/10" 
                  : "bg-white text-[#888888] border-[#E0E0E0] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
               )}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredOffers.map((offer) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={offer.id}
                className="bg-white border border-[#E0E0E0] rounded-[28px] p-6 hover:shadow-2xl hover:shadow-black/[0.04] hover:-translate-y-1 transition-all group flex flex-col h-full relative"
              >
                {/* Verified Tag */}
                {offer.verified && (
                  <div className="absolute top-4 right-6 flex items-center gap-1.5 text-[#007A52] bg-[#E6F8EF] px-2.5 py-1 rounded-full border border-[#007A52]/10">
                     <ShieldCheck size={12} className="stroke-[3]" />
                     <span className="text-[10px] font-black uppercase tracking-wider">Verified</span>
                  </div>
                )}

                {/* Top Section: Branding */}
                <div className="flex items-center gap-4 mb-6">
                   <div className="h-12 w-12 rounded-[18px] bg-[#F7F7F7] flex items-center justify-center font-black text-white shadow-sm overflow-hidden border border-[#E0E0E0]" style={{ backgroundColor: offer.color }}>
                      {offer.store[0]}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[14px] font-[800] text-[#1A1A1A] leading-none mb-1">{offer.store}</span>
                      <span className="text-[11px] font-[700] text-[#888888] uppercase tracking-widest">{offer.category}</span>
                   </div>
                </div>

                {/* Offer Title */}
                <h3 className="text-[16px] font-[800] text-[#1A1A1A] mb-auto leading-[1.3] group-hover:text-primary transition-colors">
                  {offer.title}
                </h3>

                {/* Reward Badge */}
                <div className="my-6 bg-[#F3F4F6] rounded-2xl p-4 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#888888]">Earn Rewards</span>
                      <p className="text-[18px] font-black text-[#00C87A] leading-tight">+{offer.cashback}</p>
                   </div>
                   <TrendingUp size={20} className="text-[#00C87A]" />
                </div>

                {/* Footer Info */}
                <div className="space-y-4 pt-2" suppressHydrationWarning>
                   <div className="flex items-center justify-between text-[12px]">
                      <div className="flex items-center gap-1.5 text-[#888888] font-bold">
                         <Clock size={14} className="text-[#FF6A00]" />
                         Ends in {offer.expires}
                      </div>
                      <div className="text-secondary font-black group-hover:underline flex items-center gap-1 cursor-pointer">
                         Details <ChevronRight size={14} />
                      </div>
                   </div>
                   
                   <button className="w-full py-4 bg-[#FF6A00] text-white font-[900] text-[14px] rounded-[18px] hover:bg-[#D44E00] shadow-xl shadow-[#FF6A00]/20 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest" suppressHydrationWarning>
                      Activate Cashback
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
