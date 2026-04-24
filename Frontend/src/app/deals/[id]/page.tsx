'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { BadgeCheck, Clock, ShieldCheck, ArrowRight, ExternalLink, Info, AlertCircle } from 'lucide-react';
import { Loader } from '@/components/ui/Loader';

export default function SingleDealPage() {
  const { id } = useParams();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Mock data fetching based on ID
  const deal = {
    title: 'Up to 70% Off on Electronics + 12% Rewards',
    storeName: 'Amazon',
    cashbackRate: '12%',
    description: 'Valid on all electronic appliances including Mobiles, Laptops, and Home Audio. Exclusive RewardSphere bonus included.',
    terms: [
      'Cashback is not applicable on Gift Cards.',
      'Order should be placed within the same session after clicking.',
      'Cashback will track within 24-48 hours.',
      'Final confirmation takes up to 60 days.',
    ],
    expiry: 'Valid till 30th April',
  };

  const handleGetDeal = () => {
    setIsRedirecting(true);
    // Mock tracking redirect
    setTimeout(() => {
      setIsRedirecting(false);
      alert('Redirecting to Store with Tracking ID: RS_' + Math.random().toString(36).substring(7).toUpperCase());
    }, 1500);
  };

  if (isRedirecting) return <Loader fullScreen className="text-white" />;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumb / Top Bar */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
             Deals / {deal.storeName} / <span className="text-gray-600">{id}</span>
           </p>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BadgeCheck size={120} />
               </div>

               <div className="flex items-start gap-6 mb-8">
                  <div className="h-20 w-20 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shrink-0">
                    {deal.storeName[0]}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                       <ShieldCheck className="h-4 w-4" /> Official Brand Partner
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                      {deal.title}
                    </h1>
                  </div>
               </div>

               <p className="text-gray-500 text-lg leading-relaxed mb-8">
                 {deal.description}
               </p>

               <div className="flex flex-wrap gap-6 pt-8 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                     <Clock className="h-4 w-4" /> {deal.expiry}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                     <Info className="h-4 w-4" /> 2,401 uses this week
                  </div>
               </div>
            </section>

            <Card className="rounded-[2.5rem]">
               <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl">How to earn Cashback?</CardTitle>
               </CardHeader>
               <CardContent className="p-8 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="space-y-2">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">1</div>
                        <p className="text-sm font-medium text-gray-600">Click on 'Get Deal' button above</p>
                     </div>
                     <div className="space-y-2">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">2</div>
                        <p className="text-sm font-medium text-gray-600">Shop normally on the store website</p>
                     </div>
                     <div className="space-y-2">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">3</div>
                        <p className="text-sm font-medium text-gray-600">Cashback will track in your pocket</p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <section className="space-y-4">
               <h3 className="text-xl font-bold text-gray-900 px-4">Important Terms & Conditions</h3>
               <div className="bg-white rounded-3xl p-6 border border-gray-100">
                  <ul className="space-y-4">
                    {deal.terms.map((term, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-500 leading-relaxed">
                        <AlertCircle className="h-5 w-5 text-indigo-300 shrink-0" />
                        {term}
                      </li>
                    ))}
                  </ul>
               </div>
            </section>
          </div>

          {/* Sidebar CTA */}
          <div className="space-y-6">
             <Card className="rounded-[2.5rem] border-2 border-indigo-600 shadow-2xl shadow-indigo-600/10 sticky top-24">
                <CardHeader className="text-center p-8 pb-4">
                   <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Exclusive Reward</p>
                   <div className="text-5xl font-black text-gray-900 mb-2">{deal.cashbackRate}</div>
                   <p className="text-sm font-bold text-gray-400">Cashback on this order</p>
                </CardHeader>
                <CardContent className="p-8 pt-4">
                   <Button 
                    className="w-full h-16 text-lg rounded-2xl shadow-lg" 
                    onClick={handleGetDeal}
                    rightIcon={<ExternalLink className="h-5 w-5" />}
                   >
                     Get Deal Now
                   </Button>
                   <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-tighter">
                     No Coupon Code Required • Auto-Applied
                   </p>
                </CardContent>
             </Card>

             <Card className="rounded-[2.5rem] bg-indigo-900 text-white border-none">
                <CardContent className="p-8 space-y-4 text-center">
                   <h4 className="font-bold">Missing Cashback?</h4>
                   <p className="text-xs text-indigo-200 leading-relaxed">
                     If your cashback doesn't track within 48 hours, you can raise a ticket in the support section.
                   </p>
                   <Button variant="ghost" className="text-white hover:bg-white/10 w-full rounded-2xl">Raise Ticket</Button>
                </CardContent>
             </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
