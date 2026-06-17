var RuntimeRegistry = {
  RUNTIMES: {
    HOLY_SIM: 'holy-sim',
    WASM: 'wasm-future',
    WEBLLM: 'webllm-future',
    OLLAMA: 'ollama-future'
  },

  current: 'holy-sim',

  adapters: {},

  register(name, adapter) {
    this.adapters[name] = adapter;
  },

  get(name) {
    return this.adapters[name] || null;
  },

  getCurrent() {
    return this.adapters[this.current] || null;
  }
};
