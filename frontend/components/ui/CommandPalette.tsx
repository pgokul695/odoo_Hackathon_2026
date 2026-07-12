'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusCircle, 
  LinkIcon, 
  ArrowLeftRight, 
  Calendar, 
  Wrench, 
  ClipboardCheck, 
  Users, 
  BarChart3,
  Search,
  CornerDownLeft
} from 'lucide-react';

interface CommandItem {
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  group: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = [
    { name: 'Register new asset', description: 'Add a new physical or digital resource to catalog', icon: PlusCircle, href: '/assets/register', group: 'Assets' },
    { name: 'Allocate an asset', description: 'Assign an available asset to an employee', icon: LinkIcon, href: '/allocations', group: 'Operations' },
    { name: 'Create transfer', description: 'Move an asset from one department to another', icon: ArrowLeftRight, href: '/transfers', group: 'Operations' },
    { name: 'Book an asset', description: 'Reserve a shared resource for a specific time range', icon: Calendar, href: '/bookings', group: 'Operations' },
    { name: 'Raise maintenance request', description: 'Report an issue or schedule a technician check', icon: Wrench, href: '/maintenance', group: 'Operations' },
    { name: 'Start audit', description: 'Scan QR codes to inspect current inventory status', icon: ClipboardCheck, href: '/audits', group: 'Governance' },
    { name: 'Search employee', description: 'View staff directories and active equipment lists', icon: Users, href: '/employees', group: 'Organization' },
    { name: 'Open reports', description: 'Review asset utilization, depreciation, and audits', icon: BarChart3, href: '/reports', group: 'Insights' }
  ];

  // Listen to shortcuts and events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleOpenTrigger = () => {
      setOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleOpenTrigger);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenTrigger);
    };
  }, []);

  // Filter commands
  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase()) ||
    cmd.group.toLowerCase().includes(search.toLowerCase())
  );

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        triggerCommand(filteredCommands[selectedIndex].href);
      }
    }
  };

  const triggerCommand = (href: string) => {
    setOpen(false);
    setSearch('');
    router.push(href);
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={() => setOpen(false)}
    >
      <div 
        className="w-full max-w-xl bg-card border border-border rounded-xl shadow-glow overflow-hidden flex flex-col max-h-[50vh] animate-float"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-border space-x-3 bg-muted/20">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            placeholder="What do you want to do?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 rounded border border-border bg-card">ESC</span>
        </div>

        {/* Command list */}
        <div 
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 divide-y divide-border/40"
        >
          {filteredCommands.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground">
              No actions found for &quot;{search}&quot;
            </div>
          ) : (
            // Group actions
            Object.entries(
              filteredCommands.reduce((groups, item) => {
                const group = item.group;
                if (!groups[group]) groups[group] = [];
                groups[group].push(item);
                return groups;
              }, {} as Record<string, CommandItem[]>)
            ).map(([groupName, items]) => (
              <div key={groupName} className="py-2 first:pt-0 last:pb-0">
                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 py-1">
                  {groupName}
                </h4>
                <div className="space-y-0.5 mt-1">
                  {items.map((cmd) => {
                    const globalIndex = filteredCommands.indexOf(cmd);
                    const isSelected = globalIndex === selectedIndex;
                    const Icon = cmd.icon;

                    return (
                      <button
                        key={cmd.name}
                        onClick={() => triggerCommand(cmd.href)}
                        onMouseMove={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                          isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted/40 text-foreground'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-md ${
                            isSelected ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">{cmd.name}</p>
                            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">{cmd.description}</p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="flex items-center text-[10px] text-primary/70 animate-pulse">
                            <span className="mr-1">Trigger</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
