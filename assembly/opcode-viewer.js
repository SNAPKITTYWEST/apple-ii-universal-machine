var OpcodeViewer = {
  opcodes: {
    BOOT:   { hex: '0x00', mnemonic: 'BOOT',   operand: 'SUN',    desc: 'Initialize system' },
    SEAL:   { hex: '0x01', mnemonic: 'SEAL',   operand: 'SHA256', desc: 'Generate audit seal' },
    TRUST:  { hex: '0x02', mnemonic: 'TRUST',  operand: 'DEED',   desc: 'Verify trust deed' },
    VAULT:  { hex: '0x03', mnemonic: 'VAULT',  operand: 'READ',   desc: 'Read Woz Vault' },
    DEBATE: { hex: '0x04', mnemonic: 'DEBATE', operand: 'TOPIC',  desc: 'Run ENKI/SENTINEL' },
    AGENT:  { hex: '0x05', mnemonic: 'AGENT',  operand: 'STAT',   desc: 'Agent status' },
    LISP:   { hex: '0x06', mnemonic: 'LISP',   operand: 'EVAL',   desc: 'Evaluate s-expr' },
    ASM:    { hex: '0x07', mnemonic: 'ASM',    operand: 'VIEW',   desc: 'View opcodes' },
    EXPORT: { hex: '0x08', mnemonic: 'EXPORT', operand: 'JSON',   desc: 'Export vault' },
    CLEAR:  { hex: '0x09', mnemonic: 'CLEAR',  operand: 'MEM',    desc: 'Clear memory' }
  },

  lookup: function(command) {
    var key = command.toUpperCase().replace(/[^A-Z]/g, '');
    return this.opcodes[key] || { hex: '0xFF', mnemonic: '???', operand: '???', desc: 'Unknown opcode' };
  },

  renderFor: function(command) {
    var op = this.lookup(command);
    return [
      '╔══════════════════════════════════════╗',
      '║  OPCODE VIEWER (SIMULATED)           ║',
      '╠══════════════════════════════════════╣',
      '║  COMMAND:  ' + command.padEnd(27) + '║',
      '║  HEX:      ' + op.hex.padEnd(27) + '║',
      '║  MNEMONIC: ' + op.mnemonic.padEnd(27) + '║',
      '║  OPERAND:  ' + op.operand.padEnd(27) + '║',
      '║  DESC:     ' + op.desc.padEnd(27) + '║',
      '╚══════════════════════════════════════╝'
    ].join('\n');
  }
};
