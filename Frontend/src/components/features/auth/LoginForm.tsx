'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import { LogIn, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { GoogleLoginButton } from './GoogleLoginButton';

export const LoginForm = () => {
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await apiClient.post('/auth/login', formData);
      const { user, token } = response.data.data;
      
      setAuth(user, token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password.');
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
        <h1 className="text-3xl font-black text-heading">Welcome Back</h1>
        <p className="text-muted text-sm">Sign in to access your rewards.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="Email Address" 
          name="email"
          type="email" 
          placeholder="name@example.com" 
          required 
          value={formData.email}
          onChange={handleChange}
        />
        <div className="space-y-1">
          <Input 
            label="Password" 
            name="password"
            type="password" 
            placeholder="••••••••" 
            required 
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <Link href="/forgot-password" title="Coming soon!" className="text-xs font-semibold text-primary hover:underline cursor-not-allowed">
              Forgot password?
            </Link>
          </div>
        </div>

        {error && <p className="text-xs font-bold text-red-500 text-center">{error}</p>}

        <Button 
          type="submit" 
          className="w-full" 
          isLoading={loading}
          rightIcon={<LogIn className="h-4 w-4" />}
        >
          Sign In
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
        New to RewardSphere?{' '}
        <Link href="/register" className="text-primary font-bold hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
};
