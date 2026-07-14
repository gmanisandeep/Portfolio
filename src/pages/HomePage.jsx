import { useEffect, useMemo } from 'react';
import {
  ArrowDown, ArrowUpRight, Clock3, ExternalLink, Mail, MapPin,
  MessageCircle, ShieldCheck,
} from 'lucide-react';
import { processSteps, projects, services, skillGroups } from '../data/portfolio';
import ContactForm from '../forms/ContactForm';
import PageMeta from '../seo/PageMeta';
import ProjectMedia from '../ui/ProjectMedia';
import { Footer, GithubLogo, Header, ScrollProgress } from '../ui/SiteChrome';

function SectionIntro({ index, label, title, text, light = false }) {
  return <div className={`section-intro ${light ? 'intro-light' : ''}`}><p className="folio">{index} / {label}</p><h2>{title}</h2>{text && <p className="intro-copy">{text}</p>}</div>;
}

function HeroDecoration({ mobile = false }) {
  return <div className={`hero-composition ${mobile ? 'hero-composition-mobile shell' : 'hero-composition-desktop'}`} aria-hidden="true"><div className="composition-panel panel-one"><span>WEB / 01</span><strong>Build for clarity.</strong></div><div className="composition-panel panel-two"><span>AI / 02</span><strong>Design for use.</strong></div><div className="composition-rule" /></div>;
}

function ProjectCard({ project, index }) {
  return <article className={`project project-${project.artKey}`}>
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
    <div className="evidence-thumb"><ProjectMedia project={project} compact /></div>
    <p>{project.evidenceType}</p><h3>{project.title}</h3>
    <dl><div><dt>Role</dt><dd>{project.contribution}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div></dl>
    <div><a href={`/work/${project.slug}`}>Inspect case study <ArrowUpRight /></a>{project.url && <a href={project.url} target="_blank" rel="noreferrer">Open proof <ExternalLink /></a>}</div>
  </article>;
}

export default function HomePage() {
  const initialHash = useMemo(() => window.location.hash.slice(1), []);

  useEffect(() => {
    if (!initialHash) return;
    requestAnimationFrame(() => document.getElementById(initialHash)?.scrollIntoView());
  }, [initialHash]);

  return <><PageMeta /><ScrollProgress /><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">
    <section id="top" className="hero"><div className="hero-grid shell">
      <div className="hero-kicker"><span>Hyderabad / India</span><span>Available for selected projects</span></div>
      <h1>Digital products that <em>look sharp</em> and work hard.</h1>
      <div className="hero-side"><p>Creative web developer and AI builder based in Hyderabad. I design and develop responsive websites, digital products and intelligent interfaces.</p><div className="hero-actions"><a className="button button-red" href="#work">View Selected Work <ArrowDown size={17} /></a><a className="text-button" href="#contact">Start a Project <ArrowUpRight size={17} /></a></div></div>
      <HeroDecoration />
      <div className="hero-footer"><p><i /> Client websites shipped · AI products in development · Available globally</p><p>Scroll to explore <ArrowDown size={15} /></p></div>
    </div></section>

    <aside className="proof-strip" aria-label="Portfolio proof"><div className="shell"><span>2 live client websites</span><span>Design → Development → Deployment</span><span>Full-stack + frontend</span><span>Working globally from Hyderabad</span></div></aside>
    <HeroDecoration mobile />

    <section id="work" className="work-section"><div className="shell"><SectionIntro index="01" label="Selected work" title="Work you can inspect." text="Real interfaces, exact responsibilities and honest project status—so you can see what I designed, built and shipped."/><div className="projects-list">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div><div className="section-cta"><p>Planning something with similar ambition?</p><a className="button button-red" href="#contact">Discuss a similar project <ArrowUpRight /></a></div></div></section>

    <section id="services" className="services-section"><div className="shell"><SectionIntro index="02" label="Capabilities" light title="From first idea to a working digital product." text="Services are structured around outcomes, with design and development handled as one connected process."/><div className="service-rows">{services.map((service) => <a href="#contact" className="service-row" key={service.number}><span>{service.number}</span><h3>{service.name}</h3><p>{service.copy}</p><strong>{service.price}</strong><ArrowUpRight /></a>)}</div><p className="pricing-disclaimer">Indicative pricing covers the agreed design, development and deployment setup. Content, hosting, maintenance, additional revisions and third-party costs are scoped separately when required.</p></div></section>

    <section id="process" className="process-section"><div className="shell"><SectionIntro index="03" label="Process" title="A clear route from uncertainty to launch." text="Each phase ends with an output or decision, so the work stays understandable and progress remains visible."/><ol className="process-list">{processSteps.map(([step, description], index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><p>{description}</p><i /></li>)}</ol></div></section>

    <section id="experience" className="experience-section"><div className="shell"><SectionIntro index="04" label="Experience" title="Real work, changing requirements, full ownership."/><article className="experience"><div className="experience-date">June—July 2026<br/><span>Hyderabad, India</span></div><div><p className="role-label">Web Developer & Creative Design Intern</p><h3>Dhan Enterprises / Suprabha Trust / IRE Expo 2026</h3><p>Worked across website development, frontend implementation, administrative workflows, event registration, Knowledge Bank migration and digital event support.</p><div className="responsibility-grid"><span>Website development</span><span>Admin dashboard work</span><span>Event registration pages</span><span>Banner & social design</span><span>Communication assets</span><span>Knowledge-base migration</span></div></div></article></div></section>

    <section className="skills-section"><div className="shell"><SectionIntro index="05" label="Systems" light title="A practical stack for designing, building and shipping."/><div className="skill-map">{skillGroups.map(([group, skills], index) => <article key={group}><span>0{index + 1}</span><h3>{group}</h3><ul>{skills.map(skill => <li key={skill}>{skill}</li>)}</ul></article>)}</div></div></section>

    <section id="about" className="about-section"><div className="shell about-grid"><div><p className="folio">06 / About</p><h2>Design sense.<br/>Technical depth.<br/><em>Business awareness.</em></h2></div><div className="about-copy"><p>I’m Gouda Mani Sandeep, a Computer Science graduate based in Hyderabad. My work sits between web development, AI, product thinking, branding and creative technology.</p><p>I move across structure, interface, implementation and deployment. That range helps protect the original idea while making the final product useful, responsive and clear.</p><p>I’m open to freelance projects, internships, junior roles and thoughtful collaborations.</p><div className="about-actions"><a className="button button-dark" href="/Mani-Sandeep-Resume.pdf" download>Download Résumé <ArrowDown size={17} /></a><a className="arrow-link" href="https://github.com/gmanisandeep" target="_blank" rel="noreferrer"><GithubLogo /> GitHub <ExternalLink /></a></div></div></div></section>

    <section id="evidence" className="evidence-section"><div className="shell"><div className="evidence-heading"><p className="folio">07 / Evidence</p><div><h2>Trust should be inspectable.</h2><p>A separate verification layer for deployed work and a public working prototype—not a second project gallery.</p></div></div><div className="evidence-cards">{projects.filter((project) => project.evidenceType).map(project => <EvidenceCard key={project.slug} project={project} />)}</div></div></section>

    <section id="contact" className="contact-section"><div className="shell"><SectionIntro index="08" label="Contact" light title="Have a project, role, or idea worth building?" text="Share the essentials. I usually respond within one working day."/><div className="contact-grid"><div className="contact-direct"><a href="https://wa.me/919398116740?text=Hi%20Mani%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp<span>+91 93981 16740</span></a><a href="mailto:gmanisandeep@gmail.com"><Mail /> Email<span>gmanisandeep@gmail.com</span></a><p><Clock3 /> 10 AM—11 PM IST daily</p><p><MapPin /> Hyderabad · Working globally</p></div><ContactForm /></div></div></section>
  </main><Footer /><a className="mobile-contact" href="#contact">Start a Project <ArrowUpRight /></a></>;
}
