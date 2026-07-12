'use client';

import React, { useState, useEffect, useRef } from 'react';

interface MagneticStatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  statusColor?: string;
}

export function MagneticStatCard({
  title,
  value,
  subtitle,
  trend,
  trendType = 'up',
  icon: Icon,
  statusColor = 'text-primary'
}: MagneticStatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState<string | number>('0');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
    setIsHovered(true);

    const tiltX = -((y / rect.height) - 0.5) * 2; // Max 1-2 degrees
    const tiltY = ((x / rect.width) - 0.5) * 2; // Max 1-2 degrees
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    const numStr = String(value).replace(/[^0-9.]/g, '');
    const numVal = parseFloat(numStr);
    
    if (isNaN(numVal)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1200; // 1.2s
    const startTime = performance.now();
    let animationFrameId: number;
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress * (2 - progress); // Ease out quad
      const currentVal = Math.floor(easeProgress * numVal);
      
      if (String(value).includes('%')) {
        setDisplayValue(`${currentVal}%`);
      } else if (String(value).includes(',')) {
        setDisplayValue(currentVal.toLocaleString());
      } else {
        setDisplayValue(currentVal);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [value]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.4s ease-out',
      }}
      className="glass-panel relative rounded-xl p-5 overflow-hidden transition-all duration-300 hover:shadow-md cursor-default flex flex-col justify-between min-h-[140px]"
    >
      {/* Hover Spotlight Glow */}
      {isHovered && (
        <div
          style={{
            background: `radial-gradient(130px circle at ${mousePos.x}px ${mousePos.y}px, var(--border-translucent) 0%, transparent 80%)`,
          }}
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        />
      )}

      {/* Top Section */}
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {title}
          </span>
          <h3 className="text-3xl font-extrabold text-foreground tracking-tight">
            {displayValue}
          </h3>
        </div>
        <div className={`p-2.5 rounded-lg bg-primary/5 border border-border flex items-center justify-center ${statusColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 flex items-center justify-between relative z-10 text-xs">
        <span className="text-muted-foreground text-[11px] font-medium leading-none">
          {subtitle}
        </span>
        {trend && (
          <span className={`px-1.5 py-0.5 rounded font-semibold text-[10px] leading-none ${
            trendType === 'up' 
              ? 'bg-success/10 text-success' 
              : trendType === 'down' 
              ? 'bg-destructive/10 text-destructive' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
