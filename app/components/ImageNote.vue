<script setup lang="ts">
/**
 * What an imported image looks like in the note's source, before and after
 * Claude has looked at it. The reference goes in the instant you drop the file;
 * the alt text and the description block are folded in when the analysis lands.
 */
const described = ref(true)

const dropped = ['![q3-revenue.png](images/q3-revenue.png)']

const analysed = [
  '![a bar chart of Q3 revenue by region](images/q3-revenue.png)',
  '',
  '<details>',
  '<summary>Image description</summary>',
  // One unbroken line, the way the app writes it — the block has to stay a
  // single HTML block or Markdown reopens inside it.
  'A bar chart titled "Q3 revenue by region" with four bars: North 412k, South 388k, East 274k and West 501k. A dashed line at 400k is labelled "target"; only North and West clear it, and West is the tallest bar on the chart.',
  '</details>',
]

const lines = computed(() => (described.value ? analysed : dropped))

const bars = [
  { label: 'N', value: 412 },
  { label: 'S', value: 388 },
  { label: 'E', value: 274 },
  { label: 'W', value: 501 },
]

// Plot area: baseline at y=110, 100px tall, 600k full scale.
const y = (v: number) => 110 - (v / 600) * 100
</script>

<template>
  <figure class="shot">
    <div class="grid">
      <!-- The picture itself: what Claude was handed -->
      <div class="pic">
        <svg viewBox="0 0 200 134" role="img" aria-label="A bar chart of Q3 revenue by region">
          <line x1="18" y1="8" x2="18" y2="110" stroke="var(--rule)" stroke-width="1" />
          <line x1="18" y1="110" x2="188" y2="110" stroke="var(--rule)" stroke-width="1" />
          <line
            x1="18"
            :y1="y(400)"
            x2="188"
            :y2="y(400)"
            stroke="var(--ember)"
            stroke-width="1"
            stroke-dasharray="3 3"
          />
          <g v-for="(b, i) in bars" :key="b.label">
            <rect
              :x="30 + i * 40"
              :y="y(b.value)"
              width="26"
              :height="110 - y(b.value)"
              rx="1.5"
              fill="var(--mark)"
              opacity="0.82"
            />
            <text :x="43 + i * 40" y="124" text-anchor="middle" class="lab">{{ b.label }}</text>
          </g>
          <text x="21" :y="y(400) - 5" class="lab cap">target 400k</text>
        </svg>
      </div>

      <!-- The note's raw source -->
      <div class="src">
        <div class="tabs" role="group" aria-label="Note source, before and after analysis">
          <button
            type="button"
            :class="{ on: !described }"
            :aria-pressed="!described"
            @click="described = false"
          >
            On drop
          </button>
          <button
            type="button"
            :class="{ on: described }"
            :aria-pressed="described"
            @click="described = true"
          >
            A few seconds later
          </button>
        </div>

        <pre class="code"><code><span
          v-for="(line, i) in lines"
          :key="i"
          class="line"
          v-html="mdSource(line) || '&nbsp;'"
        /></code></pre>
      </div>
    </div>

    <figcaption>
      The reference is inserted the moment you drop the file, so nothing stalls. The alt text and
      the description arrive a few seconds later, as plain text in the note.
    </figcaption>
  </figure>
</template>

<style scoped>
.shot {
  margin: 0;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 10px;
  box-shadow: var(--shadow-lift);
  overflow: hidden;
}

.grid {
  display: grid;
}

/* ── Chart ── */
.pic {
  display: grid;
  place-items: center;
  padding: 1.1rem;
  background: var(--surface-sunk);
  border-bottom: 1px solid var(--rule-soft);
}

.pic svg {
  width: 100%;
  max-width: 15rem;
  height: auto;
}

.lab {
  font-family: var(--font-mono);
  font-size: 8px;
  fill: var(--faint);
}

.cap {
  fill: var(--ember);
  text-anchor: start;
}

/* ── Source ── */
.src {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tabs {
  display: flex;
  gap: 0.35rem;
  padding: 0.55rem 0.8rem;
  border-bottom: 1px solid var(--rule-soft);
}

.tabs button {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 0.24rem 0.55rem;
  border: 1px solid transparent;
  background: transparent;
  color: var(--faint);
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.tabs button:hover {
  color: var(--ink-soft);
}

.tabs button.on {
  background: var(--mark-wash);
  border-color: color-mix(in srgb, var(--mark) 32%, transparent);
  color: var(--mark-deep);
}

.code {
  margin: 0;
  flex: 1;
  padding: 0.9rem 1.05rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.8;
  color: var(--ink-soft);
}

.code code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
  display: block;
}

.line {
  display: block;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

figcaption {
  padding: 0.55rem 1.15rem 0.75rem;
  border-top: 1px solid var(--rule-soft);
  font-size: 0.78rem;
  color: var(--faint);
}

@media (min-width: 44rem) {
  .grid {
    grid-template-columns: 16rem minmax(0, 1fr);
  }

  .pic {
    border-bottom: 0;
    border-right: 1px solid var(--rule-soft);
  }
}
</style>
