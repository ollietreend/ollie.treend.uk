# ollie.treend.uk

Personal website and blog of Ollie Treend, software engineer based in London, UK.

Built with [Astro](https://astro.build), [Svelte](https://svelte.dev), and [Tailwind CSS](https://tailwindcss.com). Deployed to [Netlify](https://netlify.com).

## Tech stack

- **Framework:** Astro 6 (static site generation)
- **UI components:** Svelte 5, Tailwind CSS 4
- **Content:** MDX with the Content Layer API
- **Syntax highlighting:** Shiki (Monokai theme)
- **Comments:** [Giscus](https://giscus.app)
- **Link prefetching:** Quicklink

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm run dev`     | Start local dev server at `localhost:4321`    |
| `npm run build`   | Build production site to `dist/`             |
| `npm run preview` | Preview the production build locally         |
| `npm run prettier`| Format all files with Prettier               |

## Deployment

The site is automatically deployed to Netlify on every push to `main`. Build configuration is in [`netlify.toml`](netlify.toml).

Node.js is managed via [Mise](https://mise.jdx.dev) (see [`.mise.toml`](.mise.toml)).
