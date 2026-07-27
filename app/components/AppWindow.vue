<script setup lang="ts">
type Node =
  | { type: 'folder'; name: string; open: boolean; children: Node[] }
  | { type: 'folder'; name: string; open: boolean; children: Node[] }
  | { type: 'file'; name: string; id: string }

const tree = reactive<Node[]>([
  {
    type: 'folder',
    name: 'journal',
    open: true,
    children: [
      { type: 'file', name: '2026-07-21.md', id: 'j21' },
      { type: 'file', name: '2026-07-24.md', id: 'j24' },
    ],
  },
  {
    type: 'folder',
    name: 'projects',
    open: true,
    children: [{ type: 'file', name: 'wisp.md', id: 'wisp' }],
  },
  { type: 'file', name: 'inbox.md', id: 'inbox' },
  { type: 'file', name: 'reading.md', id: 'reading' },
])

const files: Record<string, { path: string; lines: string[] }> = {
  inbox: {
    path: 'inbox.md',
    lines: [
      '# Inbox',
      '',
      '- [ ] Reply to Marta about the **vault layout**',
      '- [ ] Tag `v0.4.0`, then update the cask',
      '- [x] Move June entries into `journal/`',
      '',
      'Nothing here is rendered. That is the whole idea.',
    ],
  },
  wisp: {
    path: 'projects/wisp.md',
    lines: [
      '# Wisp',
      '',
      'A folder-backed Markdown editor. The folder is the format.',
      '',
      '## Decisions',
      '',
      '- The editor shows the file, not a picture of the file.',
      '- Reminders live in `.wisp-reminders.json` at the vault root.',
      '- Dot-prefixed entries stay hidden, including that one.',
      '',
      '> Notes should outlive the app that wrote them.',
      '',
      'Source: [github.com/oglimmer/wisp](https://github.com/oglimmer/wisp)',
    ],
  },
  j24: {
    path: 'journal/2026-07-24.md',
    lines: [
      '# 2026-07-24',
      '',
      'Walked to the river before the heat set in. Read two',
      'chapters, wrote none of my own.',
      '',
      'Someone asked why the editor has no preview button.',
      'Because the file _is_ the preview.',
      '',
      '- [ ] Water the plants',
    ],
  },
  j21: {
    path: 'journal/2026-07-21.md',
    lines: [
      '# 2026-07-21',
      '',
      'Rewrote the tree walker. Folders first, then files, both',
      'alphabetical — the order you would sort them by hand.',
      '',
      'Hid `node_modules` for good.',
    ],
  },
  reading: {
    path: 'reading.md',
    lines: [
      '# Reading',
      '',
      '## Started',
      '',
      '1. _The Tacit Dimension_ — Polanyi',
      '2. _A Pattern Language_ — Alexander',
      '',
      '## Finished',
      '',
      '- _Kitchen Confidential_ — Bourdain',
    ],
  },
}

const active = ref('wisp')
const current = computed(() => files[active.value]!)

const reminders = [
  { when: 'Overdue · 2 days', text: 'Tag v0.4.0', note: 'wisp.md', overdue: true },
  { when: 'Today · 17:00', text: 'Reply to Marta', note: 'inbox.md', overdue: false },
  { when: 'Mon · 09:00', text: 'Weekly review', repeat: 'weekly', overdue: false },
  { when: '1 Aug · 10:00', text: 'Renew the domain', repeat: 'yearly', overdue: false },
]

function open(id: string) {
  active.value = id
}
</script>

<template>
  <figure class="win">
    <div class="titlebar">
      <span class="lights" aria-hidden="true"><i /><i /><i /></span>
      <span class="vault">~/vault</span>
    </div>

    <div class="body">
      <!-- ── Sidebar: tree above, reminders below ── -->
      <div class="side">
        <div class="tools">
          <button type="button" title="New file" aria-label="New file">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M9 1.5H4.5A1.5 1.5 0 0 0 3 3v10A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V5.5L9 1.5Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
              <path d="M8 7.5v4M6 9.5h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </button>
          <button type="button" title="New folder" aria-label="New folder">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M1.8 4.2A1.2 1.2 0 0 1 3 3h3l1.4 1.6H13a1.2 1.2 0 0 1 1.2 1.2v6.4A1.2 1.2 0 0 1 13 13.4H3a1.2 1.2 0 0 1-1.2-1.2V4.2Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
              <path d="M8 7.6v3.2M6.4 9.2h3.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </button>
          <span class="spacer" />
          <button type="button" title="Refresh" aria-label="Refresh">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M13 8a5 5 0 1 1-1.6-3.7"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
              />
              <path d="M13 2v3h-3" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button type="button" title="Change folder" aria-label="Change folder">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M1.8 4.2A1.2 1.2 0 0 1 3 3h3l1.4 1.6H13a1.2 1.2 0 0 1 1.2 1.2v6.4A1.2 1.2 0 0 1 13 13.4H3a1.2 1.2 0 0 1-1.2-1.2V4.2Z"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <ul class="tree">
          <template v-for="node in tree" :key="node.name">
            <li v-if="node.type === 'folder'">
              <button type="button" class="row folder" @click="node.open = !node.open">
                <span class="tw" :class="{ open: node.open }" aria-hidden="true">▸</span>
                <span class="label">{{ node.name }}</span>
              </button>
              <ul v-show="node.open">
                <li v-for="child in node.children" :key="child.name">
                  <button
                    type="button"
                    class="row file nested"
                    :class="{ on: 'id' in child && child.id === active }"
                    @click="'id' in child && open(child.id)"
                  >
                    <span class="label">{{ child.name }}</span>
                  </button>
                </li>
              </ul>
            </li>
            <li v-else>
              <button
                type="button"
                class="row file"
                :class="{ on: node.id === active }"
                @click="open(node.id)"
              >
                <span class="label">{{ node.name }}</span>
              </button>
            </li>
          </template>
        </ul>

        <!-- The draggable separator between tree and reminders -->
        <div class="split" role="separator" aria-label="Resize"><span /></div>

        <div class="rem-head">
          <span>Reminders</span>
          <button type="button" title="Add reminder" aria-label="Add reminder" class="plus">＋</button>
        </div>

        <ul class="rems">
          <li v-for="r in reminders" :key="r.text" :class="{ due: r.overdue }">
            <span class="when">{{ r.when }}</span>
            <span class="what">{{ r.text }}</span>
            <span class="meta">
              <span v-if="r.note" class="chip">{{ r.note }}</span>
              <span v-if="r.repeat" class="chip rep">↻ {{ r.repeat }}</span>
            </span>
          </li>
        </ul>
      </div>

      <!-- ── Editor: raw source, nothing rendered ── -->
      <div class="pane">
        <pre class="editor"><code><span
          v-for="(line, i) in current.lines"
          :key="i"
          class="line"
          v-html="mdSource(line) || '&nbsp;'"
        /></code></pre>

        <div class="status">
          <span class="path">{{ current.path }}</span>
          <span class="saved"><i aria-hidden="true" />Saved</span>
        </div>
      </div>
    </div>
    <figcaption class="sr">
      A mock of the Wisp window: a file tree and reminder list on the left, raw Markdown source on
      the right.
    </figcaption>
  </figure>
</template>

<style scoped>
.win {
  margin: 0;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 11px;
  box-shadow: var(--shadow-window);
  overflow: hidden;
}

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* ── Title bar ── */
.titlebar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 38px;
  padding-inline: 0.85rem;
  background: linear-gradient(var(--surface-sunk), color-mix(in srgb, var(--surface-sunk) 60%, var(--fog-deep)));
  border-bottom: 1px solid var(--rule-soft);
}

.lights {
  display: flex;
  gap: 6px;
}

.lights i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--rule);
}

.lights i:first-child {
  background: #e0715f;
}
.lights i:nth-child(2) {
  background: #e3b04b;
}
.lights i:nth-child(3) {
  background: #7fb069;
}

.vault {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--faint);
  margin-inline: auto;
  padding-right: 2.5rem;
}

/* ── Layout ── */
.body {
  display: grid;
  grid-template-columns: 1fr;
}

.side {
  display: flex;
  flex-direction: column;
  background: var(--surface-sunk);
  border-bottom: 1px solid var(--rule-soft);
  padding-bottom: 0.5rem;
}

.tools {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  padding: 0.4rem 0.5rem;
  border-bottom: 1px solid var(--rule-soft);
}

.tools .spacer {
  flex: 1;
}

.tools button {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.tools button:hover {
  background: var(--fog-deep);
  color: var(--ink);
}

/* ── Tree ── */
.tree {
  padding: 0.4rem 0.35rem;
  overflow: auto;
  flex: 1;
  min-height: 0;
}

.row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  padding: 0.2rem 0.45rem;
  border-radius: 5px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--ink-soft);
  line-height: 1.7;
}

.row:hover {
  background: var(--fog-deep);
}

.row.nested {
  padding-left: 1.5rem;
}

.row.folder .label {
  font-weight: 500;
}

.row.file .label {
  color: var(--muted);
}

.row.on {
  background: var(--mark-wash);
}

.row.on .label {
  color: var(--mark-deep);
  font-weight: 500;
}

.tw {
  display: inline-block;
  font-size: 0.68rem;
  color: var(--muted);
  transition: transform 0.16s ease;
  width: 0.7em;
}

.tw.open {
  transform: rotate(90deg);
}

/* ── Separator ── */
.split {
  height: 9px;
  display: grid;
  place-items: center;
  cursor: row-resize;
  border-top: 1px solid var(--rule-soft);
  border-bottom: 1px solid var(--rule-soft);
  background: color-mix(in srgb, var(--fog-deep) 45%, transparent);
}

.split span {
  width: 26px;
  height: 2px;
  border-radius: 2px;
  background: var(--rule);
}

/* ── Reminders ── */
.rem-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.6rem 0.3rem 0.8rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
}

.plus {
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  line-height: 1;
  padding: 0.1rem 0.25rem;
  border-radius: 4px;
}

.plus:hover {
  background: var(--fog-deep);
  color: var(--ink);
}

.rems {
  padding: 0 0.35rem;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.rems li {
  padding: 0.4rem 0.55rem;
  border-radius: 5px;
  display: grid;
  gap: 0.1rem;
}

.rems li:hover {
  background: var(--fog-deep);
}

.rems .when {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--faint);
}

.rems .what {
  font-size: 0.8125rem;
  color: var(--ink-soft);
  line-height: 1.35;
}

.rems .meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.15rem;
}

.chip {
  font-family: var(--font-mono);
  font-size: 0.63rem;
  color: var(--muted);
  background: var(--fog-deep);
  padding: 0.05rem 0.3rem;
  border-radius: 3px;
}

.rems li.due {
  background: var(--ember-wash);
  box-shadow: inset 2px 0 0 var(--ember);
}

.rems li.due .when {
  color: var(--ember);
  font-weight: 500;
}

.rems li.due .chip {
  background: color-mix(in srgb, var(--ember) 14%, transparent);
  color: var(--ember);
}

/* ── Editor ── */
.pane {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.editor {
  margin: 0;
  flex: 1;
  overflow-x: auto;
  padding: 1.15rem 1.35rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.85;
  color: var(--ink-soft);
  tab-size: 2;
}

.editor code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
  display: block;
}

.line {
  display: block;
  white-space: pre;
}

.status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.4rem 0.9rem;
  border-top: 1px solid var(--rule-soft);
  background: var(--surface-sunk);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--faint);
}

.saved {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--muted);
}

.saved i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #7fb069;
}

@media (min-width: 52rem) {
  .body {
    grid-template-columns: 232px 1fr;
    min-height: 430px;
  }

  .side {
    border-bottom: 0;
    border-right: 1px solid var(--rule-soft);
    padding-bottom: 0;
  }

  .tree {
    max-height: 210px;
  }

  .rems {
    padding-bottom: 0.5rem;
  }

  .editor {
    font-size: 0.875rem;
    padding: 1.5rem 1.75rem;
  }
}
</style>
