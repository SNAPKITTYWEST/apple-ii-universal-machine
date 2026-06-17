var CapsuleRegistry = {
  STORAGE_KEY: 'apple_ii_capsules_v1',

  _read: function() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || []; }
    catch { return []; }
  },

  _write: function(capsules) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(capsules));
  },

  getAll: function() { return this._read(); },

  getByName: function(name) {
    return this._read().find(function(c) { return c.name === name; }) || null;
  },

  save: function(capsule) {
    var all = this._read();
    var idx = all.findIndex(function(c) { return c.name === capsule.name; });
    if (idx >= 0) all[idx] = capsule;
    else all.push(capsule);
    this._write(all);
    return capsule;
  },

  remove: function(name) {
    var all = this._read().filter(function(c) { return c.name !== name; });
    this._write(all);
  },

  count: function() { return this._read().length; }
};
