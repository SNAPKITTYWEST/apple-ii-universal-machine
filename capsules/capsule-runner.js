var CapsuleRunner = {
  run: async function(name, prompt) {
    var capsule = CapsuleRegistry.getByName(name);
    if (!capsule) return { error: 'Capsule "' + name + '" not found.' };

    var response = null;
    var simulated = true;

    if (capsule.runtime === 'ollama' && typeof OllamaAdapter !== 'undefined' && OllamaAdapter.isOnline) {
      var result = await OllamaAdapter.generate(capsule.model, prompt || capsule.prompt);
      response = result.response;
      simulated = result.simulated;
    } else {
      response = '[SIMULATED] ' + (prompt || capsule.prompt || 'No prompt set.') + '\n\n' +
        'Capsule: ' + capsule.name + '\n' +
        'Arch: ' + capsule.arch + '\n' +
        'Model: ' + capsule.model + '\n' +
        'Runtime: ' + capsule.runtime + '\n\n' +
        'This is a browser-safe simulation. Connect Ollama for real inference.';
    }

    var s = await Seal.createSeal({
      type: 'CAPSULE_RUN',
      capsule: name,
      prompt: (prompt || '').substring(0, 100),
      responseLength: response.length,
      simulated: simulated
    });

    WozVault.writeAuditEvent({
      type: 'CAPSULE_RUN',
      agent: capsule.name,
      prompt: (prompt || '').substring(0, 80),
      simulated: simulated,
      seal: s.hash
    });

    return {
      capsule: capsule,
      prompt: prompt || capsule.prompt,
      response: response,
      simulated: simulated,
      seal: s.hash,
      timestamp: new Date().toISOString()
    };
  },

  render: function(result) {
    if (result.error) return 'ERROR: ' + result.error;
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  CAPSULE RUN: ' + result.capsule.name.padEnd(43) + '║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  ARCH:      ' + result.capsule.arch.padEnd(44) + '║',
      '║  MODEL:     ' + result.capsule.model.padEnd(44) + '║',
      '║  RUNTIME:   ' + (result.simulated ? 'SIMULATED' : result.capsule.runtime).padEnd(44) + '║',
      '╠══════════════════════════════════════════════════════════════╣'
    ].join('\n') + '\n' + result.response + '\n' +
    '╠══════════════════════════════════════════════════════════════╣\n' +
    '║  SEAL:      ' + result.seal.substring(0, 44).padEnd(44) + '║\n' +
    '╚══════════════════════════════════════════════════════════════╝';
  }
};
