# Faint Signals

Personal blog of Vajahath Ahmed. Astro static site, deployed to GitHub Pages at
https://vajahath.github.io. Aesthetic: high-density, high-contrast "live news"
front page built on Material Design 3.

## Commands

```bash
pnpm dev              # localhost:4321
pnpm build            # typecheck + post:validate + astro build
pnpm typecheck        # astro check
pnpm post:validate    # scripts/validate-posts.ts (frontmatter + series refs)
pnpm preview
```

Node 24, pnpm 11 (see `.node-version`, `packageManager`).

## Design principles

These hold; don't drift from them.

- **M3 tokens, never raw values.** Colors come from `--md-sys-color-*` in
  `src/styles/design-system.css`. Type comes from the `m3-*` utilities. No
  hardcoded hex, no ad-hoc `text-[18px]`.
- **Typography is Roboto Flex everywhere**, driven hard through its variable
  axes (`wght`, `opsz`, `XOPQ`, `XTRA`, `YTAS`/`YTDE`) for a broadcast look.
  Axis values live in the `--md-sys-typescale-*-variation` tokens.
- **Text shades differ from fill shades.** The bright `--md-sys-color-primary`
  / `error` are for fills, dots, borders and large display type; small text on
  a light surface (and any fill carrying white text) uses the darker
  `--md-sys-color-primary-text` / `error-text` steps, which clear WCAG AA. The
  dark theme maps the text steps back to the bright shades, which already pass
  on black.
- **Outlines over shadows.** `border-2` and `--md-sys-color-outline` separate
  containers. Elevation/shadow is visual noise here.
- **Density without cost.** Tighten vertical rhythm freely, but interactive
  elements keep a 48dp hit area (`m3-touch-target`) with 8dp between targets.
- **Accessibility is non-negotiable.** WCAG AA contrast (4.5:1 body, 3:1 large),
  real landmarks (`nav`/`main`/`aside`/`footer`), headings for hierarchy not
  size, descriptive alt text (`alt=""` only for decoration).
- **Headlines** use `text-wrap: balance` plus `overflow-wrap: break-word` so long
  titles never cause horizontal scroll. Body copy stays ~60–75 characters wide.
- **Baseline alignment**: when huge display text sits next to small labels, use
  `items-baseline` with tight `leading-*` on the large text.

- **Don't rely on a bare-tag rule for a visual property.** `h1` gets
  `m3-display-large` from a base rule, and that is where its `uppercase` comes
  from — so changing an element's tag (for heading hierarchy, say) can silently
  drop styling the component never declared. Put anything that matters on the
  element.

### Type roles

`m3-display-large|medium|small`, `m3-headline-large|medium|small`,
`m3-title-large`, `m3-focus-title` (sidebar emphasis), `m3-body-large` (article
text), `m3-label-large|medium` (metadata, chips), `m3-lede`,
`news-signal-highlight`, `m3-touch-target`.

### Tailwind 4

Custom roles are registered with the `@utility` directive so the engine can
optimize and `@apply` them. Use `@theme` for design tokens; keep fine-grained
font-axis control in plain `--md-sys-*` custom properties. Tailwind is wired
through `@tailwindcss/vite` — there is no config file.

## Content

Schema of record is `src/content.config.ts`. Detailed authoring workflow lives in
`.claude/skills/faint-signals-series/SKILL.md`.

- Posts: `src/content/blog/**/*.{md,mdx}` — file path becomes the URL slug.
- Series metadata: `src/content/series/<slug>.yaml`; posts join via
  `seriesId` + `seriesOrder`.
- Every tag used must be registered in `src/consts.ts` or its styling breaks.
- Homepage slots are frontmatter-driven: `isSpotlight`, `isFocus`, `hotTakes`.
- **Drafts**: `draft: true` on a post or series keeps it visible under
  `pnpm dev` and out of production entirely — listings, homepage slots, series,
  tags, archives, RSS, sitemap and its own page. Read content through
  `getVisiblePosts()` / `getVisibleSeries()` in `src/lib/content.ts`, never
  `getCollection` directly, or the new surface leaks drafts.
- `src/content/blog/style-tester.md` is a permanent draft covering every
  rendering case (headings H2–H4, portrait/landscape/remote images, table,
  code, blockquote, task list, long tag list). Check design changes against it.

## Working rules

- Verify locally with `pnpm build`; CI is a safety net, not a gate. Don't wait
  on it.
- Append `[skip ci]` to commits that don't need a deploy (docs, chores, tooling)
  to save Actions quota.
- Trunk-based: commit to `main`, no PRs.
