import React, { useState } from 'react';
import Preloader from './components/Preloader';
import CornerNav from './components/CornerNav';
import Hero from './components/Hero';
import About from './components/About';
import Stack from './components/Stack';
import Work from './components/Work';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import MediaModal from './components/MediaModal';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';

// Animated section divider that draws itself on scroll
function AnimatedDivider() {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-[1px] mx-[10%] overflow-visible flex items-center">
      <div
        className="absolute left-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent transition-all duration-1000 ease-out"
        style={{ width: visible ? '100%' : '0%' }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent-gold/40 rotate-45 transition-all duration-500 delay-500"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}

export default function App() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  return (
    <>
      {/* Global Enhancements */}
      <div className="film-grain" />
      <Cursor />
      <ScrollProgress />

      {/* Loading Splash */}
      <Preloader />

      {/* Screen navigation HUD */}
      <CornerNav />

      {/* Main flow */}
      <main className="relative z-10 w-full min-h-screen">
        <Hero onPlayClick={() => setIsMediaOpen(true)} />
        <AnimatedDivider />
        <About />
        <AnimatedDivider />
        <Stack />
        <AnimatedDivider />
        <Work onProjectClick={(index) => setSelectedProjectIndex(index)} />
        <ContactCTA />
      </main>

      <Footer />

      {/* Fullscreen Video overlay */}
      <MediaModal isOpen={isMediaOpen} onClose={() => setIsMediaOpen(false)} />

      {/* Cinematic Detail popup */}
      <ProjectModal
        projectIndex={selectedProjectIndex}
        onClose={() => setSelectedProjectIndex(null)}
      />
    </>
  );
}
