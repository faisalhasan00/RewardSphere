import React from 'react';
import { UserPlus, MousePointerClick, Wallet } from 'lucide-react';

const STEPS = [
  {
    icon: UserPlus,
    title: 'Join for Free',
    description: 'Create your account in seconds. It is 100% free and always will be.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: MousePointerClick,
    title: 'Shop via Us',
    description: 'Click on your favorite store and shop like you normally do.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Wallet,
    title: 'Get Real Cash',
    description: 'Once your purchase is confirmed, we send real money to your bank.',
    color: 'bg-amber-50 text-amber-600',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">How it Works?</h2>
          <p className="text-gray-500">Earning cashback on your online shopping is easier than you think.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Lines for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-200 -z-10 -translate-y-12" />

          {STEPS.map((step, index) => (
            <div key={index} className="text-center space-y-6">
              <div className={`h-20 w-20 rounded-3xl ${step.color} flex items-center justify-center mx-auto shadow-sm transform transition hover:scale-110 duration-300`}>
                <step.icon className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
