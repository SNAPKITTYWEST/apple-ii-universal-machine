var HolySim = {
  name: 'holy-sim',
  description: 'Browser-safe simulated HolyC terminal',

  commands: {
    Help: 'Show available commands',
    Boot: 'Reboot the system',
    TrustDeed: 'Display trust deed rules',
    AgentStatus: 'Show agent status',
    WozVault: 'Show vault contents',
    Seal: 'Generate SHA-256 seal',
    Debate: 'Run ENKI/SENTINEL debate',
    Clear: 'Clear terminal'
  },

  exec(cmd, args) {
    switch (cmd) {
      case 'Help': return this.cmdHelp();
      case 'Boot': return this.cmdBoot();
      case 'TrustDeed': return this.cmdTrustDeed();
      case 'AgentStatus': return this.cmdAgentStatus();
      case 'WozVault': return this.cmdWozVault();
      case 'Seal': return this.cmdSeal(args);
      case 'Debate': return this.cmdDebate(args);
      case 'Clear': return this.cmdClear();
      default: return { output: 'Unknown command: ' + cmd, type: 'error' };
    }
  },

  cmdHelp() {
    var lines = ['HolyC Simulated Commands:'];
    for (var k in this.commands) lines.push('  ' + k + ' — ' + this.commands[k]);
    return { output: lines.join('\n'), type: 'info' };
  },

  cmdBoot() {
    return { output: AsciiRegistry.renderAscii('sunboot'), type: 'success' };
  },

  cmdTrustDeed() {
    return {
      output: 'TRUST DEED RULES:\n' +
        '  1. No remote execution\n' +
        '  2. No hidden API calls\n' +
        '  3. No paid service requirement\n' +
        '  4. Audit preserved until user clears\n' +
        '  5. No silent route failure\n' +
        '  6. Every boot must be sealed',
      type: 'info'
    };
  },

  cmdAgentStatus() {
    return {
      output: 'ENKI: active (simulated) — tension proposer\nSENTINEL: active (simulated) — claim auditor\nSTATUS: all agents local, no remote calls',
      type: 'success'
    };
  },

  cmdWozVault() {
    var events = WozVault.readAuditLog();
    return { output: 'WOZ VAULT: ' + events.length + ' events logged', type: 'info' };
  },

  cmdSeal(args) {
    var data = args ? args.join(' ') : 'simulated-payload';
    return { output: 'SEAL: creating SHA-256 for "' + data + '"...', type: 'info', async: true };
  },

  cmdDebate(args) {
    var topic = args ? args.join(' ') : 'consciousness';
    return { output: 'DEBATE: "' + topic + '"\nENKI: proposing tensions...\nSENTINEL: auditing...', type: 'info' };
  },

  cmdClear() {
    return { output: '', type: 'clear' };
  }
};

RuntimeRegistry.register('holy-sim', HolySim);
