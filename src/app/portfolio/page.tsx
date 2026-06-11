"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/language-context";
import { Button as NeonButton } from "@/components/ui/neon-button";
import { HeroGlow } from "@/components/HeroGlow";

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

// Category key order matches the filters array order in both languages
const categoryKeys = ["all", "web", "branding", "ecommerce"];

export default function PortfolioPage() {
  const { t } = useLanguage();
  const [filterIdx, setFilterIdx] = useState(0);

  const filtered = t.portfolio.projects.filter(
    (p) => filterIdx === 0 || p.category === categoryKeys[filterIdx]
  );

  return (
    <main>
      {/* ── HERO ── */}
      <section className="page-hero">
        <HeroGlow />
        <div className="container relative z-10">
          <span className="badge">{t.portfolio.hero.badge}</span>
          <h1>{t.portfolio.hero.h1}</h1>
          <p>{t.portfolio.hero.sub}</p>
        </div>
      </section>

      {/* ── FILTER + GRID ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filter-tabs" role="group" aria-label="Filter projects">
            {t.portfolio.filters.map((f, i) => (
              <NeonButton
                key={f}
                variant={filterIdx === i ? "solid" : "ghost"}
                size="sm"
                className="mx-0 text-sm font-medium text-white"
                onClick={() => setFilterIdx(i)}
              >
                {f}
              </NeonButton>
            ))}
          </div>

          <div className="portfolio-grid">
            {filtered.map((project, i) => (
              <article className="project-card" key={project.title} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
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
          <div className="stats-strip" data-reveal>
            {t.portfolio.stats.map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container text-center">
          <NeonButton href="/contact" variant="solid" size="lg" className="text-base font-semibold">{t.portfolio.cta}</NeonButton>
        </div>
      </section>
    </main>
  );
}
