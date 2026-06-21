import React, { useEffect, useState } from 'react';

const COUNTDOWN = ['5', '4', '3', '2', '1', 'ACTION'];

export default function Preloader() {
  const [step, setStep] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let currentStep = 0;
    const intervals = [];

    const tick = () => {
      currentStep++;
      setStep(currentStep);
      if (currentStep < COUNTDOWN.length - 1) {
        intervals.push(setTimeout(tick, 320));
      } else {
        intervals.push(setTimeout(() => {
          setHidden(true);
          intervals.push(setTimeout(() => setGone(true), 700));
        }, 600));
      }
    };

    intervals.push(setTimeout(tick, 300));

    return () => intervals.forEach(clearTimeout);
  }, []);

  if (gone) return null;

  const current = COUNTDOWN[step] ?? '5';
  const isAction = current === 'ACTION';

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-[10000] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? 'opacity-0 pointer-events-none scale-[1.04]' : 'opacity-100'
      }`}
      style={{ background: '#050505' }}
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="absolute top-0 left-0 w-full h-10 flex items-center gap-4 px-4 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-5 h-5 border-2 border-white/40 rounded-sm flex-shrink-0" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-10 flex items-center gap-4 px-4 opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-5 h-5 border-2 border-white/40 rounded-sm flex-shrink-0" />
        ))}
      </div>

      <div
        key={current}
        className="relative z-10 text-center"
        style={{
          animation: 'preloaderPop 0.28s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        <div
          className="font-display leading-none select-none"
          style={{
            fontSize: isAction ? 'clamp(4rem,14vw,10rem)' : 'clamp(8rem,25vw,20rem)',
            color: isAction ? '#ffd500' : '#f4f3ef',
            textShadow: isAction
              ? '0 0 60px rgba(255,213,0,0.5), 0 0 120px rgba(255,213,0,0.2)'
              : '0 0 40px rgba(255,255,255,0.08)',
            letterSpacing: isAction ? '0.12em' : '-0.04em',
          }}
        >
          {current}
        </div>
        {!isAction && (
          <div className="font-heading text-[0.6rem] tracking-[0.4em] text-white/25 uppercase mt-2">
            FRAME {step + 1} / 5
          </div>
        )}
      </div>

      <div className="absolute bottom-14 font-mono text-[0.7rem] tracking-[0.2em] text-white/20">
        00:00:0{5 - step}:00 → 24fps → MANI SANDEEP
      </div>

      <style>{`
        @keyframes preloaderPop {
          from { opacity: 0; transform: scale(1.3); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
