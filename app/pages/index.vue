<script setup lang="ts">
/**
 * The hero headline arrives looking rendered, then de-renders: the Markdown
 * marks grow back in and the bold drains out, leaving the source. It is the
 * product's argument, performed once, on load.
 */
const derendered = ref(false)
const settled = ref(false)

onMounted(() => {
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (still) {
    derendered.value = true
    settled.value = true
    return
  }
  setTimeout(() => (derendered.value = true), 850)
  setTimeout(() => (settled.value = true), 1500)
})

const shortcuts = [
  {
    keys: ['⌘S', 'Ctrl+S'],
    action: 'Save',
    detail: 'The status bar reads Saved or Unsaved changes. Wisp asks before you discard edits.',
  },
  {
    keys: ['⌘F', 'Ctrl+F'],
    action: 'Find',
    detail: 'Opens seeded with whatever you had selected. Every match lights up at once.',
  },
  {
    keys: ['⌘G', 'F3'],
    action: 'Next match',
    detail: 'Hold ⇧ to walk backwards through the file.',
  },
  {
    keys: ['Esc'],
    action: 'Close find',
    detail: 'The caret stays on the match you stopped at, ready to type.',
  },
  {
    keys: ['⌘⌥F', 'Ctrl+H'],
    action: 'Replace',
    detail: 'Rewrites the Markdown source, so it opens the raw view to show you what changed.',
  },
]

const vaultFacts = [
  ['Pick a folder once', 'Wisp remembers it the next time you open the app.'],
  ['Folders first, then files', 'Both alphabetical — the order you would sort them by hand.'],
  ['Nested paths just work', 'Name a new file `journal/2026/june.md` and the folders get made.'],
  ['Right-click to rename or delete', 'Refresh and change folder sit in the sidebar toolbar.'],
]

const hidden = ['node_modules', '.git', '.DS_Store', '.obsidian', '.wisp-reminders.json']

const safety = [
  ['Context isolation is on', 'The page has no reach into Node.'],
  ['Node integration is off', 'Nothing in the renderer can require a module.'],
  ['One narrow bridge', 'Every read and write crosses a minimal IPC surface, and nothing else.'],
  ['Paths are checked', 'Traversal guards keep every operation inside the folder you picked.'],
]
</script>

<template>
  <div>
    <!-- ══ Hero ══════════════════════════════════════════════ -->
    <section class="hero">
      <div class="u-shell">
        <p class="hero-tag" :class="{ in: settled }">
          Markdown note editor · macOS · <span>MIT</span>
        </p>

        <h1 class="hero-h" :class="{ raw: derendered }" aria-label="Notes are just files.">
          <span class="mk" aria-hidden="true">#&nbsp;</span
          ><span aria-hidden="true">Notes are </span
          ><span class="mk" aria-hidden="true">**</span
          ><span class="bold" aria-hidden="true">just files</span
          ><span class="mk" aria-hidden="true">**</span
          ><span aria-hidden="true">.</span>
        </h1>

        <div class="hero-lede" :class="{ in: settled }">
          <p class="u-prose">
            Most editors tidy the Markdown away and hand you a rendering. Wisp leaves the marks where
            you typed them — plain source, monospaced, written straight back into the folder you
            opened.
          </p>

          <div class="hero-do">
            <CommandBlock
              label="macOS · Apple Silicon"
              :lines="[
                'brew tap oglimmer/wisp https://github.com/oglimmer/wisp',
                'brew install --cask wisp',
              ]"
            />
            <a class="hero-src" href="https://github.com/oglimmer/wisp" target="_blank" rel="noopener">
              Read the source →
            </a>
          </div>
        </div>
      </div>

      <div class="u-shell-wide hero-win" :class="{ in: settled }">
        <AppWindow />
      </div>
    </section>

    <!-- ══ Thesis ════════════════════════════════════════════ -->
    <section class="idea u-shell">
      <p class="u-eyebrow">The idea</p>
      <h2 class="u-display idea-h">The marks stay where you put them.</h2>
      <div class="idea-body">
        <p>
          Wisp assumes every text file in your folder is Markdown, and then does nothing about it.
          The hashes stay hashes. The asterisks stay asterisks. What you look at and what is on disk
          are the same characters in the same order, which means there is never a question about what
          you actually saved.
        </p>
        <p>
          That leaves an editor with very little in it: a tree on the left, text on the right, a save
          indicator, and find and replace. It opens fast, it stays out of the way, and the notes it
          makes are readable by anything else you will ever use.
        </p>
      </div>
    </section>

    <!-- ══ Editing ═══════════════════════════════════════════ -->
    <section id="editing" class="edit u-shell">
      <div class="edit-head">
        <p class="u-eyebrow">Editing</p>
        <h2 class="u-display edit-h">Find, step, replace.</h2>
        <p class="u-prose">
          The shortcuts are the ones your hands already know. Search seeds itself from your
          selection, matches stay highlighted while you work, and closing the bar leaves the caret
          exactly where you stopped.
        </p>
      </div>

      <FindDemo class="edit-demo" />

      <table class="keys">
        <caption class="sr-only">Keyboard shortcuts in Wisp</caption>
        <tbody>
          <tr v-for="s in shortcuts" :key="s.action">
            <td class="keys-k">
              <kbd v-for="k in s.keys" :key="k">{{ k }}</kbd>
            </td>
            <td class="keys-a">{{ s.action }}</td>
            <td class="keys-d">{{ s.detail }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ══ Vault ═════════════════════════════════════════════ -->
    <section id="vault" class="vault u-shell">
      <div class="vault-head">
        <p class="u-eyebrow">The vault</p>
        <h2 class="u-display vault-h">A folder is the whole format.</h2>
        <p class="u-prose">
          There is no library, no index and no import step. Point Wisp at a folder and it shows you
          what is in it. Point something else at the same folder and that works too.
        </p>
      </div>

      <dl class="vault-list">
        <div v-for="[term, def] in vaultFacts" :key="term">
          <dt>{{ term }}</dt>
          <dd v-html="def.replace(/`([^`]+)`/g, '<code>$1</code>')" />
        </div>
      </dl>

      <div class="vault-hidden">
        <p class="vault-hidden-l">Hidden from the tree by default</p>
        <ul>
          <li v-for="h in hidden" :key="h">{{ h }}</li>
          <li class="more">…and every other dot-prefixed entry</li>
        </ul>
      </div>
    </section>

    <!-- ══ Reminders ═════════════════════════════════════════ -->
    <section id="reminders" class="rem u-shell">
      <div class="rem-head">
        <p class="u-eyebrow">Reminders</p>
        <h2 class="u-display rem-h">The sidebar remembers for you.</h2>
        <p class="u-prose rem-lede">
          Notes accumulate things that have to happen on a date. Wisp keeps them in the lower half of
          the sidebar — soonest first, overdue ones marked — so they sit next to the notes they came
          from.
        </p>
      </div>

      <div class="rem-grid">
        <ul class="rem-facts">
          <li>Add one with <span class="u-code">＋</span>, or right-click any file in the tree.</li>
          <li>Repeat daily, weekly, monthly or yearly.</li>
          <li>Link a reminder to a note and open it from the alert.</li>
          <li>Drag the separator to give the list more room.</li>
          <li>
            Stored as plain JSON in <code>.wisp-reminders.json</code> at the vault root — readable,
            editable, and hidden from the tree.
          </li>
        </ul>

        <div class="rem-vis">
          <ReminderPopup />
        </div>
      </div>
    </section>

    <!-- ══ Security ══════════════════════════════════════════ -->
    <section class="safe u-shell">
      <div class="safe-head">
        <p class="u-eyebrow">Security</p>
        <h2 class="u-display safe-h">It only ever touches your vault.</h2>
      </div>
      <ul class="safe-list">
        <li v-for="[t, d] in safety" :key="t">
          <span class="safe-t">{{ t }}</span>
          <span class="safe-d">{{ d }}</span>
        </li>
      </ul>
    </section>

    <!-- ══ Install ═══════════════════════════════════════════ -->
    <section id="install" class="get u-shell">
      <div class="get-card">
        <p class="u-eyebrow">Install</p>
        <h2 class="u-display get-h">Two lines and it's yours.</h2>

        <CommandBlock
          label="macOS · Apple Silicon · signed and notarised"
          :lines="[
            'brew tap oglimmer/wisp https://github.com/oglimmer/wisp',
            'brew install --cask wisp',
          ]"
          class="get-cmd"
        />

        <p class="get-note">
          Apple Silicon is the only build published as a binary. On Intel macOS, Linux or Windows,
          run it from source — you need Node 18 or newer.
        </p>

        <CommandBlock
          label="From source"
          :lines="['git clone https://github.com/oglimmer/wisp.git', 'npm install', 'npm start']"
          class="get-cmd"
        />

        <p class="get-foot">
          MIT licensed. Issues and pull requests are welcome at
          <a href="https://github.com/oglimmer/wisp" target="_blank" rel="noopener">
            github.com/oglimmer/wisp</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* ══ Hero ════════════════════════════════════════════════ */

.hero {
  padding-top: clamp(3rem, 9vw, 6.5rem);
}

.hero-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--faint);
  margin-bottom: 1.6rem;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.6s ease 0.05s, transform 0.6s ease 0.05s;
}

.hero-tag span {
  color: var(--mark);
}

.hero-tag.in {
  opacity: 1;
  transform: none;
}

.hero-h {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(2.1rem, 7.2vw, 4.35rem);
  line-height: 1.06;
  letter-spacing: -0.055em;
  color: var(--ink);
  max-width: 16ch;
}

/* The marks: absent at first, then they grow back in. Animating font-size
   lets the glyphs push the line apart instead of popping into place. */
.hero-h .mk {
  display: inline-block;
  font-size: 0;
  opacity: 0;
  color: var(--mark);
  font-weight: 400;
  transition: font-size 0.62s cubic-bezier(0.22, 0.68, 0.24, 1), opacity 0.5s ease 0.06s;
}

.hero-h.raw .mk {
  font-size: 1em;
  opacity: 0.92;
}

.hero-h .bold {
  font-weight: 700;
  transition: font-weight 0.62s cubic-bezier(0.22, 0.68, 0.24, 1);
}

.hero-h.raw .bold {
  font-weight: 500;
}

.hero-lede {
  margin-top: 1.9rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.hero-lede.in {
  opacity: 1;
  transform: none;
}

.hero-do {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.1rem 1.6rem;
}

.hero-do > :first-child {
  width: min(34rem, 100%);
}

.hero-src {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--muted);
  text-decoration: none;
}

.hero-src:hover {
  color: var(--mark-deep);
}

.hero-win {
  margin-top: clamp(3rem, 7vw, 5rem);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s;
}

.hero-win.in {
  opacity: 1;
  transform: none;
}

/* ══ Thesis ══════════════════════════════════════════════ */

.idea {
  padding-top: clamp(4.5rem, 11vw, 8rem);
}

.idea-h {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  margin-top: 0.85rem;
  max-width: 18ch;
}

.idea-body {
  margin-top: 1.6rem;
  display: grid;
  gap: 1.1rem;
  max-width: 42rem;
  color: var(--muted);
  border-left: 2px solid var(--mark);
  padding-left: clamp(1rem, 3vw, 1.9rem);
}

/* ══ Editing ═════════════════════════════════════════════ */

.edit {
  padding-top: clamp(4.5rem, 11vw, 8rem);
}

.edit-h {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  margin: 0.85rem 0 1.1rem;
}

.edit-demo {
  margin-top: 2.2rem;
  max-width: 46rem;
}

.keys {
  margin-top: 2.4rem;
  width: 100%;
  max-width: 52rem;
  border-collapse: collapse;
  text-align: left;
}

.keys tr {
  border-top: 1px solid var(--rule-soft);
}

.keys tr:last-child {
  border-bottom: 1px solid var(--rule-soft);
}

.keys td {
  padding: 0.9rem 1rem 0.9rem 0;
  vertical-align: baseline;
}

.keys-k {
  white-space: nowrap;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.keys-a {
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  font-size: 0.9375rem;
}

.keys-d {
  color: var(--muted);
  font-size: 0.9375rem;
  padding-right: 0 !important;
}

/* ══ Vault ═══════════════════════════════════════════════ */

.vault {
  padding-top: clamp(4.5rem, 11vw, 8rem);
}

.vault-h {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  margin: 0.85rem 0 1.1rem;
}

.vault-list {
  margin-top: 2.2rem;
  display: grid;
  gap: 1.4rem 2.5rem;
  max-width: 52rem;
}

.vault-list dt {
  font-weight: 600;
  color: var(--ink);
  font-size: 0.9375rem;
  margin-bottom: 0.2rem;
}

.vault-list dd {
  margin: 0;
  color: var(--muted);
  font-size: 0.9375rem;
}

.vault-hidden {
  margin-top: 2.6rem;
  padding: 1.1rem 1.25rem;
  background: var(--surface-sunk);
  border: 1px solid var(--rule-soft);
  border-radius: 9px;
  max-width: 52rem;
}

.vault-hidden-l {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 0.7rem;
}

.vault-hidden ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.vault-hidden li {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
  background: var(--surface);
  border: 1px solid var(--rule-soft);
  padding: 0.18rem 0.5rem;
  border-radius: 5px;
}

.vault-hidden li.more {
  background: none;
  border-color: transparent;
  color: var(--faint);
}

/* ══ Reminders ═══════════════════════════════════════════ */

.rem {
  padding-top: clamp(4.5rem, 11vw, 8rem);
}

.rem-h {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  margin: 0.85rem 0 1.1rem;
}

.rem-grid {
  margin-top: 2.4rem;
  display: grid;
  gap: 2.5rem;
  align-items: start;
}

.rem-facts {
  display: grid;
  gap: 0.7rem;
  max-width: var(--measure);
}

.rem-facts li {
  position: relative;
  padding-left: 1.35rem;
  color: var(--muted);
  font-size: 0.9375rem;
}

.rem-facts li::before {
  content: '-';
  position: absolute;
  left: 0;
  font-family: var(--font-mono);
  color: var(--ember);
}

/* ══ Security ════════════════════════════════════════════ */

.safe {
  padding-top: clamp(4.5rem, 11vw, 8rem);
}

.safe-h {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  margin-top: 0.85rem;
}

.safe-list {
  margin-top: 2rem;
  display: grid;
  gap: 0;
  max-width: 52rem;
}

.safe-list li {
  display: grid;
  gap: 0.15rem 2rem;
  padding: 1rem 0;
  border-top: 1px solid var(--rule-soft);
}

.safe-list li:last-child {
  border-bottom: 1px solid var(--rule-soft);
}

.safe-t {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink);
}

.safe-d {
  color: var(--muted);
  font-size: 0.9375rem;
}

/* ══ Install ═════════════════════════════════════════════ */

.get {
  padding-top: clamp(4.5rem, 11vw, 8rem);
}

.get-card {
  background: var(--surface);
  border: 1px solid var(--rule-soft);
  border-radius: 14px;
  padding: clamp(1.5rem, 5vw, 3rem);
  max-width: 46rem;
  margin-inline: auto;
  box-shadow: var(--shadow-lift);
}

.get-h {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  margin: 0.85rem 0 1.8rem;
}

.get-cmd {
  background: var(--surface-sunk) !important;
}

.get-note {
  margin: 1.5rem 0;
  color: var(--muted);
  font-size: 0.9375rem;
  max-width: 38rem;
}

.get-foot {
  margin-top: 1.8rem;
  padding-top: 1.3rem;
  border-top: 1px solid var(--rule-soft);
  font-size: 0.875rem;
  color: var(--muted);
}

/* ══ Wider viewports ═════════════════════════════════════ */

@media (min-width: 40rem) {
  .vault-list {
    grid-template-columns: 1fr 1fr;
  }

  .safe-list li {
    grid-template-columns: 15rem 1fr;
    align-items: baseline;
  }
}

@media (min-width: 58rem) {
  .rem-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 23rem);
    gap: 3rem;
  }
}
</style>
