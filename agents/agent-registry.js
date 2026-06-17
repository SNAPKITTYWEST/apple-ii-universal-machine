var AgentRegistry = {
  STORAGE_KEY: 'apple_ii_agents_v1',

  _read: function() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || []; }
    catch { return []; }
  },

  _write: function(agents) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(agents));
  },

  getAll: function() { return this._read(); },

  getById: function(id) {
    return this._read().find(function(a) { return a.id === id; }) || null;
  },

  getByName: function(name) {
    return this._read().find(function(a) { return a.name === name; }) || null;
  },

  save: function(agent) {
    var agents = this._read();
    var idx = agents.findIndex(function(a) { return a.id === agent.id; });
    if (idx >= 0) agents[idx] = agent;
    else agents.push(agent);
    this._write(agents);
    return agent;
  },

  remove: function(id) {
    var agents = this._read().filter(function(a) { return a.id !== id; });
    this._write(agents);
  },

  count: function() { return this._read().length; }
};
