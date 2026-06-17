var StapleManifest = {
  STORAGE_KEY: 'apple_ii_staple_v1',
  manifest: null,

  generate: async function() {
    var files = [];
    if (typeof FileTree !== 'undefined') {
      var walk = function(node, path) {
        if (node.type === 'file') files.push(path + node.name);
        if (node.children) node.children.forEach(function(c) { walk(c, path + node.name + '/'); });
      };
      walk(FileTree.root, '');
    }

    var vaultEvents = typeof WozVault !== 'undefined' ? WozVault.readAuditLog().length : 0;
    var vaultHash = typeof Seal !== 'undefined' ? await Seal.createSeal({ count: vaultEvents }) : { hash: 'simulated' };

    var pageHash = typeof Seal !== 'undefined' ? await Seal.createSeal({ url: location.href, time: Date.now() }) : { hash: 'simulated' };

    var manifest = {
      repo: 'apple-ii-universal-machine',
      commit: 'manual',
      version: '1.0.0',
      files: files,
      fileCount: files.length,
      buildTimestamp: new Date().toISOString(),
      pageSeal: pageHash.hash,
      vaultSnapshotHash: vaultHash.hash,
      vaultEvents: vaultEvents,
      agentCount: typeof AgentRegistry !== 'undefined' ? AgentRegistry.count() : 0,
      twinCount: typeof TwinRegistry !== 'undefined' ? TwinRegistry.count() : 0,
      capsuleCount: typeof CapsuleRegistry !== 'undefined' ? CapsuleRegistry.count() : 0,
      mode: typeof RuntimeRegistry !== 'undefined' ? RuntimeRegistry.current : 'unknown',
      verified: true
    };

    this.manifest = manifest;
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(manifest)); } catch {}
    return manifest;
  },

  load: function() {
    try {
      this.manifest = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    } catch {}
    return this.manifest;
  },

  verify: function() {
    if (!this.manifest) this.load();
    if (!this.manifest) return { verified: false, reason: 'No manifest found' };

    var checks = {
      hasRepo: !!this.manifest.repo,
      hasVersion: !!this.manifest.version,
      hasFiles: Array.isArray(this.manifest.files) && this.manifest.files.length > 0,
      hasTimestamp: !!this.manifest.buildTimestamp,
      hasPageSeal: !!this.manifest.pageSeal,
      hasVaultHash: !!this.manifest.vaultSnapshotHash,
      sealLength: this.manifest.pageSeal ? this.manifest.pageSeal.length >= 32 : false
    };

    var passed = Object.values(checks).filter(function(v) { return v; }).length;
    var total = Object.keys(checks).length;

    return {
      verified: passed === total,
      checks: checks,
      passed: passed,
      total: total,
      manifest: this.manifest
    };
  },

  render: function() {
    if (!this.manifest) return 'No staple manifest.';
    var v = this.verify();
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  REPO STAPLE MANIFEST                                       ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  REPO:      ' + this.manifest.repo.padEnd(45) + '║',
      '║  VERSION:   ' + this.manifest.version.padEnd(45) + '║',
      '║  FILES:     ' + String(this.manifest.fileCount).padEnd(45) + '║',
      '║  BUILT:     ' + this.manifest.buildTimestamp.substring(0, 19).padEnd(45) + '║',
      '║  PAGE SEAL: ' + this.manifest.pageSeal.substring(0, 45).padEnd(45) + '║',
      '║  VAULT:     ' + String(this.manifest.vaultEvents) + ' events'.padEnd(45) + '║',
      '║  AGENTS:    ' + String(this.manifest.agentCount).padEnd(45) + '║',
      '║  TWINS:     ' + String(this.manifest.twinCount).padEnd(45) + '║',
      '║  CAPSULES:  ' + String(this.manifest.capsuleCount).padEnd(45) + '║',
      '║  VERIFIED:  ' + (v.verified ? 'YES ✓ (' + v.passed + '/' + v.total + ')' : 'NO (' + v.passed + '/' + v.total + ')').padEnd(45) + '║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
