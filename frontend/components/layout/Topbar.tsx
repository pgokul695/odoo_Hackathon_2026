'use client';

import { Bell, Search, Sun, Moon, Laptop, Menu } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import { useAssetStore } from '../store/AssetStore';
import Link from 'next/link';

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { theme, setTheme } = useTheme();
  const { notifications } = useAssetStore();

  const unreadCount = notifications.filter(n => !n.read).length;

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const handleSearchClick = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <header className="h-16 bg-card/45 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 transition-all duration-300">
      {/* Search Bar / Mobile Menu trigger */}
      <div className="flex items-center space-x-3 flex-1 max-w-md">
        <button
          onClick={onMenuClick}
          className="md:hidden text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search box */}
        <button
          onClick={handleSearchClick}
          className="hidden sm:flex items-center space-x-2 w-full text-left px-3 py-1.5 rounded-lg bg-muted/40 hover:bg-muted/75 border border-border/60 hover:border-border text-muted-foreground text-xs transition-all duration-200"
        >
          <Search className="w-3.5 h-3.5 text-muted-foreground/80" />
          <span className="flex-1">Search assets, employees or commands...</span>
          <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-card px-1.5 font-mono text-[9px] font-medium text-muted-foreground opacity-100">
            <span className="text-[10px]">Ctrl</span>K
          </kbd>
        </button>
      </div>

      {/* Action panel */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Mobile Search Button */}
        <button
          onClick={handleSearchClick}
          className="sm:hidden text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={cycleTheme}
          className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted/50 transition-colors relative group"
          aria-label="Toggle theme"
        >
          {theme === 'dark' && <Moon className="w-4 h-4" />}
          {theme === 'light' && <Sun className="w-4 h-4" />}
          {theme === 'system' && <Laptop className="w-4 h-4" />}
          
          <span className="absolute top-full mt-2 right-0 bg-popover text-popover-foreground text-[10px] px-2 py-0.5 rounded border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </span>
        </button>

        {/* Notifications Icon with Pulse Badge */}
        <Link href="/notifications" className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          )}
        </Link>

        {/* User Profile Block */}
        <Link href="/settings" className="flex items-center space-x-2 pl-3 border-l border-border hover:opacity-85 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary shadow-glow">
            KV
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground leading-none">Keerthana</span>
            <span className="text-[9px] text-muted-foreground mt-0.5 leading-none">Asset Manager</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
