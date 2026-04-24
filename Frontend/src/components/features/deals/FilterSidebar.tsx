import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Filter, ChevronRight } from 'lucide-react';

const CATEGORIES = ['Electronics', 'Fashion', 'Health & Beauty', 'Travel', 'Food', 'Home Decor'];
const STORES = ['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Samsung', 'Mamaearth'];

export const FilterSidebar = () => {
  return (
    <aside className="space-y-6 w-full lg:w-64 shrink-0">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Filter className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Filter Offers</span>
      </div>

      <Card className="border-none shadow-none bg-gray-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button key={cat} className="w-full text-left px-2 py-2 rounded-lg text-sm text-gray-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all flex items-center justify-between group">
              {cat}
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="border-none shadow-none bg-gray-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Top Stores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {STORES.map((store) => (
            <div key={store} className="flex items-center gap-3 px-2 py-2 cursor-pointer group">
              <div className="h-4 w-4 rounded border border-gray-300 group-hover:border-indigo-600 transition-colors" />
              <span className="text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">{store}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="pt-4 border-t border-gray-100">
         <button className="text-xs font-bold text-indigo-600 hover:underline">Reset All Filters</button>
      </div>
    </aside>
  );
};
