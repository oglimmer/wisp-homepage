/**
 * Absolute URL for a file in public/, with the app's base path applied.
 *
 * Vite rewrites bundled assets for us but leaves root-relative public paths
 * alone. The base path is "/" on the custom domain, but stays correct if the
 * site is ever served from /wisp-homepage/ again. Call this from a setup
 * context.
 */
export function publicAsset(path: string): string {
  const base = useRuntimeConfig().app.baseURL || '/'
  return `${base}/${path}`.replace(/\/{2,}/g, '/')
}
