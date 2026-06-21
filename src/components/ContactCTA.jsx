import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const BIG_TEXT = 'LETS WORK LETS WORK LETS WORK LETS WORK LETS WORK LETS WORK ';

function MagneticButton({ href, children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    x.set(dx * 0.35);
    y.set(dy * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="block mt-9 bg-fg text-black text-[clamp(1.8rem,4vw,3.2rem)] font-display px-14 py-5 rounded-[50px] border-2 border-fg max-w-fit mx-auto transition-colors duration-300 hover:bg-black hover:text-fg hover:border-black"
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  );
}

export default function ContactCTA() {
  return (
    <section
      className="bg-accent-red py-48 px-[5%] text-center relative z-5 overflow-hidden"
      id="contact-section"
    >
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-0 opacity-[0.07]">
        <div
          className="whitespace-nowrap font-display font-black text-[clamp(8rem,20vw,18rem)] text-white uppercase leading-none"
          style={{
            animation: 'marqueeLeft 18s linear infinite',
            letterSpacing: '-0.02em',
          }}
        >
          {BIG_TEXT}{BIG_TEXT}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-white/10 rounded-full pointer-events-none animate-rotate-concentric flex items-center justify-center z-1">
        <div className="w-[400px] h-[400px] border border-dashed border-white/5 rounded-full absolute" />
      </div>

      <div className="relative z-5">
        <h2 className="font-display text-[clamp(3.2rem,7.5vw,6.8rem)] font-black leading-[0.88] uppercase text-fg max-w-[900px] mx-auto">
          Work with Mani. Give the Supari. Press this button.
          <MagneticButton href="mailto:gmanisandeep@gmail.com">
            GIVE THE SUPARI
          </MagneticButton>
        </h2>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
