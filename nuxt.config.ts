// Project pages are served from /wisp-homepage/; the workflow sets both of
// these. Head links are not base-prefixed by Nuxt, so we do it here.
const base = process.env.NUXT_APP_BASE_URL || '/'
const icon = (name: string) => `${base}icons/${name}`.replace(/\/{2,}/g, '/')
// Site root — origin *and* base path already, since it comes from
// actions/configure-pages. Empty when generating locally, in which case
// og:image falls back to the relative path.
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  // fonts.css first: the @font-face rules must be in place before main.css
  // refers to the families. Both are bundled and served from our own origin —
  // the site loads nothing from a third-party URL.
  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],
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
        {
          property: 'og:image',
          content: siteUrl ? `${siteUrl}/icons/icon-1024.png` : icon('icon-1024.png'),
        },
        // Matches --fog, the page background.
        { name: 'theme-color', content: '#e7eaf0' },
      ],
      link: [
        // The macOS app icon, reused as the site's mark.
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: icon('icon-32.png') },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: icon('icon-16.png') },
        { rel: 'apple-touch-icon', sizes: '256x256', href: icon('icon-256.png') },
      ],
    },
  },
})
