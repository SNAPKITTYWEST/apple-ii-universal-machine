var DebugPanel = {
  breakpoints: [],
  variables: {},
  callStack: [],
  isPaused: false,

  toggleBreakpoint: function(file, line) {
    var key = file + ':' + line;
    var idx = this.breakpoints.indexOf(key);
    if (idx >= 0) this.breakpoints.splice(idx, 1);
    else this.breakpoints.push(key);
    this.render();
  },

  setVariable: function(name, value) {
    this.variables[name] = value;
    this.render();
  },

  pushFrame: function(name) {
    this.callStack.push({ name: name, time: new Date().toISOString() });
    this.render();
  },

  popFrame: function() {
    this.callStack.pop();
    this.render();
  },

  pause: function(reason) {
    this.isPaused = true;
    this.setVariable('_pauseReason', reason);
    this.render();
  },

  resume: function() {
    this.isPaused = false;
    this.callStack = [];
    this.variables = {};
    this.render();
  },

  clear: function() {
    this.breakpoints = [];
    this.variables = {};
    this.callStack = [];
    this.isPaused = false;
    this.render();
  },

  getState: function() {
    return {
      paused: this.isPaused,
      breakpoints: this.breakpoints.length,
      variables: Object.keys(this.variables).length,
      frames: this.callStack.length
    };
  },

  render: function() {
    var panel = document.getElementById('debug-content');
    if (!panel) return;
    var html = '<div class="debug-section">';
    html += '<div class="debug-title">DEBUG ' + (this.isPaused ? '⏸ PAUSED' : '▶ RUNNING') + '</div>';

    html += '<div class="debug-subtitle">BREAKPOINTS (' + this.breakpoints.length + ')</div>';
    if (this.breakpoints.length === 0) html += '<div class="debug-item l-dim">none</div>';
    this.breakpoints.forEach(function(bp) {
      html += '<div class="debug-item l-yellow">• ' + bp + '</div>';
    });

    html += '<div class="debug-subtitle">VARIABLES</div>';
    var vars = Object.keys(this.variables);
    if (vars.length === 0) html += '<div class="debug-item l-dim">none</div>';
    vars.forEach(function(k) {
      html += '<div class="debug-item l-cyan">' + k + ' = ' + String(DebugPanel.variables[k]).substring(0, 50) + '</div>';
    });

    html += '<div class="debug-subtitle">CALL STACK (' + this.callStack.length + ')</div>';
    if (this.callStack.length === 0) html += '<div class="debug-item l-dim">empty</div>';
    this.callStack.forEach(function(f) {
      html += '<div class="debug-item l-green">→ ' + f.name + '</div>';
    });

    html += '</div>';
    panel.innerHTML = html;
  },

  renderToString: function() {
    var s = 'DEBUG ' + (this.isPaused ? 'PAUSED' : 'RUNNING') + '\n';
    s += 'Breakpoints: ' + this.breakpoints.join(', ') + '\n';
    s += 'Variables: ' + JSON.stringify(this.variables) + '\n';
    s += 'Call stack: ' + this.callStack.map(function(f) { return f.name; }).join(' → ');
    return s;
  }
};
