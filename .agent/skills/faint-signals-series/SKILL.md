---
name: faint-signals-series
description: Instructions for creating and managing content in the faint-signals blog. Use this skill when asked to create a new series, regular posts, manage homepage highlights (Spotlight, Focus Analysis, Hot Takes), update post dates, or add tags.
metadata: 
  version: "1.1.0"
---

# Managing Content & Series in Faint Signals

This guide outlines the technical requirements, organizational structure, and homepage integrations for content in the faint-signals project.

## Posts and Frontmatter

When creating or modifying any blog post, the following frontmatter properties are supported according to `src/content.config.ts`:

```markdown
---
title: "Post Title"
description: "Brief overview."
pubDate: "YYYY-MM-DD"        # Standard date, dictates main chronological order
updatedDate: "YYYY-MM-DD"    # Optional, used if changing the date a post was last updated
heroImage: "/path/to/image.jpg" # Optional
tags: ["TECHNOLOGY", "AI"]    # Array of strings, defaults to ['PERSONAL BLOG']. Registration in consts.ts required.
isSpotlight: true            # Optional boolean (Default: false). Exclusively highlights this as the Spotlight post.
isFocus: true                # Optional boolean (Default: false). Flags this post as the Focus Analysis.
hotTakes:                    # Optional array of strings. Displayed on the homepage "Hot Takes" sidebar.
  - "Take 1"
  - "Take 2"
# seriesId: "series-slug"    # Required if part of a series (must match a YAML file in src/content/series/)
# seriesOrder: 1             # Required if part of a series
---
```

## Creating or Modifying a Blog Post

- **Standalone Post**: Create the file anywhere in `src/content/blog/` (e.g. `src/content/blog/life/2026/[post-slug].md`) with the standard frontmatter. Make sure to omit `seriesId` and `seriesOrder`.
- **Change Post Date**: Update the `pubDate` property in the frontmatter. Changing this will reflect its layout across the site.
- **Labels/Tags**: Modify the `tags: ['TAG1', 'TAG2']` array. **IMPORTANT**: Every new tag used must be registered in `src/consts.ts` with appropriate M3-style colors or else the styling will break.
- **Validation**: After making changes, ALWAYS run `pnpm post:validate` to ensure all frontmatter fields and series references are correct.

## Homepage Highlight Mechanisms

The `src/pages/index.astro` file uses specific frontmatter fields to populate homepage components:

- **Spotlight Post (Top Hero)** 
  - **How it's determined**: Controlled by `isSpotlight: true` in a post's frontmatter. It falls back to the most recently published post (`posts[0]`) if no post has it.
  - **How to change it**: Remove `isSpotlight: true` from the old post's frontmatter and add it to the desired new post's frontmatter.
  
- **Focus Analysis Post (Right Sidebar)**
  - **How it's determined**: Controlled by `isFocus: true` in a post's frontmatter. It exclusively filters out the Spotlight post to avoid duplication. It falls back to the 9th most recent or 1st most recent post if none exist.
  - **How to change it**: Remove `isFocus: true` from the old post's frontmatter and add it to the desired new post's frontmatter.
  
- **Hot Takes (Right Sidebar Top)**
  - **How it's determined**: The site scans all posts and aggregates any string inside the `hotTakes: [...]` frontmatter array. It currently selects up to 5 of these takes *randomly* for display.
  - **How to add/manage**: Add items to the `hotTakes` array in *any* relevant post's frontmatter.

## Series File Structure

### 1. Series Metadata
Metadata for the series hub and individual series pages is stored in YAML format.
- **Location**: `src/content/series/[series-slug].yaml`
- **Fields**:
```yaml
title: "Series Name"
description: "Brief overview of the narrative."
coverImage: "../../assets/your-image.jpg" # Relative to src/content/series/
startedAt: "YYYY-MM-DD"
```

### 2. Series Post Organization
Posts belonging to a series can be stored anywhere in `src/content/blog/`, but it's recommended to keep them in a dedicated subdirectory (e.g., `src/content/blog/[series-slug]/[post-slug].md`) for better organization.
- **Linkage**: The `seriesId` and `seriesOrder` frontmatter fields are **REQUIRED** for the post to be linked and sequenced correctly within the series.
```markdown
---
title: "Part Title"
seriesId: "series-slug"
seriesOrder: 1
# ... other standard fields (pubDate, tags, heroImage, etc.)
---
```

## How to Create a New Series (Step-by-Step)

1. **Verify Information**: Check if you have the title, description, and at least one post ready. If not, **YOU MUST ASK** the user for them (including an optional but recommended Cover Image).
2. **Create the Folder**: Initialize the directory `src/content/blog/[series-slug]/`.
3. **Add the Metadata**: Create `src/content/series/[series-slug].yaml`.
4. **Link the Post**: Move/Create the first post in the series directory (`src/content/blog/[series-slug]/[post-slug].md`) and ensure `seriesId: "[series-slug]"` and `seriesOrder: 1` are present in the frontmatter.
5. **Tag Verification**: Ensure all tags in the post frontmatter exist in `src/consts.ts`. If not, **YOU MUST** add them with appropriate M3-style colors before proceeding.
6. **Validation**: Run `pnpm post:validate` to ensure all metadata is correctly formatted and series references are intact.
