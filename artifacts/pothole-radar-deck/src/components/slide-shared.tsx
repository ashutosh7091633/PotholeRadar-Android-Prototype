import type { ReactNode } from 'react';

export const base = import.meta.env.BASE_URL;

export function Frame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`relative w-screen h-screen overflow-hidden bg-bg text-text font-body ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = 'text-primary' }: { children: ReactNode; tone?: string }) {
  return <div className={`font-display text-[1.5vw] font-bold uppercase tracking-[0.22em] ${tone}`}>{children}</div>;
}

export function PageMark({ number }: { number: string }) {
  return (
    <div className="absolute right-[5.5vw] top-[5vh] flex items-center gap-[0.8vw] text-[1.5vw] font-semibold uppercase tracking-[0.18em] text-muted">
      <span className="h-[0.45vw] w-[0.45vw] rounded-full bg-primary" />
      {number} / 08
    </div>
  );
}

export function Footer({ label = 'POTHOLERADAR / ROAD IMPACT MONITOR' }: { label?: string }) {
  return (
    <div className="absolute bottom-[4.5vh] left-[5.5vw] right-[5.5vw] flex items-center justify-between border-t border-white/10 pt-[1.6vh] text-[1.5vw] font-semibold uppercase tracking-[0.14em] text-muted">
      <span>{label}</span>
      <span>OFFLINE-FIRST PROTOTYPE</span>
    </div>
  );
}

export function Bullet({ children, tone = 'bg-primary' }: { children: ReactNode; tone?: string }) {
  return (
    <div className="flex items-start gap-[1.1vw]">
      <span className={`mt-[0.6vw] h-[0.65vw] w-[0.65vw] shrink-0 rounded-full ${tone}`} />
      <span className="text-[2vw] leading-[1.22] text-text/85">{children}</span>
    </div>
  );
}

export function Line({ className = '' }: { className?: string }) {
  return <div className={`h-px bg-white/12 ${className}`} />;
}

export function ImpactPin({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-[2.3vw] w-[2.3vw] rounded-full border-[0.25vw] border-bg bg-accent shadow-[0_0_0_0.55vw_rgba(243,166,54,0.16)] ${className}`}>
      <span className="absolute left-1/2 top-1/2 h-[0.55vw] w-[0.55vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg" />
    </div>
  );
}

export function RouteLine({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 420 120" fill="none" aria-hidden="true">
      <path d="M2 88C64 82 66 32 132 40C194 47 181 93 239 97C304 101 293 25 418 21" stroke="currentColor" strokeWidth="2" strokeDasharray="7 9" />
      <circle cx="2" cy="88" r="5" fill="currentColor" />
      <circle cx="418" cy="21" r="5" fill="currentColor" />
    </svg>
  );
}

export function PhonePanel({ kind }: { kind: 'scan' | 'map' | 'log' }) {
  return (
    <div className="relative h-[45vh] w-[18vw] overflow-hidden rounded-[2vw] border-[0.3vw] border-white/15 bg-[#0f1929] p-[1.1vw] shadow-[0_1.5vw_4vw_rgba(0,0,0,0.35)]">
      <div className="mx-auto mb-[1.4vw] h-[0.35vw] w-[3.2vw] rounded-full bg-white/20" />
      {kind === 'scan' && (
        <div className="space-y-[1.3vw]">
          <div className="text-[1.5vw] font-bold uppercase tracking-[0.18em] text-primary">LIVE G-FORCE</div>
          <div className="font-display text-[4vw] font-bold text-text">0.8<span className="ml-[0.3vw] text-[1.5vw] text-primary">G</span></div>
          <div className="h-[0.65vw] rounded-full bg-white/10"><div className="h-full w-[26%] rounded-full bg-primary" /></div>
          <div className="rounded-[1vw] bg-white/5 p-[1vw]"><div className="text-[1.5vw] font-bold uppercase tracking-[0.15em] text-muted">SPEED</div><div className="mt-[0.4vw] text-[1.8vw] font-bold text-text">28 <span className="text-[1.5vw] font-normal text-muted">km/h</span></div></div>
          <div className="rounded-[1vw] border border-accent/50 bg-accent/10 p-[0.9vw]"><div className="text-[1.5vw] font-bold uppercase tracking-[0.1em] text-accent">MODERATE IMPACT</div><div className="mt-[0.4vw] text-[1.5vw] text-text/70">3.6G spike saved</div></div>
        </div>
      )}
      {kind === 'map' && (
        <div className="relative h-[34vh] overflow-hidden rounded-[1.2vw] bg-[#152239]">
          <RouteLine className="absolute left-[0.8vw] top-[8vh] w-[16vw] text-primary/80" />
          <ImpactPin className="absolute left-[4vw] top-[10vh]" />
          <ImpactPin className="absolute right-[3vw] top-[17vh] scale-75" />
          <ImpactPin className="absolute bottom-[5vh] left-[7vw] scale-75" />
          <div className="absolute bottom-[1vw] left-[1vw] text-[1.5vw] font-bold uppercase tracking-[0.14em] text-muted">BENGALURU / LIVE ROUTE</div>
        </div>
      )}
      {kind === 'log' && (
        <div className="space-y-[0.8vw]">
          <div className="text-[1.5vw] font-bold uppercase tracking-[0.18em] text-primary">DETECTION LOG</div>
          <div className="rounded-[1vw] bg-white/5 p-[0.9vw]"><div className="flex justify-between text-[1.5vw] font-bold text-text"><span>Pothole</span><span className="text-accent">3.6G</span></div><div className="mt-[0.4vw] text-[1.5vw] text-muted">11:19 · 28 km/h</div></div>
          <div className="rounded-[1vw] bg-white/5 p-[0.9vw]"><div className="flex justify-between text-[1.5vw] font-bold text-text"><span>Pothole</span><span className="text-red-300">4.8G</span></div><div className="mt-[0.4vw] text-[1.5vw] text-muted">11:24 · 34 km/h</div></div>
          <div className="rounded-[1vw] bg-white/5 p-[0.9vw]"><div className="flex justify-between text-[1.5vw] font-bold text-text"><span>Speed bump</span><span className="text-primary">2.5G</span></div><div className="mt-[0.4vw] text-[1.5vw] text-muted">11:12 · 22 km/h</div></div>
        </div>
      )}
    </div>
  );
}