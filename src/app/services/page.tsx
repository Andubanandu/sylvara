import type { Metadata } from "next";
import Link from "next/link";
import { services, home } from "@/lib/content";
import { Button as NeonButton } from "@/components/ui/neon-button";

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
            <NeonButton href="/contact" variant="solid" size="lg" className="mx-0 text-base font-semibold">{home.cta.btn}</NeonButton>
          </div>
        </div>
      </section>
    </main>
  );
}
