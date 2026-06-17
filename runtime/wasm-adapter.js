var WasmAdapter = {
  name: 'wasm',
  description: 'WASM runtime adapter',
  available: false,
  module: null,
  error: null,

  init: async function() {
    this.error = null;
    try {
      if (typeof WebAssembly === 'undefined') {
        this.error = 'WebAssembly not supported in this browser';
        return false;
      }
      // Try to load a .wasm module if available
      try {
        var response = await fetch('./runtime/apple-ii-runtime.wasm');
        if (response.ok) {
          var bytes = await response.arrayBuffer();
          this.module = await WebAssembly.instantiate(bytes);
          this.available = true;
          return true;
        }
      } catch (e) {
        // No .wasm file found — expected in development
      }
      this.error = 'No .wasm module found — using JS simulation';
      return false;
    } catch (e) {
      this.error = e.message;
      return false;
    }
  },

  exec: function(cmd, args) {
    if (!this.available) {
      return {
        output: 'WASM: FALLBACK_JS\n' +
          '  Status: Simulation mode\n' +
          '  Reason: ' + (this.error || 'No .wasm module') + '\n' +
          '  Note: Compile Swift/Assembly to .wasm for native execution',
        type: 'warning'
      };
    }
    return {
      output: 'WASM: AVAILABLE\n' +
        '  Module: apple-ii-runtime.wasm\n' +
        '  Mode: Native WebAssembly',
      type: 'success'
    };
  }
};

RuntimeRegistry.register('wasm', WasmAdapter);
