'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  History, 
  Wallet, 
  ArrowUpRight, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/useAuthStore';

const MENU_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Cashback History', icon: History, href: '/dashboard/cashback' },
  { label: 'My Wallet', icon: Wallet, href: '/dashboard/wallet' },
  { label: 'Withdraw', icon: ArrowUpRight, href: '/dashboard/withdraw' },
  { label: 'Refer & Earn', icon: Users, href: '/dashboard/referral' },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const logout = useAuthStore(state => state.logout);

  return (
    <aside className="w-64 bg-white border-r border-card-border flex flex-col h-full sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link href="/">
           <img src="/Logo/Logo.png" alt="RewardSphere" className="h-8 w-auto object-contain" />
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-1">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-3 py-3 rounded-xl text-sm font-bold transition-all",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-muted hover:bg-primary-light hover:text-primary"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-muted group-hover:text-primary")} />
                {item.label}
              </div>
              <ChevronRight className={cn("h-4 w-4 opacity-0 transition-opacity", isActive ? "opacity-40" : "group-hover:opacity-40")} />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-card-border">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout Session
        </button>
      </div>
    </aside>
  );
};
