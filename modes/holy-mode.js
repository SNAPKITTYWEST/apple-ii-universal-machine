var HolyMode = {
  name: 'holy',
  label: 'HolyC',
  theme: 'terminal-gold',

  prompt: 'HOLY> ',
  helpExtra: function() {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  HOLY MODE — Faith-governed agent runtime               ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  Focus: Trust, Agents, Twins, Vault, Seal, Debate       ║',
      '║  Ada contracts strictly enforced                        ║',
      '║  All actions sealed and audited                         ║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  filterCommands: function(cmds) {
    var allowed = ['help', 'boot', 'status', 'trust', 'agents', 'twins',
                   'vault', 'seal', 'debate', 'export', 'about', 'clear',
                   'clearvault', 'adastatus', 'contracts', 'spawnagent', 'listagents',
                   'runagent', 'inspectagent', 'deleteagent',
                   'createtwin', 'designtwin', 'listtwins', 'runtwin', 'inspecttwin', 'deletetwin',
                   'listmodes', 'switchmode', 'currentmode'];
    return cmds.filter(function(c) { return allowed.indexOf(c.cmd.toLowerCase()) >= 0; });
  }
};
