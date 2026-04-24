'use client';
import React from 'react';
import { Hero } from '@/components/features/home/Hero';
import { HowItWorks } from '@/components/features/home/HowItWorks';
import { DealCard } from '@/components/features/deals/DealCard';
import { Button } from '@/components/ui/Button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const DUMMY_DEALS = [
  { id: '1', storeName: 'Amazon', cashbackRate: '12%', description: 'Up to 70% off on Electronics + 12% Rewards.', logo: 'A' },
  { id: '2', storeName: 'Flipkart', cashbackRate: '8%', description: 'Big Billion Days: Mobiles & Laptops Sale.', logo: 'F' },
  { id: '3', storeName: 'Myntra', cashbackRate: '15%', description: 'End of Reason Sale: Fashion & Beauty.', logo: 'M' },
  { id: '4', storeName: 'Ajio', cashbackRate: '20%', description: 'Flat 500 Off on orders above 2499.', logo: 'AJ' },
  { id: '5', storeName: 'Samsung', cashbackRate: '5%', description: 'Student Advantage: Save up to INR 15000.', logo: 'S' },
  { id: '6', storeName: 'Mamaearth', cashbackRate: '25%', description: 'Buy 2 Get 2 Free on Skin Care products.', logo: 'ME' },
];

import { TopOffersStrip } from '@/components/features/home/TopOffersStrip';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TopOffersStrip />

      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-heading">Trending Deals</h2>
              <p className="text-muted">Handpicked offers with highest cashback rates for you today.</p>
            </div>
            <Link href="/deals">
              <Button variant="ghost" className="hidden sm:flex text-primary font-bold" rightIcon={<ChevronRight className="h-4 w-4" />}>
                View All Deals
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {DUMMY_DEALS.map((deal) => (
              <DealCard 
                key={deal.id}
                id={deal.id}
                storeName={deal.storeName}
                logo={deal.logo}
                cashbackRate={deal.cashbackRate}
                description={deal.description}
              />
            ))}
          </div>

          <div className="mt-12 sm:hidden text-center">
            <Link href="/deals">
               <Button variant="outline" className="w-full">View All Deals</Button>
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* CTA Bottom Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-primary rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
              {/* Abstract Patterns */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-dark/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-black max-w-4xl mx-auto leading-tight">
                   Start Saving Money on Every Order Today.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/register">
                    <Button size="lg" className="px-12 h-16 text-lg border-none hover:scale-105 transform transition bg-white text-primary hover:bg-primary-light">
                       Get Registered for Free
                    </Button>
                  </Link>
                  <p className="text-primary-light text-sm font-medium">No Credit Card Required • Instant Cashback</p>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
