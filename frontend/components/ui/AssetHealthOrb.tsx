'use client';

import { Activity } from 'lucide-react';

export function AssetHealthOrb() {
  const percentage = 94;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-panel relative rounded-xl p-5 flex flex-col items-center justify-center min-h-[220px] overflow-hidden border border-border/80 shadow-sm">
      {/* Header */}
      <h3 className="absolute top-4 left-4 text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
        <Activity className="w-3.5 h-3.5 text-success" />
        System Health
      </h3>

      {/* SVG Rings Gauge */}
      <div className="relative w-36 h-36 flex items-center justify-center mt-3">
        {/* Outer Rotating Dotted Ring */}
        <div className="absolute inset-0 animate-rotate-cw">
          <svg className="w-full h-full" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r="66"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 6"
              className="text-primary/30"
            />
          </svg>
        </div>

        {/* Counter Rotating Inner Dashed Ring */}
        <div className="absolute inset-2 animate-rotate-ccw opacity-50">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="6 4"
              className="text-secondary/40"
            />
          </svg>
        </div>

        {/* Gauge Ring */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          {/* Base Ring track */}
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="currentColor"
            className="text-muted/40"
            strokeWidth="5"
          />
          {/* Progress Ring */}
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="url(#healthOrbGradient)"
            strokeWidth="5.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="healthOrbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text inside glass container */}
        <div className="absolute w-24 h-24 rounded-full bg-card/60 backdrop-blur border border-border/50 flex flex-col items-center justify-center shadow-inner">
          <span className="text-2xl font-black text-foreground tracking-tighter leading-none mt-1">
            {percentage}%
          </span>
          <span className="text-[8px] font-bold text-success uppercase tracking-widest mt-1">
            Optimal
          </span>
          {/* Subtle Breathing Pulse Glow inside */}
          <div className="absolute inset-3 rounded-full bg-success/5 animate-pulse-ring" />
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
        <span>Active assets checked: </span>
        <span className="text-foreground">1,236 / 1,248</span>
      </div>
    </div>
  );
}
