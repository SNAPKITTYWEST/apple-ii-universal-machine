var AgentCommands = {
  help: function() {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  AGENT COMMANDS                                         ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  AgentHelp;                  — show this                ║',
      '║  SpawnAgent "Name";          — create agent             ║',
      '║  SpawnAgent "Name" role;     — create with role         ║',
      '║  ListAgents;                 — list all agents          ║',
      '║  RunAgent "Name" "task";     — run agent on task        ║',
      '║  InspectAgent "Name";        — view agent profile       ║',
      '║  DeleteAgent "Name";         — remove agent             ║',
      '║                                                         ║',
      '║  ROLES: researcher, auditor, builder, debater,          ║',
      '║        archivist, sentinel, explorer, translator        ║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  spawn: async function(args) {
    var name = args[0] || 'Agent_' + Date.now().toString(36).slice(-4);
    var role = args[1] || 'researcher';
    var c = ContractRegistry.check('runtime');
    if (!c.allowed) return { output: 'ADA CONTRACT: DENIED — ' + c.reason, type: 'error' };
    var agent = await AgentSpawner.spawn(name, role);
    return { output: AgentSpawner.renderProfile(agent), type: 'success', agent: agent };
  },

  list: function() {
    var agents = AgentRegistry.getAll();
    if (agents.length === 0) return { output: 'No agents spawned yet.', type: 'info' };
    var lines = ['╔══════════════════════════════════════════════════════════╗', '║  AGENTS (' + String(agents.length).padStart(2) + ' registered)' + ' '.repeat(39) + '║', '╠══════════════════════════════════════════════════════════╣'];
    agents.forEach(function(a) {
      lines.push('║  ' + a.name.padEnd(14) + ' │ ' + a.role.padEnd(12) + ' │ runs:' + String(a.runCount).padStart(3) + '       ║');
    });
    lines.push('╚══════════════════════════════════════════════════════════╝');
    return { output: lines.join('\n'), type: 'success' };
  },

  run: async function(args) {
    var name = args[0] || '';
    var task = args.slice(1).join(' ') || 'analyze system';
    if (!name) return { output: 'Usage: RunAgent "Name" "task";', type: 'error' };
    var result = await AgentRunner.run(name, task);
    return { output: AgentRunner.render(result), type: 'success' };
  },

  inspect: function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: InspectAgent "Name";', type: 'error' };
    var agent = AgentRegistry.getByName(name);
    if (!agent) return { output: 'Agent "' + name + '" not found.', type: 'error' };
    return { output: AgentSpawner.renderProfile(agent), type: 'success' };
  },

  delete: function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: DeleteAgent "Name";', type: 'error' };
    var agent = AgentRegistry.getByName(name);
    if (!agent) return { output: 'Agent "' + name + '" not found.', type: 'error' };
    AgentRegistry.remove(agent.id);
    return { output: 'Agent "' + name + '" deleted.', type: 'success' };
  }
};
