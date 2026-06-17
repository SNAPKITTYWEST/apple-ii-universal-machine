var TwinCommands = {
  help: function() {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  DIGITAL TWIN COMMANDS                                  ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  TwinHelp;                              — show this     ║',
      '║  CreateTwin "Name";                     — create twin   ║',
      '║  DesignTwin "Name" role="x" mem="y";   — design twin   ║',
      '║  ListTwins;                             — list twins    ║',
      '║  RunTwin "Name" "task";                 — run twin      ║',
      '║  InspectTwin "Name";                    — view profile  ║',
      '║  DeleteTwin "Name";                     — remove twin   ║',
      '║                                                            ║',
      '║  ROLES: analyst, builder, researcher                      ║',
      '║  MEMORY: session-only, persistent                         ║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  create: async function(args) {
    var name = args[0] || 'Twin_' + Date.now().toString(36).slice(-4);
    var c = ContractRegistry.check('runtime');
    if (!c.allowed) return { output: 'ADA CONTRACT: DENIED — ' + c.reason, type: 'error' };
    var twin = await TwinDesigner.create(name);
    return { output: TwinDesigner.renderProfile(twin), type: 'success', twin: twin };
  },

  design: async function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: DesignTwin "Name" role="x" memory="y";', type: 'error' };
    var specs = {};
    args.slice(1).forEach(function(a) {
      var m = a.match(/^(\w+)="([^"]*)"$/);
      if (m) specs[m[1]] = m[2];
    });
    var twin = await TwinDesigner.design(name, specs);
    if (!twin) return { output: 'Twin "' + name + '" not found.', type: 'error' };
    return { output: TwinDesigner.renderProfile(twin), type: 'success' };
  },

  list: function() {
    var twins = TwinRegistry.getAll();
    if (twins.length === 0) return { output: 'No twins created yet.', type: 'info' };
    var lines = ['╔══════════════════════════════════════════════════════════╗', '║  TWINS (' + String(twins.length).padStart(2) + ' registered)' + ' '.repeat(40) + '║', '╠══════════════════════════════════════════════════════════╣'];
    twins.forEach(function(t) {
      lines.push('║  ' + t.name.padEnd(14) + ' │ ' + t.role.padEnd(12) + ' │ runs:' + String(t.runCount).padStart(3) + '       ║');
    });
    lines.push('╚══════════════════════════════════════════════════════════╝');
    return { output: lines.join('\n'), type: 'success' };
  },

  run: async function(args) {
    var name = args[0] || '';
    var task = args.slice(1).join(' ') || 'analyze system';
    if (!name) return { output: 'Usage: RunTwin "Name" "task";', type: 'error' };
    var result = await TwinRunner.run(name, task);
    return { output: TwinRunner.render(result), type: 'success' };
  },

  inspect: function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: InspectTwin "Name";', type: 'error' };
    var twin = TwinRegistry.getByName(name);
    if (!twin) return { output: 'Twin "' + name + '" not found.', type: 'error' };
    return { output: TwinDesigner.renderProfile(twin), type: 'success' };
  },

  delete: function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: DeleteTwin "Name";', type: 'error' };
    var twin = TwinRegistry.getByName(name);
    if (!twin) return { output: 'Twin "' + name + '" not found.', type: 'error' };
    TwinRegistry.remove(twin.id);
    return { output: 'Twin "' + name + '" deleted.', type: 'success' };
  }
};
