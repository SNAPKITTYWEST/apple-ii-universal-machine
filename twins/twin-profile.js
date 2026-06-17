var TwinProfile = {
  responses: {
    'analyst': function(task) {
      return 'TWIN ANALYSIS: "' + task + '"\n\n' +
        'PATTERN MATCH: System operates on local-first principles\n' +
        'DATA FLOW: Browser → localStorage → Seal → Audit\n' +
        'RISK: Minimal — no external dependencies\n' +
        'CONFIDENCE: 0.92\n\n' +
        'Twin analysis complete.';
    },
    'builder': function(task) {
      return 'TWIN BUILD: "' + task + '"\n\n' +
        'COMPONENTS IDENTIFIED:\n' +
        '  - Core engine: 5 modules\n' +
        '  - Runtime layer: 4 adapters\n' +
        '  - UI: 2 terminals\n' +
        '  - Contracts: Ada + JS\n\n' +
        'BUILD PLAN: Simulated — ready for execution.';
    },
    'researcher': function(task) {
      return 'TWIN RESEARCH: "' + task + '"\n\n' +
        'SOURCES: Local simulation database\n' +
        'FINDINGS:\n' +
        '  - All agents are browser-simulated\n' +
        '  - No remote API calls\n' +
        '  - SHA-256 seals ensure integrity\n' +
        '  - Woz Vault provides audit trail\n\n' +
        'Research summary generated.';
    }
  },

  generateResponse: function(twin, task) {
    var handler = this.responses[twin.role] || this.responses['analyst'];
    return handler(task);
  }
};
