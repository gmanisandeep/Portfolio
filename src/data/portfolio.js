export const site = {
  url: 'https://manisandeep.qzz.io',
  title: 'Mani Sandeep — Creative Web Developer & AI Builder',
  description: 'Hyderabad-based creative developer building responsive websites, AI-powered products and visually distinctive digital experiences.',
  socialImage: 'https://manisandeep.qzz.io/social-preview.png?v=3',
};

export const projects = [
  {
    slug: 'union-bank-redesign', artKey: 'union-bank', type: 'Independent UX Concept', status: 'Complete Prototype', year: '2026', category: 'Banking · Product redesign · Service discovery',
    title: 'Union Bank Digital Banking Redesign', contribution: 'UX audit, product design and frontend development',
    summary: 'A mobile-first redesign concept that turns a dense internet-banking portal into a clear, searchable and security-aware service experience.',
    problem: 'Union Bank’s public internet-banking portal exposes a wide range of useful services, but dated presentation, dense navigation and fragmented entry points make them harder to discover—especially on smaller screens.',
    solution: 'I created a responsive banking concept with focused quick actions, a searchable 89-service directory, category navigation, security guidance and clearly marked handoffs to official Union Bank pages.',
    outcome: 'A complete responsive React prototype demonstrates the redesigned homepage, service discovery model, support journeys and safe official-site handoffs across desktop and mobile.',
    role: 'I independently audited the public experience, mapped its service catalogue, defined the visual and interaction system, built the responsive interface and tested the core journeys.',
    constraints: ['The concept could not imply endorsement or affiliation', 'No screen could collect or imitate real banking credentials', 'A large catalogue of services had to remain easy to scan on mobile'],
    decisions: ['Kept Union Bank’s recognisable red and blue while modernising the surrounding system', 'Made service search and category filters the centre of the information architecture', 'Redirected sensitive actions to official bank pages instead of reproducing authenticated flows'],
    lessons: 'Trust in financial interfaces comes from clarity, restraint and honest boundaries—not visual polish alone.',
    disclaimer: 'Independent portfolio concept. Not commissioned, approved or endorsed by Union Bank of India. No banking credentials or customer data are collected.',
    tech: ['React', 'Vite', 'Motion', 'Responsive UX', 'Accessibility'],
    image: '/work/union-bank-home.png', imageAlt: 'Union Bank redesign concept homepage with a modern banking hero and official brand colours', width: 1265, height: 712,
    detail: '/work/union-bank-services.png', detailAlt: 'Searchable service directory in the Union Bank redesign concept', detailWidth: 1265, detailHeight: 712,
  },
  {
    slug: 'dhan-enterprises', legacySlug: 'dhan', artKey: 'dhan', type: 'Client Project', status: 'Live', year: '2026', category: 'Renewable energy · Business · Events',
    title: 'Dhan Enterprises & IRE Expo 2026', contribution: 'Full-stack website development', evidenceType: 'Live production website',
    summary: 'A public business and event platform that connects renewable-energy services, expo communication and registration workflows.',
    problem: 'The client needed one credible digital home for its services and IRE Expo 2026, with clear event information, registrations and internal data management.',
    solution: 'I designed responsive service and event pages, built registration workflows and supported administrative functionality for submitted data.',
    outcome: 'The public site is deployed and used for IRE Expo 2026 information and online registrations.',
    role: 'Independent design and development across the public website, registration journeys, event content and ongoing updates.',
    constraints: ['Changing event requirements', 'Public information and internal workflows had to stay aligned', 'Registration paths needed to work clearly on mobile'],
    decisions: ['Separated company services from expo-specific actions', 'Made registration and stall-booking actions persistent', 'Designed content and administrative workflows as one system'],
    lessons: 'Event platforms work best when public content, conversion paths and internal data handling are planned together.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Backend integration', 'Admin dashboard'],
    url: 'https://www.win-dhan.com', image: '/work/dhan-desktop.webp', detail: '/work/dhan-detail.webp', width: 1272, height: 716,
  },
  {
    slug: 'suprabha-trust', legacySlug: 'suprabha', artKey: 'suprabha', type: 'Internship Work', status: 'Live', year: '2026', category: 'Nonprofit · Knowledge platform',
    title: 'Suprabha Trust Knowledge Bank', contribution: 'Frontend design and development', evidenceType: 'Deployed client system',
    summary: 'A refined nonprofit website and structured Knowledge Bank for spiritual and educational content.',
    problem: 'The trust needed a modern mobile experience and a clearer way to organise and discover a growing educational archive.',
    solution: 'I improved responsive behaviour and created category organisation, search, filtering, article pages and metadata enhancements.',
    outcome: 'The upgraded site and publicly accessible Knowledge Bank are deployed for visitors to browse structured content.',
    role: 'Frontend implementation, responsive refinement, Knowledge Bank structure, search logic and technical SEO support.',
    constraints: ['A growing article collection', 'Content needed to remain approachable across age groups', 'Discoverability depended on structure and metadata'],
    decisions: ['Organised content by category and article', 'Added search and filtering instead of a flat archive', 'Improved metadata and social-sharing foundations'],
    lessons: 'For content-rich sites, information architecture is a product feature—not a finishing task.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Search logic', 'Technical SEO'],
    url: 'https://www.suprabha-trust.in', image: '/work/suprabha-desktop.webp', detail: '/work/suprabha-detail.webp', width: 1272, height: 716,
  },
  {
    slug: 'twinkle-ai', legacySlug: 'twinkle', artKey: 'twinkle', type: 'Personal Product', status: 'Working Prototype', year: '2026', category: 'AI assistant · Productivity',
    title: 'Twinkle AI', contribution: 'Product design and AI development', evidenceType: 'Public working prototype',
    summary: 'A personal AI operator exploring serverless requests, focused conversations and a minimal workspace.',
    problem: 'General chat tools do not provide a focused workspace for projects, conversations and specialised assistance.',
    solution: 'I built a conversational interface, Gemini integration and a Netlify Function that keeps the API key outside frontend code.',
    outcome: 'A functional AI assistant is deployed with Google sign-in and a serverless AI request path.',
    role: 'Concept, interaction design, frontend development and serverless integration.',
    constraints: ['API credentials could not live in frontend code', 'The experience needed clear authentication and response states', 'The product scope had to stay small enough to test'],
    decisions: ['Moved model requests behind a Netlify Function', 'Used a restrained interface to keep the primary action obvious', 'Structured the build for future project and chat organisation'],
    lessons: 'AI products need trustworthy system boundaries and clear states as much as they need model capability.',
    tech: ['JavaScript', 'Gemini API', 'Netlify Functions', 'Serverless'],
    url: 'https://twinkleos.netlify.app', image: '/work/twinkle-desktop.webp', width: 1280, height: 720,
  },
  {
    slug: 'campus-connect', legacySlug: 'campus', artKey: 'campus', type: 'Academic Project', status: 'Completed', year: '2026', category: 'Education · Full-stack platform',
    title: 'Campus Connect', contribution: 'Full-stack product development',
    summary: 'A role-based campus-management system joining student and faculty workflows in one product.',
    problem: 'Attendance, announcements, events and academic communication were fragmented across separate workflows.',
    solution: 'I developed separate student and faculty dashboards with shared campus features and role-based access control.',
    outcome: 'Completed as a final-year full-stack application demonstrating unified student and faculty workflows.',
    role: 'Full-stack architecture, dashboard design, authentication, database integration and responsive implementation.',
    constraints: ['Different roles required different permissions', 'Shared data had to remain consistent', 'Multiple campus functions competed for navigation space'],
    decisions: ['Separated dashboards by role', 'Kept shared services on one backend', 'Prioritised high-frequency campus tasks in the interface'],
    lessons: 'Role-based products become easier to maintain when permissions, information architecture and UI states are designed together.',
    tech: ['Authentication', 'Role-based access', 'Database', 'Responsive UI'],
    image: '/work/campus_connect_thumb.webp', width: 1024, height: 1024,
  },
  {
    slug: 'ghost-rider-fan-archive', legacySlug: 'ghost-rider', artKey: 'ghost-rider', type: 'Personal Project', status: 'Live', year: '2026', category: 'Film fan archive · Editorial experience',
    title: 'Ghost Rider Fan Archive', contribution: 'Creative direction, research and frontend development', evidenceType: 'Public live experience',
    summary: 'A cinematic, long-form Ghost Rider fan archive combining character history, comics, films, Riders and a curated visual vault.',
    problem: 'Ghost Rider information is scattered across comic eras, film adaptations and online speculation, while most fan pages reduce the character to a basic gallery or wiki layout.',
    solution: 'I designed and built a poster-like scrolling experience that organises the mythology into a clear story, separates confirmed information from rumours and keeps the visual language rooted in ink, bone, leather and hellfire.',
    outcome: 'The complete responsive archive is publicly deployed with story chapters, Rider lineage, film and cast history, source-aware updates and downloadable artwork links.',
    role: 'I shaped the concept, researched the material, designed the visual system, built the React experience, added motion and prepared the production deployment.',
    constraints: ['A large mythology needed a readable narrative structure', 'Fan speculation had to remain clearly separated from confirmed information', 'Image-heavy sections still needed responsive performance'],
    decisions: ['Used a theatrical campaign structure instead of a conventional card grid', 'Organised the story by curse, lineage, screen history and archive', 'Kept motion atmospheric and preserved reduced-motion support'],
    lessons: 'A fan experience becomes more credible when spectacle, information hierarchy and source transparency are designed as one system.',
    tech: ['React', 'Framer Motion', 'Vite', 'Cloudflare Workers'],
    url: 'https://ghost-rider-fan-archive.manisandeepg.chatgpt.site', primaryAction: 'live',
    image: '/work/ghost-rider-homepage.webp', imageAlt: 'Ghost Rider Fan Archive homepage with its flaming Rider hero and red wordmark', width: 1600, height: 770,
    detail: '/work/ghost-rider-screen.webp', detailAlt: 'Ghost Rider Fan Archive screen-history section featuring the Ryan Gosling announcement', detailWidth: 1600, detailHeight: 900,
  },
];

export const services = [
  { number: '01', name: 'Business websites', copy: 'Responsive sites for businesses and organisations, structured around credibility, services and enquiries.', price: '₹10k–₹15k' },
  { number: '02', name: 'Landing pages', copy: 'Focused campaign pages for launches, events, lead generation and idea validation.', price: '₹5k–₹8k' },
  { number: '03', name: 'E-commerce', copy: 'Online stores with product listings, cart, checkout and agreed payment integration.', price: '₹20k–₹35k' },
  { number: '04', name: 'Full-stack products', copy: 'Interfaces, data flows, authentication and admin tools designed as one connected system.', price: 'Custom scope — quoted after discovery' },
  { number: '05', name: 'AI-powered web apps', copy: 'Useful AI features with serverless integrations, clear states and practical user experience.', price: 'Custom scope — based on features and integrations' },
  { number: '06', name: 'UI/UX & redesign', copy: 'Structure, visual direction and responsive refinement for products that need greater clarity.', price: 'From ₹8k' },
];

export const processSteps = [
  ['Discovery', 'Understand the business, audience, priorities and constraints.'],
  ['Strategy', 'Define project goals, success criteria and content direction.'],
  ['Structure', 'Create the sitemap, page hierarchy and user flow.'],
  ['Visual direction', 'Establish typography, colour, grid and interface principles.'],
  ['Development', 'Build reusable, responsive and accessible components.'],
  ['Testing', 'Validate functionality, responsive behaviour and performance.'],
  ['Launch', 'Deploy, verify production configuration and monitor issues.'],
  ['Improvement', 'Refine the product using feedback and real usage.'],
];

export const skillGroups = [
  ['Frontend', ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive design']],
  ['Backend & data', ['Python', 'SQL', 'Firebase', 'Firestore', 'Supabase', 'Serverless functions']],
  ['Platforms', ['Git', 'GitHub', 'Netlify', 'Vercel', 'Figma', 'VS Code']],
  ['Creative & AI', ['UI/UX', 'AI integration', 'Prompt engineering', 'Creative direction', 'Branding']],
];

export const sections = ['Work', 'Services', 'About', 'Contact'];

export const projectTypes = ['Business website', 'Landing page', 'E-commerce', 'AI-powered application', 'UI/UX or redesign', 'Another project'];
export const budgetRanges = ['₹5,000–₹10,000', '₹10,000–₹20,000', '₹20,000–₹35,000', '₹35,000+', 'Not sure yet'];
