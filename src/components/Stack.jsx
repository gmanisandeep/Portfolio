import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion } from 'framer-motion';

const DEV_STACK = [
  { name: 'HTML/CSS', icon: '🌐', color: '#e34f26' },
  { name: 'JavaScript', icon: '⚡', color: '#f7df1e' },
  { name: 'Node.js', icon: '🟩', color: '#339933' },
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'Express', icon: '🛤️', color: '#ffffff' },
  { name: 'Flutter', icon: '🐦', color: '#02569b' },
  { name: 'Python', icon: '🐍', color: '#3776ab' },
  { name: 'SQLite', icon: '🗃️', color: '#003b57' },
  { name: 'Firebase', icon: '🔥', color: '#ffca28' },
  { name: 'Git', icon: '🌿', color: '#f05032' },
  { name: 'REST APIs', icon: '🔗', color: '#a855f7' },
  { name: 'Gemini API', icon: '✨', color: '#4285f4' },
];

const CREATIVE_STACK = [
  { name: 'Filmmaking', icon: '🎬', color: '#ffd500' },
  { name: 'Premiere Pro', icon: '🎞️', color: '#9999ff' },
  { name: 'DaVinci', icon: '🎨', color: '#ff3333' },
  { name: 'UI/UX Design', icon: '✏️', color: '#ff7262' },
  { name: 'Canva', icon: '🖼️', color: '#00c4cc' },
  { name: 'Brand Design', icon: '💎', color: '#ffd500' },
  { name: 'Storyboarding', icon: '📋', color: '#f4f3ef' },
  { name: 'Photography', icon: '📷', color: '#ffffff' },
  { name: 'Music Videos', icon: '🎵', color: '#e13833' },
  { name: 'Documentary', icon: '🎙️', color: '#aaa' },
];

const ALL_SKILLS = [
  ...DEV_STACK.map(s => ({ ...s, side: 'dev' })),
  ...CREATIVE_STACK.map(s => ({ ...s, side: 'creative' }))
];

export default function Stack() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const skillsRef = useRef([]);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const inViewRef = useRef(false);

  // Bulletproof manual scroll trigger
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // If the top of the section enters the bottom 90% of the screen
      if (rect.top < window.innerHeight * 0.9) {
        setInView(true);
        inViewRef.current = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = Matter.Engine.create();
    engine.gravity.y = 1.2;
    
    const runner = Matter.Runner.create();
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width || window.innerWidth * 0.8;
    const h = rect.height || 600;

    const wallOpts = { isStatic: true, restitution: 0.3, friction: 0.5 };
    const thick = 200;
    const isMobile = window.innerWidth < 768;

    const walls = [
      Matter.Bodies.rectangle(w/2, h + thick/2, w * 2, thick, wallOpts),
      Matter.Bodies.rectangle(-thick/2, h/2, thick, h * 2, wallOpts),
      Matter.Bodies.rectangle(w + thick/2, h/2, thick, h * 2, wallOpts)
    ];

    if (!isMobile) {
      walls.push(Matter.Bodies.rectangle(w/2, h/2 + 50, 4, h - 100, wallOpts));
    }

    Matter.World.add(engine.world, walls);

    const bodies = [];
    skillsRef.current.forEach((el, index) => {
      if (!el) return;
      const data = ALL_SKILLS[index];
      
      const elWidth = el.offsetWidth || 150;
      const elHeight = el.offsetHeight || 40;
      
      const width = Math.max(elWidth, 40);
      const height = Math.max(elHeight, 20);
      
      let startX;
      if (isMobile) {
         startX = w/2 + (Math.random() - 0.5) * (w * 0.6);
      } else {
         startX = data.side === 'dev' 
           ? (w * 0.25) + (Math.random() - 0.5) * (w * 0.3) 
           : (w * 0.75) + (Math.random() - 0.5) * (w * 0.3);
      }
      
      const startY = -150 - (Math.random() * 300);

      const body = Matter.Bodies.rectangle(startX, startY, width, height, {
        angle: (Math.random() - 0.5) * 0.5,
        restitution: 0.5,
        friction: 0.1,
        frictionAir: 0.01,
        density: 0.02,
        chamfer: { radius: height / 2 },
        isStatic: true
      });
      
      body.plugin.domElement = el;
      bodies.push(body);
    });
    
    Matter.World.add(engine.world, bodies);

    let dropped = false;
    const dropInterval = setInterval(() => {
      if (inViewRef.current && !dropped) {
        dropped = true;
        bodies.forEach((body, i) => {
          setTimeout(() => {
            Matter.Body.setStatic(body, false);
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
          }, i * 35);
        });
        clearInterval(dropInterval);
      }
    }, 100);

    const mouse = Matter.Mouse.create(containerRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Matter.World.add(engine.world, mouseConstraint);

    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    mouse.element.removeEventListener("touchmove", mouse.mousemove);
    mouse.element.removeEventListener("touchstart", mouse.mousedown);
    mouse.element.removeEventListener("touchend", mouse.mouseup);

    Matter.Events.on(engine, 'afterUpdate', () => {
      bodies.forEach(body => {
        const el = body.plugin.domElement;
        if (el) {
          el.style.transform = `translate(${body.position.x}px, ${body.position.y}px) translate(-50%, -50%) rotate(${body.angle}rad)`;
        }
      });
    });

    Matter.Runner.run(runner, engine);
    setTimeout(() => setMounted(true), 100);

    return () => {
      clearInterval(dropInterval);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <section className="py-32 px-[5%] md:px-[10%] relative z-10" id="skills-section" ref={sectionRef}>
      
      <div className="font-display text-2xl tracking-[0.15em] text-accent-gold uppercase mb-12 flex items-center gap-6">
        002 — Stack
        <div className="flex-1 h-[1px] bg-fg/10" />
      </div>

      <div className="flex justify-between items-center mb-6 px-10 text-fg-muted font-mono text-sm tracking-[0.2em] uppercase select-none">
        <span className="hidden md:block">Dev Brain</span>
        <span className="hidden md:block">Film Eye</span>
      </div>

      <div 
        ref={containerRef}
        className="w-full h-[600px] md:h-[700px] relative rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-sm pointer-events-none"
      >
        <div className="hidden md:block absolute top-[50px] bottom-[50px] left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />

        {ALL_SKILLS.map((skill, i) => (
          <div
            key={i}
            ref={el => skillsRef.current[i] = el}
            className="absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none"
            style={{
              opacity: mounted ? 1 : 0,
              pointerEvents: mounted ? 'auto' : 'none',
              transform: mounted ? undefined : `translate(-999px, -999px)`,
            }}
          >
            <div 
              className="px-5 py-2.5 rounded-full border border-white/10 bg-[#0f0f0f]/80 backdrop-blur-md flex items-center gap-3 transition-colors duration-300 hover:border-white/30 hover:bg-[#1a1a1a]"
              style={{ 
                 boxShadow: `0 4px 20px rgba(0,0,0,0.5), inset 0 0 10px ${skill.color}15`
              }}
            >
              <span className="text-xl md:text-2xl drop-shadow-md">{skill.icon}</span>
              <span 
                className="font-heading font-black text-xs md:text-sm uppercase tracking-[0.15em] whitespace-nowrap"
                style={{ color: skill.color, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
              >
                {skill.name}
              </span>
            </div>
          </div>
        ))}
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md font-mono text-[0.6rem] tracking-[0.2em] text-white/50 uppercase pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Grab & Throw
        </motion.div>
      </div>
    </section>
  );
}
