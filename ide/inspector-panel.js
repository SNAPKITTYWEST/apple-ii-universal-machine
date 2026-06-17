var InspectorPanel = {
  target: null,
  properties: {},

  inspect: function(name, data) {
    this.target = name;
    this.properties = {};
    var self = this;
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(function(k) {
        var v = data[k];
        if (typeof v === 'function') self.properties[k] = '[function]';
        else if (typeof v === 'object') self.properties[k] = JSON.stringify(v).substring(0, 80);
        else self.properties[k] = String(v);
      });
    }
    this.render();
  },

  clear: function() {
    this.target = null;
    this.properties = {};
    this.render();
  },

  render: function() {
    var panel = document.getElementById('inspector-content');
    if (!panel) return;
    if (!this.target) {
      panel.innerHTML = '<div class="inspector-empty l-dim">No target selected.\nClick a file or object to inspect.</div>';
      return;
    }
    var html = '<div class="inspector-section">';
    html += '<div class="inspector-title">INSPECTOR: ' + this.target + '</div>';
    var keys = Object.keys(this.properties);
    if (keys.length === 0) {
      html += '<div class="inspector-item l-dim">no properties</div>';
    }
    keys.forEach(function(k) {
      html += '<div class="inspector-item"><span class="l-cyan">' + k + '</span>: <span class="l-white">' + InspectorPanel.properties[k] + '</span></div>';
    });
    html += '</div>';
    panel.innerHTML = html;
  },

  renderToString: function() {
    if (!this.target) return 'No target selected.';
    var s = 'INSPECTOR: ' + this.target + '\n';
    Object.keys(this.properties).forEach(function(k) {
      s += '  ' + k + ': ' + InspectorPanel.properties[k] + '\n';
    });
    return s;
  }
};
