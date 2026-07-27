<script setup lang="ts">
useHead({
  title: 'Terms and Conditions — Wisp',
  meta: [
    {
      name: 'description',
      content: 'The terms that apply to the Wisp application and this website.',
    },
  ],
})
</script>

<template>
  <LegalDoc
    title="Terms and Conditions"
    standfirst="The terms that apply to the Wisp application and to this website."
    updated="27 July 2026"
  >
    <section>
      <p class="lead">
        These Terms and Conditions (“Terms”) govern your use of <strong>Wisp</strong> (“the
        Software”) and of this website, both provided by oglimmer.com / Oliver Zimpasser (“we”,
        “our”, “us”). By downloading, installing or using the Software, or by using this website, you
        agree to these Terms. If you do not agree with any part of them, do not use the Software.
      </p>
    </section>

    <section>
      <h2><span>##</span>1. Licence</h2>
      <p>
        1.1. The Software is open source and licensed under the MIT Licence. The full licence text
        ships with the source at
        <a href="https://github.com/oglimmer/wisp" target="_blank" rel="noopener">
          github.com/oglimmer/wisp</a>.
      </p>
      <p>
        1.2. Where these Terms and the MIT Licence differ on the Software itself, the MIT Licence
        prevails. Nothing here narrows the rights it grants you.
      </p>
      <p>1.3. The Software is provided free of charge. There is no subscription and no paid tier.</p>
    </section>

    <section>
      <h2><span>##</span>2. Your notes</h2>
      <p>
        2.1. The Software runs on your computer and stores files in a folder you choose. You retain
        full ownership of everything you write with it.
      </p>
      <p>
        2.2. We claim no rights over your notes, and we receive no copy of them. There is no server
        component, no account and no upload to us.
      </p>
      <p>
        2.3. The Software's AI features — filing a note, answering a question from your notes, and
        describing an imported image — are carried out by Anthropic's <code>claude</code>
        command-line tool, which you install separately and use under your own Anthropic account.
        Using those features sends the notes or images concerned to Anthropic through that tool, on
        your own account and subject to Anthropic's terms. Without the tool installed, those
        features are simply unavailable and the rest of the Software works as normal.
      </p>
      <p>
        2.4. Backups are your responsibility. Because your notes are ordinary files in an ordinary
        folder, any backup tool you already use will cover them.
      </p>
    </section>

    <section>
      <h2><span>##</span>3. Acceptable use</h2>
      <p>3.1. You must be at least 16 years old to use the Software.</p>
      <p>
        3.2. You are solely responsible for the content you create with the Software and for
        complying with the law where you use it.
      </p>
      <p>
        3.3. You may not use this website in any way that is illegal or that interferes with its
        operation, including attempts to gain unauthorised access to it.
      </p>
    </section>

    <section>
      <h2><span>##</span>4. Privacy</h2>
      <p>
        4.1. Our <NuxtLink to="/privacy">Privacy Policy</NuxtLink> explains what data is processed,
        on what legal bases, for how long, and what rights you have. By using the Software or this
        website, you acknowledge that you have read it.
      </p>
      <p>
        4.2. We send no email. There is no account to register, no mailing list, and no marketing
        messages.
      </p>
    </section>

    <section>
      <h2><span>##</span>5. Updates and availability</h2>
      <p>
        5.1. We may change, suspend or discontinue the Software, its releases or this website at any
        time, without notice and without liability.
      </p>
      <p>
        5.2. A copy of the Software you have already installed keeps working under the licence it was
        released under, whatever we do next.
      </p>
    </section>

    <section>
      <h2><span>##</span>6. Disclaimer of warranties</h2>
      <p>
        6.1. The Software and this website are provided “as is” and “as available”, without warranty
        of any kind, express or implied, including but not limited to warranties of merchantability,
        fitness for a particular purpose and non-infringement.
      </p>
      <p>
        6.2. The Software writes to and deletes files in the folder you select. We make no warranty
        that it is free of defects. Keep backups of anything you cannot afford to lose.
      </p>
      <p>
        6.3. AI output is not guaranteed to be correct. A proposed filing, an answer drawn from your
        notes, a suggested reminder date and a generated image description may all be wrong. The
        Software shows you a proposed change before it writes anything; reviewing it is your
        responsibility, and we give no warranty as to the accuracy or suitability of anything the
        model produces.
      </p>
    </section>

    <section>
      <h2><span>##</span>7. Limitation of liability</h2>
      <p>
        7.1. To the extent permitted by applicable law, we shall not be liable for any indirect,
        incidental, special, consequential or punitive damages, or for any loss of data, profits,
        revenue, goodwill or other intangible losses arising from the use of, or inability to use,
        the Software or this website.
      </p>
      <p>
        7.2. Liability for injury to life, body or health, and liability under the German Product
        Liability Act, remains unaffected, as does liability for intent and gross negligence.
      </p>
    </section>

    <section>
      <h2><span>##</span>8. Third-party services</h2>
      <p>
        8.1. Distribution runs through GitHub and Homebrew. Their own terms and privacy policies
        apply when you use them, and we have no control over those services.
      </p>
      <p>
        8.2. The AI features depend on Anthropic's <code>claude</code> command-line tool and your own
        Anthropic account. Anthropic's terms, privacy policy and usage limits apply to that use, we
        have no control over that service, and we are not responsible if it changes, becomes
        unavailable or produces an unusable result.
      </p>
    </section>

    <section>
      <h2><span>##</span>9. Governing law</h2>
      <p>
        9.1. These Terms are governed by the laws of Germany, without regard to conflict of law
        principles. Mandatory consumer protection rules of your country of residence remain
        unaffected.
      </p>
    </section>

    <section>
      <h2><span>##</span>10. Changes to these Terms</h2>
      <p>
        10.1. We may modify or replace these Terms at any time. The “Last updated” date above marks
        the version in force, and continued use after a change indicates acceptance of it.
      </p>
    </section>

    <section>
      <h2><span>##</span>11. Contact</h2>
      <p>
        11.1. Questions about these Terms go to
        <a href="mailto:oglimmer@gmail.com">oglimmer@gmail.com</a>. Bug reports are better filed as
        issues at
        <a href="https://github.com/oglimmer/wisp" target="_blank" rel="noopener">
          github.com/oglimmer/wisp</a>.
      </p>
    </section>
  </LegalDoc>
</template>
