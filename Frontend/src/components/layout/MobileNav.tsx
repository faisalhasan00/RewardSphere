'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, Wallet, User } from 'lucide-react';
import { cn } from '@/utils/cn';

export const MobileNav = () => {
  const pathname = usePathname();
  
  const NAV_ITEMS = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Offers', icon: Tag, href: '/deals' },
    { name: 'Wallet', icon: Wallet, href: '/dashboard/cashback' },
    { name: 'Account', icon: User, href: '/dashboard/profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-card-border px-4 py-2 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] rounded-t-[24px]">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-all active:scale-95",
                isActive ? "text-[#FF6A00]" : "text-[#888888]"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all",
                isActive ? "bg-[#FF6A00]/10" : "bg-transparent"
              )}>
                <Icon size={24} className={isActive ? "stroke-[2.5]" : "stroke-[2]"} />
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
