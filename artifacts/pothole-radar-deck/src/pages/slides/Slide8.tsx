import { Eyebrow, Footer, Frame, PageMark, RouteLine } from '@/components/slide-shared';

export default function Slide8() {
  return (
    <Frame className="bg-[#0a0f1b]">
      <PageMark number="08" />
      <div className="absolute left-[5.5vw] top-[17vh] w-[50vw]">
        <Eyebrow>THE ROAD AHEAD</Eyebrow>
        <h2 className="mt-[2.6vh] font-display text-[5.3vw] font-semibold leading-[0.96] tracking-[-0.06em] text-text">Prototype today.<br /><span className="text-primary">Road intelligence</span> next.</h2>
      </div>
      <div className="absolute right-[7vw] top-[21vh] w-[30vw] text-[1.8vw] leading-[1.35] text-muted">The prototype proves the experience. The next build makes the signal native, durable, and shared.</div>
      <div className="absolute left-[5.5vw] right-[5.5vw] top-[55vh] grid grid-cols-4 gap-[1.2vw]">
        <div className="border-t-[0.18vw] border-primary pt-[1.5vh]"><div className="font-display text-[2vw] font-semibold text-primary">01</div><div className="mt-[1.2vh] text-[1.8vw] font-semibold text-text">Foreground service</div><div className="mt-[0.7vh] text-[1.5vw] leading-[1.3] text-muted">Move the demo loop into native Android execution</div></div>
        <div className="border-t-[0.18vw] border-primary pt-[1.5vh]"><div className="font-display text-[2vw] font-semibold text-primary">02</div><div className="mt-[1.2vh] text-[1.8vw] font-semibold text-text">Room storage</div><div className="mt-[0.7vh] text-[1.5vw] leading-[1.3] text-muted">Keep event history durable on-device</div></div>
        <div className="border-t-[0.18vw] border-primary pt-[1.5vh]"><div className="font-display text-[2vw] font-semibold text-primary">03</div><div className="mt-[1.2vh] text-[1.8vw] font-semibold text-text">Real sensors + TFLite</div><div className="mt-[0.7vh] text-[1.5vw] leading-[1.3] text-muted">Connect sampling and learned classification</div></div>
        <div className="border-t-[0.18vw] border-accent pt-[1.5vh]"><div className="font-display text-[2vw] font-semibold text-accent">04</div><div className="mt-[1.2vh] text-[1.8vw] font-semibold text-text">Shared severity map</div><div className="mt-[0.7vh] text-[1.5vw] leading-[1.3] text-muted">Expand from individual drives to civic evidence</div></div>
      </div>
      <RouteLine className="absolute bottom-[12vh] right-[7vw] w-[30vw] text-primary/45" />
      <Footer label="POTHOLERADAR / NEXT BUILD" />
    </Frame>
  );
}