var FileTree = {
  root: {
    name: 'apple-ii-universal-machine',
    type: 'folder',
    children: [
      { name: 'index.html', type: 'file', ext: 'html' },
      { name: 'holy-terminal.html', type: 'file', ext: 'html' },
      { name: 'debate.html', type: 'file', ext: 'html' },
      { name: 'app.js', type: 'file', ext: 'js' },
      { name: 'styles.css', type: 'file', ext: 'css' },
      { name: 'seal.js', type: 'file', ext: 'js' },
      { name: 'woz-vault.js', type: 'file', ext: 'js' },
      { name: 'ascii-registry.js', type: 'file', ext: 'js' },
      { name: 'trust-deed.js', type: 'file', ext: 'js' },
      { name: 'TRUST_DEED.md', type: 'file', ext: 'md' },
      { name: 'README.md', type: 'file', ext: 'md' },
      { name: 'contracts', type: 'folder', children: [
        { name: 'trust_contract.ads', type: 'file', ext: 'ads' },
        { name: 'trust_contract.adb', type: 'file', ext: 'adb' },
        { name: 'ada-contract-sim.js', type: 'file', ext: 'js' },
        { name: 'contract-registry.js', type: 'file', ext: 'js' }
      ]},
      { name: 'lisp', type: 'folder', children: [
        { name: 'sexpr-parser.js', type: 'file', ext: 'js' },
        { name: 'lisp-machine.js', type: 'file', ext: 'js' },
        { name: 'lisp-patterns.js', type: 'file', ext: 'js' },
        { name: 'fontana-ffi-sim.js', type: 'file', ext: 'js' },
        { name: 'fontana-decoder.js', type: 'file', ext: 'js' },
        { name: 'lisp-expand.js', type: 'file', ext: 'js' },
        { name: 'lisp-to-vm.js', type: 'file', ext: 'js' }
      ]},
      { name: 'assembly', type: 'folder', children: [
        { name: 'boot.asm', type: 'file', ext: 'asm' },
        { name: 'register-sim.js', type: 'file', ext: 'js' },
        { name: 'opcode-viewer.js', type: 'file', ext: 'js' }
      ]},
      { name: 'encoding', type: 'folder', children: [
        { name: 'reverse-unicode.js', type: 'file', ext: 'js' },
        { name: 'glyph-seal.js', type: 'file', ext: 'js' }
      ]},
      { name: 'runtime', type: 'folder', children: [
        { name: 'holy-sim.js', type: 'file', ext: 'js' },
        { name: 'runtime-registry.js', type: 'file', ext: 'js' },
        { name: 'swift-wasm-adapter.js', type: 'file', ext: 'js' },
        { name: 'webllm-adapter.js', type: 'file', ext: 'js' },
        { name: 'ollama-adapter.js', type: 'file', ext: 'js' },
        { name: 'wasm-adapter.js', type: 'file', ext: 'js' }
      ]},
      { name: 'vm', type: 'folder', children: [
        { name: 'prolog-sim.js', type: 'file', ext: 'js' },
        { name: 'macro-expander.js', type: 'file', ext: 'js' },
        { name: 'bytecode-vm.js', type: 'file', ext: 'js' },
        { name: 'brainfuck-tape.js', type: 'file', ext: 'js' },
        { name: 'machine-viewer.js', type: 'file', ext: 'js' },
        { name: 'heterogeneous-vm.js', type: 'file', ext: 'js' }
      ]},
      { name: 'agents', type: 'folder', children: [
        { name: 'agent-registry.js', type: 'file', ext: 'js' },
        { name: 'agent-spawner.js', type: 'file', ext: 'js' },
        { name: 'agent-profile.js', type: 'file', ext: 'js' },
        { name: 'agent-runner.js', type: 'file', ext: 'js' },
        { name: 'agent-commands.js', type: 'file', ext: 'js' }
      ]},
      { name: 'twins', type: 'folder', children: [
        { name: 'twin-registry.js', type: 'file', ext: 'js' },
        { name: 'twin-designer.js', type: 'file', ext: 'js' },
        { name: 'twin-profile.js', type: 'file', ext: 'js' },
        { name: 'twin-runner.js', type: 'file', ext: 'js' },
        { name: 'twin-commands.js', type: 'file', ext: 'js' }
      ]},
      { name: 'modes', type: 'folder', children: [
        { name: 'mode-registry.js', type: 'file', ext: 'js' },
        { name: 'apple-mode.js', type: 'file', ext: 'js' },
        { name: 'linux-mode.js', type: 'file', ext: 'js' },
        { name: 'windows-mode.js', type: 'file', ext: 'js' },
        { name: 'holy-mode.js', type: 'file', ext: 'js' },
        { name: 'vm-mode.js', type: 'file', ext: 'js' },
        { name: 'agent-mode.js', type: 'file', ext: 'js' }
      ]},
      { name: 'ollama', type: 'folder', children: [
        { name: 'ollama-adapter.js', type: 'file', ext: 'js' },
        { name: 'model-registry.js', type: 'file', ext: 'js' },
        { name: 'ollama-commands.js', type: 'file', ext: 'js' }
      ]},
      { name: 'export', type: 'folder', children: [
        { name: 'screenshot-export.js', type: 'file', ext: 'js' },
        { name: 'snapshot-share.js', type: 'file', ext: 'js' }
      ]},
      { name: 'vacuum', type: 'folder', children: [
        { name: 'vacuum-ingest.js', type: 'file', ext: 'js' },
        { name: 'semantic-extractor.js', type: 'file', ext: 'js' },
        { name: 'schema-mapper.js', type: 'file', ext: 'js' },
        { name: 'vacuum-commands.js', type: 'file', ext: 'js' }
      ]},
      { name: 'envelope', type: 'folder', children: [
        { name: 'envelope-builder.js', type: 'file', ext: 'js' },
        { name: 'envelope-verifier.js', type: 'file', ext: 'js' },
        { name: 'bytecode-envelope.js', type: 'file', ext: 'js' },
        { name: 'envelope-commands.js', type: 'file', ext: 'js' }
      ]},
      { name: 'ide', type: 'folder', children: [
        { name: 'editor-panel.js', type: 'file', ext: 'js' },
        { name: 'file-tree.js', type: 'file', ext: 'js' },
        { name: 'build-console.js', type: 'file', ext: 'js' },
        { name: 'debug-panel.js', type: 'file', ext: 'js' },
        { name: 'simulator-panel.js', type: 'file', ext: 'js' },
        { name: 'inspector-panel.js', type: 'file', ext: 'js' },
        { name: 'ide-layout.js', type: 'file', ext: 'js' }
      ]},
      { name: 'staple', type: 'folder', children: [
        { name: 'staple-manifest.js', type: 'file', ext: 'js' },
        { name: 'repo-staple.js', type: 'file', ext: 'js' },
        { name: 'cold-boot.js', type: 'file', ext: 'js' },
        { name: 'staple-commands.js', type: 'file', ext: 'js' }
      ]},
      { name: 'capsules', type: 'folder', children: [
        { name: 'capsule-registry.js', type: 'file', ext: 'js' },
        { name: 'capsule-builder.js', type: 'file', ext: 'js' },
        { name: 'capsule-card.js', type: 'file', ext: 'js' },
        { name: 'capsule-runner.js', type: 'file', ext: 'js' },
        { name: 'capsule-commands.js', type: 'file', ext: 'js' }
      ]},
      { name: 'cards', type: 'folder', children: [
        { name: 'AGENT_CARD_TEMPLATE.md', type: 'file', ext: 'md' },
        { name: 'TWIN_CARD_TEMPLATE.md', type: 'file', ext: 'md' },
        { name: 'MODEL_CARD_TEMPLATE.md', type: 'file', ext: 'md' }
      ]},
      { name: 'github', type: 'folder', children: [
        { name: 'github-auth.js', type: 'file', ext: 'js' },
        { name: 'github-api.js', type: 'file', ext: 'js' },
        { name: 'repo-builder.js', type: 'file', ext: 'js' },
        { name: 'inverted-repo-template.js', type: 'file', ext: 'js' },
        { name: 'repo-staple-writer.js', type: 'file', ext: 'js' },
        { name: 'github-commands.js', type: 'file', ext: 'js' }
      ]},
      { name: 'swift', type: 'folder', children: [
        { name: 'Package.swift', type: 'file', ext: 'swift' }
      ]},
      { name: '.github', type: 'folder', children: [
        { name: 'workflows', type: 'folder', children: [
          { name: 'pages.yml', type: 'file', ext: 'yml' },
          { name: 'capsule-verify.yml', type: 'file', ext: 'yml' },
          { name: 'capsule-staple.yml', type: 'file', ext: 'yml' },
          { name: 'capsule-pages.yml', type: 'file', ext: 'yml' }
        ]}
      ]}
    ]
  },

  renderNode: function(node, depth) {
    depth = depth || 0;
    var indent = '  '.repeat(depth);
    var icon = node.type === 'folder' ? '▸ ' : '  ';
    var ext = node.ext ? '.' + node.ext : '';
    var line = indent + icon + node.name + ext;
    var result = [line];
    if (node.children) {
      var self = this;
      node.children.forEach(function(child) {
        result = result.concat(self.renderNode(child, depth + 1));
      });
    }
    return result;
  },

  render: function() {
    var lines = this.renderNode(this.root, 0);
    return lines.join('\n');
  },

  findFile: function(path) {
    var parts = path.split('/');
    var current = this.root;
    for (var i = 0; i < parts.length; i++) {
      if (!current.children) return null;
      current = current.children.find(function(c) { return c.name === parts[i]; });
      if (!current) return null;
    }
    return current;
  },

  count: function() {
    var count = 0;
    var walk = function(node) {
      if (node.type === 'file') count++;
      if (node.children) node.children.forEach(walk);
    };
    walk(this.root);
    return count;
  }
};
