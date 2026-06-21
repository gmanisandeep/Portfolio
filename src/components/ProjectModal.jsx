import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectModal({ projectIndex, onClose }) {
  const modalData = [
    {
      title: "IRE Expo 2026",
      category: "Full-Stack Platform",
      emoji: "⚡",
      desc: "An event management ecosystem engineered for the high-traffic Indian Real Estate Expo. It replaces fragmented workflows with a single unified workspace. Features an optimized administrative SPA dashboard, real-time SVG floor plan stall selection, live payment ledger sync, and automated invoicing.",
      role: "Lead Full-Stack Developer",
      stack: "Node.js, Express, SQLite, SVG/Vanilla JS",
      duration: "3 Months (Deployed Live)",
      achievement: "Managed 500+ commercial stall bookings with zero conflicts and real-time ledger auditing."
    },
    {
      title: "Twinkle AI Operator",
      category: "AI Agent Platform",
      emoji: "🤖",
      desc: "A futuristic personal operating console built under Antigravity Labs. Twinkle is an AI agent running locally and in the cloud, offering voice-controlled UI automation, long-term semantic memory lookup, real-time web querying, and execution of local device commands.",
      role: "AI & Platform Architect",
      stack: "Python, FastAPI, Gemini API, Firebase",
      duration: "Ongoing Research Project",
      achievement: "Achieved sub-1.2s voice-to-action responses using Gemini structured JSON outputs."
    },
    {
      title: "LifeOS Mobile",
      category: "Mobile OS App",
      emoji: "📱",
      desc: "LifeOS is a mobile dashboard designed to act as a personal command center. It bundles schedules, deep work checklists, habit loops, and notes. It features 'Benny', a local AI assistant that helps schedule days dynamically using contextual data.",
      role: "Mobile Product Lead",
      stack: "Flutter, Dart, Firebase, Gemini API",
      duration: "4 Months",
      achievement: "Shipped beautiful typography-driven UI optimized for low distraction, used by beta testers."
    },
    {
      title: "CampusConnect",
      category: "Full-Stack App",
      emoji: "🎓",
      desc: "A comprehensive university information system with secure role-based portals for students, faculty members, and system administrators. Features real-time grade charts, class scheduling calendars, assignment submission lockers, and administrative auditing logs.",
      role: "Full-Stack Developer",
      stack: "React, Node.js, Express, PostgreSQL",
      duration: "2 Months",
      achievement: "Successfully modeled relational database schema with full row-level isolation policies."
    },
    {
      title: "Short Films & Visual Direction",
      category: "Creative Filmmaking",
      emoji: "🎬",
      desc: "A collection of cinematic creative endeavors including screenplays, visual storyboarding, short film direction, music video concepts, and corporate advertising assets. Focuses on high-contrast lighting designs, visual symmetry, and narrative editing.",
      role: "Director / Writer / Editor",
      stack: "Premiere Pro, DaVinci Resolve, Storyboarding",
      duration: "2024 - 2026",
      achievement: "Directed three independent short films, focusing on editorial pacing and atmospheric soundscapes."
    },
    {
      title: "RAFTAAR The Band",
      category: "Creative & Brand",
      emoji: "🎸",
      desc: "Strategic creative consulting, brand strategy, design, and social media coordination for RAFTAAR, an active regional music band. Sculpted visual aesthetics for gig flyers, designed merchandise kits, and coordinated high-impact social media reel campaigns.",
      role: "Creative Director",
      stack: "Canva, Illustrator, Social Strategy",
      duration: "1 Year Engagement",
      achievement: "Increased gig attendance by 200% and digital impressions by 320% through curated typography and video aesthetics."
    }
  ];

  const project = projectIndex !== null ? modalData[projectIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (project !== null) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project !== null && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen z-[10100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="w-[90%] max-w-[1100px] aspect-auto lg:aspect-[2.2/1] bg-black border border-fg/10 shadow-[0_35px_70px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden rounded"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              className="absolute top-6 right-6 bg-black/70 border border-white/15 text-fg w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all hover:bg-accent-gold hover:border-accent-gold hover:text-black hover:rotate-90 z-20"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] h-full w-full overflow-y-auto lg:overflow-visible">
              <div className="bg-[#0d0d0d] border-b lg:border-b-0 lg:border-r border-fg/10 relative flex items-center justify-center overflow-hidden min-h-[220px] lg:min-h-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.85)_120%)]"></div>
                <div className="text-8xl z-10 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]">
                  {project.emoji}
                </div>
              </div>

              <div className="p-8 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-[#0a0a0a] to-[#050505] overflow-y-auto max-h-[500px] lg:max-h-none">
                <div className="font-heading text-[0.68rem] font-black tracking-[0.22em] text-accent-gold uppercase mb-3">
                  {project.category}
                </div>
                <h3 className="font-display text-4xl lg:text-5xl font-black mb-6 leading-[0.95] text-fg uppercase">
                  {project.title}
                </h3>
                <p className="text-base leading-7 text-fg/60 mb-8 font-light">
                  {project.desc}
                </p>

                <div className="grid grid-cols-2 gap-6 border-t border-fg/10 pt-6">
                  <div>
                    <div className="font-heading text-[0.58rem] font-black text-fg/35 tracking-[0.15em] uppercase mb-1">
                      My Role
                    </div>
                    <div className="text-sm text-fg font-medium">{project.role}</div>
                  </div>
                  <div>
                    <div className="font-heading text-[0.58rem] font-black text-fg/35 tracking-[0.15em] uppercase mb-1">
                      Tech Stack
                    </div>
                    <div className="text-sm text-fg font-medium">{project.stack}</div>
                  </div>
                  <div>
                    <div className="font-heading text-[0.58rem] font-black text-fg/35 tracking-[0.15em] uppercase mb-1">
                      Duration
                    </div>
                    <div className="text-sm text-fg font-medium">{project.duration}</div>
                  </div>
                  <div>
                    <div className="font-heading text-[0.58rem] font-black text-fg/35 tracking-[0.15em] uppercase mb-1">
                      Key Achievement
                    </div>
                    <div className="text-sm text-fg font-medium">{project.achievement}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
