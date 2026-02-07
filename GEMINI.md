# Project Overview: faint-signals

`faint-signals` is a modern, high-performance blog built with [Astro](https://astro.build). It is based on the official Astro blog starter template, focusing on speed, SEO, and developer experience.

## Main Technologies
- **Astro 5**: The core web framework for building fast content-driven websites.
- **MDX**: Support for using JSX components within Markdown content.
- **Astro Content Collections**: Type-safe content management for blog posts.
- **Sitemap**: Automatic sitemap generation for better SEO.
- **TypeScript**: Used for configuration and content schemas.

## Project Structure
- `src/content/blog/`: Contains Markdown (`.md`) and MDX (`.mdx`) files for blog posts.
- `src/pages/`: File-based routing. Includes the index, about page, and dynamic blog post routes.
- `src/components/`: Reusable Astro components (Header, Footer, BaseHead, etc.).
- `src/layouts/`: Layout templates, such as `BlogPost.astro` for rendering articles.
- `src/consts.ts`: Global site metadata like `SITE_TITLE` and `SITE_DESCRIPTION`.
- `public/`: Static assets like favicons and fonts.

## Building and Running
All commands should be executed from the project root:

| Command | Description |
| :--- | :--- |
| `npm install` | Install project dependencies. |
| `npm run dev` | Start the development server at `http://localhost:4321`. |
| `npm run build` | Build the static site for production (output to `dist/`). |
| `npm run preview` | Preview the production build locally. |
| `npm run astro ...` | Run Astro CLI commands (e.g., `astro check`). |

## Development Conventions
- **Content Schema**: All blog posts must adhere to the schema defined in `src/content.config.ts` (title, description, pubDate, etc.).
- **Styling**: Global styles are in `src/styles/global.css`. Component-specific styles are scoped within `.astro` files.
- **Images**: Use the `<Image />` component from `astro:assets` for optimized image delivery, as seen in `src/layouts/BlogPost.astro`.
- **SEO**: Canonical URLs and OpenGraph tags are managed in `src/components/BaseHead.astro`.
