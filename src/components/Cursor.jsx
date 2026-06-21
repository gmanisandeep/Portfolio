import React, { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX, curY = mouseY;
    let curW = 10, curH = 10;
    let targetW = 10, targetH = 10;
    let isHovering = false;
    let activeElement = null;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      try {
        let destX = mouseX;
        let destY = mouseY;

        if (activeElement) {
          const rect = activeElement.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          destX = centerX + (mouseX - centerX) * 0.15;
          destY = centerY + (mouseY - centerY) * 0.15;
          
          targetW = rect.width + 12;
          targetH = rect.height + 12;
        }

        curX += (destX - curX) * 0.25;
        curY += (destY - curY) * 0.25;
        curW += (targetW - curW) * 0.25;
        curH += (targetH - curH) * 0.25;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
          dotRef.current.style.width = `${curW}px`;
          dotRef.current.style.height = `${curH}px`;
          
          if (activeElement) {
              dotRef.current.style.backgroundColor = '#ffffff';
              try {
                const radius = window.getComputedStyle(activeElement).borderRadius;
                dotRef.current.style.borderRadius = radius && radius !== '0px' ? radius : '8px';
              } catch(e) {
                dotRef.current.style.borderRadius = '8px';
              }
          } else if (isHovering) {
              dotRef.current.style.backgroundColor = '#e13833';
              dotRef.current.style.borderRadius = '50%';
          } else {
              dotRef.current.style.backgroundColor = '#ffd500';
              dotRef.current.style.borderRadius = '50%';
          }
        }
      } catch (err) {
        console.error("Cursor animation error:", err);
      }
      raf = requestAnimationFrame(animate);
    };

    const onOver = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;

      const interactive = target.closest('a, button, [role="button"]');
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        if (rect.width < 450 && rect.height < 150) {
          activeElement = interactive;
        } else {
          isHovering = true;
          targetW = 16;
          targetH = 16;
        }
      }
    };

    const onOut = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;

      if (target.closest('a, button, [role="button"]')) {
        isHovering = false;
        activeElement = null;
        targetW = 10;
        targetH = 10;
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          backgroundColor: '#ffd500',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          transition: 'border-radius 0.2s ease, background-color 0.2s ease',
          willChange: 'transform, width, height',
        }}
      />
      <style>{`
        @media (pointer: fine) {
          body { cursor: none !important; }
          a, button, [role="button"] { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
