var TwinDashboard = {
  show: function() {
    var twins = TwinRegistry.getAll();
    if (twins.length === 0) {
      this.showEmpty();
      return;
    }
    this.showTwin(twins[twins.length - 1]);
  },

  showEmpty: function() {
    var panel = document.getElementById('tw-body') || this._createOverlay();
    panel.innerHTML =
      '<div class="tw-step">NO TWINS YET</div>' +
      '<div class="tw-prompt">Create your first digital twin to get started.</div>' +
      '<button class="tw-next" onclick="TwinWizard.start()">CREATE MY TWIN</button>';
  },

  showTwin: function(twin) {
    var panel = this._createOverlay();
    this.renderIn(panel, twin);
  },

  renderIn: function(container, twin) {
    if (!twin) { container.innerHTML = '<div class="tw-step">No twin found.</div>'; return; }
    container.innerHTML =
      '<div class="tw-step">DIGITAL TWIN DASHBOARD</div>' +
      '<div class="tw-profile">' +
      '<div class="tw-row"><span class="tw-label">NAME:</span><span class="tw-value">' + twin.name + '</span></div>' +
      '<div class="tw-row"><span class="tw-label">ROLE:</span><span class="tw-value">' + (twin.archetypeLabel || twin.role || 'analyst') + '</span></div>' +
      '<div class="tw-row"><span class="tw-label">PERSONALITY:</span><span class="tw-value">' + (twin.personalityLabel || 'balanced') + '</span></div>' +
      '<div class="tw-row"><span class="tw-label">SKILLS:</span><span class="tw-value">' + TwinSkills.renderSkills(twin.skills) + '</span></div>' +
      '<div class="tw-row"><span class="tw-label">TOOLS:</span><span class="tw-value">' + TwinSkills.renderTools(twin.tools) + '</span></div>' +
      '<div class="tw-row"><span class="tw-label">MEMORY:</span><span class="tw-value">' + (twin.memoryLabel || 'session') + '</span></div>' +
      '<div class="tw-row"><span class="tw-label">RUNTIME:</span><span class="tw-value">' + (twin.runtimeLabel || 'simulated') + '</span></div>' +
      '<div class="tw-row"><span class="tw-label">SEAL:</span><span class="tw-value tw-seal">' + (twin.seal || 'none').substring(0, 32) + '...</span></div>' +
      '</div>' +
      '<div class="tw-buttons">' +
      '<button class="tw-action" onclick="TwinDashboard.chat(\'' + twin.name + '\')">CHAT WITH TWIN</button>' +
      '<button class="tw-action" onclick="TwinDashboard.changeRole(\'' + twin.name + '\')">CHANGE ROLE</button>' +
      '<button class="tw-action" onclick="TwinDashboard.exportTwin(\'' + twin.name + '\')">EXPORT TWIN</button>' +
      '<button class="tw-action" onclick="TwinDashboard.runAnalysis(\'' + twin.name + '\')">RUN ANALYSIS</button>' +
      '<button class="tw-action" onclick="TwinWizard.close()">OPEN TERMINAL</button>' +
      '</div>';
  },

  chat: function(name) {
    var input = document.getElementById('cmd-input');
    if (input) { input.value = 'RunTwin "' + name + '" "hello"'; input.focus(); }
    TwinWizard.close();
  },

  changeRole: function(name) {
    var archetypes = TwinArchetypes.getAll();
    var list = archetypes.map(function(a) { return a.key + ' — ' + a.label; }).join('\n');
    alert('Available roles:\n\n' + list + '\n\nUse terminal: DesignTwin "' + name + '" role="new-role-key"');
  },

  exportTwin: function(name) {
    var twin = TwinRegistry.getByName(name);
    if (!twin) return;
    var blob = new Blob([JSON.stringify(twin, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'twin-' + name.toLowerCase().replace(/\s+/g, '-') + '.json';
    a.click();
    URL.revokeObjectURL(url);
  },

  runAnalysis: function(name) {
    var input = document.getElementById('cmd-input');
    if (input) { input.value = 'RunTwin "' + name + '" "analyze my current system state"'; input.focus(); }
    TwinWizard.close();
  },

  _createOverlay: function() {
    var existing = document.getElementById('twin-wizard-panel');
    if (existing) {
      var body = document.getElementById('tw-body');
      if (body) return body;
    }
    var div = document.createElement('div');
    div.id = 'twin-wizard-panel';
    div.innerHTML = '<div id="tw-header"><span class="tw-title">DIGITAL TWIN DASHBOARD</span><button id="tw-close" onclick="TwinWizard.close()">X</button></div><div id="tw-body"></div>';
    document.body.appendChild(div);
    TwinWizard.panel = div;
    div.style.display = 'flex';
    return document.getElementById('tw-body');
  }
};
