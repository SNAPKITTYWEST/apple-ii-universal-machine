# Apple II Universal Machine Trust Deed

## Sun Boot / Woz Vault / Holy Fallback Covenant

### 1. Purpose

This deed governs Apple II Universal Machine, a free local-first static computing cockpit hosted on GitHub Pages.

The system exists to let users boot, inspect, simulate, audit, and seal agent behavior without paid APIs, hidden servers, or token dependency.

### 2. Core Law

No boot is trusted until sealed.
No route is valid until recoverable.
No agent action is accepted unless audited.
No user data leaves the browser without explicit user action.

### 3. Sun Boot

Sun Boot is the first verified startup sequence.

Sun Boot must:

* Start from `index.html`
* Load `kernel.js`
* Initialize Woz Vault
* Render ASCII boot state
* Load Holy Page or requested route
* Write audit event
* Generate SHA-256 boot seal

### 4. Holy Page Fallback

The Holy Page is mandatory rescue mode.

If any page, route, script, or simulation fails, the system must show `holy.html`.

Failure must never produce a blank screen.

### 5. Woz Vault

Woz Vault is local browser memory.

For MVP, Woz Vault uses localStorage.

Woz Vault must store:

* boot events
* route events
* debate events
* agent outputs
* seals
* snapshots

Audit events are append-first.

The system may clear Woz Vault only when the user explicitly presses Clear Woz Vault.

### 6. Agent Simulation

ENKI may propose.

SENTINEL must audit.

No agent may claim real execution, real proof, or real hardware access in the MVP.

All MVP agents are simulated local agents unless explicitly upgraded later.

### 7. Trust Gate

Before output is accepted, the Trust Gate checks:

* Is this local-only?
* Is this non-destructive?
* Is this auditable?
* Is this sealable?
* Is this recoverable?

If not, mark:

```
TRUST_DENIED
```

### 8. Future Upgrade Path

After MVP boots, future layers may be added:

* WebLLM/WebGPU browser inference
* Web Worker agent brain
* WASM Rust logic
* IndexedDB Woz Vault
* Ollama desktop bridge
* Lean 4 proof checks
* Ada contract checks
* Lisp/Fontana symbolic FFI
* QEMU sandbox
* HolyC experiments inside VM only

These are not required for first Sun Boot.

### 9. Safety Boundary

Do not implement real Ring 0 execution in the browser.

Do not implement destructive shell commands.

Do not connect to local Ollama automatically without user consent.

Do not claim quantum, hardware, or formal proof execution unless the code actually performs it.

### 10. Final Covenant

GitHub Pages is the ROM.
Index is the bootloader.
Kernel JS is the page kernel.
Holy Page is rescue mode.
Woz Vault is memory.
ASCII is the dashboard.
SHA-256 is the seal.

One cockpit. Many agents. No token tax.
