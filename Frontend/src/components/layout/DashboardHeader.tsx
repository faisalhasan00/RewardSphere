'use client';
import React from 'react';
import { Search, Bell, UserCircle, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const DashboardHeader = () => {
  const user = useAuthStore(state => state.user);

  return (
    <header className="h-20 bg-white border-b border-card-border flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-grow max-w-xl">
        <button className="lg:hidden p-2 -ml-2 text-muted">
          <Menu className="h-6 w-6" />
        </button>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Find stores, deals or transactions..."
            className="h-11 w-full pl-10 pr-4 bg-background border-none rounded-xl text-sm focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-muted hover:text-primary transition-colors">
          <Bell className="h-6 w-6" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-card-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-heading">{user?.name || 'Smart Saver'}</p>
            <p className="text-[10px] uppercase font-bold text-muted tracking-tighter">Member since {new Date().getFullYear()}</p>
          </div>
          <UserCircle className="h-10 w-10 text-card-border" />
        </div>
      </div>
    </header>
  );
};
