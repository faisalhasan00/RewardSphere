'use client';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  MousePointerClick, 
  TrendingUp, 
  IndianRupee, 
  Check, 
  X, 
  MoreHorizontal,
  ChevronRight,
  Activity
} from 'lucide-react';
import { cn } from '@/utils/cn';

const STATS = [
  { label: 'Total Members', value: '1,248', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Platform Clicks', value: '45.2K', icon: MousePointerClick, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Total Conversions', value: '8,420', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Platform Revenue', value: '₹4.8L', icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const PENDING_WITHDRAWALS = [
  { id: '1', user: 'Faisal Said', amount: '₹1,500.00', method: 'UPI (faisal@ok...)', date: '5m ago' },
  { id: '2', user: 'Rahul Kumar', amount: '₹420.00', method: 'Bank (HDFC 4212)', date: '12m ago' },
  { id: '3', user: 'Sneha Gupta', amount: '₹125.50', method: 'UPI (sneha@ybl)', date: '1h ago' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Analytics</h1>
           <p className="text-gray-500 font-medium italic">Overview of platform health and financial velocity.</p>
        </div>
        <Button className="rounded-2xl h-14 bg-gray-900">Download Reports</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2.5rem]">
            <CardContent className="p-8">
               <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                     <stat.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">+12%</span>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
               <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Withdrawal Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-gray-900">Withdrawal Approval Queue</h2>
            <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">View All Requests</button>
          </div>
          <Card className="rounded-[2.5rem] overflow-hidden border-none shadow-sm">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">User & Date</th>
                      <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                      <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Method</th>
                      <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {PENDING_WITHDRAWALS.map((w) => (
                      <tr key={w.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-8 py-6">
                           <div className="flex flex-col">
                              <span className="font-bold text-gray-900">{w.user}</span>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">{w.date}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className="font-black text-gray-900">{w.amount}</span>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-sm text-gray-500 font-medium">{w.method}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                 <Check className="h-4 w-4" />
                              </button>
                              <button className="h-10 w-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                 <X className="h-4 w-4" />
                              </button>
                              <button className="h-10 w-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all">
                                 <MoreHorizontal className="h-4 w-4" />
                              </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </Card>
        </div>

        {/* Analytics Placeholder */}
        <div className="space-y-6">
           <h2 className="text-xl font-bold text-gray-900 px-2">Trend Analysis</h2>
           <Card className="rounded-[2.5rem] h-[500px] border-dashed border-2 border-gray-200 bg-transparent flex flex-col items-center justify-center text-center p-10 space-y-4">
              <TrendingUp size={64} className="text-gray-200" />
              <div>
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Revenue vs Clicks Chart</p>
                 <p className="text-[10px] text-gray-400 italic">Data processed via Redis Cache • Last updated just now</p>
              </div>
           </Card>
        </div>

      </div>
    </div>
  );
}
