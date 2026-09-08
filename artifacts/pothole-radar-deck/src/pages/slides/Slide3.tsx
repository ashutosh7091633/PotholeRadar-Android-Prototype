import { Bullet, Eyebrow, Footer, Frame, Line, PageMark, RouteLine } from '@/components/slide-shared';

export default function Slide3() {
  return (
    <Frame>
      <PageMark number="03" />
      <div className="absolute left-[5.5vw] top-[10vh]">
        <Eyebrow>THE SYSTEM</Eyebrow>
        <h2 className="mt-[2.4vh] font-display text-[4.35vw] font-semibold leading-[1.02] tracking-[-0.045em] text-text">From motion to meaning</h2>
      </div>
      <div className="absolute left-[5.5vw] top-[31vh] w-[34vw] space-y-[2vh]">
        <Bullet>Linear acceleration captures gravity-free vertical movement</Bullet>
        <Bullet>Gyroscope context helps separate impact from ordinary motion</Bullet>
        <Bullet>GPS supplies coordinates and vehicle speed</Bullet>
        <Bullet>Physics rules provide an explainable first pass</Bullet>
        <Bullet tone="bg-accent">A TensorFlow Lite hook leaves room for learned classification</Bullet>
      </div>
      <div className="absolute right-[6vw] top-[31vh] w-[46vw] rounded-[1.5vw] border border-white/12 bg-white/[0.035] p-[2.2vw]">
        <div className="flex items-center justify-between text-[1.5vw] font-semibold uppercase tracking-[0.14em] text-muted"><span>ON-DEVICE SIGNAL PATH</span><span className="text-primary">NO CLOUD REQUIRED</span></div>
        <div className="mt-[5vh] grid grid-cols-4 items-center gap-[1vw]">
          <div className="rounded-[0.9vw] border border-primary/40 bg-primary/10 p-[1.1vw]"><div className="text-[1.5vw] font-bold text-primary">01</div><div className="mt-[1.7vh] text-[1.5vw] font-semibold text-text">Motion</div><div className="mt-[0.5vh] text-[1.5vw] text-muted">Accel + gyro</div></div>
          <RouteLine className="w-[7vw] text-primary/60" />
          <div className="rounded-[0.9vw] border border-white/15 bg-white/5 p-[1.1vw]"><div className="text-[1.5vw] font-bold text-accent">02</div><div className="mt-[1.7vh] text-[1.5vw] font-semibold text-text">Classify</div><div className="mt-[0.5vh] text-[1.5vw] text-muted">Physics + ML</div></div>
          <RouteLine className="w-[7vw] rotate-180 text-accent/60" />
        </div>
        <div className="mt-[3.5vh] flex items-center justify-between rounded-[0.9vw] border border-white/10 bg-[#0f1929] px-[1.2vw] py-[1.1vw]"><span className="text-[1.5vw] font-semibold text-text">Map event</span><span className="text-[1.5vw] font-semibold text-primary">GPS + speed + severity</span></div>
      </div>
      <Line className="absolute left-[5.5vw] right-[5.5vw] top-[23vh]" />
      <Footer label="POTHOLERADAR / HOW IT WORKS" />
    </Frame>
  );
}