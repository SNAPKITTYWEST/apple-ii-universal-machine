var TwinRuntime = {
  runtimes: [
    { key: 'simulated', label: 'Simulated', description: 'Works everywhere. No AI model needed.' },
    { key: 'ollama', label: 'Ollama', description: 'Real AI via localhost:11434. Requires Ollama running.' },
    { key: 'webllm', label: 'WebLLM', description: 'In-browser AI via WebGPU. Experimental.' },
    { key: 'future', label: 'Future Runtime', description: 'Placeholder for upcoming runtimes.' }
  ],

  getAll: function() { return this.runtimes; },
  get: function(key) { return this.runtimes.find(function(r) { return r.key === key; }) || null; },

  isAvailable: function(key) {
    if (key === 'simulated') return true;
    if (key === 'ollama') return typeof OllamaAdapter !== 'undefined' && OllamaAdapter.isOnline;
    if (key === 'webllm') return typeof WebLLMAdapter !== 'undefined' && WebLLMAdapter.isAvailable;
    return false;
  }
};
