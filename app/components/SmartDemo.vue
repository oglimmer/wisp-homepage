<script setup lang="ts">
/**
 * The panel at the top of Wisp's editor pane. One box, two directions:
 * Add files what you typed into the vault, Lookup answers from it. The demo's
 * controls are the app's own buttons — pressing one shows what it would return.
 */
const mode = ref<'file' | 'ask'>('file')

const text = computed(() =>
  mode.value === 'file'
    ? 'ring the dentist about the crown, has to happen before the 12th'
    : 'what did I promise Marta, and when?',
)

const status = computed(() =>
  mode.value === 'file' ? 'Checked · nothing written yet' : 'Answered from 2 notes',
)

/** The collapsed line diff Check puts on screen before anything touches disk. */
const diff: [' ' | '+', string][] = [
  [' ', '## Appointments'],
  [' ', ''],
  [' ', '- Optician — new lenses ordered, collect any time'],
  ['+', '- Dentist — ring about the crown, before the 12th'],
  [' ', ''],
  [' ', '## Repeat prescriptions'],
]

const sources: [string, string][] = [
  ['inbox.md', 'the open reply to Marta and its deadline'],
  ['journal/2026-07-21.md', 'the layout decision you said you would write up'],
]
</script>

<template>
  <figure class="demo">
    <!-- ── The box you type into ── -->
    <div class="box">
      <p class="typed">{{ text }}<i class="caret" aria-hidden="true" /></p>
    </div>

    <div class="bar">
      <button
        type="button"
        :class="{ on: mode === 'file' }"
        :aria-pressed="mode === 'file'"
        @click="mode = 'file'"
      >
        Check
      </button>
      <button type="button" class="add" @click="mode = 'file'">Add</button>
      <span class="status">{{ status }}</span>
      <button
        type="button"
        :class="{ on: mode === 'ask' }"
        :aria-pressed="mode === 'ask'"
        @click="mode = 'ask'"
      >
        Lookup
      </button>
    </div>

    <!-- ── What comes back ── -->
    <div class="out" aria-live="polite">
      <template v-if="mode === 'file'">
        <p class="head">
          <span class="badge">EXISTING</span>
          <span class="target">health.md</span>
        </p>
        <p class="why">Appointments to make already live under that heading in this file.</p>

        <div class="rem">
          <span class="rem-l">Reminder</span>
          <span class="rem-t">Ring the dentist</span>
          <span class="rem-w">11 Aug · 09:00 · once</span>
        </div>

        <pre class="diff"><code><span
          v-for="([kind, line], i) in diff"
          :key="i"
          class="dl"
          :class="{ add: kind === '+' }"
        ><i class="gut" aria-hidden="true">{{ kind }}</i>{{ line || ' ' }}</span></code></pre>
      </template>

      <template v-else>
        <p class="answer">
          You owe Marta a reply about the vault layout — <code>inbox.md</code> still has it open,
          due Friday at 17:00. The decision itself is in the 21 July entry: folders first, then
          files, both alphabetical.
        </p>
        <p class="src-l">Read from</p>
        <ul class="src">
          <li v-for="[file, detail] in sources" :key="file">
            <span class="src-f">{{ file }}</span>
            <span class="src-d">{{ detail }}</span>
          </li>
        </ul>
      </template>
    </div>

    <figcaption>
      Check and Add file the note; Lookup answers from the vault and writes nothing.
    </figcaption>
  </figure>
</template>

<style scoped>
.demo {
  margin: 0;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 10px;
  box-shadow: var(--shadow-lift);
  overflow: hidden;
}

/* ── Input ── */
.box {
  padding: 0.9rem 1.1rem 0.8rem;
}

.typed {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.6;
  color: var(--ink-soft);
}

.caret {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--mark);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* ── Button bar ── */
.bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.7rem;
  background: var(--surface-sunk);
  border-top: 1px solid var(--rule-soft);
  border-bottom: 1px solid var(--rule-soft);
}

.bar button {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.28rem 0.62rem;
  border: 1px solid var(--rule);
  background: var(--surface);
  color: var(--muted);
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.bar button:hover {
  color: var(--ink);
  border-color: var(--faint);
}

.bar button.on {
  background: var(--mark-wash);
  border-color: color-mix(in srgb, var(--mark) 40%, var(--rule));
  color: var(--mark-deep);
}

.bar button.add {
  border-color: color-mix(in srgb, var(--mark) 30%, var(--rule));
}

.status {
  flex: 1;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--faint);
  text-align: center;
}

/* ── Output ── */
.out {
  padding: 0.95rem 1.1rem 1.05rem;
}

.head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.badge {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: var(--muted);
  background: var(--fog-deep);
  border-radius: 3px;
  padding: 0.1rem 0.34rem;
}

.target {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--mark-deep);
}

.why {
  margin-top: 0.35rem;
  font-size: 0.8125rem;
  color: var(--muted);
}

/* The reminder Claude proposes when the note carries a date */
.rem {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 0.6rem;
  padding: 0.5rem 0.65rem;
  background: var(--ember-wash);
  box-shadow: inset 2px 0 0 var(--ember);
  border-radius: 5px;
}

.rem-l {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ember);
}

.rem-t {
  font-size: 0.8125rem;
  color: var(--ink-soft);
}

.rem-w {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--ember);
  margin-left: auto;
}

.diff {
  margin: 0.85rem 0 0;
  padding: 0.7rem 0;
  overflow-x: auto;
  background: var(--surface-sunk);
  border: 1px solid var(--rule-soft);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.75;
  color: var(--muted);
}

.diff code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
  display: block;
}

.dl {
  display: block;
  white-space: pre;
  padding-right: 0.8rem;
}

.gut {
  display: inline-block;
  width: 1.6em;
  padding-left: 0.6rem;
  font-style: normal;
  color: var(--faint);
}

.dl.add {
  background: var(--mark-wash);
  color: var(--ink-soft);
}

.dl.add .gut {
  color: var(--mark);
}

/* ── Lookup ── */
.answer {
  font-size: 0.9375rem;
  color: var(--ink-soft);
  max-width: 44ch;
}

.src-l {
  margin-top: 0.95rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--faint);
}

.src {
  margin-top: 0.4rem;
  display: grid;
  gap: 0.3rem;
}

.src li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.2rem 0.6rem;
}

.src-f {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--mark-deep);
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, var(--mark) 30%, transparent);
  text-underline-offset: 0.2em;
}

.src-d {
  font-size: 0.8125rem;
  color: var(--muted);
}

figcaption {
  padding: 0.55rem 1.15rem 0.75rem;
  border-top: 1px solid var(--rule-soft);
  font-size: 0.78rem;
  color: var(--faint);
}
</style>
