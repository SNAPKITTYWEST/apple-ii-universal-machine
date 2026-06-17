var OllamaAdapter = {
  BASE_URL: 'http://localhost:11434',
  isOnline: false,
  lastProbe: null,
  currentModel: null,

  probe: async function() {
    try {
      var resp = await fetch(this.BASE_URL + '/api/tags', {
        method: 'GET',
        signal: AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined
      });
      if (resp.ok) {
        var data = await resp.json();
        this.isOnline = true;
        this.lastProbe = new Date().toISOString();
        this.models = (data.models || []).map(function(m) {
          return { name: m.name, size: m.size, modified: m.modified_at };
        });
        if (!this.currentModel && this.models.length > 0) {
          this.currentModel = this.models[0].name;
        }
        return { online: true, models: this.models };
      }
    } catch (e) {}
    this.isOnline = false;
    this.lastProbe = new Date().toISOString();
    this.models = [];
    return { online: false, models: [] };
  },

  models: [],

  generate: async function(model, prompt) {
    if (!this.isOnline) {
      return {
        model: model || 'simulated',
        response: '[SIMULATED] ' + prompt + '\n\nThis is a browser-safe simulation. Ollama is offline.\nConnect Ollama at localhost:11434 for real inference.',
        done: true,
        simulated: true
      };
    }
    try {
      var resp = await fetch(this.BASE_URL + '/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model || this.currentModel,
          prompt: prompt,
          stream: false
        }),
        signal: AbortSignal.timeout ? AbortSignal.timeout(30000) : undefined
      });
      if (resp.ok) {
        var data = await resp.json();
        return {
          model: model || this.currentModel,
          response: data.response || '',
          done: data.done !== false,
          simulated: false
        };
      }
    } catch (e) {}
    return {
      model: model || this.currentModel,
      response: '[FALLBACK] Request failed. Using simulated mode.',
      done: true,
      simulated: true
    };
  },

  status: function() {
    return {
      online: this.isOnline,
      url: this.BASE_URL,
      model: this.currentModel || 'none',
      modelCount: this.models.length,
      lastProbe: this.lastProbe || 'never'
    };
  }
};
