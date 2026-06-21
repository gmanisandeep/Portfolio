import React from 'react';
import { motion } from 'framer-motion';

const NAV_ICONS = {
  about: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  work: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  stack: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  contact: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

export default function CornerNav() {
  const links = [
    { id: 'about', href: '#about-section', label: 'About', className: 'top-9 left-9', dirX: 1, dirY: 1 },
    { id: 'work', href: '#work-section', label: 'Work', className: 'top-9 right-9 flex-row-reverse', dirX: -1, dirY: 1 },
    { id: 'stack', href: '#skills-section', label: 'Stack', className: 'bottom-9 left-9', dirX: 1, dirY: -1 },
    { id: 'contact', href: '#contact-section', label: 'Contact', className: 'bottom-9 right-9 flex-row-reverse', dirX: -1, dirY: -1 },
  ];

  return (
    <>
      <a
        href="#"
        className="fixed top-9 left-1/2 -translate-x-1/2 z-[1000] font-display font-black text-4xl text-fg tracking-[0.05em] bg-black/20 px-5 py-1 rounded transition-all hover:text-accent-red hover:scale-110"
      >
        MS<span className="text-accent-red">.</span>
      </a>

      {links.map((link, idx) => (
        <motion.a
          key={link.id}
          href={link.href}
          className={`fixed z-[999] text-fg font-display text-xl tracking-[0.05em] flex items-center gap-2.5 px-3.5 py-2 rounded bg-black/40 border border-fg/8 backdrop-blur-md transition-colors duration-300 hover:text-accent-gold hover:border-accent-gold hover:bg-black/80 hover:shadow-[0_5px_15px_rgba(255,213,0,0.15)] ${link.className}`}
          animate={{ y: [0, 4 * link.dirY, 0] }}
          transition={{ y: { repeat: Infinity, duration: 3 + idx * 0.5, ease: 'easeInOut' } }}
          whileHover={{ x: 6 * link.dirX, y: 6 * link.dirY, scale: 1.05 }}
        >
          <motion.div
            whileHover={{ scale: 1.3, rotate: 12 }}
            transition={{ type: 'spring', stiffness: 350, damping: 12 }}
          >
            {NAV_ICONS[link.id]}
          </motion.div>
          <span className="uppercase text-[0.8rem]">{link.label}</span>
        </motion.a>
      ))}
    </>
  );
}
