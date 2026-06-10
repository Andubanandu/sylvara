import Link from "next/link";
import { home, services } from "@/lib/content";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button as NeonButton } from "@/components/ui/neon-button";

const serviceIcons = [
  <svg key="web" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  <svg key="brand" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  <svg key="seo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg key="ecom" viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.95-1.57l1.65-7.42H5.12"/></svg>,
];

export default function HomePage() {
  const previewServices = services.list.slice(0, 4);

  return (
    <main>
      {/* ── HERO ── */}
      <BackgroundPaths title={`${home.hero.line1} ${home.hero.line2}`} />

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
            <NeonButton href="/contact" variant="solid" size="lg" className="mx-0 text-base font-semibold">{home.cta.btn}</NeonButton>
          </div>
        </div>
      </section>
    </main>
  );
}
