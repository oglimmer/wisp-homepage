<script setup lang="ts">
useHead({
  title: 'Imprint — Wisp',
  meta: [{ name: 'description', content: 'Legal information and contact details for Wisp.' }],
})
</script>

<template>
  <LegalDoc title="Imprint / Impressum" standfirst="Legal information and contact details.">
    <section>
      <h2><span>##</span>Diensteanbieter / Website provider</h2>
      <p>Diese Webseite wird bereitgestellt von / This website is provided by:</p>
      <p class="addr">
        Oliver Zimpasser<br />
        Berliner Str. 39a<br />
        63110 Rodgau<br />
        Germany
      </p>
    </section>

    <section>
      <h2><span>##</span>Kontakt / Contact</h2>
      <p class="addr">
        E-Mail: <a href="mailto:oglimmer@gmail.com">oglimmer@gmail.com</a>
      </p>
      <p class="fine">
        Angaben zur schnellen elektronischen Kontaktaufnahme und unmittelbaren Kommunikation gem. § 5
        Abs. 1 Nr. 2 TMG.
      </p>
    </section>

    <section>
      <h2><span>##</span>Verantwortlich i.S.d. § 18 Abs. 2 MStV</h2>
      <p>Verantwortlich für den Inhalt / Responsible for content:</p>
      <p class="addr">Oliver Zimpasser, Berliner Str. 39a, 63110 Rodgau, Germany</p>
    </section>

    <section>
      <h2><span>##</span>EU-Streitschlichtung / Dispute resolution</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">
          https://ec.europa.eu/consumers/odr</a>. Wir sind nicht verpflichtet und grundsätzlich nicht
        bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </section>

    <section>
      <h2><span>##</span>Service information</h2>
      <p>
        Wisp is free software, published under the MIT licence at
        <a href="https://github.com/oglimmer/wisp" target="_blank" rel="noopener">
          github.com/oglimmer/wisp</a>. It is provided free of charge, and this website neither sells
        anything nor takes payment.
      </p>
      <p class="fine">Angaben gemäß § 5 TMG</p>
    </section>
  </LegalDoc>
</template>
