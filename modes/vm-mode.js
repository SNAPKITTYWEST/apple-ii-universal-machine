var VmMode = {
  name: 'vm',
  label: 'VM Lab',
  theme: 'terminal-cyan',

  prompt: 'VM> ',
  helpExtra: function() {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  VM LAB MODE — Heterogeneous VM focus                   ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  Focus: Bytecode, Brainfuck, Prolog, Macros, VM         ║',
      '║  Assembly, Encoding, Fontana, Lisp                      ║',
      '║  All VM operations simulated locally                    ║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  filterCommands: function(cmds) {
    var allowed = ['help', 'boot', 'status', 'export', 'about', 'clear',
                   'asstatus', 'registers', 'opcodes', 'revunicode', 'glyphseal',
                   'restoreunicode', 'prostatus', 'macroexpand', 'bcrun',
                   'bfstatus', 'bfstep', 'bfreset', 'bfload', 'bftape',
                   'mvstatus', 'mvrun', 'vmtrace', 'fontanadecode',
                   'lisphelp', 'lispeval', 'fontanareact',
                   'lispexpand', 'lisptovm', 'listmodes', 'switchmode', 'currentmode'];
    return cmds.filter(function(c) { return allowed.indexOf(c.cmd.toLowerCase()) >= 0; });
  }
};
