import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowUp, ArrowUpRight, Clock3, Download,
  ExternalLink, Mail, MapPin, Menu,
  MessageCircle, ShieldCheck, X,
} from 'lucide-react';

const projects = [
  {
    slug: 'dhan', type: 'Client work', status: 'Live', year: '2026', category: 'Renewable energy · Business · Events',
    title: 'Dhan Enterprises & IRE Expo 2026', contribution: 'Full-stack website development',
    summary: 'A public business and event platform that connects renewable-energy services, expo communication and registration workflows.',
    problem: 'The client needed one credible digital home for its services and IRE Expo 2026, with clear event information, registrations and internal data management.',
    solution: 'I designed responsive service and event pages, built registration workflows and supported administrative functionality for submitted data.',
    outcome: 'The public site is deployed and used for IRE Expo 2026 information and online registrations.',
    role: 'Independent design and development across the public website, registration journeys, event content and ongoing updates.',
    constraints: ['Changing event requirements', 'Public information and internal workflows had to stay aligned', 'Registration paths needed to work clearly on mobile'],
    decisions: ['Separated company services from expo-specific actions', 'Made registration and stall-booking actions persistent', 'Designed content and administrative workflows as one system'],
    lessons: 'Event platforms work best when public content, conversion paths and internal data handling are planned together.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Backend integration', 'Admin dashboard'],
    url: 'https://www.win-dhan.com', image: '/work/dhan-desktop.webp', detail: '/work/dhan-detail.webp', width: 1272, height: 716,
  },
  {
    slug: 'suprabha', type: 'Client work', status: 'Live', year: '2026', category: 'Nonprofit · Knowledge platform',
    title: 'Suprabha Trust Knowledge Bank', contribution: 'Frontend design and development',
    summary: 'A refined nonprofit website and structured Knowledge Bank for spiritual and educational content.',
    problem: 'The trust needed a modern mobile experience and a clearer way to organise and discover a growing educational archive.',
    solution: 'I improved responsive behaviour and created category organisation, search, filtering, article pages and metadata enhancements.',
    outcome: 'The upgraded site and publicly accessible Knowledge Bank are deployed for visitors to browse structured content.',
    role: 'Frontend implementation, responsive refinement, Knowledge Bank structure, search logic and technical SEO support.',
    constraints: ['A growing article collection', 'Content needed to remain approachable across age groups', 'Discoverability depended on structure and metadata'],
    decisions: ['Organised content by category and article', 'Added search and filtering instead of a flat archive', 'Improved metadata and social-sharing foundations'],
    lessons: 'For content-rich sites, information architecture is a product feature—not a finishing task.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Search logic', 'Technical SEO'],
    url: 'https://www.suprabha-trust.in', image: '/work/suprabha-desktop.webp', detail: '/work/suprabha-detail.webp', width: 1272, height: 716,
  },
  {
    slug: 'twinkle', type: 'Personal project', status: 'Live build', year: '2026', category: 'AI assistant · Productivity',
    title: 'Twinkle AI', contribution: 'Product design and AI development',
    summary: 'A personal AI operator exploring secure serverless requests, focused conversations and a minimal workspace.',
    problem: 'General chat tools do not provide a focused workspace for projects, conversations and specialised assistance.',
    solution: 'I built a conversational interface, Gemini integration and a Netlify Function that keeps the API key outside frontend code.',
    outcome: 'A functional AI assistant is deployed with Google sign-in and a serverless AI request path.',
    role: 'Concept, interaction design, frontend development and serverless integration.',
    constraints: ['API credentials could not live in frontend code', 'The experience needed clear authentication and response states', 'The product scope had to stay small enough to test'],
    decisions: ['Moved model requests behind a Netlify Function', 'Used a restrained interface to keep the primary action obvious', 'Structured the build for future project and chat organisation'],
    lessons: 'AI products need trustworthy system boundaries and clear states as much as they need model capability.',
    tech: ['JavaScript', 'Gemini API', 'Netlify Functions', 'Serverless'],
    url: 'https://twinkleos.netlify.app', image: '/work/twinkle-desktop.webp', width: 1280, height: 720,
  },
  {
    slug: 'campus', type: 'Academic project', status: 'Completed', year: '2026', category: 'Education · Full-stack platform',
    title: 'Campus Connect', contribution: 'Full-stack product development',
    summary: 'A role-based campus-management system joining student and faculty workflows in one product.',
    problem: 'Attendance, announcements, events and academic communication were fragmented across separate workflows.',
    solution: 'I developed separate student and faculty dashboards with shared campus features and role-based access control.',
    outcome: 'Completed as a final-year full-stack application demonstrating unified student and faculty workflows.',
    role: 'Full-stack architecture, dashboard design, authentication, database integration and responsive implementation.',
    constraints: ['Different roles required different permissions', 'Shared data had to remain consistent', 'Multiple campus functions competed for navigation space'],
    decisions: ['Separated dashboards by role', 'Kept shared services on one backend', 'Prioritised high-frequency campus tasks in the interface'],
    lessons: 'Role-based products become easier to maintain when permissions, information architecture and UI states are designed together.',
    tech: ['Authentication', 'Role-based access', 'Database', 'Responsive UI'],
    image: '/work/campus_connect_thumb.webp', width: 1024, height: 1024,
  },
  {
    slug: 'lifeos', type: 'Personal project', status: 'In progress', year: '2026', category: 'Productivity · Behaviour intelligence',
    title: 'Life OS', contribution: 'System concept and application development',
    summary: 'A privacy-aware behaviour-mirroring system built around local activity records, goals and recurring patterns.',
    problem: 'Traditional productivity tools record tasks but reveal little about behaviour, goals and recurring patterns.',
    solution: 'I created a Windows Python agent with local activity records, goal tracking, behavioural loops and a Flutter foundation.',
    outcome: 'The goals ontology, behavioural-loop and stabilisation phases are complete; the broader product remains in progress.',
    role: 'Product concept, behaviour model, Windows agent, local data structure and Flutter application foundation.',
    constraints: ['Personal activity data should remain local by default', 'Signals needed a consistent ontology', 'The interface had to support future cross-platform use'],
    decisions: ['Started with local JSON records', 'Separated observation from interpretation', 'Built the Flutter shell after stabilising the core behaviour model'],
    lessons: 'Personal analytics is only useful when the data model is understandable and the privacy boundary is explicit.',
    tech: ['Python', 'Flutter', 'Dart', 'JSON storage'],
    image: '/work/lifeos_thumb.webp', width: 1024, height: 1024,
  },
  {
    slug: 'tbh', type: 'Personal brand', status: 'Concept', year: '2026', category: 'Creative services · Digital branding',
    title: 'TBH Creatives', contribution: 'Brand strategy and service design',
    summary: 'A freelance services concept for positioning web development, design and creative support clearly.',
    problem: 'Small organisations need a clear, affordable route to websites, branding and digital content.',
    solution: 'I defined the service identity, positioning, pricing, outreach channels and client communication process.',
    outcome: 'The concept provides a structured identity for presenting services and approaching potential clients.',
    role: 'Positioning, offer design, pricing structure, communication workflow and visual direction.',
    constraints: ['Services needed to feel specific rather than generic', 'Pricing had to remain flexible by scope', 'The brand needed to support direct outreach'],
    decisions: ['Prioritised business sites and landing pages', 'Made scope variables explicit beside pricing', 'Used completed work as the primary trust signal'],
    lessons: 'A service brand is strongest when the offer, proof and next step are clearer than the visual effects.',
    tech: ['React', 'Netlify', 'Vercel', 'Creative design'],
  },
];

const serviceRows = [
  ['01', 'Business websites', 'Credible, responsive sites that explain your offer and turn visits into enquiries.', '₹10k–₹15k'],
  ['02', 'Landing pages', 'Focused campaign pages for launches, events, lead generation and validation.', '₹5k–₹8k'],
  ['03', 'E-commerce', 'Product catalogues, cart, checkout and payment-ready online stores.', '₹20k–₹35k'],
  ['04', 'Full-stack products', 'Interfaces, data flows, authentication and admin tools built as one system.', 'Custom'],
  ['05', 'AI-powered web apps', 'Useful AI features with secure serverless integrations and clear user experience.', 'Custom'],
  ['06', 'UI/UX & redesign', 'Structure, visual direction and responsive refinement for products that feel dated.', 'From ₹8k'],
];

const sections = ['Work', 'Services', 'About', 'Contact'];
const process = ['Discovery', 'Strategy', 'Structure', 'Visual direction', 'Development', 'Testing', 'Launch', 'Improvement'];
const skillGroups = [
  ['Frontend', ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive design']],
  ['Backend & data', ['Python', 'SQL', 'Firebase', 'Firestore', 'Supabase', 'Serverless functions']],
  ['Platforms', ['Git', 'GitHub', 'Netlify', 'Vercel', 'Figma', 'VS Code']],
  ['Creative & AI', ['UI/UX', 'AI integration', 'Prompt engineering', 'Creative direction', 'Branding']],
];

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    return () => {
      document.title = 'Mani Sandeep — Web Developer & AI Builder';
      if (meta) meta.setAttribute('content', 'Portfolio of Mani Sandeep, a Hyderabad-based web developer and AI builder creating responsive websites and practical digital products.');
    };
  }, [title, description]);
}

function ScrollProgress() {
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

function Brand({ homeHref = '#top', footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href={homeHref} aria-label="Mani Sandeep, home">
    <span className="brand-mark">MS<span className="brand-dot">.</span></span><span className="brand-name">Mani Sandeep</span>
  </a>;
}

function Header({ internal = false }) {
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
    if (internal) return undefined;
    const targets = [...document.querySelectorAll('main section[id]')];
    const updateActiveSection = () => {
      const marker = window.innerHeight * 0.3;
      const current = targets.reduce((selected, section) => section.getBoundingClientRect().top <= marker ? section : selected, targets[0]);
      const id = current?.id || 'top';
      setActive(id);
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
      <span className="mobile-brand-name">Gouda Mani Sandeep</span>
      {sections.map((item) => {
        const id = item.toLowerCase();
        return <a key={item} className={!internal && active === id ? 'is-active' : ''} aria-current={!internal && active === id ? 'location' : undefined} href={`${prefix}#${id}`} onClick={() => setOpen(false)}>{item}</a>;
      })}
      <a href="/Mani-Sandeep-Resume.pdf" download>Résumé <Download size={14} /></a>
      <a className="button button-dark" href={`${prefix}#contact`} onClick={() => setOpen(false)}>Start a Project <ArrowUpRight size={16} /></a>
    </nav>
  </div></header>;
}

function SectionIntro({ index, label, title, text, light = false }) {
  return <div className={`section-intro ${light ? 'intro-light' : ''}`}><p className="folio">{index} / {label}</p><h2>{title}</h2>{text && <p className="intro-copy">{text}</p>}</div>;
}

function ProjectMedia({ project, eager = false }) {
  return project.image ? <div className={`project-art project-art-${project.slug}`}>
    <div className="art-browser">
      <div className="art-browser-bar" aria-hidden="true"><i/><i/><i/><span>{project.title}</span></div>
      <img src={project.image} alt={`${project.title} interface`} width={project.width} height={project.height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />
    </div>
    <div className="art-detail" aria-hidden="true"><span>UI detail</span><img src={project.image} alt="" width={project.width} height={project.height} loading="lazy" decoding="async" /></div>
  </div>
    : <div className="project-monogram">TBH<span>{project.category}</span></div>;
}

function ProjectCard({ project, index }) {
  return <article className={`project project-${project.slug}`}>
    <div className="project-media"><ProjectMedia project={project} eager={index === 0} /><p className="project-proof"><i /> {project.type} · {project.status}</p><span className="project-index">0{index + 1}</span></div>
    <div className="project-copy"><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><h3>{project.title}</h3><p className="contribution">{project.contribution}</p>
      <p className="project-summary">{project.summary}</p>
      <p className="project-outcome"><ShieldCheck size={16} /><span><strong>Verified outcome</strong>{project.outcome}</span></p>
      <div className="tech-line">{project.tech.join(' · ')}</div>
      <div className="project-links"><a className="button button-dark" href={`/work/${project.slug}`}>View case study <ArrowUpRight /></a>{project.url && <a href={project.url} target="_blank" rel="noreferrer">Visit live site <ExternalLink /></a>}</div>
    </div>
  </article>;
}

function EvidenceCard({ project }) {
  return <article className="evidence-card">
    <div className="evidence-thumb"><ProjectMedia project={project} /></div>
    <p>{project.type} · {project.status}</p><h3>{project.title}</h3><strong>{project.contribution}</strong>
    <div><a href={`/work/${project.slug}`}>Case study <ArrowUpRight /></a>{project.url && <a href={project.url} target="_blank" rel="noreferrer">Live site <ExternalLink /></a>}</div>
  </article>;
}

function ContactForm() {
  const [status, setStatus] = useState('idle');
  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');
    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };
  return <form className="contact-form" name="project-enquiry" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={submit}>
    <input type="hidden" name="form-name" value="project-enquiry" />
    <p className="honeypot"><label>Do not fill this out<input name="bot-field" tabIndex="-1" autoComplete="off" /></label></p>
    <div className="field-row"><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label></div>
    <div className="field-row"><label>Project type<select name="type" required defaultValue=""><option value="" disabled>Select one</option><option>Business website</option><option>Landing page</option><option>E-commerce</option><option>AI-powered application</option><option>UI/UX or redesign</option><option>Another project</option></select></label><label>Budget range<select name="budget" required defaultValue=""><option value="" disabled>Select one</option><option>₹5,000–₹10,000</option><option>₹10,000–₹20,000</option><option>₹20,000–₹35,000</option><option>₹35,000+</option><option>Not sure yet</option></select></label></div>
    <label>Message<textarea name="message" rows="5" minLength="20" required placeholder="What are you building, who is it for, and when would you like to launch?" /></label>
    <div className="form-footer"><button className="button button-red" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={17} /></button><p>Secure submission. No API keys are exposed.</p></div>
    <p className={`status-message status-${status}`} aria-live="polite">{status === 'success' && 'Thanks—your enquiry has been sent. I’ll reply within one working day.'}{status === 'error' && <>The form could not send. Please email <a href="mailto:gmanisandeep@gmail.com">gmanisandeep@gmail.com</a>.</>}</p>
  </form>;
}

function Footer({ internal = false }) {
  const prefix = internal ? '/' : '';
  return <footer><div className="shell footer-main"><div><Brand homeHref="/" footer /><p className="footer-name">Gouda Mani Sandeep</p></div><p>Web developer and AI builder creating clear, responsive digital products from Hyderabad.</p><nav aria-label="Footer navigation"><a href={`${prefix}#work`}>Work</a><a href={`${prefix}#services`}>Services</a><a href={`${prefix}#about`}>About</a><a href={`${prefix}#contact`}>Contact</a></nav><div className="socials"><a href="https://github.com/gmanisandeep" aria-label="GitHub" target="_blank" rel="noreferrer"><GithubLogo /></a><a href="https://www.linkedin.com/in/manisandeepg/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><LinkedinLogo /></a><a href="https://www.instagram.com/manisandeepg/" aria-label="Instagram" target="_blank" rel="noreferrer"><InstagramLogo /></a><a href="https://x.com/manisandeepg" aria-label="X" target="_blank" rel="noreferrer"><XLogo /></a></div></div>
    <div className="shell footer-bottom"><span>© 2026 Mani Sandeep</span><a href="#top">Back to top <ArrowUp /></a></div></footer>;
}

function SocialIcon({ children }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">{children}</svg>;
}

const GithubLogo = () => <SocialIcon><path d="M12 2.2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 7.99c.85 0 1.7.11 2.49.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2.2Z" /></SocialIcon>;
const LinkedinLogo = () => <SocialIcon><path d="M5.15 3.75A2.15 2.15 0 1 1 .85 3.75a2.15 2.15 0 0 1 4.3 0ZM1.1 8h4.1v12.1H1.1V8Zm6.6 0h3.93v1.65h.05c.55-1.04 1.89-2.14 3.89-2.14 4.16 0 4.93 2.74 4.93 6.3v6.29h-4.1v-5.58c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.68H7.7V8Z" /></SocialIcon>;
const InstagramLogo = () => <SocialIcon><path d="M7.2 2h9.6A5.2 5.2 0 0 1 22 7.2v9.6a5.2 5.2 0 0 1-5.2 5.2H7.2A5.2 5.2 0 0 1 2 16.8V7.2A5.2 5.2 0 0 1 7.2 2Zm-.1 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></SocialIcon>;
const XLogo = () => <SocialIcon><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.4L6.47 22H3.36l7.24-8.28L3 2h6.4l4.42 5.84L18.9 2Zm-1.1 18h1.73L8.46 3.9H6.6L17.8 20Z" /></SocialIcon>;

function HomePage() {
  const initialHash = useMemo(() => window.location.hash.slice(1), []);
  usePageMeta('Mani Sandeep — Creative Web Developer & AI Builder', 'Hyderabad-based creative developer building responsive websites, AI-powered products and visually distinctive digital experiences.');
  useEffect(() => {
    if (!initialHash) return;
    requestAnimationFrame(() => document.getElementById(initialHash)?.scrollIntoView());
  }, [initialHash]);
  return <><ScrollProgress /><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">
    <section id="top" className="hero"><div className="hero-grid shell">
      <div className="hero-kicker"><span>Hyderabad / India</span><span>Available for selected projects</span></div>
      <h1>Digital products that <em>look sharp</em> and work hard.</h1>
      <div className="hero-side"><p>Creative web developer and AI builder based in Hyderabad. I design and develop responsive websites, digital products and intelligent interfaces.</p><div className="hero-actions"><a className="button button-red" href="#work">View Selected Work <ArrowDown size={17} /></a><a className="text-button" href="#contact">Start a Project <ArrowUpRight size={17} /></a></div></div>
      <div className="hero-composition" aria-hidden="true"><div className="composition-panel panel-one"><span>WEB / 01</span><strong>Build for clarity.</strong></div><div className="composition-panel panel-two"><span>AI / 02</span><strong>Design for use.</strong></div><div className="composition-rule" /></div>
      <div className="hero-footer"><p><i /> Client websites shipped · AI products in development · Available globally</p><p>Scroll to explore <ArrowDown size={15} /></p></div>
    </div></section>

    <aside className="proof-strip"><div className="shell"><span>2 live client websites</span><span>Design → Development → Deployment</span><span>Full-stack + frontend</span><span>Working globally from Hyderabad</span></div></aside>

    <section id="work" className="work-section"><div className="shell"><SectionIntro index="01" label="Selected work" title="Work you can inspect." text="Real interfaces, exact responsibilities and honest project status—so you can see what I designed, built and shipped."/><div className="projects-list">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div><div className="section-cta"><p>Planning something with similar ambition?</p><a className="button button-red" href="#contact">Discuss a similar project <ArrowUpRight /></a></div></div></section>

    <section id="services" className="services-section"><div className="shell"><SectionIntro index="02" label="Capabilities" light title="From first idea to a working digital product." text="Services are structured around outcomes, with design and development handled as one connected process."/><div className="service-rows">{serviceRows.map(([number, name, copy, price]) => <a href="#contact" className="service-row" key={number}><span>{number}</span><h3>{name}</h3><p>{copy}</p><strong>{price}</strong><ArrowUpRight /></a>)}</div><p className="pricing-disclaimer">Final pricing depends on scope, pages, integrations, content and delivery timeline.</p></div></section>

    <section id="process" className="process-section"><div className="shell"><SectionIntro index="03" label="Process" title="A clear route from uncertainty to launch." text="Each phase ends with a decision, so the work stays understandable and progress remains visible."/><ol className="process-list">{process.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><i /></li>)}</ol></div></section>

    <section id="experience" className="experience-section"><div className="shell"><SectionIntro index="04" label="Experience" title="Real work, changing requirements, full ownership."/><article className="experience"><div className="experience-date">June—July 2026<br/><span>Hyderabad, India</span></div><div><p className="role-label">Web Developer & Creative Design Intern</p><h3>Dhan Enterprises / Suprabha Trust / IRE Expo 2026</h3><p>Worked across website development, frontend implementation, administrative workflows, event registration, Knowledge Bank migration and digital event support.</p><div className="responsibility-grid"><span>Website development</span><span>Admin dashboard work</span><span>Event registration pages</span><span>Banner & social design</span><span>Communication assets</span><span>Knowledge-base migration</span></div></div></article></div></section>

    <section className="skills-section"><div className="shell"><SectionIntro index="05" label="Systems" light title="A practical stack for designing, building and shipping."/><div className="skill-map">{skillGroups.map(([group, skills], index) => <article key={group}><span>0{index + 1}</span><h3>{group}</h3><ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div></div></section>

    <section id="about" className="about-section"><div className="shell about-grid"><div><p className="folio">06 / About</p><h2>Design sense.<br/>Technical depth.<br/><em>Business awareness.</em></h2></div><div className="about-copy"><p>I’m Gouda Mani Sandeep, a Computer Science graduate based in Hyderabad. My work sits between web development, AI, product thinking, branding and creative technology.</p><p>I move across structure, interface, implementation and deployment. That range helps protect the original idea while making the final product useful, responsive and clear.</p><p>I’m open to freelance projects, internships, junior roles and thoughtful collaborations.</p><div className="about-actions"><a className="button button-dark" href="/Mani-Sandeep-Resume.pdf" download>Download Résumé <Download size={17} /></a><a className="arrow-link" href="https://github.com/gmanisandeep" target="_blank" rel="noreferrer"><GithubLogo /> GitHub <ExternalLink /></a></div></div></div></section>

    <section id="evidence" className="evidence-section"><div className="shell"><div className="evidence-heading"><p className="folio">07 / Evidence</p><div><h2>Trust should be inspectable.</h2><p>Three working examples with a clear role, current status and a direct route to the proof.</p></div></div><div className="evidence-cards">{projects.slice(0, 3).map(project => <EvidenceCard key={project.slug} project={project} />)}</div></div></section>

    <section id="contact" className="contact-section"><div className="shell"><SectionIntro index="08" label="Contact" light title="Have a project, role, or idea worth building?" text="Share the essentials. I’m available daily from 10 AM to 11 PM IST and usually respond within one working day."/><div className="contact-grid"><div className="contact-direct"><a href="https://wa.me/919398116740?text=Hi%20Mani%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp<span>+91 93981 16740</span></a><a href="mailto:gmanisandeep@gmail.com"><Mail /> Email<span>gmanisandeep@gmail.com</span></a><p><Clock3 /> 10 AM—11 PM IST daily</p><p><MapPin /> Hyderabad · Working globally</p></div><ContactForm /></div></div></section>
  </main><Footer /><a className="mobile-contact" href="#contact">Start a Project <ArrowUpRight /></a></>;
}

function CaseStudyPage({ project }) {
  usePageMeta(`${project.title} Case Study — Mani Sandeep`, `${project.summary} Read the role, constraints, decisions and outcome.`);
  useEffect(() => { window.scrollTo(0, 0); }, [project.slug]);
  return <><ScrollProgress /><a className="skip-link" href="#case-main">Skip to content</a><Header internal /><main id="case-main" className="case-main">
    <header className="case-hero"><div className="shell"><a className="back-link" href="/#work"><ArrowLeft /> All work</a><div className="case-title"><p className="folio">{project.type} · {project.status} · {project.year}</p><h1>{project.title}</h1><p>{project.summary}</p></div><div className="case-facts"><div><span>Role</span><strong>{project.contribution}</strong></div><div><span>Category</span><strong>{project.category}</strong></div><div><span>Stack</span><strong>{project.tech.join(' · ')}</strong></div></div></div></header>
    <section className="case-visual"><div className="shell"><div className="case-image"><ProjectMedia project={project} eager /></div>{project.url && <a className="button button-red" href={project.url} target="_blank" rel="noreferrer">View live project <ExternalLink /></a>}</div></section>
    <section className="case-story"><div className="shell"><div className="case-story-intro"><p className="folio">01 / Context</p><h2>The work behind the interface.</h2></div><div className="case-narrative"><article><span>Problem</span><h3>What needed to change</h3><p>{project.problem}</p></article><article><span>Contribution</span><h3>What I owned</h3><p>{project.role}</p></article><article><span>Direction</span><h3>What I built</h3><p>{project.solution}</p></article><article className="case-outcome"><span>Outcome</span><h3>What can be verified</h3><p>{project.outcome}</p></article></div></div></section>
    <section className="case-decisions"><div className="shell"><div><p className="folio">02 / Constraints</p><h2>Decisions shaped by reality.</h2></div><div className="decision-columns"><article><h3>Constraints</h3><ul>{project.constraints.map(item => <li key={item}>{item}</li>)}</ul></article><article><h3>Key decisions</h3><ul>{project.decisions.map(item => <li key={item}>{item}</li>)}</ul></article></div></div></section>
    {project.detail && <section className="case-detail"><div className="shell"><img src={project.detail} width="1272" height="716" loading="lazy" decoding="async" alt={`${project.title} feature section`} /></div></section>}
    <section className="case-learning"><div className="shell"><p className="folio">03 / Learning</p><blockquote>{project.lessons}</blockquote><a className="button button-dark" href="/#contact">Discuss a similar project <ArrowUpRight /></a></div></section>
  </main><Footer internal /></>;
}

function NotFoundPage() {
  usePageMeta('Page not found — Mani Sandeep', 'The requested portfolio page could not be found.');
  return <><Header internal /><main className="not-found"><div><p className="folio">404 / Lost route</p><h1>This page is not part of the build.</h1><p>Return to the portfolio or explore the selected case studies.</p><a className="button button-red" href="/">Back to portfolio <ArrowUpRight /></a></div></main><Footer internal /></>;
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const project = useMemo(() => path.startsWith('/work/') ? projects.find(item => item.slug === path.split('/')[2]) : null, [path]);
  if (path === '/') return <HomePage />;
  if (project) return <CaseStudyPage project={project} />;
  return <NotFoundPage />;
}
