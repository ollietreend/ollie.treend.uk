import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import fullWidthCodeBlocks from "./src/lib/fullWidthCodeBlocks";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), tailwind()],
  build: {
    assets: "assets"
  },
  markdown: {
    rehypePlugins: [fullWidthCodeBlocks]
  }
});
