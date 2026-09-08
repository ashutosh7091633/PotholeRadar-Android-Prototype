import { Eyebrow, Footer, Frame, PageMark, PhonePanel } from '@/components/slide-shared';

export default function Slide6() {
  return (
    <Frame>
      <PageMark number="06" />
      <div className="absolute left-[5.5vw] top-[10vh]">
        <Eyebrow>THE PRODUCT SURFACE</Eyebrow>
        <h2 className="mt-[2.4vh] font-display text-[4.35vw] font-semibold leading-[1.02] tracking-[-0.045em] text-text">Three surfaces, one workflow</h2>
      </div>
      <div className="absolute left-[5.5vw] right-[5.5vw] top-[33vh] flex items-start justify-between">
        <div className="flex w-[28vw] flex-col items-center">
          <PhonePanel kind="scan" />
          <div className="mt-[2vh] text-[1.5vw] font-semibold text-text">01 / Scan</div>
          <div className="mt-[0.8vh] text-[1.15vw] text-muted">Start or stop a drive and watch live G-force</div>
        </div>
        <div className="flex w-[28vw] flex-col items-center">
          <PhonePanel kind="map" />
          <div className="mt-[2vh] text-[1.5vw] font-semibold text-text">02 / Map</div>
          <div className="mt-[0.8vh] text-[1.15vw] text-muted">Inspect color-coded impact pins and details</div>
        </div>
        <div className="flex w-[28vw] flex-col items-center">
          <PhonePanel kind="log" />
          <div className="mt-[2vh] text-[1.5vw] font-semibold text-text">03 / Log</div>
          <div className="mt-[0.8vh] text-[1.15vw] text-muted">Filter detections and export CSV locally</div>
        </div>
      </div>
      <Footer label="POTHOLERADAR / ONE CONTINUOUS STORY" />
    </Frame>
  );
}