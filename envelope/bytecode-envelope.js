var BytecodeEnvelope = {
  compileLispToBytecode: function(lispExpr) {
    if (!lispExpr) return ['PUSH_UNKNOWN', 'HALT'];

    var tokens = lispExpr.replace(/[()]/g, ' ').trim().split(/\s+/).filter(function(t) { return t.length > 0; });
    var bytecode = [];

    bytecode.push('PUSH_EVENT');

    tokens.forEach(function(token) {
      var lower = token.toLowerCase();
      if (lower === 'event') bytecode.push('DEFINE_EVENT');
      else if (lower === 'schema') bytecode.push('DEFINE_SCHEMA');
      else if (lower === 'entities') bytecode.push('LOAD_ENTITIES');
      else if (lower === 'pipeline') bytecode.push('START_PIPELINE');
      else if (lower === 'agent') bytecode.push('LOAD_AGENT');
      else if (lower === 'trust') bytecode.push('CHECK_TRUST');
      else if (lower === 'seal') bytecode.push('SEAL');
      else if (lower === 'audit') bytecode.push('AUDIT_WRITE');
      else if (lower === 'deploy') bytecode.push('DEPLOY');
      else if (lower === 'create') bytecode.push('CREATE');
      else if (lower === 'delete') bytecode.push('DELETE');
      else if (lower === 'run') bytecode.push('EXECUTE');
      else bytecode.push('PUSH "' + token + '"');
    });

    bytecode.push('VERIFY');
    bytecode.push('SEAL');
    bytecode.push('AUDIT_WRITE');
    bytecode.push('HALT');

    return bytecode;
  },

  run: function(bytecode) {
    if (!bytecode || bytecode.length === 0) return { output: [], steps: 0, error: 'Empty bytecode' };

    var stack = [];
    var output = [];
    var steps = 0;
    var maxSteps = 100;

    for (var i = 0; i < bytecode.length && steps < maxSteps; i++) {
      var op = bytecode[i];
      steps++;

      if (op.startsWith('PUSH ')) {
        var val = op.substring(5).replace(/"/g, '');
        stack.push(val);
        output.push('PUSH ' + val);
      } else if (op === 'DEFINE_EVENT') {
        output.push('DEFINE_EVENT ✓');
      } else if (op === 'DEFINE_SCHEMA') {
        output.push('DEFINE_SCHEMA ✓');
      } else if (op === 'LOAD_ENTITIES') {
        output.push('LOAD_ENTITIES ✓');
      } else if (op === 'START_PIPELINE') {
        output.push('START_PIPELINE ✓');
      } else if (op === 'LOAD_AGENT') {
        output.push('LOAD_AGENT ✓');
      } else if (op === 'CHECK_TRUST') {
        output.push('CHECK_TRUST ✓');
      } else if (op === 'SEAL') {
        output.push('SEAL ✓');
      } else if (op === 'AUDIT_WRITE') {
        output.push('AUDIT_WRITE ✓');
      } else if (op === 'DEPLOY') {
        output.push('DEPLOY ✓');
      } else if (op === 'CREATE') {
        output.push('CREATE ✓');
      } else if (op === 'DELETE') {
        output.push('DELETE ✓');
      } else if (op === 'EXECUTE') {
        output.push('EXECUTE ✓');
      } else if (op === 'VERIFY') {
        output.push('VERIFY ✓');
      } else if (op === 'HALT') {
        output.push('HALT');
        break;
      } else {
        output.push('OP: ' + op);
      }
    }

    return {
      output: output,
      steps: steps,
      halted: steps < maxSteps
    };
  },

  render: function(bytecode, result) {
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  BYTECODE EXECUTION                                         ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  PROGRAM: ' + bytecode.join(' → ').substring(0, 47).padEnd(47) + '║',
      '║  STEPS:   ' + String(result.steps).padEnd(47) + '║',
      '║  STATUS:  ' + (result.halted ? 'HALTED ✓' : 'MAX STEPS').padEnd(47) + '║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  TRACE:                                                     ║'
    ].concat(result.output.map(function(o) { return '║    ' + o.substring(0, 53).padEnd(53) + '║'; }))
    .concat(['╚══════════════════════════════════════════════════════════════╝'])
    .join('\n');
  }
};
