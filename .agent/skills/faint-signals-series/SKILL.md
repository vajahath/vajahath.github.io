---
name: faint-signals-series
description: Instructions for creating and managing content series in the faint-signals blog. Use this skill when asked to create a new series or add posts to an existing one.
metadata: 
  version: "1.0.0"
---

# Managing Series in Faint Signals

This guide outlines the technical requirements and organizational structure for content series.

## Prerequisites
- A series **MUST** contain at least one blog post to be valid.
- If the user asks for a new series but provides incomplete information, **YOU MUST ASK** for:
  - **Series Title** (The public display name)
  - **Description** (A short narrative overview)
  - **Cover Image** (Required for the series hub, though optional in schema, highly recommended)

## File Structure

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

### 2. Blog Post Organization
Posts belonging to a series are stored in a dedicated subdirectory.
- **Location**: `src/content/blog/[series-slug]/[post-id].md`
- **Ordering**: The `seriesOrder` frontmatter field is required for correct sequencing.
```markdown
---
title: "Part Title"
seriesOrder: 1
# ... other standard fields (pubDate, tags, heroImage, etc.)
---
```

## How to Create a New Series (Step-by-Step)

1. **Verify Information**: Check if you have the title, description, and at least one post ready.
2. **Create the Folder**: Initialize the directory `src/content/blog/[series-slug]/`.
3. **Add the Metadata**: Create `src/content/series/[series-slug].yaml`.
4. **Link the Post**: Move/Create the first post in the series directory and ensure `seriesOrder: 1` is present.
5. **Verify**: Ensure the image paths in the deeply nested `.md` files use correct relative paths (usually `../../../assets/image.jpg`).

## Navigation Features
The system automatically renders:
- A progress badge (`Series · Part X`) in listings and at the top of posts.
- A `SeriesNav` component at the bottom of posts with "Previous" and "Next" links.
- A series Table of Contents at `/series/[slug]/`.
