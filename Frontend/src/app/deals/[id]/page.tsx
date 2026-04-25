'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { 
  BadgeCheck, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  Info, 
  AlertCircle, 
  ChevronRight,
  TrendingUp,
  Zap,
  MousePointer2,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';
import { BrandedSpinner } from '@/components/ui/BrandedSpinner';
import { motion, AnimatePresence } from 'framer-motion';

export default function SingleDealPage() {
  const { id } = useParams();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Mock data fetching based on ID
  const deal = {
    title: 'Up to 70% Off on Electronics + 12% Rewards',
    storeName: 'Amazon',
    cashbackRate: '12%',
    rawRate: '12',
    category: 'Electronics',
    description: 'Valid on all electronic appliances including Mobiles, Laptops, Home Audio, and Smart Gadgets. Exclusive RewardSphere bonus already included in the rate.',
    brandColor: '#FF9900',
    terms: [
      'Cashback is not applicable on Gift Cards or Prime Subscriptions.',
      'Order should be placed within the same session after clicking.',
      'Cashback usually tracks within 24-48 hours.',
      'Final confirmation takes up to 60-90 days post-delivery.',
    ],
    expiry: 'Ends in 3 days',
    usersLastWeek: '4,821 shoppers used this today',
  };

  const handleGetDeal = () => {
    setIsRedirecting(true);
    // Mock tracking redirect
    setTimeout(() => {
      setIsRedirecting(false);
      alert('Redirecting to ' + deal.storeName + ' with Tracking ID: RS_' + Math.random().toString(36).substring(7).toUpperCase());
    }, 2000);
  };

  if (isRedirecting) {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-8 max-w-md"
        >
          <div className="relative">
             <div className="h-32 w-32 rounded-[2.5rem] bg-background border border-card-border flex items-center justify-center mx-auto shadow-xl">
                <img src="/Logo/Logo.png" alt="RewardSphere" className="h-12 w-auto grayscale" />
             </div>
             <motion.div 
               animate={{ x: [0, 100, 0] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
             >
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-75" />
             </motion.div>
          </div>
          <div className="space-y-3">
             <h2 className="text-2xl font-black text-heading">Securing your {deal.cashbackRate} Cashback</h2>
             <p className="text-muted text-sm leading-relaxed font-medium">
               We are creating a secure tracking session at <strong>{deal.storeName}</strong>. Please do not close this window.
             </p>
          </div>
          <BrandedSpinner />
          <div className="pt-8 flex items-center justify-center gap-6 opacity-30 grayscale scale-75">
             <img src="/Logo/Logo.png" alt="" className="h-6 opacity-50" />
             <div className="h-4 w-[1px] bg-card-border" />
             <div className="font-black text-lg">{deal.storeName}</div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBFBFB] min-h-screen pb-24">
      {/* Dynamic Header Section */}
      <div className="bg-white border-b border-card-border">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-6">
           <div className="flex items-center gap-3 text-xs font-black text-muted uppercase tracking-widest overflow-x-auto scrollbar-hide whitespace-nowrap">
             <Link href="/" className="hover:text-primary transition-colors">Home</Link>
             <ChevronRight size={14} className="shrink-0" />
             <Link href="/deals" className="hover:text-primary transition-colors">Deals</Link>
             <ChevronRight size={14} className="shrink-0" />
             <span className="text-heading">{deal.storeName}</span>
             <ChevronRight size={14} className="shrink-0" />
             <span className="text-primary truncate">{id}</span>
           </div>
        </div>
      </div>

      <main className="container mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Deal Showcase Card */}
            <section className="bg-white rounded-[3rem] border border-card-border shadow-xl shadow-black/[0.02] overflow-hidden relative">
               {/* Pattern Background overlay */}
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${deal.brandColor} 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
               
               <div className="p-8 md:p-14 relative z-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10">
                     <div className="h-24 w-24 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shrink-0 shadow-lg" style={{ backgroundColor: deal.brandColor }}>
                       {deal.storeName[0]}
                     </div>
                     <div className="space-y-2">
                       <div className="flex items-center gap-2 text-money font-black text-[11px] uppercase tracking-[0.2em] bg-money-light px-3 py-1 rounded-full border border-money/10 w-fit">
                          <ShieldCheck size={14} className="stroke-[3]" /> Verified Official Deal
                       </div>
                       <h1 className="text-3xl md:text-5xl font-black text-heading leading-[1.1] tracking-tight">
                         {deal.title}
                       </h1>
                     </div>
                  </div>

                  <p className="text-muted text-lg md:text-xl font-medium leading-[1.6] mb-12 max-w-3xl">
                    {deal.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 border-t border-card-border/50">
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest block">Offer Expires</span>
                        <div className="flex items-center gap-2 text-heading font-black">
                           <Clock size={16} className="text-orange-500" /> {deal.expiry}
                        </div>
                     </div>
                     <div className="space-y-1">
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest block">Live Traffic</span>
                        <div className="flex items-center gap-2 text-heading font-black">
                           <TrendingUp size={16} className="text-primary" /> {deal.usersLastWeek}
                        </div>
                     </div>
                     <div className="hidden sm:block space-y-1">
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest block">Cashback Type</span>
                        <div className="flex items-center gap-2 text-heading font-black">
                           <Zap size={16} className="text-money" /> Real Money
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Steps Visualizer */}
            <Card className="rounded-[3rem] border-none bg-indigo-50/50 p-10 md:p-14">
               <h3 className="text-2xl font-black text-heading mb-12">How to earn rewards on this deal?</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                  {/* Connector Line (Desktop) */}
                  <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-indigo-200 z-0" />
                  
                  {[
                    { title: "Activate Session", desc: "Click the 'Get Cashback' button to start your tracked session.", icon: <MousePointer2 className="text-primary" /> },
                    { title: "Shop Normally", desc: "Add products to cart and checkout on the store website.", icon: <ShoppingBag className="text-primary" /> },
                    { title: "Get Rewarded", desc: "Cashback will track in your wallet automatically.", icon: <TrendingUp className="text-primary" /> }
                  ].map((step, i) => (
                    <div key={i} className="relative z-10 space-y-5 text-center md:text-left group">
                       <div className="h-12 w-12 rounded-2xl bg-white text-primary flex items-center justify-center font-black group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-md">
                          {step.icon}
                       </div>
                       <div className="space-y-2">
                          <h4 className="font-black text-heading">{step.title}</h4>
                          <p className="text-sm font-medium text-muted leading-relaxed">{step.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            {/* Terms Section */}
            <section className="space-y-6">
               <div className="flex items-center gap-3 px-2">
                  <div className="h-1 bg-primary w-8 rounded-full" />
                  <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Crucial Offer Terms</h3>
               </div>
               <div className="bg-white rounded-[2.5rem] p-10 border border-card-border shadow-sm">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {deal.terms.map((term, i) => (
                      <li key={i} className="flex gap-4 text-sm text-muted font-medium leading-relaxed group">
                        <CheckCircle2 className="h-5 w-5 text-money shrink-0 transition-transform group-hover:scale-110" />
                        {term}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 p-5 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 text-orange-700 text-xs font-bold items-center">
                     <AlertCircle className="h-5 w-5 shrink-0" />
                     Reminder: Using any coupons not listed on RewardSphere may void your tracking.
                  </div>
               </div>
            </section>
          </div>

          {/* Sidebar Conversational CTA */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
             <Card className="rounded-[3rem] border-[3px] border-primary shadow-2xl shadow-primary/10 overflow-hidden scale-100 hover:scale-[1.02] transition-transform">
                <div className="bg-primary/5 p-10 pb-6 text-center">
                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.25em] mb-4 block">Exclusive Rewards Rate</span>
                   <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-6xl font-black text-heading tracking-tighter" suppressHydrationWarning>
                         {deal.cashbackRate}
                      </span>
                      <TrendingUp size={32} className="text-money" />
                   </div>
                   <p className="text-[13px] font-black text-heading uppercase tracking-widest mt-4">Verified Cashback</p>
                </div>
                
                <CardContent className="p-10 pt-4">
                   <div className="flex flex-col gap-4">
                      <Button 
                        size="lg"
                        className="w-full h-20 text-lg rounded-[1.5rem] shadow-xl shadow-primary/20 font-black uppercase tracking-widest" 
                        onClick={handleGetDeal}
                        rightIcon={<ExternalLink className="h-5 w-5" />}
                        suppressHydrationWarning
                      >
                        Activate & Shop
                      </Button>
                      
                      <div className="flex items-center justify-center gap-6 mt-4">
                         <div className="flex flex-col items-center">
                            <span className="text-[16px] font-black text-heading">₹0</span>
                            <span className="text-[9px] font-black text-muted uppercase tracking-widest">Entry Fee</span>
                         </div>
                         <div className="h-8 w-[1px] bg-card-border" />
                         <div className="flex flex-col items-center">
                            <span className="text-[16px] font-black text-heading">100%</span>
                            <span className="text-[9px] font-black text-muted uppercase tracking-widest">Track Rate</span>
                         </div>
                      </div>
                   </div>

                   <p className="text-[10px] text-center text-muted mt-8 uppercase font-black tracking-widest opacity-40">
                     No Coupon Required • Best Price Guaranteed
                   </p>
                </CardContent>
             </Card>

             {/* Help Card */}
             <div className="rounded-[2.5rem] bg-indigo-900 p-8 text-white space-y-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                   <AlertCircle size={80} />
                </div>
                <div className="relative z-10">
                   <h4 className="font-black text-lg mb-2">Cashback Guarantee</h4>
                   <p className="text-xs text-indigo-200/80 leading-relaxed">
                     Don&apos;t worry! Even if modern browsers block our tracking, you can raise a ticket and we&apos;ll manually resolve it within 48h.
                   </p>
                   <Button variant="ghost" className="text-white hover:bg-white/10 w-full rounded-2xl h-12 mt-6 border border-white/10 font-black text-xs uppercase tracking-widest">
                     Support Center
                   </Button>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}

import Link from 'next/link';
