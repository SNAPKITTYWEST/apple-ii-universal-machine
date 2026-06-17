var OllamaCommands = {
  help: function() {
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  OLLAMA AGENT-IN-A-BOX                                      ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  OllamaStatus;           — check Ollama connection          ║',
      '║  ListModels;             — list available models             ║',
      '║  ConnectOllama;          — probe localhost:11434             ║',
      '║  SpawnAgent "Name";      — create local AI agent             ║',
      '║  DesignAgent "N" key="v"; — configure agent                  ║',
      '║  RunAgent "N" "prompt";  — run agent (Ollama or simulated)   ║',
      '║  ScreenshotTerminal;     — capture terminal as image         ║',
      '║  ExportProof;            — export full proof package          ║',
      '║                                                                ║',
      '║  Models: llama3.2, mistral, codellama, phi3, gemma2, qwen2.5 ║',
      '║  Ollama URL: http://localhost:11434                            ║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  status: async function() {
    var st = OllamaAdapter.status();
    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  OLLAMA STATUS                                               ║',
        '╠══════════════════════════════════════════════════════════════╣',
        '║  ONLINE:   ' + (st.online ? 'YES ✓' : 'OFFLINE — using simulated agent mode').padEnd(47) + '║',
        '║  URL:      ' + st.url.padEnd(47) + '║',
        '║  MODEL:    ' + st.model.padEnd(47) + '║',
        '║  MODELS:   ' + String(st.modelCount).padEnd(47) + '║',
        '║  PROBE:    ' + st.lastProbe.substring(0, 19).padEnd(47) + '║',
        '╚══════════════════════════════════════════════════════════════╝'
      ].join('\n'),
      type: 'success',
      status: st
    };
  },

  connect: async function() {
    var result = await OllamaAdapter.probe();
    ModelRegistry.syncWithAdapter();
    if (result.online) {
      return {
        output: 'OLLAMA: ONLINE ✓\nModels found: ' + result.models.length + '\n' +
          result.models.map(function(m) { return '  • ' + m.name; }).join('\n'),
        type: 'success'
      };
    }
    return {
      output: 'OLLAMA: OFFLINE — using simulated agent mode\nURL: http://localhost:11434\nStart Ollama and try again.',
      type: 'error'
    };
  },

  listModels: function() {
    ModelRegistry.syncWithAdapter();
    return { output: ModelRegistry.renderList(), type: 'success' };
  },

  spawnAgent: async function(args) {
    var name = args[0] || 'Agent_' + Date.now().toString(36).slice(-4);
    var c = ContractRegistry.check('runtime');
    if (!c.allowed) return { output: 'ADA CONTRACT: DENIED — ' + c.reason, type: 'error' };

    var model = OllamaAdapter.currentModel || 'llama3.2';
    var agent = {
      id: 'ollama_agent_' + Date.now().toString(36),
      name: name,
      role: 'ollama-local',
      model: model,
      mode: RuntimeRegistry.current,
      permissions: ['read', 'write'],
      memoryScope: 'session',
      createdAt: new Date().toISOString(),
      lastRun: null,
      runCount: 0,
      seal: null
    };

    var s = await Seal.createSeal({ type: 'OLLAMA_AGENT_SPAWN', name: name, model: model });
    agent.seal = s.hash;
    AgentRegistry.save(agent);

    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  OLLAMA AGENT SPAWNED                                       ║',
        '╠══════════════════════════════════════════════════════════════╣',
        '║  NAME:     ' + name.padEnd(47) + '║',
        '║  MODEL:    ' + model.padEnd(47) + '║',
        '║  ROLE:     ollama-local'.padEnd(56) + '║',
        '║  SEAL:     ' + s.hash.substring(0, 47).padEnd(47) + '║',
        '╚══════════════════════════════════════════════════════════════╝'
      ].join('\n'),
      type: 'success'
    };
  },

  designAgent: async function(args) {
    var name = args[0] || '';
    if (!name) return { output: 'Usage: DesignAgent "Name" role="x" model="y" mode="z";', type: 'error' };

    var agent = AgentRegistry.getByName(name);
    if (!agent) return { output: 'Agent "' + name + '" not found. Spawn first.', type: 'error' };

    var specs = {};
    args.slice(1).forEach(function(a) {
      var m = a.match(/^(\w+)="([^"]*)"$/);
      if (m) specs[m[1]] = m[2];
    });

    if (specs.role) agent.role = specs.role;
    if (specs.model) agent.model = specs.model;
    if (specs.mode) agent.mode = specs.mode;

    var s = await Seal.createSeal({ type: 'OLLAMA_AGENT_DESIGN', name: name, specs: specs });
    agent.seal = s.hash;
    AgentRegistry.save(agent);

    return {
      output: 'Agent "' + name + '" updated.\nModel: ' + agent.model + '\nRole: ' + agent.role + '\nMode: ' + agent.mode + '\nSeal: ' + s.hash.substring(0, 32),
      type: 'success'
    };
  },

  runAgent: async function(args) {
    var name = args[0] || '';
    var prompt = args.slice(1).join(' ') || 'Explain local-first AI';
    if (!name) return { output: 'Usage: RunAgent "Name" "prompt";', type: 'error' };

    var agent = AgentRegistry.getByName(name);
    if (!agent) return { output: 'Agent "' + name + '" not found.', type: 'error' };

    var model = agent.model || OllamaAdapter.currentModel || 'llama3.2';
    var result = await OllamaAdapter.generate(model, prompt);

    agent.lastRun = new Date().toISOString();
    agent.runCount++;
    AgentRegistry.save(agent);

    var s = await Seal.createSeal({
      type: 'OLLAMA_AGENT_RUN',
      agent: name,
      model: model,
      prompt: prompt,
      responseLength: result.response.length,
      simulated: result.simulated
    });

    WozVault.writeAuditEvent({
      type: 'OLLAMA_AGENT_RUN',
      agent: name,
      model: model,
      prompt: prompt.substring(0, 100),
      simulated: result.simulated,
      seal: s.hash
    });

    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  AGENT RUN: ' + name.padEnd(46) + '║',
        '╠══════════════════════════════════════════════════════════════╣',
        '║  MODEL:    ' + model.padEnd(47) + '║',
        '║  MODE:     ' + (result.simulated ? 'SIMULATED' : 'OLLAMA_LIVE').padEnd(47) + '║',
        '║  PROMPT:   ' + prompt.substring(0, 47).padEnd(47) + '║',
        '╠══════════════════════════════════════════════════════════════╣'
      ].join('\n') + '\n' +
      result.response + '\n' +
      '╠══════════════════════════════════════════════════════════════╣\n' +
      '║  SEAL:     ' + s.hash.substring(0, 47).padEnd(47) + '║\n' +
      '╚══════════════════════════════════════════════════════════════╝',
      type: 'success'
    };
  }
};
