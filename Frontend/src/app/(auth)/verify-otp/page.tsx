import React, { Suspense } from 'react';
import { VerifyOTPForm } from '@/components/features/auth/VerifyOTPForm';
import { Loader } from '@/components/ui/Loader';

export default function VerifyOTPPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<Loader />}>
        <VerifyOTPForm />
      </Suspense>
    </div>
  );
}
