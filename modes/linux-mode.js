var LinuxMode = {
  name: 'linux',
  label: 'Linux',
  theme: 'terminal-amber',

  prompt: '$ ',
  helpExtra: function() {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  LINUX MODE — Shell-focused commands                    ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  Focus: Boot, Status, Runtime, Export, About            ║',
      '║  Emphasis on system commands and shell simulation       ║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  filterCommands: function(cmds) {
    var allowed = ['help', 'boot', 'status', 'runtime', 'export', 'about', 'clear',
                   'adastatus', 'contracts', 'astatus', 'lhelp', 'leval',
                   'asstatus', 'registers', 'opcodes', 'prostatus', 'bfstatus',
                   'swstatus', 'wbstatus', 'osstatus', 'wasstatus', 'vms'];
    return cmds.filter(function(c) { return allowed.indexOf(c.cmd.toLowerCase()) >= 0; });
  }
};
