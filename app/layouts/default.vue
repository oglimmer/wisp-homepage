<template>
  <div class="frame">
    <a class="skip" href="#main">Skip to content</a>
    <SiteNav />
    <main id="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.frame {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.skip {
  position: absolute;
  left: -9999px;
  top: 0.5rem;
  z-index: 50;
  background: var(--surface);
  padding: 0.6rem 1rem;
  border-radius: 6px;
  box-shadow: var(--shadow-lift);
}

.skip:focus {
  left: 1rem;
}
</style>
