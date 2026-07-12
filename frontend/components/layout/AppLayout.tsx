'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { FlowFieldBackground } from '../ui/FlowFieldBackground';
import { CommandPalette } from '../ui/CommandPalette';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isAuthRoute = pathname === '/login' || pathname === '/signup';

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);

    if (!loggedIn && !isAuthRoute) {
      router.push('/login');
    } else if (loggedIn && isAuthRoute) {
      router.push('/dashboard');
    }
  }, [pathname, isAuthRoute, router]);

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

      {/* Fullscreen Loader Overlay when not authenticated or checking */}
      {(isAuthenticated === null || !isAuthenticated) && (
        <div className="absolute inset-0 bg-[#0d0716] z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
              {isAuthenticated === null ? "Checking Authorization..." : "Redirecting..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
