'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Wallet, User } from 'lucide-react';
import { cn } from '@/utils/cn';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Offers', href: '/deals', icon: ShoppingBag },
  { label: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
  { label: 'Account', href: '/dashboard', icon: User },
];

export const MobileFooterNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-card-border h-[60px] z-50 flex items-center justify-around px-2 pb-safe">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.label} 
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full h-full relative transition-colors duration-200",
              isActive ? "text-primary" : "text-muted"
            )}
          >
            {isActive && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
            )}
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
