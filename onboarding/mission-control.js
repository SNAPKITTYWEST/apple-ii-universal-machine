var MissionControl = {
  panel: null,

  show: function() {
    this.create();
    this.render();
    if (this.panel) this.panel.style.display = 'flex';
  },

  create: function() {
    if (this.panel) return;
    var div = document.createElement('div');
    div.id = 'mission-control-panel';
    div.innerHTML = '<div id="mc-header">' +
      '<span class="mc-title">MISSION CONTROL</span>' +
      '<button id="mc-close" onclick="MissionControl.hide()">X</button>' +
      '</div>' +
      '<div id="mc-body"></div>';
    document.body.appendChild(div);
    this.panel = div;
  },

  hide: function() {
    if (this.panel) this.panel.style.display = 'none';
  },

  render: function() {
    var body = document.getElementById('mc-body');
    if (!body) return;

    var events = WozVault.readAuditLog();
    var agents = AgentRegistry.count();
    var twins = TwinRegistry.count();
    var capsules = CapsuleRegistry.count();
    var tourDone = TourSteps.completedCount();
    var tourTotal = TourSteps.total();
    var tourPct = Math.round((tourDone / tourTotal) * 100);

    var lastSeal = 'none';
    for (var i = events.length - 1; i >= 0; i--) {
      if (events[i].seal) { lastSeal = events[i].seal.substring(0, 16) + '...'; break; }
    }

    var nextCmd = 'Help;';
    if (tourDone === 0) nextCmd = 'Boot;';
    else if (tourDone < tourTotal) nextCmd = TourSteps.getStep(tourDone).command;
    else if (agents === 0) nextCmd = 'SpawnAgent "Agent"';
    else if (twins === 0) nextCmd = 'CreateTwin "Twin"';
    else nextCmd = 'VMTrace boot_agent';

    body.innerHTML =
      '<div class="mc-section">' +
      '<div class="mc-label">CURRENT TOUR STEP</div>' +
      '<div class="mc-value">' + (tourDone < tourTotal ? 'Step ' + (tourDone + 1) + '/' + tourTotal : 'COMPLETE') + '</div>' +
      '<div class="mc-progress"><div class="mc-progress-bar" style="width:' + tourPct + '%"></div></div>' +
      '</div>' +
      '<div class="mc-grid">' +
      '<div class="mc-cell"><div class="mc-num">' + tourDone + '/' + tourTotal + '</div><div class="mc-cell-label">TASKS</div></div>' +
      '<div class="mc-cell"><div class="mc-num">' + events.length + '</div><div class="mc-cell-label">VAULT EVENTS</div></div>' +
      '<div class="mc-cell"><div class="mc-num">' + lastSeal + '</div><div class="mc-cell-label">LAST SEAL</div></div>' +
      '<div class="mc-cell"><div class="mc-num">' + agents + '</div><div class="mc-cell-label">AGENTS</div></div>' +
      '<div class="mc-cell"><div class="mc-num">' + twins + '</div><div class="mc-cell-label">TWINS</div></div>' +
      '<div class="mc-cell"><div class="mc-num">' + capsules + '</div><div class="mc-cell-label">CAPSULES</div></div>' +
      '</div>' +
      '<div class="mc-section">' +
      '<div class="mc-label">NEXT RECOMMENDED</div>' +
      '<div class="mc-command">' + nextCmd + '</div>' +
      '<button class="mc-run-btn" onclick="MissionControl.runNext(\'' + nextCmd.replace(/'/g, "\\'") + '\')">RUN</button>' +
      '</div>';
  },

  runNext: function(cmd) {
    var input = document.getElementById('cmd-input');
    if (input) { input.value = cmd; input.focus(); }
    this.hide();
  }
};
