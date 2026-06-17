const AsciiRegistry = {

  coldboot: [
    '╔══════════════════════════════════════════════╗',
    '║  APPLE II UNIVERSAL MACHINE                  ║',
    '║  SUN BOOT SEQUENCE                           ║',
    '╠══════════════════════════════════════════════╣',
    '║  ROM: GitHub Pages                           ║',
    '║  KERNEL: kernel.js                           ║',
    '║  MEMORY: Woz Vault (localStorage)            ║',
    '║  SEAL: SHA-256 (Web Crypto)                  ║',
    '║  STATUS: INITIALIZING                        ║',
    '╚══════════════════════════════════════════════╝'
  ],

  verified: [
    '╔══════════════════════════════════════════════╗',
    '║  SUN BOOT: VERIFIED ✓                        ║',
    '╠══════════════════════════════════════════════╣',
    '║  VAULT: initialized                          ║',
    '║  TRUST DEED: loaded                          ║',
    '║  SEAL: generated                             ║',
    '║  ROUTE: valid                                 ║',
    '╚══════════════════════════════════════════════╝'
  ],

  failed: [
    '╔══════════════════════════════════════════════╗',
    '║  ⚠ BOOT FAILED                               ║',
    '╠══════════════════════════════════════════════╣',
    '║  Redirecting to Holy Page (rescue mode)...    ║',
    '╚══════════════════════════════════════════════╝'
  ],

  debate: [
    '╔══════════════════════════════════════════════╗',
    '║  DEBATE ARENA                                ║',
    '╠══════════════════════════════════════════════╣',
    '║  ENKI: proposes                              ║',
    '║  SENTINEL: audits                            ║',
    '║  All output sealed to Woz Vault              ║',
    '╚══════════════════════════════════════════════╝'
  ],

  vault: [
    '╔══════════════════════════════════════════════╗',
    '║  WOZ VAULT                                   ║',
    '╠══════════════════════════════════════════════╣',
    '║  Local-first memory                          ║',
    '║  Append-only audit log                       ║',
    '║  SHA-256 sealed events                       ║',
    '╚══════════════════════════════════════════════╝'
  ],

  sunboot: [
    '╔══════════════════════════════════════════════╗',
    '║  ☀ SUN BOOT COMPLETE                         ║',
    '╠══════════════════════════════════════════════╣',
    '║  One cockpit. Many agents. No token tax.     ║',
    '╚══════════════════════════════════════════════╝'
  ],

  renderAscii(state) {
    return (this[state] || this.coldboot).join('\n');
  },

  trustDensityArt(score) {
    const filled = Math.round(score * 20);
    const empty = 20 - filled;
    return '[' + '█'.repeat(filled) + '░'.repeat(empty) + '] ' + Math.round(score * 100) + '%';
  }
};
