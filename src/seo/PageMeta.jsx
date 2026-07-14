import { useEffect } from 'react';
import { site } from '../data/portfolio';

function setMeta(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute('content', value);
}

export default function PageMeta({ title = site.title, description = site.description, path = '/', image = site.socialImage, noIndex = false }) {
  useEffect(() => {
    const canonicalUrl = `${site.url}${path === '/' ? '/' : path}`;
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', image);
    setMeta('meta[name="robots"]', noIndex ? 'noindex, nofollow' : 'index, follow');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', canonicalUrl);
  }, [description, image, noIndex, path, title]);

  return null;
}
