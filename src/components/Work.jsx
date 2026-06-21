import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

export default function Work({ onProjectClick }) {
  const targetRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Track moves horizontally. -75% is usually a perfect ratio for 6 large items + padding
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  
  // Background typography moves in opposite direction slightly for massive parallax
  const bgX = useTransform(scrollYProgress, [0, 1], ["5%", "-20%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh]" id="work-section">
      <motion.div 
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden transition-colors duration-700 ease-out"
        animate={{
          backgroundColor: hoveredProject !== null ? `${projects[hoveredProject].accent}15` : '#080808'
        }}
      >
        
        {/* Massive Cinematic Background Typography */}
        <motion.div 
          className="absolute top-1/2 left-0 -translate-y-1/2 text-[clamp(8rem,25vw,30rem)] font-display font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0 tracking-tighter"
          style={{ x: bgX }}
        >
          DIRECTOR'S CUT
        </motion.div>

        {/* Header HUD */}
        <div className="absolute top-0 left-0 w-full p-8 md:p-[10vw] flex justify-between items-start z-20 pointer-events-none">
          <div className="font-mono text-xs tracking-[0.2em] text-accent-gold uppercase flex items-center gap-4">
            <span>003 — Work</span>
            <div className="w-12 h-[1px] bg-accent-gold/50" />
          </div>
          
          {/* Scroll Progress Indicator for the film strip */}
          <div className="w-[150px] flex items-center gap-4">
            <span className="font-mono text-[10px] text-fg-muted">SCROLL</span>
            <div className="h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-accent-gold"
                 style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
               />
            </div>
          </div>
        </div>

        {/* The Film Strip (Horizontal Scrolling Track) */}
        <motion.div 
          className="flex items-center gap-10 md:gap-20 pl-[10vw] z-10 w-max"
          style={{ x }}
        >
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href="#"
              data-cursor-text="VIEW"
              className="relative w-[85vw] md:w-[50vw] max-w-[900px] aspect-[16/10] flex-shrink-0 group block border border-fg/10 rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={(e) => {
                e.preventDefault();
                onProjectClick(index);
              }}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Image Parallax Wrapper inside card */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                {project.image && (
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-[110%] h-[110%] object-cover -left-[5%] -top-[5%] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] filter saturate-[0.6] contrast-[1.1] brightness-[0.5] group-hover:scale-[1.03] group-hover:saturate-[0.9] group-hover:brightness-[0.7]"
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>

              {/* Accent Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${project.accent}25 0%, transparent 70%)`,
                }}
              />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <div className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-fg-muted uppercase mb-3 flex items-center gap-3">
                    <span className="text-accent-gold">{project.number}</span>
                    <span>/</span>
                    {project.tags.map((tag, tIdx) => (
                      <React.Fragment key={tIdx}>
                        {tIdx > 0 && <span className="opacity-50">•</span>}
                        <span className="text-fg/70">{tag}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <h2 
                    className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.9] text-fg uppercase tracking-[-0.02em]"
                    style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
                  >
                    {project.title}
                  </h2>
                </div>

                {/* Director's Mark / Play Button style */}
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white/50 bg-black/40 backdrop-blur-md flex-shrink-0 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:scale-110">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform">
                    <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Top Right Cinematic Details */}
              <div className="absolute top-8 right-8 flex flex-col items-end gap-2 z-10 pointer-events-none">
                 <div className="font-mono text-[0.55rem] tracking-[0.3em] text-white/30 uppercase">
                    REC
                 </div>
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </div>
            </motion.a>
          ))}
          
          {/* Spacer to ensure the last card can scroll fully into view */}
          <div className="w-[10vw] flex-shrink-0" />
        </motion.div>
      </motion.div>
    </section>
  );
}
