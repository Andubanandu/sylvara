import type { Metadata } from "next";
import Link from "next/link";
import { about, home } from "@/lib/content";
import { Button as NeonButton } from "@/components/ui/neon-button";

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
            <NeonButton href="/contact" variant="solid" size="lg" className="mx-0 text-base font-semibold">{about.cta}</NeonButton>
          </div>
        </div>
      </section>
    </main>
  );
}
