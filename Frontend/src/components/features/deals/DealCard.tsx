'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Percent } from 'lucide-react';
import { Button } from '../../ui/Button';

interface DealCardProps {
  id: string;
  storeName: string;
  logo: string;
  cashbackRate: string;
  description: string;
  onSelect?: () => void;
}

export const DealCard: React.FC<DealCardProps> = ({ storeName, logo, cashbackRate, description, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl border border-card-border bg-white p-5 shadow-sm transition-all hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <div className="h-16 w-16 overflow-hidden rounded-xl border border-background flex items-center justify-center bg-white p-2">
           {/* Fallback pattern for logo */}
           <div className="font-bold text-primary text-xl">{storeName[0]}</div>
        </div>
        <div className="rounded-full bg-money-light px-3 py-1 text-xs font-bold text-money flex items-center">
          <Percent className="mr-1 h-3 w-3" />
          {cashbackRate} Cashback
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-heading group-hover:text-primary">{storeName}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{description}</p>
      </div>

      <div className="mt-6">
        <Button 
          variant="outline" 
          className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary"
          rightIcon={<ExternalLink className="h-4 w-4" />}
          onClick={onSelect}
        >
          Grab Deal
        </Button>
      </div>
    </motion.div>
  );
};
