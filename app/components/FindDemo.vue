<script setup lang="ts">
const term = 'vault'

const lines = [
  '# Vault notes',
  '',
  'The vault is just a folder. Wisp opens the vault you',
  'picked and writes back into it — no vault database,',
  'no vault index, nothing beside your files.',
  '',
  '- [ ] Document the vault layout',
]

const counts = lines.map((l) => (l.match(new RegExp(term, 'gi')) || []).length)
const total = counts.reduce((a, b) => a + b, 0)
const offsets = counts.reduce<number[]>((acc, c, i) => {
  acc[i] = i === 0 ? 0 : acc[i - 1]! + counts[i - 1]!
  return acc
}, [])

const live = ref(2)

const rendered = computed(() =>
  lines.map((l, i) => mdSourceWithHits(l, term, live.value, offsets[i]!)),
)

function step(dir: number) {
  live.value = (live.value + dir + total) % total
}
</script>

<template>
  <figure class="find">
    <div class="bar">
      <span class="lbl">Find</span>
      <span class="field">{{ term }}<i class="caret" aria-hidden="true" /></span>
      <span class="count">{{ live + 1 }} of {{ total }}</span>
      <span class="steps">
        <button type="button" aria-label="Previous match" @click="step(-1)">↑</button>
        <button type="button" aria-label="Next match" @click="step(1)">↓</button>
      </span>
      <kbd class="esc">Esc</kbd>
    </div>

    <pre class="body"><code><span
      v-for="(html, i) in rendered"
      :key="i"
      class="line"
      v-html="html || '&nbsp;'"
    /></code></pre>
    <figcaption>Every match stays highlighted. Stepping never loses your place.</figcaption>
  </figure>
</template>

<style scoped>
.find {
  margin: 0;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 10px;
  box-shadow: var(--shadow-lift);
  overflow: hidden;
}

.bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.7rem;
  background: var(--surface-sunk);
  border-bottom: 1px solid var(--rule-soft);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.lbl {
  color: var(--faint);
}

.field {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  color: var(--ink-soft);
}

.caret {
  display: inline-block;
  width: 1px;
  height: 1em;
  margin-left: 1px;
  background: var(--mark);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.count {
  color: var(--muted);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.steps {
  display: flex;
  gap: 2px;
}

.steps button {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border: 1px solid var(--rule);
  background: var(--surface);
  border-radius: 4px;
  cursor: pointer;
  color: var(--muted);
  font-size: 0.7rem;
  line-height: 1;
}

.steps button:hover {
  background: var(--mark-wash);
  color: var(--mark-deep);
  border-color: color-mix(in srgb, var(--mark) 40%, var(--rule));
}

.esc {
  font-size: 0.68rem;
}

.body {
  margin: 0;
  padding: 1rem 1.15rem;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.85;
  color: var(--ink-soft);
}

.body code {
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

figcaption {
  padding: 0.55rem 1.15rem 0.75rem;
  border-top: 1px solid var(--rule-soft);
  font-size: 0.78rem;
  color: var(--faint);
}
</style>
