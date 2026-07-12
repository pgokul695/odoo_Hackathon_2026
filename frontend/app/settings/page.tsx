'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { useTheme } from '@/components/theme/ThemeContext';
import { useAssetStore } from '@/components/store/AssetStore';
import { 
  User, 
  Lock, 
  Palette, 
  Sun, 
  Moon, 
  Laptop, 
  Save, 
  Check 
} from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { addNotification, currentUser } = useAssetStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'appearance'>('profile');
  
  // Profile state
  const [username, setUsername] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const role = currentUser?.role || 'Asset Manager';
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    addNotification('System', 'User profile settings updated successfully.');
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        description="Configure your user profile, security tokens, and appearance variables."
      />

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Side: Navigation Links */}
        <div className="md:w-64 glass-panel p-4 rounded-xl border border-border/80 shadow-sm space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
              activeTab === 'profile'
                ? 'bg-primary/10 text-primary font-bold'
                : 'hover:bg-muted/45 text-muted-foreground hover:text-foreground'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile settings</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
              activeTab === 'security'
                ? 'bg-primary/10 text-primary font-bold'
                : 'hover:bg-muted/45 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security coords</span>
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
              activeTab === 'appearance'
                ? 'bg-primary/10 text-primary font-bold'
                : 'hover:bg-muted/45 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Appearance theme</span>
          </button>
        </div>

        {/* Right Side: Tab panel contents */}
        <div className="flex-1 glass-panel p-5 rounded-xl border border-border/80 shadow-sm min-h-[300px]">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="space-y-4">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest pb-1.5 border-b border-border/40">Profile settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Full name</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Role / Designation</label>
                  <input
                    disabled
                    type="text"
                    value={role}
                    className="block w-full px-3 py-2 bg-muted border border-border/80 rounded-lg text-xs text-muted-foreground focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all shadow-sm flex items-center gap-1.5"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                {savedSuccess ? 'Settings Saved' : 'Save Details'}
              </button>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest pb-1.5 border-b border-border/40">Security coordinates</h3>
              <div className="space-y-4 max-w-sm">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">New Password</label>
                  <input
                    type="password"
                    className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  onClick={() => alert('Password updated in sandbox context!')}
                  className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all shadow-sm"
                >
                  Update Credentials
                </button>
              </div>
            </div>
          )}

          {/* Appearance Theme Selector */}
          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest pb-1.5 border-b border-border/40">Visual Theme settings</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Light mode select card */}
                <div
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
                    theme === 'light'
                      ? 'border-primary bg-primary/5 shadow-glow scale-[1.02]'
                      : 'border-border hover:border-primary/50 bg-card/40'
                  }`}
                >
                  <Sun className={`w-6 h-6 ${theme === 'light' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-xs font-bold text-foreground">Light Theme</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Premium Workspace</p>
                  </div>
                </div>

                {/* Dark mode select card */}
                <div
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
                    theme === 'dark'
                      ? 'border-primary bg-primary/5 shadow-glow scale-[1.02]'
                      : 'border-border hover:border-primary/50 bg-card/40'
                  }`}
                >
                  <Moon className={`w-6 h-6 ${theme === 'dark' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-xs font-bold text-foreground">Dark Theme</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Midnight Intelligence</p>
                  </div>
                </div>

                {/* System mode select card */}
                <div
                  onClick={() => setTheme('system')}
                  className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
                    theme === 'system'
                      ? 'border-primary bg-primary/5 shadow-glow scale-[1.02]'
                      : 'border-border hover:border-primary/50 bg-card/40'
                  }`}
                >
                  <Laptop className={`w-6 h-6 ${theme === 'system' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="text-xs font-bold text-foreground">System Default</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Adapt automatically</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
