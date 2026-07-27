<template>
  <figure class="pop">
    <div class="head">
      <span class="dot" aria-hidden="true" />
      <span class="when">Due now · repeats weekly</span>
    </div>

    <p class="what">Weekly review</p>
    <p class="note">projects/wisp.md</p>

    <div class="acts">
      <button type="button" class="quiet">Snooze</button>
      <button type="button" class="quiet">Open note</button>
      <button type="button" class="solid">Done</button>
    </div>
    <figcaption>Wisp brings its window forward, so this lands in front of whatever you were doing.</figcaption>
  </figure>
</template>

<style scoped>
.pop {
  margin: 0;
  background: var(--surface);
  border: 1px solid color-mix(in srgb, var(--ember) 32%, var(--rule));
  border-radius: 12px;
  box-shadow: var(--shadow-lift);
  padding: 1.35rem 1.4rem 1rem;
  max-width: 25rem;
}

.head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.7rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ember);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--ember) 16%, transparent);
}

.when {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  color: var(--ember);
}

.what {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.045em;
  line-height: 1.2;
  color: var(--ink);
}

.note {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--faint);
  margin-top: 0.35rem;
}

.acts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.15rem;
}

.acts button {
  border-radius: 7px;
  padding: 0.5rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.16s ease, border-color 0.16s ease;
}

.quiet {
  border: 1px solid var(--rule);
  background: var(--surface);
  color: var(--ink-soft);
}

.quiet:hover {
  background: var(--surface-sunk);
  border-color: var(--faint);
}

.solid {
  border: 1px solid var(--ember);
  background: var(--ember);
  color: #fff;
  margin-left: auto;
}

.solid:hover {
  background: color-mix(in srgb, var(--ember) 86%, #000);
}

figcaption {
  margin-top: 1.15rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--rule-soft);
  font-size: 0.78rem;
  color: var(--faint);
}
</style>
