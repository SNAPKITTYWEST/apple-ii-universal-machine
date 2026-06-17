var AdaContract = {
  lastContract: null,
  lastResult: null,

  _check: function(name, allowed, reason) {
    this.lastContract = name;
    this.lastResult = allowed ? 'ALLOWED' : 'DENIED';
    return { allowed: allowed, contract: name, reason: reason || '', mode: 'ADA_SIM' };
  },

  canBoot: function() {
    return this._check('Can_Boot', true);
  },

  canRunDebate: function() {
    return this._check('Can_Run_Debate', true);
  },

  canWriteAudit: function() {
    return this._check('Can_Write_Audit', true);
  },

  canClearVault: function(userConfirmed) {
    return this._check('Can_Clear_Vault', Boolean(userConfirmed), userConfirmed ? 'User confirmed' : 'User confirmation required');
  },

  canExportSnapshot: function() {
    return this._check('Can_Export_Snapshot', true);
  },

  canInvokeLisp: function() {
    return this._check('Can_Invoke_Lisp', true, 'Safe Lisp form');
  },

  canInvokeRuntime: function() {
    return this._check('Can_Invoke_Runtime', true, 'Runtime access granted');
  }
};
