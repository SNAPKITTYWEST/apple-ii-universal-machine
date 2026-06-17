var GitHubCommands = {
  help: function() {
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  GITHUB-NATIVE — COMMANDS                                    ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  GitHubHelp;                    — show this                 ║',
      '║  GitHubLogin;                   — paste GitHub token         ║',
      '║  GitHubLogout;                  — clear token                ║',
      '║  GitHubStatus;                  — check auth status          ║',
      '║  CreateInvertedRepo "name";     — create agent repo          ║',
      '║  CreateRepoFromTemplate "name"; — create from template       ║',
      '║  StapleRemoteRepo "owner/repo"; — staple remote repo         ║',
      '║  VerifyRemoteRepo "owner/repo"; — verify remote staple       ║',
      '║                                                                    ║',
      '║  AUTH: Token stored in sessionStorage ONLY.                   ║',
      '║  Never committed to repo or Woz Vault.                       ║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  login: function(args) {
    var token = args ? args[0] : '';
    if (!token) return { output: 'Usage: GitHubLogin "ghp_your_token";\n\nToken stored in sessionStorage only.\nNever committed to repo or Woz Vault.', type: 'error' };

    if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
      return { output: '⚠ WARNING: Token does not look like a GitHub personal access token.\nExpected format: ghp_xxx or github_pat_xxx\nProceed anyway? (token stored in sessionStorage only)', type: 'error' };
    }

    GitHubAuth.setToken(token);
    WozVault.writeAuditEvent({ type: 'GITHUB_LOGIN', agent: 'USER' });
    return { output: 'GitHub authenticated ✓\nToken: SESSION_ONLY\n⚠ Never committed to repo or Woz Vault.', type: 'success' };
  },

  logout: function() {
    GitHubAuth.clearToken();
    return { output: 'GitHub token cleared.', type: 'success' };
  },

  status: async function() {
    var st = GitHubAuth.status();
    var validation = st.authenticated ? await GitHubAuth.validateToken() : null;
    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  GITHUB STATUS                                               ║',
        '╠══════════════════════════════════════════════════════════════╣',
        '║  AUTH:      ' + (st.authenticated ? 'AUTHENTICATED ✓' : 'AUTH REQUIRED').padEnd(45) + '║',
        '║  USER:      ' + (validation && validation.user ? validation.user : 'none').padEnd(45) + '║',
        '║  STORAGE:   SESSION ONLY'.padEnd(45) + '║',
        '║  TOKEN:     ' + (st.authenticated ? 'SET (not shown)' : 'NOT SET').padEnd(45) + '║',
        '║  SCOPES:    ' + (validation && validation.scopes ? validation.scopes.substring(0, 45) : 'unknown').padEnd(45) + '║',
        '╚══════════════════════════════════════════════════════════════╝'
      ].join('\n'),
      type: 'success'
    };
  },

  createRepo: async function(args) {
    var name = args ? args[0] : '';
    if (!name) return { output: 'Usage: CreateInvertedRepo "repo-name";', type: 'error' };
    var type = args[1] || 'agent';
    var result = await RepoBuilder.createInvertedRepo(name, type);
    return { output: RepoBuilder.render(result), type: result.error ? 'error' : 'success' };
  },

  createFromTemplate: async function(args) {
    var name = args ? args[0] : '';
    if (!name) return { output: 'Usage: CreateRepoFromTemplate "repo-name";', type: 'error' };
    var types = InvertedRepoTemplate.listTypes();
    var typeList = types.map(function(t) { return t.key + ' — ' + t.desc; }).join('\n');
    var result = await RepoBuilder.createInvertedRepo(name, args[1] || 'agent');
    return { output: RepoBuilder.render(result), type: result.error ? 'error' : 'success' };
  },

  stapleRemote: async function(args) {
    var full = args ? args[0] : '';
    if (!full || full.indexOf('/') < 0) return { output: 'Usage: StapleRemoteRepo "owner/repo";', type: 'error' };
    var parts = full.split('/');
    try {
      var staple = await RepoStapleWriter.writeStaple(parts[0], parts[1]);
      return { output: 'Remote staple written ✓\nRepo: ' + full + '\nSeal: ' + (staple.pageSeal || 'none'), type: 'success' };
    } catch (e) {
      return { output: 'ERROR: ' + e.message, type: 'error' };
    }
  },

  verifyRemote: async function(args) {
    var full = args ? args[0] : '';
    if (!full || full.indexOf('/') < 0) return { output: 'Usage: VerifyRemoteRepo "owner/repo";', type: 'error' };
    var parts = full.split('/');
    var result = await RepoStapleWriter.verifyRemote(parts[0], parts[1]);
    if (result.error) return { output: 'ERROR: ' + result.error, type: 'error' };
    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  REMOTE STAPLE VERIFICATION                                 ║',
        '╠══════════════════════════════════════════════════════════════╣',
        '║  REPO:      ' + full.padEnd(45) + '║',
        '║  VERIFIED:  ' + (result.verified ? 'YES ✓' : 'NO').padEnd(45) + '║',
        '║  CHECKS:    ' + (result.passed + '/' + result.total).padEnd(45) + '║',
        '║  VERSION:   ' + (result.staple ? result.staple.version : 'unknown').padEnd(45) + '║',
        '║  SEALED:    ' + (result.staple ? result.staple.pageSeal.substring(0, 45) : 'none').padEnd(45) + '║',
        '╚══════════════════════════════════════════════════════════════╝'
      ].join('\n'),
      type: result.verified ? 'success' : 'error'
    };
  }
};
