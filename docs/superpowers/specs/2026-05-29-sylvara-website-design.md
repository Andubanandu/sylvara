# Sylvara Web Design — Website Spec

**Date:** 2026-05-29
**Project:** Sylvara Web Design agency website
**Stack:** HTML5 · CSS3 · Vanilla JS (no framework, no build step)

---

## Overview

A 5-page bilingual (Estonian / English) agency website for Sylvara Web Design. Full dark mode throughout, deep navy + electric blue neon palette matching the brand logo. Target clients are small businesses and mid-size brands. Primary goals: showcase services, build trust, and convert visitors into inquiries or discovery calls.

---

## File Structure

```
c:\Sylvara koduleht\
├── index.html
├── services.html
├── portfolio.html
├── about.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js          # shared nav inject, language init, mobile menu
│   └── i18n.js          # language switching logic
├── lang/
│   ├── en.json          # all English strings keyed by id
│   └── et.json          # all Estonian strings keyed by id
├── components/
│   ├── nav.html         # shared navbar markup (fetched + injected)
│   └── footer.html      # shared footer markup
└── assets/
    └── images/
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#060E3A` | Page background |
| `--bg-card` | `#0D1547` | Cards, nav glass |
| `--bg-card-hover` | `#111E5C` | Card hover state |
| `--accent` | `#2563EB` | Buttons, borders, icons |
| `--accent-light` | `#60A5FA` | Labels, links, glow text |
| `--text-primary` | `#FFFFFF` | Headings, body |
| `--text-muted` | `#94A3B8` | Secondary text |
| `--text-subtle` | `#475569` | Placeholders, footer text |
| `--border` | `rgba(37,99,235,0.25)` | Card and section borders |
| `--glow` | `rgba(37,99,235,0.35)` | Box shadows, radial glows |

### Typography

| Role | Font | Weight | Source |
|---|---|---|---|
| Headings (h1–h3) | Syne | 700, 800 | Google Fonts |
| Body / UI | Manrope | 400, 500, 600 | Google Fonts |

- Body font size: 16px minimum
- Line height: 1.6 for body, 1.15 for display headings
- Line length: max 68ch on text-heavy sections

### Spacing & Layout

- Max content width: `1200px` (`max-w-6xl` equivalent)
- Section vertical padding: `80px` desktop, `48px` mobile
- Card border-radius: `12px`
- Button border-radius: `8px` (pill for secondary: `9999px`)

### Z-Index Scale

| Layer | Value |
|---|---|
| Content | 10 |
| Dropdown | 20 |
| Navbar | 30 |
| Modal / overlay | 50 |

### Animations

- Micro-interactions: `150–200ms ease`
- Page element reveals: `300ms ease-out` with `translateY(16px)` → `translateY(0)` using `IntersectionObserver`
- All animations respect `prefers-reduced-motion`

---

## Development Constraint

The site requires an HTTP server — `fetch()` and JSON loading fail under `file://` protocol. Locally, use **VS Code Live Server** (right-click `index.html` → Open with Live Server) or `npx serve .`. Production deployment to Netlify / GitHub Pages works as-is.

---

## Shared Components

### Navbar (`components/nav.html`)

- Floating style: `position: fixed`, `top: 16px`, `left: 16px`, `right: 16px`, `border-radius: 12px`
- Frosted glass: `background: rgba(6,14,58,0.85)`, `backdrop-filter: blur(12px)`
- Border: `1px solid var(--border)`
- Z-index: 30
- Content: Logo left (SYLVARA + WEB DESIGN) · Nav links center/right (Services, Work, About, Contact) · Language switcher (ET | EN badge) far right
- Mobile: hamburger icon toggles full-screen overlay menu
- Language switcher: clicking ET or EN saves to `localStorage('lang')` and calls `applyLanguage()`

### Footer (`components/footer.html`)

- Background: `#040A2E` (slightly darker than base)
- Top border: `1px solid var(--border)`
- Content: Logo + tagline left · Nav links center · Social icons right (LinkedIn, Instagram)
- Bottom bar: copyright + Privacy Policy link

---

## Pages

### 1. Homepage (`index.html`)

**Hero section**
- Full viewport height (`min-height: 100vh`)
- Two radial blue glow blobs (top-left, bottom-right) via `position: absolute` pseudo-elements
- Badge pill: "FULL-SERVICE DESIGN AGENCY"
- H1: "Bold Design. Real Results."
- Subheading: "We build high-converting websites and brand identities for businesses that want to stand out. Web design, branding, SEO, and more — all under one roof."
- CTA row: Primary button "Get a Free Quote" (links to contact.html) + Ghost button "View Our Work →" (links to portfolio.html)

**Services overview section**
- Section label: "WHAT WE DO"
- H2: "Everything your brand needs, in one place."
- 2×2 card grid on mobile, 4-column on desktop — showing Web Design, Branding, SEO, E-Commerce
- Each card: icon (SVG inline, 24×24 viewBox, `--accent-light` stroke), title, one-line description
- "+ 4 more services →" link to services.html below grid

**CTA strip**
- Gradient background: `linear-gradient(135deg, rgba(37,99,235,0.25), rgba(96,165,250,0.1))`
- "Ready to get started?" headline + "Book a Call" button (links to contact.html)

---

### 2. Services (`services.html`)

**Hero**
- Shorter hero (40vh), headline "What We Offer" + brief subtext

**Services grid**
- 8 service cards in a 2-column (mobile) / 4-column (desktop) grid
- Services: Web Design · Branding · Logo Design · SEO · E-Commerce · Social Media Design · Copywriting · Website Maintenance
- Each card: icon, title, 2-sentence description, subtle "Starting from €X" price hint (placeholder text — owner replaces with real pricing)

**Process strip**
- H2: "How We Work"
- 4 numbered steps in a horizontal row (stacked on mobile): Discover → Design → Build → Launch
- Each step: number badge (electric blue), title, one-line description

**CTA**
- Same gradient CTA strip as homepage

---

### 3. Portfolio (`portfolio.html`)

**Hero**
- H1: "Our Work"
- Subtext: "A selection of projects across web design, branding, and digital."

**Filter tabs**
- Horizontal pill tabs: All · Web Design · Branding · E-Commerce
- Clicking a tab shows/hides cards by `data-category` attribute (vanilla JS toggle)
- Active tab: filled `--accent` background; inactive: ghost border

**Project grid**
- 3-column CSS grid on desktop, 2-column tablet, 1-column mobile
- 6 placeholder project cards
- Each card: colored gradient placeholder image area (16:10 ratio), project name, category tag, brief description
- Hover state: overlay with "View Project →" text + slight scale-up on image

**Stats strip**
- 3 stat counters in a row: "50+ Projects" · "3 Years Experience" · "100% Client Satisfaction"
- Numbers animate up on scroll via IntersectionObserver

**CTA**
- "Start Your Project" button → contact.html

---

### 4. About (`about.html`)

**Hero**
- H1: "We Are Sylvara"
- 2–3 sentence agency origin story / mission

**Team section**
- H2: "Meet the Team"
- 3 team member placeholder cards (circular avatar placeholder, name, role, one-line bio)

**Values section**
- H2: "What We Stand For"
- 3 value cards with SVG icons: Quality · Transparency · Results

**CTA**
- "Work With Us" → contact.html

---

### 5. Contact (`contact.html`)

**Hero**
- H1: "Let's Build Something Great"
- Subtext: "Tell us about your project and we'll get back within 24 hours."

**Two-column layout** (stacked on mobile)

*Left column — Inquiry form*
- Fields: Name (text) · Email (email) · Service interested in (select dropdown, all 8 services) · Message (textarea, min 4 rows)
- Submit button: "Send Message" — disabled during submission
- Client-side validation: required fields, email format
- Success state: form replaced with "Thanks! We'll be in touch within 24 hours." message
- Error state: inline error messages per field

*Right column — Alternatives*
- "Book a Discovery Call" card with calendar icon and Calendly placeholder link (easily swappable)
- Contact info: email address placeholder, location (Estonia)
- Response time note: "We reply within 24 hours"

---

## Bilingual System

### Translation files

`lang/en.json` and `lang/et.json` share identical key structure:

```json
{
  "nav.services": "Services",
  "nav.work": "Work",
  "nav.about": "About",
  "nav.contact": "Contact",
  "home.hero.badge": "FULL-SERVICE DESIGN AGENCY",
  "home.hero.h1": "Bold Design. Real Results.",
  ...
}
```

### HTML markup

Every user-visible text node gets `data-i18n="key"`:

```html
<h1 data-i18n="home.hero.h1">Bold Design. Real Results.</h1>
```

Placeholder attributes also handled:
```html
<input data-i18n-placeholder="contact.form.name" placeholder="Your name">
```

### `js/i18n.js`

```js
async function loadLanguage(lang) {
  const res = await fetch(`/lang/${lang}.json`);
  const strings = await res.json();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = strings[el.dataset.i18n] ?? el.textContent;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = strings[el.dataset.i18nPlaceholder] ?? el.placeholder;
  });
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
}

function initLanguage() {
  const saved = localStorage.getItem('lang') || 'en';
  loadLanguage(saved);
}
```

Language switcher in nav calls `loadLanguage('et')` or `loadLanguage('en')` on click and highlights the active option.

---

## Shared JS (`js/main.js`)

1. **Component injection** — on DOMContentLoaded, fetch `components/nav.html` and `components/footer.html`, inject into `<div id="nav-root">` and `<div id="footer-root">`, then call `initLanguage()`
2. **Mobile menu** — hamburger toggle adds/removes `.menu-open` class on `<body>`; overlay closes on nav link click or Escape key
3. **Scroll reveal** — `IntersectionObserver` adds `.visible` class to elements with `data-reveal`; CSS transitions from `opacity:0; transform:translateY(16px)` to `opacity:1; transform:translateY(0)`
4. **Active nav link** — highlights current page link by comparing `window.location.pathname`
5. **Portfolio filter** — tabs toggle `data-category` visibility on portfolio page only
6. **Stats counter** — animates numbers up when stats strip enters viewport
7. **Contact form** — validation + submit handler + success/error state

---

## Accessibility

- All images: descriptive `alt` text
- Icon-only buttons: `aria-label`
- Form inputs: `<label for="...">` on every field
- Focus rings: visible on all interactive elements (`outline: 2px solid var(--accent-light)`)
- Keyboard navigation: tab order matches visual order
- Color contrast: white text on `#060E3A` exceeds 4.5:1
- `prefers-reduced-motion`: all CSS transitions wrapped in `@media (prefers-reduced-motion: no-preference)`

---

## Responsive Breakpoints

| Breakpoint | Width | Key changes |
|---|---|---|
| Mobile | < 640px | Single column, stacked nav overlay, hamburger menu |
| Tablet | 640px–1024px | 2-column grids, side-by-side some sections |
| Desktop | > 1024px | Full layout, floating navbar, 3–4 column grids |

---

## Out of Scope

- Backend / form submission endpoint (contact form submits to placeholder; owner wires up Formspree/Netlify Forms/email later)
- CMS integration
- Real portfolio images (placeholders used)
- Real team photos (placeholders used)
- Actual Calendly link (placeholder href)
- Analytics integration
