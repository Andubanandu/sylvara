"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { nav } from "@/lib/content";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
            <Link href="/services" className={isActive("/services") ? "active" : ""}>{nav.services}</Link>
            <Link href="/portfolio" className={isActive("/portfolio") ? "active" : ""}>{nav.work}</Link>
            <Link href="/about" className={isActive("/about") ? "active" : ""}>{nav.about}</Link>
            <Link href="/contact" className={isActive("/contact") ? "active" : ""}>{nav.contact}</Link>
          </div>

          <button
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </div>

      <div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <button className="nav-overlay-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>&#x2715;</button>
        <Link href="/services">{nav.services}</Link>
        <Link href="/portfolio">{nav.work}</Link>
        <Link href="/about">{nav.about}</Link>
        <Link href="/contact">{nav.contact}</Link>
      </div>
    </>
  );
}
