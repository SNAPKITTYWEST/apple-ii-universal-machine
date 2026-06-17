var PrologSim = {
  rules: {
    'allowed(boot_agent)': { result: 'ALLOWED', reason: 'System boot authorized' },
    'allowed(run_debate)': { result: 'ALLOWED', reason: 'Debate access granted' },
    'allowed(agent_status)': { result: 'ALLOWED', reason: 'Status read access' },
    'allowed(view_vault)': { result: 'ALLOWED', reason: 'Vault read access' },
    'allowed(seal_action)': { result: 'ALLOWED', reason: 'Seal generation authorized' },
    'denied(clear_vault_without_confirmation)': { result: 'DENIED', reason: 'Requires user confirmation' },
    'denied(remote_execution)': { result: 'DENIED', reason: 'Remote execution forbidden' },
    'denied(eval_javascript)': { result: 'DENIED', reason: 'Arbitrary JS eval forbidden' },
    'requires_seal(agent_action)': { result: 'REQUIRES_SEAL', reason: 'Agent actions must be sealed' },
    'requires_seal(debate_output)': { result: 'REQUIRES_SEAL', reason: 'Debate output must be sealed' },
    'requires_seal(vault_mutation)': { result: 'REQUIRES_SEAL', reason: 'Vault changes must be sealed' },
    'requires_trust(boot)': { result: 'REQUIRES_TRUST', reason: 'Boot requires trust gate' },
    'requires_trust(debate)': { result: 'REQUIRES_TRUST', reason: 'Debate requires trust gate' },
    'allowed(export_snapshot)': { result: 'ALLOWED', reason: 'Export authorized' },
    'allowed(lisp_eval_safe)': { result: 'ALLOWED', reason: 'Safe Lisp evaluation' },
    'denied(lisp_eval_unsafe)': { result: 'DENIED', reason: 'Unsafe Lisp form rejected' },
    'allowed(fontana_react)': { result: 'ALLOWED', reason: 'Symbolic reaction authorized' },
    'allowed(vm_trace)': { result: 'ALLOWED', reason: 'VM trace authorized' }
  },

  ask: function(query) {
    query = query.trim().replace(/\.$/, '').toLowerCase();
    var rule = this.rules[query];
    if (rule) {
      return { query: query, result: rule.result, reason: rule.reason, provenance: 'prolog_sim' };
    }
    // Fallback: check if starts with allowed/denied/requires
    var m = query.match(/^(allowed|denied|requires_\w+)\((.+)\)$/);
    if (m) {
      var type = m[1];
      if (type === 'denied') return { query: query, result: 'DENIED', reason: 'Unknown denied rule', provenance: 'prolog_sim' };
      if (type.startsWith('requires_')) return { query: query, result: type.toUpperCase(), reason: 'Requires gate check', provenance: 'prolog_sim' };
      return { query: query, result: 'ALLOWED', reason: 'Default allow', provenance: 'prolog_sim' };
    }
    return { query: query, result: 'UNKNOWN', reason: 'No matching rule', provenance: 'prolog_sim' };
  },

  renderResult: function(r) {
    var cls = r.result === 'ALLOWED' ? 'l-green' : r.result === 'DENIED' ? 'l-red' : 'l-yellow';
    return [
      '╔══════════════════════════════════════╗',
      '║  PROLOG GATE (SIMULATED)             ║',
      '╠══════════════════════════════════════╣',
      '║  QUERY:    ' + r.query.padEnd(25) + '║',
      '║  RESULT:   ' + r.result.padEnd(25) + '║',
      '║  REASON:   ' + r.reason.substring(0, 25).padEnd(25) + '║',
      '╚══════════════════════════════════════╝'
    ].join('\n');
  }
};
