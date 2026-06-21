import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const stickers = [
  { id: 'clapper', emoji: '🎬', text: 'CUT!', initialX: '12%', initialY: '18%', bg: '#111', textColor: '#f4f3ef', borderColor: '#f4f3ef', shadow: '4px 4px 0px rgba(255,213,0,0.9)', rotate: -6 },
  { id: 'dev', emoji: '💻', text: '<DEV/>', initialX: '85%', initialY: '48%', bg: '#e13833', textColor: '#f4f3ef', borderColor: '#f4f3ef', shadow: '4px 4px 0px #000', rotate: 8 },
  { id: 'magic', emoji: '🌟', text: 'MAGIC', initialX: '80%', initialY: '20%', bg: '#ffd500', textColor: '#000', borderColor: '#000', shadow: '4px 4px 0px #000', rotate: 15 },
  { id: 'reel', emoji: '🎞️', text: 'REEL', initialX: '85%', initialY: '75%', bg: '#000', textColor: '#ffd500', borderColor: '#ffd500', shadow: '4px 4px 0px rgba(244,243,239,0.8)', rotate: -4 }
];

const getRatio = (str) => parseInt(str) / 100;

export default function DraggableStickers() {
  const containerRef = useRef(null);
  const stickerRefs = useRef([]);
  const engineRef = useRef(null);
  const bodiesRef = useRef([]);
  const [mounted, setMounted] = useState(false);

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
          <div
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
            <span style={{ fontSize: '1.25rem' }}>{sticker.emoji}</span>
            <span>{sticker.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
