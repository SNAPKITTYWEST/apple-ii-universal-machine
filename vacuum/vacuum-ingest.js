var VacuumIngest = {
  STORAGE_KEY: 'apple_ii_vacuum_v1',

  ingest: function(text) {
    if (!text || typeof text !== 'string') return null;
    var cleaned = text.trim();
    if (cleaned.length === 0) return null;

    var record = {
      id: 'vac_' + Date.now().toString(36),
      raw: cleaned,
      length: cleaned.length,
      wordCount: cleaned.split(/\s+/).length,
      sentenceCount: cleaned.split(/[.!?]+/).filter(function(s) { return s.trim().length > 0; }).length,
      charCount: cleaned.length,
      ingestedAt: new Date().toISOString(),
      mode: RuntimeRegistry.current
    };

    this._save(record);
    return record;
  },

  _save: function(record) {
    try {
      var all = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
      all.push(record);
      if (all.length > 100) all = all.slice(-100);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    } catch {}
  },

  getAll: function() {
    try { return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || []; }
    catch { return []; }
  },

  getLast: function() {
    var all = this.getAll();
    return all.length > 0 ? all[all.length - 1] : null;
  },

  render: function(record) {
    if (!record) return 'No data ingested.';
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  VACUUM INGESTION                                           ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  ID:       ' + record.id.padEnd(47) + '║',
      '║  WORDS:    ' + String(record.wordCount).padEnd(47) + '║',
      '║  SENTENCES:' + String(record.sentenceCount).padEnd(47) + '║',
      '║  CHARS:    ' + String(record.charCount).padEnd(47) + '║',
      '║  TIME:     ' + record.ingestedAt.substring(0, 19).padEnd(47) + '║',
      '║  MODE:     ' + record.mode.padEnd(47) + '║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
