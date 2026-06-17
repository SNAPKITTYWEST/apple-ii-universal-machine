# Trust Deed

## Covenant

This application is governed by the following trust rules:

1. **No remote execution** — Everything runs locally in the browser.
2. **No hidden API calls** — No network requests without explicit user action.
3. **No paid services** — No subscription or payment required.
4. **Audit preserved** — All decisions logged until user explicitly clears.
5. **No silent failure** — Every error reported visibly.
6. **Every boot sealed** — Each session gets a SHA-256 audit seal.
7. **Simulation honesty** — All agents are browser-simulated, not real Ring 0 HolyC.
8. **Ada contracts enforced** — Trust gates implemented via JS simulator matching real Ada source.

## Ada Contract

The Ada contract source files (`trust_contract.ads`, `trust_contract.adb`) define the trust rules in real Ada. The JS simulator (`ada-contract-sim.js`) enforces these same rules in the browser.

## Runtime Modes

- **HOLY_SIM** (active) — Browser-safe simulation
- **WASM** (coming soon) — WebAssembly runtime
- **WebLLM** (coming soon) — Browser LLM inference
- **Ollama** (coming soon) — Desktop bridge to local models

## Sealing

Every significant action generates a SHA-256 seal via Web Crypto. Seals are logged to the Woz Vault (localStorage).

## This is a research prototype, not a production system.