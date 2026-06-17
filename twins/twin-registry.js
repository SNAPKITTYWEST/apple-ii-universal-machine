var TwinRegistry = {
  STORAGE_KEY: 'apple_ii_twins_v1',

  _read: function() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || []; }
    catch { return []; }
  },

  _write: function(twins) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(twins));
  },

  getAll: function() { return this._read(); },

  getById: function(id) {
    return this._read().find(function(t) { return t.id === id; }) || null;
  },

  getByName: function(name) {
    return this._read().find(function(t) { return t.name === name; }) || null;
  },

  save: function(twin) {
    var twins = this._read();
    var idx = twins.findIndex(function(t) { return t.id === twin.id; });
    if (idx >= 0) twins[idx] = twin;
    else twins.push(twin);
    this._write(twins);
    return twin;
  },

  remove: function(id) {
    var twins = this._read().filter(function(t) { return t.id !== id; });
    this._write(twins);
  },

  count: function() { return this._read().length; }
};
