'use client';

type StatusType = 'Available' | 'Allocated' | 'Under Maintenance' | 'Retired';

interface AssetStatusBadgeProps {
  status: StatusType;
}

export function AssetStatusBadge({ status }: AssetStatusBadgeProps) {
  const getColors = (stat: StatusType) => {
    switch (stat) {
      case 'Available':
        return {
          bg: 'bg-success/10 border-success/20',
          dot: 'bg-success',
          text: 'text-success'
        };
      case 'Allocated':
        return {
          bg: 'bg-primary/10 border-primary/20',
          dot: 'bg-primary',
          text: 'text-primary'
        };
      case 'Under Maintenance':
        return {
          bg: 'bg-warning/10 border-warning/20',
          dot: 'bg-warning',
          text: 'text-warning'
        };
      case 'Retired':
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

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`} />
      {status}
    </span>
  );
}
