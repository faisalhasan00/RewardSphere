'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, Gift, Users, Wallet, Share2, Check } from 'lucide-react';

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'SAID123';
  const referralLink = `https://rewardsphere.com/register?ref=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-900">Refer & Earn</h1>
          <p className="text-gray-500 font-medium">Invite your friends and earn ₹25 on their first purchase.</p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-3xl font-black text-sm border border-emerald-100 italic">
           <Gift className="h-5 w-5" /> Unlimited Bonuses Available
        </div>
      </div>

      {/* Referral Link Card */}
      <Card className="rounded-[3rem] border-none bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 md:p-14 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black leading-tight">Spread the word, <br/>gather the rewards.</h2>
              <p className="text-indigo-100 leading-relaxed max-w-sm">
                Share your unique link with friends. Once they earn their first confirmed cashback, you $quot;ll get ₹25 instantly!
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-indigo-300">Your Unique Referral Link</label>
              <div className="flex gap-2">
                <input 
                  readOnly 
                  value={referralLink}
                  className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 h-14 text-sm font-bold text-white focus:outline-none"
                />
                <Button 
                  variant="secondary" 
                  className="h-14 px-8 rounded-2xl"
                  onClick={handleCopy}
                  leftIcon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4">
               <button className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Share2 className="h-5 w-5" title="Share on Facebook" /></button>
               <button className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Share2 className="h-5 w-5" title="Share on Twitter" /></button>
               <button className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Share2 className="h-5 w-5" title="Share on WhatsApp" /></button>
               <button className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"><Share2 className="h-5 w-5" title="More Options" /></button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center bg-indigo-700/50 p-10">
             <div className="text-center space-y-2">
                <div className="h-32 w-32 rounded-full border-4 border-white/20 flex items-center justify-center mx-auto mb-6">
                   <Users size={64} className="text-white/40" />
                </div>
                <h3 className="text-2xl font-black">Join 12,000+</h3>
                <p className="text-indigo-200 text-sm font-medium italic">People earning daily bonuses.</p>
             </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="rounded-[2.5rem] p-8 border-gray-100 shadow-sm">
            <div className="flex items-center gap-6">
               <div className="h-14 w-14 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Users className="h-6 w-6" />
               </div>
               <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Total Referrals</p>
                  <p className="text-4xl font-black text-gray-900 leading-none">12</p>
               </div>
            </div>
         </Card>

         <Card className="rounded-[2.5rem] p-8 border-gray-100 shadow-sm">
            <div className="flex items-center gap-6">
               <div className="h-14 w-14 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Wallet className="h-6 w-6" />
               </div>
               <div>
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Referral Earnings</p>
                  <p className="text-4xl font-black text-gray-900 leading-none">₹300.00</p>
               </div>
            </div>
         </Card>
      </div>

      <div className="pt-10">
         <h3 className="text-xl font-bold text-gray-900 px-2 mb-6">How it works?</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-3xl space-y-3">
               <div className="h-8 w-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-black text-xs">01</div>
               <p className="text-sm font-bold text-gray-900">Share your link</p>
               <p className="text-xs text-gray-500 leading-relaxed">Send your unique link to friends via WhatsApp or social media.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-3xl space-y-3">
               <div className="h-8 w-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-black text-xs">02</div>
               <p className="text-sm font-bold text-gray-900">Wait for purchase</p>
               <p className="text-xs text-gray-500 leading-relaxed">Your friend joins and makes their first successful purchase.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-3xl space-y-3">
               <div className="h-8 w-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-black text-xs">03</div>
               <p className="text-sm font-bold text-gray-900">Earn ₹25 Bonus</p>
               <p className="text-xs text-gray-500 leading-relaxed">Once their cashback is confirmed, the bonus is added to your wallet.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
