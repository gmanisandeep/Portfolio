import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import MarqueeTicker from './MarqueeTicker';
import DraggableStickers from './DraggableStickers';

export default function Hero({ onPlayClick }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = (clientX - centerX) / centerX;
      const y = (clientY - centerY) / centerY;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="min-h-screen relative flex flex-col justify-center items-center py-32 px-[5%] overflow-hidden bg-[radial-gradient(circle_at_50%_30%,#15191b_0%,#080808_80%)]">
      <DraggableStickers />
      <motion.div
        className="absolute pointer-events-none opacity-[0.12] z-1 top-[5%] left-[-10%] text-8xl animate-drift-left"
        animate={{ x: mousePosition.x * -45, y: mousePosition.y * -35 }}
        transition={{ type: 'spring', stiffness: 60, damping: 25 }}
      >☁️</motion.div>
      <motion.div
        className="absolute pointer-events-none opacity-[0.12] z-1 bottom-[15%] right-[-10%] text-8xl animate-drift-right"
        animate={{ x: mousePosition.x * 50, y: mousePosition.y * 30 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >☁️</motion.div>

      <div className="relative z-5 text-center w-full max-w-[1000px]">
        <motion.h1
          className="font-display text-[clamp(3.8rem,8.5vw,7.5rem)] font-black leading-[0.88] tracking-[-0.01em] uppercase mb-6 text-fg drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            x: mousePosition.x * -18,
            translateY: mousePosition.y * -12,
          }}
          transition={{
            y: { duration: 0.8, ease: 'easeOut' },
            x: { type: 'spring', stiffness: 100, damping: 30 },
            translateY: { type: 'spring', stiffness: 100, damping: 30 },
          }}
        >
          Film brain.<br />
          <span className="text-accent-gold">Dev hands.</span>
        </motion.h1>

        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <MarqueeTicker speed={38} />
        </motion.div>

        <motion.p
          className="text-xl leading-8 text-fg/65 max-w-[600px] mx-auto mb-14 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: mousePosition.x * -8,
            translateY: mousePosition.y * -6,
          }}
          transition={{
            y: { duration: 0.8, delay: 0.1, ease: 'easeOut' },
            x: { type: 'spring', stiffness: 100, damping: 30 },
            translateY: { type: 'spring', stiffness: 100, damping: 30 },
          }}
        >
          I'm Mani Sandeep — developer, designer, and filmmaker who builds digital experiences that don't just look good. They actually work.
        </motion.p>

        <motion.div
          className="w-full max-w-[900px] aspect-[16/9] bg-[#0f0f0f] border border-fg/10 relative rounded overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] mx-auto cursor-pointer group"
          data-cursor-text="PLAY"
          onClick={onPlayClick}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: mousePosition.x * -4,
            translateY: mousePosition.y * -3,
          }}
          transition={{
            scale: { duration: 1, delay: 0.2, ease: 'easeOut' },
            opacity: { duration: 1, delay: 0.2, ease: 'easeOut' },
            x: { type: 'spring', stiffness: 100, damping: 30 },
            translateY: { type: 'spring', stiffness: 100, damping: 30 },
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,#150808,#081115,#0a0815,#150e08)] bg-[length:400%_400%] animate-gradient-flow opacity-70" />
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-[2] opacity-30"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
            }}
          />
          <div className="absolute inset-0 z-[3]" style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)' }} />
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/20 z-[4]" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/20 z-[4]" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/20 z-[4]" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/20 z-[4]" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 font-heading font-black text-[0.6rem] tracking-[0.3em] text-white/20 uppercase z-[4]">
            SHOWREEL 2026
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/20 z-10 transition-all duration-300 group-hover:bg-black/5">
            <motion.div
              className="w-[90px] h-[90px] bg-fg text-black rounded-full flex items-center justify-center font-display text-[1.8rem] tracking-[0.05em] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              whileHover={{ scale: 1.12, backgroundColor: '#ffd500', boxShadow: '0 10px 40px rgba(255, 213, 0, 0.35)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              PLAY
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
