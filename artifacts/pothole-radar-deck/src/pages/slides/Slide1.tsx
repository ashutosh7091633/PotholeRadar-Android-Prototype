import { base, Eyebrow, Frame, ImpactPin, PageMark } from '@/components/slide-shared';

export default function Slide1() {
  return (
    <Frame className="bg-[#0a0f1b]">
      <img src={`${base}hero-road.jpg`} crossOrigin="anonymous" alt="Night road with a radar sweep" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,12,24,0.96)_0%,rgba(7,12,24,0.72)_45%,rgba(7,12,24,0.25)_100%)]" />
      <div className="absolute left-[5.5vw] top-[5vh] flex items-center gap-[1vw]">
        <div className="flex h-[2.7vw] w-[2.7vw] items-center justify-center rounded-[0.7vw] bg-primary"><div className="h-[1vw] w-[1vw] rounded-full bg-bg" /></div>
        <div className="font-display text-[1.1vw] font-bold tracking-[0.2em] text-text">POTHOLERADAR</div>
      </div>
      <PageMark number="01" />
      <div className="absolute left-[5.5vw] top-[28vh] w-[52vw]">
        <Eyebrow>OFFLINE-FIRST ROAD INTELLIGENCE</Eyebrow>
        <h1 className="mt-[2.6vh] font-display text-[7.2vw] font-semibold leading-[0.93] tracking-[-0.065em] text-text">Pothole<span className="text-primary">Radar</span></h1>
        <p className="mt-[3.6vh] max-w-[39vw] text-[2vw] leading-[1.25] text-text/78">Offline-first road impact detection for safer streets</p>
        <div className="mt-[4.8vh] flex items-center gap-[1.2vw] text-[1.2vw] font-semibold uppercase tracking-[0.14em] text-muted"><span className="h-[0.55vw] w-[0.55vw] rounded-full bg-accent" />A hackathon-ready mobile prototype that turns vehicle motion into a living map.</div>
      </div>
      <ImpactPin className="absolute bottom-[24vh] right-[18vw] scale-[1.25]" />
      <div className="absolute bottom-[11vh] right-[12vw] h-[17vw] w-[17vw] rounded-full border border-primary/20" />
      <div className="absolute bottom-[14vh] right-[15vw] h-[11vw] w-[11vw] rounded-full border border-primary/30" />
      <div className="absolute bottom-[4.5vh] left-[5.5vw] right-[5.5vw] border-t border-white/15 pt-[1.6vh] text-[0.95vw] font-semibold uppercase tracking-[0.14em] text-muted">PROJECT SHOWCASE / 2026</div>
    </Frame>
  );
}