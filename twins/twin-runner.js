var TwinRunner = {
  run: async function(twinName, task) {
    var twin = TwinRegistry.getByName(twinName);
    if (!twin) return { error: 'Twin "' + twinName + '" not found' };

    var response = TwinProfile.generateResponse(twin, task);
    twin.lastRun = new Date().toISOString();
    twin.runCount++;
    TwinRegistry.save(twin);

    var s = await Seal.createSeal({ type: 'TWIN_RUN', twin: twinName, task: task, role: twin.role });
    WozVault.writeAuditEvent({
      type: 'TWIN_RUN',
      twin: twinName,
      role: twin.role,
      task: task,
      seal: s.hash
    });

    return {
      twin: twin,
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
      '║  TWIN RUN: ' + result.twin.name.padEnd(46) + '║',
      '╠══════════════════════════════════════════════════════════╣',
      '║  TASK: ' + result.task.substring(0, 51).padEnd(51) + '║',
      '╠══════════════════════════════════════════════════════════╣'
    ].join('\n') + '\n' + result.response + '\n' +
    '╠══════════════════════════════════════════════════════════╣\n' +
    '║  SEAL: ' + result.seal.substring(0, 51).padEnd(51) + '║\n' +
    '╚══════════════════════════════════════════════════════════╝';
  }
};
