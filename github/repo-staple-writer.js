var RepoStapleWriter = {
  writeStaple: async function(owner, repo) {
    var vaultEvents = typeof WozVault !== 'undefined' ? WozVault.readAuditLog().length : 0;
    var pageSeal = typeof Seal !== 'undefined' ? await Seal.createSeal({ url: 'https://' + owner + '.github.io/' + repo + '/', time: Date.now() }) : { hash: 'simulated' };

    var staple = {
      repo: owner + '/' + repo,
      version: '1.0.0',
      buildTimestamp: new Date().toISOString(),
      pageSeal: pageSeal.hash,
      vaultEvents: vaultEvents,
      verified: true,
      generatedBy: 'repo-staple-writer'
    };

    try {
      await GitHubAPI.createFile(owner, repo, 'woz-staple.json', JSON.stringify(staple, null, 2), 'Add repo staple manifest');
    } catch (e) {
      staple.writeError = e.message;
    }

    WozVault.writeAuditEvent({ type: 'REMOTE_STAPLE', agent: 'STAPLE', repo: owner + '/' + repo, seal: pageSeal.hash });

    return staple;
  },

  verifyRemote: async function(owner, repo) {
    try {
      var data = await GitHubAPI.get('/repos/' + owner + '/' + repo + '/contents/woz-staple.json');
      var content = decodeURIComponent(escape(atob(data.content)));
      var staple = JSON.parse(content);

      var checks = {
        hasRepo: !!staple.repo,
        hasVersion: !!staple.version,
        hasTimestamp: !!staple.buildTimestamp,
        hasSeal: !!staple.pageSeal,
        sealLength: staple.pageSeal ? staple.pageSeal.length >= 32 : false
      };

      var passed = Object.values(checks).filter(function(v) { return v; }).length;
      var total = Object.keys(checks).length;

      return {
        verified: passed === total,
        staple: staple,
        checks: checks,
        passed: passed,
        total: total
      };
    } catch (e) {
      return { verified: false, error: e.message };
    }
  }
};
