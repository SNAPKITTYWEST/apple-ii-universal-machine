var RuntimeRegistry = {
  RUNTIMES: {
    HOLY_SIM: 'holy-sim',
    SWIFT_WASM: 'swift-wasm',
    WASM: 'wasm-future',
    WEBLLM: 'webllm-future',
    OLLAMA: 'ollama-future'
  },

  current: 'holy-sim',
  swiftAvailable: false,

  adapters: {},

  register: function(name, adapter) {
    this.adapters[name] = adapter;
  },

  get: function(name) {
    return this.adapters[name] || null;
  },

  getCurrent: function() {
    return this.adapters[this.current] || null;
  },

  setSwiftAvailable: function(val) {
    this.swiftAvailable = val;
  },

  getRuntimeStatus: function() {
    return {
      holySim: 'SIMULATED',
      swiftWasm: this.swiftAvailable ? 'AVAILABLE' : 'FALLBACK_JS',
      currentCore: this.current === 'swift-wasm' && this.swiftAvailable ? 'SWIFT_SIM' : 'JS_SIM',
      lispMachine: 'ONLINE',
      fontanaFFI: 'SIMULATED',
      assemblyLayer: 'SIMULATED',
      unicodeLayer: 'ONLINE'
    };
  }
};
