// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
import formatText from "@src/lib/formatText";

// Define a `type` and `schema` for each collection
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().transform(formatText),
    date: z.date(),
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = { posts };
