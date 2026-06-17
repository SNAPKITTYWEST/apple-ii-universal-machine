var EnvelopeCommands = {
  compile: async function(args) {
    var text = args ? args.join(' ').replace(/[()"]/g, '').trim() : '';
    if (!text) return { output: 'Usage: CompileEnvelope "(event payment received)";', type: 'error' };

    var c = ContractRegistry.check('lisp');
    if (!c.allowed) return { output: 'ADA CONTRACT: DENIED — ' + c.reason, type: 'error' };

    var bytecode = BytecodeEnvelope.compileLispToBytecode(text);
    var envelope = await EnvelopeBuilder.build(text, text, bytecode, 'ALLOWED');

    var result = BytecodeEnvelope.run(bytecode);

    WozVault.writeAuditEvent({ type: 'ENVELOPE_COMPILE', agent: 'COMPILER', lisp: text.substring(0, 60), bytecodeLen: bytecode.length });

    return {
      output: EnvelopeBuilder.render(envelope) + '\n' + BytecodeEnvelope.render(bytecode, result),
      type: 'success'
    };
  },

  verify: function() {
    var envelope = EnvelopeBuilder.lastEnvelope;
    if (!envelope) return { output: 'No envelope built. Run CompileEnvelope first.', type: 'error' };

    var result = EnvelopeVerifier.verify(envelope);
    return { output: EnvelopeVerifier.render(result), type: result.verified ? 'success' : 'error' };
  },

  run: async function() {
    var envelope = EnvelopeBuilder.lastEnvelope;
    if (!envelope) return { output: 'No envelope built. Run CompileEnvelope first.', type: 'error' };

    if (!envelope.verified) {
      var verifyResult = EnvelopeVerifier.verify(envelope);
      if (!verifyResult.verified) {
        return { output: 'ENVELOPE NOT VERIFIED — cannot run.\n' + EnvelopeVerifier.render(verifyResult), type: 'error' };
      }
    }

    var result = BytecodeEnvelope.run(envelope.bytecode);
    envelope.runCount++;
    envelope.lastRun = new Date().toISOString();
    EnvelopeBuilder.lastEnvelope = envelope;

    var s = await Seal.createSeal({ type: 'ENVELOPE_RUN', envelopeId: envelope.envelopeId, steps: result.steps });

    WozVault.writeAuditEvent({
      type: 'ENVELOPE_RUN',
      agent: 'ENVELOPE',
      envelopeId: envelope.envelopeId,
      steps: result.steps,
      seal: s.hash
    });

    return {
      output: 'ENVELOPE RUN ✓\nSteps: ' + result.steps + '\nSeal: ' + s.hash.substring(0, 32) + '\n\n' + BytecodeEnvelope.render(envelope.bytecode, result),
      type: 'success'
    };
  },

  export: function() {
    var envelope = EnvelopeBuilder.lastEnvelope;
    if (!envelope) return { output: 'No envelope to export.', type: 'error' };

    var blob = new Blob([JSON.stringify(envelope, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'envelope-' + envelope.envelopeId + '.json';
    a.click();
    URL.revokeObjectURL(url);

    return {
      output: 'ENVELOPE EXPORTED ✓\nFile: ' + a.download,
      type: 'success'
    };
  }
};
