var TourSteps = {
  STORAGE_KEY: 'apple_ii_tour_v1',
  completedSteps: [],

  steps: [
    { label: 'Boot system', command: 'Boot;', narration: 'Step one. Let\'s boot the system. This runs an Ada contract check, displays the boot art, and generates your first seal.' },
    { label: 'Run Help', command: 'Help;', narration: 'Step two. Let\'s see all available commands. Help shows every command grouped by layer.' },
    { label: 'Check Status', command: 'Status;', narration: 'Step three. Let\'s check system status. This shows version, vault events, seals, and runtime adapters.' },
    { label: 'Generate Seal', command: 'Seal;', narration: 'Step four. Let\'s generate a SHA-256 seal. This creates a cryptographic hash proving this action happened.' },
    { label: 'Check Vault', command: 'Vault;', narration: 'Step five. Let\'s look at the audit log. Every action you take is recorded here with timestamps and seals.' },
    { label: 'Spawn Agent', command: 'SpawnAgent "MyFirstAgent";', narration: 'Step six. Let\'s create your first agent. Agents are local simulations with roles, tools, and permissions.' },
    { label: 'Run Agent', command: 'RunAgent "MyFirstAgent" "analyze this system";', narration: 'Step seven. Let\'s run your agent on a task. It generates a role-appropriate response and seals the result.' },
    { label: 'Create Twin', command: 'CreateTwin "MyTwin";', narration: 'Step eight. Let\'s create a digital twin. Twins are like agents with different personalities and roles.' },
    { label: 'Run VM Trace', command: 'VMTrace boot_agent;', narration: 'Step nine. Let\'s run the full VM pipeline. This goes through Prolog, macros, bytecode, and machine view.' },
    { label: 'Export Proof', command: 'ExportProof;', narration: 'Step ten. Let\'s export everything. This downloads a JSON proof package with all your actions, seals, and audit trail.' }
  ],

  reset: function() {
    this.completedSteps = [];
    this._save();
  },

  complete: function(idx) {
    if (this.completedSteps.indexOf(idx) < 0) {
      this.completedSteps.push(idx);
      this._save();
    }
  },

  isCompleted: function(idx) {
    return this.completedSteps.indexOf(idx) >= 0;
  },

  getStep: function(idx) {
    return this.steps[idx] || null;
  },

  getAll: function() { return this.steps; },

  total: function() { return this.steps.length; },

  completedCount: function() { return this.completedSteps.length; },

  _save: function() {
    try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.completedSteps)); } catch {}
  },

  _load: function() {
    try { this.completedSteps = JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || []; } catch {}
  }
};
