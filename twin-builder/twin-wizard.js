var TwinWizard = {
  currentStep: 0,
  data: {},
  panel: null,

  start: function() {
    this.currentStep = 0;
    this.data = {};
    this.create();
    this.showStep(0);
  },

  create: function() {
    if (this.panel) { this.panel.style.display = 'flex'; return; }
    var div = document.createElement('div');
    div.id = 'twin-wizard-panel';
    div.innerHTML = '<div id="tw-header"><span class="tw-title">DIGITAL TWIN BUILDER</span><button id="tw-close" onclick="TwinWizard.close()">X</button></div><div id="tw-body"></div>';
    document.body.appendChild(div);
    this.panel = div;
  },

  close: function() {
    if (this.panel) this.panel.style.display = 'none';
  },

  showStep: function(step) {
    this.currentStep = step;
    var body = document.getElementById('tw-body');
    if (!body) return;

    switch(step) {
      case 0: this.showName(body); break;
      case 1: this.showArchetype(body); break;
      case 2: this.showPersonality(body); break;
      case 3: this.showMemory(body); break;
      case 4: this.showRuntime(body); break;
      case 5: this.generate(body); break;
      case 6: this.showDashboard(body); break;
    }

    VoiceNarrator.speak(this.getStepNarration(step));
  },

  getStepNarration: function(step) {
    var narrations = [
      'Let\'s start by naming your digital twin. Choose something that represents you.',
      'Now choose your career archetype. This defines your twin\'s professional skills and tools.',
      'Choose a personality. This shapes how your twin thinks and responds.',
      'Choose how your twin remembers things. Session only is safest. Persistent keeps state across sessions.',
      'Choose your runtime. Simulated works everywhere. Ollama gives real AI if you have it running.',
      'Your twin is being generated. SHA-256 seal is being created.',
      'Your digital twin is ready. You can chat, change roles, export, and run analysis.'
    ];
    return narrations[step] || '';
  },

  showName: function(body) {
    body.innerHTML =
      '<div class="tw-step">STEP 1: NAME YOUR TWIN</div>' +
      '<div class="tw-prompt">What would you like to call your digital twin?</div>' +
      '<input id="tw-name-input" class="tw-input" type="text" placeholder="My Digital Twin" autofocus />' +
      '<button class="tw-next" onclick="TwinWizard.setName()">NEXT →</button>';
    setTimeout(function() { var inp = document.getElementById('tw-name-input'); if (inp) inp.focus(); }, 100);
  },

  setName: function() {
    var inp = document.getElementById('tw-name-input');
    this.data.name = (inp && inp.value.trim()) || 'My Digital Twin';
    this.showStep(1);
  },

  showArchetype: function(body) {
    var archetypes = TwinArchetypes.getAll();
    var html = '<div class="tw-step">STEP 2: CHOOSE CAREER</div><div class="tw-cards">';
    archetypes.forEach(function(a) {
      html += '<div class="tw-card" onclick="TwinWizard.selectArchetype(\'' + a.key + '\')">' +
        '<div class="tw-card-title">' + a.label + '</div>' +
        '<div class="tw-card-desc">' + a.description + '</div>' +
        '</div>';
    });
    html += '</div>';
    body.innerHTML = html;
  },

  selectArchetype: function(key) {
    this.data.archetype = key;
    this.showStep(2);
  },

  showPersonality: function(body) {
    var personalities = TwinPersonality.getAll();
    var html = '<div class="tw-step">STEP 3: CHOOSE PERSONALITY</div><div class="tw-cards">';
    personalities.forEach(function(p) {
      html += '<div class="tw-card" onclick="TwinWizard.selectPersonality(\'' + p.key + '\')">' +
        '<div class="tw-card-title">' + p.label + '</div>' +
        '<div class="tw-card-desc">' + p.description + '</div>' +
        '</div>';
    });
    html += '</div>';
    body.innerHTML = html;
  },

  selectPersonality: function(key) {
    this.data.personality = key;
    this.showStep(3);
  },

  showMemory: function(body) {
    var memories = TwinMemory.getAll();
    var html = '<div class="tw-step">STEP 4: CHOOSE MEMORY</div><div class="tw-cards">';
    memories.forEach(function(m) {
      html += '<div class="tw-card" onclick="TwinWizard.selectMemory(\'' + m.key + '\')">' +
        '<div class="tw-card-title">' + m.label + '</div>' +
        '<div class="tw-card-desc">' + m.description + '</div>' +
        '</div>';
    });
    html += '</div>';
    body.innerHTML = html;
  },

  selectMemory: function(key) {
    this.data.memory = key;
    this.showStep(4);
  },

  showRuntime: function(body) {
    var runtimes = TwinRuntime.getAll();
    var html = '<div class="tw-step">STEP 5: CHOOSE RUNTIME</div><div class="tw-cards">';
    runtimes.forEach(function(r) {
      var unavailable = r.key !== 'simulated' && !(typeof OllamaAdapter !== 'undefined' && OllamaAdapter.isOnline);
      html += '<div class="tw-card ' + (unavailable ? 'tw-unavailable' : '') + '" onclick="TwinWizard.selectRuntime(\'' + r.key + '\')">' +
        '<div class="tw-card-title">' + r.label + '</div>' +
        '<div class="tw-card-desc">' + r.description + '</div>' +
        (unavailable ? '<div class="tw-card-tag">NOT AVAILABLE — FALLBACK TO SIMULATED</div>' : '') +
        '</div>';
    });
    html += '</div>';
    body.innerHTML = html;
  },

  selectRuntime: function(key) {
    this.data.runtime = key;
    this.showStep(5);
  },

  generate: async function(body) {
    body.innerHTML = '<div class="tw-step">GENERATING TWIN...</div><div class="tw-progress"><div class="tw-progress-bar"></div></div>';

    var archetype = TwinArchetypes.get(this.data.archetype);
    var personality = TwinPersonality.get(this.data.personality);
    var memory = TwinMemory.get(this.data.memory);
    var runtime = TwinRuntime.get(this.data.runtime);

    var twin = {
      id: 'twin_wiz_' + Date.now().toString(36),
      name: this.data.name,
      archetype: this.data.archetype,
      archetypeLabel: archetype ? archetype.label : 'General',
      personality: this.data.personality,
      personalityLabel: personality ? personality.label : 'Balanced',
      skills: archetype ? archetype.skills : [],
      tools: archetype ? archetype.tools : [],
      memoryType: this.data.memory,
      memoryLabel: memory ? memory.label : 'Session Only',
      runtime: this.data.runtime,
      runtimeLabel: runtime ? runtime.label : 'Simulated',
      role: archetype ? archetype.defaultRole : 'analyst',
      createdAt: new Date().toISOString(),
      seal: null,
      chatHistory: []
    };

    var s = await Seal.createSeal({ type: 'TWIN_WIZARD', name: twin.name, archetype: twin.archetype, personality: twin.personality });
    twin.seal = s.hash;

    TwinRegistry.save(twin);

    WozVault.writeAuditEvent({ type: 'TWIN_WIZARD_CREATE', agent: 'WIZARD', twin: twin.name, archetype: twin.archetype, seal: s.hash });

    this.data.twin = twin;

    var self = this;
    setTimeout(function() { self.showStep(6); }, 1000);
  },

  showDashboard: function(body) {
    TwinDashboard.renderIn(body, this.data.twin);
  }
};
