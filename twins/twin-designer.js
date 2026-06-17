var TwinDesigner = {
  create: async function(name) {
    var twin = {
      id: 'twin_' + Date.now().toString(36),
      name: name,
      role: 'analyst',
      personality: 'methodical',
      memoryRules: ['session-only', 'no-remote'],
      permissions: ['read', 'audit'],
      linkedAgents: [],
      createdAt: new Date().toISOString(),
      mode: RuntimeRegistry.current,
      lastRun: null,
      runCount: 0,
      seal: null
    };
    var s = await Seal.createSeal({ type: 'TWIN_CREATE', name: name });
    twin.seal = s.hash;
    TwinRegistry.save(twin);
    return twin;
  },

  design: async function(name, specs) {
    var twin = TwinRegistry.getByName(name);
    if (!twin) return null;
    if (specs.role) twin.role = specs.role;
    if (specs.personality) twin.personality = specs.personality;
    if (specs.memory) twin.memoryRules = [specs.memory, 'no-remote'];
    if (specs.permissions) twin.permissions = specs.permissions.split(',');
    if (specs.link) twin.linkedAgents = specs.link.split(',');
    var s = await Seal.createSeal({ type: 'TWIN_DESIGN', name: name, specs: specs });
    twin.seal = s.hash;
    TwinRegistry.save(twin);
    return twin;
  },

  renderProfile: function(twin) {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  DIGITAL TWIN PROFILE                                   ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  ID:          ' + twin.id.padEnd(43) + '║',
      '║  NAME:        ' + twin.name.padEnd(43) + '║',
      '║  ROLE:        ' + twin.role.padEnd(43) + '║',
      '║  PERSONALITY: ' + twin.personality.padEnd(43) + '║',
      '║  MEMORY:      ' + twin.memoryRules.join(', ').substring(0, 43).padEnd(43) + '║',
      '║  PERMISSIONS: ' + twin.permissions.join(', ').padEnd(43) + '║',
      '║  LINKED:      ' + (twin.linkedAgents.length > 0 ? twin.linkedAgents.join(', ') : 'none').padEnd(43) + '║',
      '║  MODE:        ' + twin.mode.padEnd(43) + '║',
      '║  RUNS:        ' + String(twin.runCount).padEnd(43) + '║',
      '║  CREATED:     ' + twin.createdAt.substring(0, 19).padEnd(43) + '║',
      '║  SEAL:        ' + (twin.seal || 'none').substring(0, 43).padEnd(43) + '║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
