'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { MousePointer2, TrendingUp, AlertTriangle, ChevronRight, Clock, CheckCircle2, ShoppingBag, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';
import { cashbackService } from '@/services/cashback.service';
import { walletService, WalletDashboardData } from '@/services/wallet.service';
import { BrandedSpinner } from '@/components/ui/BrandedSpinner';

export default function CashbackTrackerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'CLICKS' | 'HISTORY'>('HISTORY');
  const [walletData, setWalletData] = useState<WalletDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await walletService.getDashboard();
        setWalletData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <BrandedSpinner />
      </div>
    );
  }

  // Filter conversions from wallet transactions
  const conversions = walletData?.recentTransactions.filter(t => t.type === 'CASHBACK' || t.type === 'CONVERSION') || [];
  // Mock clicks for now as backend doesn't have a history yet
  const clicks = [
     { id: 'c1', store: 'Amazon', status: 'CLICKED', date: new Date().toISOString() },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-heading">Activity Tracker</h1>
          <p className="text-muted text-sm">Monitor your clicks, conversions, and rewards status.</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl h-14 shadow-lg shadow-orange-600/10 bg-orange-600 hover:bg-orange-700" 
          leftIcon={<AlertTriangle className="h-4 w-4" />}
        >
          Missing Cashback?
        </Button>
      </div>

      <div className="flex items-center gap-4 p-1 bg-background rounded-2xl w-fit border border-card-border">
         <button 
          onClick={() => setActiveTab('HISTORY')}
          className={cn(
            "px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
            activeTab === 'HISTORY' ? "bg-white text-primary shadow-sm" : "text-muted hover:text-heading"
          )}
         >
           Cashback History
         </button>
         <button 
          onClick={() => setActiveTab('CLICKS')}
          className={cn(
            "px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
            activeTab === 'CLICKS' ? "bg-white text-primary shadow-sm" : "text-muted hover:text-heading"
          )}
         >
            Recent Clicks
         </button>
      </div>

      <Card className="rounded-[2.5rem] overflow-hidden border-card-border shadow-sm">
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-background border-b border-card-border">
                        <th className="px-8 py-6 text-xs font-black text-muted uppercase tracking-widest">Target Store</th>
                        <th className="px-8 py-6 text-xs font-black text-muted uppercase tracking-widest">
                           {activeTab === 'HISTORY' ? 'Cashback Amount' : 'Visit Activity'}
                        </th>
                        <th className="px-8 py-6 text-xs font-black text-muted uppercase tracking-widest">Status</th>
                        <th className="px-8 py-6 text-xs font-black text-muted uppercase tracking-widest text-right">Activity Date</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/50">
                     {(activeTab === 'HISTORY' ? conversions : clicks).length === 0 ? (
                        <tr>
                           <td colSpan={4} className="px-8 py-10 text-center text-muted font-bold italic">No activity found yet.</td>
                        </tr>
                     ) : (activeTab === 'HISTORY' ? conversions : clicks).map((item: any) => (
                        <tr key={item.id} className="hover:bg-background/50 transition-colors group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="h-10 w-10 rounded-xl bg-background text-muted flex items-center justify-center group-hover:bg-primary-light group-hover:text-primary transition-all font-black text-lg border border-card-border">
                                    {(item.store || item.description || 'S')[0]}
                                 </div>
                                 <span className="font-bold text-heading">{item.store || item.description}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              {activeTab === 'HISTORY' ? (
                                 <span className="font-black text-money">₹{item.amount / 100}</span>
                              ) : (
                                 <span className="text-sm text-muted font-medium">Session Tracked</span>
                              )}
                           </td>
                           <td className="px-8 py-6">
                              <span className={cn(
                                 "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                 item.status === 'CREDITED' || item.status === 'COMPLETED' ? "bg-money-light text-money" : 
                                 item.status === 'PENDING' || item.status === 'CLICKED' ? "bg-star/20 text-star/80" : "bg-red-50 text-red-600"
                              )}>
                                 {item.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right text-sm text-muted font-medium">
                              {new Date(item.createdAt || item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </CardContent>
      </Card>

      {/* Analytics Mini-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="rounded-[2.5rem] bg-primary-light/50 border-none p-8 flex items-center justify-between group">
            <div className="space-y-1">
               <p className="text-xs font-black text-primary/60 uppercase tracking-widest mb-1">Conversion Rate</p>
               <p className="text-4xl font-black text-heading">32.4%</p>
               <p className="text-xs text-primary font-bold">Good performance!</p>
            </div>
            <TrendingUp size={48} className="text-primary/20 group-hover:scale-110 transition-transform" />
         </Card>
         <Card className="rounded-[2.5rem] bg-money-light/50 border-none p-8 flex items-center justify-between group">
            <div className="space-y-1">
               <p className="text-xs font-black text-money/60 uppercase tracking-widest mb-1">Tracked Clicks</p>
               <p className="text-4xl font-black text-heading">128</p>
               <p className="text-xs text-money font-bold">In the last 30 days</p>
            </div>
            <MousePointer2 size={48} className="text-money/20 group-hover:scale-110 transition-transform" />
         </Card>
      </div>

      {/* Missing Cashback Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Claim Missing Cashback"
      >
        <form className="space-y-6 pt-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); alert('Claim submitted for review!'); }}>
           <p className="text-xs text-muted italic">Please allow up to 48 hours for clicks to track before raising a claim.</p>
           
           <div className="space-y-4">
              <Input label="Store Name" placeholder="e.g. Amazon" required />
              <Input label="Order ID" placeholder="123-456789-000" required />
              <div className="space-y-2">
                 <label className="text-xs font-bold text-muted uppercase tracking-widest px-1">Case Notes</label>
                 <textarea 
                  placeholder="Tell us about your order..." 
                  className="w-full min-h-[100px] p-4 bg-background border border-card-border rounded-2xl text-sm focus:ring-4 focus:ring-primary/10"
                 />
              </div>
           </div>

           <Button type="submit" className="w-full h-14 rounded-2xl">
              Submit Dispute Claim
           </Button>
        </form>
      </Modal>
    </div>
  );
}
