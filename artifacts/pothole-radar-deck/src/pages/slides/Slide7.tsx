import { Bullet, Eyebrow, Footer, Frame, Line, PageMark } from '@/components/slide-shared';

export default function Slide7() {
  return (
    <Frame>
      <PageMark number="07" />
      <div className="absolute left-[5.5vw] top-[10vh]">
        <Eyebrow>THE DESIGN PRINCIPLE</Eyebrow>
        <h2 className="mt-[2.4vh] max-w-[63vw] font-display text-[4.35vw] font-semibold leading-[1.02] tracking-[-0.045em] text-text">Offline by design</h2>
      </div>
      <div className="absolute left-[5.5vw] top-[36vh] w-[31vw]">
        <div className="font-display text-[5vw] font-semibold leading-[0.98] tracking-[-0.06em] text-primary">The road<br />doesn’t need<br /><span className="text-text">a signal.</span></div>
        <div className="mt-[3vh] text-[1.5vw] leading-[1.35] text-muted">Trust starts with a reliable demo path before native service hardening.</div>
      </div>
      <div className="absolute right-[7vw] top-[35vh] w-[42vw] space-y-[2.1vh]">
        <div className="flex items-center justify-between border-b border-white/12 pb-[2vh]"><Bullet>Core demo flow works without network access</Bullet><span className="text-[1vw] font-bold text-primary">01</span></div>
        <div className="flex items-center justify-between border-b border-white/12 pb-[2vh]"><Bullet>Local event history is persisted on-device</Bullet><span className="text-[1vw] font-bold text-primary">02</span></div>
        <div className="flex items-center justify-between border-b border-white/12 pb-[2vh]"><Bullet>Offline-style map rendering keeps the route legible</Bullet><span className="text-[1vw] font-bold text-primary">03</span></div>
        <div className="flex items-center justify-between border-b border-white/12 pb-[2vh]"><Bullet>Device location can be used when available</Bullet><span className="text-[1vw] font-bold text-primary">04</span></div>
        <div className="flex items-center justify-between"><Bullet tone="bg-accent">The prototype keeps the product story clear before native service hardening</Bullet><span className="text-[1vw] font-bold text-accent">05</span></div>
      </div>
      <Line className="absolute left-[5.5vw] right-[5.5vw] top-[27vh]" />
      <Footer label="POTHOLERADAR / OFFLINE-FIRST" />
    </Frame>
  );
}