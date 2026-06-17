var EnvelopeBuilder = {
  lastEnvelope: null,

  build: async function(source, lispExpr, bytecode, trustResult) {
    var envelopeId = 'env_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);

    var envelope = {
      envelopeId: envelopeId,
      type: 'BYTECODE_ENVELOPE',
      source: source || '',
      lisp: lispExpr || '(event unknown)',
      bytecode: bytecode || ['PUSH_EVENT', 'VERIFY', 'SEAL'],
      trust: trustResult || 'SIMULATED',
      seal: null,
      createdAt: new Date().toISOString(),
      mode: RuntimeRegistry.current,
      verified: false,
      runCount: 0,
      lastRun: null
    };

    var s = await Seal.createSeal({
      envelopeId: envelopeId,
      source: source,
      lisp: lispExpr,
      bytecode: bytecode,
      trust: trustResult
    });

    envelope.seal = s.hash;
    this.lastEnvelope = envelope;

    WozVault.writeAuditEvent({
      type: 'ENVELOPE_BUILD',
      agent: 'ENVELOPE',
      envelopeId: envelopeId,
      lisp: (lispExpr || '').substring(0, 60),
      seal: s.hash
    });

    return envelope;
  },

  render: function(envelope) {
    if (!envelope) return 'No envelope built.';
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  BYTECODE ENVELOPE                                          ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  ID:       ' + envelope.envelopeId.padEnd(47) + '║',
      '║  TYPE:     ' + envelope.type.padEnd(47) + '║',
      '║  SOURCE:   ' + (envelope.source || 'none').substring(0, 47).padEnd(47) + '║',
      '║  LISP:     ' + envelope.lisp.substring(0, 47).padEnd(47) + '║',
      '║  BYTECODE: ' + envelope.bytecode.join(' → ').substring(0, 47).padEnd(47) + '║',
      '║  TRUST:    ' + envelope.trust.padEnd(47) + '║',
      '║  SEAL:     ' + envelope.seal.substring(0, 47).padEnd(47) + '║',
      '║  VERIFIED: ' + (envelope.verified ? 'YES ✓' : 'PENDING').padEnd(47) + '║',
      '║  CREATED:  ' + envelope.createdAt.substring(0, 19).padEnd(47) + '║',
      '║  MODE:     ' + envelope.mode.padEnd(47) + '║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
