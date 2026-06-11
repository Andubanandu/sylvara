# Sylvara Web Design — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete 5-page bilingual (EN/ET) agency website for Sylvara Web Design — deep navy + electric blue theme, vanilla HTML/CSS/JS, no build step.

**Architecture:** Multi-page HTML (5 `.html` files). Shared nav and footer are fetched and injected via `main.js` on `DOMContentLoaded`. All visible text has `data-i18n` attributes; `i18n.js` swaps text at runtime from JSON translation files stored in `lang/`. A single `styles.css` and `main.js` are linked by every page.

**Tech Stack:** HTML5, CSS3, Vanilla JS (ES2020), Google Fonts (Syne + Manrope). No build step. Requires HTTP server locally — use VS Code Live Server (`right-click index.html → Open with Live Server`) or `npx serve .`.

---

## File Map

| File | Responsibility |
|---|---|
| `css/styles.css` | All styles: design tokens, reset, typography, layout, all components |
| `lang/en.json` | All English UI strings keyed by id |
| `lang/et.json` | All Estonian UI strings keyed by id |
| `js/i18n.js` | `loadLanguage(lang)` + `initLanguage()` — fetch JSON, swap `data-i18n` nodes |
| `components/nav.html` | Shared navbar HTML (fetched + injected by main.js) |
| `components/footer.html` | Shared footer HTML |
| `js/main.js` | Component injection, mobile menu, scroll reveal, active nav, portfolio filter, stats counter, contact form validation |
| `index.html` | Homepage: hero, services overview, CTA strip |
| `services.html` | Services: 8 cards, process steps, CTA |
| `portfolio.html` | Portfolio: filter tabs, 6 project cards, stats |
| `about.html` | About: mission, 3 team cards, 3 values |
| `contact.html` | Contact: inquiry form + book-a-call column |

---

## Task 1: CSS Design System

**Files:**
- Create: `css/styles.css`

- [ ] **Step 1: Create the file with full styles**

```css
/* ============================================================
   SYLVARA WEB DESIGN — styles.css
   ============================================================ */

/* === Google Fonts === */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600&display=swap');

/* === CSS Variables === */
:root {
  --bg-base: #060E3A;
  --bg-card: #0D1547;
  --bg-card-hover: #111E5C;
  --accent: #2563EB;
  --accent-light: #60A5FA;
  --text-primary: #FFFFFF;
  --text-muted: #94A3B8;
  --text-subtle: #475569;
  --border: rgba(37, 99, 235, 0.25);
  --glow: rgba(37, 99, 235, 0.35);
  --radius-card: 12px;
  --radius-btn: 8px;
  --max-w: 1200px;
  --section-py: 80px;
  --nav-h: 72px;
}

/* === Reset === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; scroll-behavior: smooth; }
body {
  font-family: 'Manrope', sans-serif;
  background: var(--bg-base);
  color: var(--text-primary);
  line-height: 1.6;
  overflow-x: hidden;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* === Typography === */
h1, h2, h3 { font-family: 'Syne', sans-serif; line-height: 1.15; }
h1 { font-size: clamp(2.25rem, 5vw, 3.75rem); font-weight: 800; }
h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 700; }
h3 { font-size: 1.2rem; font-weight: 700; }
p { line-height: 1.7; }

/* === Layout === */
.container { width: 100%; max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }
.section { padding: var(--section-py) 0; }

/* === Buttons === */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 13px 28px; border-radius: var(--radius-btn);
  font-family: 'Manrope', sans-serif; font-size: 1rem; font-weight: 600;
  cursor: pointer; border: none; transition: all 200ms ease;
  text-decoration: none; white-space: nowrap;
}
.btn-primary { background: var(--accent); color: #fff; box-shadow: 0 0 24px var(--glow); }
.btn-primary:hover { background: #1d4ed8; box-shadow: 0 0 36px rgba(37,99,235,0.55); transform: translateY(-1px); }
.btn-ghost { background: transparent; color: var(--text-primary); border: 1px solid rgba(255,255,255,0.2); }
.btn-ghost:hover { border-color: var(--accent-light); color: var(--accent-light); }
.btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* === Badge pill === */
.badge {
  display: inline-block;
  background: rgba(37,99,235,0.15); border: 1px solid rgba(37,99,235,0.35);
  border-radius: 9999px; padding: 6px 16px;
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
  color: var(--accent-light); text-transform: uppercase;
}

/* === Section label === */
.section-label {
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.15em;
  color: var(--accent-light); text-transform: uppercase; margin-bottom: 12px;
}

/* === Cards === */
.card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-card); padding: 28px;
  transition: background 200ms ease, border-color 200ms ease;
}
.card:hover { background: var(--bg-card-hover); border-color: rgba(37,99,235,0.5); }
.card-icon {
  width: 44px; height: 44px;
  background: rgba(37,99,235,0.15); border-radius: 10px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 18px;
}
.card-icon svg {
  width: 22px; height: 22px;
  stroke: var(--accent-light); fill: none; stroke-width: 2;
  stroke-linecap: round; stroke-linejoin: round;
}

/* === CTA Strip === */
.cta-strip {
  background: linear-gradient(135deg, rgba(37,99,235,0.22), rgba(96,165,250,0.08));
  border: 1px solid var(--border); border-radius: var(--radius-card);
  padding: 48px 56px; display: flex; align-items: center;
  justify-content: space-between; gap: 32px;
}
.cta-strip-text h2 { font-size: clamp(1.4rem, 2.5vw, 1.9rem); margin-bottom: 8px; }
.cta-strip-text p { color: var(--text-muted); }
@media (max-width: 640px) {
  .cta-strip { flex-direction: column; text-align: center; padding: 36px 24px; }
}

/* === Glow blobs === */
.glow-blob { position: absolute; border-radius: 50%; pointer-events: none; }
.glow-blob-tl { width: 500px; height: 500px; background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%); top: -120px; left: -120px; }
.glow-blob-br { width: 400px; height: 400px; background: radial-gradient(circle, rgba(96,165,250,0.1) 0%, transparent 70%); bottom: -80px; right: -80px; }

/* === Scroll reveal === */
[data-reveal] { opacity: 0; transform: translateY(18px); transition: opacity 300ms ease-out, transform 300ms ease-out; }
[data-reveal].visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  [data-reveal], [data-reveal].visible { opacity: 1; transform: none; transition: none; }
  .btn-primary:hover { transform: none; }
}

/* === Focus rings === */
:focus-visible { outline: 2px solid var(--accent-light); outline-offset: 3px; border-radius: 4px; }

/* ============================================================
   NAVBAR
   ============================================================ */
#nav-root { position: fixed; top: 16px; left: 16px; right: 16px; z-index: 30; }
.navbar {
  background: rgba(6,14,58,0.88); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border); border-radius: 12px;
  padding: 0 24px; height: 60px;
  display: flex; align-items: center; justify-content: space-between;
}
.navbar-logo { display: flex; flex-direction: column; line-height: 1; gap: 2px; }
.navbar-logo .logo-main { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.05rem; letter-spacing: 0.06em; color: #fff; }
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
  font-family: 'Manrope', sans-serif; font-weight: 600;
  color: var(--text-muted); cursor: pointer; padding: 2px 5px;
  border-radius: 4px; transition: color 200ms ease;
}
.lang-btn.active { color: var(--accent-light); }
.lang-sep { color: var(--text-subtle); font-size: 0.75rem; user-select: none; }

/* Hamburger */
.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
.hamburger span { display: block; width: 22px; height: 2px; background: var(--text-primary); border-radius: 2px; transition: all 200ms ease; }
body.menu-open .hamburger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
body.menu-open .hamburger span:nth-child(2) { opacity: 0; }
body.menu-open .hamburger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile overlay */
.nav-overlay {
  display: none; position: fixed; inset: 0;
  background: var(--bg-base); z-index: 40;
  flex-direction: column; align-items: center; justify-content: center; gap: 36px;
}
body.menu-open .nav-overlay { display: flex; }
.nav-overlay a { font-family: 'Syne', sans-serif; font-size: 1.75rem; font-weight: 700; color: var(--text-primary); transition: color 200ms ease; }
.nav-overlay a:hover { color: var(--accent-light); }
.nav-overlay-close {
  position: absolute; top: 20px; right: 20px;
  background: none; border: none; color: var(--text-primary);
  font-size: 2rem; line-height: 1; cursor: pointer;
}
.nav-overlay-lang { display: flex; gap: 16px; margin-top: 8px; }
.nav-overlay-lang button { background: none; border: 1px solid var(--border); border-radius: 8px; color: var(--text-muted); font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 1rem; padding: 8px 20px; cursor: pointer; transition: all 200ms ease; }
.nav-overlay-lang button.active { border-color: var(--accent); color: var(--accent-light); }

@media (max-width: 768px) { .navbar-links { display: none; } .hamburger { display: flex; } }

/* ============================================================
   FOOTER
   ============================================================ */
.footer { background: #040A2E; border-top: 1px solid var(--border); }
.footer-main { padding: 64px 0 40px; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 48px; align-items: start; }
.footer-logo-wrap .logo-main { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.2rem; color: #fff; }
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
  display: flex; align-items: center; justify-content: center;
  transition: border-color 200ms ease, background 200ms ease;
  aria-label: "";
}
.social-link:hover { border-color: var(--accent-light); background: var(--bg-card-hover); }
.social-link svg { width: 18px; height: 18px; stroke: var(--text-muted); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding: 20px 0; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.footer-bottom p, .footer-bottom a { color: var(--text-subtle); font-size: 0.8rem; }
.footer-bottom a:hover { color: var(--accent-light); }
@media (max-width: 768px) { .footer-main { grid-template-columns: 1fr; gap: 32px; } .footer-bottom { flex-direction: column; text-align: center; } }

/* ============================================================
   PAGE HERO (inner pages — 40vh)
   ============================================================ */
.page-hero { min-height: 40vh; display: flex; align-items: center; padding-top: calc(var(--nav-h) + 56px); padding-bottom: 56px; position: relative; overflow: hidden; }
.page-hero .badge { margin-bottom: 16px; }
.page-hero p { color: var(--text-muted); font-size: 1.1rem; max-width: 580px; margin-top: 16px; line-height: 1.7; }

/* ============================================================
   HOME HERO (full-height)
   ============================================================ */
.home-hero { min-height: 100vh; display: flex; align-items: center; padding-top: calc(var(--nav-h) + 40px); padding-bottom: 40px; position: relative; overflow: hidden; }
.home-hero .badge { margin-bottom: 20px; }
.home-hero h1 { margin-bottom: 20px; }
.home-hero h1 span { color: var(--accent-light); }
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

/* Process strip */
.process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 36px; position: relative; }
.process-grid::before { content: ''; position: absolute; top: 24px; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--border), transparent); }
.process-step { text-align: center; position: relative; }
.step-number { width: 48px; height: 48px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem; color: #fff; margin: 0 auto 16px; box-shadow: 0 0 20px var(--glow); }
.process-step h3 { font-size: 1rem; margin-bottom: 8px; }
.process-step p { color: var(--text-muted); font-size: 0.875rem; }
@media (max-width: 640px) { .process-grid { grid-template-columns: repeat(2, 1fr); } .process-grid::before { display: none; } }
@media (max-width: 360px) { .process-grid { grid-template-columns: 1fr; } }

/* ============================================================
   PORTFOLIO PAGE
   ============================================================ */
.filter-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 32px; }
.filter-tab { background: transparent; border: 1px solid var(--border); border-radius: 9999px; padding: 8px 20px; font-family: 'Manrope', sans-serif; font-size: 0.875rem; font-weight: 500; color: var(--text-muted); cursor: pointer; transition: all 200ms ease; }
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

/* Stats strip */
.stats-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 48px; background: rgba(37,99,235,0.07); border: 1px solid var(--border); border-radius: var(--radius-card); text-align: center; margin: 60px 0; }
.stat-number { font-family: 'Syne', sans-serif; font-size: 2.75rem; font-weight: 800; color: var(--accent-light); }
.stat-label { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }
@media (max-width: 640px) { .stats-strip { grid-template-columns: 1fr; padding: 32px 24px; } }

/* ============================================================
   ABOUT PAGE
   ============================================================ */
.team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 36px; }
@media (max-width: 640px) { .team-grid { grid-template-columns: 1fr; } }
.team-card { text-align: center; padding: 36px 24px; }
.team-avatar { width: 96px; height: 96px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent-light)); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem; color: #fff; }
.team-card h3 { margin-bottom: 4px; }
.team-role { font-size: 0.875rem; color: var(--accent-light); margin-bottom: 10px; }
.team-bio { font-size: 0.875rem; color: var(--text-muted); }

.values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 36px; }
@media (max-width: 640px) { .values-grid { grid-template-columns: 1fr; } }

/* ============================================================
   CONTACT PAGE
   ============================================================ */
.contact-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; margin-top: 56px; align-items: start; }
@media (max-width: 768px) { .contact-layout { grid-template-columns: 1fr; } }

/* Form */
.form-group { margin-bottom: 22px; }
.form-group label { display: block; font-size: 0.875rem; font-weight: 600; color: var(--text-muted); margin-bottom: 8px; }
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%; background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 8px; padding: 13px 16px;
  color: var(--text-primary); font-family: 'Manrope', sans-serif; font-size: 0.95rem;
  transition: border-color 200ms ease;
  appearance: none; -webkit-appearance: none;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { outline: none; border-color: var(--accent); }
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

/* Contact sidebar */
.contact-card { padding: 28px; margin-bottom: 20px; }
.contact-card h3 { margin-bottom: 8px; }
.contact-card p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px; }
.contact-info-item { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.contact-info-item svg { width: 18px; height: 18px; stroke: var(--accent-light); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
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

/* Body padding to clear fixed nav */
body { padding-top: 0; }
```

- [ ] **Step 2: Verify fonts load**

Start VS Code Live Server, open `index.html` (will be empty for now — create a minimal test file). Check the browser network tab shows requests for Syne and Manrope from `fonts.googleapis.com`. Alternatively, skip until Step 7 when index.html exists.

- [ ] **Step 3: Commit**

```bash
git init
git add css/styles.css
git commit -m "feat: add CSS design system with all tokens, components, and layout"
```

---

## Task 2: Translation Files

**Files:**
- Create: `lang/en.json`
- Create: `lang/et.json`

- [ ] **Step 1: Create `lang/en.json`**

```json
{
  "nav.services": "Services",
  "nav.work": "Work",
  "nav.about": "About",
  "nav.contact": "Contact",

  "home.hero.badge": "FULL-SERVICE DESIGN AGENCY",
  "home.hero.h1.line1": "Bold Design.",
  "home.hero.h1.line2": "Real Results.",
  "home.hero.sub": "We build high-converting websites and brand identities for businesses that want to stand out. Web design, branding, SEO, and more — all under one roof.",
  "home.hero.cta.primary": "Get a Free Quote",
  "home.hero.cta.ghost": "View Our Work →",

  "home.services.label": "WHAT WE DO",
  "home.services.h2": "Everything your brand needs, in one place.",
  "home.services.more": "+ 4 more services →",

  "home.cta.h2": "Ready to get started?",
  "home.cta.sub": "Free consultation, no commitment.",
  "home.cta.btn": "Book a Call",

  "services.hero.badge": "WHAT WE OFFER",
  "services.hero.h1": "Services Built for Growth",
  "services.hero.sub": "From your first website to a full brand overhaul — we have the skills to move your business forward.",

  "service.webdesign.title": "Web Design",
  "service.webdesign.desc": "Beautiful, responsive websites that load fast and convert visitors into customers. Built to work flawlessly on every device.",
  "service.webdesign.price": "Starting from €799",

  "service.branding.title": "Branding",
  "service.branding.desc": "Complete brand identity systems — strategy, visual identity, brand guidelines, and assets that set you apart from the competition.",
  "service.branding.price": "Starting from €599",

  "service.logo.title": "Logo Design",
  "service.logo.desc": "A distinctive, versatile logo that represents your business perfectly across print, web, and social media.",
  "service.logo.price": "Starting from €299",

  "service.seo.title": "SEO",
  "service.seo.desc": "On-page optimisation, technical SEO, and content strategy to get your website ranking on Google and driving organic traffic.",
  "service.seo.price": "Starting from €399/mo",

  "service.ecommerce.title": "E-Commerce",
  "service.ecommerce.desc": "Online shops designed to sell. Seamless checkout experience, product management, and payment integration.",
  "service.ecommerce.price": "Starting from €999",

  "service.social.title": "Social Media Design",
  "service.social.desc": "On-brand graphics, templates, and visual content for Instagram, Facebook, LinkedIn, and beyond.",
  "service.social.price": "Starting from €299",

  "service.copy.title": "Copywriting",
  "service.copy.desc": "Compelling website copy, blog posts, and marketing content that speaks to your audience and drives action.",
  "service.copy.price": "Starting from €199",

  "service.maintenance.title": "Website Maintenance",
  "service.maintenance.desc": "Monthly care plans covering updates, backups, security monitoring, and performance checks — so you never have to worry.",
  "service.maintenance.price": "Starting from €99/mo",

  "process.h2": "How We Work",
  "process.sub": "A clear, collaborative process from first call to launch day.",
  "process.step1.title": "Discover",
  "process.step1.desc": "We learn about your business, goals, and audience.",
  "process.step2.title": "Design",
  "process.step2.desc": "We craft the visual direction and get your approval.",
  "process.step3.title": "Build",
  "process.step3.desc": "We develop the full solution to the highest standard.",
  "process.step4.title": "Launch",
  "process.step4.desc": "We go live and support you through the handover.",

  "portfolio.hero.badge": "OUR WORK",
  "portfolio.hero.h1": "Work We're Proud Of",
  "portfolio.hero.sub": "A selection of projects across web design, branding, and digital.",
  "portfolio.filter.all": "All",
  "portfolio.filter.web": "Web Design",
  "portfolio.filter.branding": "Branding",
  "portfolio.filter.ecommerce": "E-Commerce",

  "portfolio.p1.title": "Mäkke Café",
  "portfolio.p1.desc": "Brand identity and website for a specialty coffee shop in Tallinn.",
  "portfolio.p2.title": "NordFlow SaaS",
  "portfolio.p2.desc": "Landing page and onboarding flow for a B2B productivity platform.",
  "portfolio.p3.title": "Kivi & Co.",
  "portfolio.p3.desc": "Full rebrand and brand guidelines for a construction consultancy.",
  "portfolio.p4.title": "Lumi Boutique",
  "portfolio.p4.desc": "E-commerce store for a Scandinavian fashion label.",
  "portfolio.p5.title": "Harmo Dental",
  "portfolio.p5.desc": "Website and SEO setup for a modern dental clinic.",
  "portfolio.p6.title": "Päike Studio",
  "portfolio.p6.desc": "Logo and social media kit for a photography studio.",

  "portfolio.stat1.num": "50+",
  "portfolio.stat1.label": "Projects Delivered",
  "portfolio.stat2.num": "3",
  "portfolio.stat2.label": "Years of Experience",
  "portfolio.stat3.num": "100%",
  "portfolio.stat3.label": "Client Satisfaction",

  "portfolio.cta.btn": "Start Your Project",

  "about.hero.badge": "WHO WE ARE",
  "about.hero.h1": "We Are Sylvara",
  "about.hero.sub": "A small team of designers and developers who believe great digital work changes how businesses grow. We work closely with our clients — no account managers, just direct collaboration with the people building your project.",

  "about.team.h2": "Meet the Team",
  "about.team.m1.name": "Marten Kask",
  "about.team.m1.role": "Lead Designer & Founder",
  "about.team.m1.bio": "10 years of UI/UX experience across agencies and startups.",
  "about.team.m2.name": "Laura Tamm",
  "about.team.m2.role": "Web Developer",
  "about.team.m2.bio": "Full-stack developer with a love for clean, performant front-ends.",
  "about.team.m3.name": "Karl Sepp",
  "about.team.m3.role": "Brand Strategist",
  "about.team.m3.bio": "Helps clients find their voice and stand out in crowded markets.",

  "about.values.h2": "What We Stand For",
  "about.values.v1.title": "Quality",
  "about.values.v1.desc": "We don't cut corners. Every project gets our full attention and a standard we're proud to put our name on.",
  "about.values.v2.title": "Transparency",
  "about.values.v2.desc": "Clear timelines, honest pricing, and open communication from kickoff to handover.",
  "about.values.v3.title": "Results",
  "about.values.v3.desc": "Beautiful design is only half the job. We build things that perform and help your business grow.",

  "about.cta.btn": "Work With Us",

  "contact.hero.badge": "GET IN TOUCH",
  "contact.hero.h1": "Let's Build Something Great",
  "contact.hero.sub": "Tell us about your project and we'll get back to you within 24 hours.",

  "contact.form.label.name": "Your Name",
  "contact.form.placeholder.name": "Jane Smith",
  "contact.form.label.email": "Email Address",
  "contact.form.placeholder.email": "jane@company.com",
  "contact.form.label.service": "Service Interested In",
  "contact.form.service.default": "Select a service…",
  "contact.form.label.message": "Message",
  "contact.form.placeholder.message": "Tell us about your project, timeline, and any details that would help us understand what you need.",
  "contact.form.submit": "Send Message",

  "contact.form.error.name": "Please enter your name.",
  "contact.form.error.email": "Please enter a valid email address.",
  "contact.form.error.service": "Please select a service.",
  "contact.form.error.message": "Please write a short message.",

  "contact.form.success.h3": "Message sent!",
  "contact.form.success.p": "Thanks for reaching out. We'll be in touch within 24 hours.",

  "contact.book.h3": "Book a Discovery Call",
  "contact.book.p": "Prefer to talk? Book a free 30-minute call and we'll walk through your project together.",
  "contact.book.btn": "Book on Calendly",

  "contact.info.email": "hello@sylvaradesign.com",
  "contact.info.location": "Tallinn, Estonia",
  "contact.info.response": "We reply within 24 hours",

  "footer.tagline": "Bold Design. Real Results.",
  "footer.nav.title": "Navigation",
  "footer.follow.title": "Follow Us",
  "footer.copy": "© 2025 Sylvara Web Design. All rights reserved.",
  "footer.privacy": "Privacy Policy"
}
```

- [ ] **Step 2: Create `lang/et.json`**

```json
{
  "nav.services": "Teenused",
  "nav.work": "Tööd",
  "nav.about": "Meist",
  "nav.contact": "Kontakt",

  "home.hero.badge": "TÄISTEENUSTE DISAINIAGENTUR",
  "home.hero.h1.line1": "Julge disain.",
  "home.hero.h1.line2": "Reaalsed tulemused.",
  "home.hero.sub": "Loome professionaalseid veebilehti ja brändingut ettevõtetele, kes soovivad silma paista. Veebidisain, bränding, SEO ja palju muud — kõik ühes kohas.",
  "home.hero.cta.primary": "Küsi hinnapakkumist",
  "home.hero.cta.ghost": "Vaata meie töid →",

  "home.services.label": "MIDA ME TEEME",
  "home.services.h2": "Kõik, mida su bränd vajab, ühes kohas.",
  "home.services.more": "+ 4 teenust veel →",

  "home.cta.h2": "Valmis alustama?",
  "home.cta.sub": "Tasuta konsultatsioon, kohustuseta.",
  "home.cta.btn": "Broneeri kõne",

  "services.hero.badge": "MIDA ME PAKUME",
  "services.hero.h1": "Teenused, mis toetavad kasvu",
  "services.hero.sub": "Esimesest veebilehest kuni täieliku brändiuuenduseni — meil on oskused, mis viivad su ettevõtte edasi.",

  "service.webdesign.title": "Veebidisain",
  "service.webdesign.desc": "Ilusad, responsiivned veebilehed, mis laadivad kiiresti ja muudavad külastajad klientideks. Töötab suurepäraselt igal seadmel.",
  "service.webdesign.price": "Alates 799 €",

  "service.branding.title": "Bränding",
  "service.branding.desc": "Täielikud brändiidentiteedi süsteemid — strateegia, visuaalne identiteet, brändijuhend ja materjalid, mis eristavad sind konkurentidest.",
  "service.branding.price": "Alates 599 €",

  "service.logo.title": "Logodisain",
  "service.logo.desc": "Eristuv ja mitmekülgne logo, mis esindab su ettevõtet ideaalselt — trükis, veebis ja sotsiaalmeedias.",
  "service.logo.price": "Alates 299 €",

  "service.seo.title": "SEO",
  "service.seo.desc": "Lehe optimeerimine, tehniline SEO ja sisustrategia, et saada Google'is esimestele positsioonidele ja meelitada orgaanilist liiklust.",
  "service.seo.price": "Alates 399 €/kuus",

  "service.ecommerce.title": "E-pood",
  "service.ecommerce.desc": "Müügile orienteeritud veebipoed. Sujuv ostukogemus, tootehaldus ja makseintegratsioon.",
  "service.ecommerce.price": "Alates 999 €",

  "service.social.title": "Sotsiaalmeedia disain",
  "service.social.desc": "Brändikohased graafikad, mallid ja visuaalne sisu Instagrami, Facebooki, LinkedIni ja teiste kanalite jaoks.",
  "service.social.price": "Alates 299 €",

  "service.copy.title": "Sisukirjutamine",
  "service.copy.desc": "Veenev veebilehetekst, blogipostitused ja turundusmaterjalid, mis kõnetavad su sihtrühma ja kutsuvad tegutsema.",
  "service.copy.price": "Alates 199 €",

  "service.maintenance.title": "Veebilehe hooldus",
  "service.maintenance.desc": "Kuised hooldusteenused: uuendused, varukoopiad, turvamonitor ja jõudluskontroll — et sa ei peaks muretsema.",
  "service.maintenance.price": "Alates 99 €/kuus",

  "process.h2": "Kuidas me töötame",
  "process.sub": "Selge ja koostöine protsess esimesest kõnest avaldamispäevani.",
  "process.step1.title": "Avastame",
  "process.step1.desc": "Õpime tundma su ettevõtet, eesmärke ja sihtrühma.",
  "process.step2.title": "Disainime",
  "process.step2.desc": "Loome visuaalse suuna ja saame su kinnituse.",
  "process.step3.title": "Ehitame",
  "process.step3.desc": "Arendame täislahenduse kõrgeima standardi järgi.",
  "process.step4.title": "Avaldame",
  "process.step4.desc": "Läheme avalikuks ja toetame sind üleandmise käigus.",

  "portfolio.hero.badge": "MEIE TÖÖD",
  "portfolio.hero.h1": "Tööd, mille üle oleme uhked",
  "portfolio.hero.sub": "Valik projekte veebidisaini, brändingu ja digitaalsete lahenduste vallast.",
  "portfolio.filter.all": "Kõik",
  "portfolio.filter.web": "Veebidisain",
  "portfolio.filter.branding": "Bränding",
  "portfolio.filter.ecommerce": "E-pood",

  "portfolio.p1.title": "Mäkke Café",
  "portfolio.p1.desc": "Brändiidentiteet ja veebileht Tallinna erikohvikule.",
  "portfolio.p2.title": "NordFlow SaaS",
  "portfolio.p2.desc": "Sihtleht ja kasutajarakendus B2B tootlikkusplatvormile.",
  "portfolio.p3.title": "Kivi & Co.",
  "portfolio.p3.desc": "Täielik rebranding ja brändijuhend ehituskonsultatsioonifirmale.",
  "portfolio.p4.title": "Lumi Boutique",
  "portfolio.p4.desc": "E-pood Skandinaavia moekaubamärgile.",
  "portfolio.p5.title": "Harmo Dental",
  "portfolio.p5.desc": "Veebileht ja SEO seadistus kaasaegsele hambakliinikule.",
  "portfolio.p6.title": "Päike Studio",
  "portfolio.p6.desc": "Logo ja sotsiaalmeedia pakett fotostuudiole.",

  "portfolio.stat1.num": "50+",
  "portfolio.stat1.label": "Projekti tehtud",
  "portfolio.stat2.num": "3",
  "portfolio.stat2.label": "Aastat kogemust",
  "portfolio.stat3.num": "100%",
  "portfolio.stat3.label": "Kliendirahulolu",

  "portfolio.cta.btn": "Alusta oma projekti",

  "about.hero.badge": "KES ME OLEME",
  "about.hero.h1": "Meie oleme Sylvara",
  "about.hero.sub": "Väike meeskond disainereid ja arendajaid, kes usuvad, et suurepärane digitaalne töö muudab ettevõtete kasvuvõimalusi. Teeme tihedat koostööd klientidega — ilma vahendajateta, otse nendega, kes su projekti loovad.",

  "about.team.h2": "Tutvu meeskonnaga",
  "about.team.m1.name": "Marten Kask",
  "about.team.m1.role": "Peadisainer ja asutaja",
  "about.team.m1.bio": "10-aastane UI/UX kogemus agentuurides ja iduettevõtetes.",
  "about.team.m2.name": "Laura Tamm",
  "about.team.m2.role": "Veebiarendaja",
  "about.team.m2.bio": "Full-stack arendaja, kellele meeldib puhas ja kiire front-end.",
  "about.team.m3.name": "Karl Sepp",
  "about.team.m3.role": "Brändistrateg",
  "about.team.m3.bio": "Aitab klientidel leida oma hääl ja eristuda tihedas turul.",

  "about.values.h2": "Meie väärtused",
  "about.values.v1.title": "Kvaliteet",
  "about.values.v1.desc": "Me ei lõika nurkadest. Iga projekt saab meie täieliku tähelepanu ja standardi, mille taga me seisame.",
  "about.values.v2.title": "Läbipaistvus",
  "about.values.v2.desc": "Selged tähtajad, aus hinnakujundus ja avatud suhtlus algusest lõpuni.",
  "about.values.v3.title": "Tulemused",
  "about.values.v3.desc": "Ilus disain on vaid pool tööst. Loome asju, mis toimivad ja aitavad su ettevõttel kasvada.",

  "about.cta.btn": "Tee meiega koostööd",

  "contact.hero.badge": "VÕTA ÜHENDUST",
  "contact.hero.h1": "Ehitame midagi suurepärast",
  "contact.hero.sub": "Räägi meile oma projektist ja me vastame 24 tunni jooksul.",

  "contact.form.label.name": "Sinu nimi",
  "contact.form.placeholder.name": "Mari Mägi",
  "contact.form.label.email": "E-posti aadress",
  "contact.form.placeholder.email": "mari@ettevote.ee",
  "contact.form.label.service": "Huvipakkuv teenus",
  "contact.form.service.default": "Vali teenus…",
  "contact.form.label.message": "Sõnum",
  "contact.form.placeholder.message": "Räägi meile oma projektist, ajakavast ja muudest olulistest detailidest.",
  "contact.form.submit": "Saada sõnum",

  "contact.form.error.name": "Palun sisesta oma nimi.",
  "contact.form.error.email": "Palun sisesta kehtiv e-posti aadress.",
  "contact.form.error.service": "Palun vali teenus.",
  "contact.form.error.message": "Palun kirjuta lühike sõnum.",

  "contact.form.success.h3": "Sõnum saadetud!",
  "contact.form.success.p": "Täname, et võtsid ühendust. Vastame 24 tunni jooksul.",

  "contact.book.h3": "Broneeri avastuskõne",
  "contact.book.p": "Eelistad rääkida? Broneeri tasuta 30-minutiline kõne ja arutame su projekti üheskoos läbi.",
  "contact.book.btn": "Broneeri Calendlys",

  "contact.info.email": "hello@sylvaradesign.com",
  "contact.info.location": "Tallinn, Eesti",
  "contact.info.response": "Vastame 24 tunni jooksul",

  "footer.tagline": "Julge disain. Reaalsed tulemused.",
  "footer.nav.title": "Navigatsioon",
  "footer.follow.title": "Jälgi meid",
  "footer.copy": "© 2025 Sylvara Web Design. Kõik õigused kaitstud.",
  "footer.privacy": "Privaatsuspoliitika"
}
```

- [ ] **Step 3: Commit**

```bash
git add lang/en.json lang/et.json
git commit -m "feat: add EN and ET translation files"
```

---

## Task 3: i18n Module

**Files:**
- Create: `js/i18n.js`

- [ ] **Step 1: Create `js/i18n.js`**

```js
let currentStrings = {};

async function loadLanguage(lang) {
  try {
    const res = await fetch(`/lang/${lang}.json`);
    if (!res.ok) throw new Error(`Failed to load lang/${lang}.json`);
    currentStrings = await res.json();
  } catch (e) {
    console.error('i18n load error:', e);
    return;
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (currentStrings[key] !== undefined) el.textContent = currentStrings[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (currentStrings[key] !== undefined) el.placeholder = currentStrings[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (currentStrings[key] !== undefined) el.innerHTML = currentStrings[key];
  });

  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  // Update active state on lang buttons
  document.querySelectorAll('.lang-btn, .nav-overlay-lang button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function initLanguage() {
  const saved = localStorage.getItem('lang') || 'en';
  loadLanguage(saved);
}

// expose globally so nav onclick can call it
window.loadLanguage = loadLanguage;
window.initLanguage = initLanguage;
```

- [ ] **Step 2: Commit**

```bash
git add js/i18n.js
git commit -m "feat: add i18n module for EN/ET language switching"
```

---

## Task 4: Navbar Component

**Files:**
- Create: `components/nav.html`

- [ ] **Step 1: Create `components/nav.html`**

```html
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <a href="/index.html" class="navbar-logo" aria-label="Sylvara Web Design home">
    <span class="logo-main">SYLVARA</span>
    <span class="logo-sub">WEB DESIGN</span>
  </a>

  <div class="navbar-links">
    <a href="/services.html" data-i18n="nav.services" data-navlink="services">Services</a>
    <a href="/portfolio.html" data-i18n="nav.work" data-navlink="work">Work</a>
    <a href="/about.html" data-i18n="nav.about" data-navlink="about">About</a>
    <a href="/contact.html" data-i18n="nav.contact" data-navlink="contact">Contact</a>
    <div class="lang-switcher" role="group" aria-label="Language selection">
      <button class="lang-btn" data-lang="et" onclick="loadLanguage('et')" aria-label="Switch to Estonian">ET</button>
      <span class="lang-sep" aria-hidden="true">|</span>
      <button class="lang-btn active" data-lang="en" onclick="loadLanguage('en')" aria-label="Switch to English">EN</button>
    </div>
  </div>

  <button class="hamburger" id="hamburger-btn" aria-label="Open menu" aria-expanded="false" aria-controls="nav-overlay">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="nav-overlay" id="nav-overlay" role="dialog" aria-modal="true" aria-label="Mobile navigation">
  <button class="nav-overlay-close" id="nav-overlay-close" aria-label="Close menu">&#x2715;</button>
  <a href="/services.html" data-i18n="nav.services">Services</a>
  <a href="/portfolio.html" data-i18n="nav.work">Work</a>
  <a href="/about.html" data-i18n="nav.about">About</a>
  <a href="/contact.html" data-i18n="nav.contact">Contact</a>
  <div class="nav-overlay-lang" role="group" aria-label="Language selection">
    <button data-lang="et" onclick="loadLanguage('et')" aria-label="Switch to Estonian">ET</button>
    <button data-lang="en" onclick="loadLanguage('en')" aria-label="Switch to English">EN</button>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add components/nav.html
git commit -m "feat: add shared navbar component with language switcher and mobile overlay"
```

---

## Task 5: Footer Component

**Files:**
- Create: `components/footer.html`

- [ ] **Step 1: Create `components/footer.html`**

```html
<footer class="footer">
  <div class="container">
    <div class="footer-main">
      <div>
        <div class="footer-logo-wrap">
          <div class="logo-main">SYLVARA</div>
          <div class="logo-sub">WEB DESIGN</div>
        </div>
        <p class="footer-tagline" data-i18n="footer.tagline">Bold Design. Real Results.</p>
      </div>

      <div>
        <p class="footer-col-title" data-i18n="footer.nav.title">Navigation</p>
        <ul class="footer-links">
          <li><a href="/services.html" data-i18n="nav.services">Services</a></li>
          <li><a href="/portfolio.html" data-i18n="nav.work">Work</a></li>
          <li><a href="/about.html" data-i18n="nav.about">About</a></li>
          <li><a href="/contact.html" data-i18n="nav.contact">Contact</a></li>
        </ul>
      </div>

      <div>
        <p class="footer-col-title" data-i18n="footer.follow.title">Follow Us</p>
        <div class="footer-social">
          <a href="https://linkedin.com" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://instagram.com" class="social-link" aria-label="Instagram" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p data-i18n="footer.copy">© 2025 Sylvara Web Design. All rights reserved.</p>
      <a href="/privacy.html" data-i18n="footer.privacy">Privacy Policy</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add components/footer.html
git commit -m "feat: add shared footer component"
```

---

## Task 6: main.js — Shared Behaviours

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create `js/main.js`**

```js
/* ============================================================
   main.js — shared across all pages
   ============================================================ */

// ── Component injection ──────────────────────────────────────
async function injectComponents() {
  const [navRes, footerRes] = await Promise.all([
    fetch('/components/nav.html'),
    fetch('/components/footer.html'),
  ]);
  const [navHtml, footerHtml] = await Promise.all([
    navRes.text(),
    footerRes.text(),
  ]);

  const navRoot = document.getElementById('nav-root');
  const footerRoot = document.getElementById('footer-root');
  if (navRoot) navRoot.innerHTML = navHtml;
  if (footerRoot) footerRoot.innerHTML = footerHtml;

  initLanguage();       // from i18n.js — swap text after DOM is ready
  setActiveNavLink();
  initMobileMenu();
}

// ── Active nav link ──────────────────────────────────────────
function setActiveNavLink() {
  const path = window.location.pathname;
  document.querySelectorAll('[data-navlink]').forEach(link => {
    const page = link.dataset.navlink;
    const isActive =
      (page === 'services' && path.includes('services')) ||
      (page === 'work' && path.includes('portfolio')) ||
      (page === 'about' && path.includes('about')) ||
      (page === 'contact' && path.includes('contact'));
    link.classList.toggle('active', isActive);
  });
}

// ── Mobile menu ──────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const closeBtn = document.getElementById('nav-overlay-close');
  const overlay = document.getElementById('nav-overlay');

  if (!hamburger || !overlay) return;

  function openMenu() {
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.querySelectorAll('a, button')[0]?.focus();
  }
  function closeMenu() {
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// ── Scroll reveal ─────────────────────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 }
  );
  els.forEach(el => observer.observe(el));
}

// ── Portfolio filter ──────────────────────────────────────────
function initPortfolioFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// ── Stats counter ─────────────────────────────────────────────
function initStatsCounter() {
  const stats = document.querySelectorAll('[data-count-to]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.countTo);
      const suffix = el.dataset.countSuffix || '';
      const isDecimal = !Number.isInteger(target);
      const duration = 1200;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = target * eased;
        el.textContent = (isDecimal ? value.toFixed(0) : Math.round(value)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

// ── Contact form ──────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  function showError(input, msgKey) {
    const group = input.closest('.form-group');
    const errorEl = group?.querySelector('.field-error');
    if (group) group.classList.add('has-error');
    if (errorEl) {
      // use translated string if available, fallback to data-error attribute
      const strings = window.__i18nStrings || {};
      errorEl.textContent = strings[msgKey] || input.dataset.errorFallback || 'Required.';
      errorEl.style.display = 'block';
    }
  }

  function clearError(input) {
    const group = input.closest('.form-group');
    if (group) group.classList.remove('has-error');
    const errorEl = group?.querySelector('.field-error');
    if (errorEl) errorEl.style.display = 'none';
  }

  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => clearError(el));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const service = form.querySelector('#service');
    const message = form.querySelector('#message');

    if (!name.value.trim()) { showError(name, 'contact.form.error.name'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { showError(email, 'contact.form.error.email'); valid = false; }
    if (!service.value) { showError(service, 'contact.form.error.service'); valid = false; }
    if (!message.value.trim()) { showError(message, 'contact.form.error.message'); valid = false; }

    if (!valid) return;

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;

    // Simulate submission (owner wires up Formspree / Netlify Forms endpoint here)
    setTimeout(() => {
      form.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.classList.add('visible');
    }, 800);
  });
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await injectComponents();
  initScrollReveal();
  initPortfolioFilter();
  initStatsCounter();
  initContactForm();
});
```

Note: The contact form validation reads translated error strings from `window.__i18nStrings`. Update `js/i18n.js` to also store the loaded strings there by adding `window.__i18nStrings = currentStrings;` at the end of `loadLanguage()`.

- [ ] **Step 2: Update `js/i18n.js` to expose strings globally**

In `js/i18n.js`, inside `loadLanguage()`, add one line after `currentStrings = await res.json()`:

```js
async function loadLanguage(lang) {
  try {
    const res = await fetch(`/lang/${lang}.json`);
    if (!res.ok) throw new Error(`Failed to load lang/${lang}.json`);
    currentStrings = await res.json();
    window.__i18nStrings = currentStrings; // ← add this line
  } catch (e) {
    // ... rest unchanged
  }
  // ... rest unchanged
}
```

- [ ] **Step 3: Commit**

```bash
git add js/main.js js/i18n.js
git commit -m "feat: add main.js with component injection, mobile menu, scroll reveal, portfolio filter, stats counter, and contact form"
```

---

## Task 7: Homepage

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Sylvara Web Design — bold design, real results. Web design, branding, SEO and more for businesses that want to stand out.">
  <title>Sylvara Web Design — Bold Design, Real Results</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div id="nav-root"></div>

  <main>
    <!-- ── HERO ── -->
    <section class="home-hero">
      <div class="glow-blob glow-blob-tl" aria-hidden="true"></div>
      <div class="glow-blob glow-blob-br" aria-hidden="true"></div>
      <div class="container">
        <span class="badge" data-i18n="home.hero.badge">FULL-SERVICE DESIGN AGENCY</span>
        <h1>
          <span data-i18n="home.hero.h1.line1">Bold Design.</span><br>
          <span style="color:var(--accent-light)" data-i18n="home.hero.h1.line2">Real Results.</span>
        </h1>
        <p class="hero-sub" data-i18n="home.hero.sub">We build high-converting websites and brand identities for businesses that want to stand out. Web design, branding, SEO, and more — all under one roof.</p>
        <div class="hero-cta-row">
          <a href="/contact.html" class="btn btn-primary" data-i18n="home.hero.cta.primary">Get a Free Quote</a>
          <a href="/portfolio.html" class="btn btn-ghost" data-i18n="home.hero.cta.ghost">View Our Work →</a>
        </div>
      </div>
    </section>

    <!-- ── SERVICES OVERVIEW ── -->
    <section class="section" data-reveal>
      <div class="container">
        <p class="section-label" data-i18n="home.services.label">WHAT WE DO</p>
        <h2 data-i18n="home.services.h2">Everything your brand needs, in one place.</h2>
        <div class="services-grid">
          <!-- Web Design -->
          <div class="card" data-reveal>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3 data-i18n="service.webdesign.title">Web Design</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px" data-i18n="service.webdesign.desc">Beautiful, responsive websites that load fast and convert visitors into customers.</p>
          </div>
          <!-- Branding -->
          <div class="card" data-reveal>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 data-i18n="service.branding.title">Branding</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px" data-i18n="service.branding.desc">Identity that sets you apart from the competition.</p>
          </div>
          <!-- SEO -->
          <div class="card" data-reveal>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 data-i18n="service.seo.title">SEO</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px" data-i18n="service.seo.desc">Get found on Google and drive organic traffic.</p>
          </div>
          <!-- E-Commerce -->
          <div class="card" data-reveal>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57l1.65-7.42H5.12"/></svg>
            </div>
            <h3 data-i18n="service.ecommerce.title">E-Commerce</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px" data-i18n="service.ecommerce.desc">Online shops designed to sell.</p>
          </div>
        </div>
        <div class="services-more">
          <a href="/services.html" data-i18n="home.services.more">+ 4 more services →</a>
        </div>
      </div>
    </section>

    <!-- ── CTA STRIP ── -->
    <section class="section" style="padding-top:0" data-reveal>
      <div class="container">
        <div class="cta-strip">
          <div class="cta-strip-text">
            <h2 data-i18n="home.cta.h2">Ready to get started?</h2>
            <p data-i18n="home.cta.sub">Free consultation, no commitment.</p>
          </div>
          <a href="/contact.html" class="btn btn-primary" data-i18n="home.cta.btn">Book a Call</a>
        </div>
      </div>
    </section>
  </main>

  <div id="footer-root"></div>
  <script src="/js/i18n.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in Live Server and verify**

- Navbar appears floating, glassmorphism effect visible
- Hero fills viewport, glow blobs visible, heading shows "Bold Design. Real Results." with second line in blue
- Services grid shows 4 cards
- CTA strip renders with gradient border
- Footer renders with links and social icons
- Click ET switcher — all text changes to Estonian. Click EN — reverts.
- Resize to 375px — single column, hamburger button visible, nav links hidden

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add homepage with hero, services overview, and CTA strip"
```

---

## Task 8: Services Page

**Files:**
- Create: `services.html`

- [ ] **Step 1: Create `services.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Sylvara Web Design services — web design, branding, SEO, e-commerce, logo design, copywriting, social media, and maintenance.">
  <title>Services — Sylvara Web Design</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div id="nav-root"></div>

  <main>
    <!-- ── HERO ── -->
    <section class="page-hero">
      <div class="glow-blob glow-blob-tl" aria-hidden="true"></div>
      <div class="container">
        <span class="badge" data-i18n="services.hero.badge">WHAT WE OFFER</span>
        <h1 data-i18n="services.hero.h1">Services Built for Growth</h1>
        <p data-i18n="services.hero.sub">From your first website to a full brand overhaul — we have the skills to move your business forward.</p>
      </div>
    </section>

    <!-- ── SERVICES GRID ── -->
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="services-full-grid">
          <div class="card" data-reveal>
            <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
            <h3 data-i18n="service.webdesign.title">Web Design</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="service.webdesign.desc">Beautiful, responsive websites that load fast and convert visitors into customers. Built to work flawlessly on every device.</p>
            <p class="service-price" data-i18n="service.webdesign.price">Starting from €799</p>
          </div>
          <div class="card" data-reveal>
            <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
            <h3 data-i18n="service.branding.title">Branding</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="service.branding.desc">Complete brand identity systems — strategy, visual identity, brand guidelines, and assets that set you apart from the competition.</p>
            <p class="service-price" data-i18n="service.branding.price">Starting from €599</p>
          </div>
          <div class="card" data-reveal>
            <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
            <h3 data-i18n="service.logo.title">Logo Design</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="service.logo.desc">A distinctive, versatile logo that represents your business perfectly across print, web, and social media.</p>
            <p class="service-price" data-i18n="service.logo.price">Starting from €299</p>
          </div>
          <div class="card" data-reveal>
            <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
            <h3 data-i18n="service.seo.title">SEO</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="service.seo.desc">On-page optimisation, technical SEO, and content strategy to get your website ranking on Google and driving organic traffic.</p>
            <p class="service-price" data-i18n="service.seo.price">Starting from €399/mo</p>
          </div>
          <div class="card" data-reveal>
            <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57l1.65-7.42H5.12"/></svg></div>
            <h3 data-i18n="service.ecommerce.title">E-Commerce</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="service.ecommerce.desc">Online shops designed to sell. Seamless checkout experience, product management, and payment integration.</p>
            <p class="service-price" data-i18n="service.ecommerce.price">Starting from €999</p>
          </div>
          <div class="card" data-reveal>
            <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></div>
            <h3 data-i18n="service.social.title">Social Media Design</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="service.social.desc">On-brand graphics, templates, and visual content for Instagram, Facebook, LinkedIn, and beyond.</p>
            <p class="service-price" data-i18n="service.social.price">Starting from €299</p>
          </div>
          <div class="card" data-reveal>
            <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
            <h3 data-i18n="service.copy.title">Copywriting</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="service.copy.desc">Compelling website copy, blog posts, and marketing content that speaks to your audience and drives action.</p>
            <p class="service-price" data-i18n="service.copy.price">Starting from €199</p>
          </div>
          <div class="card" data-reveal>
            <div class="card-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M3 12H1M23 12h-2M12 1v2M12 21v2"/></svg></div>
            <h3 data-i18n="service.maintenance.title">Website Maintenance</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="service.maintenance.desc">Monthly care plans covering updates, backups, security monitoring, and performance checks — so you never have to worry.</p>
            <p class="service-price" data-i18n="service.maintenance.price">Starting from €99/mo</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PROCESS ── -->
    <section class="section" data-reveal>
      <div class="container">
        <div class="text-center">
          <h2 data-i18n="process.h2">How We Work</h2>
          <p style="color:var(--text-muted);margin-top:12px;max-width:520px;margin-left:auto;margin-right:auto" data-i18n="process.sub">A clear, collaborative process from first call to launch day.</p>
        </div>
        <div class="process-grid mt-48">
          <div class="process-step" data-reveal>
            <div class="step-number">1</div>
            <h3 data-i18n="process.step1.title">Discover</h3>
            <p data-i18n="process.step1.desc">We learn about your business, goals, and audience.</p>
          </div>
          <div class="process-step" data-reveal>
            <div class="step-number">2</div>
            <h3 data-i18n="process.step2.title">Design</h3>
            <p data-i18n="process.step2.desc">We craft the visual direction and get your approval.</p>
          </div>
          <div class="process-step" data-reveal>
            <div class="step-number">3</div>
            <h3 data-i18n="process.step3.title">Build</h3>
            <p data-i18n="process.step3.desc">We develop the full solution to the highest standard.</p>
          </div>
          <div class="process-step" data-reveal>
            <div class="step-number">4</div>
            <h3 data-i18n="process.step4.title">Launch</h3>
            <p data-i18n="process.step4.desc">We go live and support you through the handover.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="section" style="padding-top:0" data-reveal>
      <div class="container">
        <div class="cta-strip">
          <div class="cta-strip-text">
            <h2 data-i18n="home.cta.h2">Ready to get started?</h2>
            <p data-i18n="home.cta.sub">Free consultation, no commitment.</p>
          </div>
          <a href="/contact.html" class="btn btn-primary" data-i18n="home.cta.btn">Book a Call</a>
        </div>
      </div>
    </section>
  </main>

  <div id="footer-root"></div>
  <script src="/js/i18n.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in Live Server and verify**

- "Services" nav link is highlighted as active
- 8 service cards render in 4-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Price hints visible in `--accent-light` colour
- Process strip shows 4 numbered steps in a row with connecting line
- Language switcher changes all card text and price labels to Estonian

- [ ] **Step 3: Commit**

```bash
git add services.html
git commit -m "feat: add services page with 8 service cards and process strip"
```

---

## Task 9: Portfolio Page

**Files:**
- Create: `portfolio.html`

- [ ] **Step 1: Create `portfolio.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Sylvara Web Design portfolio — web design, branding, and e-commerce projects.">
  <title>Our Work — Sylvara Web Design</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div id="nav-root"></div>

  <main>
    <!-- ── HERO ── -->
    <section class="page-hero">
      <div class="glow-blob glow-blob-tl" aria-hidden="true"></div>
      <div class="container">
        <span class="badge" data-i18n="portfolio.hero.badge">OUR WORK</span>
        <h1 data-i18n="portfolio.hero.h1">Work We're Proud Of</h1>
        <p data-i18n="portfolio.hero.sub">A selection of projects across web design, branding, and digital.</p>
      </div>
    </section>

    <!-- ── FILTER + GRID ── -->
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="filter-tabs" role="group" aria-label="Filter projects">
          <button class="filter-tab active" data-filter="all" data-i18n="portfolio.filter.all">All</button>
          <button class="filter-tab" data-filter="web" data-i18n="portfolio.filter.web">Web Design</button>
          <button class="filter-tab" data-filter="branding" data-i18n="portfolio.filter.branding">Branding</button>
          <button class="filter-tab" data-filter="ecommerce" data-i18n="portfolio.filter.ecommerce">E-Commerce</button>
        </div>

        <div class="portfolio-grid">
          <!-- Project 1 -->
          <article class="project-card" data-category="web" data-reveal>
            <div class="project-card-img">
              <div class="project-card-img-inner" style="background:linear-gradient(135deg,#1e3a5f,#2563eb);">
                <span style="font-family:'Syne',sans-serif;font-weight:800;color:rgba(255,255,255,0.15);font-size:3rem">MK</span>
              </div>
              <div class="project-card-overlay"><span>View Project →</span></div>
            </div>
            <div class="project-card-body">
              <p class="project-tag">Web Design</p>
              <h3 data-i18n="portfolio.p1.title">Mäkke Café</h3>
              <p data-i18n="portfolio.p1.desc">Brand identity and website for a specialty coffee shop in Tallinn.</p>
            </div>
          </article>
          <!-- Project 2 -->
          <article class="project-card" data-category="web" data-reveal>
            <div class="project-card-img">
              <div class="project-card-img-inner" style="background:linear-gradient(135deg,#0f172a,#1d4ed8);">
                <span style="font-family:'Syne',sans-serif;font-weight:800;color:rgba(255,255,255,0.15);font-size:3rem">NF</span>
              </div>
              <div class="project-card-overlay"><span>View Project →</span></div>
            </div>
            <div class="project-card-body">
              <p class="project-tag">Web Design</p>
              <h3 data-i18n="portfolio.p2.title">NordFlow SaaS</h3>
              <p data-i18n="portfolio.p2.desc">Landing page and onboarding flow for a B2B productivity platform.</p>
            </div>
          </article>
          <!-- Project 3 -->
          <article class="project-card" data-category="branding" data-reveal>
            <div class="project-card-img">
              <div class="project-card-img-inner" style="background:linear-gradient(135deg,#1a1a2e,#4a1942);">
                <span style="font-family:'Syne',sans-serif;font-weight:800;color:rgba(255,255,255,0.15);font-size:3rem">KC</span>
              </div>
              <div class="project-card-overlay"><span>View Project →</span></div>
            </div>
            <div class="project-card-body">
              <p class="project-tag">Branding</p>
              <h3 data-i18n="portfolio.p3.title">Kivi & Co.</h3>
              <p data-i18n="portfolio.p3.desc">Full rebrand and brand guidelines for a construction consultancy.</p>
            </div>
          </article>
          <!-- Project 4 -->
          <article class="project-card" data-category="ecommerce" data-reveal>
            <div class="project-card-img">
              <div class="project-card-img-inner" style="background:linear-gradient(135deg,#1a1a1a,#6b21a8);">
                <span style="font-family:'Syne',sans-serif;font-weight:800;color:rgba(255,255,255,0.15);font-size:3rem">LB</span>
              </div>
              <div class="project-card-overlay"><span>View Project →</span></div>
            </div>
            <div class="project-card-body">
              <p class="project-tag">E-Commerce</p>
              <h3 data-i18n="portfolio.p4.title">Lumi Boutique</h3>
              <p data-i18n="portfolio.p4.desc">E-commerce store for a Scandinavian fashion label.</p>
            </div>
          </article>
          <!-- Project 5 -->
          <article class="project-card" data-category="web" data-reveal>
            <div class="project-card-img">
              <div class="project-card-img-inner" style="background:linear-gradient(135deg,#042f2e,#0d9488);">
                <span style="font-family:'Syne',sans-serif;font-weight:800;color:rgba(255,255,255,0.15);font-size:3rem">HD</span>
              </div>
              <div class="project-card-overlay"><span>View Project →</span></div>
            </div>
            <div class="project-card-body">
              <p class="project-tag">Web Design</p>
              <h3 data-i18n="portfolio.p5.title">Harmo Dental</h3>
              <p data-i18n="portfolio.p5.desc">Website and SEO setup for a modern dental clinic.</p>
            </div>
          </article>
          <!-- Project 6 -->
          <article class="project-card" data-category="branding" data-reveal>
            <div class="project-card-img">
              <div class="project-card-img-inner" style="background:linear-gradient(135deg,#1c1917,#b45309);">
                <span style="font-family:'Syne',sans-serif;font-weight:800;color:rgba(255,255,255,0.15);font-size:3rem">PS</span>
              </div>
              <div class="project-card-overlay"><span>View Project →</span></div>
            </div>
            <div class="project-card-body">
              <p class="project-tag">Branding</p>
              <h3 data-i18n="portfolio.p6.title">Päike Studio</h3>
              <p data-i18n="portfolio.p6.desc">Logo and social media kit for a photography studio.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── STATS ── -->
    <section class="section" style="padding-top:0" data-reveal>
      <div class="container">
        <div class="stats-strip">
          <div>
            <div class="stat-number" data-count-to="50" data-count-suffix="+" data-i18n="portfolio.stat1.num">50+</div>
            <div class="stat-label" data-i18n="portfolio.stat1.label">Projects Delivered</div>
          </div>
          <div>
            <div class="stat-number" data-count-to="3" data-count-suffix="" data-i18n="portfolio.stat2.num">3</div>
            <div class="stat-label" data-i18n="portfolio.stat2.label">Years of Experience</div>
          </div>
          <div>
            <div class="stat-number" data-count-to="100" data-count-suffix="%" data-i18n="portfolio.stat3.num">100%</div>
            <div class="stat-label" data-i18n="portfolio.stat3.label">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="section" style="padding-top:0" data-reveal>
      <div class="container text-center">
        <a href="/contact.html" class="btn btn-primary" data-i18n="portfolio.cta.btn">Start Your Project</a>
      </div>
    </section>
  </main>

  <div id="footer-root"></div>
  <script src="/js/i18n.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in Live Server and verify**

- "Work" nav link is active
- 6 project cards appear in 3-column grid
- Clicking "Branding" tab hides web-design and e-commerce cards
- Clicking "All" shows all 6 again
- Stats strip: on scroll into view, numbers count up from 0 (50+, 3, 100%)
- Hover on a project card: overlay fades in, image zooms slightly

- [ ] **Step 3: Commit**

```bash
git add portfolio.html
git commit -m "feat: add portfolio page with filter tabs, 6 project cards, and animated stats"
```

---

## Task 10: About Page

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create `about.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="About Sylvara Web Design — who we are, our team, and what we stand for.">
  <title>About — Sylvara Web Design</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div id="nav-root"></div>

  <main>
    <!-- ── HERO ── -->
    <section class="page-hero">
      <div class="glow-blob glow-blob-tl" aria-hidden="true"></div>
      <div class="container">
        <span class="badge" data-i18n="about.hero.badge">WHO WE ARE</span>
        <h1 data-i18n="about.hero.h1">We Are Sylvara</h1>
        <p data-i18n="about.hero.sub">A small team of designers and developers who believe great digital work changes how businesses grow. We work closely with our clients — no account managers, just direct collaboration with the people building your project.</p>
      </div>
    </section>

    <!-- ── TEAM ── -->
    <section class="section" style="padding-top:0" data-reveal>
      <div class="container">
        <h2 class="text-center" data-i18n="about.team.h2">Meet the Team</h2>
        <div class="team-grid mt-48">
          <div class="card team-card" data-reveal>
            <div class="team-avatar" aria-hidden="true">MK</div>
            <h3 data-i18n="about.team.m1.name">Marten Kask</h3>
            <p class="team-role" data-i18n="about.team.m1.role">Lead Designer & Founder</p>
            <p class="team-bio" data-i18n="about.team.m1.bio">10 years of UI/UX experience across agencies and startups.</p>
          </div>
          <div class="card team-card" data-reveal>
            <div class="team-avatar" aria-hidden="true">LT</div>
            <h3 data-i18n="about.team.m2.name">Laura Tamm</h3>
            <p class="team-role" data-i18n="about.team.m2.role">Web Developer</p>
            <p class="team-bio" data-i18n="about.team.m2.bio">Full-stack developer with a love for clean, performant front-ends.</p>
          </div>
          <div class="card team-card" data-reveal>
            <div class="team-avatar" aria-hidden="true">KS</div>
            <h3 data-i18n="about.team.m3.name">Karl Sepp</h3>
            <p class="team-role" data-i18n="about.team.m3.role">Brand Strategist</p>
            <p class="team-bio" data-i18n="about.team.m3.bio">Helps clients find their voice and stand out in crowded markets.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── VALUES ── -->
    <section class="section" data-reveal>
      <div class="container">
        <h2 class="text-center" data-i18n="about.values.h2">What We Stand For</h2>
        <div class="values-grid mt-48">
          <div class="card" data-reveal>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 data-i18n="about.values.v1.title">Quality</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="about.values.v1.desc">We don't cut corners. Every project gets our full attention and a standard we're proud to put our name on.</p>
          </div>
          <div class="card" data-reveal>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 data-i18n="about.values.v2.title">Transparency</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="about.values.v2.desc">Clear timelines, honest pricing, and open communication from kickoff to handover.</p>
          </div>
          <div class="card" data-reveal>
            <div class="card-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3 data-i18n="about.values.v3.title">Results</h3>
            <p style="color:var(--text-muted);font-size:.875rem;margin-top:8px;line-height:1.65" data-i18n="about.values.v3.desc">Beautiful design is only half the job. We build things that perform and help your business grow.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="section" style="padding-top:0" data-reveal>
      <div class="container">
        <div class="cta-strip">
          <div class="cta-strip-text">
            <h2 data-i18n="home.cta.h2">Ready to get started?</h2>
            <p data-i18n="home.cta.sub">Free consultation, no commitment.</p>
          </div>
          <a href="/contact.html" class="btn btn-primary" data-i18n="about.cta.btn">Work With Us</a>
        </div>
      </div>
    </section>
  </main>

  <div id="footer-root"></div>
  <script src="/js/i18n.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in Live Server and verify**

- "About" nav link is active
- 3 team cards render with initials avatars (blue gradient circles)
- 3 value cards render with correct SVG icons
- Language switch changes all text including team names (which in ET keep Latin names as-is, roles change)
- CTA strip at bottom renders correctly

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: add about page with team cards and values"
```

---

## Task 11: Contact Page

**Files:**
- Create: `contact.html`

- [ ] **Step 1: Create `contact.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Contact Sylvara Web Design — get a free quote or book a discovery call.">
  <title>Contact — Sylvara Web Design</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <div id="nav-root"></div>

  <main>
    <!-- ── HERO ── -->
    <section class="page-hero">
      <div class="glow-blob glow-blob-tl" aria-hidden="true"></div>
      <div class="container">
        <span class="badge" data-i18n="contact.hero.badge">GET IN TOUCH</span>
        <h1 data-i18n="contact.hero.h1">Let's Build Something Great</h1>
        <p data-i18n="contact.hero.sub">Tell us about your project and we'll get back to you within 24 hours.</p>
      </div>
    </section>

    <!-- ── CONTACT LAYOUT ── -->
    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="contact-layout">
          <!-- Form column -->
          <div>
            <form id="contact-form" novalidate>
              <div id="form-success" class="form-success" role="alert">
                <h3 data-i18n="contact.form.success.h3">Message sent!</h3>
                <p data-i18n="contact.form.success.p">Thanks for reaching out. We'll be in touch within 24 hours.</p>
              </div>

              <div class="form-group">
                <label for="name" data-i18n="contact.form.label.name">Your Name</label>
                <input type="text" id="name" name="name" autocomplete="name"
                       data-i18n-placeholder="contact.form.placeholder.name"
                       placeholder="Jane Smith"
                       data-error-fallback="Please enter your name."
                       aria-required="true">
                <span class="field-error" role="alert"></span>
              </div>

              <div class="form-group">
                <label for="email" data-i18n="contact.form.label.email">Email Address</label>
                <input type="email" id="email" name="email" autocomplete="email"
                       data-i18n-placeholder="contact.form.placeholder.email"
                       placeholder="jane@company.com"
                       data-error-fallback="Please enter a valid email."
                       aria-required="true">
                <span class="field-error" role="alert"></span>
              </div>

              <div class="form-group">
                <label for="service" data-i18n="contact.form.label.service">Service Interested In</label>
                <select id="service" name="service" aria-required="true"
                        data-error-fallback="Please select a service.">
                  <option value="" data-i18n="contact.form.service.default">Select a service…</option>
                  <option value="web-design" data-i18n="service.webdesign.title">Web Design</option>
                  <option value="branding" data-i18n="service.branding.title">Branding</option>
                  <option value="logo" data-i18n="service.logo.title">Logo Design</option>
                  <option value="seo" data-i18n="service.seo.title">SEO</option>
                  <option value="ecommerce" data-i18n="service.ecommerce.title">E-Commerce</option>
                  <option value="social" data-i18n="service.social.title">Social Media Design</option>
                  <option value="copy" data-i18n="service.copy.title">Copywriting</option>
                  <option value="maintenance" data-i18n="service.maintenance.title">Website Maintenance</option>
                </select>
                <span class="field-error" role="alert"></span>
              </div>

              <div class="form-group">
                <label for="message" data-i18n="contact.form.label.message">Message</label>
                <textarea id="message" name="message" rows="5"
                          data-i18n-placeholder="contact.form.placeholder.message"
                          placeholder="Tell us about your project…"
                          data-error-fallback="Please write a short message."
                          aria-required="true"></textarea>
                <span class="field-error" role="alert"></span>
              </div>

              <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center" data-i18n="contact.form.submit">Send Message</button>
            </form>
          </div>

          <!-- Sidebar column -->
          <div>
            <div class="card contact-card" data-reveal>
              <div class="card-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <h3 data-i18n="contact.book.h3">Book a Discovery Call</h3>
              <p data-i18n="contact.book.p">Prefer to talk? Book a free 30-minute call and we'll walk through your project together.</p>
              <a href="https://calendly.com" target="_blank" rel="noopener" class="btn btn-ghost" style="width:100%;justify-content:center" data-i18n="contact.book.btn">Book on Calendly</a>
            </div>

            <div class="card" style="margin-top:20px" data-reveal>
              <div class="contact-info-item">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span data-i18n="contact.info.email">hello@sylvaradesign.com</span>
              </div>
              <div class="contact-info-item">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span data-i18n="contact.info.location">Tallinn, Estonia</span>
              </div>
              <div class="contact-info-item">
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span data-i18n="contact.info.response">We reply within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div id="footer-root"></div>
  <script src="/js/i18n.js"></script>
  <script src="/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in Live Server and verify**

- "Contact" nav link is active
- Two-column layout: form left, sidebar right. Stacks to single column on mobile.
- Submit with empty fields: inline error messages appear under each invalid field, border turns red
- Fix all fields and submit: form hides, success message appears
- Language switch changes form labels, placeholders, and dropdown options to Estonian
- Calendly button opens in new tab (placeholder URL — owner replaces)

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat: add contact page with inquiry form, validation, and book-a-call sidebar"
```

---

## Task 12: Final Responsive & Accessibility Pass

**Files:**
- Modify: `css/styles.css` (add any missing breakpoint fixes found during testing)

- [ ] **Step 1: Test at all breakpoints**

Open each of the 5 pages in browser DevTools. Test at:
- `375px` (iPhone SE)
- `768px` (tablet)
- `1024px` (laptop)
- `1440px` (desktop)

Checklist per page:
- [ ] No horizontal scroll at any width
- [ ] Navbar: hamburger visible at ≤768px, links visible at >768px
- [ ] Hero text readable at 375px (clamp() handles sizing)
- [ ] Grids collapse to single column at 375px
- [ ] CTA strip stacks vertically on mobile
- [ ] Contact form full-width on mobile
- [ ] Stats strip single column on mobile
- [ ] Process grid 2-column at ≤640px

- [ ] **Step 2: Accessibility checks**

- [ ] Tab through each page — focus ring visible on every interactive element
- [ ] All form inputs have associated `<label>`
- [ ] All `<img>` (none currently) and icon buttons have `aria-label`
- [ ] Run axe DevTools or similar browser extension on each page — aim for zero violations

- [ ] **Step 3: Fix any issues found**

If CSS gaps are found during Step 1, add targeted fixes to `css/styles.css`. Example — if the contact layout breaks at 900px, add:

```css
@media (max-width: 900px) {
  .contact-layout { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix: responsive and accessibility pass — all 5 pages verified at 375/768/1024/1440px"
```

---

## Done

All 5 pages are built, responsive, bilingual, and accessible. To deploy:

- **Netlify**: drag the project folder onto netlify.com/drop
- **GitHub Pages**: push to a GitHub repo, enable Pages on the `main` branch
- Replace placeholder values before going live:
  - `hello@sylvaradesign.com` → real email
  - Calendly URL → real booking link
  - Pricing `€X` hints → real prices
  - Team names/roles → real team details
  - Footer © year if needed
