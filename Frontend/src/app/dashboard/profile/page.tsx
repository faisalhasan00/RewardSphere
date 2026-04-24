'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Lock, Shield, Mail, Smartphone, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function ProfilePage() {
  const user = useAuthStore(state => state.user);
  const [profileLoading, setProfileLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Account Settings</h1>
        <p className="text-gray-500 text-sm italic">Manage your profile identity and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Profile Info Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2.5rem] p-8 border-none shadow-xl shadow-gray-200/50">
            <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <User size={20} />
                 </div>
                 <CardTitle className="text-xl">Profile Information</CardTitle>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl font-bold">Edit Profile</Button>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Full Name" 
                  defaultValue={user?.name || ''} 
                  placeholder="Your Name" 
                  leftIcon={<User className="h-4 w-4" />}
                />
                <Input 
                  label="Email Address" 
                  defaultValue={user?.email || ''} 
                  readOnly 
                  className="bg-gray-50 text-gray-400 cursor-not-allowed"
                  leftIcon={<Mail className="h-4 w-4" />}
                />
                <Input 
                  label="Phone Number" 
                  defaultValue={user?.phone || ''} 
                  placeholder="9988776655" 
                  leftIcon={<Smartphone className="h-4 w-4" />}
                />
              </div>
              <div className="pt-4 flex justify-end">
                 <Button isLoading={profileLoading} className="px-10 rounded-2xl h-14">Update Identity</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] p-8 border-none shadow-xl shadow-gray-200/50">
            <CardHeader className="p-0 mb-8">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Lock size={20} />
                 </div>
                 <CardTitle className="text-xl">Update Password</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              <div className="space-y-4">
                 <Input label="Current Password" type="password" placeholder="••••••••" />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="New Password" type="password" placeholder="••••••••" />
                    <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                 </div>
              </div>
              <div className="pt-4 flex justify-end">
                 <Button isLoading={passLoading} className="px-10 rounded-2xl h-14 bg-gray-900 hover:bg-black">Secure New Password</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Sidebar */}
        <div className="space-y-6">
           <Card className="rounded-[2.5rem] border-none bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Shield size={120} />
              </div>
              <CardContent className="p-10 space-y-6">
                 <p className="text-xs font-black uppercase tracking-widest text-indigo-200">Account Status</p>
                 <div className="flex items-center gap-4">
                    <h2 className="text-4xl font-black">Active</h2>
                    <div className="h-4 w-4 rounded-full bg-emerald-400 animate-pulse border-4 border-emerald-400/30" />
                 </div>
                 <div className="space-y-3 pt-4 border-t border-indigo-500/50">
                    <p className="flex items-center gap-2 text-xs font-bold text-indigo-100">
                       <CheckCircle2 size={14} className="text-white" /> Email Verified
                    </p>
                    <p className="flex items-center gap-2 text-xs font-bold text-indigo-100">
                       <CheckCircle2 size={14} className="text-white" /> Phone Verified
                    </p>
                    <p className="flex items-center gap-2 text-xs font-bold text-indigo-100 opacity-40">
                       <Shield size={14} /> 2FA Disabled
                    </p>
                 </div>
              </CardContent>
           </Card>

           <Card className="rounded-[2.5rem] p-8 border-dashed border-2 border-gray-200 bg-transparent">
              <CardContent className="p-0 space-y-4">
                 <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Active Sessions</h4>
                 <p className="text-xs text-gray-500 leading-relaxed italic">
                    Logged in via Windows PC (Google Chrome) - New Delhi, India. 
                 </p>
                 <Button variant="ghost" className="w-full text-red-500 hover:bg-red-50 rounded-2xl text-xs font-bold group">
                    <LogOut className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Logout all other devices
                 </Button>
              </CardContent>
           </Card>
        </div>

      </div>
    </div>
  );
}
