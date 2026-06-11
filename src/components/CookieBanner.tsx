"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/language-context";

const KEY = "cookieConsent";

/* GDPR cookie consent banner. Shown on first visit; the choice is stored
   in localStorage ("all" | "necessary") so it never appears again. */
export function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* localStorage unavailable — leave the banner hidden */
    }
  }, []);

  function choose(value: "all" | "necessary") {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label={t.cookies.aria}>
      <p>{t.cookies.text}</p>
      <div className="cookie-banner-actions">
        <button type="button" className="btn btn-primary" onClick={() => choose("all")}>
          {t.cookies.accept}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => choose("necessary")}>
          {t.cookies.necessary}
        </button>
      </div>
    </div>
  );
}
