"use client";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function HeroScroll() {
  return (
    <ContainerScroll
      titleComponent={
        <>
          <p className="text-sm font-semibold tracking-widest uppercase mb-4"
             style={{ color: "var(--accent-light)" }}>
            Our Work
          </p>
          <h2 style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontWeight: 800,
            color: "#fff",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            lineHeight: 1.15,
            marginBottom: "0.25rem",
          }}>
            Designed to convert.
          </h2>
          <span style={{
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontWeight: 800,
            color: "var(--accent-light)",
            fontSize: "clamp(3rem, 7vw, 5rem)",
            lineHeight: 1,
            display: "block",
          }}>
            Built to perform.
          </span>
        </>
      }
    >
      <Image
        src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=80"
        alt="Sylvara web design portfolio preview"
        height={720}
        width={1400}
        className="mx-auto rounded-2xl object-cover h-full object-top"
        draggable={false}
        priority={false}
      />
    </ContainerScroll>
  );
}
