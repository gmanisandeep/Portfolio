import { useEffect, useState } from 'react';
import {
  ArrowUpRight, BriefcaseBusiness, Check, Clock3, Code2, Download,
  ExternalLink, GitBranch as Github, Globe2, Camera as Instagram, Users as Linkedin, Mail, MapPin,
  Menu, MessageCircle, ShieldCheck, Sparkles, X,
} from 'lucide-react';

const liveProjects = [
  {
    slug: 'dhan', label: 'Live client project', category: 'Renewable energy · Business · Events',
    title: 'Business and event platform for Dhan Enterprises and IRE Expo 2026',
    problem: 'The client needed a credible service website and a clear digital home for event information and registrations.',
    contribution: 'Designed and developed responsive pages, registration workflows, service and event sections, plus administrative functionality for managing submitted data.',
    outcome: 'Deployed publicly and used for IRE Expo 2026 communication, registrations and centralised registration management.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Backend integration', 'Admin dashboard'],
    url: 'https://www.win-dhan.com', image: '/ire_expo_thumb.png', action: 'View live website',
  },
  {
    slug: 'suprabha', label: 'Live client project', category: 'Nonprofit · Education · Social impact',
    title: 'Structured digital platform and Knowledge Bank for Suprabha Trust',
    problem: 'The trust needed a modern, mobile-friendly site and a clearer way to organise its growing educational article collection.',
    contribution: 'Enhanced the frontend, responsiveness, category organisation, filtering, search, article pages, metadata and social-sharing setup.',
    outcome: 'Deployed a responsive public website with an accessible Knowledge Bank and organised article discovery.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Search and filtering', 'Technical SEO'],
    url: 'https://www.suprabha-trust.in', image: null, action: 'View live website',
  },
  {
    slug: 'twinkle', label: 'Live personal project', category: 'AI assistant · Productivity',
    title: 'Twinkle AI — a personal digital operator with a secure serverless backend',
    problem: 'General chat tools do not provide a focused workspace for conversations, projects and specialised assistance.',
    contribution: 'Conceptualised, designed and developed the chat interface, Gemini integration and Netlify Function that keeps the API key out of frontend code.',
    outcome: 'Deployed a working AI assistant that processes prompts through a serverless backend and returns responses in a responsive interface.',
    technologies: ['JavaScript', 'Gemini API', 'Netlify Functions', 'Serverless architecture'],
    url: 'https://twinkleos.netlify.app', image: '/twinkle_ai_thumb.png', action: 'Try live project',
  },
];

const otherProjects = [
  ['CampusConnect', 'Academic full-stack platform', 'A role-based campus system connecting student and faculty workflows across attendance, announcements, events, mentorship, clubs and career support.', ['Authentication', 'Role-based access', 'Database integration'], '/campus_connect_thumb.png'],
  ['Life OS', 'Behaviour and productivity system', 'A Python-based behaviour-mirroring system with local activity records, goal tracking and a Flutter foundation for future cross-platform access.', ['Python', 'Flutter', 'Dart', 'Local JSON storage'], '/lifeos_thumb.png'],
  ['TBH Creatives', 'Personal freelance brand', 'A service identity built to present affordable website, branding and digital-content solutions to small businesses and organisations.', ['React', 'Netlify', 'Vercel', 'Creative design'], null],
];

const services = [
  { badge: 'Most recommended', name: 'Business Website Development', price: '₹10,000–₹15,000', text: 'Professional, responsive websites for startups, local businesses, organisations and service providers.', includes: ['Responsive business pages', 'Enquiry and contact flows', 'SEO-ready foundations'] },
  { badge: 'Fastest to launch', name: 'Landing Page Development', price: '₹5,000–₹8,000', text: 'Focused pages for product launches, events, campaigns and lead generation.', includes: ['Conversion-focused structure', 'Mobile-first development', 'Analytics-ready setup'] },
  { badge: 'Online selling', name: 'E-commerce Development', price: '₹20,000–₹35,000', text: 'Online stores with product management, cart, checkout and payment integration.', includes: ['Product catalogue', 'Cart and checkout', 'Payment integration'] },
];

const nav = ['Work', 'Services', 'About', 'Experience', 'Contact'];

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header"><div className="nav-shell">
    <a className="brand" href="#home" aria-label="Mani Sandeep, home">MANI<span>.</span></a>
    <button className="menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="primary-nav" className={open ? 'nav-open' : ''} aria-label="Primary navigation">
      {nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}
      <a className="button button-small" href="#contact" onClick={() => setOpen(false)}>Discuss a Project</a>
    </nav>
  </div></header>;
}

function SectionIntro({ label, title, text }) {
  return <div className="section-intro"><div><p className="section-label">{label}</p><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

function ProjectCard({ project, index }) {
  return <article className={`project-card ${index === 0 ? 'project-featured' : ''}`}>
    <div className={`project-visual visual-${project.slug}`}>
      {project.image ? <img src={project.image} alt={`${project.title} website preview`} loading={index ? 'lazy' : 'eager'} decoding="async" /> : <div className="visual-wordmark"><span>SUPRABHA</span><small>TRUST · KNOWLEDGE BANK</small></div>}
      <span className="live-label"><i /> {project.label}</span>
    </div>
    <div className="project-body"><p className="project-category">{project.category}</p><h3>{project.title}</h3>
      <dl className="project-details"><div><dt>Why it was needed</dt><dd>{project.problem}</dd></div><div><dt>My contribution</dt><dd>{project.contribution}</dd></div><div className="outcome"><dt><ShieldCheck size={15} /> Verified outcome</dt><dd>{project.outcome}</dd></div></dl>
      <div className="tag-list">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
      <a className="text-link" href={project.url} target="_blank" rel="noreferrer">{project.action} <ArrowUpRight size={17} /></a>
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
    <div className="field-row"><label>Project type<select name="type" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(service => <option key={service.name}>{service.name}</option>)}<option>Another digital project</option></select></label><label>Estimated budget<select name="budget" required defaultValue=""><option value="" disabled>Select a range</option><option>₹5,000–₹10,000</option><option>₹10,000–₹20,000</option><option>₹20,000–₹35,000</option><option>₹35,000+</option><option>Not sure yet</option></select></label></div>
    <label>Project details<textarea name="message" rows="6" minLength="20" required placeholder="What are you building, who is it for, and when would you like to launch?" /></label>
    <button className="button" type="submit">Prepare email enquiry <Mail size={18} /></button><p className="form-note">This safely opens your email app with the enquiry pre-filled. No form data is stored on this site.</p><p aria-live="polite" className="status-message">{status}</p>
  </form>;
}

export default function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">
    <section id="home" className="hero shell"><p className="hero-label">WEB DEVELOPER <span>•</span> AI BUILDER <span>•</span> CREATIVE TECHNOLOGIST</p><h1>I build <span>websites and digital products</span> <span className="desktop-tail">that help businesses look credible and operate better.</span><span className="mobile-tail">that help businesses grow.</span></h1><p className="hero-copy">Computer Science graduate and web developer creating responsive business websites, landing pages, AI-powered tools and practical digital experiences.</p><div className="hero-actions"><a className="button" href="#work">View Selected Work <ArrowUpRight size={18} /></a><a className="button button-secondary" href="#contact">Discuss a Project</a></div><div className="availability"><i /> Available for freelance work · 10 AM–11 PM IST daily</div></section>

    <aside className="trust-strip" aria-label="Professional trust indicators"><div className="shell trust-grid"><span><Globe2 /> 2 live client websites</span><span><Code2 /> Full-stack & frontend development</span><span><BriefcaseBusiness /> Available for freelance projects</span><span><MapPin /> Hyderabad · Working globally</span></div></aside>

    <section id="work" className="section shell"><SectionIntro label="Selected work" title="Useful products, deployed for real people." text="Client work comes first. Every live claim below links to a publicly accessible deployment."/><div className="project-grid">{liveProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      <h3 className="subsection-title">Additional projects</h3><div className="compact-grid">{otherProjects.map(([name, category, description, tech, image]) => <article className="compact-card" key={name}>{image ? <img src={image} alt={`${name} project preview`} loading="lazy" /> : <div className="compact-mark"><Sparkles /> TBH</div>}<div><p className="project-category">{category}</p><h3>{name}</h3><p>{description}</p><div className="tag-list">{tech.map(item => <span key={item}>{item}</span>)}</div></div></article>)}</div>
    </section>

    <section id="services" className="section section-surface"><div className="shell"><SectionIntro label="Services & pricing" title="Straightforward packages for clear business goals." text="Business websites and landing pages are the primary focus, followed by e-commerce projects."/><div className="service-grid">{services.map((service, index) => <article className={`service-card ${index === 0 ? 'recommended' : ''}`} key={service.name}><span className="service-badge">{service.badge}</span><h3>{service.name}</h3><p className="price">{service.price}</p><p>{service.text}</p><ul>{service.includes.map(item => <li key={item}><Check size={17} /> {item}</li>)}</ul><a className="button service-button" href="#contact">Request a Quote</a></article>)}</div><p className="pricing-note">Final pricing depends on page count, functionality, integrations, content requirements and delivery timeline.</p></div></section>

    <section id="about" className="section shell about-grid"><div><p className="section-label">About</p><h2>Technical thinking meets clear visual communication.</h2></div><div className="about-copy"><p>I’m Gouda Mani Sandeep, a Computer Science graduate based in Hyderabad. I build responsive web experiences and AI-powered tools, with practical client experience across renewable energy, events, nonprofit content and business services.</p><p>My background in development and creative design helps me handle both how a product works and how it communicates. I’m comfortable working independently, adapting to changing requirements and supporting a project beyond the initial launch.</p><div className="tag-list skills">{['HTML & CSS','JavaScript','React','Python','Flutter','Firebase','REST APIs','Gemini API','Git & GitHub','UI/UX'].map(skill => <span key={skill}>{skill}</span>)}</div><div className="about-actions"><a className="button button-secondary" href="/Mani-Sandeep-Resume.pdf" download>Download Résumé <Download size={18} /></a><a className="text-link" href="https://github.com/gmanisandeep" target="_blank" rel="noreferrer"><Github size={18} /> View GitHub <ExternalLink size={15} /></a></div></div></section>

    <section id="experience" className="section section-surface"><div className="shell"><SectionIntro label="Experience" title="Hands-on client work with technical ownership."/><article className="experience-card"><div className="experience-meta"><p>June–July 2026</p><span>Hyderabad, India</span></div><div><h3>Website Developer & Graphic Designer Intern</h3><p className="experience-company">Dhan Enterprises & Suprabha Trust</p><ul><li>Developed and maintained the IRE Expo 2026 website and supported event registration workflows.</li><li>Built and enhanced business, nonprofit and Knowledge Bank interfaces across mobile and desktop.</li><li>Created event banners, certificates, posters, social creatives and marketing material.</li><li>Worked directly with the CRO and handled changing requirements under tight timelines.</li></ul></div></article></div></section>

    <section className="section shell testimonial"><p className="section-label">Client reference</p><blockquote>“Mani Sandeep made a valuable contribution to Dhan Enterprises, Suprabha Trust and IRE Expo 2026 through website development, design and digital support. He handled responsibilities independently, adapted quickly to changing requirements and consistently delivered work within tight timelines. His technical skills, creativity and willingness to take ownership made him a dependable contributor to our projects.”</blockquote><div className="testimonial-person"><span>HM</span><p><strong>Harish Manjunath</strong><br/>CRO, Dhan Enterprises and Suprabha Trust</p></div></section>

    <section id="contact" className="section contact-section"><div className="shell contact-grid"><div><p className="section-label">Contact</p><h2>Have a project in mind?</h2><p>Tell me what you are building and I’ll help you choose the right website or digital solution.</p><div className="contact-options"><a href="https://wa.me/919398116740?text=Hi%20Mani%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp: +91 93981 16740</a><a href="mailto:gmanisandeep@gmail.com"><Mail /> gmanisandeep@gmail.com</a><span><Clock3 /> Available 10 AM–11 PM IST daily</span></div></div><ContactForm /></div></section>
  </main>
  <footer><div className="shell footer-grid"><div><a className="brand" href="#home">MANI<span>.</span></a><p>Web developer, AI builder and creative technologist.</p></div><div className="social-links"><a href="https://www.linkedin.com/in/manisandeepg/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href="https://github.com/gmanisandeep" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href="https://www.instagram.com/manisandeepg/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a><a href="https://www.x.com/manisandeepg/" target="_blank" rel="noreferrer" aria-label="X"><span>𝕏</span></a></div><p>© 2026 Mani Sandeep · Hyderabad, India</p></div></footer>
  <a className="mobile-project-cta" href="#contact">Discuss a Project</a></>;
}
