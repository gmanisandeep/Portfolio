import { ArrowUpRight, ExternalLink } from 'lucide-react'

export default function LiveSiteLink({
  project,
  className,
  children = 'View live site',
}) {
  const isInternal = project.url?.startsWith('/')

  return (
    <a
      className={className}
      href={project.url}
      target={isInternal ? undefined : '_blank'}
      rel={isInternal ? undefined : 'noreferrer'}
    >
      {children}
      {isInternal ? <ArrowUpRight /> : <ExternalLink />}
    </a>
  )
}
