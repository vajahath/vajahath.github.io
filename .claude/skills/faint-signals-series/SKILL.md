---
name: faint-signals-series
description: Wire up content for the Faint Signals blog — frontmatter, tags, series, drafts, homepage slots (Spotlight, Focus, Hot Takes) and the build. Use when adding or editing anything under src/content. For the prose itself, use faint-signals-post.
---

# Faint Signals content mechanics

Schema of record: `src/content.config.ts`. This file explains the conventions
around it.

**This skill is the plumbing only.** The words — title, description, hot takes,
body — belong to the `faint-signals-post` skill, which drafts them from Vaju's
spoken dump in his voice. Write and get the prose approved there first, then
come back here to wire it in. Never invent a title, description or hot take
while doing frontmatter; go get them from the post skill.

## Post frontmatter

```yaml
---
title: "Post Title"             # from faint-signals-post, not invented here
description: "Brief overview."  # likewise — shown on cards and in RSS
pubDate: "YYYY-MM-DD"           # always ISO; drives chronological order
updatedDate: "YYYY-MM-DD"       # optional
heroImage: "../../assets/x.jpg" # optional; local path or remote URL
author: "Author Name"           # optional, defaults to Vajahath Ahmed
tags: ["AI & TECH"]             # optional, defaults to ["PERSONAL BLOG"]
toc: "show"                     # optional, renders table of contents
titleHighlight: "two words"     # optional; marks that phrase in the title
titleHighlightColor: yellow     # optional ink for it; defaults to the accent
isSpotlight: true               # optional homepage hero
isFocus: true                   # optional homepage sidebar analysis
hotTakes: ["One-liner"]         # optional; also from faint-signals-post
seriesId: "series-slug"         # required for series posts
seriesOrder: 1                  # required for series posts
draft: true                     # optional; dev-only, never built for production
---
```

Every tag must exist in `TAGS` in `src/consts.ts` (label + color + textColor) or
its styling breaks. Add new ones there first, using M3-style deep, high-contrast
colors.

`pubDate` is ISO (`2026-04-26`). Some older posts use `Apr 07 2026`; the schema
coerces both, but normalise to ISO when touching a post.

## Highlighting

Two separate things, one kit.

**In a title**, `titleHighlight` names a phrase to mark. It is matched
case-insensitively *after* title-casing, and the build fails if the phrase is
not in the title — a silent miss would just render an unmarked headline. Keep
it to a couple of words; a marked full headline is a solid block of colour.

```yaml
title: "Building a Different Kind of Blog"
titleHighlight: "Different Kind"
titleHighlightColor: sky        # optional
```

**In prose**, write `<mark>` directly in the Markdown:

```markdown
This is <mark>the accent</mark>, this is <mark data-color="lime">lime</mark>,
and this is <mark data-style="underline">underlined instead</mark>.
```

Inks: `orange` (the site accent, and the default), `yellow`, `lime`, `sky`,
`pink`, `violet`. Anything else falls through to the accent.

Each ink is a *different colour* in each theme — a wash tuned to carry black
text on paper is far too bright under white text — and all twelve clear WCAG AA
for body text. Do not add an ink without checking both themes; the generator
and the contrast notes are in `src/styles/design-system.css`.

Attributes, not classes: an attribute selector cannot be dropped by a purge
pass, so a colour used in one post years from now still renders. `data-color`
rather than `color`, which is not a valid attribute on `<mark>`.

Use it sparingly. One or two marks in a post reads as emphasis; a page of them
reads as a mess.

## Heading rule — this fails the build

Body headings **start at H2 and step down one level at a time**. The post title
is already the page H1.

- No `#` in the body. Ever.
- No jumping H2 → H4.

Enforced twice: `scripts/validate-posts.ts` on the Markdown source, and
`scripts/check-headings.ts` on the rendered HTML. Fenced code is skipped, so
shell comments are safe.

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

Read by `src/pages/index.astro`, where the counts live as named constants at
the top of the file — check them there rather than trusting a number quoted
here.

- **Spotlight** (hero): the post with `isSpotlight: true`, else the newest post.
- **Focus** (sidebar): the post with `isFocus: true`, excluding the Spotlight
  post; otherwise the 9th-newest, otherwise the newest remaining.
- **Hot Takes** (sidebar): `HOT_TAKES_COUNT` entries sampled at random from the
  `hotTakes` arrays across all posts.
- **Feed**: up to `FEED_POSTS_COUNT` posts, Spotlight withheld (it is the hero
  directly above). The Focus post stays in the feed.

Only one post should carry each of `isSpotlight` and `isFocus`. To move a slot,
remove the flag from the old post and add it to the new one.

The 2/3 + 1/3 split needs at least 3 feed posts; below that the sidebar drops
to a full-width band underneath. This is self-correcting — the split returns as
the archive grows — so don't "fix" a stub feed by padding the archive.

## Series

1. Create `src/content/blog/<series-slug>/` for the posts (recommended, not
   enforced).
2. Create `src/content/series/<series-slug>.yaml` — the **filename is the
   `seriesId`**:

```yaml
title: "Series Name"
description: "Brief overview of the narrative."
coverImage: "../../assets/your-image.jpg"  # optional, relative to this file
startedAt: "YYYY-MM-DD"                    # optional
draft: true                                # optional
```

3. Give each post `seriesId: "<series-slug>"` and a unique positive
   `seriesOrder`.

A `seriesId` with no matching YAML fails validation. `seriesOrder` without
`seriesId` fails too. Deleting the last post of a series leaves an orphan YAML —
remove it, or leave the series deliberately.

If the user hasn't supplied a title, description or cover image for a new
series, ask before inventing them.

## Always finish with

```bash
pnpm build   # typecheck → post:validate → astro build → lint:headings
```
