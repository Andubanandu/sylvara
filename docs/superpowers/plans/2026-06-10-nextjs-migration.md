# Sylvara Web — Next.js Migration + ContainerScroll Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the static HTML Sylvara website to Next.js 15 + TypeScript + Tailwind CSS + shadcn project structure, and integrate the ContainerScroll framer-motion animation on the homepage.

**Architecture:** The existing `styles.css` design tokens (CSS custom properties + component classes) are preserved verbatim in `globals.css` so no styles break during migration. Each page becomes a Next.js Server Component; only the portfolio filter and contact form are Client Components. The ContainerScroll component is wired into the homepage as a "work preview" section between the hero and services grid.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, Tailwind CSS 3.4, framer-motion 12, shadcn project structure (components.json + `src/components/ui/`), next/font/google

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Create | Dependencies + scripts |
| `tsconfig.json` | Create | TypeScript config |
| `next.config.ts` | Create | Next.js config (remote image domains) |
| `tailwind.config.ts` | Create | Tailwind extending brand colors |
| `postcss.config.js` | Create | PostCSS for Tailwind |
| `components.json` | Create | shadcn config (marks `src/components/ui/` as component dir) |
| `src/lib/utils.ts` | Create | `cn()` helper |
| `src/app/globals.css` | Create | All existing styles.css + Tailwind directives |
| `src/app/layout.tsx` | Create | Root layout with fonts, Navbar, Footer |
| `src/app/page.tsx` | Create | Homepage (hero + ContainerScroll + services + CTA) |
| `src/app/services/page.tsx` | Create | Services grid + process steps + CTA |
| `src/app/portfolio/page.tsx` | Create | Filter tabs + project grid + stats |
| `src/app/about/page.tsx` | Create | Team cards + values grid + CTA |
| `src/app/contact/page.tsx` | Create | Contact form + sidebar |
| `src/components/ui/container-scroll-animation.tsx` | Create | Exact copy of provided component |
| `src/components/Navbar.tsx` | Create | Floating nav with mobile overlay |
| `src/components/Footer.tsx` | Create | Footer with social links |
| `src/components/HeroScroll.tsx` | Create | Client wrapper that uses ContainerScroll |
| `src/lib/content.ts` | Create | All English text strings (replaces en.json) |

---

## Task 1: package.json + tsconfig.json + next.config.ts

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "sylvara-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.3.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.15.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^3.4.17",
    "postcss": "^8",
    "autoprefixer": "^10",
    "eslint": "^9",
    "eslint-config-next": "^15.3.2"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Commit**

```bash
git add package.json tsconfig.json next.config.ts
git commit -m "feat: add Next.js 15 + TypeScript project config"
```

---

## Task 2: Tailwind + PostCSS config

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`

- [ ] **Step 1: Create tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#060E3A",
        "bg-card": "#0D1547",
        "bg-card-hover": "#111E5C",
        "bg-footer": "#040A2E",
        accent: {
          DEFAULT: "#2563EB",
          light: "#60A5FA",
          hover: "#1d4ed8",
        },
        "text-primary": "#FFFFFF",
        "text-muted": "#94A3B8",
        "text-subtle": "#718096",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      maxWidth: { container: "1200px" },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Create postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts postcss.config.js
git commit -m "feat: add Tailwind CSS 3 + PostCSS config with brand colors"
```

---

## Task 3: shadcn structure + utils + globals.css

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.ts`
- Create: `src/app/globals.css`

`components.json` marks `src/components/ui/` as the shadcn component directory. Without it, shadcn CLI would not know where to install components. This is why the path must be `components/ui`.

- [ ] **Step 1: Create components.json**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

- [ ] **Step 2: Create src/lib/utils.ts**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Create src/app/globals.css**

Paste the full content below exactly:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ============================================================
   CSS VARIABLES
   ============================================================ */
:root {
  --bg-base: #060E3A;
  --bg-card: #0D1547;
  --bg-card-hover: #111E5C;
  --accent: #2563EB;
  --accent-light: #60A5FA;
  --text-primary: #FFFFFF;
  --text-muted: #94A3B8;
  --text-subtle: #718096;
  --border: rgba(37, 99, 235, 0.25);
  --glow: rgba(37, 99, 235, 0.35);
  --bg-footer: #040A2E;
  --accent-hover: #1d4ed8;
  --radius-card: 12px;
  --radius-btn: 8px;
  --max-w: 1200px;
  --section-py: 80px;
  --nav-h: 76px;
}

/* ============================================================
   RESET + BASE
   ============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; scroll-padding-top: 76px; }
body {
  font-family: var(--font-manrope), 'Manrope', sans-serif;
  background: var(--bg-base);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* ============================================================
   TYPOGRAPHY
   ============================================================ */
h1, h2, h3 { font-family: var(--font-syne), 'Syne', sans-serif; line-height: 1.15; }
h1 { font-size: clamp(2.25rem, 5vw, 3.75rem); font-weight: 800; }
h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; }
h3 { font-size: 1.2rem; font-weight: 700; }
p { line-height: 1.7; }

/* ============================================================
   LAYOUT
   ============================================================ */
.container { width: 100%; max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }
.section { padding: var(--section-py) 0; }
@media (max-width: 640px) { .section { padding: 48px 0; } }

/* ============================================================
   BUTTONS
   ============================================================ */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: var(--radius-btn);
  font-family: var(--font-manrope), 'Manrope', sans-serif;
  font-size: 1rem; font-weight: 600;
  cursor: pointer; border: none; transition: all 200ms ease;
  text-decoration: none; white-space: nowrap;
}
.btn-primary { background: var(--accent); color: #fff; box-shadow: 0 0 24px var(--glow); }
.btn-primary:hover { background: var(--accent-hover); box-shadow: 0 0 36px rgba(37,99,235,0.55); transform: translateY(-1px); }
.btn-ghost { background: transparent; color: var(--text-primary); border: 1px solid rgba(255,255,255,0.2); }
.btn-ghost:hover { border-color: var(--accent-light); color: var(--accent-light); }
.btn:disabled { opacity: 0.6; cursor: not-allowed; pointer-events: none; }

/* ============================================================
   BADGE + SECTION LABEL
   ============================================================ */
.badge {
  display: inline-block;
  background: rgba(37,99,235,0.15); border: 1px solid rgba(37,99,235,0.35);
  border-radius: 9999px; padding: 6px 16px;
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
  color: var(--accent-light); text-transform: uppercase;
}
.section-label {
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em;
  color: var(--accent-light); text-transform: uppercase; margin-bottom: 12px;
}

/* ============================================================
   CARDS
   ============================================================ */
.card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-card); padding: 28px;
  transition: background 200ms ease, border-color 200ms ease;
}
.card:hover { background: var(--bg-card-hover); border-color: rgba(37,99,235,0.5); }
.card-icon {
  width: 48px; height: 48px;
  background: rgba(37,99,235,0.12); border: 1px solid rgba(37,99,235,0.25);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
  transition: background 200ms ease, border-color 200ms ease;
}
.card-icon svg {
  width: 22px; height: 22px;
  stroke: var(--accent-light); fill: none; stroke-width: 1.75;
  stroke-linecap: round; stroke-linejoin: round;
}
.card:hover .card-icon { background: rgba(37,99,235,0.2); border-color: rgba(37,99,235,0.4); }

/* ============================================================
   CTA STRIP
   ============================================================ */
.cta-strip {
  background: linear-gradient(135deg, rgba(37,99,235,0.22), rgba(96,165,250,0.08));
  border: 1px solid var(--border); border-radius: var(--radius-card);
  padding: 48px 56px; display: flex; align-items: center;
  justify-content: space-between; gap: 32px;
}
.cta-strip-text h2 { font-size: clamp(1.4rem, 2.5vw, 1.9rem); margin-bottom: 8px; }
.cta-strip-text p { color: var(--text-muted); }
@media (max-width: 640px) { .cta-strip { flex-direction: column; text-align: center; padding: 36px 24px; } }

/* ============================================================
   GLOW BLOBS
   ============================================================ */
.glow-blob { position: absolute; border-radius: 50%; pointer-events: none; }
.glow-blob-tl { width: 500px; height: 500px; background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%); top: -120px; left: -120px; }
.glow-blob-br { width: 400px; height: 400px; background: radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%); bottom: -80px; right: -80px; }

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
[data-reveal] { opacity: 0; transform: translateY(18px); transition: opacity 300ms ease-out, transform 300ms ease-out; }
[data-reveal].visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  [data-reveal], [data-reveal].visible { opacity: 1; transform: none; transition: none; }
  .btn-primary:hover { transform: none; }
  .card { transition: none; }
  .project-card-img-inner { transition: none; }
  .project-card-overlay { transition: none; }
  .filter-tab { transition: none; }
  .hamburger span { transition: none; }
  .btn { transition: none; }
  .navbar-links a { transition: none; }
  .social-link { transition: none; }
  .social-link svg { transition: none; }
  .footer-links a { transition: none; }
  .lang-btn { transition: none; }
  .nav-overlay a { transition: none; }
}

/* ============================================================
   FOCUS RINGS
   ============================================================ */
:focus-visible { outline: 2px solid var(--accent-light); outline-offset: 3px; border-radius: 4px; }

/* ============================================================
   NAVBAR
   ============================================================ */
.navbar-wrapper { position: fixed; top: 16px; left: 16px; right: 16px; z-index: 30; }
.navbar {
  background: rgba(6,14,58,0.88); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border); border-radius: 12px;
  padding: 0 24px; height: 60px;
  display: flex; align-items: center; justify-content: space-between;
}
.navbar-logo { display: flex; flex-direction: column; line-height: 1; gap: 2px; }
.navbar-logo .logo-main { font-family: var(--font-syne), 'Syne', sans-serif; font-weight: 800; font-size: 1.05rem; letter-spacing: 0.06em; color: #fff; }
.navbar-logo .logo-sub { font-size: 0.58rem; letter-spacing: 0.22em; color: var(--accent-light); text-transform: uppercase; }
.navbar-links { display: flex; align-items: center; gap: 28px; }
.navbar-links a { font-size: 0.875rem; color: var(--text-muted); transition: color 200ms ease; cursor: pointer; }
.navbar-links a:hover, .navbar-links a.active { color: var(--text-primary); }
.lang-switcher {
  display: flex; align-items: center; gap: 2px;
  background: rgba(37,99,235,0.1); border: 1px solid var(--border);
  border-radius: 9999px; padding: 4px 10px;
}
.lang-btn {
  background: none; border: none; font-size: 0.75rem;
  font-family: var(--font-manrope), 'Manrope', sans-serif; font-weight: 600;
  color: var(--text-muted); cursor: pointer; padding: 2px 5px;
  border-radius: 4px; transition: color 200ms ease;
}
.lang-btn.active { color: var(--accent-light); }
.lang-sep { color: var(--text-subtle); font-size: 0.75rem; user-select: none; }
.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.hamburger span { display: block; width: 22px; height: 2px; background: var(--text-primary); border-radius: 2px; transition: all 200ms ease; }
body.menu-open .hamburger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
body.menu-open .hamburger span:nth-child(2) { opacity: 0; }
body.menu-open .hamburger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.nav-overlay {
  display: none; position: fixed; inset: 0;
  background: var(--bg-base); z-index: 40;
  flex-direction: column; align-items: center; justify-content: center; gap: 36px;
}
body.menu-open .nav-overlay { display: flex; }
.nav-overlay a { font-family: var(--font-syne), 'Syne', sans-serif; font-size: 1.75rem; font-weight: 700; color: var(--text-primary); transition: color 200ms ease; }
.nav-overlay a:hover { color: var(--accent-light); }
.nav-overlay-close {
  position: absolute; top: 20px; right: 20px;
  background: none; border: none; color: var(--text-primary);
  font-size: 2rem; line-height: 1; cursor: pointer;
}
.nav-overlay-lang { display: flex; gap: 16px; margin-top: 8px; }
.nav-overlay-lang button { background: none; border: 1px solid var(--border); border-radius: 8px; color: var(--text-muted); font-family: var(--font-manrope), 'Manrope', sans-serif; font-weight: 600; font-size: 1rem; padding: 8px 20px; cursor: pointer; transition: all 200ms ease; }
@media (max-width: 768px) { .navbar-links { display: none; } .hamburger { display: flex; } }

/* ============================================================
   FOOTER
   ============================================================ */
.footer { background: var(--bg-footer); border-top: 1px solid var(--border); }
.footer-main { padding: 64px 0 40px; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 48px; align-items: start; }
.footer-logo-wrap .logo-main { font-family: var(--font-syne), 'Syne', sans-serif; font-weight: 800; font-size: 1.2rem; color: #fff; }
.footer-logo-wrap .logo-sub { font-size: 0.6rem; letter-spacing: 0.22em; color: var(--accent-light); text-transform: uppercase; }
.footer-tagline { color: var(--text-muted); font-size: 0.875rem; margin-top: 10px; max-width: 240px; line-height: 1.6; }
.footer-col-title { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; color: var(--text-subtle); text-transform: uppercase; margin-bottom: 16px; }
.footer-links { display: flex; flex-direction: column; gap: 10px; }
.footer-links a { color: var(--text-muted); font-size: 0.875rem; transition: color 200ms ease; }
.footer-links a:hover { color: var(--accent-light); }
.footer-social { display: flex; gap: 10px; }
.social-link {
  width: 40px; height: 40px; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: 8px;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  transition: border-color 200ms ease, background 200ms ease;
}
.social-link:hover { border-color: var(--accent-light); background: var(--bg-card-hover); }
.social-link svg { width: 18px; height: 18px; stroke: var(--text-muted); fill: none; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; transition: stroke 200ms ease; }
.social-link:hover svg { stroke: var(--accent-light); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding: 20px 0; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.footer-bottom p, .footer-bottom a { color: var(--text-subtle); font-size: 0.8rem; }
.footer-bottom a:hover { color: var(--accent-light); }
@media (max-width: 768px) { .footer-main { grid-template-columns: 1fr; gap: 32px; } .footer-bottom { flex-direction: column; text-align: center; } }

/* ============================================================
   PAGE HERO (inner pages)
   ============================================================ */
.page-hero { min-height: 40vh; display: flex; align-items: center; padding-top: calc(var(--nav-h) + 56px); padding-bottom: 56px; position: relative; overflow: hidden; }
.page-hero .badge { margin-bottom: 16px; }
.page-hero p { color: var(--text-muted); font-size: 1.1rem; max-width: 580px; margin-top: 16px; line-height: 1.7; }

/* ============================================================
   HOME HERO
   ============================================================ */
.home-hero { min-height: 100vh; display: flex; align-items: center; padding-top: calc(var(--nav-h) + 40px); padding-bottom: 40px; position: relative; overflow: hidden; }
.home-hero .badge { margin-bottom: 20px; }
.home-hero h1 { margin-bottom: 20px; }
.home-hero .hero-sub { color: var(--text-muted); font-size: 1.1rem; max-width: 560px; margin-bottom: 36px; line-height: 1.75; }
.hero-cta-row { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; }
@media (max-width: 480px) { .hero-cta-row { flex-direction: column; align-items: flex-start; } }

/* ============================================================
   SERVICES OVERVIEW (homepage)
   ============================================================ */
.services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 36px; }
.services-more { text-align: center; margin-top: 20px; }
.services-more a { color: var(--accent-light); font-size: 0.9rem; transition: opacity 200ms ease; }
.services-more a:hover { opacity: 0.75; }
@media (max-width: 1024px) { .services-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .services-grid { grid-template-columns: 1fr; } }

/* ============================================================
   SERVICES PAGE
   ============================================================ */
.services-full-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 36px; }
@media (max-width: 1024px) { .services-full-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .services-full-grid { grid-template-columns: 1fr; } }
.service-price { font-size: 0.8rem; color: var(--accent-light); margin-top: 12px; }
.process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 36px; position: relative; }
.process-grid::before { content: ''; position: absolute; top: 24px; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); }
.process-step { text-align: center; position: relative; }
.step-number { width: 48px; height: 48px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-syne), 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem; color: #fff; margin: 0 auto 16px; box-shadow: 0 0 20px var(--glow); }
.process-step h3 { font-size: 1rem; margin-bottom: 8px; }
.process-step p { color: var(--text-muted); font-size: 0.875rem; }
@media (max-width: 640px) { .process-grid { grid-template-columns: repeat(2, 1fr); } .process-grid::before { display: none; } }
@media (max-width: 360px) { .process-grid { grid-template-columns: 1fr; } }

/* ============================================================
   PORTFOLIO PAGE
   ============================================================ */
.filter-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
.filter-tab { background: transparent; border: 1px solid var(--border); border-radius: 9999px; padding: 8px 20px; font-family: var(--font-manrope), 'Manrope', sans-serif; font-size: 0.875rem; font-weight: 500; color: var(--text-muted); cursor: pointer; transition: all 200ms ease; }
.filter-tab:hover { border-color: var(--accent-light); color: var(--accent-light); }
.filter-tab.active { background: var(--accent); border-color: var(--accent); color: #fff; }
.portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; }
@media (max-width: 1024px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .portfolio-grid { grid-template-columns: 1fr; } }
.project-card { border-radius: var(--radius-card); overflow: hidden; background: var(--bg-card); border: 1px solid var(--border); cursor: pointer; }
.project-card-img { position: relative; padding-top: 62.5%; overflow: hidden; }
.project-card-img-inner { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: transform 300ms ease; }
.project-card:hover .project-card-img-inner { transform: scale(1.04); }
.project-card-overlay { position: absolute; inset: 0; background: rgba(6,14,58,0.7); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 200ms ease; }
.project-card:hover .project-card-overlay { opacity: 1; }
.project-card-overlay span { color: #fff; font-weight: 600; font-size: 0.9rem; }
.project-card-body { padding: 20px; }
.project-tag { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent-light); margin-bottom: 6px; }
.project-card-body h3 { font-size: 1.05rem; margin-bottom: 6px; }
.project-card-body p { font-size: 0.875rem; color: var(--text-muted); }
.stats-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 48px; background: rgba(37,99,235,0.07); border: 1px solid var(--border); border-radius: var(--radius-card); text-align: center; margin: 60px 0; }
.stat-number { font-family: var(--font-syne), 'Syne', sans-serif; font-size: 2.75rem; font-weight: 800; color: var(--accent-light); }
.stat-label { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }
@media (max-width: 640px) { .stats-strip { grid-template-columns: 1fr; padding: 32px 24px; } }

/* ============================================================
   ABOUT PAGE
   ============================================================ */
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 36px; }
@media (max-width: 900px) { .team-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .team-grid { grid-template-columns: 1fr; } }
.team-card { text-align: center; padding: 36px 24px; }
.team-avatar { width: 96px; height: 96px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent-light)); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-family: var(--font-syne), 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem; color: #fff; }
.team-card h3 { margin-bottom: 4px; }
.team-role { font-size: 0.875rem; color: var(--accent-light); margin-bottom: 10px; }
.team-bio { font-size: 0.875rem; color: var(--text-muted); }
.values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 36px; }
@media (max-width: 900px) { .values-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .values-grid { grid-template-columns: 1fr; } }

/* ============================================================
   CONTACT PAGE
   ============================================================ */
.contact-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; margin-top: 56px; align-items: start; }
@media (max-width: 768px) { .contact-layout { grid-template-columns: 1fr; } }
.form-group { margin-bottom: 22px; }
.form-group label { display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; }
.form-group input, .form-group select, .form-group textarea {
  width: 100%; background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 8px; padding: 13px 16px;
  color: var(--text-primary); font-family: var(--font-manrope), 'Manrope', sans-serif; font-size: 0.95rem;
  transition: border-color 200ms ease;
  appearance: none; -webkit-appearance: none; outline: none;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--accent); }
.form-group input::placeholder, .form-group textarea::placeholder { color: var(--text-subtle); }
.form-group textarea { resize: vertical; min-height: 140px; }
.form-group select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2360A5FA' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 40px; cursor: pointer; }
.form-group select option { background: var(--bg-card); }
.field-error { display: none; font-size: 0.8rem; color: #F87171; margin-top: 6px; }
.form-group.has-error input, .form-group.has-error select, .form-group.has-error textarea { border-color: #F87171; }
.form-group.has-error .field-error { display: block; }
.form-success { display: none; background: rgba(37,99,235,0.1); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 36px; text-align: center; }
.form-success.visible { display: block; }
.form-success h3 { margin-bottom: 8px; }
.form-success p { color: var(--text-muted); }
.contact-card { padding: 28px; margin-bottom: 20px; }
.contact-card h3 { margin-bottom: 8px; }
.contact-card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px; }
.contact-info-item { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.contact-info-item svg { width: 18px; height: 18px; stroke: var(--accent-light); fill: none; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
.contact-info-item span { color: var(--text-muted); font-size: 0.9rem; }

/* ============================================================
   UTILITY
   ============================================================ */
.text-center { text-align: center; }
.mt-8 { margin-top: 8px; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.mt-48 { margin-top: 48px; }
.mt-64 { margin-top: 64px; }
```

- [ ] **Step 4: Commit**

```bash
git add components.json src/lib/utils.ts src/app/globals.css
git commit -m "feat: add shadcn structure, utils, and global styles"
```

---

## Task 4: ContainerScroll component

**Files:**
- Create: `src/components/ui/container-scroll-animation.tsx`

- [ ] **Step 1: Create src/components/ui/container-scroll-animation.tsx**

Copy the file verbatim:

```tsx
"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/container-scroll-animation.tsx
git commit -m "feat: add ContainerScroll framer-motion component"
```

---

## Task 5: Content data

**Files:**
- Create: `src/lib/content.ts`

- [ ] **Step 1: Create src/lib/content.ts**

```ts
export const nav = {
  services: "Services",
  work: "Work",
  about: "About",
  contact: "Contact",
};

export const home = {
  hero: {
    badge: "FULL-SERVICE DESIGN AGENCY",
    line1: "Bold Design.",
    line2: "Real Results.",
    sub: "We build high-converting websites and brand identities for businesses that want to stand out. Web design, branding, SEO, and more — all under one roof.",
    ctaPrimary: "Get a Free Quote",
    ctaGhost: "View Our Work →",
  },
  services: {
    label: "WHAT WE DO",
    h2: "Everything your brand needs, in one place.",
    more: "+ 4 more services →",
  },
  scroll: {
    title: "Designed to convert.",
    subtitle: "Built to perform.",
  },
  cta: {
    h2: "Ready to get started?",
    sub: "Free consultation, no commitment.",
    btn: "Book a Call",
  },
};

export const services = {
  hero: {
    badge: "WHAT WE OFFER",
    h1: "Services Built for Growth",
    sub: "From your first website to a full brand overhaul — we have the skills to move your business forward.",
  },
  list: [
    {
      title: "Web Design",
      desc: "Beautiful, responsive websites that load fast and convert visitors into customers. Built to work flawlessly on every device.",
      price: "Starting from €799",
    },
    {
      title: "Branding",
      desc: "Complete brand identity systems — strategy, visual identity, brand guidelines, and assets that set you apart from the competition.",
      price: "Starting from €599",
    },
    {
      title: "Logo Design",
      desc: "A distinctive, versatile logo that represents your business perfectly across print, web, and social media.",
      price: "Starting from €299",
    },
    {
      title: "SEO",
      desc: "On-page optimisation, technical SEO, and content strategy to get your website ranking on Google and driving organic traffic.",
      price: "Starting from €399/mo",
    },
    {
      title: "E-Commerce",
      desc: "Online shops designed to sell. Seamless checkout experience, product management, and payment integration.",
      price: "Starting from €999",
    },
    {
      title: "Social Media Design",
      desc: "On-brand graphics, templates, and visual content for Instagram, Facebook, LinkedIn, and beyond.",
      price: "Starting from €299",
    },
    {
      title: "Copywriting",
      desc: "Compelling website copy, blog posts, and marketing content that speaks to your audience and drives action.",
      price: "Starting from €199",
    },
    {
      title: "Website Maintenance",
      desc: "Monthly care plans covering updates, backups, security monitoring, and performance checks — so you never have to worry.",
      price: "Starting from €99/mo",
    },
  ],
  process: {
    h2: "How We Work",
    sub: "A clear, collaborative process from first call to launch day.",
    steps: [
      { n: 1, title: "Discover", desc: "We learn about your business, goals, and audience." },
      { n: 2, title: "Design", desc: "We craft the visual direction and get your approval." },
      { n: 3, title: "Build", desc: "We develop the full solution to the highest standard." },
      { n: 4, title: "Launch", desc: "We go live and support you through the handover." },
    ],
  },
};

export const portfolio = {
  hero: {
    badge: "OUR WORK",
    h1: "Work We're Proud Of",
    sub: "A selection of projects across web design, branding, and digital.",
  },
  filters: ["All", "Web Design", "Branding", "E-Commerce"],
  projects: [
    { category: "web", initials: "MK", gradient: "linear-gradient(135deg,#1e3a5f,#2563eb)", tag: "Web Design", title: "Mäkke Café", desc: "Brand identity and website for a specialty coffee shop in Tallinn." },
    { category: "web", initials: "NF", gradient: "linear-gradient(135deg,#0f172a,#1d4ed8)", tag: "Web Design", title: "NordFlow SaaS", desc: "Landing page and onboarding flow for a B2B productivity platform." },
    { category: "branding", initials: "KC", gradient: "linear-gradient(135deg,#1a1a2e,#4a1942)", tag: "Branding", title: "Kivi & Co.", desc: "Full rebrand and brand guidelines for a construction consultancy." },
    { category: "ecommerce", initials: "LB", gradient: "linear-gradient(135deg,#1a1a1a,#6b21a8)", tag: "E-Commerce", title: "Lumi Boutique", desc: "E-commerce store for a Scandinavian fashion label." },
    { category: "web", initials: "HD", gradient: "linear-gradient(135deg,#042f2e,#0d9488)", tag: "Web Design", title: "Harmo Dental", desc: "Website and SEO setup for a modern dental clinic." },
    { category: "branding", initials: "PS", gradient: "linear-gradient(135deg,#1c1917,#b45309)", tag: "Branding", title: "Päike Studio", desc: "Logo and social media kit for a photography studio." },
  ],
  stats: [
    { value: "50+", label: "Projects Delivered" },
    { value: "3", label: "Years of Experience" },
    { value: "100%", label: "Client Satisfaction" },
  ],
  cta: "Start Your Project",
};

export const about = {
  hero: {
    badge: "WHO WE ARE",
    h1: "We Are Sylvara",
    sub: "A small team of designers and developers who believe great digital work changes how businesses grow. We work closely with our clients — no account managers, just direct collaboration with the people building your project.",
  },
  team: {
    h2: "Meet the Team",
    members: [
      { initials: "MK", name: "Marten Kask", role: "Lead Designer & Founder", bio: "10 years of UI/UX experience across agencies and startups." },
      { initials: "LT", name: "Laura Tamm", role: "Web Developer", bio: "Full-stack developer with a love for clean, performant front-ends." },
      { initials: "KS", name: "Karl Sepp", role: "Brand Strategist", bio: "Helps clients find their voice and stand out in crowded markets." },
    ],
  },
  values: {
    h2: "What We Stand For",
    items: [
      { title: "Quality", desc: "We don't cut corners. Every project gets our full attention and a standard we're proud to put our name on." },
      { title: "Transparency", desc: "Clear timelines, honest pricing, and open communication from kickoff to handover." },
      { title: "Results", desc: "Beautiful design is only half the job. We build things that perform and help your business grow." },
    ],
  },
  cta: "Work With Us",
};

export const contact = {
  hero: {
    badge: "GET IN TOUCH",
    h1: "Let's Build Something Great",
    sub: "Tell us about your project and we'll get back to you within 24 hours.",
  },
  form: {
    labelName: "Your Name",
    placeholderName: "Jane Smith",
    labelEmail: "Email Address",
    placeholderEmail: "jane@company.com",
    labelService: "Service Interested In",
    defaultService: "Select a service…",
    labelMessage: "Message",
    placeholderMessage: "Tell us about your project, timeline, and any details that would help us understand what you need.",
    submit: "Send Message",
    errorName: "Please enter your name.",
    errorEmail: "Please enter a valid email address.",
    errorService: "Please select a service.",
    errorMessage: "Please write a short message.",
    successH3: "Message sent!",
    successP: "Thanks for reaching out. We'll be in touch within 24 hours.",
  },
  book: {
    h3: "Book a Discovery Call",
    p: "Prefer to talk? Book a free 30-minute call and we'll walk through your project together.",
    btn: "Book on Calendly",
  },
  info: {
    email: "hello@sylvaradesign.com",
    location: "Tallinn, Estonia",
    response: "We reply within 24 hours",
  },
};

export const footer = {
  tagline: "Bold Design. Real Results.",
  nav: "Navigation",
  follow: "Follow Us",
  copy: "© 2025 Sylvara Web Design. All rights reserved.",
  privacy: "Privacy Policy",
};

export const serviceIcons: Record<string, React.ReactNode> = {};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/content.ts
git commit -m "feat: add content.ts with all page text strings"
```

---

## Task 6: Navbar component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create src/components/Navbar.tsx**

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { nav } from "@/lib/content";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <div className="navbar-wrapper">
        <nav className="navbar" role="navigation" aria-label="Main navigation">
          <Link href="/" className="navbar-logo" aria-label="Sylvara Web Design home">
            <span className="logo-main">SYLVARA</span>
            <span className="logo-sub">WEB DESIGN</span>
          </Link>

          <div className="navbar-links">
            <Link href="/services" className={isActive("/services") ? "active" : ""}>{nav.services}</Link>
            <Link href="/portfolio" className={isActive("/portfolio") ? "active" : ""}>{nav.work}</Link>
            <Link href="/about" className={isActive("/about") ? "active" : ""}>{nav.about}</Link>
            <Link href="/contact" className={isActive("/contact") ? "active" : ""}>{nav.contact}</Link>
          </div>

          <button
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </div>

      <div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <button className="nav-overlay-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>&#x2715;</button>
        <Link href="/services">{nav.services}</Link>
        <Link href="/portfolio">{nav.work}</Link>
        <Link href="/about">{nav.about}</Link>
        <Link href="/contact">{nav.contact}</Link>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Navbar component with active link + mobile overlay"
```

---

## Task 7: Footer component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create src/components/Footer.tsx**

```tsx
import Link from "next/link";
import { nav, footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <div className="footer-logo-wrap">
              <div className="logo-main">SYLVARA</div>
              <div className="logo-sub">WEB DESIGN</div>
            </div>
            <p className="footer-tagline">{footer.tagline}</p>
          </div>

          <div>
            <p className="footer-col-title">{footer.nav}</p>
            <ul className="footer-links">
              <li><Link href="/services">{nav.services}</Link></li>
              <li><Link href="/portfolio">{nav.work}</Link></li>
              <li><Link href="/about">{nav.about}</Link></li>
              <li><Link href="/contact">{nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">{footer.follow}</p>
            <div className="footer-social">
              <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{footer.copy}</p>
          <Link href="/privacy">{footer.privacy}</Link>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 8: Root layout

**Files:**
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Create src/app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sylvara Web Design — Bold Design, Real Results",
  description:
    "We build high-converting websites and brand identities for businesses that want to stand out. Web design, branding, SEO, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${manrope.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add root layout with fonts, Navbar, Footer"
```

---

## Task 9: HeroScroll wrapper + Homepage

**Files:**
- Create: `src/components/HeroScroll.tsx`
- Create: `src/app/page.tsx`

The ContainerScroll component has `"use client"`. To keep `page.tsx` a Server Component, we isolate it in a thin client wrapper.

- [ ] **Step 1: Create src/components/HeroScroll.tsx**

```tsx
"use client";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function HeroScroll() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <p className="text-sm font-semibold tracking-widest uppercase mb-4"
             style={{ color: "var(--accent-light)" }}>
            Our Work
          </p>
          <h2 style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontWeight: 800,
            color: "#fff",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.15,
            marginBottom: "0.25rem",
          }}>
            Designed to convert.
          </h2>
          <span style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontWeight: 800,
            color: "var(--accent-light)",
            fontSize: "clamp(3rem, 7vw, 5rem)",
            lineHeight: 1,
            display: "block",
          }}>
            Built to perform.
          </span>
        </>
      }
    >
      <Image
        src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80"
        alt="Sylvara web design portfolio preview"
        height={720}
        width={1400}
        className="mx-auto rounded-2xl object-cover h-full object-top"
        draggable={false}
        priority={false}
      />
    </ContainerScroll>
  );
}
```

- [ ] **Step 2: Create src/app/page.tsx**

```tsx
import Link from "next/link";
import { home, services } from "@/lib/content";
import HeroScroll from "@/components/HeroScroll";

const serviceIcons = [
  // Web Design
  <svg key="web" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  // Branding
  <svg key="brand" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  // SEO
  <svg key="seo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  // E-Commerce
  <svg key="ecom" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57l1.65-7.42H5.12"/></svg>,
];

export default function HomePage() {
  const previewServices = services.list.slice(0, 4);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="glow-blob glow-blob-tl" aria-hidden="true"></div>
        <div className="glow-blob glow-blob-br" aria-hidden="true"></div>
        <div className="container">
          <span className="badge">{home.hero.badge}</span>
          <h1>
            <span>{home.hero.line1}</span><br />
            <span style={{ color: "var(--accent-light)" }}>{home.hero.line2}</span>
          </h1>
          <p className="hero-sub">{home.hero.sub}</p>
          <div className="hero-cta-row">
            <Link href="/contact" className="btn btn-primary">{home.hero.ctaPrimary}</Link>
            <Link href="/portfolio" className="btn btn-ghost">{home.hero.ctaGhost}</Link>
          </div>
        </div>
      </section>

      {/* ── HERO SCROLL ANIMATION ── */}
      <HeroScroll />

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="section-label">{home.services.label}</p>
          <h2>{home.services.h2}</h2>
          <div className="services-grid">
            {previewServices.map((svc, i) => (
              <div className="card" key={svc.title}>
                <div className="card-icon">{serviceIcons[i]}</div>
                <h3>{svc.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: ".875rem", marginTop: "8px" }}>{svc.desc}</p>
              </div>
            ))}
          </div>
          <div className="services-more">
            <Link href="/services">{home.services.more}</Link>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-strip">
            <div className="cta-strip-text">
              <h2>{home.cta.h2}</h2>
              <p>{home.cta.sub}</p>
            </div>
            <Link href="/contact" className="btn btn-primary">{home.cta.btn}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroScroll.tsx src/app/page.tsx
git commit -m "feat: add homepage with ContainerScroll hero animation"
```

---

## Task 10: Services page

**Files:**
- Create: `src/app/services/page.tsx`

- [ ] **Step 1: Create src/app/services/page.tsx**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { services, home } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Sylvara Web Design",
  description: "Web design, branding, SEO, e-commerce, logo design, copywriting, social media, and maintenance.",
};

const icons = [
  <svg key="web" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  <svg key="brand" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  <svg key="logo" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  <svg key="seo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg key="ecom" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57l1.65-7.42H5.12"/></svg>,
  <svg key="social" viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  <svg key="copy" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  <svg key="maint" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
];

export default function ServicesPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="glow-blob glow-blob-tl" aria-hidden="true"></div>
        <div className="container">
          <span className="badge">{services.hero.badge}</span>
          <h1>{services.hero.h1}</h1>
          <p>{services.hero.sub}</p>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="services-full-grid">
            {services.list.map((svc, i) => (
              <div className="card" key={svc.title}>
                <div className="card-icon">{icons[i]}</div>
                <h3>{svc.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: ".875rem", marginTop: "8px", lineHeight: 1.65 }}>{svc.desc}</p>
                <p className="service-price">{svc.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <h2>{services.process.h2}</h2>
            <p style={{ color: "var(--text-muted)", marginTop: "12px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
              {services.process.sub}
            </p>
          </div>
          <div className="process-grid mt-48">
            {services.process.steps.map((step) => (
              <div className="process-step" key={step.n}>
                <div className="step-number">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-strip">
            <div className="cta-strip-text">
              <h2>{home.cta.h2}</h2>
              <p>{home.cta.sub}</p>
            </div>
            <Link href="/contact" className="btn btn-primary">{home.cta.btn}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat: add Services page"
```

---

## Task 11: Portfolio page

**Files:**
- Create: `src/app/portfolio/page.tsx`

This page uses client state for filter tabs and a counter animation, so it is a Client Component.

- [ ] **Step 1: Create src/app/portfolio/page.tsx**

```tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { portfolio } from "@/lib/content";

function useCountUp(target: number, duration = 1200, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const numericMatch = value.match(/^(\d+)/);
  const numericPart = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/^\d+/, "");
  const count = useCountUp(numericPart, 1200, active);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { setActive(true); observer.disconnect(); }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterMap: Record<string, string> = {
    "All": "all",
    "Web Design": "web",
    "Branding": "branding",
    "E-Commerce": "ecommerce",
  };

  const filtered = portfolio.projects.filter(
    (p) => activeFilter === "All" || p.category === filterMap[activeFilter]
  );

  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="glow-blob glow-blob-tl" aria-hidden="true"></div>
        <div className="container">
          <span className="badge">{portfolio.hero.badge}</span>
          <h1>{portfolio.hero.h1}</h1>
          <p>{portfolio.hero.sub}</p>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filter-tabs" role="group" aria-label="Filter projects">
            {portfolio.filters.map((f) => (
              <button
                key={f}
                className={`filter-tab${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filtered.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-card-img">
                  <div
                    className="project-card-img-inner"
                    style={{ background: project.gradient }}
                  >
                    <span style={{ fontFamily: "var(--font-syne), Syne, sans-serif", fontWeight: 800, color: "rgba(255,255,255,0.15)", fontSize: "3rem" }}>
                      {project.initials}
                    </span>
                  </div>
                  <div className="project-card-overlay"><span>View Project →</span></div>
                </div>
                <div className="project-card-body">
                  <p className="project-tag">{project.tag}</p>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stats-strip">
            {portfolio.stats.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container text-center">
          <Link href="/contact" className="btn btn-primary">{portfolio.cta}</Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/portfolio/page.tsx
git commit -m "feat: add Portfolio page with filter tabs and animated stats"
```

---

## Task 12: About page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create src/app/about/page.tsx**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { about, home } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Sylvara Web Design",
  description: "About Sylvara Web Design — who we are, our team, and what we stand for.",
};

const valueIcons = [
  <svg key="quality" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  <svg key="transp" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  <svg key="results" viewBox="0 0 24 24" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
];

export default function AboutPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="glow-blob glow-blob-tl" aria-hidden="true"></div>
        <div className="container">
          <span className="badge">{about.hero.badge}</span>
          <h1>{about.hero.h1}</h1>
          <p>{about.hero.sub}</p>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="text-center">{about.team.h2}</h2>
          <div className="team-grid mt-48">
            {about.team.members.map((m) => (
              <div className="card team-card" key={m.name}>
                <div className="team-avatar" aria-hidden="true">{m.initials}</div>
                <h3>{m.name}</h3>
                <p className="team-role">{m.role}</p>
                <p className="team-bio">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section">
        <div className="container">
          <h2 className="text-center">{about.values.h2}</h2>
          <div className="values-grid mt-48">
            {about.values.items.map((v, i) => (
              <div className="card" key={v.title}>
                <div className="card-icon">{valueIcons[i]}</div>
                <h3>{v.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: ".875rem", marginTop: "8px", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-strip">
            <div className="cta-strip-text">
              <h2>{home.cta.h2}</h2>
              <p>{home.cta.sub}</p>
            </div>
            <Link href="/contact" className="btn btn-primary">{about.cta}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add About page with team and values"
```

---

## Task 13: Contact page

**Files:**
- Create: `src/app/contact/page.tsx`

This is a Client Component for form state and validation.

- [ ] **Step 1: Create src/app/contact/page.tsx**

```tsx
"use client";
import { useState } from "react";
import { contact, services } from "@/lib/content";

interface FormState {
  name: string; email: string; service: string; message: string;
}
interface Errors {
  name?: string; email?: string; service?: string; message?: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = contact.form.errorName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = contact.form.errorEmail;
    if (!form.service) e.service = contact.form.errorService;
    if (!form.message.trim()) e.message = contact.form.errorMessage;
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 800);
  }

  function field(key: keyof FormState) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [key]: e.target.value });
        setErrors({ ...errors, [key]: undefined });
      },
    };
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="glow-blob glow-blob-tl" aria-hidden="true"></div>
        <div className="container">
          <span className="badge">{contact.hero.badge}</span>
          <h1>{contact.hero.h1}</h1>
          <p>{contact.hero.sub}</p>
        </div>
      </section>

      {/* ── CONTACT LAYOUT ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-layout">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="form-success visible">
                  <h3>{contact.form.successH3}</h3>
                  <p>{contact.form.successP}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={`form-group${errors.name ? " has-error" : ""}`}>
                    <label htmlFor="name">{contact.form.labelName}</label>
                    <input type="text" id="name" autoComplete="name" placeholder={contact.form.placeholderName} {...field("name")} />
                    {errors.name && <span className="field-error" style={{ display: "block" }} role="alert">{errors.name}</span>}
                  </div>

                  <div className={`form-group${errors.email ? " has-error" : ""}`}>
                    <label htmlFor="email">{contact.form.labelEmail}</label>
                    <input type="email" id="email" autoComplete="email" placeholder={contact.form.placeholderEmail} {...field("email")} />
                    {errors.email && <span className="field-error" style={{ display: "block" }} role="alert">{errors.email}</span>}
                  </div>

                  <div className={`form-group${errors.service ? " has-error" : ""}`}>
                    <label htmlFor="service">{contact.form.labelService}</label>
                    <select id="service" {...field("service")}>
                      <option value="">{contact.form.defaultService}</option>
                      {services.list.map((s) => (
                        <option key={s.title} value={s.title.toLowerCase().replace(/\s+/g, "-")}>{s.title}</option>
                      ))}
                    </select>
                    {errors.service && <span className="field-error" style={{ display: "block" }} role="alert">{errors.service}</span>}
                  </div>

                  <div className={`form-group${errors.message ? " has-error" : ""}`}>
                    <label htmlFor="message">{contact.form.labelMessage}</label>
                    <textarea id="message" rows={5} placeholder={contact.form.placeholderMessage} {...field("message")} />
                    {errors.message && <span className="field-error" style={{ display: "block" }} role="alert">{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
                    {loading ? "Sending…" : contact.form.submit}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="card contact-card">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <h3>{contact.book.h3}</h3>
                <p>{contact.book.p}</p>
                <a href="https://calendly.com" target="_blank" rel="noopener" className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                  {contact.book.btn}
                </a>
              </div>

              <div className="card" style={{ marginTop: "20px" }}>
                <div className="contact-info-item">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span>{contact.info.email}</span>
                </div>
                <div className="contact-info-item">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{contact.info.location}</span>
                </div>
                <div className="contact-info-item">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>{contact.info.response}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add Contact page with validated form"
```

---

## Task 14: Install dependencies + verify dev server

**Files:** none (install + run)

- [ ] **Step 1: Install all dependencies**

Run from the project root (`c:/Sylvara koduleht`):

```bash
npm install
```

Expected: installs next, react, framer-motion, tailwindcss, typescript, etc. with no errors.

- [ ] **Step 2: Start the dev server**

```bash
npm run dev
```

Expected output includes:

```
▲ Next.js 15.x.x
- Local: http://localhost:3000
✓ Starting...
✓ Ready in Xs
```

- [ ] **Step 3: Verify all five routes load**

Open in browser (or use curl):

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/services
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/portfolio
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/about
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/contact
```

Expected: all five return `200`.

- [ ] **Step 4: Screenshot the homepage to confirm ContainerScroll renders**

```bash
# If Playwright is available:
npx playwright screenshot http://localhost:3000 homepage-nextjs.png --full-page
```

- [ ] **Step 5: Final commit**

```bash
git add package-lock.json
git commit -m "chore: lock npm dependencies after initial install"
```

---

## Spec Coverage Check

| Requirement | Task |
|-------------|------|
| Next.js 15 + TypeScript + Tailwind | Task 1–2 |
| shadcn project structure (`components/ui/`) | Task 3 |
| `container-scroll-animation.tsx` in `components/ui/` | Task 4 |
| framer-motion installed | Task 14 |
| ContainerScroll integrated on homepage | Task 9 |
| Unsplash image inside ContainerScroll | Task 9 (HeroScroll.tsx) |
| All five pages migrated | Tasks 9–13 |
| Navbar + Footer | Tasks 6–7 |
| Portfolio filter tabs | Task 11 |
| Contact form with validation | Task 13 |
| Animated stats counter | Task 11 |
| `next/image` remote domain configured | Task 1 |
| Google Fonts via `next/font` | Task 8 |
