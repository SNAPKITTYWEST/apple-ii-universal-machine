var WebLLMAdapter = {
  name: 'webllm',
  description: 'WebLLM browser inference adapter',
  available: false,
  model: null,
  loading: false,
  error: null,

  init: async function() {
    this.loading = true;
    this.error = null;
    try {
      if (typeof WebAssembly === 'undefined') {
        this.error = 'WebAssembly not supported';
        this.loading = false;
        return false;
      }
      // Try to detect WebLLM library
      if (typeof window !== 'undefined' && window.webllm) {
        this.model = window.webllm;
        this.available = true;
        this.loading = false;
        return true;
      }
      // Try dynamic import
      try {
        var mod = await import('https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm/+esm');
        if (mod && mod.CreateMLCEngine) {
          this.model = mod;
          this.available = true;
          this.loading = false;
          return true;
        }
      } catch (e) {
        // WebLLM not available via CDN — expected in most browsers
      }
      this.error = 'WebLLM library not loaded — using simulation fallback';
      this.loading = false;
      return false;
    } catch (e) {
      this.error = e.message;
      this.loading = false;
      return false;
    }
  },

  exec: function(cmd, args) {
    if (this.loading) return { output: 'WEBLLM: Loading...', type: 'info' };
    if (!this.available) {
      return {
        output: 'WEBLLM: FALLBACK_JS\n' +
          '  Status: Simulation mode\n' +
          '  Reason: ' + (this.error || 'Library not loaded') + '\n' +
          '  Note: WebLLM requires WebGPU + compatible browser',
        type: 'warning'
      };
    }
    return {
      output: 'WEBLLM: AVAILABLE\n' +
        '  Model: ' + (this.model ? 'loaded' : 'pending') + '\n' +
        '  Mode: Browser inference (WebGPU)',
      type: 'success'
    };
  },

  infer: async function(prompt) {
    if (!this.available) return { result: 'SIMULATED: ' + prompt, model: 'fallback' };
    try {
      if (this.model && this.model.CreateMLCEngine) {
        var engine = await this.model.CreateMLCEngine('Llama-3.2-1B-Instruct-q4f16_1-MLC');
        var response = await engine.chat.completions.create({ messages: [{ role: 'user', content: prompt }], max_tokens: 256 });
        return { result: response.choices[0].message.content, model: 'Llama-3.2-1B' };
      }
    } catch (e) {
      return { result: 'Error: ' + e.message, model: 'error' };
    }
    return { result: 'SIMULATED: ' + prompt, model: 'fallback' };
  }
};

RuntimeRegistry.register('webllm', WebLLMAdapter);
