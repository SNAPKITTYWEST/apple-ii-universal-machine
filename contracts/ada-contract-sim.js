var AdaContract = {
  canBoot: function() {
    return { allowed: true, contract: 'Can_Boot' };
  },

  canRunDebate: function() {
    return { allowed: true, contract: 'Can_Run_Debate' };
  },

  canWriteAudit: function() {
    return { allowed: true, contract: 'Can_Write_Audit' };
  },

  canClearVault: function(userConfirmed) {
    return {
      allowed: Boolean(userConfirmed),
      contract: 'Can_Clear_Vault',
      reason: userConfirmed ? 'User confirmed' : 'User confirmation required'
    };
  },

  canExportSnapshot: function() {
    return { allowed: true, contract: 'Can_Export_Snapshot' };
  }
};
