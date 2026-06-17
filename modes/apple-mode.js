var AppleMode = {
  name: 'apple',
  label: 'Apple II',
  theme: 'terminal-green',

  prompt: '> ',
  helpExtra: function() {
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  APPLE II MODE — Full command set                       ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  All commands available. Boot, Status, Trust, Agents,   ║',
      '║  Twins, Vault, Seal, Debate, Runtime, Export, About,    ║',
      '║  Clear, and all layer-specific commands.                ║',
      '╚══════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  filterCommands: function(cmds) { return cmds; }
};
