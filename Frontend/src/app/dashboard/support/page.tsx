'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Accordion } from '@/components/ui/Accordion';
import { LifeBuoy, HelpCircle, Send, MessageSquare, ShieldQuestion, Mail } from 'lucide-react';
import { cn } from '@/utils/cn';

const FAQ_ITEMS = [
  { 
    title: 'How does RewardSphere cashback work?', 
    content: 'When you shop at our partner stores via RewardSphere, the retailers pay us a commission for your purchase. We then share the majority of this commission with you as "Cashback".' 
  },
  { 
    title: 'When will I get my cashback in my wallet?', 
    content: 'Cashback usually appears as "Pending" within 48-72 hours of your purchase. Once the retailer confirms the order (usually within 60-90 days), it switches to "Confirmed" status.' 
  },
  { 
    title: 'How can I withdraw my earnings?', 
    content: 'You can withdraw your "Confirmed Balance" directly to your Bank Account or UPI once it reaches the minimum threshold of ₹100.' 
  },
  { 
    title: 'What if my cashback is not tracked?', 
    content: 'If your purchase doesn\'t show as pending after 72 hours, you can raise a "Missing Cashback" claim under the Activity Tracker section or here in support.' 
  },
];

export default function SupportPage() {
  const [category, setCategory] = useState('MISSING_CASHBACK');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-900">Support Center</h1>
          <p className="text-gray-500 font-medium">Need help with your rewards? We've got you covered.</p>
        </div>
        <div className="flex items-center gap-2 p-2 bg-indigo-50 text-indigo-600 rounded-2xl font-bold text-xs uppercase tracking-widest border border-indigo-100">
           <LifeBuoy className="h-4 w-4" /> 24x7 Customer Help
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        
        {/* FAQ Section */}
        <div className="lg:col-span-3 space-y-8">
           <div className="flex items-center gap-3 px-2">
              <HelpCircle className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-black text-gray-900">Frequently Asked Questions</h2>
           </div>
           <Accordion items={FAQ_ITEMS} />
           
           <div className="bg-gray-50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center space-y-4 border border-gray-100">
              <Mail className="h-10 w-10 text-gray-400" />
              <div className="space-y-1">
                 <p className="font-bold text-gray-900">Still have questions?</p>
                 <p className="text-sm text-gray-500">Email us directly at <span className="text-indigo-600 font-black">support@rewardsphere.com</span></p>
              </div>
           </div>
        </div>

        {/* Support Ticket Section */}
        <div className="lg:col-span-2">
           <Card className="rounded-[3rem] border-none shadow-2xl shadow-gray-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Send size={120} />
              </div>
              <CardHeader className="p-8 pb-4">
                 <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                    Raise a Ticket
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6">
                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Enquiry Category</label>
                       <div className="grid grid-cols-1 gap-2">
                          {['MISSING_CASHBACK', 'WITHDRAWAL_ISSUE', 'ACCOUNT_ISSUE', 'OTHER'].map((cat) => (
                             <button 
                              key={cat}
                              type="button"
                              onClick={() => setCategory(cat)}
                              className={cn(
                                "text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border",
                                category === cat ? "bg-indigo-600 text-white border-indigo-600 shadow-md" : "bg-white text-gray-500 border-gray-100 hover:border-gray-200"
                              )}
                             >
                                {cat.replace('_', ' ')}
                             </button>
                          ))}
                       </div>
                    </div>

                    <Input label="Subject" placeholder="Briefly describe the issue" required />
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Detailed Description</label>
                       <textarea 
                        required
                        placeholder="Tell us exactly what happened..." 
                        className="w-full min-h-[120px] p-4 bg-gray-50 border-none rounded-2xl text-sm focus:ring-4 focus:ring-indigo-500/10"
                       />
                    </div>

                    {success ? (
                       <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 text-emerald-600 text-sm font-bold">
                          <ShieldQuestion className="h-5 w-5 shrink-0" />
                          Success! Ticket #RS-8842 has been created. We will reply within 24 hours.
                       </div>
                    ) : (
                       <Button type="submit" className="w-full h-16 rounded-2xl text-lg shadow-lg" isLoading={loading}>
                          Create Support Ticket
                       </Button>
                    )}
                 </form>
              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}
