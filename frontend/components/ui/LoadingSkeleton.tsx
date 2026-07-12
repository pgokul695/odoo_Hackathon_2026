'use client';

interface LoadingSkeletonProps {
  rows?: number;
  cols?: number;
}

export function LoadingSkeleton({ rows = 4, cols = 4 }: LoadingSkeletonProps) {
  return (
    <div className="glass-panel rounded-xl p-5 border border-border/80 w-full space-y-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center border-b border-border/40 pb-3 mb-4">
        <div className="h-4 w-1/4 bg-muted/60 rounded animate-pulse" />
        <div className="h-6 w-20 bg-muted/60 rounded animate-pulse" />
      </div>
      
      {/* Rows skeletons */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, rIndex) => (
          <div key={rIndex} className="flex items-center space-x-4">
            {Array.from({ length: cols }).map((_, cIndex) => (
              <div 
                key={cIndex} 
                className="h-3.5 bg-muted/40 rounded animate-pulse" 
                style={{ 
                  width: cIndex === 0 ? '15%' : cIndex === 1 ? '30%' : cIndex === 2 ? '20%' : '15%',
                  animationDelay: `${(rIndex + cIndex) * 75}ms`
                }} 
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
