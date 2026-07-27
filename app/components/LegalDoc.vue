<script setup lang="ts">
defineProps<{ title: string; standfirst?: string; updated?: string }>()
</script>

<template>
  <article class="doc u-shell">
    <header class="doc-head">
      <p class="u-eyebrow">Legal</p>
      <h1 class="u-display doc-h">{{ title }}</h1>
      <p v-if="standfirst" class="doc-sub">{{ standfirst }}</p>
      <p v-if="updated" class="doc-date">Last updated: {{ updated }}</p>
    </header>

    <div class="doc-body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.doc {
  padding-top: clamp(2.5rem, 7vw, 4.5rem);
  max-width: 48rem;
}

.doc-h {
  font-size: clamp(1.7rem, 4.5vw, 2.6rem);
  margin-top: 0.8rem;
}

.doc-sub {
  margin-top: 0.85rem;
  color: var(--muted);
  max-width: 36rem;
}

.doc-date {
  margin-top: 0.9rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--faint);
}

.doc-body {
  margin-top: 2.5rem;
  background: var(--surface);
  border: 1px solid var(--rule-soft);
  border-radius: 12px;
  padding: clamp(1.4rem, 4.5vw, 2.5rem);
  box-shadow: var(--shadow-lift);
}

/* Deep selectors: the slotted content is plain markup from each page. */
.doc-body :deep(section) {
  padding-top: 1.9rem;
  margin-top: 1.9rem;
  border-top: 1px solid var(--rule-soft);
}

.doc-body :deep(section:first-child) {
  padding-top: 0;
  margin-top: 0;
  border-top: 0;
}

.doc-body :deep(h2) {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--ink);
  margin-bottom: 0.9rem;
}

.doc-body :deep(h2 span) {
  color: var(--mark);
  margin-right: 0.5em;
}

.doc-body :deep(p) {
  color: var(--muted);
  font-size: 0.9375rem;
  line-height: 1.68;
}

.doc-body :deep(p + p) {
  margin-top: 0.8rem;
}

.doc-body :deep(ul) {
  margin-top: 0.85rem;
  display: grid;
  gap: 0.55rem;
}

.doc-body :deep(li) {
  position: relative;
  padding-left: 1.3rem;
  color: var(--muted);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.doc-body :deep(li)::before {
  content: '-';
  position: absolute;
  left: 0;
  font-family: var(--font-mono);
  color: var(--mark);
}

.doc-body :deep(li strong),
.doc-body :deep(p strong) {
  color: var(--ink-soft);
  font-weight: 600;
}

.doc-body :deep(.lead) {
  color: var(--ink-soft);
  font-size: 1rem;
}

.doc-body :deep(.addr) {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.8;
  color: var(--ink-soft);
}

.doc-body :deep(.fine) {
  font-size: 0.8125rem;
  color: var(--faint);
  margin-top: 0.7rem;
}
</style>
