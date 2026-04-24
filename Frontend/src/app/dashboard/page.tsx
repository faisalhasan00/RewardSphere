import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Wallet, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

const STATS = [
  { label: 'Confirmed Balance', value: '₹0.00', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Pending Cashback', value: '₹0.00', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Referral Bonus', value: '₹0.00', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Total Withdrawn', value: '₹0.00', icon: ArrowUpRight, color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here is what is happening with your rewards today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <Card key={i} className="border-none shadow-md shadow-gray-200/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 min-h-[400px] flex items-center justify-center border-dashed border-2 border-gray-200 bg-transparent text-gray-400 font-bold uppercase tracking-widest">
            Recent Transactions Placeholder
         </Card>
         <Card className="min-h-[400px] flex items-center justify-center border-dashed border-2 border-gray-200 bg-transparent text-gray-400 font-bold uppercase tracking-widest text-center px-8">
            Referral Progress Placeholder
         </Card>
      </div>
    </div>
  );
}
