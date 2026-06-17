var ModelRegistry = {
  defaults: [
    { name: 'llama3.2',        desc: 'Meta Llama 3.2 — general purpose',    best: 'general' },
    { name: 'llama3.1',        desc: 'Meta Llama 3.1 — fast inference',     best: 'speed' },
    { name: 'mistral',         desc: 'Mistral 7B — efficient reasoning',    best: 'reasoning' },
    { name: 'codellama',       desc: 'Code Llama — code generation',        best: 'code' },
    { name: 'phi3',            desc: 'Microsoft Phi-3 — small & capable',   best: 'compact' },
    { name: 'gemma2',          desc: 'Google Gemma 2 — balanced',           best: 'balanced' },
    { name: 'qwen2.5',         desc: 'Alibaba Qwen 2.5 — multilingual',    best: 'multilingual' },
    { name: 'deepseek-coder',  desc: 'DeepSeek Coder — code specialist',    best: 'code' },
    { name: 'neural-chat',     desc: 'Intel Neural Chat — conversational',  best: 'chat' },
    { name: 'starling-lm',     desc: 'Starling LM — RLHF-tuned',           best: 'alignment' }
  ],

  detectedModels: [],

  syncWithAdapter: function() {
    if (OllamaAdapter.models.length > 0) {
      this.detectedModels = OllamaAdapter.models.map(function(m) {
        var known = ModelRegistry.defaults.find(function(d) { return d.name === m.name; });
        return {
          name: m.name,
          desc: known ? known.desc : 'Local model',
          best: known ? known.best : 'general',
          size: m.size,
          detected: true
        };
      });
    }
  },

  getAll: function() {
    var self = this;
    var detected = this.detectedModels.map(function(m) { return m.name; });
    var defaults = this.defaults.filter(function(d) { return detected.indexOf(d.name) < 0; });
    return this.detectedModels.concat(defaults.map(function(d) {
      return { name: d.name, desc: d.desc, best: d.best, size: null, detected: false };
    }));
  },

  getByBest: function(category) {
    return this.getAll().filter(function(m) { return m.best === category; });
  },

  getDetected: function() { return this.detectedModels; },

  renderList: function() {
    var models = this.getAll();
    var lines = [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  OLLAMA MODELS                                              ║',
      '╠══════════════════════════════════════════════════════════════╣'
    ];
    models.forEach(function(m) {
      var tag = m.detected ? ' [DETECTED]' : '';
      var sz = m.size ? (' (' + (m.size / 1073741824).toFixed(1) + 'GB)') : '';
      lines.push('║  ' + m.name.padEnd(18) + ' │ ' + m.best.padEnd(12) + ' │ ' + m.desc.substring(0, 25).padEnd(25) + tag + sz + '║');
    });
    lines.push('╚══════════════════════════════════════════════════════════════╝');
    return lines.join('\n');
  }
};
