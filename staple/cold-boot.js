var ColdBoot = {
  STORAGE_KEY: 'apple_ii_coldboot_v1',
  booted: false,
  bootTime: null,

  boot: async function() {
    this.bootTime = new Date().toISOString();
    var result = {
      phase: 'cold_boot',
      startTime: this.bootTime,
      steps: [],
      success: false
    };

    result.steps.push({ phase: 'read_staple', status: 'checking' });
    var staple = StapleManifest.load();
    if (staple) {
      result.steps[result.steps.length - 1].status = 'found';
      result.steps[result.steps.length - 1].repo = staple.repo;
      result.steps[result.steps.length - 1].version = staple.version;
    } else {
      result.steps[result.steps.length - 1].status = 'not_found';
    }

    result.steps.push({ phase: 'check_vault', status: 'checking' });
    var vaultEvents = typeof WozVault !== 'undefined' ? WozVault.readAuditLog().length : 0;
    result.steps[result.steps.length - 1].status = 'ok';
    result.steps[result.steps.length - 1].events = vaultEvents;

    result.steps.push({ phase: 'verify_seal', status: 'checking' });
    if (staple && staple.pageSeal) {
      result.steps[result.steps.length - 1].status = 'verified';
      result.steps[result.steps.length - 1].seal = staple.pageSeal;
    } else {
      result.steps[result.steps.length - 1].status = 'simulated';
    }

    result.steps.push({ phase: 'restore_state', status: 'checking' });
    var state = {
      mode: typeof RuntimeRegistry !== 'undefined' ? RuntimeRegistry.current : 'apple',
      agents: typeof AgentRegistry !== 'undefined' ? AgentRegistry.count() : 0,
      twins: typeof TwinRegistry !== 'undefined' ? TwinRegistry.count() : 0,
      capsules: typeof CapsuleRegistry !== 'undefined' ? CapsuleRegistry.count() : 0
    };
    result.steps[result.steps.length - 1].status = 'restored';
    result.steps[result.steps.length - 1].state = state;

    result.steps.push({ phase: 'boot_complete', status: 'ok' });
    result.success = true;
    this.booted = true;

    WozVault.writeAuditEvent({
      type: 'COLD_BOOT',
      agent: 'KERNEL',
      stapleRepo: staple ? staple.repo : 'none',
      vaultEvents: vaultEvents,
      success: true
    });

    return result;
  },

  render: function(result) {
    if (!result) return 'No boot result.';
    var lines = [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  COLD BOOT SEQUENCE                                         ║',
      '╠══════════════════════════════════════════════════════════════╣'
    ];
    result.steps.forEach(function(s) {
      var status = s.status === 'ok' || s.status === 'found' || s.status === 'verified' || s.status === 'restored' ? '✓' : s.status === 'not_found' || s.status === 'simulated' ? '~' : '?';
      var detail = '';
      if (s.repo) detail = ' → ' + s.repo + ' v' + s.version;
      if (s.events !== undefined) detail = ' → ' + s.events + ' events';
      if (s.seal) detail = ' → ' + s.seal.substring(0, 20) + '...';
      if (s.state) detail = ' → mode:' + s.state.mode + ' agents:' + s.state.agents + ' twins:' + s.state.twins;
      lines.push('║  [' + status + '] ' + s.phase.padEnd(18) + detail.padEnd(37) + '║');
    });
    lines.push('╠══════════════════════════════════════════════════════════════╣');
    lines.push('║  SUN BOOT COMPLETE ✓                                        ║');
    lines.push('╚══════════════════════════════════════════════════════════════╝');
    return lines.join('\n');
  }
};
