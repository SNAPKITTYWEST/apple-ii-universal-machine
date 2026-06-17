var AsciiRegistry = {

  coldboot: [
    '',
    '         __________                 ',
    '        /          \\                ',
    '       /  A  P  P  L  E            ',
    '      /   I  I                       ',
    '     /    __________                ',
    '    |    |          |               ',
    '    |    |  UNIVERSAL|              ',
    '    |    |  MACHINE  |              ',
    '    |    |__________|               ',
    '     \\                            / ',
    '      \\   SUN BOOT ROM           /  ',
    '       \\  GitHub Pages           /   ',
    '        \\________________________/   ',
    '                                      ',
    '    MEMORY: Woz Vault (localStorage)  ',
    '    SEAL:   SHA-256 (Web Crypto)      ',
    '    AGENTS: ENKI + SENTINEL           ',
    '    STATUS: INITIALIZING...           ',
    ''
  ].join('\n'),

  sunboot: [
    '',
    '    ╔═══════════════════════════════════╗',
    '    ║                                   ║',
    '    ║   ☀  SUN BOOT COMPLETE  ✓        ║',
    '    ║                                   ║',
    '    ║   ROM:     GitHub Pages           ║',
    '    ║   KERNEL:  kernel.js              ║',
    '    ║   VAULT:   initialized            ║',
    '    ║   TRUST:   verified               ║',
    '    ║   SEAL:    generated              ║',
    '    ║                                   ║',
    '    ║   "One cockpit. Many agents.      ║',
    '    ║    No token tax."                 ║',
    '    ║                                   ║',
    '    ╚═══════════════════════════════════╝',
    ''
  ].join('\n'),

  verified: [
    '',
    '    ╔═══════════════════════════════════╗',
    '    ║  HOLY PAGE — RESCUE KERNEL        ║',
    '    ╠═══════════════════════════════════╣',
    '    ║  Status:   VERIFIED ✓             ║',
    '    ║  Vault:    LOCAL-FIRST            ║',
    '    ║  Fallback: MANDATORY              ║',
    '    ║  Recovery: ALWAYS                 ║',
    '    ╚═══════════════════════════════════╝',
    ''
  ].join('\n'),

  failed: [
    '',
    '    ╔═══════════════════════════════════╗',
    '    ║  ⚠  BOOT FAILED                   ║',
    '    ║  Redirecting to Holy Page...      ║',
    '    ╚═══════════════════════════════════╝',
    ''
  ].join('\n'),

  debate: [
    '',
    '    ╔═══════════════════════════════════╗',
    '    ║  DEBATE ARENA                     ║',
    '    ╠═══════════════════════════════════╣',
    '    ║  ENKI:     tension proposer       ║',
    '    ║  SENTINEL: claim auditor          ║',
    '    ║  OUTPUT:   SHA-256 sealed         ║',
    '    ║  MEMORY:   Woz Vault              ║',
    '    ╚═══════════════════════════════════╝',
    ''
  ].join('\n'),

  vault: [
    '',
    '    ╔═══════════════════════════════════╗',
    '    ║  WOZ VAULT                        ║',
    '    ╠═══════════════════════════════════╣',
    '    ║  Local-first memory               ║',
    '    ║  Append-only audit log            ║',
    '    ║  SHA-256 sealed events            ║',
    '    ╚═══════════════════════════════════╝',
    ''
  ].join('\n'),

  renderAscii: function(state) {
    return this[state] || this.coldboot;
  },

  trustDensityArt: function(score) {
    var filled = Math.round(score * 20);
    var empty = 20 - filled;
    return '[' + repeat('█', filled) + repeat('░', empty) + '] ' + Math.round(score * 100) + '%';
  }
};

function repeat(ch, n) {
  var s = '';
  for (var i = 0; i < n; i++) s += ch;
  return s;
}
