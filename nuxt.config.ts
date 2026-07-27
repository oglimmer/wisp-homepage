export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  // Static export for GitHub Pages: adds .nojekyll and a 404.html fallback.
  nitro: { preset: 'github-pages' },
  app: {
    // Project pages are served from /wisp-homepage/; the workflow sets this.
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Wisp — a Markdown editor that shows you the Markdown',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Wisp opens a folder and edits what is inside it — plain Markdown, monospace, saved straight back to disk. A minimal, folder-backed note editor for macOS.',
        },
        { property: 'og:title', content: 'Wisp — a Markdown editor that shows you the Markdown' },
        {
          property: 'og:description',
          content:
            'Wisp opens a folder and edits what is inside it — plain Markdown, monospace, saved straight back to disk.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@400;500;600;700&family=Martian+Mono:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
})
