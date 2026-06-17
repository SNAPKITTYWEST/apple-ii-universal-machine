var MacroExpander = {
  macros: {
    'boot_agent':       ['CHECK_TRUST', 'LOAD_STATE', 'BOOT_AGENT', 'WRITE_AUDIT', 'SEAL'],
    'run_debate':       ['CHECK_TRUST', 'LOAD_STATE', 'INIT_DEBATE', 'ENKI_PROPOSE', 'SENTINEL_AUDIT', 'WRITE_AUDIT', 'SEAL'],
    'agent_status':     ['LOAD_STATE', 'READ_AUDIT', 'DISPLAY_STATUS'],
    'view_vault':       ['LOAD_STATE', 'READ_AUDIT', 'DISPLAY_VAULT'],
    'seal_action':      ['CHECK_TRUST', 'GENERATE_SEAL', 'WRITE_AUDIT', 'STORE_SEAL'],
    'clear_vault':      ['CHECK_TRUST', 'CONFIRM_USER', 'CLEAR_AUDIT', 'WRITE_AUDIT', 'SEAL'],
    'export_snapshot':  ['CHECK_TRUST', 'LOAD_STATE', 'READ_AUDIT', 'GENERATE_SNAPSHOT', 'SEAL'],
    'lisp_eval':        ['CHECK_TRUST', 'CHECK_CONTRACT', 'PARSE_SEXPR', 'EVAL_EXPR', 'WRITE_AUDIT', 'SEAL'],
    'fontana_react':    ['CHECK_TRUST', 'CHECK_CONTRACT', 'LOAD_SYMBOLS', 'REACT_SYMBOLS', 'WRITE_AUDIT', 'SEAL'],
    'vm_trace':         ['CHECK_TRUST', 'PROLOG_CHECK', 'MACRO_EXPAND', 'BYTECODE_PLAN', 'MACHINE_VIEW', 'WRITE_AUDIT', 'SEAL'],
    'machine_view':     ['CHECK_TRUST', 'CONVERT_OPCODE', 'DISPLAY_MACHINE', 'WRITE_AUDIT'],
    'brainfuck_run':    ['CHECK_TRUST', 'SANDBOX_INIT', 'TAPE_EXECUTE', 'DISPLAY_TAPE', 'WRITE_AUDIT', 'SEAL'],
    'bytecode_run':     ['CHECK_TRUST', 'PARSE_OPS', 'VM_EXECUTE', 'DISPLAY_RESULT', 'WRITE_AUDIT', 'SEAL']
  },

  expand: function(intent) {
    var key = intent.toLowerCase().replace(/[^a-z_]/g, '');
    var steps = this.macros[key];
    if (!steps) {
      steps = ['CHECK_TRUST', 'UNKNOWN_INTENT', 'WRITE_AUDIT'];
    }
    return {
      intent: intent,
      steps: steps,
      expanded: steps.join(' → ')
    };
  },

  render: function(result) {
    return [
      '╔══════════════════════════════════════╗',
      '║  MACRO EXPANDER (SIMULATED)          ║',
      '╠══════════════════════════════════════╣',
      '║  INTENT:  ' + result.intent.padEnd(27) + '║',
      '║  STEPS:                               ║',
      '║  ' + result.expanded.substring(0, 36).padEnd(36) + '║',
      '╚══════════════════════════════════════╝'
    ].join('\n');
  }
};
