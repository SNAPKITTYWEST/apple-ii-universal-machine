var GitHubAPI = {
  BASE: 'https://api.github.com',

  _headers: function() {
    var token = GitHubAuth.getToken();
    return {
      'Authorization': token ? 'token ' + token : '',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    };
  },

  get: async function(path) {
    var resp = await fetch(this.BASE + path, { headers: this._headers() });
    if (!resp.ok) throw new Error('GitHub API: ' + resp.status);
    return resp.json();
  },

  post: async function(path, body) {
    var resp = await fetch(this.BASE + path, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(body)
    });
    if (!resp.ok) {
      var err = await resp.text();
      throw new Error('GitHub API: ' + resp.status + ' — ' + err);
    }
    return resp.json();
  },

  put: async function(path, body) {
    var resp = await fetch(this.BASE + path, {
      method: 'PUT',
      headers: this._headers(),
      body: JSON.stringify(body)
    });
    if (!resp.ok) throw new Error('GitHub API: ' + resp.status);
    return resp.json();
  },

  createRepo: async function(name, opts) {
    opts = opts || {};
    return this.post('/user/repos', {
      name: name,
      description: opts.description || 'Apple II Universal Machine — inverted repo',
      private: opts.private || false,
      auto_init: true,
      homepage: opts.homepage || ''
    });
  },

  createFile: async function(owner, repo, path, content, message) {
    var encoded = btoa(unescape(encodeURIComponent(content)));
    return this.put('/repos/' + owner + '/' + repo + '/contents/' + path, {
      message: message || 'Add ' + path,
      content: encoded
    });
  },

  getRepo: async function(owner, repo) {
    return this.get('/repos/' + owner + '/' + repo);
  }
};
