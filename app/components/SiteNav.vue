<script setup lang="ts">
const appIcon = publicAsset('icons/icon-64.png')

const links = [
  { label: 'Claude', to: '/#claude' },
  { label: 'Images', to: '/#images' },
  { label: 'Reminders', to: '/#reminders' },
  { label: 'Editing', to: '/#editing' },
]
</script>

<template>
  <header class="bar">
    <div class="u-shell inner">
      <NuxtLink to="/" class="wordmark">
        <img class="icon" :src="appIcon" width="26" height="26" alt="">
        <!-- The page is a Markdown document; this is its h1. -->
        <span class="hash" aria-hidden="true">#</span>
        <span>wisp</span>
      </NuxtLink>

      <nav class="nav" aria-label="Sections">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="nav-link">{{ l.label }}</NuxtLink>
      </nav>

      <div class="right">
        <a
          class="ghost"
          href="https://github.com/oglimmer/wisp"
          target="_blank"
          rel="noopener"
        >GitHub</a>
        <NuxtLink class="cta" to="/#install">Install</NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.bar {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--fog) 82%, transparent);
  backdrop-filter: blur(14px) saturate(1.4);
  border-bottom: 1px solid color-mix(in srgb, var(--rule) 55%, transparent);
}

.inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  height: 60px;
}

.wordmark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.0625rem;
  letter-spacing: -0.06em;
  color: var(--ink);
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
  gap: 0.3em;
}

/* The row is baseline-aligned for the text; the icon centres against it. */
.icon {
  align-self: center;
  margin-right: 0.25em;
  width: 26px;
  height: 26px;
}

.hash {
  color: var(--mark);
  font-weight: 500;
}

.nav {
  display: none;
  gap: 1.5rem;
  margin-inline: auto;
}

.nav-link {
  font-size: 0.9375rem;
  color: var(--muted);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--ink);
}

.right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ghost {
  display: none;
  font-size: 0.9375rem;
  color: var(--muted);
  text-decoration: none;
  padding: 0.4rem 0.6rem;
}

.ghost:hover {
  color: var(--ink);
}

.cta {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-decoration: none;
  color: var(--surface);
  background: var(--ink);
  padding: 0.46rem 0.9rem;
  border-radius: 6px;
  transition: background 0.18s ease;
}

.cta:hover {
  background: var(--mark-deep);
}

@media (min-width: 44rem) {
  .nav,
  .ghost {
    display: flex;
  }
}
</style>
