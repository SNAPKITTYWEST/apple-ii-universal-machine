const Seal = {
  async sha256(input) {
    const data = new TextEncoder().encode(input);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  },

  async createSeal(payload) {
    const ts = new Date().toISOString();
    const raw = JSON.stringify(payload) + '|' + ts;
    const hash = await this.sha256(raw);
    return { hash, timestamp: ts, payload };
  }
};
