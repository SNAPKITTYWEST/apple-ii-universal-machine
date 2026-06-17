var CapsuleBuilder = {
  architectures: {
    'transformer': { label: 'Transformer', desc: 'Attention-based architecture', runtime: 'ollama' },
    'mamba': { label: 'Mamba', desc: 'State-space model, linear complexity', runtime: 'ollama' },
    'hybrid': { label: 'Hybrid', desc: 'Transformer + Mamba combination', runtime: 'ollama' }
  },

  create: async function(name, opts) {
    opts = opts || {};
    var capsule = {
      name: name,
      type: opts.type || 'agent',
      arch: opts.arch || 'transformer',
      model: opts.model || 'ollama/llama3.2',
      runtime: opts.runtime || 'ollama',
      mode: opts.mode || RuntimeRegistry.current,
      prompt: opts.prompt || '',
      tools: opts.tools || ['search', 'summarize'],
      memoryRules: opts.memoryRules || ['session-only', 'no-remote'],
      permissions: opts.permissions || ['read', 'audit'],
      evals: opts.evals || ['test-basic-comprehension'],
      limitations: opts.limitations || ['Simulated only — no real model training', 'No remote API calls', 'Browser-safe sandbox'],
      intendedUse: opts.intendedUse || 'Local-first agent research and verification',
      createdAt: new Date().toISOString(),
      seal: null,
      verified: false,
      stapleHash: null
    };

    var s = await Seal.createSeal({
      type: 'CAPSULE_CREATE',
      name: name,
      arch: capsule.arch,
      model: capsule.model
    });
    capsule.seal = s.hash;

    CapsuleRegistry.save(capsule);

    WozVault.writeAuditEvent({
      type: 'CAPSULE_CREATE',
      agent: 'BUILDER',
      capsule: name,
      arch: capsule.arch,
      model: capsule.model,
      seal: s.hash
    });

    return capsule;
  },

  design: async function(name, specs) {
    var capsule = CapsuleRegistry.getByName(name);
    if (!capsule) return null;
    if (specs.type) capsule.type = specs.type;
    if (specs.arch) capsule.arch = specs.arch;
    if (specs.model) capsule.model = specs.model;
    if (specs.runtime) capsule.runtime = specs.runtime;
    if (specs.mode) capsule.mode = specs.mode;
    if (specs.prompt) capsule.prompt = specs.prompt;
    if (specs.limitations) capsule.limitations = specs.limitations.split('|');
    if (specs.intendedUse) capsule.intendedUse = specs.intendedUse;

    var s = await Seal.createSeal({ type: 'CAPSULE_DESIGN', name: name, specs: specs });
    capsule.seal = s.hash;
    CapsuleRegistry.save(capsule);
    return capsule;
  },

  renderProfile: function(capsule) {
    if (!capsule) return 'Capsule not found.';
    var arch = this.architectures[capsule.arch] || this.architectures['transformer'];
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  CAPSULE PROFILE                                            ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  NAME:        ' + capsule.name.padEnd(43) + '║',
      '║  TYPE:        ' + capsule.type.padEnd(43) + '║',
      '║  ARCH:        ' + (capsule.arch + ' — ' + arch.desc).substring(0, 43).padEnd(43) + '║',
      '║  MODEL:       ' + capsule.model.padEnd(43) + '║',
      '║  RUNTIME:     ' + capsule.runtime.padEnd(43) + '║',
      '║  MODE:        ' + capsule.mode.padEnd(43) + '║',
      '║  TOOLS:       ' + capsule.tools.join(', ').substring(0, 43).padEnd(43) + '║',
      '║  PERMISSIONS: ' + capsule.permissions.join(', ').substring(0, 43).padEnd(43) + '║',
      '║  EVALS:       ' + capsule.evals.join(', ').substring(0, 43).padEnd(43) + '║',
      '║  USE:         ' + capsule.intendedUse.substring(0, 43).padEnd(43) + '║',
      '║  SEAL:        ' + (capsule.seal || 'none').substring(0, 43).padEnd(43) + '║',
      '║  CREATED:     ' + capsule.createdAt.substring(0, 19).padEnd(43) + '║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
