var WindowsMode = {
  name: 'windows',
  label: 'Windows',
  theme: 'terminal-blue',

  prompt: 'PS> ',
  helpExtra: function() {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  WINDOWS MODE — PowerShell-style commands               ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  Focus: Boot, Status, Runtime, Export, About            ║',
      '║  Emphasis on system management simulation               ║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  filterCommands: function(cmds) {
    var allowed = ['help', 'boot', 'status', 'runtime', 'export', 'about', 'clear',
                   'adastatus', 'contracts', 'swstatus', 'wbstatus', 'osstatus', 'wasstatus', 'vms'];
    return cmds.filter(function(c) { return allowed.indexOf(c.cmd.toLowerCase()) >= 0; });
  }
};
