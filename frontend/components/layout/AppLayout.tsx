'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { FlowFieldBackground } from '../ui/FlowFieldBackground';
import { CommandPalette } from '../ui/CommandPalette';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isAuthRoute = pathname === '/login' || pathname === '/signup';

  if (isAuthRoute) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center font-sans">
        <FlowFieldBackground />
        <main className="w-full max-w-md p-4">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden font-sans relative">
      {/* Flowing Data Background */}
      <FlowFieldBackground />
      
      {/* Global Command Palette */}
      <CommandPalette />

      {/* Collapsible Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main Panel Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Topbar onMenuClick={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-6 pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
