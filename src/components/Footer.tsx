"use client";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <div className="footer-logo-wrap">
              <div className="logo-main">SYLVARA</div>
              <div className="logo-sub">WEB DESIGN</div>
            </div>
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>

          <div>
            <p className="footer-col-title">{t.footer.nav}</p>
            <ul className="footer-links">
              <li><Link href="/services">{t.nav.services}</Link></li>
              <li><Link href="/portfolio">{t.nav.work}</Link></li>
              <li><Link href="/about">{t.nav.about}</Link></li>
              <li><Link href="/contact">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">{t.footer.follow}</p>
            <div className="footer-social">
              <a href="https://facebook.com" className="social-link" aria-label="Facebook" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.copy}</p>
          <Link href="/privacy">{t.footer.privacy}</Link>
        </div>
      </div>
    </footer>
  );
}
