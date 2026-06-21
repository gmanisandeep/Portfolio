import React, { useEffect, useRef } from 'react';

const MARQUEE_TEXT = '• DEVELOPER • FILMMAKER • DESIGNER • STORYTELLER • NODE.JS • REACT • FLUTTER • PREMIERE PRO • GEMINI API • MANI SANDEEP ';

export default function MarqueeTicker({ speed = 40 }) {
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    let pos = 0;
    let raf;
    const pxPerFrame = speed / 60;

    const tick = () => {
      pos -= pxPerFrame;
      const halfW = el.scrollWidth / 2;
      if (Math.abs(pos) >= halfW) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const repeated = MARQUEE_TEXT.repeat(3);

  return (
    <div className="w-full overflow-hidden py-3 border-y border-fg/10 relative z-10 bg-transparent select-none">
      <div ref={track} className="flex whitespace-nowrap will-change-transform" style={{ display: 'flex' }}>
        <span className="font-heading font-black text-[0.72rem] tracking-[0.18em] text-accent-gold uppercase opacity-70 flex-shrink-0 pr-8">
          {repeated}
        </span>
        <span className="font-heading font-black text-[0.72rem] tracking-[0.18em] text-accent-gold uppercase opacity-70 flex-shrink-0 pr-8">
          {repeated}
        </span>
      </div>
    </div>
  );
}
