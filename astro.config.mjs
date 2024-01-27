import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import styleMarkdownElements from "./src/lib/styleMarkdownElements";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind()],
  build: {
    assets: "assets"
  },
  markdown: {
    rehypePlugins: [styleMarkdownElements]
  }
});
