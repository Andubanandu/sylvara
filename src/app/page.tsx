"use client";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button as NeonButton } from "@/components/ui/neon-button";

const serviceIcons = [
  <svg key="web" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  <svg key="brand" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  <svg key="seo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg key="ecom" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57l1.65-7.42H5.12"/></svg>,
];

export default function HomePage() {
  const { t } = useLanguage();
  const previewServices = t.services.list.slice(0, 4);

  return (
    <main>
      {/* ── HERO ── */}
      <BackgroundPaths title={`${t.home.hero.line1} ${t.home.hero.line2}`} ctaLabel={t.home.hero.ctaPrimary} />

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="section-label" data-reveal>{t.home.services.label}</p>
          <h2 data-reveal>{t.home.services.h2}</h2>
          <div className="services-grid">
            {previewServices.map((svc, i) => (
              <div className="card" key={svc.title} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="card-icon">{serviceIcons[i]}</div>
                <h3>{svc.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: ".875rem", marginTop: "8px" }}>{svc.desc}</p>
              </div>
            ))}
          </div>
          <div className="services-more" data-reveal>
            <Link href="/services">{t.home.services.more}</Link>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section className="section">
        <div className="container">
          <p className="section-label" data-reveal>{t.problems.label}</p>
          <h2 data-reveal>{t.problems.h2}</h2>
          <div className="problems-grid">
            {t.problems.cards.map((card, i) => (
              <div className="card" key={card.n} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="problem-num">{card.n}</span>
                <h3>{card.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: ".875rem", marginTop: "8px", lineHeight: 1.65 }}>{card.body}</p>
                {card.bullets.length > 0 && (
                  <ul className="problem-bullets">
                    {card.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <NeonButton href="/contact" variant="solid" size="lg" className="text-base font-semibold">{t.problems.cta}</NeonButton>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <p className="section-label" data-reveal>{t.home.testimonials.label}</p>
          <h2 data-reveal>{t.home.testimonials.h2}</h2>
          <div className="testimonials-grid">
            {t.home.testimonials.items.map((item, i) => (
              <div className="card testimonial-card" key={item.name} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="testimonial-quote">{item.quote}</p>
                <p className="testimonial-author">{item.name}</p>
                <p className="testimonial-role">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-strip" data-reveal>
            <div className="cta-strip-text">
              <h2>{t.home.cta.h2}</h2>
              <p>{t.home.cta.sub}</p>
            </div>
            <NeonButton href="/contact" variant="solid" size="lg" className="mx-0 text-base font-semibold">{t.home.cta.btn}</NeonButton>
          </div>
        </div>
      </section>
    </main>
  );
}
