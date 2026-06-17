var AgentRunner = {
  run: async function(agentName, task) {
    var agent = AgentRegistry.getByName(agentName);
    if (!agent) return { error: 'Agent "' + agentName + '" not found' };

    var response = AgentProfile.generateResponse(agent, task);
    agent.lastRun = new Date().toISOString();
    agent.runCount++;
    AgentRegistry.save(agent);

    var s = await Seal.createSeal({ type: 'AGENT_RUN', agent: agentName, task: task, role: agent.role });
    WozVault.writeAuditEvent({
      type: 'AGENT_RUN',
      agent: agentName,
      role: agent.role,
      task: task,
      seal: s.hash
    });

    return {
      agent: agent,
      task: task,
      response: response,
      seal: s.hash,
      timestamp: new Date().toISOString()
    };
  },

  render: function(result) {
    if (result.error) return 'ERROR: ' + result.error;
    return [
      '╔══════════════════════════════════════════════════════════╗',
      '║  AGENT RUN: ' + result.agent.name.padEnd(44) + '║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  TASK: ' + result.task.substring(0, 51).padEnd(51) + '║',
      '╠══════════════════════════════════════════════════════════╣'
    ].join('\n') + '\n' + result.response + '\n' +
    '╠══════════════════════════════════════════════════════════╣\n' +
    '║  SEAL: ' + result.seal.substring(0, 51).padEnd(51) + '║\n' +
    '╚══════════════════════════════════════════════════════════╝';
  }
};
