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

## Ada + Lisp Rules

- No Lisp expression may execute unless the Ada Contract Layer allows it.
- No Lisp command may call arbitrary JavaScript eval.
- No simulated FFI may mutate Woz Vault except through approved audit APIs.
- All Lisp and Fontana reactions must be sealed.

## Heterogeneous VM Rules

- No real machine code is executed. All opcodes are simulated artifacts.
- Brainfuck runs in a sandbox: max 30000 cells, max 5000 steps.
- Bytecode VM halts at 1000 steps.
- Every VM command passes through Ada Contract + Prolog Gate before execution.
- Every VM trace generates a SHA-256 seal.
- Machine code viewer displays artifacts only — never executes them.

## Runtime Modes

- **HOLY_SIM** (active) — Browser-safe simulation
- **SwiftWasm** (experimental) — Swift runtime with JS fallback
- **WASM** (coming soon) — WebAssembly runtime
- **WebLLM** (coming soon) — Browser LLM inference
- **Ollama** (coming soon) — Desktop bridge to local models

## Sealing

Every significant action generates a SHA-256 seal via Web Crypto. Seals are logged to the Woz Vault (localStorage).

## This is a research prototype, not a production system.
