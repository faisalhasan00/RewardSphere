'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';

const OFFERS = [
  { id: 1, store: 'Amazon', cashback: '6% Cashback', category: 'Fashion', title: 'Flat 40% OFF + 6% Cashback on Fashion', expires: '2d 14h' },
  { id: 2, store: 'Flipkart', cashback: '5% Cashback', category: 'Electronics', title: 'Big Billion Sale — Extra 5% Cashback', expires: '1d 08h' },
  { id: 3, store: 'Myntra', cashback: '8% Cashback', category: 'Fashion', title: 'Up to 70% OFF + 8% Cashback on Apparel', expires: '3d 22h' },
  { id: 4, store: 'Swiggy', cashback: '10% Cashback', category: 'Food', title: '10% Cashback on All Food Orders', expires: '18h 30m' },
  { id: 5, store: 'MakeMyTrip', cashback: '12% Cashback', category: 'Travel', title: 'Extra 12% Cashback on Flight Bookings', expires: '5d 12h' },
  { id: 6, store: 'Nykaa', cashback: '7% Cashback', category: 'Beauty', title: '7% Cashback on Beauty & Skincare', expires: '2d 04h' },
  { id: 7, store: 'bigbasket', cashback: '5% Cashback', category: 'Grocery', title: '5% Cashback on Grocery Orders Above ₹500', expires: '1d 20h' },
  { id: 8, store: 'Boat', cashback: '6% Cashback', category: 'Electronics', title: '6% Cashback on Boat Audio Products', expires: '4d 06h' },
];

const TABS = ['All', 'Fashion', 'Electronics', 'Food', 'Travel', 'Beauty', 'Grocery', 'Gaming'];

export const TopOffersStrip = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredOffers = activeTab === 'All' 
    ? OFFERS 
    : OFFERS.filter(offer => offer.category === activeTab);

  return (
    <section className="bg-white py-12">
      {/* Section Header */}
      <div className="container mx-auto px-6 sm:px-6 lg:px-12 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[22px] font-[700] text-[#1A1A1A]">Today&apos;s Top Deals</h2>
          <Link href="/deals" className="flex items-center gap-1 text-[#FF6A00] text-[14px] font-[500] hover:underline">
            View All Deals <ArrowRight size={14} />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
           {TABS.map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "px-[18px] py-[6px] rounded-full text-[13px] font-[500] border transition-all cursor-pointer whitespace-nowrap",
                 activeTab === tab 
                  ? "bg-[#FF6A00] text-white border-[#FF6A00]" 
                  : "bg-[#F7F7F7] text-[#888888] border-[#E0E0E0] hover:border-[#FF6A00] hover:text-[#FF6A00]"
               )}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
          <AnimatePresence mode="popLayout">
            {filteredOffers.map((offer) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={offer.id}
                className="bg-white border border-[#E0E0E0] rounded-[16px] p-[16px] hover:shadow-xl hover:shadow-black/5 hover:scale-[1.02] transition-all group cursor-pointer"
              >
                {/* Row 1: Store & Cashback */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#F7F7F7] text-[#1A1A1A] px-[10px] py-[3px] rounded-full text-[11px] font-medium border border-[#F0F0F0]">
                    {offer.store}
                  </span>
                  <span className="bg-[#E6F8EF] text-[#007A52] px-[10px] py-[3px] rounded-full text-[11px] font-[600] border border-[#007A52]/5">
                    {offer.cashback}
                  </span>
                </div>

                {/* Row 2: Title */}
                <h3 className="text-[14px] font-[700] text-[#1A1A1A] mb-5 leading-[1.4] line-clamp-2 h-[40px]">
                  {offer.title}
                </h3>

                {/* Row 3: Countdown & Grab */}
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-1 text-[#888888] text-[12px]">
                      <Clock size={12} />
                      Expires in {offer.expires}
                   </div>
                   <div className="text-[#FF6A00] text-[12px] font-[700] hover:underline flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Grab Deal &rarr;
                   </div>
                </div>

                <div className="h-[1px] bg-[#F5F5F5] w-full mb-4" />

                {/* Bottom Button */}
                <button className="w-full py-[10px] bg-[#FF6A00] text-white font-[700] text-[14px] rounded-[8px] hover:bg-[#D44E00] transition-colors shadow-lg shadow-[#FF6A00]/10">
                   Get Cashback
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
