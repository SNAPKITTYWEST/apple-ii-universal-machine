// LLSM Nano Model Registry — every free model runnable via Ollama
// Personal Large Language LISP Machine · SNAPKITTYWEST · 2026
var ModelRegistry = {

  nano: [
    // ── MICRO (sub-1B) — runs on literally anything ───────────────
    { name: 'smollm2:135m',       size: '88MB',   tier: 'micro',  best: 'speed',        vram: '<1GB', desc: 'HuggingFace SmolLM2 135M — world\'s smallest capable LLM', pull: 'ollama pull smollm2:135m' },
    { name: 'smollm2:360m',       size: '229MB',  tier: 'micro',  best: 'speed',        vram: '<1GB', desc: 'HuggingFace SmolLM2 360M',                                 pull: 'ollama pull smollm2:360m' },
    { name: 'all-minilm',         size: '46MB',   tier: 'embed',  best: 'memory',       vram: '<1GB', desc: 'All-MiniLM — ultra fast embeddings, 46MB only',            pull: 'ollama pull all-minilm' },
    { name: 'qwen2.5:0.5b',       size: '397MB',  tier: 'micro',  best: 'multilingual', vram: '<1GB', desc: 'Alibaba Qwen 2.5 0.5B — multilingual micro',              pull: 'ollama pull qwen2.5:0.5b' },
    { name: 'tinyllama',          size: '638MB',  tier: 'micro',  best: 'speed',        vram: '<1GB', desc: 'TinyLlama 1.1B — ultra fast, runs on CPU',                pull: 'ollama pull tinyllama' },
    { name: 'gemma3:1b',          size: '815MB',  tier: 'micro',  best: 'balanced',     vram: '<1GB', desc: 'Google Gemma 3 1B',                                        pull: 'ollama pull gemma3:1b' },
    { name: 'moondream',          size: '829MB',  tier: 'micro',  best: 'vision',       vram: '<1GB', desc: 'Moondream2 — vision + text in under 1GB',                 pull: 'ollama pull moondream' },
    // ── NANO (1B–2B) — daily driver ──────────────────────────────
    { name: 'deepseek-r1:1.5b',   size: '1.1GB',  tier: 'nano',   best: 'reasoning',    vram: '2GB',  desc: 'DeepSeek R1 1.5B — chain-of-thought, best nano reasoner', pull: 'ollama pull deepseek-r1:1.5b' },
    { name: 'smollm2:1.7b',       size: '1.1GB',  tier: 'nano',   best: 'speed',        vram: '2GB',  desc: 'HuggingFace SmolLM2 1.7B',                                pull: 'ollama pull smollm2:1.7b' },
    { name: 'qwen2.5:1.5b',       size: '986MB',  tier: 'nano',   best: 'multilingual', vram: '2GB',  desc: 'Alibaba Qwen 2.5 1.5B',                                   pull: 'ollama pull qwen2.5:1.5b' },
    { name: 'llama3.2:1b',        size: '1.3GB',  tier: 'nano',   best: 'general',      vram: '2GB',  desc: 'Meta Llama 3.2 1B — best-in-class 1B model',             pull: 'ollama pull llama3.2:1b' },
    { name: 'nomic-embed-text',   size: '274MB',  tier: 'embed',  best: 'memory',       vram: '1GB',  desc: 'Nomic Embed — semantic memory for your LLSM',             pull: 'ollama pull nomic-embed-text' },
    { name: 'starcoder2:3b',      size: '1.7GB',  tier: 'nano',   best: 'code',         vram: '3GB',  desc: 'StarCoder2 3B — code specialist nano',                    pull: 'ollama pull starcoder2:3b' },
    // ── SMALL (3B–4B) — sweet spot ───────────────────────────────
    { name: 'llama3.2:3b',        size: '2.0GB',  tier: 'small',  best: 'general',      vram: '4GB',  desc: 'Meta Llama 3.2 3B — recommended starter (★)',            pull: 'ollama pull llama3.2:3b' },
    { name: 'phi3:mini',          size: '2.2GB',  tier: 'small',  best: 'reasoning',    vram: '4GB',  desc: 'Microsoft Phi-3 Mini 3.8B — punches way above weight',   pull: 'ollama pull phi3:mini' },
    { name: 'phi3.5:mini',        size: '2.2GB',  tier: 'small',  best: 'reasoning',    vram: '4GB',  desc: 'Microsoft Phi-3.5 Mini — improved Phi-3',                pull: 'ollama pull phi3.5:mini' },
    { name: 'gemma2:2b',          size: '1.6GB',  tier: 'small',  best: 'balanced',     vram: '3GB',  desc: 'Google Gemma 2 2B',                                       pull: 'ollama pull gemma2:2b' },
    { name: 'qwen2.5:3b',         size: '1.9GB',  tier: 'small',  best: 'multilingual', vram: '4GB',  desc: 'Alibaba Qwen 2.5 3B — multilingual sweet spot',          pull: 'ollama pull qwen2.5:3b' },
    { name: 'nemotron-mini:4b',   size: '2.7GB',  tier: 'small',  best: 'agent',        vram: '5GB',  desc: 'NVIDIA Nemotron Mini 4B — agent-tuned, BOB\'s base',     pull: 'ollama pull nemotron-mini:4b' },
    { name: 'mxbai-embed-large',  size: '670MB',  tier: 'embed',  best: 'memory',       vram: '1GB',  desc: 'MXBai Embed Large — high quality semantic embeddings',    pull: 'ollama pull mxbai-embed-large' },
    // ── MEDIUM (6B–9B) — full power nano ─────────────────────────
    { name: 'deepseek-r1:7b',     size: '4.7GB',  tier: 'medium', best: 'reasoning',    vram: '8GB',  desc: 'DeepSeek R1 7B — serious chain-of-thought reasoning',     pull: 'ollama pull deepseek-r1:7b' },
    { name: 'mistral:7b',         size: '4.1GB',  tier: 'medium', best: 'reasoning',    vram: '8GB',  desc: 'Mistral 7B — efficient reasoning flagship',              pull: 'ollama pull mistral:7b' },
    { name: 'llama3.1:8b',        size: '4.7GB',  tier: 'medium', best: 'general',      vram: '8GB',  desc: 'Meta Llama 3.1 8B — top open general model',            pull: 'ollama pull llama3.1:8b' },
    { name: 'codellama:7b',       size: '3.8GB',  tier: 'medium', best: 'code',         vram: '8GB',  desc: 'Meta Code Llama 7B — code generation',                  pull: 'ollama pull codellama:7b' },
    { name: 'deepseek-coder:6.7b',size: '3.8GB',  tier: 'medium', best: 'code',         vram: '8GB',  desc: 'DeepSeek Coder 6.7B — code specialist',                 pull: 'ollama pull deepseek-coder:6.7b' },
    { name: 'qwen2.5:7b',         size: '4.7GB',  tier: 'medium', best: 'multilingual', vram: '8GB',  desc: 'Alibaba Qwen 2.5 7B — multilingual powerhouse',         pull: 'ollama pull qwen2.5:7b' },
    { name: 'gemma2:9b',          size: '5.4GB',  tier: 'medium', best: 'balanced',     vram: '10GB', desc: 'Google Gemma 2 9B',                                      pull: 'ollama pull gemma2:9b' },
    { name: 'yi:6b',              size: '3.5GB',  tier: 'medium', best: 'multilingual', vram: '8GB',  desc: '01.AI Yi 6B',                                            pull: 'ollama pull yi:6b' },
    { name: 'openhermes:7b',      size: '4.1GB',  tier: 'medium', best: 'agent',        vram: '8GB',  desc: 'OpenHermes 2.5 — instruction + agent tuned',            pull: 'ollama pull openhermes:7b' },
    { name: 'neural-chat:7b',     size: '4.1GB',  tier: 'medium', best: 'chat',         vram: '8GB',  desc: 'Intel Neural Chat 7B',                                   pull: 'ollama pull neural-chat:7b' },
    { name: 'starcoder2:7b',      size: '4.0GB',  tier: 'medium', best: 'code',         vram: '8GB',  desc: 'StarCoder2 7B — serious code work',                      pull: 'ollama pull starcoder2:7b' },
    { name: 'dolphin-mistral',    size: '4.1GB',  tier: 'medium', best: 'agent',        vram: '8GB',  desc: 'Dolphin Mistral — uncensored, instruction tuned',        pull: 'ollama pull dolphin-mistral' },
  ],

  // Cloud providers — user pastes their own key
  cloudProviders: [
    { id: 'openai',      name: 'OpenAI',      models: ['gpt-4o-mini','gpt-3.5-turbo','gpt-4o'],            endpoint: 'https://api.openai.com/v1',         keyHint: 'sk-...' },
    { id: 'groq',        name: 'Groq (free)', models: ['llama3-8b-8192','mixtral-8x7b-32768','gemma-7b-it'],endpoint: 'https://api.groq.com/openai/v1',    keyHint: 'gsk_...' },
    { id: 'together',    name: 'Together AI', models: ['llama-3-8b','mistral-7b','qwen2-7b'],               endpoint: 'https://api.together.xyz/v1',       keyHint: 'tog-...' },
    { id: 'openrouter',  name: 'OpenRouter',  models: ['meta-llama/llama-3-8b-instruct:free','mistralai/mistral-7b-instruct:free'], endpoint: 'https://openrouter.ai/api/v1', keyHint: 'sk-or-...' },
    { id: 'custom',      name: 'Custom vLLM / BOB', models: [],                                             endpoint: '',                                  keyHint: 'BOB_ENDPOINT' },
  ],

  detectedModels: [],

  syncWithAdapter: function() {
    if (typeof OllamaAdapter !== 'undefined' && OllamaAdapter.models && OllamaAdapter.models.length > 0) {
      this.detectedModels = OllamaAdapter.models.map(function(m) {
        var known = ModelRegistry.nano.find(function(d) { return d.name === m.name; });
        return {
          name: m.name,
          desc: known ? known.desc : 'Local model',
          best: known ? known.best : 'general',
          tier: known ? known.tier : 'local',
          size: m.size ? (m.size / 1073741824).toFixed(1) + 'GB' : '?',
          vram: known ? known.vram : '?',
          pull: known ? known.pull : 'ollama pull ' + m.name,
          detected: true
        };
      });
    }
  },

  getAll: function() {
    var detected = this.detectedModels.map(function(m) { return m.name; });
    var rest = this.nano.filter(function(d) { return detected.indexOf(d.name) < 0; });
    return this.detectedModels.concat(rest.map(function(d) {
      return Object.assign({}, d, { detected: false });
    }));
  },

  getByTier: function(tier) {
    return this.getAll().filter(function(m) { return m.tier === tier; });
  },

  getByBest: function(cat) {
    return this.getAll().filter(function(m) { return m.best === cat; });
  },

  getDetected: function() { return this.detectedModels; },

  recommend: function(useCase) {
    var map = {
      'agent':        'nemotron-mini:4b',
      'reasoning':    'deepseek-r1:1.5b',
      'code':         'deepseek-coder:6.7b',
      'fast':         'smollm2:135m',
      'balanced':     'llama3.2:3b',
      'multilingual': 'qwen2.5:3b',
      'memory':       'nomic-embed-text',
      'vision':       'moondream',
      'chat':         'llama3.2:3b',
    };
    var name = map[useCase] || 'llama3.2:3b';
    return this.getAll().find(function(m) { return m.name === name; }) || this.nano[13];
  }
};
