'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { Loader } from '@/components/ui/Loader';
import { ShieldAlert } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Simple UI level role check
    if (!token || user?.role !== 'ADMIN') {
      // router.push('/login'); // Commented for UI demo purposes
    }
  }, [user, token, router]);

  // if (!user || user.role !== 'ADMIN') return <Loader fullScreen />;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-grow min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
           <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">System Gateway • Online</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-600">Administrator: <span className="text-indigo-600 font-black">{user?.name || 'Root Admin'}</span></span>
              <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">A</div>
           </div>
        </header>
        <main className="flex-grow overflow-y-auto p-10">
           <div className="max-w-7xl mx-auto">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
}
