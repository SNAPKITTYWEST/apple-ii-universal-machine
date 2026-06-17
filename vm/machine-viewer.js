var MachineViewer = {
  opcodes: {
    'boot_agent':       ['0xB0', '0x07', '0x5E', '0xA1'],
    'run_debate':       ['0xB1', '0x14', '0x5E', '0xC3'],
    'agent_status':     ['0xB2', '0x03', '0x5E', '0xD5'],
    'view_vault':       ['0xB3', '0x09', '0x5E', '0xE7'],
    'seal_action':      ['0xB4', '0x22', '0x5E', '0xF9'],
    'clear_vault':      ['0xB5', '0x3A', '0x5E', '0x0B'],
    'export_snapshot':  ['0xB6', '0x44', '0x5E', '0x1D'],
    'lisp_eval':        ['0xB7', '0x51', '0x5E', '0x2F'],
    'fontana_react':    ['0xB8', '0x68', '0x5E', '0x41'],
    'vm_trace':         ['0xB9', '0x7F', '0x5E', '0x53'],
    'brainfuck_run':    ['0xBA', '0x8C', '0x5E', '0x65'],
    'bytecode_run':     ['0xBB', '0x99', '0x5E', '0x77']
  },

  labels: {
    'boot_agent': 'BOOT',
    'run_debate': 'DEBATE',
    'agent_status': 'STATUS',
    'view_vault': 'VAULT',
    'seal_action': 'SEAL',
    'clear_vault': 'CLEAR',
    'export_snapshot': 'EXPORT',
    'lisp_eval': 'LISP',
    'fontana_react': 'FONTANA',
    'vm_trace': 'VMTRACE',
    'brainfuck_run': 'BF',
    'bytecode_run': 'BYTECODE'
  },

  view: function(intent) {
    var key = intent.toLowerCase().replace(/[^a-z_]/g, '');
    var bytes = this.opcodes[key] || ['0xFF', '0xFF', '0xFF', '0xFF'];
    var label = this.labels[key] || 'UNKNOWN';
    return {
      intent: intent,
      bytes: bytes,
      label: label,
      assembly: label + ': ' + bytes.join(' '),
      warning: 'SIMULATED ARTIFACT — NOT EXECUTED'
    };
  },

  render: function(r) {
    return [
      '╔══════════════════════════════════════╗',
      '║  MACHINE CODE VIEWER (SIMULATED)     ║',
      '╠══════════════════════════════════════╣',
      '║  INTENT:    ' + r.intent.padEnd(25) + '║',
      '║  LABEL:     ' + r.label.padEnd(25) + '║',
      '║  OPCODES:   ' + r.bytes.join(' ').padEnd(25) + '║',
      '║  ASSEMBLY:  ' + r.assembly.substring(0, 25).padEnd(25) + '║',
      '║                                       ║',
      '║  ⚠ ' + r.warning.padEnd(35) + '║',
      '╚══════════════════════════════════════╝'
    ].join('\n');
  }
};
