var StapleCommands = {
  help: function() {
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  REPO STAPLE + COLD BOOT — COMMANDS                         ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  StapleRepo;           — create staple manifest             ║',
      '║  VerifyStaple;         — verify manifest integrity          ║',
      '║  ColdBoot;             — replay boot from manifest+vault    ║',
      '║  StapleStatus;         — show staple status                 ║',
      '║                                                                    ║',
      '║  Repo Staple = manifest proving page ↔ repo ↔ vault state   ║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  staple: async function() {
    var c = ContractRegistry.check('runtime');
    if (!c.allowed) return { output: 'ADA CONTRACT: DENIED — ' + c.reason, type: 'error' };
    var result = await RepoStaple.staple();
    return {
      output: StapleManifest.render() + '\nSEAL: ' + result.seal.substring(0, 48),
      type: 'success'
    };
  },

  verify: function() {
    var result = RepoStaple.verify();
    var lines = [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  STAPLE VERIFICATION                                        ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  VERDICT:  ' + (result.verified ? 'VERIFIED ✓' : 'UNVERIFIED ✗').padEnd(46) + '║',
      '║  CHECKS:   ' + (result.passed + '/' + result.total + ' passed').padEnd(46) + '║'
    ];
    if (result.checks) {
      Object.keys(result.checks).forEach(function(k) {
        lines.push('║  ' + k.padEnd(18) + ' ' + (result.checks[k] ? '✓' : '✗').padEnd(37) + '║');
      });
    }
    lines.push('╚══════════════════════════════════════════════════════════════╝');
    return { output: lines.join('\n'), type: result.verified ? 'success' : 'error' };
  },

  coldboot: async function() {
    var result = await ColdBoot.boot();
    return { output: ColdBoot.render(result), type: 'success' };
  },

  status: function() {
    var s = RepoStaple;
    var m = StapleManifest.manifest;
    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  STAPLE STATUS                                              ║',
        '╠══════════════════════════════════════════════════════════════╣',
        '║  VERIFIED:  ' + (s.isVerified ? 'YES ✓' : 'NO').padEnd(46) + '║',
        '║  REPO:      ' + (m ? m.repo : 'none').padEnd(46) + '║',
        '║  VERSION:   ' + (m ? m.version : 'none').padEnd(46) + '║',
        '║  FILES:     ' + (m ? String(m.fileCount) : '0').padEnd(46) + '║',
        '║  PAGE SEAL: ' + (m ? m.pageSeal.substring(0, 46) : 'none').padEnd(46) + '║',
        '║  COLD BOOT: ' + (ColdBoot.booted ? 'AVAILABLE' : 'NOT YET').padEnd(46) + '║',
        '╚══════════════════════════════════════════════════════════════╝'
      ].join('\n'),
      type: 'success'
    };
  }
};
