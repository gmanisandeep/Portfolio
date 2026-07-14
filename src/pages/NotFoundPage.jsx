import { ArrowUpRight } from 'lucide-react';
import PageMeta from '../seo/PageMeta';
import { Footer, Header } from '../ui/SiteChrome';

export default function NotFoundPage() {
  return <><PageMeta title="Page not found — Mani Sandeep" description="The requested portfolio page could not be found." path={window.location.pathname} noIndex /><Header internal /><main id="top" className="not-found"><div><p className="folio">404 / Lost route</p><h1>This page is not part of the build.</h1><p>The portfolio and its case studies are still right where they should be.</p><div className="not-found-actions"><a className="button button-red" href="/">Return home <ArrowUpRight /></a><a className="text-button" href="/#work">Explore selected work <ArrowUpRight /></a></div></div></main><Footer internal /></>;
}
