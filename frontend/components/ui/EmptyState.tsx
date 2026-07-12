'use client';

import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, icon: Icon = Inbox, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="glass-panel rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] border border-dashed border-border/80">
      <div className="p-4 rounded-full bg-muted/40 text-muted-foreground mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-sm font-bold text-foreground mb-1 tracking-tight">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-xs font-bold text-primary-foreground bg-primary rounded-lg hover:bg-primary/95 shadow-sm transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
