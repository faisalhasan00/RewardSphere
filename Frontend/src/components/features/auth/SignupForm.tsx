'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import { UserPlus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GoogleLoginButton } from './GoogleLoginButton';

export const SignupForm = () => {
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    referralCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/signup', formData);
      const { user, token } = response.data.data;
      
      setAuth(user, token);
      
      // Redirect to verification
      router.push(`/verify-otp?phone=${formData.phone}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 bg-white p-8 rounded-[2rem] border border-card-border shadow-2xl shadow-primary/5">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-6">
           <img src="/Logo/Logo.png" alt="RewardSphere" className="h-10 w-auto object-contain" />
        </div>
        <h1 className="text-3xl font-black text-heading">Create Account</h1>
        <p className="text-muted text-sm">Join RewardSphere and start saving today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Full Name" 
          name="name"
          placeholder="John Doe" 
          required 
          value={formData.name}
          onChange={handleChange}
        />
        <Input 
          label="Email Address" 
          name="email"
          type="email" 
          placeholder="name@example.com" 
          required 
          value={formData.email}
          onChange={handleChange}
        />
        <Input 
          label="Password" 
          name="password"
          type="password" 
          placeholder="••••••••" 
          required 
          value={formData.password}
          onChange={handleChange}
        />
        <Input 
          label="Referral Code (Optional)" 
          name="referralCode"
          placeholder="ABC123" 
          value={formData.referralCode}
          onChange={handleChange}
        />

        {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}

        <Button 
          type="submit" 
          className="w-full" 
          isLoading={loading}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          Create Account
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-card-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted">Or continue with</span>
          </div>
        </div>

        <GoogleLoginButton />
      </form>

      <p className="text-center text-sm text-muted">
        Already have an account?{' '}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};
