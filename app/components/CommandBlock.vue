<script setup lang="ts">
const props = defineProps<{ lines: string[]; label?: string }>()

const state = ref<'idle' | 'copied' | 'failed'>('idle')
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.lines.join('\n'))
    state.value = 'copied'
  } catch {
    state.value = 'failed'
  }
  clearTimeout(timer)
  timer = setTimeout(() => (state.value = 'idle'), 2200)
}

onBeforeUnmount(() => clearTimeout(timer))

const buttonText = computed(() =>
  state.value === 'copied' ? 'Copied' : state.value === 'failed' ? 'Press ⌘C' : 'Copy',
)
</script>

<template>
  <div class="cmd">
    <span v-if="label" class="tag">{{ label }}</span>
    <pre><code><span v-for="(l, i) in lines" :key="i" class="ln"><i aria-hidden="true">$</i>{{ l }}</span></code></pre>
    <button type="button" class="copy" :class="{ done: state === 'copied' }" @click="copy">
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped>
.cmd {
  position: relative;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 9px;
  box-shadow: var(--shadow-lift);
  padding: 0.9rem 1rem;
}

.tag {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 0.55rem;
}

pre {
  margin: 0;
  overflow-x: auto;
  padding-right: 4.5rem;
}

code {
  background: none;
  padding: 0;
  display: block;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.95;
  color: var(--ink-soft);
}

.ln {
  display: block;
  white-space: pre;
}

.ln i {
  color: var(--mark);
  font-style: normal;
  user-select: none;
  margin-right: 0.75ch;
}

.copy {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  border: 1px solid var(--rule);
  background: var(--surface-sunk);
  border-radius: 6px;
  padding: 0.28rem 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--muted);
  cursor: pointer;
  transition: background 0.16s ease, color 0.16s ease, border-color 0.16s ease;
}

.copy:hover {
  background: var(--mark-wash);
  color: var(--mark-deep);
  border-color: color-mix(in srgb, var(--mark) 40%, var(--rule));
}

.copy.done {
  background: var(--mark);
  border-color: var(--mark);
  color: #fff;
}
</style>
