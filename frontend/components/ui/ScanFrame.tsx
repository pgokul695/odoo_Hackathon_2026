'use client';

export function ScanFrame() {
  return (
    <div className="relative w-full max-w-[280px] h-[280px] rounded-xl border border-border/40 overflow-hidden bg-black/15 flex items-center justify-center shadow-inner">
      {/* Corner Brackets */}
      {/* Top Left */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary" />
      {/* Top Right */}
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary" />
      {/* Bottom Left */}
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary" />
      {/* Bottom Right */}
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary" />

      {/* Horizontal Scanning Line */}
      <div className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 shadow-[0_0_10px_#6366f1] animate-scan-line" />

      {/* Ambient Grid overlay inside scope */}
      <div className="absolute inset-4 border border-dashed border-border/30 rounded-lg bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />

      {/* Simulated Scanner camera focus ring */}
      <div className="relative w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border border-dashed border-primary/45 animate-spin" style={{ animationDuration: '8s' }} />
      </div>
      
      {/* Scanning status banner */}
      <div className="absolute bottom-6 bg-card/85 backdrop-blur px-3 py-1 rounded-full border border-border text-[9px] font-bold text-primary tracking-widest uppercase animate-pulse">
        Feed: Live Detection
      </div>
    </div>
  );
}
