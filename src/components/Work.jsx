import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const projects = [
  {
    title: 'IRE Expo 2026',
    tags: ['Node.js', 'Express'],
    gradient: 'from-[#110505] via-[#1e0808] to-[#301010]',
    accent: '#ff6b35',
    desc: 'Full-Stack Real Estate Platform',
    image: '/ire_expo_thumb.png',
    number: '01',
  },
  {
    title: 'Twinkle AI',
    tags: ['Python', 'Gemini API'],
    gradient: 'from-[#050b11] via-[#060f18] to-[#102130]',
    accent: '#00e5ff',
    desc: 'AI Agent Platform',
    image: '/twinkle_ai_thumb.png',
    number: '02',
  },
  {
    title: 'LifeOS Mobile',
    tags: ['Flutter', 'Firebase'],
    gradient: 'from-[#0f0511] via-[#130a1a] to-[#281030]',
    accent: '#c084fc',
    desc: 'Mobile OS App',
    image: '/lifeos_thumb.png',
    number: '03',
  },
  {
    title: 'CampusConnect',
    tags: ['React', 'Node.js'],
    gradient: 'from-[#05110c] via-[#081a10] to-[#103022]',
    accent: '#4ade80',
    desc: 'University Platform',
    image: '/campus_connect_thumb.png',
    number: '04',
  },
  {
    title: 'Short Films',
    tags: ['Visuals', 'Premiere'],
    gradient: 'from-[#110f05] via-[#1a170a] to-[#302a10]',
    accent: '#ffd500',
    desc: 'Creative Filmmaking',
    image: '/short_films_thumb.png',
    number: '05',
  },
  {
    title: 'RAFTAAR Band',
    tags: ['Branding', 'Illustrator'],
    gradient: 'from-[#11050e] via-[#180a14] to-[#301027]',
    accent: '#f472b6',
    desc: 'Creative & Brand',
    image: '/raftaar_band_thumb.png',
    number: '06',
  },
];

const Card = ({ i, project, progress, total, onProjectClick }) => {
  const containerRef = useRef(null);
  
  // Internal scroll tracker for the parallax effect on the image
  const { scrollYProgress: imageProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });
  
  const imageScale = useTransform(imageProgress, [0, 1], [1.5, 1]);

  // Overall section progress tracks when this card shrinks
  // The card starts shrinking when the NEXT card hits the top of the screen.
  // If there are 6 cards, each card "occupies" 1/6th of the scroll progress.
  const startShrink = i / total;
  const endShrink = startShrink + (1 / total); // Shrinks fully by the time the next card is locked in
  
  const targetScale = 1 - ((total - i) * 0.04);
  const scale = useTransform(progress, [startShrink, 1], [1, targetScale]);
  
  const opacity = useTransform(progress, [startShrink, startShrink + 0.3], [1, 0.4]);

  return (
    <div ref={containerRef} className="h-screen sticky top-0 flex items-center justify-center p-[5vw] z-10 pointer-events-none">
      <motion.a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onProjectClick(i);
        }}
        data-cursor-text="VIEW"
        className="relative flex flex-col w-[95vw] md:w-[70vw] max-w-[1200px] aspect-[4/5] md:aspect-[16/9] rounded-2xl md:rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden origin-top group pointer-events-auto"
        style={{ 
          scale, 
          opacity, 
          top: `calc(10vh + ${i * 20}px)` 
        }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          {project.image && (
            <motion.img
              src={project.image}
              alt={project.title}
              style={{ scale: imageScale }}
              className="absolute inset-0 w-full h-full object-cover filter saturate-[0.7] contrast-[1.1] brightness-[0.6] group-hover:scale-[1.02] group-hover:saturate-[1] group-hover:brightness-[0.8] transition-all duration-700 ease-out"
            />
          )}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 mix-blend-overlay`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        {/* Highlight glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen z-10"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}30 0%, transparent 70%)` }}
        />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="font-mono text-[0.65rem] md:text-xs font-bold tracking-[0.2em] text-fg-muted uppercase mb-3 flex items-center gap-3">
              <span className="text-accent-gold">{project.number}</span>
              <span className="text-fg/30">/</span>
              {project.tags.map((tag, tIdx) => (
                <React.Fragment key={tIdx}>
                  {tIdx > 0 && <span className="opacity-30">•</span>}
                  <span className="text-fg/70">{tag}</span>
                </React.Fragment>
              ))}
            </div>
            <h2 
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.9] text-fg uppercase tracking-[-0.02em]"
              style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
            >
              {project.title}
            </h2>
          </div>

          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center text-white/50 bg-black/40 backdrop-blur-md flex-shrink-0 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:scale-110">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform">
              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="absolute top-6 right-6 md:top-8 md:right-8 flex flex-col items-end gap-2 z-20 pointer-events-none">
            <div className="font-mono text-[0.55rem] tracking-[0.3em] text-white/30 uppercase">
              REC
            </div>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </div>
      </motion.a>
    </div>
  )
}

export default function Work({ onProjectClick }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const [activeProject, setActiveProject] = useState(0);

  // Dynamically change the background color of the section based on which card is in focus
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof latest !== 'number' || isNaN(latest)) return;
    // Math.round is used so the color changes halfway through the scroll between cards
    const index = Math.min(
      Math.max(Math.round(latest * (projects.length - 1)), 0), 
      projects.length - 1
    );
    setActiveProject(index);
  });

  return (
    <section ref={containerRef} className="relative w-full pb-[10vh]" id="work-section">
      
      {/* Dynamic Background Illumination */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full transition-colors duration-1000 ease-out z-0 pointer-events-none"
        animate={{
          backgroundColor: `${projects[activeProject]?.accent || '#000000'}15`
        }}
      />

      {/* Cinematic Header */}
      <div className="sticky top-0 left-0 w-full p-8 md:p-[5vw] flex justify-between items-start z-20 pointer-events-none">
        <div className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase flex items-center gap-4">
          <span>003 — Work</span>
          <div className="w-12 h-[1px] bg-accent-gold/50" />
        </div>
        <div className="w-[100px] md:w-[150px] flex items-center gap-4">
          <span className="font-mono text-[10px] text-fg-muted">SCROLL</span>
          <div className="h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent-gold"
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              />
          </div>
        </div>
      </div>

      {/* The 3D Sticky Deck */}
      <div className="relative z-10 pt-20">
        {projects.map((project, i) => (
          <Card 
            key={i} 
            i={i} 
            total={projects.length} 
            project={project} 
            progress={scrollYProgress} 
            onProjectClick={onProjectClick} 
          />
        ))}
      </div>

    </section>
  );
}
