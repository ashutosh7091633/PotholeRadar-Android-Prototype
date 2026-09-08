import { base, Bullet, Eyebrow, Footer, Frame, PageMark } from '@/components/slide-shared';

export default function Slide5() {
  return (
    <Frame>
      <PageMark number="05" />
      <div className="absolute left-[5.5vw] top-[11vh] w-[42vw]">
        <Eyebrow>THE DEMO LOOP</Eyebrow>
        <h2 className="mt-[2.4vh] font-display text-[4.25vw] font-semibold leading-[1.02] tracking-[-0.045em] text-text">A demo that works on a table</h2>
        <div className="mt-[5vh] space-y-[2.1vh]">
          <Bullet>Simulate Drive injects synthetic acceleration spikes</Bullet>
          <Bullet>Mock GPS coordinates move along a route</Bullet>
          <Bullet>The live meter responds in real time</Bullet>
          <Bullet>Impact alerts appear immediately and save locally</Bullet>
          <Bullet tone="bg-accent">The same flow can be shown without a car, network, or cloud service</Bullet>
        </div>
      </div>
      <div className="absolute right-[5.5vw] top-[9vh] h-[77vh] w-[43vw] overflow-hidden rounded-[1.8vw] border border-white/15 bg-[#111a2b]">
        <img src={`${base}phone-demo.jpg`} crossOrigin="anonymous" alt="Phone showing PotholeRadar demo" className="absolute inset-0 h-full w-full object-cover opacity-75" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,16,31,0.05)_0%,rgba(9,16,31,0.75)_100%)]" />
        <div className="absolute bottom-[4vh] left-[2.5vw] right-[2.5vw] flex items-center justify-between"><span className="text-[1vw] font-semibold uppercase tracking-[0.16em] text-text/75">TABLETOP MODE</span><span className="flex items-center gap-[0.7vw] text-[1vw] font-semibold uppercase tracking-[0.16em] text-primary"><span className="h-[0.55vw] w-[0.55vw] rounded-full bg-primary" />LIVE</span></div>
      </div>
      <Footer label="POTHOLERADAR / DEMO EXPERIENCE" />
    </Frame>
  );
}