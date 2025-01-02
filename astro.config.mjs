import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import styleMarkdownElements from "./src/lib/styleMarkdownElements";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import svelte from "@astrojs/svelte";
import { shield } from "@kindspells/astro-shield";

// Only allow robots in production
const policy = [];
if (process.env.NETLIFY && process.env.CONTEXT == "production") {
  policy.push({ allow: "/", userAgent: "*" });
} else {
  policy.push({ disallow: "/", userAgent: "*" });
}

// Content-Security-Policy header config
// Astro-Shield auto-calculates SRI hashes and generates the required CSP headers
const shieldConfig = {
  securityHeaders: {
    enableOnStaticPages: { provider: "netlify" },
    contentSecurityPolicy: {
      cspDirectives: {
        "default-src": "'self'",

        // Required so the waving hand Easter egg is performant
        // https://github.com/catdad/canvas-confetti/issues/131#issuecomment-727661873
        // Skipping 'self' since I don't use any other workers in this project
        "worker-src": "blob:",
      },
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: process.env.URL ?? "http://localhost:4321",
  integrations: [
    mdx(),
    svelte(),
    tailwind(),
    shield(shieldConfig),
    sitemap(),
    robotsTxt({ policy }),
  ],
  build: {
    assets: "assets",
  },
  markdown: {
    rehypePlugins: [styleMarkdownElements],
    shikiConfig: { theme: "monokai" },
  },
});
