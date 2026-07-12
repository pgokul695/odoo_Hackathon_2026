'use client';

import React, { useState } from 'react';
import { PieChart } from 'lucide-react';

interface ChartSegment {
  key: string;
  label: string;
  count: number;
  color: string;
  percentage: number;
}

export function AssetDistribution() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data: ChartSegment[] = [
    { key: 'allocated', label: 'Allocated', count: 1023, color: 'text-primary', percentage: 82 },
    { key: 'available', label: 'Available', count: 200, color: 'text-success', percentage: 16 },
    { key: 'maintenance', label: 'Maintenance', count: 12, color: 'text-warning', percentage: 1 },
    { key: 'retired', label: 'Retired', count: 13, color: 'text-destructive', percentage: 1 },
  ];

  const total = data.reduce((sum, item) => sum + item.count, 0);

  // SVG parameters
  const radius = 50;
  const strokeWidth = 14;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * radius;

  // Compute stroke offsets
  let accumulatedPercent = 0;

  return (
    <div className="glass-panel relative rounded-xl p-5 flex flex-col justify-between min-h-[220px] overflow-hidden border border-border/80 shadow-sm">
      {/* Header */}
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5 mb-2">
        <PieChart className="w-3.5 h-3.5" />
        Distribution
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 flex-1">
        {/* Donut Chart SVG */}
        <div className="relative w-36 h-36">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
            {data.map((segment, index) => {
              const strokeLength = (segment.percentage / 100) * circumference;
              const strokeOffset = circumference - strokeLength + (accumulatedPercent / 100) * circumference;
              accumulatedPercent -= segment.percentage;

              const isHovered = hoveredIndex === index;
              const isOtherHovered = hoveredIndex !== null && !isHovered;

              let strokeColorClass = 'stroke-primary';
              if (segment.key === 'available') strokeColorClass = 'stroke-success';
              else if (segment.key === 'maintenance') strokeColorClass = 'stroke-warning';
              else if (segment.key === 'retired') strokeColorClass = 'stroke-destructive';

              return (
                <circle
                  key={segment.key}
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill="none"
                  strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`transition-all duration-300 cursor-pointer ${strokeColorClass} ${
                    isOtherHovered ? 'opacity-40' : 'opacity-100'
                  }`}
                  style={{
                    transformOrigin: 'center',
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                  }}
                />
              );
            })}
          </svg>

          {/* Central tooltip label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {hoveredIndex !== null ? (
              <>
                <span className="text-sm font-black text-foreground">
                  {data[hoveredIndex].count}
                </span>
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">
                  {data[hoveredIndex].label}
                </span>
              </>
            ) : (
              <>
                <span className="text-base font-extrabold text-foreground">{total}</span>
                <span className="text-[8px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Total
                </span>
              </>
            )}
          </div>
        </div>

        {/* Legend list */}
        <div className="flex flex-col gap-2 min-w-[120px]">
          {data.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && !isHovered;

            let dotColor = 'bg-primary';
            if (item.key === 'available') dotColor = 'bg-success';
            else if (item.key === 'maintenance') dotColor = 'bg-warning';
            else if (item.key === 'retired') dotColor = 'bg-destructive';

            return (
              <div
                key={item.key}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex items-center justify-between text-xs cursor-pointer p-1 rounded transition-all duration-200 ${
                  isHovered ? 'bg-muted/50' : ''
                } ${isOtherHovered ? 'opacity-50' : 'opacity-100'}`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${dotColor} flex-shrink-0`} />
                  <span className="font-medium text-muted-foreground">{item.label}</span>
                </div>
                <span className="font-mono font-bold text-foreground pl-4">
                  {item.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
