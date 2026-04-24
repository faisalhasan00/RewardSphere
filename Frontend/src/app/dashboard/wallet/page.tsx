'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { walletService, WalletDashboardData } from '@/services/wallet.service';
import { BrandedSpinner } from '@/components/ui/BrandedSpinner';

export default function WalletPage() {
  const [data, setData] = useState<WalletDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await walletService.getDashboard();
        setData(dashboardData);
      } catch (err) {
        setError('Failed to load wallet data. Please try again later.');
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

  if (error) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-heading font-bold">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-heading">Financial Wallet</h1>
          <p className="text-muted text-sm">Track every rupee you earn and save.</p>
        </div>
        <Button className="rounded-2xl h-12 shadow-lg shadow-primary/10" leftIcon={<ArrowUpRight className="h-4 w-4" />}>
           Withdraw Funds
        </Button>
      </div>

      {/* Balance Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-money text-white border-none shadow-2xl shadow-money/20 rounded-[2.5rem] overflow-hidden relative">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <CheckCircle2 size={120} />
           </div>
           <CardContent className="p-10 space-y-6">
             <p className="text-xs font-black uppercase tracking-widest text-money-light/60">Total Confirmed Balance</p>
             <h2 className="text-6xl font-black tracking-tight leading-none">₹{data?.balances.confirmed || '0.00'}</h2>
             <p className="text-xs text-money-light/80 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Ready for withdrawal
             </p>
           </CardContent>
        </Card>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="rounded-[2.5rem] bg-star/10 border-star/20">
              <CardContent className="p-8 flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-star/80 uppercase tracking-widest">Pending Rewards</p>
                    <p className="text-4xl font-black text-heading leading-none">₹{data?.balances.pending || '0.00'}</p>
                    <p className="text-[10px] text-star/60 font-bold">Confirming in ~60 days</p>
                 </div>
                 <div className="h-12 w-12 rounded-2xl bg-star text-white flex items-center justify-center shadow-lg shadow-star/20">
                    <Clock className="h-6 w-6 text-heading" />
                 </div>
              </CardContent>
           </Card>

           <Card className="rounded-[2.5rem] bg-money-light/50 border-money/10">
              <CardContent className="p-8 flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-money uppercase tracking-widest">Total Earned</p>
                    <p className="text-4xl font-black text-heading leading-none">₹{ (parseFloat(data?.balances.confirmed || '0') + parseFloat(data?.balances.pending || '0')).toFixed(2) }</p>
                    <p className="text-[10px] text-money font-bold">Lifetime savings</p>
                 </div>
                 <div className="h-12 w-12 rounded-2xl bg-money text-white flex items-center justify-center shadow-lg shadow-money/20">
                    <ArrowDownLeft className="h-6 w-6" />
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>

      {/* Transaction Table */}
      <section className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-heading px-2">Recent Activity</h3>
        <Card className="rounded-[2rem] overflow-hidden border-card-border shadow-sm">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-background border-b border-card-border">
                    <th className="px-6 py-4 text-xs font-black text-muted uppercase tracking-widest">Type & Store</th>
                    <th className="px-6 py-4 text-xs font-black text-muted uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-xs font-black text-muted uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-black text-muted uppercase tracking-widest">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border/50">
                  {data?.recentTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center text-muted font-bold">No transactions yet. Start shopping to earn rewards!</td>
                    </tr>
                  ) : (
                    data?.recentTransactions.map((tx: any) => (
                      <tr key={tx.id} className="hover:bg-background/50 transition-colors">
                        <td className="px-6 py-5">
                           <div className="flex flex-col">
                              <span className="text-sm font-bold text-heading">{tx.store || tx.description}</span>
                              <span className="text-[10px] uppercase font-bold text-primary tracking-tighter">{tx.type}</span>
                           </div>
                        </td>
                        <td className={cn(
                          "px-6 py-5 text-sm font-black",
                          tx.amount.startsWith('-') ? "text-red-500" : "text-money"
                        )}>
                          {tx.amount.startsWith('-') ? tx.amount : `₹${tx.amount}`}
                        </td>
                        <td className="px-6 py-5 text-sm">
                          <span className={cn(
                             "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                             tx.status === 'COMPLETED' || tx.status === 'PAID' ? "bg-money-light text-money" : 
                             tx.status === 'PENDING' ? "bg-star/20 text-star/80" : "bg-red-50 text-red-600"
                          )}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-muted font-medium">
                          {new Date(tx.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
           </div>
        </Card>
      </section>
    </div>
  );
}
