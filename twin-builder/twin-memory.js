var TwinMemory = {
  types: [
    { key: 'session', label: 'Session Only', description: 'Twin forgets when page closes. Safest option.' },
    { key: 'persistent', label: 'Persistent Woz Vault', description: 'Twin remembers across sessions via Woz Vault.' },
    { key: 'exportable', label: 'Exportable Memory', description: 'Twin can export its memory as JSON.' },
    { key: 'full', label: 'Full Twin Archive', description: 'Complete memory with chat history, sealed and audited.' }
  ],

  getAll: function() { return this.types; },
  get: function(key) { return this.types.find(function(m) { return m.key === key; }) || null; }
};
