'use client';

interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-border/60">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground tracking-tight md:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          {description}
        </p>
      </div>
      {children && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
