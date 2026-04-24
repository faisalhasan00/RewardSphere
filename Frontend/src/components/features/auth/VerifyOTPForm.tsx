'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/services/api';
import { ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

export const VerifyOTPForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone');

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiClient.post('/auth/verify-otp', { phone, otp });
      router.push('/dashboard?verified=true');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      await apiClient.post('/auth/request-otp', { phone });
      setTimer(60);
    } catch (err: any) {
      setError('Wait before requesting a new OTP.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="h-16 w-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-6">
           <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Verify Phone</h1>
        <p className="text-gray-500 text-sm italic">
          We've sent a 6-digit code to <span className="font-bold text-gray-900">+{phone}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Verification Code" 
          placeholder="000000" 
          maxLength={6}
          required 
          className="text-center text-2xl tracking-[0.5em] font-black h-16"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}

        <Button 
          type="submit" 
          className="w-full h-14" 
          isLoading={loading}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Verify & Continue
        </Button>
      </form>

      <div className="text-center">
        {timer > 0 ? (
          <p className="text-xs text-gray-400 font-medium">Resend code in <span className="text-indigo-600">{timer}s</span></p>
        ) : (
          <button 
            onClick={handleResend}
            disabled={resending}
            className="text-xs font-black text-indigo-600 hover:underline flex items-center justify-center gap-2 mx-auto"
          >
            {resending ? <RefreshCw className="h-3 w-3 animate-spin" /> : null}
            Resend OTP Code
          </button>
        )}
      </div>
    </div>
  );
};
