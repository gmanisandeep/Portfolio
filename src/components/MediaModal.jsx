import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MediaModal({ isOpen, onClose }) {
  const showreelUrl = "https://player.vimeo.com/video/1002353346?autoplay=1&badge=0&autopause=0&player_id=0";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen bg-black/97 z-[10000] flex items-center justify-center backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="w-[90%] max-w-[950px] aspect-[16/9] bg-black relative shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 rounded"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute -top-12 right-0 bg-transparent border-none text-fg font-display text-2xl cursor-pointer hover:text-accent-red transition-colors duration-300"
              onClick={onClose}
            >
              ✕ CLOSE
            </button>
            <iframe
              className="w-full h-full border-none"
              src={showreelUrl}
              title="Showreel Player"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
