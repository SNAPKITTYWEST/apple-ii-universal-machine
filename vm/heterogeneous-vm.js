var HeterogeneousVM = {
  traceIntent: function(intent) {
    var key = intent.toLowerCase().replace(/[^a-z_]/g, '');

    // 1. Prolog gate
    var prologQuery = 'allowed(' + key + ')';
    var prologResult = PrologSim.ask(prologQuery);

    // 2. Macro expansion
    var macroResult = MacroExpander.expand(key);

    // 3. Bytecode plan
    var bytecodeProgram = 'PUSH 1 PUSH 2 ADD PRINT HALT';
    var bytecodeResult = BytecodeVM.run(bytecodeProgram);

    // 4. Brainfuck sample
    var bfResult = BrainfuckTape.run('++>+++<[->+<]>.');

    // 5. Machine artifact
    var machineResult = MachineViewer.view(key);

    // 5b. Forth — agent persona execution
    var forthProgram = [
      ': AGENT-RUN',
      '  ." [FORTH] Intent: " CR',
      '  TRUST-DEED?',
      '  IF ." Trust Deed: OPEN → routing to FRANKENSTEIN " CR',
      '  ELSE DROP ." Trust Deed: BLOCKED " CR THEN',
      ';',
      key.toUpperCase() + ' AGENT-RUN'
    ].join('\n');
    var forthResult = (typeof ForthVM !== 'undefined')
      ? ForthVM.run(forthProgram)
      : { output: '[ForthVM not loaded]', stack: [], trace: [] };

    // 6. Seal payload
    var sealPayload = {
      intent: key,
      prolog: prologResult.result,
      macro_steps: macroResult.steps.length,
      bytecode_steps: bytecodeResult.steps,
      bf_steps: bfResult.steps,
      machine_bytes: machineResult.bytes,
      forth_output: forthResult.output,
      timestamp: new Date().toISOString()
    };

    return {
      intent: intent,
      prolog: prologResult,
      macro: macroResult,
      bytecode: bytecodeResult,
      brainfuck: bfResult,
      machine: machineResult,
      forth: forthResult,
      sealPayload: sealPayload
    };
  },

  render: function(r) {
    var lines = [
      '╔══════════════════════════════════════════════════════════╗',
      '║  HETEROGENEOUS VM TRACE                                 ║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  INTENT: ' + r.intent.padEnd(49) + '║',
      '╠══════════════════════════════════════════════════════════╣'
    ];

    // Prolog
    lines.push('║  [1] PROLOG GATE                                         ║');
    lines.push('║      QUERY:  ' + r.prolog.query.padEnd(42) + '║');
    lines.push('║      RESULT: ' + r.prolog.result.padEnd(42) + '║');

    // Macro
    lines.push('║  [2] MACRO EXPANSION                                     ║');
    lines.push('║      STEPS:  ' + r.macro.expanded.substring(0, 42).padEnd(42) + '║');

    // Bytecode
    lines.push('║  [3] BYTECODE PLAN                                       ║');
    lines.push('║      RESULT: ' + r.bytecode.result.padEnd(42) + '║');
    lines.push('║      STACK:  ' + JSON.stringify(r.bytecode.stack).substring(0, 42).padEnd(42) + '║');

    // Brainfuck
    lines.push('║  [4] BRAINFUCK TAPE                                      ║');
    lines.push('║      STEPS:  ' + String(r.brainfuck.steps).padEnd(42) + '║');
    lines.push('║      OUTPUT: ' + (r.brainfuck.output || '(empty)').padEnd(42) + '║');

    // Machine
    lines.push('║  [5] MACHINE ARTIFACT                                    ║');
    lines.push('║      OPCODES: ' + r.machine.bytes.join(' ').padEnd(41) + '║');
    lines.push('║      ⚠ SIMULATED — NOT EXECUTED' + ' '.repeat(22) + '║');

    // Forth
    if (r.forth) {
      lines.push('║  [6] FORTH AGENT PERSONA                                 ║');
      var forthOut = (r.forth.output || '').replace(/\n/g,' ').substring(0,42);
      lines.push('║      OUTPUT: ' + forthOut.padEnd(42) + '║');
      lines.push('║      STACK:  ' + JSON.stringify(r.forth.stack).substring(0,42).padEnd(42) + '║');
      lines.push('║      SEAL:   ⬡ Ω ↺ Ψ Δ Λ Σ Φ α' + ' '.repeat(14) + '║');
    }

    lines.push('╠══════════════════════════════════════════════════════════╣');
    lines.push('║  SEAL PAYLOAD GENERATED                                  ║');
    lines.push('╚══════════════════════════════════════════════════════════╝');

    return lines.join('\n');
  }
};
