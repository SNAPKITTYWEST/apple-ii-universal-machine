var RepoBuilder = {
  createInvertedRepo: async function(repoName, type) {
    if (!GitHubAuth.isAuthenticated()) {
      return { error: 'Not authenticated. Run GitHubLogin; first.' };
    }

    var template = InvertedRepoTemplate.getTemplate(type || 'agent');

    try {
      var repo = await GitHubAPI.createRepo(repoName, {
        description: template.description,
        private: false
      });

      var owner = repo.owner.login;
      var filesCreated = [];

      for (var i = 0; i < template.files.length; i++) {
        var f = template.files[i];
        try {
          await GitHubAPI.createFile(owner, repoName, f.path, f.content, 'Add ' + f.path);
          filesCreated.push(f.path);
        } catch (e) {
          filesCreated.push(f.path + ' (FAILED: ' + e.message + ')');
        }
      }

      var staple = null;
      try {
        staple = await RepoStapleWriter.writeStaple(owner, repoName);
      } catch (e) {
        staple = { error: e.message };
      }

      WozVault.writeAuditEvent({
        type: 'INVERTED_REPO_CREATE',
        agent: 'GITHUB',
        repo: repoName,
        type: type,
        files: filesCreated.length,
        url: repo.html_url
      });

      var s = await Seal.createSeal({ type: 'REPO_CREATE', repo: repoName, url: repo.html_url });

      return {
        success: true,
        repo: repo,
        files: filesCreated,
        staple: staple,
        seal: s.hash,
        pagesUrl: 'https://' + owner + '.github.io/' + repoName + '/',
        template: type
      };
    } catch (e) {
      return { error: e.message };
    }
  },

  render: function(result) {
    if (result.error) return 'ERROR: ' + result.error;
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  INVERTED REPO CREATED                                       ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  REPO:     ' + result.repo.full_name.padEnd(46) + '║',
      '║  URL:      ' + result.repo.html_url.substring(0, 46).padEnd(46) + '║',
      '║  TYPE:     ' + result.template.padEnd(46) + '║',
      '║  FILES:    ' + String(result.files.length).padEnd(46) + '║',
      '║  PAGES:    ' + result.pagesUrl.substring(0, 46).padEnd(46) + '║',
      '║  SEAL:     ' + result.seal.substring(0, 46).padEnd(46) + '║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  FILES CREATED:                                             ║'
    ].concat(result.files.map(function(f) { return '║    ✓ ' + f.substring(0, 51).padEnd(51) + '║'; }))
    .concat(['╚══════════════════════════════════════════════════════════════╝'])
    .join('\n');
  }
};
