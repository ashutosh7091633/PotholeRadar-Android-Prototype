import { Bullet, Eyebrow, Footer, Frame, Line, PageMark } from '@/components/slide-shared';

export default function Slide2() {
  return (
    <Frame>
      <PageMark number="02" />
      <div className="absolute left-[5.5vw] top-[12vh]">
        <Eyebrow>THE OPPORTUNITY</Eyebrow>
        <h2 className="mt-[2.4vh] max-w-[65vw] font-display text-[4.45vw] font-semibold leading-[1.02] tracking-[-0.045em] text-text">Road damage is felt before it is reported</h2>
      </div>
      <div className="absolute left-[5.5vw] right-[5.5vw] top-[43vh] grid grid-cols-[0.95fr_1.05fr] gap-[7vw]">
        <div className="flex items-end">
          <div className="font-display text-[12vw] font-semibold leading-none tracking-[-0.08em] text-primary/20">01</div>
          <div className="mb-[1.3vh] ml-[-2vw] max-w-[18vw] text-[1.6vw] leading-[1.3] text-muted">The road already creates a signal. The product makes it legible.</div>
        </div>
        <div className="space-y-[2.25vh]">
          <Bullet>Potholes create sharp, repeatable motion signatures</Bullet>
          <Bullet>Manual reporting is slow, inconsistent, and easy to forget</Bullet>
          <Bullet>Cities need location-aware evidence, not just isolated complaints</Bullet>
          <Bullet> A phone already carries the sensors needed to start</Bullet>
        </div>
      </div>
      <Line className="absolute left-[5.5vw] right-[5.5vw] top-[36vh]" />
      <Footer label="POTHOLERADAR / WHY NOW" />
    </Frame>
  );
}