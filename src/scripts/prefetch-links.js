// Prefetch internal links to reduce the impact of Netlify's high TTFB on pages which aren't in the edge cache
import { listen } from "quicklink";
listen();
