export default function ProjectMedia({ project, eager = false, compact = false }) {
  if (!project.image) return <div className="project-monogram">{project.title.slice(0, 3).toUpperCase()}<span>{project.category}</span></div>;

  return <div className={`project-art project-art-${project.artKey} ${compact ? 'project-art-compact' : ''}`}>
    <div className="art-browser">
      <div className="art-browser-bar" aria-hidden="true"><i/><i/><i/><span>{project.title}</span></div>
      <img src={project.image} alt={project.imageAlt || `${project.title} desktop interface`} width={project.width} height={project.height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />
    </div>
    {!compact && project.detail && <div className="art-detail"><span>Feature detail</span><img src={project.detail} alt={project.detailAlt || `${project.title} feature detail`} width={project.detailWidth || project.width} height={project.detailHeight || project.height} loading="lazy" decoding="async" /></div>}
  </div>;
}
