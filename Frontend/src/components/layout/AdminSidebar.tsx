'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  Settings, 
  LogOut,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/store/useAuthStore';

const ADMIN_MENU = [
  { label: 'Analytics', icon: BarChart3, href: '/admin' },
  { label: 'Manage Users', icon: Users, href: '/admin/users' },
  { label: 'Manage Stores', icon: ShoppingBag, href: '/admin/stores' },
  { label: 'Withdrawals', icon: CreditCard, href: '/admin/withdrawals' },
  { label: 'Platform Settings', icon: Settings, href: '/admin/settings' },
];

export const AdminSidebar = () => {
  const pathname = usePathname();
  const logout = useAuthStore(state => state.logout);

  return (
    <aside className="w-68 bg-gray-950 text-white flex flex-col h-full sticky top-0 overflow-y-auto border-r border-gray-800">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-4">
           <ShieldAlert className="h-5 w-5 text-indigo-500" />
           <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Master Control</span>
        </div>
        <Link href="/">
           <img src="/Logo/Logo.png" alt="RewardSphere Admin" className="h-8 w-auto object-contain brightness-125" />
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-1 pt-4">
        {ADMIN_MENU.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-bold transition-all",
                isActive 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-400")} />
                {item.label}
              </div>
              <ChevronRight className={cn("h-4 w-4 opacity-0", isActive ? "opacity-40" : "group-hover:opacity-40")} />
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto border-t border-gray-800">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Exit Admin Panel
        </button>
      </div>
    </aside>
  );
};
