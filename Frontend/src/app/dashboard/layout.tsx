import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Hidden on mobile, fixed on desktop */}
      <div className="hidden lg:flex shrink-0">
        <DashboardSidebar />
      </div>

      <div className="flex flex-col flex-grow min-w-0">
        <DashboardHeader />

        {/* Main Content Area */}
        <main className="flex-grow overflow-y-auto p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
