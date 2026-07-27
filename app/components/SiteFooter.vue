<template>
  <footer class="foot">
    <div class="u-shell inner">
      <div class="brand">
        <span class="mark" aria-hidden="true">#</span>
        <span class="name">wisp</span>
        <span class="lic">MIT · open source</span>
      </div>

      <nav class="links" aria-label="Site">
        <a href="https://github.com/oglimmer/wisp" target="_blank" rel="noopener">GitHub</a>
        <NuxtLink to="/imprint">Imprint</NuxtLink>
        <NuxtLink to="/privacy">Privacy</NuxtLink>
        <NuxtLink to="/terms">Terms</NuxtLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.foot {
  border-top: 1px solid var(--rule-soft);
  margin-top: 5rem;
  padding-block: 2.25rem 3rem;
}

.inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 2rem;
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
}

.mark {
  font-family: var(--font-display);
  color: var(--mark);
  font-weight: 500;
  font-size: 0.9375rem;
}

.name {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.06em;
  font-size: 0.9375rem;
}

.lic {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--faint);
}

.links {
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.links a {
  font-size: 0.875rem;
  color: var(--muted);
  text-decoration: none;
}

.links a:hover {
  color: var(--mark-deep);
  text-decoration: underline;
  text-underline-offset: 0.18em;
}
</style>
