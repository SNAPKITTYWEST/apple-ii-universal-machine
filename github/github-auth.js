var GitHubAuth = {
  TOKEN_KEY: 'github_token_session',
  _token: null,

  getToken: function() {
    if (this._token) return this._token;
    try {
      this._token = sessionStorage.getItem(this.TOKEN_KEY);
    } catch {}
    return this._token;
  },

  setToken: function(token) {
    this._token = token;
    try { sessionStorage.setItem(this.TOKEN_KEY, token); } catch {}
  },

  clearToken: function() {
    this._token = null;
    try { sessionStorage.removeItem(this.TOKEN_KEY); } catch {}
  },

  isAuthenticated: function() {
    return !!this.getToken();
  },

  validateToken: async function() {
    var token = this.getToken();
    if (!token) return { valid: false, reason: 'No token' };
    try {
      var resp = await fetch('https://api.github.com/user', {
        headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json' }
      });
      if (resp.ok) {
        var data = await resp.json();
        return { valid: true, user: data.login, scopes: resp.headers.get('x-oauth-scopes') || 'unknown' };
      }
      return { valid: false, reason: 'HTTP ' + resp.status };
    } catch (e) {
      return { valid: false, reason: e.message };
    }
  },

  status: function() {
    var authed = this.isAuthenticated();
    return {
      authenticated: authed,
      storage: 'SESSION_ONLY',
      warning: authed ? 'Token stored in sessionStorage only. Never committed to repo or Woz Vault.' : 'No token. Use GitHubLogin; to authenticate.'
    };
  }
};
