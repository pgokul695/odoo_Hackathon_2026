'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  FolderTree, 
  Boxes, 
  PlusCircle, 
  Link as LinkIcon, 
  ArrowLeftRight, 
  Calendar, 
  Wrench, 
  ClipboardCheck, 
  History, 
  BarChart3, 
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  const navigationGroups = [
    {
      title: 'Command',
      links: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Organization',
      links: [
        { name: 'Departments', href: '/departments', icon: Building2 },
        { name: 'Employees', href: '/employees', icon: Users },
        { name: 'Categories', href: '/categories', icon: FolderTree }
      ]
    },
    {
      title: 'Assets',
      links: [
        { name: 'Asset List', href: '/assets', icon: Boxes },
        { name: 'Register Asset', href: '/assets/register', icon: PlusCircle }
      ]
    },
    {
      title: 'Operations',
      links: [
        { name: 'Allocations', href: '/allocations', icon: LinkIcon },
        { name: 'Transfers', href: '/transfers', icon: ArrowLeftRight },
        { name: 'Bookings', href: '/bookings', icon: Calendar },
        { name: 'Maintenance', href: '/maintenance', icon: Wrench }
      ]
    },
    {
      title: 'Governance',
      links: [
        { name: 'Audits', href: '/audits', icon: ClipboardCheck },
        { name: 'Activity Logs', href: '/activity-logs', icon: History }
      ]
    },
    {
      title: 'Insights',
      links: [
        { name: 'Reports', href: '/reports', icon: BarChart3 }
      ]
    },
    {
      title: 'System',
      links: [
        { name: 'Notifications', href: '/notifications', icon: Bell },
        { name: 'Settings', href: '/settings', icon: Settings }
      ]
    }
  ];

  // Render geometric brand logo
  const BrandLogo = () => (
    <div className="flex items-center space-x-3 select-none">
      <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 shadow-glow">
        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {!collapsed && (
        <div className="flex flex-col tracking-tight animate-fade-in">
          <span className="font-bold text-sm text-foreground leading-none">AssetFlow</span>
          <span className="text-[10px] text-muted-foreground mt-0.5 leading-none">Asset Intelligence</span>
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card/60 backdrop-blur-md border-r border-border transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-border">
        <BrandLogo />
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden text-muted-foreground hover:text-foreground p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav Link List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <h3 className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5 mt-2">
                {group.title}
              </h3>
            )}
            <ul className="space-y-1">
              {group.links.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group relative flex items-center rounded-lg transition-all duration-200 ${
                        collapsed ? 'justify-center p-2.5' : 'px-3 py-2 space-x-3'
                      } ${
                        isActive
                          ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                      }`} />
                      
                      {!collapsed && (
                        <span className="text-xs">{link.name}</span>
                      )}

                      {/* Tooltip for collapsed view */}
                      {collapsed && (
                        <div className="absolute left-full ml-3 px-2 py-1 bg-popover text-popover-foreground text-xs rounded border border-border shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                          {link.name}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer Collapse Button (Desktop Only) */}
      <div className="hidden md:flex items-center justify-end p-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden md:block h-screen flex-shrink-0 transition-all duration-300 z-30 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <aside 
        className={`md:hidden fixed inset-y-0 left-0 w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
