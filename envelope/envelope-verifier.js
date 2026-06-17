var EnvelopeVerifier = {
  verify: function(envelope) {
    if (!envelope) return { verified: false, reason: 'No envelope to verify' };

    var checks = {
      hasId: !!envelope.envelopeId,
      hasType: envelope.type === 'BYTECODE_ENVELOPE',
      hasSource: !!envelope.source,
      hasLisp: !!envelope.lisp,
      hasBytecode: Array.isArray(envelope.bytecode) && envelope.bytecode.length > 0,
      hasSeal: !!envelope.seal,
      hasTrust: !!envelope.trust,
      sealLength: envelope.seal ? envelope.seal.length >= 32 : false
    };

    var passed = Object.values(checks).filter(function(v) { return v; }).length;
    var total = Object.keys(checks).length;
    var trustCheck = envelope.trust !== 'DENIED';

    var verified = passed === total && trustCheck;

    var result = {
      verified: verified,
      checks: checks,
      passed: passed,
      total: total,
      trustCheck: trustCheck,
      verdict: verified ? 'VERIFIED' : 'DENIED',
      reason: verified ? 'All checks passed' : 'Failed: ' + Object.keys(checks).filter(function(k) { return !checks[k]; }).join(', '),
      verifiedAt: new Date().toISOString()
    };

    if (verified) {
      envelope.verified = true;
      EnvelopeBuilder.lastEnvelope = envelope;
    }

    WozVault.writeAuditEvent({
      type: 'ENVELOPE_VERIFY',
      agent: 'VERIFIER',
      envelopeId: envelope.envelopeId,
      verdict: result.verdict,
      passed: passed,
      total: total
    });

    return result;
  },

  render: function(result) {
    if (!result) return 'No verification result.';
    var status = result.verified ? 'VERIFIED ✓' : 'DENIED ✗';
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  ENVELOPE VERIFICATION                                      ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  VERDICT:  ' + status.padEnd(47) + '║',
      '║  CHECKS:   ' + (result.passed + '/' + result.total + ' passed').padEnd(47) + '║',
      '║  TRUST:    ' + (result.trustCheck ? 'ALLOWED' : 'DENIED').padEnd(47) + '║',
      '║  REASON:   ' + result.reason.substring(0, 47).padEnd(47) + '║',
      '║  TIME:     ' + result.verifiedAt.substring(0, 19).padEnd(47) + '║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
