import React from 'react';
import { motion } from 'framer-motion';

export const BrandedSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-20 w-20">
        {/* Outer Ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Logo Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/Logo/Browser-Favicon.png" alt="Loading..." className="h-8 w-8 object-contain animate-pulse" />
        </div>
      </div>
      <p className="text-sm font-bold text-primary animate-pulse tracking-widest uppercase">RewardSphere</p>
    </div>
  );
};
