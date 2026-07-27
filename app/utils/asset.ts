/**
 * Absolute URL for a file in public/, with the app's base path applied.
 *
 * Vite rewrites bundled assets for us but leaves root-relative public paths
 * alone, and on GitHub Pages the site lives under /wisp-homepage/ — so a bare
 * "/icons/icon-256.png" would 404 there. Call this from a setup context.
 */
export function publicAsset(path: string): string {
  const base = useRuntimeConfig().app.baseURL || '/'
  return `${base}/${path}`.replace(/\/{2,}/g, '/')
}
