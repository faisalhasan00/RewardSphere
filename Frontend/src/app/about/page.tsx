import React from 'react';
import { Target, Zap, Heart, ShieldCheck, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-indigo-600 py-24 text-white">
        <div className="container mx-auto px-4 text-center space-y-6 max-w-4xl">
           <h1 className="text-5xl md:text-7xl font-black tracking-tight">Earning Cashback Should Be <span className="text-indigo-200">Effortless</span>.</h1>
           <p className="text-xl text-indigo-100 leading-relaxed font-medium">
             RewardSphere was founded with a single mission: To give every Indian shopper a part of the marketing commissions that brands pay for their attention.
           </p>
        </div>
      </section>

      {/* Mission & Stats */}
      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
           <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full font-black text-xs uppercase tracking-widest">
                 Our Story
              </div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight">By Shoppers, For Shoppers.</h2>
              <div className="space-y-4 text-gray-500 text-lg leading-relaxed">
                 <p>
                    Started in 2023, RewardSphere began as a small tool to help friends save money on their Amazon orders. Today, we've grown into a community of 50,000+ members who earn daily rewards.
                 </p>
                 <p>
                    We believe in radical transparency. We share up to 90% of the commission we receive back with our users, ensuring you always get the best deal possible.
                 </p>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="p-10 bg-gray-50 rounded-[3rem] text-center space-y-2">
                 <p className="text-4xl font-black text-gray-900 leading-none">500+</p>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Partner Stores</p>
              </div>
              <div className="p-10 bg-gray-50 rounded-[3rem] text-center space-y-2">
                 <p className="text-4xl font-black text-gray-900 leading-none">₹2.5Cr</p>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Savings Generated</p>
              </div>
              <div className="col-span-2 p-10 bg-indigo-50 rounded-[3rem] text-center space-y-2 border border-indigo-100">
                 <p className="text-4xl font-black text-indigo-600 leading-none">100%</p>
                 <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Transparency Guarantee</p>
              </div>
           </div>
        </div>

        {/* Values */}
        <section className="space-y-16">
           <h3 className="text-3xl font-black text-gray-900 text-center">What We Stand For</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center space-y-6">
                 <div className="h-16 w-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-900">User First</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Every decision we make starts with one question: "How does this help our users save more?"</p>
                 </div>
              </div>
              <div className="text-center space-y-6">
                 <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Zap className="h-8 w-8" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-900">Speedy Payouts</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">We optimize our workflows to ensure your confirmed cashback hits your bank account as fast as possible.</p>
                 </div>
              </div>
              <div className="text-center space-y-6">
                 <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Target className="h-8 w-8" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-900">Radical Honesty</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">No hidden fees, no complicated terms. What you see is what you get.</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* Trust Footer */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-4 text-gray-400">
               <ShieldCheck className="h-8 w-8" />
               <p className="text-sm font-bold max-w-xs">Data encrypted with industry standard AES-256 protocols.</p>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
               <Users className="h-8 w-8" />
               <p className="text-sm font-bold max-w-xs">Connecting 50k+ shoppers with India's biggest brands.</p>
            </div>
         </div>
      </section>
    </div>
  );
}
