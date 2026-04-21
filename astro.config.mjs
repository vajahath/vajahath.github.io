// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

function rehypeWsrvImages() {
  return (tree) => {
    function walk(node) {
      if (node.tagName === 'img') {
        const src = node.properties?.src;
        if (src && String(src).startsWith('http')) {
          const encoded = encodeURIComponent(String(src));
          const base = `https://wsrv.nl/?url=${encoded}&output=webp&q=85`;
          node.properties.src = `${base}&w=800`;
          node.properties.srcset = [400, 800, 1200]
            .map((w) => `${base}&w=${w} ${w}w`)
            .join(', ');
          node.properties.sizes = '(max-width: 768px) 100vw, 800px';
          if (!node.properties.loading) node.properties.loading = 'lazy';
          node.properties.decoding = 'async';
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
  site: 'https://example.com',
  integrations: [
    mdx({ rehypePlugins: [rehypeWsrvImages] }),
    sitemap(),
  ],

  markdown: {
    rehypePlugins: [rehypeWsrvImages],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
