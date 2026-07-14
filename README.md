# Mani Sandeep Portfolio

An editorial portfolio for Mani Sandeep, a creative web developer and AI builder based in Hyderabad. The site is built with React and Vite, deployed on Netlify, and designed around verifiable project evidence rather than unverified claims.

## Stack

- React 19 and Vite 8
- Hand-authored responsive CSS
- Build-time HTML generation for six case-study routes
- Netlify Forms for project enquiries
- Playwright and axe-core for regression and accessibility checks

## Local development

```bash
pnpm install
pnpm dev
```

## Verification

```bash
pnpm lint
pnpm build
pnpm test:e2e
```

The production build creates route-specific HTML for:

- `/work/dhan-enterprises`
- `/work/suprabha-trust`
- `/work/twinkle-ai`
- `/work/campus-connect`
- `/work/life-os`
- `/work/tbh-creatives`

Netlify configuration is kept in `public/_headers` and `public/_redirects`. Unknown routes use the custom `public/404.html` response instead of an SPA catch-all.

## Content rules

- Project status, roles, outcomes and screenshots must remain evidence-backed.
- Do not label a cropped desktop image as a mobile interface.
- Add repository links only when the repository is public and appropriate to share.
- Keep the cream, black and red editorial identity intact when extending the site.
