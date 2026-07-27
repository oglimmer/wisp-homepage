/**
 * Wraps Markdown syntax marks in spans so the mocks can colour them the way
 * Wisp does — the marks stay visible, which is the entire point of the app.
 * Input is escaped first; the output is only ever fed our own content.
 */

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const mark = (t: string) => `<i class="sy">${t}</i>`

export function mdSource(line: string): string {
  let s = escapeHtml(line)

  // `inline code`
  s = s.replace(/`([^`]+)`/g, (_m, c: string) => `${mark('`')}<i class="cd">${c}</i>${mark('`')}`)

  // [label](url)
  s = s.replace(
    /\[([^\]]*)\]\(([^)]*)\)/g,
    (_m, label: string, url: string) =>
      `${mark('[')}${label}${mark(']')}${mark('(')}<i class="ur">${url}</i>${mark(')')}`,
  )

  // **bold**
  s = s.replace(/\*\*([^*]+)\*\*/g, (_m, t: string) => `${mark('**')}${t}${mark('**')}`)

  // _italic_ — written without a lookbehind, which older Safari cannot parse
  s = s.replace(
    /(^|[^\w*])_([^_]+)_(?![\w*])/g,
    (_m, pre: string, t: string) => `${pre}${mark('_')}${t}${mark('_')}`,
  )

  // # heading
  s = s.replace(/^(#{1,6})(\s)/, (_m, h: string, sp: string) => `${mark(h)}${sp}`)

  // > quote
  s = s.replace(/^(&gt;)(\s)/, (_m, q: string, sp: string) => `${mark(q)}${sp}`)

  // - bullet  /  1. ordered
  s = s.replace(
    /^(\s*)([-*+])(\s)/,
    (_m, ws: string, b: string, sp: string) => `${ws}${mark(b)}${sp}`,
  )
  s = s.replace(
    /^(\s*)(\d+\.)(\s)/,
    (_m, ws: string, b: string, sp: string) => `${ws}${mark(b)}${sp}`,
  )

  // - [ ] task
  s = s.replace(
    /^(\s*<i class="sy">[-*+]<\/i>\s)\[([ x])\]/,
    (_m, pre: string, box: string) => `${pre}${mark('[')}${box}${mark(']')}`,
  )

  return s
}

/** Same as above, then wraps every occurrence of `term` in a highlight. */
export function mdSourceWithHits(line: string, term: string, liveIndex = -1, offset = 0): string {
  const html = mdSource(line)
  if (!term) return html

  let n = offset
  // Split on tags so we only ever match inside text nodes.
  return html
    .split(/(<[^>]+>)/g)
    .map((chunk) => {
      if (chunk.startsWith('<')) return chunk
      return chunk.replace(new RegExp(term, 'gi'), (m) => {
        const cls = n++ === liveIndex ? 'hit hit-live' : 'hit'
        return `<mark class="${cls}">${m}</mark>`
      })
    })
    .join('')
}
