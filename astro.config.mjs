import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import styleMarkdownElements from "./src/lib/styleMarkdownElements";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

// Only allow robots in production
const policy = [];
if (process.env.NETLIFY && process.env.CONTEXT == "production") {
  policy.push({ allow: "/", userAgent: "*" });
} else {
  policy.push({ disallow: "/", userAgent: "*" });
}

// https://astro.build/config
export default defineConfig({
  site: process.env.URL ?? "http://localhost:4321",
  integrations: [mdx(), tailwind(), sitemap(), robotsTxt({ policy })],
  build: {
    assets: "assets",
  },
  markdown: {
    rehypePlugins: [styleMarkdownElements],
    shikiConfig: {
      theme: "monokai",
    },
  },
});
