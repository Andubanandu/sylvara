import type { NextConfig } from "next";

// On GitHub Actions the site is built as a static export served from
// https://andubanandu.github.io/sylvara/ — hence the basePath.
// Local dev (npm run dev) stays at plain http://localhost:3000.
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubActions ? "/sylvara" : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
