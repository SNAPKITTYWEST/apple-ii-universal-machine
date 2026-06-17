var RuntimeRegistry = {
  RUNTIMES: {
    HOLY_SIM: 'holy-sim',
    SWIFT_WASM: 'swift-wasm',
    WASM: 'wasm',
    WEBLLM: 'webllm',
    OLLAMA: 'ollama'
  },

  current: 'holy-sim',
  swiftAvailable: false,
  webllmAvailable: false,
  ollamaAvailable: false,
  wasmAvailable: false,
  asmAvailable: true,

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

  setSwiftAvailable: function(val) { this.swiftAvailable = val; },
  setWebLLMAvailable: function(val) { this.webllmAvailable = val; },
  setOllamaAvailable: function(val) { this.ollamaAvailable = val; },
  setWasmAvailable: function(val) { this.wasmAvailable = val; },

  initAll: async function() {
    var results = {};
    var sw = this.get('swift-wasm');
    if (sw) results.swift = await sw.init();
    var wl = this.get('webllm');
    if (wl) results.webllm = await wl.init();
    var ol = this.get('ollama');
    if (ol) results.ollama = await ol.init();
    var wa = this.get('wasm');
    if (wa) results.wasm = await wa.init();
    this.swiftAvailable = results.swift || false;
    this.webllmAvailable = results.webllm || false;
    this.ollamaAvailable = results.ollama || false;
    this.wasmAvailable = results.wasm || false;
    return results;
  },

  getRuntimeStatus: function() {
    return {
      holySim: 'SIMULATED',
      swiftWasm: this.swiftAvailable ? 'AVAILABLE' : 'FALLBACK_JS',
      webllm: this.webllmAvailable ? 'AVAILABLE' : 'FALLBACK_JS',
      ollama: this.ollamaAvailable ? 'AVAILABLE' : 'FALLBACK_JS',
      wasm: this.wasmAvailable ? 'AVAILABLE' : 'FALLBACK_JS',
      asm: 'SIMULATED',
      currentCore: this._getCurrentCore(),
      lispMachine: 'ONLINE',
      fontanaFFI: 'SIMULATED',
      assemblyLayer: 'SIMULATED',
      unicodeLayer: 'ONLINE'
    };
  },

  _getCurrentCore: function() {
    if (this.current === 'swift-wasm' && this.swiftAvailable) return 'SWIFT_SIM';
    if (this.current === 'webllm' && this.webllmAvailable) return 'WEBLLM_INFERENCE';
    if (this.current === 'ollama' && this.ollamaAvailable) return 'OLLAMA_BRIDGE';
    if (this.current === 'wasm' && this.wasmAvailable) return 'WASM_NATIVE';
    return 'JS_SIM';
  }
};
