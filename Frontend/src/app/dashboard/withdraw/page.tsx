'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowUpRight, Landmark, CreditCard, Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/utils/cn';
import { walletService, WalletDashboardData } from '@/services/wallet.service';
import { BrandedSpinner } from '@/components/ui/BrandedSpinner';

export default function WithdrawPage() {
  const [method, setMethod] = useState<'UPI' | 'BANK'>('UPI');
  const [data, setData] = useState<WalletDashboardData | null>(null);
  const [amount, setAmount] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dashboardData = await walletService.getDashboard();
      setData(dashboardData);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const val = parseFloat(amount);
    if (isNaN(val) || val < 100) {
      setError('Minimum withdrawal amount is ₹100.');
      return;
    }

    if (val > parseFloat(data?.balances.confirmed || '0')) {
      setError('Insufficient confirmed balance.');
      return;
    }

    setLoading(true);
    try {
      // Amount in Paise (e.g. 100 Rs = 10000 Paise)
      await walletService.requestWithdrawal(val * 100, details);
      setSuccess(true);
      setAmount('');
      setDetails('');
      fetchData(); // Refresh history
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <BrandedSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-heading">Request Withdrawal</h1>
          <p className="text-muted text-sm">Transfer your confirmed earnings to your bank account.</p>
        </div>
        <div className="px-5 py-2 bg-primary-light border border-primary/10 rounded-2xl">
           <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest leading-none mb-1">Available to Withdraw</p>
           <p className="text-lg font-black text-primary leading-none">₹{data?.balances.confirmed || '0.00'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* Request Form */}
        <Card className="lg:col-span-3 rounded-[2.5rem] border-card-border shadow-xl shadow-primary/5">
          <CardContent className="p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setMethod('UPI')}
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-6 rounded-3xl border-2 transition-all",
                    method === 'UPI' ? "border-primary bg-primary-light text-primary" : "border-card-border text-muted hover:border-primary/20"
                  )}
                >
                  <ArrowUpRight className="h-6 w-6" />
                  <span className="text-xs font-black uppercase tracking-widest">UPI ID</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setMethod('BANK')}
                  disabled
                  className={cn(
                    "flex flex-col items-center justify-center gap-2 p-6 rounded-3xl border-2 transition-all opacity-50 cursor-not-allowed",
                    method === 'BANK' ? "border-primary bg-primary-light text-primary" : "border-card-border text-muted"
                  )}
                >
                  <Landmark className="h-6 w-6" />
                  <span className="text-xs font-black uppercase tracking-widest">Bank Transfer</span>
                </button>
              </div>

              <div className="space-y-4">
                <Input 
                  label={method === 'UPI' ? 'Enter UPI ID' : 'Bank Account Details'}
                  placeholder={method === 'UPI' ? 'username@okaxis' : 'Account No, IFSC, Branch'}
                  value={details}
                  required
                  onChange={(e) => setDetails(e.target.value)}
                  helperText="Payments will be sent to this ID."
                />
                <Input 
                  label="Withdrawal Amount (₹)"
                  placeholder="100.00"
                  type="number"
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
                  error={error}
                />
              </div>

              {success && (
                <div className="p-4 bg-money-light border border-money/10 rounded-2xl flex gap-3 text-money text-sm font-bold">
                   <CheckCircle2 className="h-5 w-5 shrink-0" />
                   Withdrawal request submitted successfully! It will be processed within 24-48 hours.
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-16 rounded-3xl text-lg shadow-lg shadow-primary/20"
                isLoading={loading}
              >
                Submit Withdrawal Request
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Requirements Card */}
        <div className="lg:col-span-2 space-y-6">
           <Card className="rounded-[2.5rem] bg-footer-bg text-white border-none p-8 space-y-6">
              <h3 className="font-bold flex items-center gap-2"><AlertCircle className="h-5 w-5 text-primary" /> Important Guidelines</h3>
              <ul className="space-y-4">
                 <li className="flex gap-3 text-xs text-muted leading-relaxed">
                    <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-[8px] text-white">01</span>
                    Minimum withdrawal threshold is <span className="text-white font-bold">₹100</span>.
                 </li>
                 <li className="flex gap-3 text-xs text-muted leading-relaxed">
                    <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-[8px] text-white">02</span>
                    Funds will be deducted from your <span className="text-white font-bold">Confirmed Balance</span> instantly.
                 </li>
                 <li className="flex gap-3 text-xs text-muted leading-relaxed">
                    <span className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 font-bold text-[8px] text-white">03</span>
                    Approval usually takes <span className="text-white font-bold">24-48 Business Hours</span>.
                 </li>
              </ul>
           </Card>

           <div className="p-8 bg-primary-light rounded-[2.5rem] border border-primary/5 text-center space-y-2">
              <Clock className="h-8 w-8 text-primary mx-auto" />
              <p className="text-sm font-bold text-heading">Need help?</p>
              <p className="text-xs text-muted px-4">Contact our support team if your payment is delayed beyond 3 days.</p>
           </div>
        </div>
      </div>

      {/* History Section */}
      <section className="space-y-6">
         <h3 className="text-xl font-bold text-heading px-2 leading-none uppercase tracking-widest text-[10px]">Transaction History</h3>
         <Card className="rounded-[2rem] overflow-hidden border-card-border shadow-sm">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-background border-b border-card-border">
                        <th className="px-6 py-4 text-xs font-black text-muted uppercase tracking-widest">Amount</th>
                        <th className="px-6 py-4 text-xs font-black text-muted uppercase tracking-widest">Transfer Method</th>
                        <th className="px-6 py-4 text-xs font-black text-muted uppercase tracking-widest">Date</th>
                        <th className="px-6 py-4 text-xs font-black text-muted uppercase tracking-widest text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/50">
                     {data?.recentTransactions.filter(t => t.type === 'WITHDRAWAL').length === 0 ? (
                       <tr>
                         <td colSpan={4} className="px-6 py-10 text-center text-muted font-bold">No withdrawal history found.</td>
                       </tr>
                     ) : (
                       data?.recentTransactions.filter(t => t.type === 'WITHDRAWAL').map((h: any) => (
                          <tr key={h.id} className="hover:bg-background/50 transition-colors">
                             <td className="px-6 py-5 font-black text-heading">₹{h.amount}</td>
                             <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                   <ArrowUpRight className="h-4 w-4 text-primary" />
                                   <span className="text-sm text-heading">{h.method || 'UPI Transfer'}</span>
                                </div>
                             </td>
                             <td className="px-6 py-5 text-sm text-muted font-medium">
                               {new Date(h.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                             </td>
                             <td className="px-6 py-5 text-right">
                                <span className={cn(
                                   "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                                   h.status === 'COMPLETED' || h.status === 'APPROVED' ? "bg-money-light text-money" : 
                                   h.status === 'PENDING' ? "bg-star/20 text-star/80" : "bg-red-50 text-red-600"
                                )}>
                                   {h.status}
                                </span>
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
