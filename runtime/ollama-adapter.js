var OllamaAdapter = {
  name: 'ollama',
  description: 'Ollama desktop bridge adapter',
  available: false,
  baseUrl: 'http://localhost:11434',
  models: [],
  error: null,
  checked: false,

  init: async function() {
    this.error = null;
    this.checked = true;
    try {
      var response = await fetch(this.baseUrl + '/api/tags', { method: 'GET', signal: AbortSignal.timeout(3000) });
      if (response.ok) {
        var data = await response.json();
        this.models = (data.models || []).map(function(m) { return m.name; });
        this.available = true;
        return true;
      }
    } catch (e) {
      this.error = 'Ollama not running at ' + this.baseUrl;
    }
    this.available = false;
    return false;
  },

  exec: function(cmd, args) {
    if (!this.checked) return { output: 'OLLAMA: Checking...', type: 'info' };
    if (!this.available) {
      return {
        output: 'OLLAMA: FALLBACK_JS\n' +
          '  Status: Simulation mode\n' +
          '  Reason: ' + (this.error || 'Not connected') + '\n' +
          '  Note: Start Ollama desktop app for local inference',
        type: 'warning'
      };
    }
    return {
      output: 'OLLAMA: AVAILABLE\n' +
        '  URL: ' + this.baseUrl + '\n' +
        '  Models: ' + (this.models.length > 0 ? this.models.join(', ') : 'none') + '\n' +
        '  Mode: Desktop bridge',
      type: 'success'
    };
  },

  infer: async function(prompt, model) {
    if (!this.available) return { result: 'SIMULATED: ' + prompt, model: 'fallback' };
    model = model || (this.models.length > 0 ? this.models[0] : 'llama3.2');
    try {
      var response = await fetch(this.baseUrl + '/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: model, prompt: prompt, stream: false })
      });
      if (response.ok) {
        var data = await response.json();
        return { result: data.response, model: model };
      }
      return { result: 'Error: HTTP ' + response.status, model: model };
    } catch (e) {
      return { result: 'Error: ' + e.message, model: model };
    }
  },

  listModels: async function() {
    if (!this.available) return [];
    try {
      var response = await fetch(this.baseUrl + '/api/tags');
      var data = await response.json();
      return (data.models || []).map(function(m) { return m.name; });
    } catch (e) {
      return [];
    }
  }
};

RuntimeRegistry.register('ollama', OllamaAdapter);
