'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Loader } from '@/components/ui/Loader';
import { Mail, Shield, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function DesignSystemPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto py-20 px-4 max-w-5xl space-y-20">
      <section className="space-y-4">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight">RewardSphere Design System</h1>
        <p className="text-xl text-gray-500 max-w-2xl">
          A collection of reusable UI components and patterns designed to build high-performance, premium cashback experiences.
        </p>
      </section>

      {/* 1. Buttons */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-indigo-600 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Interactive Components</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <Card>
              <CardHeader><CardTitle>Button Variants</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Success State</Button>
                <Button variant="outline">Secondary</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger</Button>
              </CardContent>
           </Card>

           <Card>
              <CardHeader><CardTitle>Button States & Sizes</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium Base</Button>
                <Button size="lg">Large Hero</Button>
                <Button isLoading>Processing</Button>
                <Button leftIcon={<Mail className="h-4 w-4" />}>With Icon</Button>
              </CardContent>
           </Card>
        </div>
      </section>

      {/* 2. Inputs */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-indigo-600 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Forms & Inputs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Input label="Default Input" placeholder="Type something..." />
            <Input label="With Helper Text" helperText="Minimal 8 characters required." placeholder="Password" type="password" />
            <Input label="Error State" error="Invalid email address format" defaultValue="wrong-email" />
          </div>
          <Card className="bg-gray-50 border-none shadow-none flex items-center justify-center p-8">
             <div className="text-center group cursor-pointer">
                <div className="h-20 w-20 rounded-full bg-white shadow-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                   <Shield className="h-10 w-10 text-indigo-600" />
                </div>
                <h4 className="font-bold">Encrypted & Secure</h4>
                <p className="text-xs text-gray-400 mt-1">All inputs are sanitized server-side.</p>
             </div>
          </Card>
        </div>
      </section>

      {/* 3. Feedback & Overlays */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-indigo-600 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Feedback & Overlays</h2>
        </div>

        <div className="flex flex-wrap gap-12">
          <div className="space-y-4 text-center">
            <Loader size="lg" />
            <p className="text-sm font-medium text-gray-500 italic lowercase tracking-widest">Loading State</p>
          </div>

          <div className="flex-1 space-y-4">
            <Card>
              <CardHeader><CardTitle>Dialog System</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-6">Modals are animated using Framer Motion for a fluid experience.</p>
                <Button onClick={() => setIsModalOpen(true)}>Launch Demo Modal</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Terms of Service"
      >
        <div className="space-y-4">
          <div className="flex gap-3 items-start p-4 bg-indigo-50 rounded-2xl">
            <Info className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-sm text-indigo-900 font-medium leading-relaxed">
              By using RewardSphere, you agree to our automated tracking policy for cashback distribution.
            </p>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Placeholder for extensive legal text. Our components auto-handle scrolling and focus traps to ensure high accessibility.
          </p>
          <Button className="w-full mt-4" onClick={() => setIsModalOpen(false)}>I Understand</Button>
        </div>
      </Modal>

      {/* 4. Guidelines */}
      <section className="pt-20 border-t border-gray-100">
         <h2 className="text-3xl font-black mb-8">Styling Guidelines</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-3">
               <h4 className="font-bold flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Scalability</h4>
               <p className="text-gray-500">Use standard Tailwind utility classes. Avoid hardcoded hex codes.</p>
            </div>
            <div className="space-y-3">
               <h4 className="font-bold flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Reusability</h4>
               <p className="text-gray-500">Components are stateless primitives. Lift state up to features.</p>
            </div>
            <div className="space-y-3">
               <h4 className="font-bold flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Performance</h4>
               <p className="text-gray-500">Leverage 'use client' selectively. Use lucide-react for icons.</p>
            </div>
         </div>
      </section>
    </div>
  );
}
