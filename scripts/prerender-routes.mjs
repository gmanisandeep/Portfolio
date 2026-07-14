import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { projects, site } from '../src/data/portfolio.js';

const dist = resolve('dist');
const template = await readFile(resolve(dist, 'index.html'), 'utf8');

function replaceMeta(html, selector, value) {
  const escaped = value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const pattern = new RegExp(`(<meta\\s+${selector}\\s+content=")[^"]*("\\s*\\/?>)`, 'i');
  return html.replace(pattern, `$1${escaped}$2`);
}

for (const project of projects) {
  const path = `/work/${project.slug}`;
  const title = `${project.title} Case Study — Mani Sandeep`;
  const description = `${project.summary} Read Mani Sandeep’s role, constraints, decisions and verifiable outcome.`;
  const canonical = `${site.url}${path}`;
  const image = project.image ? `${site.url}${project.image}` : site.socialImage;
  let html = template
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonical}" />`);
  html = replaceMeta(html, 'name="description"', description);
  html = replaceMeta(html, 'property="og:title"', title);
  html = replaceMeta(html, 'property="og:description"', description);
  html = replaceMeta(html, 'property="og:url"', canonical);
  html = replaceMeta(html, 'property="og:image"', image);
  html = replaceMeta(html, 'name="twitter:title"', title);
  html = replaceMeta(html, 'name="twitter:description"', description);
  html = replaceMeta(html, 'name="twitter:image"', image);

  const routeDirectory = resolve(dist, 'work', project.slug);
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(resolve(routeDirectory, 'index.html'), html);
  await writeFile(resolve(dist, 'work', `${project.slug}.html`), html);
}

console.log(`Prerendered ${projects.length} case-study routes.`);
