// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';

function rehypeWsrvImages() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node */
    function walk(node) {
      if (node.tagName === 'img') {
        const src = node.properties?.src;
        if (src && String(src).startsWith('http')) {
          const originalSrc = String(src);
          const encoded = encodeURIComponent(originalSrc);
          const base = `https://wsrv.nl/?url=${encoded}&output=webp&q=85`;
          node.properties.src = `${base}&w=800`;
          node.properties.srcset = [400, 800, 1200]
            .map((w) => `${base}&w=${w} ${w}w`)
            .join(', ');
          node.properties.sizes = '(max-width: 768px) 100vw, 800px';
          if (!node.properties.loading) node.properties.loading = 'lazy';
          node.properties.decoding = 'async';
          try {
            const originalUrl = new URL(originalSrc);
            const w = originalUrl.searchParams.get('width');
            const h = originalUrl.searchParams.get('height');
            if (w && h) {
              node.properties.width = parseInt(w, 10);
              node.properties.height = parseInt(h, 10);
            }
          } catch {}
        }
      }
      for (const child of node.children ?? []) {
        walk(child);
      }
    }
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://vajahath.github.io',
  integrations: [
    mdx({ processor: unified({ rehypePlugins: [rehypeWsrvImages] }) }),
    sitemap(),
  ],

  markdown: {
    processor: unified({ rehypePlugins: [rehypeWsrvImages] }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
