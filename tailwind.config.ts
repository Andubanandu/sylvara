import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#060E3A",
        "bg-card": "#0D1547",
        "bg-card-hover": "#111E5C",
        "bg-footer": "#040A2E",
        accent: {
          DEFAULT: "#2563EB",
          light: "#60A5FA",
          hover: "#1d4ed8",
        },
        "text-primary": "#FFFFFF",
        "text-muted": "#94A3B8",
        "text-subtle": "#718096",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      maxWidth: { container: "1200px" },
    },
  },
  plugins: [],
};

export default config;
