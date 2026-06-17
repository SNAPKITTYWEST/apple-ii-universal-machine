var RepoStaple = {
  isVerified: false,
  lastVerify: null,

  staple: async function() {
    var manifest = await StapleManifest.generate();
    this.isVerified = manifest.verified;
    this.lastVerify = new Date().toISOString();

    WozVault.writeAuditEvent({
      type: 'REPO_STAPLE',
      agent: 'STAPLE',
      repo: manifest.repo,
      version: manifest.version,
      files: manifest.fileCount,
      pageSeal: manifest.pageSeal
    });

    var s = await Seal.createSeal({ type: 'STAPLE', repo: manifest.repo, pageSeal: manifest.pageSeal });
    return { manifest: manifest, seal: s.hash };
  },

  verify: function() {
    var result = StapleManifest.verify();
    this.isVerified = result.verified;
    this.lastVerify = new Date().toISOString();

    WozVault.writeAuditEvent({
      type: 'STAPLE_VERIFY',
      agent: 'VERIFIER',
      verdict: result.verified ? 'VERIFIED' : 'UNVERIFIED',
      passed: result.passed,
      total: result.total
    });

    return result;
  },

  render: function() {
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  REPO STAPLE STATUS                                         ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  STATUS:     ' + (this.isVerified ? 'VERIFIED ✓' : 'UNVERIFIED').padEnd(44) + '║',
      '║  LAST CHECK: ' + (this.lastVerify || 'never').substring(0, 19).padEnd(44) + '║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
