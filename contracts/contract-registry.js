var ContractRegistry = {
  lastCheck: null,

  check: function(action, args) {
    var result;
    switch (action) {
      case 'boot': result = AdaContract.canBoot(); break;
      case 'debate': result = AdaContract.canRunDebate(); break;
      case 'audit-write': result = AdaContract.canWriteAudit(); break;
      case 'clear': result = AdaContract.canClearVault(args && args.confirmed); break;
      case 'export': result = AdaContract.canExportSnapshot(); break;
      case 'lisp': result = AdaContract.canInvokeLisp(); break;
      case 'runtime': result = AdaContract.canInvokeRuntime(); break;
      default: result = { allowed: true, contract: 'default', reason: 'No contract gate', mode: 'ADA_SIM' };
    }
    this.lastCheck = { action: action, result: result };
    WozVault.writeAuditEvent({
      type: 'CONTRACT_CHECK',
      agent: 'ADA_SIM',
      action: action,
      result: result.allowed ? 'ALLOWED' : 'DENIED',
      contract: result.contract
    });
    return result;
  },

  status: function() {
    return [
      '╔══════════════════════════════════════╗',
      '║  ADA CONTRACT LAYER: SIMULATED       ║',
      '╠══════════════════════════════════════╣',
      '║  LAST CONTRACT: ' + (AdaContract.lastContract || 'none').padEnd(20) + '║',
      '║  CONTRACT STATUS: ' + (AdaContract.lastResult || 'none').padEnd(18) + '║',
      '║  GATES:                               ║',
      '║    Can_Boot            ALLOWED        ║',
      '║    Can_Run_Debate      ALLOWED        ║',
      '║    Can_Write_Audit     ALLOWED        ║',
      '║    Can_Export_Snapshot ALLOWED        ║',
      '║    Can_Clear_Vault     CONFIRM        ║',
      '║    Can_Invoke_Lisp     ALLOWED        ║',
      '║    Can_Invoke_Runtime  ALLOWED        ║',
      '╚══════════════════════════════════════╝'
    ].join('\n');
  }
};
