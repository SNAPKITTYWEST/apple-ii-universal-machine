var ModeRegistry = {
  STORAGE_KEY: 'apple_ii_current_mode',
  current: 'apple',

  modes: {
    'apple':   { label: 'Apple II',      icon: 'apple',   theme: 'terminal-green',  commands: 'all' },
    'linux':   { label: 'Linux',          icon: 'linux',   theme: 'terminal-amber',  commands: 'shell-focused' },
    'windows': { label: 'Windows',        icon: 'windows', theme: 'terminal-blue',   commands: 'powershell-focused' },
    'holy':    { label: 'HolyC',          icon: 'holy',    theme: 'terminal-gold',   commands: 'holy-focused' },
    'vm':      { label: 'VM Lab',         icon: 'vm',      theme: 'terminal-cyan',   commands: 'vm-focused' },
    'agent':   { label: 'Agent Mode',     icon: 'agent',   theme: 'terminal-magenta', commands: 'agent-focused' }
  },

  init: function() {
    try {
      var saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved && this.modes[saved]) this.current = saved;
    } catch {}
  },

  switchTo: function(modeName) {
    if (!this.modes[modeName]) return false;
    this.current = modeName;
    try { localStorage.setItem(this.STORAGE_KEY, modeName); } catch {}
    return true;
  },

  getCurrent: function() {
    return {
      name: this.current,
      config: this.modes[this.current]
    };
  },

  listAll: function() {
    var self = this;
    return Object.keys(this.modes).map(function(key) {
      return { name: key, label: self.modes[key].label, theme: self.modes[key].theme, active: key === self.current };
    });
  }
};
