var EditorPanel = {
  files: {},
  currentFile: null,
  lines: [],

  load: function(filename, content) {
    this.files[filename] = content;
    this.currentFile = filename;
    this.lines = content.split('\n');
    this.render();
  },

  save: function() {
    if (this.currentFile) {
      this.files[this.currentFile] = this.lines.join('\n');
    }
  },

  edit: function(lineNum, newContent) {
    if (lineNum >= 0 && lineNum < this.lines.length) {
      this.lines[lineNum] = newContent;
      this.save();
    }
  },

  insertAt: function(lineNum, content) {
    this.lines.splice(lineNum, 0, content);
    this.save();
  },

  deleteLine: function(lineNum) {
    if (lineNum >= 0 && lineNum < this.lines.length) {
      this.lines.splice(lineNum, 1);
      this.save();
    }
  },

  getLine: function(n) { return this.lines[n] || ''; },
  lineCount: function() { return this.lines.length; },

  render: function() {
    var panel = document.getElementById('editor-content');
    if (!panel) return;
    var html = '';
    var self = this;
    this.lines.forEach(function(line, i) {
      var num = String(i + 1).padStart(4);
      var highlighted = self.highlight(line);
      html += '<div class="editor-line"><span class="line-num">' + num + '</span><span class="line-content">' + highlighted + '</span></div>';
    });
    panel.innerHTML = html;
    var titleEl = document.getElementById('editor-filename');
    if (titleEl) titleEl.textContent = this.currentFile || 'No file open';
  },

  highlight: function(line) {
    var h = line
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/(\/\/.*)$/g, '<span class="hl-comment">$1</span>')
      .replace(/\b(var|function|return|if|else|for|while|async|await|new|this|try|catch|throw|typeof|instanceof)\b/g, '<span class="hl-keyword">$1</span>')
      .replace(/\b(true|false|null|undefined|NaN)\b/g, '<span class="hl-literal">$1</span>')
      .replace(/("[^"]*"|'[^']*')/g, '<span class="hl-string">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-number">$1</span>');
    return h;
  },

  renderToString: function() {
    if (!this.currentFile) return 'No file open.';
    var lines = ['=== ' + this.currentFile + ' (' + this.lines.length + ' lines) ==='];
    var self = this;
    this.lines.forEach(function(line, i) {
      lines.push(String(i + 1).padStart(4) + ' │ ' + line);
    });
    return lines.join('\n');
  }
};
