var CopilotGuide = {
  active: false,
  panel: null,
  currentStep: 0,

  init: function() {
    this.active = true;
    this.createPanel();
    this.showWelcome();
  },

  createPanel: function() {
    if (this.panel) return;
    var div = document.createElement('div');
    div.id = 'copilot-panel';
    div.innerHTML = '<div id="copilot-header">' +
      '<span class="copilot-title">SNAPKITTY COPILOT</span>' +
      '<span class="copilot-badge">LOCAL GUIDE</span>' +
      '<button id="copilot-minimize" title="Minimize">_</button>' +
      '</div>' +
      '<div id="copilot-body"></div>' +
      '<div id="copilot-controls">' +
      '<button id="copilot-voice-toggle" title="Toggle voice">VOICE: ON</button>' +
      '<button id="copilot-replay" title="Replay step">REPLAY</button>' +
      '<button id="copilot-mute" title="Mute voice">MUTE</button>' +
      '<button id="copilot-close" title="Close copilot">CLOSE</button>' +
      '</div>';
    document.body.appendChild(div);
    this.panel = div;

    var self = this;
    document.getElementById('copilot-minimize').onclick = function() { self.toggleMinimize(); };
    document.getElementById('copilot-close').onclick = function() { self.close(); };
    document.getElementById('copilot-mute').onclick = function() { VoiceNarrator.toggleMute(); self.updateVoiceButton(); };
    document.getElementById('copilot-replay').onclick = function() { self.replayCurrent(); };
    document.getElementById('copilot-voice-toggle').onclick = function() { VoiceNarrator.toggle(); self.updateVoiceButton(); };
  },

  showWelcome: function() {
    var body = document.getElementById('copilot-body');
    if (!body) return;
    body.innerHTML =
      '<div class="copilot-message">Welcome to Apple II Universal Machine.</div>' +
      '<div class="copilot-sub">I\'m your SnapKitty Copilot. I\'ll guide you through the system.</div>' +
      '<div class="copilot-buttons">' +
      '<button class="copilot-btn" onclick="CopilotGuide.startTour()">START TOUR</button>' +
      '<button class="copilot-btn" onclick="CopilotGuide.createFirstAgent()">CREATE FIRST AGENT</button>' +
      '<button class="copilot-btn" onclick="CopilotGuide.tryVMLab()">TRY VM LAB</button>' +
      '<button class="copilot-btn" onclick="CopilotGuide.connectOllama()">CONNECT OLLAMA</button>' +
      '<button class="copilot-btn copilot-skip" onclick="CopilotGuide.close()">SKIP</button>' +
      '</div>' +
      '<div class="copilot-label">COPILOT MODE: LOCAL GUIDE · VOICE: BROWSER SPEECH API · AI: SIMULATED</div>';

    VoiceNarrator.speak('Welcome to Apple II Universal Machine, a GitHub-native universal terminal by SnapKitty Agents. This project lets you create agents, design digital twins, run simulated VM labs, transform messy data into verifiable substrates, and seal everything inside Woz Vault. Every command is audited. Every action can be exported. One cockpit. Many agents. No token tax.');
  },

  startTour: function() {
    TourSteps.reset();
    this.showStep(0);
  },

  showStep: function(idx) {
    var step = TourSteps.getStep(idx);
    if (!step) { this.showComplete(); return; }
    this.currentStep = idx;

    var body = document.getElementById('copilot-body');
    if (!body) return;
    body.innerHTML =
      '<div class="copilot-step-label">STEP ' + (idx + 1) + ' of ' + TourSteps.total() + '</div>' +
      '<div class="copilot-message">' + step.narration + '</div>' +
      '<div class="copilot-command-display"><code>' + step.command + '</code></div>' +
      '<button class="copilot-btn copilot-run" onclick="CopilotGuide.runStep(' + idx + ')">RUN THIS COMMAND</button>' +
      '<button class="copilot-btn copilot-skip" onclick="CopilotGuide.skipStep(' + idx + ')">SKIP</button>' +
      '<div id="copilot-checklist"></div>';

    this.renderChecklist();
    VoiceNarrator.speak(step.narration);

    WozVault.writeAuditEvent({ type: 'TOUR_STEP', agent: 'COPILOT', step: idx, command: step.command });
  },

  runStep: function(idx) {
    var step = TourSteps.getStep(idx);
    if (!step) return;
    var input = document.getElementById('cmd-input');
    if (input) {
      input.value = step.command;
      input.focus();
      var enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13 });
      input.dispatchEvent(enterEvent);
    }
    TourSteps.complete(idx);
    this.renderChecklist();

    var s = await Seal.createSeal({ type: 'TOUR_MILESTONE', step: idx, command: step.command });
    WozVault.writeAuditEvent({ type: 'TOUR_MILESTONE', agent: 'COPILOT', step: idx, seal: s.hash });

    var self = this;
    setTimeout(function() { self.showStep(idx + 1); }, 1500);
  },

  skipStep: function(idx) {
    TourSteps.complete(idx);
    this.showStep(idx + 1);
  },

  showComplete: function() {
    var body = document.getElementById('copilot-body');
    if (!body) return;
    var completed = TourSteps.completedCount();
    body.innerHTML =
      '<div class="copilot-message">Tour complete! ' + completed + '/' + TourSteps.total() + ' steps done.</div>' +
      '<div class="copilot-sub">You\'re ready to explore on your own. Type any command or click buttons below.</div>' +
      '<div class="copilot-buttons">' +
      '<button class="copilot-btn" onclick="CopilotGuide.openDashboard()">OPEN DASHBOARD</button>' +
      '<button class="copilot-btn copilot-skip" onclick="CopilotGuide.close()">CLOSE COPILOT</button>' +
      '</div>';
    VoiceNarrator.speak('Tour complete. You are ready to explore on your own. One cockpit. Many agents. No token tax.');
  },

  renderChecklist: function() {
    var el = document.getElementById('copilot-checklist');
    if (!el) return;
    var steps = TourSteps.getAll();
    var html = '<div class="copilot-checklist-title">PROGRESS</div>';
    steps.forEach(function(s, i) {
      var done = TourSteps.isCompleted(i);
      html += '<div class="copilot-check-item ' + (done ? 'done' : '') + '">' + (done ? '✓' : '○') + ' ' + s.label + '</div>';
    });
    el.innerHTML = html;
  },

  createFirstAgent: function() {
    var input = document.getElementById('cmd-input');
    if (input) { input.value = 'SpawnAgent "MyFirstAgent"'; input.focus(); }
    VoiceNarrator.speak('I\'ll create your first agent. The command is SpawnAgent MyFirstAgent.');
  },

  tryVMLab: function() {
    var input = document.getElementById('cmd-input');
    if (input) { input.value = 'VMTrace boot_agent'; input.focus(); }
    VoiceNarrator.speak('Let\'s try the VM Lab. I\'ll run a full trace of the boot agent through all five layers.');
  },

  connectOllama: function() {
    var input = document.getElementById('cmd-input');
    if (input) { input.value = 'ConnectOllama'; input.focus(); }
    VoiceNarrator.speak('Let\'s check if Ollama is running on your machine.');
  },

  openDashboard: function() {
    TwinDashboard.show();
  },

  replayCurrent: function() {
    var step = TourSteps.getStep(this.currentStep);
    if (step) VoiceNarrator.speak(step.narration);
  },

  updateVoiceButton: function() {
    var btn = document.getElementById('copilot-voice-toggle');
    if (btn) btn.textContent = VoiceNarrator.enabled ? 'VOICE: ON' : 'VOICE: OFF';
    var mute = document.getElementById('copilot-mute');
    if (mute) mute.textContent = VoiceNarrator.muted ? 'UNMUTE' : 'MUTE';
  },

  suggestCommand: function(input) {
    var commands = ['help','boot','status','trust','agents','vault','seal','debate','export','about','clear',
      'adastatus','contracts','lisphelp','lispeval','fontanareact','asmstatus','registers','opcodes',
      'reverseunicode','glyphseal','restoreunicode','prologask','macroexpand','bytecoderun','brainfuckrun',
      'machineview','vmtrace','fontanadecode','lispexpand','lisptovm','spawnagent','listagents','runagent',
      'inspectagent','deleteagent','createtwin','designtwin','listtwins','runtwin','inspecttwin','deletetwin',
      'listmodes','switchmode','currentmode','ollamastatus','listmodels','connectollama','vacuumhelp',
      'vacuumingest','extractmeaning','tolisp','compileenvelope','verifyenvelope','runenvelope','exportenvelope',
      'screenshotterminal','exportproof','staplerepo','verifystaple','coldboot','staplestatus',
      'capsulehelp','createcapsule','designcapsule','listcapsules','inspectcapsule','runcapsule',
      'verifycapsule','staplecapsule','exportcapsule','generateagentcard','generatemodelcard','listarchitectures',
      'githubhelp','githublogin','githublogout','githubstatus','createinvertedrepo','createrepofromtemplate',
      'stapleremoterepo','verifyremoterepo','tour','copilot','missioncontrol','nextstep','replaynarration','mutevoice',
      'createtwinfromwizard','twinhelp','twindashboard'];

    var lower = input.toLowerCase().replace(/;$/,'');
    var matches = commands.filter(function(c) {
      return c.indexOf(lower) >= 0 || levenshtein(c, lower) <= 2;
    }).slice(0, 3);

    if (matches.length > 0) {
      return 'Did you mean: ' + matches.map(function(m) { return m + ';'; }).join('  ') + '?';
    }
    return null;
  },

  toggleMinimize: function() {
    var body = document.getElementById('copilot-body');
    var controls = document.getElementById('copilot-controls');
    if (body) body.style.display = body.style.display === 'none' ? 'block' : 'none';
    if (controls) controls.style.display = controls.style.display === 'none' ? 'flex' : 'none';
  },

  close: function() {
    if (this.panel) this.panel.style.display = 'none';
    this.active = false;
    VoiceNarrator.stop();
  },

  show: function() {
    if (this.panel) this.panel.style.display = 'flex';
    else this.init();
    this.active = true;
  }
};

function levenshtein(a, b) {
  var m = a.length, n = b.length;
  var dp = [];
  for (var i = 0; i <= m; i++) { dp[i] = [i]; }
  for (var j = 0; j <= n; j++) { dp[0][j] = j; }
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] :
        Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + 1);
    }
  }
  return dp[m][n];
}
