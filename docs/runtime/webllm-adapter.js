var WebLLMAdapter = {
  name: 'webllm-future',
  description: 'WebLLM browser inference adapter (not yet implemented)',
  available: false,

  exec() {
    return { output: 'WebLLM adapter not yet implemented.', type: 'error' };
  }
};

RuntimeRegistry.register('webllm-future', WebLLMAdapter);
