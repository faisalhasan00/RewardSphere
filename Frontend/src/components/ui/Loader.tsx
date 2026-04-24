import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className, fullScreen }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <Loader2 className={cn("animate-spin text-indigo-600", sizes[size], className)} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={cn("animate-spin text-indigo-600", sizes[size], className)} />
    </div>
  );
};
