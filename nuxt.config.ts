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
      title: 'Wisp — notes that file themselves',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'A Markdown note editor with Claude wired into it. Type a note and it is filed into the right file; ask a question and it is answered from your own notes; drop an image and it is described into searchable text. Plain files, macOS, MIT.',
        },
        { property: 'og:title', content: 'Wisp — notes that file themselves' },
        {
          property: 'og:description',
          content:
            'A Markdown note editor with Claude wired into it: notes file themselves, questions are answered from your own notes, and images become searchable text.',
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
