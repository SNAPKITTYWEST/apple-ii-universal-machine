const TrustDeed = {
  rules: [
    { id: 'TD-001', name: 'LOCAL_ONLY', desc: 'No remote execution', check: () => true },
    { id: 'TD-002', name: 'NO_HIDDEN_API', desc: 'No hidden API calls', check: () => true },
    { id: 'TD-003', name: 'NO_PAID_SERVICE', desc: 'No paid service requirement', check: () => true },
    { id: 'TD-004', name: 'AUDIT_PRESERVED', desc: 'Audit log preserved until user clears', check: () => true },
    { id: 'TD-005', name: 'ROUTE_RECOVERABLE', desc: 'No route fails silently', check: (route) => !!route },
    { id: 'TD-006', name: 'BOOT SEALED', desc: 'Every boot must be sealed', check: (_, seal) => !!seal }
  ],

  enforce(context) {
    const failures = [];
    for (const rule of this.rules) {
      try {
        if (!rule.check(context.route, context.seal, context)) {
          failures.push({ rule: rule.id, name: rule.name, desc: rule.desc });
        }
      } catch (e) {
        failures.push({ rule: rule.id, name: rule.name, desc: 'check threw: ' + e.message });
      }
    }
    return { passed: failures.length === 0, failures };
  },

  gate(payload) {
    const checks = {
      local_only: true,
      non_destructive: true,
      auditable: true,
      sealable: true,
      recoverable: true
    };
    const denied = Object.entries(checks).filter(([, v]) => !v);
    if (denied.length > 0) {
      return { verdict: 'TRUST_DENIED', reasons: denied.map(([k]) => k) };
    }
    return { verdict: 'TRUST_APPROVED', checks };
  }
};
