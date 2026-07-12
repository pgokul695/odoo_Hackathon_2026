'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/components/store/api';

export default function LoginPage() {
  const [email, setEmail] = useState('keerthana.v@assetflow.ai');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.post('/auth/login/', { email, password });
      
      if (response.data?.requires_2fa) {
        // Assume you will build or redirect to 2FA page later
        router.push(`/login/verify?email=${encodeURIComponent(email)}`);
      } else if (response.data?.token) {
        localStorage.setItem('assetflow_jwt', response.data.token);
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="glass-panel rounded-2xl p-8 shadow-lg border border-border/80 flex flex-col space-y-6 relative overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
        
        {/* Brand Header */}
        <div className="text-center space-y-1">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 shadow-glow mb-2">
            <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-xl font-black text-foreground tracking-tight">Welcome to AssetFlow</h2>
          <p className="text-xs text-muted-foreground">Digital Asset Intelligence Command Center</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-lg text-center font-medium">
            {error}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Email address</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 bg-card/65 border border-border/80 rounded-lg text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Password</label>
              <a href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot?</a>
            </div>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 bg-card/65 border border-border/80 rounded-lg text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all shadow-sm flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Sign In to System</span>
            )}
          </button>
        </form>

        {/* Signup Redirect */}
        <div className="text-center text-xs text-muted-foreground pt-2">
          New deployment?{' '}
          <Link href="/signup" className="text-primary font-bold hover:underline">
            Register administrator
          </Link>
        </div>
      </div>
    </div>
  );
}
