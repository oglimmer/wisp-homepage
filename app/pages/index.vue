<script setup lang="ts">
/**
 * The hero headline arrives looking rendered, then de-renders: the Markdown
 * marks grow back in and the bold drains out, leaving the source. It is the
 * product's second argument — whatever Claude writes, it writes as plain text.
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

const smartFacts = [
  [
    'Check, then Add',
    'Check shows the plan — target file, new or existing, one line on why, and a diff of the change. Nothing reaches disk until you press Add.',
  ],
  [
    'It reads the whole vault',
    'Your notes go along with the request, so the usual filing or answer comes back in a single pass instead of a crawl through the folder.',
  ],
  [
    'It edits, it does not append',
    'An existing note is rewritten around your addition, under the right heading and in the formatting already there.',
  ],
  [
    'Answers name their sources',
    'Every file an answer drew on is listed with what it contributed, and clicking one opens it.',
  ],
  [
    'Only your notes',
    'Lookup is told to answer from the vault and nothing else — and to say plainly when the notes do not have it.',
  ],
  [
    'Lookup never writes',
    'It is a read path by construction. The handler behind it has no way to touch a file.',
  ],
]

const imageFacts = [
  'The description is ordinary text in the note, so find, grep and Lookup all see it.',
  'It sits in a collapsed block, so the note still reads as a note.',
  'Drop several at once and they are described in parallel while you keep typing.',
  'PNG, JPEG, GIF and WebP are analysed. Anything else imports as usual, just undescribed.',
]

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
  ['No index, no database', 'Claude reads the folder itself, so there is nothing to build or resync.'],
  ['Nested paths just work', 'Name a new file `journal/2026/june.md` and the folders get made.'],
  ['Everything else still works', 'Point another editor at the same folder and nothing objects.'],
]

const hidden = ['node_modules', '.git', '.DS_Store', '.obsidian', '.wisp-reminders.json']

const safety = [
  ['Nothing is written unreviewed', 'Check shows the whole diff. Add is the only thing that writes.'],
  [
    'Claude stays in your vault',
    'It runs with your folder as its working directory and read-only tools, and a target path outside the folder is refused.',
  ],
  [
    'A bad reminder is dropped',
    'Anything malformed, or dated in the past, is discarded rather than shown. A wrong alarm is worse than none.',
  ],
  [
    'It is your Claude',
    'Wisp shells out to the CLI on your own machine, under your own account. The app itself opens no connection at all.',
  ],
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
          AI note editor · macOS · <span>MIT</span>
        </p>

        <h1 class="hero-h" :class="{ raw: derendered }" aria-label="Notes that file themselves.">
          <span class="mk" aria-hidden="true">#&nbsp;</span
          ><span aria-hidden="true">Notes that </span
          ><span class="mk" aria-hidden="true">**</span
          ><span class="bold" aria-hidden="true">file </span
          ><!-- The closing marks ride along with the last word: a line that
               begins with `**.` is not a line worth having. --><span
            class="nb"
            aria-hidden="true"
          ><span class="bold">themselves</span><span class="mk">**</span>.</span>
        </h1>

        <div class="hero-lede" :class="{ in: settled }">
          <p class="u-prose">
            Wisp is a Markdown editor with Claude wired into it. Type a thought into the box at the
            top and Claude reads your notes, works out which one it belongs in and where inside it,
            and shows you the exact edit before anything is written. Ask a question instead and it
            answers from those same notes, citing every file it read.
          </p>
          <p class="u-prose hero-lede-2">
            What it writes is plain Markdown in the folder you opened — the same characters you would
            have typed, still readable by everything else you own.
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

          <p class="hero-req">
            Needs Anthropic's <code>claude</code> CLI installed — that is what does the thinking.
          </p>
        </div>
      </div>

      <div class="u-shell-wide hero-win" :class="{ in: settled }">
        <AppWindow />
      </div>
    </section>

    <!-- ══ Thesis ════════════════════════════════════════════ -->
    <section class="idea u-shell">
      <p class="u-eyebrow">The idea</p>
      <h2 class="u-display idea-h">An assistant that writes files, not a database.</h2>
      <div class="idea-body">
        <p>
          The usual price for this much automation is a store you cannot read: an index, a sync
          service, a format that only exists inside one app. Wisp pays the other price. Claude reads
          the folder you pointed it at and writes back into it, and what lands on disk is Markdown
          you could have typed yourself — the hashes stay hashes, the asterisks stay asterisks.
        </p>
        <p>
          That is also what keeps the AI honest. Every filing is a diff you approve, every answer
          names the notes it came from, and if you delete the app tomorrow, what is left behind is a
          folder of text files.
        </p>
      </div>
    </section>

    <!-- ══ Claude ════════════════════════════════════════════ -->
    <section id="claude" class="ai u-shell">
      <div class="ai-head">
        <p class="u-eyebrow">Claude</p>
        <h2 class="u-display ai-h">One box, both directions.</h2>
        <p class="u-prose">
          The panel above the editor takes whatever you type. <strong>Add</strong> files it into the
          vault. <strong>Lookup</strong> answers it from the vault. Same box, opposite directions —
          so you never have to know where a note lives to put something in it or get something out.
        </p>
      </div>

      <SmartDemo class="ai-demo" />

      <dl class="facts">
        <div v-for="[term, def] in smartFacts" :key="term">
          <dt>{{ term }}</dt>
          <dd>{{ def }}</dd>
        </div>
      </dl>
    </section>

    <!-- ══ Images ════════════════════════════════════════════ -->
    <section id="images" class="img u-shell">
      <div class="img-head">
        <p class="u-eyebrow">Images</p>
        <h2 class="u-display img-h">A picture becomes text you can search.</h2>
        <p class="u-prose">
          Drop a screenshot into a note and it is copied into the vault and referenced immediately.
          Then Claude looks at it and writes down what is actually there — the kind of image, its
          key elements, and any text or numbers it can read off — into the note itself.
        </p>
      </div>

      <ImageNote class="img-demo" />

      <ul class="img-facts">
        <li v-for="f in imageFacts" :key="f">{{ f }}</li>
      </ul>
    </section>

    <!-- ══ Reminders ═════════════════════════════════════════ -->
    <section id="reminders" class="rem u-shell">
      <div class="rem-head">
        <p class="u-eyebrow">Reminders</p>
        <h2 class="u-display rem-h">Dates in a note become dates in the sidebar.</h2>
        <p class="u-prose rem-lede">
          File a note that commits you to something and Claude proposes a reminder with it —
          "before the 12th" resolved against today into an actual date and time. It arrives as part
          of the plan, so you see it before you accept it.
        </p>
      </div>

      <div class="rem-grid">
        <ul class="rem-facts">
          <li>Only for real commitments — a deadline, a booking, a "don't forget". Facts and ideas get nothing.</li>
          <li>Add one by hand with <span class="u-code">＋</span>, or right-click any file in the tree.</li>
          <li>Repeat daily, weekly, monthly or yearly.</li>
          <li>Link a reminder to a note and open it straight from the alert.</li>
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

    <!-- ══ Editing ═══════════════════════════════════════════ -->
    <section id="editing" class="edit u-shell">
      <div class="edit-head">
        <p class="u-eyebrow">Editing</p>
        <h2 class="u-display edit-h">Find, step, replace.</h2>
        <p class="u-prose">
          Under the AI it is still a text editor, and the shortcuts are the ones your hands already
          know. Search seeds itself from your selection, matches stay highlighted while you work,
          and closing the bar leaves the caret exactly where you stopped.
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
          There is no library and no import step. Point Wisp at a folder and it shows you what is in
          it — and that folder is exactly what Claude is given to read and write.
        </p>
      </div>

      <dl class="facts">
        <div v-for="[term, def] in vaultFacts" :key="term">
          <dt>{{ term }}</dt>
          <dd v-html="def.replace(/`([^`]+)`/g, '<code>$1</code>')" />
        </div>
      </dl>

      <div class="vault-hidden">
        <p class="vault-hidden-l">Hidden from the tree — and from Claude</p>
        <ul>
          <li v-for="h in hidden" :key="h">{{ h }}</li>
          <li class="more">…and every other dot-prefixed entry</li>
        </ul>
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

        <div class="get-req">
          <p class="get-req-l">One prerequisite</p>
          <p>
            Filing, Lookup and image descriptions all run Anthropic's <code>claude</code> CLI, so it
            has to be installed and signed in. Wisp looks for it on your <code>PATH</code> and in
            the usual install locations:
          </p>
          <ul class="get-paths">
            <li v-for="p in ['/opt/homebrew/bin', '/usr/local/bin', '~/.local/bin', '~/.claude/local']" :key="p">
              {{ p }}
            </li>
          </ul>
          <p>
            Without it the editor still opens, saves, searches and reminds — it simply cannot think.
            And when you do use those features, the notes involved go to Claude through that CLI, on
            your own account. Wisp itself talks to nothing.
          </p>
        </div>

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
  font-size: clamp(1.85rem, 7vw, 4.35rem);
  line-height: 1.06;
  letter-spacing: -0.055em;
  color: var(--ink);
  max-width: 21ch;
}

.hero-h .nb {
  white-space: nowrap;
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

.hero-lede-2 {
  margin-top: 0.9rem;
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

.hero-req {
  margin-top: 1rem;
  font-size: 0.8125rem;
  color: var(--faint);
  max-width: 34rem;
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
  max-width: 20ch;
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

/* ══ Shared: two-column definition lists ═════════════════ */

.facts {
  margin-top: 2.2rem;
  display: grid;
  gap: 1.4rem 2.5rem;
  max-width: 52rem;
}

.facts dt {
  font-weight: 600;
  color: var(--ink);
  font-size: 0.9375rem;
  margin-bottom: 0.2rem;
}

.facts dd {
  margin: 0;
  color: var(--muted);
  font-size: 0.9375rem;
}

/* ══ Claude ══════════════════════════════════════════════ */

.ai {
  padding-top: clamp(4.5rem, 11vw, 8rem);
}

.ai-h {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  margin: 0.85rem 0 1.1rem;
}

.ai-demo {
  margin-top: 2.2rem;
  max-width: 46rem;
}

/* ══ Images ══════════════════════════════════════════════ */

.img {
  padding-top: clamp(4.5rem, 11vw, 8rem);
}

.img-h {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  margin: 0.85rem 0 1.1rem;
}

.img-demo {
  margin-top: 2.2rem;
  max-width: 52rem;
}

.img-facts {
  margin-top: 2rem;
  display: grid;
  gap: 0.7rem;
  max-width: 44rem;
}

.img-facts li {
  position: relative;
  padding-left: 1.35rem;
  color: var(--muted);
  font-size: 0.9375rem;
}

.img-facts li::before {
  content: '-';
  position: absolute;
  left: 0;
  font-family: var(--font-mono);
  color: var(--mark);
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

.get-req {
  margin-top: 1.5rem;
  padding: 1rem 1.15rem;
  border-radius: 9px;
  background: var(--mark-wash);
  display: grid;
  gap: 0.65rem;
  font-size: 0.875rem;
  color: var(--ink-soft);
}

.get-req-l {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--mark-deep);
}

.get-req code {
  background: color-mix(in srgb, var(--surface) 70%, transparent);
}

.get-paths {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.get-paths li {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--mark-deep);
  background: color-mix(in srgb, var(--surface) 70%, transparent);
  padding: 0.16rem 0.45rem;
  border-radius: 4px;
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
  .facts {
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
