var CapsuleCommands = {
  help: function() {
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  CAPSULE + MODEL ARCHITECTURE — COMMANDS                     ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  CapsuleHelp;               — show this                     ║',
      '║  CreateCapsule "Name";      — create capsule                ║',
      '║  DesignCapsule "N" key="v"; — design capsule specs          ║',
      '║  ListCapsules;              — list all capsules              ║',
      '║  InspectCapsule "N";        — view capsule profile           ║',
      '║  RunCapsule "N" "prompt";   — run capsule                   ║',
      '║  VerifyCapsule "N";         — verify capsule seal            ║',
      '║  StapleCapsule "N";         — staple capsule to repo         ║',
      '║  ExportCapsule "N";         — export capsule JSON             ║',
      '║  GenerateAgentCard "N";     — generate agent card MD         ║',
      '║  GenerateModelCard "N";     — generate model card MD         ║',
      '║                                                                    ║',
      '║  ARCHITECTURES: transformer, mamba, hybrid                    ║',
      '║  RUNTIMES: ollama, webllm, simulated                         ║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  create: async function(args) {
    var name = args[0] || 'Capsule_' + Date.now().toString(36).slice(-4);
    var c = ContractRegistry.check('runtime');
    if (!c.allowed) return { output: 'ADA CONTRACT: DENIED — ' + c.reason, type: 'error' };
    var capsule = await CapsuleBuilder.create(name);
    return { output: CapsuleBuilder.renderProfile(capsule), type: 'success' };
  },

  design: async function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: DesignCapsule "Name" key="value";', type: 'error' };
    var specs = {};
    args.slice(1).forEach(function(a) {
      var m = a.match(/^(\w+)="([^"]*)"$/);
      if (m) specs[m[1]] = m[2];
    });
    var capsule = await CapsuleBuilder.design(name, specs);
    if (!capsule) return { output: 'Capsule "' + name + '" not found.', type: 'error' };
    return { output: CapsuleBuilder.renderProfile(capsule), type: 'success' };
  },

  list: function() {
    var capsules = CapsuleRegistry.getAll();
    if (capsules.length === 0) return { output: 'No capsules created.', type: 'info' };
    var lines = ['╔══════════════════════════════════════════════════════════════╗', '║  CAPSULES (' + String(capsules.length).padStart(2) + ')' + ' '.repeat(49) + '║', '╠══════════════════════════════════════════════════════════════╣'];
    capsules.forEach(function(c) {
      lines.push('║  ' + c.name.padEnd(16) + '│ ' + c.type.padEnd(8) + '│ ' + c.arch.padEnd(12) + '│ ' + c.model.padEnd(16) + '║');
    });
    lines.push('╚══════════════════════════════════════════════════════════════╝');
    return { output: lines.join('\n'), type: 'success' };
  },

  inspect: function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: InspectCapsule "Name";', type: 'error' };
    var capsule = CapsuleRegistry.getByName(name);
    if (!capsule) return { output: 'Capsule "' + name + '" not found.', type: 'error' };
    return { output: CapsuleBuilder.renderProfile(capsule), type: 'success' };
  },

  run: async function(args) {
    var name = args[0] || '';
    var prompt = args.slice(1).join(' ') || '';
    if (!name) return { output: 'Usage: RunCapsule "Name" "prompt";', type: 'error' };
    var result = await CapsuleRunner.run(name, prompt);
    return { output: CapsuleRunner.render(result), type: result.error ? 'error' : 'success' };
  },

  verify: function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: VerifyCapsule "Name";', type: 'error' };
    var capsule = CapsuleRegistry.getByName(name);
    if (!capsule) return { output: 'Capsule "' + name + '" not found.', type: 'error' };

    var checks = {
      hasSeal: !!capsule.seal,
      sealLength: capsule.seal ? capsule.seal.length >= 32 : false,
      hasName: !!capsule.name,
      hasType: !!capsule.type,
      hasModel: !!capsule.model,
      hasArch: !!capsule.arch,
      hasUse: !!capsule.intendedUse,
      hasLimitations: Array.isArray(capsule.limitations) && capsule.limitations.length > 0
    };
    var passed = Object.values(checks).filter(function(v) { return v; }).length;
    var total = Object.keys(checks).length;

    capsule.verified = passed === total;
    CapsuleRegistry.save(capsule);

    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  CAPSULE VERIFICATION                                       ║',
        '╠══════════════════════════════════════════════════════════════╣',
        '║  CAPSULE:   ' + name.padEnd(45) + '║',
        '║  VERDICT:   ' + (capsule.verified ? 'VERIFIED ✓' : 'UNVERIFIED').padEnd(45) + '║',
        '║  CHECKS:    ' + (passed + '/' + total + ' passed').padEnd(45) + '║',
        '╚══════════════════════════════════════════════════════════════╝'
      ].join('\n'),
      type: capsule.verified ? 'success' : 'error'
    };
  },

  staple: async function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: StapleCapsule "Name";', type: 'error' };
    var capsule = CapsuleRegistry.getByName(name);
    if (!capsule) return { output: 'Capsule "' + name + '" not found.', type: 'error' };

    var staple = StapleManifest.manifest;
    if (!staple) {
      await StapleManifest.generate();
      staple = StapleManifest.manifest;
    }

    capsule.stapleHash = staple ? staple.pageSeal : null;
    var s = await Seal.createSeal({ type: 'CAPSULE_STAPLE', capsule: name, stapleHash: capsule.stapleHash });
    capsule.seal = s.hash;
    CapsuleRegistry.save(capsule);

    WozVault.writeAuditEvent({ type: 'CAPSULE_STAPLE', agent: name, stapleHash: capsule.stapleHash });
    return { output: 'Capsule "' + name + '" stapled.\nStaple hash: ' + (capsule.stapleHash || 'none') + '\nSeal: ' + s.hash.substring(0, 32), type: 'success' };
  },

  exportJSON: function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: ExportCapsule "Name";', type: 'error' };
    var capsule = CapsuleRegistry.getByName(name);
    if (!capsule) return { output: 'Capsule "' + name + '" not found.', type: 'error' };

    var blob = new Blob([JSON.stringify(capsule, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'capsule-' + name.toLowerCase() + '.json';
    a.click();
    URL.revokeObjectURL(url);

    return { output: 'Capsule exported: ' + a.download, type: 'success' };
  },

  generateAgentCard: function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: GenerateAgentCard "Name";', type: 'error' };
    var capsule = CapsuleRegistry.getByName(name);
    if (!capsule) return { output: 'Capsule "' + name + '" not found.', type: 'error' };
    var card = CapsuleCard.generateAgentCard(capsule);
    CapsuleCard.downloadCard(card, 'agent-card-' + name.toLowerCase() + '.md');
    return { output: 'Agent card generated: agent-card-' + name.toLowerCase() + '.md', type: 'success' };
  },

  generateModelCard: function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: GenerateModelCard "Name";', type: 'error' };
    var capsule = CapsuleRegistry.getByName(name);
    if (!capsule) return { output: 'Capsule "' + name + '" not found.', type: 'error' };
    var card = CapsuleCard.generateModelCard(capsule);
    CapsuleCard.downloadCard(card, 'model-card-' + name.toLowerCase() + '.md');
    return { output: 'Model card generated: model-card-' + name.toLowerCase() + '.md', type: 'success' };
  },

  architectures: function() {
    var archs = CapsuleBuilder.architectures;
    var lines = ['╔══════════════════════════════════════════════════════════════╗', '║  MODEL ARCHITECTURES                                         ║', '╠══════════════════════════════════════════════════════════════╣'];
    Object.keys(archs).forEach(function(k) {
      lines.push('║  ' + k.padEnd(14) + '│ ' + archs[k].label.padEnd(12) + '│ ' + archs[k].desc.padEnd(25) + '║');
    });
    lines.push('╚══════════════════════════════════════════════════════════════╝');
    return { output: lines.join('\n'), type: 'success' };
  }
};
