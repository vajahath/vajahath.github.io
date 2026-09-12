---
name: faint-signals-series
description: Author and manage content for the Faint Signals blog — new posts, new series, homepage highlight slots (Spotlight, Focus Analysis, Hot Takes), tags, and post dates. Use when adding or editing anything under src/content.
---

# Faint Signals content

Schema of record: `src/content.config.ts`. This file explains the conventions
around it.

This skill covers the mechanics only — frontmatter, tags, slots, series wiring.
For the words themselves, use the `faint-signals-post` skill: it turns Vaju's
spoken dump into prose that sounds like him. Write the post there first, get
it approved, then come back here for everything below.

## Post frontmatter

```yaml
---
title: "Post Title"
description: "Brief overview."
pubDate: "YYYY-MM-DD"          # drives chronological order
updatedDate: "YYYY-MM-DD"      # optional
heroImage: "../../assets/x.jpg" # optional; relative to the post file
author: "Author Name"          # optional, defaults to Vajahath Ahmed
tags: ["AI & TECH"]            # optional, defaults to ["PERSONAL BLOG"]
toc: "show"                    # optional, renders table of contents
isSpotlight: true              # optional homepage hero
isFocus: true                  # optional homepage sidebar analysis
hotTakes: ["One-liner"]        # optional homepage sidebar takes
seriesId: "series-slug"        # required for series posts
seriesOrder: 1                 # required for series posts
draft: true                    # optional; dev-only, never built for production
---
```

Every tag must exist in `TAGS` in `src/consts.ts` (label + color + textColor) or
its styling breaks. Add new ones there first, using M3-style deep, high-contrast
colors.

## Drafts

`draft: true` keeps a post (or a series YAML) visible under `pnpm dev` and out
of the production build completely — no listing, no homepage slot, no tag or
archive entry, no RSS item, no sitemap entry, no page of its own. Pages must
read content via `getVisiblePosts()` / `getVisibleSeries()` from
`src/lib/content.ts` rather than `getCollection`, or drafts leak.

`src/content/blog/style-tester.md` is a permanent draft that exercises every
rendering case; check design changes against it.

## Posts

- File path under `src/content/blog/` becomes the URL slug. Standalone posts can
  live anywhere (e.g. `src/content/blog/life/2026/my-post.md`).
- Changing the date means changing `pubDate`; site layout follows automatically.

## Homepage slots

Read by `src/pages/index.astro`:

- **Spotlight** (hero): the post with `isSpotlight: true`, else the newest post.
- **Focus Analysis** (sidebar): the post with `isFocus: true`, excluding the
  Spotlight post; falls back to an older post.
- **Hot Takes** (sidebar): up to 5 entries sampled at random from the `hotTakes`
  arrays across all posts.

To move a slot, remove the flag from the old post and add it to the new one.

## Series

1. Create `src/content/blog/<series-slug>/` for the posts (recommended, not
   enforced).
2. Create `src/content/series/<series-slug>.yaml`:

```yaml
title: "Series Name"
description: "Brief overview of the narrative."
coverImage: "../../assets/your-image.jpg"  # optional, relative to this file
startedAt: "YYYY-MM-DD"                    # optional
```

3. Give each post `seriesId: "<series-slug>"` and a unique positive
   `seriesOrder`.

If the user hasn't supplied a title, description, or cover image for a new
series, ask before inventing them.

## Always finish with

```bash
pnpm build   # runs typecheck + post:validate + astro build
```
