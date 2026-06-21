import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, AnimatePresence } from 'framer-motion';
import AppleEmoji from './AppleEmoji';

const stickers = [
  { id: 'films', emoji: '🎬', text: 'Films', desc: 'Cinematic visual storytelling and direction.', initialX: '12%', initialY: '18%', bg: '#111', textColor: '#f4f3ef', borderColor: '#f4f3ef', shadow: '4px 4px 0px rgba(255,213,0,0.9)', rotate: -6 },
  { id: 'code', emoji: '💻', text: 'Code', desc: 'Full-stack robust application development.', initialX: '85%', initialY: '48%', bg: '#e13833', textColor: '#f4f3ef', borderColor: '#f4f3ef', shadow: '4px 4px 0px #000', rotate: 8 },
  { id: 'kdm', emoji: '🌟', text: 'KDM', desc: 'Key Decision Making & Creative Direction.', initialX: '80%', initialY: '20%', bg: '#ffd500', textColor: '#000', borderColor: '#000', shadow: '4px 4px 0px #000', rotate: 15 },
  { id: 'ms', emoji: '🧠', text: 'MS.', desc: 'Mani Sandeep — The driving force behind the vision.', initialX: '85%', initialY: '75%', bg: '#000', textColor: '#ffd500', borderColor: '#ffd500', shadow: '4px 4px 0px rgba(244,243,239,0.8)', rotate: -4 }
];

const getRatio = (str) => parseInt(str) / 100;

export default function DraggableStickers() {
  const containerRef = useRef(null);
  const stickerRefs = useRef([]);
  const engineRef = useRef(null);
  const bodiesRef = useRef([]);
  const [mounted, setMounted] = useState(false);
  const [activeToast, setActiveToast] = useState(null);

  const handleStickerClick = (desc) => {
    setActiveToast(desc);
    setTimeout(() => setActiveToast(null), 3000);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const engine = Matter.Engine.create();
    engine.gravity.y = 0;
    engine.gravity.x = 0;
    engineRef.current = engine;
    
    const runner = Matter.Runner.create();
    
    const w = window.innerWidth;
    const h = window.innerHeight;

    const wallOpts = { isStatic: true, restitution: 0.8, friction: 0 };
    const thick = 100;
    const walls = [
      Matter.Bodies.rectangle(w/2, -thick/2, w * 2, thick, wallOpts),
      Matter.Bodies.rectangle(w/2, h + thick/2, w * 2, thick, wallOpts),
      Matter.Bodies.rectangle(-thick/2, h/2, thick, h * 2, wallOpts),
      Matter.Bodies.rectangle(w + thick/2, h/2, thick, h * 2, wallOpts)
    ];
    Matter.World.add(engine.world, walls);

    const bodies = [];
    stickerRefs.current.forEach((el, index) => {
      if (!el) return;
      const data = stickers[index];
      
      const width = el.offsetWidth || 120;
      const height = el.offsetHeight || 50;
      
      const startX = w * getRatio(data.initialX);
      const startY = h * getRatio(data.initialY);
      
      const body = Matter.Bodies.rectangle(startX, startY, width, height, {
        angle: data.rotate * (Math.PI / 180),
        restitution: 0.8, 
        frictionAir: 0.02, 
        friction: 0.05,
        density: 0.01,
      });
      
      body.plugin.domElement = el;
      bodies.push(body);
    });
    
    bodiesRef.current = bodies;
    Matter.World.add(engine.world, bodies);

    // Native Matter.js Mouse Constraint bound ONLY to the local container
    const mouse = Matter.Mouse.create(containerRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Matter.World.add(engine.world, mouseConstraint);

    // Disable matter.js scroll wheel hijacking which ruins the site experience
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    // Also disable touch scroll hijacking so mobile users can still scroll the page if they don't hit a sticker
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
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute pointer-events-none z-[90] overflow-hidden inset-0"
    >
      {stickers.map((sticker, i) => (
        <div
          key={sticker.id}
          ref={el => stickerRefs.current[i] = el}
          className="absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
            pointerEvents: mounted ? 'auto' : 'none',
            transform: `translate(-999px, -999px)`,
          }}
        >
          <motion.div
            whileTap={{ scale: 0.85 }}
            onPointerDown={() => handleStickerClick(sticker.desc)}
            className="group hover:scale-110 transition-transform duration-200"
            style={{
              background: sticker.bg,
              color: sticker.textColor,
              border: `2px solid ${sticker.borderColor}`,
              boxShadow: sticker.shadow,
              padding: '6px 14px',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: '"Londrina Solid", sans-serif',
              fontSize: '1.05rem',
              userSelect: 'none',
            }}
          >
            <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>
              <AppleEmoji emoji={sticker.emoji} />
            </span>
            <span>{sticker.text}</span>
          </motion.div>
        </div>
      ))}

      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-sm uppercase tracking-widest rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-[100] pointer-events-none"
          >
            {activeToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
