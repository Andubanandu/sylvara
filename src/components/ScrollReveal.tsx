"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Adds .visible to [data-reveal] elements as they enter the viewport.
   Re-runs on route change, and watches the DOM so elements rendered
   later (e.g. portfolio filter changes) animate too. */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const observeAll = () => {
      document
        .querySelectorAll("[data-reveal]:not(.visible)")
        .forEach((el) => io.observe(el));
    };
    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
