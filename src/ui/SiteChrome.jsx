import { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight, Download, Menu, X } from 'lucide-react';
import { sections } from '../data/portfolio';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? window.scrollY / available : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div className="scroll-track" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>;
}

export function Brand({ homeHref = '#top', footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href={homeHref} aria-label="MS. — Mani Sandeep, home">
    <span className="brand-mark">MS<span className="brand-dot">.</span></span><span className="brand-name">Mani Sandeep</span>
  </a>;
}

export function Header({ internal = false }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    if (internal) return undefined;
    const targets = [...document.querySelectorAll('main section[id]')];
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.3;
      const current = targets.reduce((selected, section) => section.getBoundingClientRect().top <= marker ? section : selected, targets[0]);
      setActive(current?.id || 'top');
    };
    const observer = new IntersectionObserver(updateActiveSection, { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.45] });
    targets.forEach((target) => observer.observe(target));
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', updateActiveSection); };
  }, [internal]);

  const prefix = internal ? '/' : '';
  return <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}><div className="nav-shell">
    <Brand homeHref={internal ? '/' : '#top'} />
    <button className="menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="primary-nav" className={open ? 'nav-open' : ''} aria-label="Primary navigation">
      <span className="mobile-brand-name">MS. — Gouda Mani Sandeep</span>
      {sections.map((item) => {
        const id = item.toLowerCase();
        return <a key={item} className={!internal && active === id ? 'is-active' : ''} aria-current={!internal && active === id ? 'location' : undefined} href={`${prefix}#${id}`} onClick={() => setOpen(false)}>{item}</a>;
      })}
      <a href="/Mani-Sandeep-Resume.pdf" download>Résumé <Download size={14} /></a>
      <a className="button button-dark" href={`${prefix}#contact`} onClick={() => setOpen(false)}>Start a Project <ArrowUpRight size={16} /></a>
    </nav>
  </div></header>;
}

function SocialIcon({ children }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">{children}</svg>;
}

const GithubLogo = () => <SocialIcon><path d="M12 2.2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 7.99c.85 0 1.7.11 2.49.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2.2Z" /></SocialIcon>;
const LinkedinLogo = () => <SocialIcon><path d="M5.15 3.75A2.15 2.15 0 1 1 .85 3.75a2.15 2.15 0 0 1 4.3 0ZM1.1 8h4.1v12.1H1.1V8Zm6.6 0h3.93v1.65h.05c.55-1.04 1.89-2.14 3.89-2.14 4.16 0 4.93 2.74 4.93 6.3v6.29h-4.1v-5.58c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.68H7.7V8Z" /></SocialIcon>;
const InstagramLogo = () => <SocialIcon><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.1 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></SocialIcon>;
const XLogo = () => <SocialIcon><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.4L6.47 22H3.36l7.24-8.28L3 2h6.4l4.42 5.84L18.9 2Zm-1.1 18h1.73L8.46 3.9H6.6L17.8 20Z" /></SocialIcon>;

export function Footer({ internal = false }) {
  const prefix = internal ? '/' : '';
  return <footer><div className="shell footer-main"><div><Brand homeHref="/" footer /><p className="footer-name">Gouda Mani Sandeep</p></div><p>Web developer and AI builder creating clear, responsive digital products from Hyderabad.</p><nav aria-label="Footer navigation"><a href={`${prefix}#work`}>Work</a><a href={`${prefix}#services`}>Services</a><a href={`${prefix}#about`}>About</a><a href={`${prefix}#contact`}>Contact</a></nav><div className="socials"><a href="https://github.com/gmanisandeep" aria-label="GitHub" target="_blank" rel="noreferrer"><GithubLogo /></a><a href="https://www.linkedin.com/in/manisandeepg/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><LinkedinLogo /></a><a href="https://www.instagram.com/manisandeepg/" aria-label="Instagram" target="_blank" rel="noreferrer"><InstagramLogo /></a><a href="https://x.com/manisandeepg" aria-label="X" target="_blank" rel="noreferrer"><XLogo /></a></div></div>
    <div className="shell footer-bottom"><span>© 2026 Mani Sandeep</span><a href="#top">Back to top <ArrowUp /></a></div></footer>;
}

export { GithubLogo };
