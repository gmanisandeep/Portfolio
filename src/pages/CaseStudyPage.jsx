import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects, site } from '../data/portfolio';
import PageMeta from '../seo/PageMeta';
import ProjectMedia from '../ui/ProjectMedia';
import { Footer, Header, ScrollProgress } from '../ui/SiteChrome';

export default function CaseStudyPage({ project }) {
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];
  const title = `${project.title} Case Study — Mani Sandeep`;
  const description = `${project.summary} Read Mani Sandeep’s role, constraints, decisions and verifiable outcome.`;
  const image = project.image ? `${site.url}${project.image}` : site.socialImage;

  useEffect(() => { window.scrollTo(0, 0); }, [project.slug]);

  return <><PageMeta title={title} description={description} path={`/work/${project.slug}`} image={image} /><ScrollProgress /><a className="skip-link" href="#case-main">Skip to content</a><Header internal /><main id="case-main" className="case-main">
    <header id="top" className="case-hero"><div className="shell"><a className="back-link" href="/#work"><ArrowLeft /> All work</a><div className="case-title"><p className="folio">{project.type} · {project.status} · {project.year}</p><h1>{project.title}</h1><p>{project.summary}</p></div><div className="case-facts"><div><span>Role</span><strong>{project.contribution}</strong></div><div><span>Category</span><strong>{project.category}</strong></div><div><span>Stack</span><strong>{project.tech.join(' · ')}</strong></div></div></div></header>
    <section className="case-visual"><div className="shell"><div className="case-image"><ProjectMedia project={project} eager compact /></div>{project.url && <a className="button button-red" href={project.url} target="_blank" rel="noreferrer">View live project <ExternalLink /></a>}</div></section>
    <section className="case-story"><div className="shell"><div className="case-story-intro"><p className="folio">01 / Context</p><h2>The work behind the interface.</h2></div><div className="case-narrative"><article><span>Problem</span><h3>What needed to change</h3><p>{project.problem}</p></article><article><span>Contribution</span><h3>What I owned</h3><p>{project.role}</p></article><article><span>Direction</span><h3>What I built</h3><p>{project.solution}</p></article><article className="case-outcome"><span>Outcome</span><h3>What can be verified</h3><p>{project.outcome}</p></article></div></div></section>
    <section className="case-decisions"><div className="shell"><div><p className="folio">02 / Constraints</p><h2>Decisions shaped by reality.</h2></div><div className="decision-columns"><article><h3>Constraints</h3><ul>{project.constraints.map(item => <li key={item}>{item}</li>)}</ul></article><article><h3>Key decisions</h3><ul>{project.decisions.map(item => <li key={item}>{item}</li>)}</ul></article></div></div></section>
    {project.detail && <section className="case-detail" aria-labelledby="detail-title"><div className="shell"><h2 id="detail-title" className="visually-hidden">Feature detail</h2><img src={project.detail} width="1272" height="716" loading="lazy" decoding="async" alt={`${project.title} genuine feature detail`} /></div></section>}
    <section className="case-learning"><div className="shell"><p className="folio">03 / Learning</p><blockquote>{project.lessons}</blockquote><a className="button button-dark" href="/#contact">Discuss a similar project <ArrowUpRight /></a></div></section>
    <nav className="case-navigation shell" aria-label="Case study navigation"><a href={`/work/${previous.slug}`}><span><ArrowLeft /> Previous project</span><strong>{previous.title}</strong></a><a className="case-all-work" href="/#work">Back to all work</a><a href={`/work/${next.slug}`}><span>Next project <ArrowRight /></span><strong>{next.title}</strong></a></nav>
  </main><Footer internal /></>;
}
