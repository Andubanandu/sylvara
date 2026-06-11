"use client";
import { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { Button as NeonButton } from "@/components/ui/neon-button";
import { HeroGlow } from "@/components/HeroGlow";

interface FormState {
  name: string; email: string; service: string; message: string;
}
interface Errors {
  name?: string; email?: string; service?: string; message?: string;
}

export default function ContactPage() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<FormState>({ name: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = t.contact.form.errorName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t.contact.form.errorEmail;
    if (!form.service) e.service = t.contact.form.errorService;
    if (!form.message.trim()) e.message = t.contact.form.errorMessage;
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
        <HeroGlow />
        <div className="container relative z-10">
          <span className="badge">{t.contact.hero.badge}</span>
          <h1>{t.contact.hero.h1}</h1>
          <p>{t.contact.hero.sub}</p>
        </div>
      </section>

      {/* ── CONTACT LAYOUT ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-layout">
            {/* Form */}
            <div data-reveal>
              {submitted ? (
                <div className="form-success visible">
                  <h3>{t.contact.form.successH3}</h3>
                  <p>{t.contact.form.successP}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className={`form-group${errors.name ? " has-error" : ""}`}>
                    <label htmlFor="name">{t.contact.form.labelName}</label>
                    <input type="text" id="name" autoComplete="name" placeholder={t.contact.form.placeholderName} {...field("name")} />
                    {errors.name && <span className="field-error" style={{ display: "block" }} role="alert">{errors.name}</span>}
                  </div>

                  <div className={`form-group${errors.email ? " has-error" : ""}`}>
                    <label htmlFor="email">{t.contact.form.labelEmail}</label>
                    <input type="email" id="email" autoComplete="email" placeholder={t.contact.form.placeholderEmail} {...field("email")} />
                    {errors.email && <span className="field-error" style={{ display: "block" }} role="alert">{errors.email}</span>}
                  </div>

                  <div className={`form-group${errors.service ? " has-error" : ""}`}>
                    <label htmlFor="service">{t.contact.form.labelService}</label>
                    <select id="service" {...field("service")}>
                      <option value="">{t.contact.form.defaultService}</option>
                      {t.services.list.map((s) => (
                        <option key={s.title} value={s.title.toLowerCase().replace(/\s+/g, "-")}>{s.title}</option>
                      ))}
                    </select>
                    {errors.service && <span className="field-error" style={{ display: "block" }} role="alert">{errors.service}</span>}
                  </div>

                  <div className={`form-group${errors.message ? " has-error" : ""}`}>
                    <label htmlFor="message">{t.contact.form.labelMessage}</label>
                    <textarea id="message" rows={5} placeholder={t.contact.form.placeholderMessage} {...field("message")} />
                    {errors.message && <span className="field-error" style={{ display: "block" }} role="alert">{errors.message}</span>}
                  </div>

                  <NeonButton type="submit" variant="solid" size="lg" className="w-full mx-0 justify-center text-base font-semibold" disabled={loading}>
                    {loading ? (lang === "et" ? "Saadan…" : "Sending…") : t.contact.form.submit}
                  </NeonButton>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div data-reveal style={{ transitionDelay: "120ms" }}>
              <div className="card contact-card">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <h3>{t.contact.book.h3}</h3>
                <p>{t.contact.book.p}</p>
                <NeonButton href="https://cal.eu/andri-koitla-lr1rby/veebilehe-labiraakimine" variant="ghost" size="lg" className="w-full mx-0 justify-center text-base font-semibold text-white">
                  {t.contact.book.btn}
                </NeonButton>
              </div>

              <div className="card" style={{ marginTop: "20px" }}>
                <div className="contact-info-item">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <a href={`mailto:${t.contact.info.email}`}>{t.contact.info.email}</a>
                </div>
                <div className="contact-info-item">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  <a href={`tel:${t.contact.info.phone.replace(/\s/g, "")}`}>{t.contact.info.phone}</a>
                </div>
                <div className="contact-info-item">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{t.contact.info.location}</span>
                </div>
                <div className="contact-info-item">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>{t.contact.info.response}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
