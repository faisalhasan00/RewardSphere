'use client';
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { apiClient } from '@/services/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export const GoogleLoginButton = () => {
  const router = useRouter();
  const setAuth = useAuthStore(state => state.setAuth);
  const [error, setError] = useState('');
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-[10px] text-amber-600 font-bold uppercase tracking-widest text-center">
        Social login unavailable: <br/> missing google_client_id
      </div>
    );
  }

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const response = await apiClient.post('/auth/google', { 
        idToken: credentialResponse.credential 
      });
      
      const { user, accessToken } = response.data.data;
      setAuth(user, accessToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Google authentication failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => setError('Google Login Failed')}
        useOneTap
        theme="outline"
        shape="pill"
        width="100%"
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};
