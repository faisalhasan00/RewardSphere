'use client';
import React, { useState, useEffect } from 'react';
import { FilterSidebar } from '@/components/features/deals/FilterSidebar';
import { DealCard } from '@/components/features/deals/DealCard';
import { Button } from '@/components/ui/Button';
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown, RefreshCw } from 'lucide-react';
import { apiClient } from '@/services/api';
import { Loader } from '@/components/ui/Loader';

export default function DealsPage() {
  const [sortBy, setSortBy] = useState('trending');
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/deals', {
          params: { sort: sortBy }
        });
        setDeals(response.data.data.deals || response.data.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch deals');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [sortBy]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="bg-gray-50 border-b border-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Trending Deals & Offers</h1>
          <p className="text-gray-500 max-w-xl">Browse hundreds of active deals and earn real money on every click.</p>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <FilterSidebar />

          {/* Grid Area */}
          <div className="flex-grow space-y-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="hidden sm:flex text-indigo-600 bg-indigo-50">
                  <LayoutGrid className="h-4 w-4 mr-2" /> Grid
                </Button>
                <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-400">
                  <List className="h-4 w-4 mr-2" /> List
                </Button>
                <span className="text-sm text-gray-400 font-medium ml-2">Showing 1-12 of 152 Deals</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative group">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 pl-4 pr-10 rounded-xl bg-gray-50 border-none text-sm font-bold text-gray-600 appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="trending">Trending First</option>
                    <option value="cashback_high">Highest Cashback</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                  <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <Button variant="outline" size="icon" className="lg:hidden">
                   <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="min-h-[400px] flex items-center justify-center w-full col-span-full">
                <Loader size="xl" />
              </div>
            ) : error ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center w-full col-span-full text-center space-y-4">
                 <div className="h-16 w-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
                    <RefreshCw className="h-8 w-8" />
                 </div>
                 <p className="text-gray-500 font-bold">{error}</p>
                 <Button variant="outline" onClick={() => window.location.reload()}>Retry Search</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {deals.map((deal: any) => (
                  <DealCard 
                    key={deal.id}
                    id={deal.id}
                    storeName={deal.store?.name || 'Store'}
                    logo={deal.store?.logo || deal.store?.name?.[0] || 'D'}
                    cashbackRate={deal.cashbackRate || 'Up to 10%'}
                    description={deal.title || deal.description}
                  />
                ))}
              </div>
            )}

            {/* Pagination Placeholder */}
            <div className="pt-12 text-center">
               <Button variant="outline" className="px-12 h-14 rounded-2xl font-bold">Show More Deals</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
