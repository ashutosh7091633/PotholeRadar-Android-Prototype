import { Bullet, Eyebrow, Footer, Frame, PageMark } from '@/components/slide-shared';

export default function Slide4() {
  return (
    <Frame>
      <PageMark number="04" />
      <div className="absolute left-[5.5vw] top-[10vh]">
        <Eyebrow>DETECTION LOGIC</Eyebrow>
        <h2 className="mt-[2.4vh] max-w-[63vw] font-display text-[4.35vw] font-semibold leading-[1.02] tracking-[-0.045em] text-text">Detection designed for the road</h2>
      </div>
      <div className="absolute left-[5.5vw] top-[36vh] w-[33vw]">
        <div className="font-display text-[11vw] font-semibold leading-none tracking-[-0.09em] text-primary">2.5<span className="ml-[0.7vw] text-[4vw] text-primary/75">G</span></div>
        <div className="mt-[1vh] text-[1.5vw] font-semibold uppercase tracking-[0.16em] text-muted">candidate impact threshold</div>
        <div className="mt-[4vh] flex items-end gap-[0.6vw]">
          <div className="h-[2.4vh] w-[5vw] rounded-full bg-primary/30" />
          <div className="h-[3.6vh] w-[6vw] rounded-full bg-primary/55" />
          <div className="h-[5vh] w-[7vw] rounded-full bg-accent" />
          <div className="h-[6.5vh] w-[8vw] rounded-full bg-red-300" />
        </div>
        <div className="mt-[1vh] flex w-[26vw] justify-between text-[1.5vw] font-semibold uppercase tracking-[0.12em] text-muted"><span>MINOR</span><span>MODERATE</span><span>SEVERE</span></div>
      </div>
      <div className="absolute right-[7vw] top-[35vh] w-[42vw] space-y-[2.25vh]">
        <Bullet>Peak Z-axis spike triggers a candidate event above the impact threshold</Bullet>
        <Bullet>Short impulses map to potholes; broader waves map to speed bumps</Bullet>
        <Bullet>Low-speed disturbances are filtered out</Bullet>
        <Bullet>A cooldown prevents one bump from becoming multiple reports</Bullet>
        <Bullet tone="bg-accent">Severity is readable at a glance: Minor, Moderate, Severe</Bullet>
      </div>
      <Footer label="POTHOLERADAR / EXPLAINABLE SIGNALS" />
    </Frame>
  );
}