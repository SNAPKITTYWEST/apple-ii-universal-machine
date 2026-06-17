var IDELayout = {
  currentTab: 'terminal',
  tabs: ['terminal', 'editor', 'simulator', 'debug', 'vault', 'inspector'],

  switchTab: function(tab) {
    if (this.tabs.indexOf(tab) >= 0) {
      this.currentTab = tab;
      this.updatePanels();
      this.renderTabs();
    }
  },

  renderTabs: function() {
    var bar = document.getElementById('ide-tabs');
    if (!bar) return;
    var html = '';
    var self = this;
    this.tabs.forEach(function(t) {
      var cls = t === self.currentTab ? 'ide-tab active' : 'ide-tab';
      html += '<button class="' + cls + '" data-tab="' + t + '">' + t.toUpperCase() + '</button>';
    });
    bar.innerHTML = html;

    bar.querySelectorAll('.ide-tab').forEach(function(btn) {
      btn.addEventListener('click', function() {
        IDELayout.switchTab(this.dataset.tab);
      });
    });
  },

  updatePanels: function() {
    var panels = ['terminal-panel', 'editor-panel-wrap', 'simulator-panel-wrap', 'debug-panel-wrap', 'vault-panel-wrap', 'inspector-panel-wrap'];
    var idx = this.tabs.indexOf(this.currentTab);
    panels.forEach(function(id, i) {
      var el = document.getElementById(id);
      if (el) el.style.display = i === idx ? 'flex' : 'none';
    });
  },

  init: function() {
    this.renderTabs();
    this.updatePanels();
    if (typeof BuildConsole !== 'undefined') BuildConsole.render();
    if (typeof DebugPanel !== 'undefined') DebugPanel.render();
    if (typeof SimulatorPanel !== 'undefined') SimulatorPanel.render();
    if (typeof InspectorPanel !== 'undefined') InspectorPanel.render();
  }
};
