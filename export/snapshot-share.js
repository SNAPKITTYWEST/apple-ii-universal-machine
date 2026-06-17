var SnapshotShare = {
  buildProof: async function(agentName) {
    var agent = agentName ? AgentRegistry.getByName(agentName) : null;
    var events = WozVault.readAuditLog();
    var sealHash = null;

    var payload = {
      type: 'EXPORT_PROOF',
      agent: agentName || 'all',
      timestamp: new Date().toISOString(),
      mode: RuntimeRegistry.current,
      vaultEvents: events.length,
      agentCount: AgentRegistry.count(),
      twinCount: TwinRegistry.count(),
      ollama: OllamaAdapter.status(),
      currentModel: OllamaAdapter.currentModel || 'none'
    };

    if (agent) {
      payload.agentProfile = {
        name: agent.name,
        role: agent.role,
        model: agent.model,
        runCount: agent.runCount,
        createdAt: agent.createdAt,
        lastRun: agent.lastRun
      };
      payload.lastSeal = agent.seal;
      sealHash = agent.seal;
    }

    var s = await Seal.createSeal(payload);
    sealHash = s.hash;

    WozVault.writeAuditEvent({
      type: 'EXPORT_PROOF',
      agent: agentName || 'ALL',
      seal: s.hash
    });

    return {
      proof: {
        ...payload,
        seal: s.hash,
        auditCount: events.length
      },
      sealHash: s.hash
    };
  },

  exportJSON: async function(agentName) {
    var result = await this.buildProof(agentName);
    var blob = new Blob([JSON.stringify(result.proof, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'export-proof-' + Date.now() + '.json';
    a.click();
    URL.revokeObjectURL(url);

    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  EXPORT PROOF                                                ║',
        '╠══════════════════════════════════════════════════════════════╣',
        '║  AGENT:     ' + (result.proof.agent || 'all').padEnd(47) + '║',
        '║  MODEL:     ' + result.proof.currentModel.padEnd(47) + '║',
        '║  MODE:      ' + result.proof.mode.padEnd(47) + '║',
        '║  AUDIT:     ' + String(result.proof.auditCount).padEnd(47) + '║',
        '║  AGENTS:    ' + String(result.proof.agentCount).padEnd(47) + '║',
        '║  TWINS:     ' + String(result.proof.twinCount).padEnd(47) + '║',
        '║  SEAL:      ' + result.sealHash.substring(0, 47).padEnd(47) + '║',
        '║  FILE:      ' + a.download.padEnd(47) + '║',
        '╚══════════════════════════════════════════════════════════════╝'
      ].join('\n'),
      type: 'success'
    };
  }
};
