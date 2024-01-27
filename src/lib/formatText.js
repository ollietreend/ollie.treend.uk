import { retext } from "retext";
import smartypants from "retext-smartypants";

/**
 * Format text using SmartyPants for smart quotes, dashes and ellipses
 */
export default async (text) => {
  const formatted = await retext().use(smartypants).process(text);
  return String(formatted);
};
