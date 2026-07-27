<script setup lang="ts">
useHead({
  title: 'Privacy Policy — Wisp',
  meta: [
    {
      name: 'description',
      content:
        'How Wisp and this website handle personal data. The app keeps your notes on your own disk and sends nothing to us.',
    },
  ],
})
</script>

<template>
  <LegalDoc
    title="Privacy Policy"
    standfirst="How the Wisp app and this website handle personal data."
    updated="27 July 2026"
  >
    <section>
      <p class="lead">
        This Privacy Policy explains how oglimmer.com / Oliver Zimpasser (“we”, “our”, “us”)
        processes personal data in connection with <strong>Wisp</strong>, a Markdown note editor for
        the desktop, and with this website. It applies to visitors of this site and to people who
        install and use the app.
      </p>
      <p>
        The short version: Wisp runs entirely on your own computer. Your notes, your folder and your
        reminders never reach us, because there is nowhere for them to be sent.
      </p>
    </section>

    <section>
      <h2><span>##</span>1. Controller</h2>
      <p>Controller under Art. 4(7) GDPR:</p>
      <p class="addr">
        Oliver Zimpasser, Berliner Str. 39a, 63110 Rodgau, Germany<br />
        Email: <a href="mailto:oglimmer@gmail.com">oglimmer@gmail.com</a>
      </p>
    </section>

    <section>
      <h2><span>##</span>2. The Wisp application</h2>
      <p>
        Wisp is a local desktop application. It has no user accounts, no login, no sync service and
        no backend operated by us.
      </p>
      <ul>
        <li>
          <strong>Your notes stay on your disk.</strong> Wisp reads and writes files only inside the
          folder (“vault”) you select, and only through a restricted internal bridge with
          path-traversal guards.
        </li>
        <li>
          <strong>Reminders stay on your disk.</strong> They are written as plain JSON to
          <code>.wisp-reminders.json</code> at the root of your vault.
        </li>
        <li>
          <strong>Your settings stay on your disk.</strong> The path of your last vault is stored
          locally so the app can reopen it.
        </li>
        <li>
          <strong>No telemetry and no analytics.</strong> The app does not collect usage statistics,
          crash reports or identifiers, and does not transmit your content anywhere.
        </li>
      </ul>
      <p class="fine">
        Because we never receive this data, we cannot access, export or delete it for you. Deleting
        it is a matter of deleting the files in your vault.
      </p>
    </section>

    <section>
      <h2><span>##</span>3. This website</h2>
      <p>
        When you visit this site, our hosting provider processes technical data that every web server
        necessarily receives:
      </p>
      <ul>
        <li>IP address</li>
        <li>Date and time of the request</li>
        <li>The page or file requested</li>
        <li>Browser and operating system information (user agent)</li>
        <li>Referring page, where your browser sends one</li>
      </ul>
      <p>
        Legal basis: Art. 6(1)(f) GDPR. Our legitimate interest is delivering the site reliably and
        protecting it from abuse. This site has no contact form, no newsletter and no account
        registration.
      </p>
    </section>

    <section>
      <h2><span>##</span>4. Cookies and local storage</h2>
      <p>
        This website sets no cookies and writes nothing to local storage. There are no tracking
        pixels, no advertising tags and no analytics scripts, so there is no consent banner to
        dismiss.
      </p>
    </section>

    <section>
      <h2><span>##</span>5. Third parties</h2>
      <ul>
        <li>
          <strong>Web fonts.</strong> The typefaces on this site are requested from Google Fonts
          (fonts.googleapis.com and fonts.gstatic.com). Your IP address is transmitted to Google in
          order to deliver them, and Google may process it under its own privacy policy.
        </li>
        <li>
          <strong>GitHub.</strong> The source code, releases and Homebrew tap are hosted on GitHub.
          Following a link there, or installing Wisp with Homebrew, means GitHub receives your
          request data under its own privacy policy. We receive only aggregate, non-personal download
          counts that GitHub makes available to repository owners.
        </li>
        <li>
          <strong>Hosting.</strong> Our hosting provider processes the server data described in
          section 3 as a processor under Art. 28 GDPR, on our instructions only.
        </li>
      </ul>
    </section>

    <section>
      <h2><span>##</span>6. Recipients and transfers</h2>
      <p>
        We do not sell your data and we do not share it for advertising. Beyond the providers named
        above, no data is passed on. Where a provider processes data outside the EU, that transfer
        relies on the safeguards that provider has put in place, such as EU standard contractual
        clauses.
      </p>
    </section>

    <section>
      <h2><span>##</span>7. Retention</h2>
      <ul>
        <li>
          <strong>Server logs:</strong> retained for a short period, then deleted, unless a specific
          entry is needed to investigate a security incident.
        </li>
        <li>
          <strong>Notes, reminders and settings:</strong> retained on your own computer for as long
          as you keep them. We hold no copy.
        </li>
      </ul>
    </section>

    <section>
      <h2><span>##</span>8. Security</h2>
      <p>
        The app is built with context isolation enabled and Node integration disabled, and every file
        operation crosses a minimal, guarded bridge. The macOS build is signed and notarised. We
        apply appropriate technical and organisational measures to this website, though no online
        service can guarantee absolute security.
      </p>
    </section>

    <section>
      <h2><span>##</span>9. Your rights (EU/EEA)</h2>
      <p>
        You have the rights of access, rectification, erasure, restriction, portability and objection
        under Art. 15–21 GDPR. Where processing rests on consent, you may withdraw it at any time
        with effect for the future. You may also lodge a complaint with a supervisory authority in
        Germany.
      </p>
      <p class="fine">
        These rights cover data we hold. They cannot extend to the notes on your own computer,
        because we never receive them.
      </p>
    </section>

    <section>
      <h2><span>##</span>10. Children</h2>
      <p>
        Wisp is not directed at children under 16, and we do not knowingly process their personal
        data.
      </p>
    </section>

    <section>
      <h2><span>##</span>11. Changes to this policy</h2>
      <p>
        We may update this policy to reflect changes in the software, our practices or legal
        requirements. The “Last updated” date above marks the version in force.
      </p>
    </section>

    <section>
      <h2><span>##</span>12. Contact</h2>
      <p>
        For privacy questions or requests, write to
        <a href="mailto:oglimmer@gmail.com">oglimmer@gmail.com</a>.
      </p>
    </section>
  </LegalDoc>
</template>
