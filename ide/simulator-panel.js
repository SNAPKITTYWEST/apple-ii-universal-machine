var SimulatorPanel = {
  currentView: 'terminal',
  views: ['terminal', 'agent', 'twin', 'vm', 'envelope'],

  switchView: function(view) {
    if (this.views.indexOf(view) >= 0) {
      this.currentView = view;
      this.render();
    }
  },

  getPreview: function() {
    switch (this.currentView) {
      case 'terminal':
        return this._terminalPreview();
      case 'agent':
        return this._agentPreview();
      case 'twin':
        return this._twinPreview();
      case 'vm':
        return this._vmPreview();
      case 'envelope':
        return this._envelopePreview();
      default:
        return 'Unknown view.';
    }
  },

  _terminalPreview: function() {
    var vault = typeof WozVault !== 'undefined' ? WozVault.readAuditLog().length : 0;
    var seals = typeof Seal !== 'undefined' ? 'SHA-256' : 'N/A';
    return [
      '┌─────────────────────────────────────┐',
      '│  APPLE II TERMINAL SIMULATOR        │',
      '├─────────────────────────────────────┤',
      '│  Vault events: ' + String(vault).padEnd(20) + '│',
      '│  Seal engine:  ' + seals.padEnd(20) + '│',
      '│  Mode:         ' + (typeof RuntimeRegistry !== 'undefined' ? RuntimeRegistry.current : 'unknown').padEnd(20) + '│',
      '│  Status:       SIMULATED ✓          │',
      '└─────────────────────────────────────┘'
    ].join('\n');
  },

  _agentPreview: function() {
    var count = typeof AgentRegistry !== 'undefined' ? AgentRegistry.count() : 0;
    return [
      '┌─────────────────────────────────────┐',
      '│  AGENT SIMULATOR                    │',
      '├─────────────────────────────────────┤',
      '│  Agents: ' + String(count).padEnd(28) + '│',
      '│  Ollama: ' + (typeof OllamaAdapter !== 'undefined' && OllamaAdapter.isOnline ? 'ONLINE' : 'OFFLINE').padEnd(28) + '│',
      '│  Model:  ' + (typeof OllamaAdapter !== 'undefined' ? (OllamaAdapter.currentModel || 'none') : 'none').padEnd(28) + '│',
      '│  Status: SIMULATED                  │',
      '└─────────────────────────────────────┘'
    ].join('\n');
  },

  _twinPreview: function() {
    var count = typeof TwinRegistry !== 'undefined' ? TwinRegistry.count() : 0;
    return [
      '┌─────────────────────────────────────┐',
      '│  DIGITAL TWIN SIMULATOR             │',
      '├─────────────────────────────────────┤',
      '│  Twins: ' + String(count).padEnd(29) + '│',
      '│  Status: SIMULATED                  │',
      '└─────────────────────────────────────┘'
    ].join('\n');
  },

  _vmPreview: function() {
    return [
      '┌─────────────────────────────────────┐',
      '│  VM LAB SIMULATOR                   │',
      '├─────────────────────────────────────┤',
      '│  Prolog:  SIMULATED                 │',
      '│  Bytecode: ONLINE                   │',
      '│  Brainfuck: SANDBOXED               │',
      '│  Macros:  ONLINE                    │',
      '│  Status:  SIMULATED                 │',
      '└─────────────────────────────────────┘'
    ].join('\n');
  },

  _envelopePreview: function() {
    var ev = typeof EnvelopeBuilder !== 'undefined' && EnvelopeBuilder.lastEnvelope;
    return [
      '┌─────────────────────────────────────┐',
      '│  ENVELOPE SIMULATOR                 │',
      '├─────────────────────────────────────┤',
      '│  Last: ' + (ev ? ev.envelopeId.substring(0, 28) : 'none').padEnd(30) + '│',
      '│  Verified: ' + (ev && ev.verified ? 'YES ✓' : 'NO').padEnd(27) + '│',
      '│  Status: SIMULATED                  │',
      '└─────────────────────────────────────┘'
    ].join('\n');
  },

  render: function() {
    var panel = document.getElementById('simulator-content');
    if (!panel) return;
    panel.innerHTML = '<pre class="sim-preview">' + this.getPreview() + '</pre>';
  },

  renderToString: function() { return this.getPreview(); }
};
