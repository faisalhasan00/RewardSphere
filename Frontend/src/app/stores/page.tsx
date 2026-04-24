'use client';
import React, { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await apiClient.get('/stores');
        setStores(response.data.data);
      } catch (error) {
        console.error('Failed to fetch stores', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter((s: any) => 
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-indigo-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl font-black tracking-tight">Browse All Stores</h1>
          <p className="text-indigo-100 max-w-xl mx-auto">Discover 500+ top brands and earn extra cashback on every order.</p>
          
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-indigo-600" />
            <input 
              type="text" 
              placeholder="Search for Amazon, Flipkart, etc..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-16 w-full pl-14 pr-6 rounded-2xl bg-white text-gray-900 font-bold border-none shadow-2xl focus:ring-4 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="py-20"><Loader size="xl" /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredStores.map((store: any) => (
              <Card key={store.id} className="group hover:shadow-xl transition-all border-gray-50 rounded-3xl overflow-hidden text-center p-6">
                <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                   <ShoppingBag className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{store.name}</h3>
                <p className="text-[10px] uppercase font-black text-emerald-600 tracking-widest mb-4">
                  {store.baseRate || 'Up to 10%'} Cashback
                </p>
                <Link href={`/deals?store=${store.id}`}>
                  <Button variant="ghost" size="sm" className="w-full text-indigo-600 hover:bg-indigo-50 rounded-xl">
                    View Deals
                  </Button>
                </Link>
              </Card>
            ))}

            {filteredStores.length === 0 && (
              <div className="col-span-full py-20 text-center space-y-4">
                <p className="text-gray-400 font-bold tracking-widest uppercase">No stores found matching "{search}"</p>
                <Button variant="outline" onClick={() => setSearch('')}>Clear Search</Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
