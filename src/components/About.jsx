import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function useScramble(targetText, trigger) {
  const [display, setDisplay] = useState(targetText);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*';
  const frameRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 22;
    const run = () => {
      frame++;
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * targetText.length);
      const scrambled =
        targetText.slice(0, revealed) +
        Array.from({ length: targetText.length - revealed })
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join('');
      setDisplay(scrambled);
      if (frame < totalFrames) frameRef.current = requestAnimationFrame(run);
      else setDisplay(targetText);
    };
    frameRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger, targetText]);

  return display;
}

export default function About() {
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef(null);

  const line1 = useScramble('Code is King.', hasEntered);
  const line2 = useScramble('Film is Baap', hasEntered);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '5+', label: 'Real projects shipped' },
    { value: '3', label: 'Languages spoken' },
    { value: '20', label: 'Years young' },
    { value: '∞', label: 'Ideas in the pipeline' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-[10%] bg-[#0c120e] bg-[radial-gradient(circle_at_10%_20%,rgba(20,35,25,0.4)_0%,transparent_80%)] overflow-hidden"
      id="about-section"
    >
      <img
        src="https://cdn.prod.website-files.com/663da8ca8ef7ad9c14d69221/667c13c3cf1c1177bdaf6199_Leaves%20silhouette.avif"
        alt=""
        className="absolute bottom-0 right-[-5%] w-[40%] max-w-[450px] pointer-events-none opacity-[0.12] invert rotate-[-10deg]"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center relative z-5">
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-[clamp(2.8rem,6vw,4.8rem)] font-black leading-[0.95] tracking-[-0.01em] uppercase mb-8 text-fg">
            <span style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>
              {line1}
            </span>
            <br />
            <span className="text-accent-gold">{line2}</span>
            <span className="text-accent-red">*</span>.
          </h2>
          <p className="text-[1.15rem] leading-[1.85] text-fg/65 mb-9 max-w-[600px] font-light">
            I started coding because I had to. I stayed because I found a way to use it for what I actually love — creating.
          </p>
          <p className="text-[1.15rem] leading-[1.85] text-fg/65 mb-9 max-w-[600px] font-light">
            Mani Sandeep is where what's trending meets what's next. Powered by stories that celebrate shared identities, we're not just writing lines of code — we're shaping culture. Carving out digital products that matter, bringing them seamlessly into the rhythm of everyday life.
          </p>
          <div className="font-body text-xs text-fg/40 mt-6">
            *The godfather, all-knowing, supreme ruler.
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/[0.02] border border-fg/5 rounded p-9 hover:border-accent-gold hover:bg-accent-gold/[0.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="font-display text-5xl text-accent-gold mb-2">{stat.value}</h3>
              <p className="font-heading text-[0.65rem] font-bold tracking-[0.15em] text-fg/40 uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
