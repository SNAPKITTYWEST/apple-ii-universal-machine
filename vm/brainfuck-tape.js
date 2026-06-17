var BrainfuckTape = {
  MAX_CELLS: 30000,
  MAX_STEPS: 5000,

  run: function(program) {
    var tape = new Uint8Array(this.MAX_CELLS);
    var ptr = 0;
    var pc = 0;
    var steps = 0;
    var output = [];
    var log = [];

    // Pre-validate: check bracket balance
    var depth = 0;
    for (var i = 0; i < program.length; i++) {
      if (program[i] === '[') depth++;
      else if (program[i] === ']') { depth--; if (depth < 0) return { error: 'Unmatched ]', tape: [], steps: 0 }; }
    }
    if (depth !== 0) return { error: 'Unmatched [', tape: [], steps: 0 };

    while (pc < program.length && steps < this.MAX_STEPS) {
      steps++;
      var cmd = program[pc];

      switch (cmd) {
        case '>':
          ptr = (ptr + 1) % this.MAX_CELLS;
          break;
        case '<':
          ptr = (ptr - 1 + this.MAX_CELLS) % this.MAX_CELLS;
          break;
        case '+':
          tape[ptr] = (tape[ptr] + 1) & 0xFF;
          break;
        case '-':
          tape[ptr] = (tape[ptr] - 1 + 256) & 0xFF;
          break;
        case '.':
          output.push(String.fromCharCode(tape[ptr]));
          break;
        case ',':
          tape[ptr] = 0;
          break;
        case '[':
          if (tape[ptr] === 0) {
            var bd = 1;
            while (pc < program.length - 1 && bd > 0) {
              pc++;
              if (program[pc] === '[') bd++;
              else if (program[pc] === ']') bd--;
            }
          }
          break;
        case ']':
          if (tape[ptr] !== 0) {
            var bd = 1;
            while (pc > 0 && bd > 0) {
              pc--;
              if (program[pc] === ']') bd++;
              else if (program[pc] === '[') bd--;
            }
          }
          break;
      }
      pc++;
    }

    // Preview: first 20 non-zero cells
    var preview = [];
    for (var i = 0; i < Math.min(this.MAX_CELLS, 256); i++) {
      if (tape[i] !== 0) preview.push(i + ':' + tape[i]);
    }

    return {
      program: program,
      output: output.join(''),
      steps: steps,
      halted: steps >= this.MAX_STEPS,
      preview: preview.slice(0, 10),
      asciiArt: this._renderTape(tape)
    };
  },

  _renderTape: function(tape) {
    var cells = [];
    for (var i = 0; i < 32; i++) {
      cells.push(String(tape[i]).padStart(3));
    }
    return 'TAPE[0..31]: [' + cells.join(' ') + ']';
  },

  render: function(r) {
    if (r.error) {
      return 'BRAINFUCK ERROR: ' + r.error;
    }
    return [
      '╔══════════════════════════════════════╗',
      '║  BRAINFUCK TAPE (SANDBOXED)          ║',
      '╠══════════════════════════════════════╣',
      '║  PROGRAM: ' + r.program.substring(0, 28).padEnd(28) + '║',
      '║  STEPS:   ' + String(r.steps).padEnd(28) + '║',
      '║  OUTPUT:  ' + (r.output || '(empty)').substring(0, 28).padEnd(28) + '║',
      '║  HALTED:  ' + String(r.halted).padEnd(28) + '║',
      '║  ' + r.asciiArt.substring(0, 36).padEnd(36) + '║',
      '╚══════════════════════════════════════╝'
    ].join('\n');
  }
};
