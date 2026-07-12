'use client';

import { useAssetStore } from '../store/AssetStore';
import { 
  Boxes, 
  Wrench, 
  Calendar, 
  ClipboardCheck, 
  Laptop,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

export function ActivityBeam() {
  const { notifications } = useAssetStore();

  // Take the first 4 recent activities
  const recentActivities = notifications.slice(0, 4);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Assets':
        return Boxes;
      case 'Maintenance':
        return Wrench;
      case 'Bookings':
        return Calendar;
      case 'Audits':
        return ClipboardCheck;
      default:
        return Laptop;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Assets':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'Maintenance':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'Bookings':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'Audits':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="glass-panel relative rounded-xl p-5 flex flex-col min-h-[300px] border border-border/80 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/50">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Activity Stream
        </h3>
        <Link 
          href="/notifications"
          className="text-[10px] font-bold text-primary hover:underline flex items-center gap-0.5"
        >
          View All
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Vertical Timeline */}
      <div className="relative flex-1 mt-4 pl-3">
        {/* Central connecting beam line */}
        <div className="absolute top-1 bottom-1 left-[19px] w-0.5 bg-gradient-to-b from-primary/30 via-border to-transparent" />

        <div className="space-y-5">
          {recentActivities.map((act, index) => {
            const IconComponent = getIcon(act.category);
            const colorClass = getCategoryColor(act.category);
            const isNewest = index === 0;

            return (
              <div 
                key={act.id} 
                className="relative flex items-start space-x-3 group animate-fade-in"
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Node icon bubble */}
                <div className={`relative flex items-center justify-center w-8 h-8 rounded-lg border z-10 bg-card ${colorClass}`}>
                  <IconComponent className="w-4 h-4" />
                  
                  {/* Pulsing indicator on the first (newest) item */}
                  {isNewest && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                  )}
                </div>

                {/* Event text details */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-xs font-medium text-foreground leading-snug break-words pr-2">
                    {act.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {act.timestamp}
                    </span>
                    <span className="text-[9px] font-semibold text-muted-foreground/70 uppercase tracking-widest">
                      • {act.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
