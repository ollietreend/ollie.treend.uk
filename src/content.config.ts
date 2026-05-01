import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import formatText from "@src/lib/formatText";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string().transform(formatText),
    date: z.date(),
    description: z.string().optional(),
  }),
});

export const collections = { posts };
