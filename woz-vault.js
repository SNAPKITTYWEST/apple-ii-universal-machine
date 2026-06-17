const WozVault = {
  KEY: 'woz_vault_v1',

  _read() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || { events: [], snapshots: [] }; }
    catch { return { events: [], snapshots: [] }; }
  },

  _write(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },

  writeAuditEvent(event) {
    const data = this._read();
    const entry = { ...event, id: 'evt_' + Date.now().toString(36), timestamp: new Date().toISOString() };
    data.events.push(entry);
    this._write(data);
    return entry;
  },

  readAuditLog() {
    return this._read().events;
  },

  clearVault() {
    localStorage.removeItem(this.KEY);
  },

  saveSnapshot(snapshot) {
    const data = this._read();
    const entry = { ...snapshot, id: 'snap_' + Date.now().toString(36), timestamp: new Date().toISOString() };
    data.snapshots.push(entry);
    this._write(data);
    return entry;
  },

  readSnapshots() {
    return this._read().snapshots;
  }
};
