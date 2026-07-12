'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Laptop, Monitor, Smartphone, Server, Car, Info } from 'lucide-react';


interface OrbitNode {
  id: string;
  name: string;
  count: number;
  allocated: string;
  icon: React.ComponentType<{ className?: string }>;
  angleOffset: number;
}

const nodes: OrbitNode[] = [
  { id: 'n-lap', name: 'Laptops', count: 428, allocated: '82%', icon: Laptop, angleOffset: 0 },
  { id: 'n-mon', name: 'Monitors', count: 145, allocated: '78%', icon: Monitor, angleOffset: (2 * Math.PI) / 5 },
  { id: 'n-mob', name: 'Mobile', count: 98, allocated: '65%', icon: Smartphone, angleOffset: (4 * Math.PI) / 5 },
  { id: 'n-srv', name: 'Servers', count: 64, allocated: '92%', icon: Server, angleOffset: (6 * Math.PI) / 5 },
  { id: 'n-veh', name: 'Vehicles', count: 12, allocated: '100%', icon: Car, angleOffset: (8 * Math.PI) / 5 },
];

export function AssetCore({ nodesData }: { nodesData?: { id: string, name: string, count: number, allocated: string }[] }) {
  const [mounted, setMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Orbit parameters
  const rx = 180; // horizontal radius
  const ry = 45;  // vertical radius (creates 3D tilt)

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation Loop
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    previousTimeRef.current = performance.now();

    const animate = (time: number) => {
      const delta = time - previousTimeRef.current;
      previousTimeRef.current = time;

      // Speed in radians per millisecond
      // 0.00018 rad/ms is ~0.003 rad per frame at 60fps (normal speed)
      // 0.00003 rad/ms is ~0.0005 rad per frame at 60fps (slow speed)
      const speed = hoveredNode ? 0.00003 : 0.00018;
      angleRef.current = (angleRef.current + speed * delta) % (2 * Math.PI);

      const currentNodes = nodesData ? nodesData.map((n, i) => ({
        ...n,
        icon: Server, // Default icon since we are showing departments
        angleOffset: (i * 2 * Math.PI) / Math.max(1, nodesData.length)
      })) : nodes;

      currentNodes.forEach((node) => {
        const el = nodeRefs.current[node.id];
        if (!el) return;
        const angle = angleRef.current + node.angleOffset;
        const x = rx * Math.cos(angle);
        const z = Math.sin(angle); // depth range -1 to 1
        const y = ry * Math.sin(angle);

        // Spatial rendering parameters
        const scale = 0.85 + (z + 1) * 0.15; // range 0.85 to 1.15
        const opacity = 0.6 + (z + 1) * 0.2;  // range 0.6 to 1.0
        const zIndex = z > 0 ? 30 : 5;       // place nodes in front or behind core

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [hoveredNode, nodesData]);

  return (
    <div className="glass-panel relative rounded-xl p-6 flex flex-col items-center justify-center min-h-[420px] overflow-hidden border border-border/80 shadow-sm">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 opacity-80 pointer-events-none" />

      <h3 className="absolute top-4 left-4 text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5" />
        Asset Core Topology
      </h3>

      <div className="relative w-full max-w-[500px] h-[300px] flex items-center justify-center select-none">
        
        {/* Orbit Path lines (SVGs placed behind/around core) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-45">
          <svg className="w-full h-full max-w-[440px] max-h-[140px]" viewBox="0 0 440 140" fill="none">
            <ellipse 
              cx="220" 
              cy="70" 
              rx="200" 
              ry="50" 
              stroke="url(#orbitGradient)" 
              strokeWidth="1.5" 
              strokeDasharray="4 6"
            />
            <defs>
              <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Central Core Element */}
        <div className="absolute z-10 flex items-center justify-center w-24 h-24 rounded-full">
          {/* Subtle Outer Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse-ring" />
          
          {/* Center Orb Card */}
          <div className="relative w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center bg-card shadow-glow">
            <svg className="w-10 h-10 text-primary animate-rotate-cw" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3"/>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
            </svg>
            <div className="absolute inset-0.5 rounded-full border border-secondary/15 animate-rotate-ccw" />
          </div>
        </div>

        {/* Orbiting Node items */}
        {(nodesData ? nodesData.map((n, i) => ({
          ...n,
          icon: Server,
          angleOffset: (i * 2 * Math.PI) / Math.max(1, nodesData.length)
        })) : nodes).map((node) => {
          const angle = angleRef.current + node.angleOffset;
          const x = rx * Math.cos(angle);
          const z = Math.sin(angle); // depth range -1 to 1
          const y = ry * Math.sin(angle);

          const isNodeHovered = hoveredNode === node.id;
          const Icon = node.icon;

          // Spatial rendering parameters
          const scale = 0.85 + (z + 1) * 0.15; // range 0.85 to 1.15
          const opacity = 0.6 + (z + 1) * 0.2;  // range 0.6 to 1.0
          const zIndex = z > 0 ? 30 : 5;       // place nodes in front or behind core

          return (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[node.id] = el;
              }}
              className="absolute transition-shadow duration-300"
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={mounted ? {
                transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
              } : undefined}
            >
              {/* Orb button */}
              <div 
                className={`relative flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300 cursor-pointer shadow-sm ${
                  isNodeHovered
                    ? 'bg-primary border-primary text-primary-foreground shadow-glow scale-110'
                    : 'bg-card border-border hover:border-primary/50 text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                
                {/* Floating mini count badge */}
                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-secondary text-[8px] font-bold text-secondary-foreground shadow">
                  {node.count}
                </span>
              </div>

              {/* Information Tooltip Card */}
              {isNodeHovered && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-44 bg-popover border border-border rounded-lg p-2.5 shadow-lg animate-float z-50 text-left pointer-events-none">
                  <div className="flex justify-between items-center border-b border-border/60 pb-1 mb-1.5">
                    <span className="text-[10px] font-bold text-foreground uppercase">{node.name}</span>
                    <span className="text-[9px] text-muted-foreground font-mono">Core Node</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">Inventory</span>
                      <span className="font-semibold text-foreground">{node.count} units</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">Allocated</span>
                      <span className="font-semibold text-success">{node.allocated}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Tip footer */}
      <span className="text-[10px] text-muted-foreground tracking-wide mt-2">
        Hover category node to inspect active allocations
      </span>
    </div>
  );
}
