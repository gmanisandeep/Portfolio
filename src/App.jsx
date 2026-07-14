import { useMemo } from 'react';
import { projects } from './data/portfolio';
import CaseStudyPage from './pages/CaseStudyPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const project = useMemo(() => path.startsWith('/work/') ? projects.find(item => item.slug === path.split('/')[2]) : null, [path]);
  if (path === '/') return <HomePage />;
  if (project) return <CaseStudyPage project={project} />;
  return <NotFoundPage />;
}
