import React, { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (barRef.current) {
        barRef.current.style.height = `${progress * 100}%`;
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-[2px] h-full z-[9000] pointer-events-none"
      style={{ background: 'rgba(255,213,0,0.08)' }}
    >
      <div
        ref={barRef}
        className="w-full"
        style={{
          background: 'linear-gradient(to bottom, #ffd500, #e13833)',
          height: '0%',
          transition: 'height 0.05s linear',
          boxShadow: '1px 0 8px rgba(255,213,0,0.4)',
        }}
      />
    </div>
  );
}
