import { useEffect, useState } from 'react';
import {
  ArrowDown, ArrowUp, ArrowUpRight, Camera as Instagram, Clock3, Download,
  ExternalLink, GitBranch as Github, Mail, MapPin, Menu, MessageCircle,
  ShieldCheck, Users as Linkedin, X,
} from 'lucide-react';

const projects = [
  {
    slug: 'dhan', eyebrow: 'Live client project', category: 'Renewable energy · Business · Events', year: '2026',
    title: 'Dhan Enterprises & IRE Expo 2026', contribution: 'Full-stack website development',
    problem: 'A credible service platform and clear digital home were needed for event information, registrations and internal data management.',
    solution: 'Responsive service and event pages, registration workflows and administrative functionality for managing submitted data.',
    outcome: 'Deployed publicly and used for IRE Expo 2026 communication, registration and centralised registration management.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Backend integration', 'Admin dashboard'],
    url: 'https://www.win-dhan.com', image: '/ire_expo_thumb.png', live: true,
  },
  {
    slug: 'suprabha', eyebrow: 'Live client project', category: 'Nonprofit · Knowledge platform', year: '2026',
    title: 'Suprabha Trust Knowledge Bank', contribution: 'Frontend design and development',
    problem: 'The trust needed a modern mobile experience and a clearer system for organising its growing educational archive.',
    solution: 'Responsive frontend enhancements, category organisation, search, filtering, article pages and metadata improvements.',
    outcome: 'A deployed public website with an accessible Knowledge Bank and structured article discovery.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Search logic', 'Technical SEO'],
    url: 'https://www.suprabha-trust.in', image: null, live: true,
  },
  {
    slug: 'twinkle', eyebrow: 'Live personal project', category: 'AI assistant · Productivity', year: '2026',
    title: 'Twinkle AI', contribution: 'Product design and AI development',
    problem: 'General chat tools do not provide a focused workspace for projects, conversations and specialised assistance.',
    solution: 'A conversational interface, Gemini integration and Netlify Function that keeps the API key outside frontend code.',
    outcome: 'A working AI assistant deployed through a secure serverless backend and responsive web interface.',
    tech: ['JavaScript', 'Gemini API', 'Netlify Functions', 'Serverless'],
    url: 'https://twinkleos.netlify.app', image: '/twinkle_ai_thumb.png', live: true,
  },
  {
    slug: 'campus', eyebrow: 'Academic project', category: 'Education · Full-stack platform', year: '2026',
    title: 'Campus Connect', contribution: 'Full-stack product development',
    problem: 'Attendance, announcements, events and academic communication were fragmented across separate workflows.',
    solution: 'Role-based student and faculty dashboards with shared campus-management features and secure access control.',
    outcome: 'Completed as a final-year full-stack application demonstrating unified student and faculty workflows.',
    tech: ['Authentication', 'Role-based access', 'Database', 'Responsive UI'],
    url: null, image: '/campus_connect_thumb.png', live: false,
  },
  {
    slug: 'lifeos', eyebrow: 'Personal project', category: 'Productivity · Behaviour intelligence', year: '2026',
    title: 'Life OS', contribution: 'System concept and application development',
    problem: 'Traditional productivity tools record tasks but reveal little about behaviour, goals and recurring patterns.',
    solution: 'A Windows Python agent with local activity records, goal tracking, behavioural loops and a Flutter application foundation.',
    outcome: 'Completed the goals-ontology, behavioural-loop and stabilisation phases with working local activity records.',
    tech: ['Python', 'Flutter', 'Dart', 'JSON storage'],
    url: null, image: '/lifeos_thumb.png', live: false,
  },
  {
    slug: 'tbh', eyebrow: 'Personal brand', category: 'Creative services · Digital branding', year: '2026',
    title: 'TBH Creatives', contribution: 'Brand strategy and service design',
    problem: 'Small organisations need a clear, affordable route to websites, branding and digital content.',
    solution: 'A freelance service identity with positioning, pricing, outreach and a structured client communication process.',
    outcome: 'Established a professional identity used to present services, work and project packages.',
    tech: ['React', 'Netlify', 'Vercel', 'Creative design'],
    url: null, image: null, live: false,
  },
];

const serviceRows = [
  ['01', 'Business websites', 'Credible, responsive sites that explain your offer and turn visits into enquiries.', '₹10k–₹15k'],
  ['02', 'Landing pages', 'Focused campaign pages for launches, events, lead generation and validation.', '₹5k–₹8k'],
  ['03', 'E-commerce', 'Product catalogues, cart, checkout and payment-ready online stores.', '₹20k–₹35k'],
  ['04', 'Full-stack products', 'Interfaces, data flows, authentication and admin tools built as one system.', 'Custom'],
  ['05', 'AI-powered web apps', 'Useful AI features with secure serverless integrations and clear user experience.', 'Custom'],
  ['06', 'UI/UX & redesign', 'Structure, visual direction and responsive refinement for products that feel dated.', 'From ₹8k'],
  ['07', 'Branding & creatives', 'Practical identity systems, campaign graphics and supporting digital assets.', 'Custom'],
];

const process = ['Discovery', 'Strategy', 'Structure', 'Visual direction', 'Development', 'Testing', 'Launch', 'Improvement'];
const skillGroups = [
  ['Frontend', ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive design']],
  ['Backend & data', ['Python', 'SQL', 'Firebase', 'Firestore', 'Supabase', 'Serverless functions']],
  ['Platforms', ['Git', 'GitHub', 'Netlify', 'Vercel', 'Figma', 'VS Code']],
  ['Creative & AI', ['UI/UX', 'AI integration', 'Prompt engineering', 'Creative direction', 'Branding']],
];

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

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, []);
  return <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}><div className="nav-shell">
    <a className="brand" href="#top" aria-label="Mani Sandeep, home"><span>MS</span><small>Creative Developer</small></a>
    <button className="menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="primary-nav" className={open ? 'nav-open' : ''} aria-label="Primary navigation">
      {['Work', 'Services', 'Process', 'Experience', 'About', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}
      <a href="/Mani-Sandeep-Resume.pdf" download>Résumé <Download size={14} /></a>
      <a className="button button-dark" href="#contact" onClick={() => setOpen(false)}>Start a Project <ArrowUpRight size={16} /></a>
    </nav>
  </div></header>;
}

function SectionIntro({ index, label, title, text, light = false }) {
  return <div className={`section-intro ${light ? 'intro-light' : ''}`}><p className="folio">{index} / {label}</p><h2>{title}</h2>{text && <p className="intro-copy">{text}</p>}</div>;
}

function ProjectCard({ project, index }) {
  return <article className={`project project-${project.slug} project-layout-${index + 1}`}>
    <div className="project-media">
      {project.image ? <img src={project.image} alt={`${project.title} project preview`} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" /> : <div className="project-monogram">{project.slug === 'suprabha' ? 'ST' : 'TBH'}<span>{project.category}</span></div>}
      <p className="project-proof"><i /> {project.eyebrow}</p>
      <span className="project-index">0{index + 1}</span>
    </div>
    <div className="project-copy"><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><h3>{project.title}</h3><p className="contribution">{project.contribution}</p>
      <div className="project-story"><p><strong>Context</strong>{project.problem}</p><p><strong>Direction</strong>{project.solution}</p><p className="verified"><strong><ShieldCheck size={15} /> Verified outcome</strong>{project.outcome}</p></div>
      <div className="tech-line">{project.tech.join(' · ')}</div>
      {project.url ? <a className="arrow-link" href={project.url} target="_blank" rel="noreferrer">View live project <ArrowUpRight /></a> : <span className="project-status">Case study available on request</span>}
    </div>
  </article>;
}

function ContactForm() {
  const [status, setStatus] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Project enquiry — ${data.get('type')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject: ${data.get('type')}\nBudget: ${data.get('budget')}\n\n${data.get('message')}`);
    setStatus('Opening your email app…');
    window.location.href = `mailto:gmanisandeep@gmail.com?subject=${subject}&body=${body}`;
  };
  return <form className="contact-form" onSubmit={submit}>
    <div className="field-row"><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label></div>
    <div className="field-row"><label>Project type<select name="type" required defaultValue=""><option value="" disabled>Select one</option><option>Business website</option><option>Landing page</option><option>E-commerce</option><option>AI-powered application</option><option>UI/UX or redesign</option><option>Another project</option></select></label><label>Budget range<select name="budget" required defaultValue=""><option value="" disabled>Select one</option><option>₹5,000–₹10,000</option><option>₹10,000–₹20,000</option><option>₹20,000–₹35,000</option><option>₹35,000+</option><option>Not sure yet</option></select></label></div>
    <label>Message<textarea name="message" rows="5" minLength="20" required placeholder="What are you building, who is it for, and when would you like to launch?" /></label>
    <div className="form-footer"><button className="button button-red" type="submit">Prepare enquiry <ArrowUpRight size={17} /></button><p>No data is stored. This opens your email app.</p></div><p className="status-message" aria-live="polite">{status}</p>
  </form>;
}

export default function App() {
  return <><ScrollProgress /><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">
    <section id="top" className="hero section-reveal"><div className="hero-grid shell">
      <div className="hero-kicker"><span>Hyderabad / India</span><span>Available for selected projects</span></div>
      <h1>Designing digital experiences that <em>look sharp,</em> work fast, and solve real problems.</h1>
      <div className="hero-side"><p>Creative web developer, AI builder and UI/UX designer taking useful ideas from structure to final deployment.</p><div className="hero-actions"><a className="button button-red" href="#work">View Selected Work <ArrowDown size={17} /></a><a className="text-button" href="#contact">Start a Project <ArrowUpRight size={17} /></a></div></div>
      <div className="hero-composition" aria-hidden="true"><div className="composition-panel panel-one"><span>WEB / 01</span><strong>Build for clarity.</strong></div><div className="composition-panel panel-two"><span>AI / 02</span><strong>Design for use.</strong></div><div className="composition-rule" /></div>
      <div className="hero-footer"><p><i /> Freelance · Internships · Junior roles · Collaborations</p><p>Scroll to explore <ArrowDown size={15} /></p></div>
    </div></section>

    <aside className="proof-strip"><div className="shell"><span>02 live client websites</span><span>Design → Development → Deployment</span><span>Full-stack + frontend</span><span>Working globally from Hyderabad</span></div></aside>

    <section id="work" className="work-section section-reveal"><div className="shell"><SectionIntro index="01" label="Selected work" title="Built to be used, not just viewed." text="A mix of client platforms and self-directed products—each shaped around a real communication or workflow problem."/>
      <div className="projects-list">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
    </div></section>

    <section id="services" className="services-section section-reveal"><div className="shell"><SectionIntro index="02" label="Capabilities" light title="From first idea to a working digital product." text="Services are structured around outcomes, with design and development handled as one connected process."/>
      <div className="service-rows">{serviceRows.map(([number, name, copy, price]) => <a href="#contact" className="service-row" key={number}><span>{number}</span><h3>{name}</h3><p>{copy}</p><strong>{price}</strong><ArrowUpRight /></a>)}</div>
      <p className="pricing-disclaimer">Final pricing depends on scope, pages, integrations, content and delivery timeline.</p>
    </div></section>

    <section id="process" className="process-section section-reveal"><div className="shell"><SectionIntro index="03" label="Process" title="A clear route from uncertainty to launch." text="Each phase ends with a decision, so the work stays understandable and progress remains visible."/>
      <ol className="process-list">{process.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><i /></li>)}</ol>
    </div></section>

    <section id="experience" className="experience-section section-reveal"><div className="shell"><SectionIntro index="04" label="Experience" title="Real work, changing requirements, full ownership."/>
      <article className="experience"><div className="experience-date">June—July 2026<br/><span>Hyderabad, India</span></div><div><p className="role-label">Web Developer & Creative Design Intern</p><h3>Dhan Enterprises / Suprabha Trust / IRE Expo 2026</h3><p>Worked across website development, frontend implementation, administrative workflows, event registration, Knowledge Bank migration and digital event support.</p><div className="responsibility-grid"><span>Website development</span><span>Admin dashboard work</span><span>Event registration pages</span><span>Banner & social design</span><span>Communication assets</span><span>Knowledge-base migration</span></div></div></article>
    </div></section>

    <section className="skills-section section-reveal"><div className="shell"><SectionIntro index="05" label="Systems" light title="Technical range, organised by responsibility."/>
      <div className="skill-map">{skillGroups.map(([group, skills], index) => <article key={group}><span>0{index + 1}</span><h3>{group}</h3><ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div>
    </div></section>

    <section id="about" className="about-section section-reveal"><div className="shell about-grid"><div><p className="folio">06 / About</p><h2>Design sense.<br/>Technical depth.<br/><em>Business awareness.</em></h2></div><div className="about-copy"><p>I’m Gouda Mani Sandeep, a Computer Science graduate based in Hyderabad. My work sits between web development, AI, product thinking, branding and creative technology.</p><p>I’m comfortable moving across structure, interface, implementation and deployment. That range helps me protect the original idea while making the final product useful, responsive and clear.</p><p>I’m open to freelance projects, internships, junior roles and thoughtful collaborations.</p><div className="about-actions"><a className="button button-dark" href="/Mani-Sandeep-Resume.pdf" download>Download Résumé <Download size={17} /></a><a className="arrow-link" href="https://github.com/gmanisandeep" target="_blank" rel="noreferrer"><Github /> GitHub <ExternalLink /></a></div></div></div></section>

    <section className="reference-section section-reveal"><div className="shell"><p className="folio">07 / Client reference</p><blockquote>“Mani Sandeep made a valuable contribution through website development, design and digital support. He handled responsibilities independently, adapted quickly to changing requirements and consistently delivered work within tight timelines.”</blockquote><div className="reference-person"><span>HM</span><p><strong>Harish Manjunath</strong><br/>CRO, Dhan Enterprises and Suprabha Trust</p></div></div></section>

    <section id="contact" className="contact-section section-reveal"><div className="shell"><SectionIntro index="08" label="Contact" light title="Have a project, role, or idea worth building?" text="Share the essentials. I’m available daily from 10 AM to 11 PM IST and usually respond within one working day."/>
      <div className="contact-grid"><div className="contact-direct"><a href="https://wa.me/919398116740?text=Hi%20Mani%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp<span>+91 93981 16740</span></a><a href="mailto:gmanisandeep@gmail.com"><Mail /> Email<span>gmanisandeep@gmail.com</span></a><p><Clock3 /> 10 AM—11 PM IST daily</p><p><MapPin /> Hyderabad · Working globally</p></div><ContactForm /></div>
    </div></section>
  </main>
  <footer><div className="shell footer-main"><h2>MANI<br/>SANDEEP<span>.</span></h2><p>Creative web developer, AI builder, UI/UX designer and digital problem solver.</p><nav aria-label="Footer navigation"><a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a><a href="#contact">Contact</a></nav><div className="socials"><a href="https://www.linkedin.com/in/manisandeepg/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href="https://github.com/gmanisandeep" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href="https://www.instagram.com/manisandeepg/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a></div></div><div className="shell footer-bottom"><span>© 2026 Mani Sandeep</span><span>Hyderabad, India</span><a href="#top">Back to top <ArrowUp /></a></div></footer>
  <a className="mobile-contact" href="#contact">Start a Project <ArrowUpRight /></a></>;
}
