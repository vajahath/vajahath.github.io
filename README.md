# Faint Signals [![Deploy to GitHub Pages](https://github.com/vajahath/vajahath.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/vajahath/vajahath.github.io/actions/workflows/deploy.yml)

A personal blog for wandering thoughts, late discoveries, and probably wrong takes.

**Live site**: https://vajahath.github.io/

> [!NOTE]
> Personal blog. Opinions are my own, and subject to change as I learn more.

## Stack

- [Astro 7](https://astro.build/) — content-first static site generation
- [Tailwind CSS 4](https://tailwindcss.com/) — via `@tailwindcss/vite`, `@utility` engine
- **Material Design 3** — semantic tonal tokens, high-density outlined layouts
- **Roboto Flex** — variable axes (`wght`, `opsz`, `XOPQ`, `XTRA`) for a broadcast look

## Run it

Requires Node 24 and pnpm 11.

```bash
git clone https://github.com/vajahath/vajahath.github.io.git
cd vajahath.github.io
pnpm install
pnpm dev       # http://localhost:4321
```

`pnpm build` type-checks, validates post frontmatter, then builds.

## Add a post

Drop a `.md` or `.mdx` file under `src/content/blog/` — the path becomes the URL slug.

```markdown
---
title: "Your Explosive Headline"
description: "A punchy summary of your take."
pubDate: "2026-02-12"
heroImage: "../../assets/blog-placeholder-2.jpg"
tags: ["DESIGN", "UX"]
---

Your story starts here...
```

Tags must be registered in `src/consts.ts`. Full conventions live in
`CLAUDE.md` and `.claude/skills/faint-signals-series/SKILL.md`.

PRs welcome if you have a signal worth amplifying.

## License

[MIT](LICENSE)
