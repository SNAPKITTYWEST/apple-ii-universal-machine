var WasmAdapter = {
  name: 'wasm-future',
  description: 'WASM runtime adapter (not yet implemented)',
  available: false,

  exec() {
    return { output: 'WASM adapter not yet implemented.', type: 'error' };
  }
};

RuntimeRegistry.register('wasm-future', WasmAdapter);
