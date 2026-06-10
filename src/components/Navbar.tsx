"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, t, setLang } = useLanguage();

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
            <Link href="/services" className={isActive("/services") ? "active" : ""} aria-current={isActive("/services") ? "page" : undefined}>{t.nav.services}</Link>
            <Link href="/portfolio" className={isActive("/portfolio") ? "active" : ""} aria-current={isActive("/portfolio") ? "page" : undefined}>{t.nav.work}</Link>
            <Link href="/about" className={isActive("/about") ? "active" : ""} aria-current={isActive("/about") ? "page" : undefined}>{t.nav.about}</Link>
            <Link href="/contact" className={isActive("/contact") ? "active" : ""} aria-current={isActive("/contact") ? "page" : undefined}>{t.nav.contact}</Link>
            <div className="lang-switcher" role="group" aria-label="Language">
              <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
              <span className="lang-sep" aria-hidden="true">/</span>
              <button className={`lang-btn${lang === "et" ? " active" : ""}`} onClick={() => setLang("et")} aria-pressed={lang === "et"}>ET</button>
            </div>
          </div>

          <button
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </div>

      <div id="mobile-nav" className="nav-overlay" role="dialog" aria-modal="true" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <button className="nav-overlay-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>&#x2715;</button>
        <Link href="/services" aria-current={isActive("/services") ? "page" : undefined}>{t.nav.services}</Link>
        <Link href="/portfolio" aria-current={isActive("/portfolio") ? "page" : undefined}>{t.nav.work}</Link>
        <Link href="/about" aria-current={isActive("/about") ? "page" : undefined}>{t.nav.about}</Link>
        <Link href="/contact" aria-current={isActive("/contact") ? "page" : undefined}>{t.nav.contact}</Link>
        <div className="nav-overlay-lang" role="group" aria-label="Language">
          <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")} aria-pressed={lang === "en"}>English</button>
          <button className={`lang-btn${lang === "et" ? " active" : ""}`} onClick={() => setLang("et")} aria-pressed={lang === "et"}>Eesti</button>
        </div>
      </div>
    </>
  );
}
