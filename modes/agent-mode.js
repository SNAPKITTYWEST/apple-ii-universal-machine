var AgentMode = {
  name: 'agent',
  label: 'Agent Mode',
  theme: 'terminal-magenta',

  prompt: 'AGENT> ',
  helpExtra: function() {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  AGENT MODE — Digital twin orchestration                ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  Focus: Spawn, Run, Design, Inspect agents and twins    ║',
      '║  Mode switching, agent profiles, audit trail            ║',
      '║  All agent actions sealed with SHA-256                  ║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  filterCommands: function(cmds) {
    var allowed = ['help', 'boot', 'status', 'runtime', 'export', 'about', 'clear',
                   'spawnagent', 'listagents', 'runagent', 'inspectagent', 'deleteagent',
                   'createtwin', 'designtwin', 'listtwins', 'runtwin', 'inspecttwin', 'deletetwin',
                   'listmodes', 'switchmode', 'currentmode', 'vault', 'seal'];
    return cmds.filter(function(c) { return allowed.indexOf(c.cmd.toLowerCase()) >= 0; });
  }
};
