var AgentSpawner = {
  roles: {
    'researcher':  { tools: ['search', 'summarize', 'cite'],      permissions: ['read', 'audit'], memory: 'session' },
    'auditor':     { tools: ['verify', 'seal', 'log'],           permissions: ['read', 'audit'], memory: 'persistent' },
    'builder':     { tools: ['create', 'edit', 'compile'],       permissions: ['read', 'write'], memory: 'session' },
    'debater':     { tools: ['propose', 'challenge', 'synthesize'], permissions: ['read', 'audit'], memory: 'session' },
    'archivist':   { tools: ['store', 'index', 'retrieve'],      permissions: ['read', 'write'], memory: 'persistent' },
    'sentinel':    { tools: ['monitor', 'alert', 'block'],       permissions: ['read', 'audit'], memory: 'persistent' },
    'explorer':    { tools: ['scan', 'map', 'discover'],         permissions: ['read'],          memory: 'session' },
    'translator':  { tools: ['decode', 'encode', 'transform'],   permissions: ['read', 'write'], memory: 'session' }
  },

  spawn: async function(name, role) {
    role = (role || 'researcher').toLowerCase();
    var profile = this.roles[role] || this.roles['researcher'];
    var agent = {
      id: 'agent_' + Date.now().toString(36),
      name: name,
      role: role,
      tools: profile.tools,
      permissions: profile.permissions,
      memoryScope: profile.memory,
      createdAt: new Date().toISOString(),
      mode: RuntimeRegistry.current,
      lastRun: null,
      runCount: 0,
      seal: null
    };
    var s = await Seal.createSeal({ type: 'AGENT_SPAWN', name: name, role: role });
    agent.seal = s.hash;
    AgentRegistry.save(agent);
    return agent;
  },

  renderProfile: function(agent) {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  AGENT PROFILE                                          ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  ID:          ' + agent.id.padEnd(43) + '║',
      '║  NAME:        ' + agent.name.padEnd(43) + '║',
      '║  ROLE:        ' + agent.role.padEnd(43) + '║',
      '║  TOOLS:       ' + agent.tools.join(', ').substring(0, 43).padEnd(43) + '║',
      '║  PERMISSIONS: ' + agent.permissions.join(', ').padEnd(43) + '║',
      '║  MEMORY:      ' + agent.memoryScope.padEnd(43) + '║',
      '║  MODE:        ' + agent.mode.padEnd(43) + '║',
      '║  RUNS:        ' + String(agent.runCount).padEnd(43) + '║',
      '║  CREATED:     ' + agent.createdAt.substring(0, 19).padEnd(43) + '║',
      '║  SEAL:        ' + (agent.seal || 'none').substring(0, 43).padEnd(43) + '║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
