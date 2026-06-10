"use client";
import { useState } from "react";
import { contact, services } from "@/lib/content";
import { Button as NeonButton } from "@/components/ui/neon-button";

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

                  <NeonButton type="submit" variant="solid" size="lg" className="w-full mx-0 justify-center text-base font-semibold" disabled={loading}>
                    {loading ? "Sending…" : contact.form.submit}
                  </NeonButton>
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
                <NeonButton href="https://calendly.com" variant="ghost" size="lg" className="w-full mx-0 justify-center text-base font-semibold text-white">
                  {contact.book.btn}
                </NeonButton>
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
