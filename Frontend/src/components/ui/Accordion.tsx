'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

const AccordionItem = ({ title, children, isOpen, onToggle }: AccordionItemProps) => {
  return (
    <div className="border border-gray-100 rounded-3xl overflow-hidden bg-white mb-4">
      <button 
        onClick={onToggle}
        className="w-full px-8 py-6 flex items-center justify-between text-left transition-colors hover:bg-gray-50/50"
      >
        <span className="font-bold text-gray-900">{title}</span>
        <ChevronDown className={cn("h-5 w-5 text-gray-400 transition-transform duration-300", isOpen && "rotate-180 text-indigo-600")} />
      </button>
      <div className={cn(
        "px-8 overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="pt-2 text-sm text-gray-500 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Accordion = ({ items }: { items: { title: string; content: React.ReactNode }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem 
          key={index} 
          title={item.title} 
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(prev => prev === index ? null : index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};
