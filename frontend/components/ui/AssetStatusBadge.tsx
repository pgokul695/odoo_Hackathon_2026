'use client';

import { AssetStatus } from '@/types/api';

interface AssetStatusBadgeProps {
  status: AssetStatus;
}

export function AssetStatusBadge({ status }: AssetStatusBadgeProps) {
  const getColors = (stat: AssetStatus) => {
    switch (stat) {
      case 'AVAILABLE':
        return {
          bg: 'bg-success/10 border-success/20',
          dot: 'bg-success',
          text: 'text-success'
        };
      case 'ALLOCATED':
        return {
          bg: 'bg-primary/10 border-primary/20',
          dot: 'bg-primary',
          text: 'text-primary'
        };
      case 'UNDER_MAINTENANCE':
        return {
          bg: 'bg-warning/10 border-warning/20',
          dot: 'bg-warning',
          text: 'text-warning'
        };
      case 'RETIRED':
        return {
          bg: 'bg-destructive/10 border-destructive/20',
          dot: 'bg-destructive',
          text: 'text-destructive'
        };
      default:
        return {
          bg: 'bg-muted border-border',
          dot: 'bg-muted-foreground',
          text: 'text-muted-foreground'
        };
    }
  };

  const colors = getColors(status);
  
  // Format string for display: UNDER_MAINTENANCE -> Under Maintenance
  const displayStatus = status.split('_').map(word => 
    word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ');

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
      {displayStatus}
    </span>
  );
}
