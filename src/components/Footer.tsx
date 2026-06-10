import Link from "next/link";
import { nav, footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <div className="footer-logo-wrap">
              <div className="logo-main">SYLVARA</div>
              <div className="logo-sub">WEB DESIGN</div>
            </div>
            <p className="footer-tagline">{footer.tagline}</p>
          </div>

          <div>
            <p className="footer-col-title">{footer.nav}</p>
            <ul className="footer-links">
              <li><Link href="/services">{nav.services}</Link></li>
              <li><Link href="/portfolio">{nav.work}</Link></li>
              <li><Link href="/about">{nav.about}</Link></li>
              <li><Link href="/contact">{nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">{footer.follow}</p>
            <div className="footer-social">
              <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
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
          <p>{footer.copy}</p>
          <Link href="/privacy">{footer.privacy}</Link>
        </div>
      </div>
    </footer>
  );
}
