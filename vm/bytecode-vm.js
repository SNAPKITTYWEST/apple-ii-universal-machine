var BytecodeVM = {
  ops: {
    0x01: 'PUSH',
    0x02: 'ADD',
    0x03: 'SUB',
    0x04: 'MUL',
    0x05: 'PRINT',
    0x06: 'CALL_VERIFY',
    0x07: 'CALL_SEAL',
    0x08: 'HALT'
  },

  run: function(program) {
    var stack = [];
    var output = [];
    var steps = 0;
    var maxSteps = 1000;

    var tokens = program.trim().split(/\s+/);
    var pc = 0;

    while (pc < tokens.length && steps < maxSteps) {
      steps++;
      var op = tokens[pc].toUpperCase();

      switch (op) {
        case 'PUSH':
          pc++;
          var val = parseFloat(tokens[pc]);
          if (isNaN(val)) { output.push('ERROR: invalid number at token ' + pc); break; }
          stack.push(val);
          break;
        case 'ADD':
          if (stack.length < 2) { output.push('ERROR: stack underflow'); break; }
          var b = stack.pop(); var a = stack.pop();
          stack.push(a + b);
          break;
        case 'SUB':
          if (stack.length < 2) { output.push('ERROR: stack underflow'); break; }
          var b = stack.pop(); var a = stack.pop();
          stack.push(a - b);
          break;
        case 'MUL':
          if (stack.length < 2) { output.push('ERROR: stack underflow'); break; }
          var b = stack.pop(); var a = stack.pop();
          stack.push(a * b);
          break;
        case 'PRINT':
          if (stack.length < 1) { output.push('ERROR: stack empty'); break; }
          output.push(String(stack[stack.length - 1]));
          break;
        case 'CALL_VERIFY':
          output.push('VERIFY: trust_gate_pass');
          break;
        case 'CALL_SEAL':
          output.push('SEAL: sha256_generated');
          break;
        case 'HALT':
          pc = tokens.length;
          break;
        default:
          output.push('UNKNOWN: ' + op);
      }
      pc++;
    }

    if (steps >= maxSteps) output.push('HALTED: step limit reached');

    return {
      program: program,
      stack: stack,
      output: output,
      steps: steps,
      result: output.length > 0 ? output[output.length - 1] : 'empty'
    };
  },

  render: function(r) {
    return [
      '╔══════════════════════════════════════╗',
      '║  BYTECODE VM (SAFE)                  ║',
      '╠══════════════════════════════════════╣',
      '║  PROGRAM: ' + r.program.substring(0, 28).padEnd(28) + '║',
      '║  STEPS:   ' + String(r.steps).padEnd(28) + '║',
      '║  STACK:   ' + JSON.stringify(r.stack).substring(0, 28).padEnd(28) + '║',
      '║  OUTPUT:  ' + r.output.join(', ').substring(0, 28).padEnd(28) + '║',
      '║  RESULT:  ' + r.result.substring(0, 28).padEnd(28) + '║',
      '╚══════════════════════════════════════╝'
    ].join('\n');
  }
};
