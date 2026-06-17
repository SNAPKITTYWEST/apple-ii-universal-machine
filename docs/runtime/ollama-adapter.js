var OllamaAdapter = {
  name: 'ollama-future',
  description: 'Ollama desktop bridge adapter (not yet implemented)',
  available: false,

  exec() {
    return { output: 'Ollama adapter not yet implemented.', type: 'error' };
  }
};

RuntimeRegistry.register('ollama-future', OllamaAdapter);
