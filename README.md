# Apple II Universal Machine

A local-first browser cockpit that boots into a LISP-style REPL terminal. No Node. No backend. No paid APIs.

## What This Is

This is a **Sun Boot** — a static GitHub Pages app that simulates an agent cockpit in your browser. You open `index.html`, it boots with an Apple II ASCII banner, and drops you into a LISP REPL where you can run debates, query sources, seal data with SHA-256, and inspect the audit log.

Everything runs in the browser. Nothing leaves your machine.

## How It Works

```
index.html          → ROM bootloader (Apple II banner)
kernel.js           → Page kernel (LISP REPL + boot sequence)
ascii-registry.js   → Visual states (ASCII art)
seal.js             → SHA-256 via Web Crypto API
woz-vault.js        → localStorage audit memory (append-only)
trust-deed.js       → Local trust gate (5 rules)
styles.css          → Terminal styling
holy.html           → Rescue fallback page
debate.html         → Static debate panel
```

## How to Run

**Locally:** Double-click `index.html`. No server needed.

**GitHub Pages:** Push to `master`. Auto-deploys.
URL: `https://<username>.github.io/apple-ii-universal-machine/`

## LISP REPL Commands

Type these at the `sunboot>` prompt:

```
(status)            — system status
(agents)            — list ENKI + SENTINEL
(debate "topic")    — run agent debate (try: consciousness, covenant, free will, metatron, soul)
(query "term")      — search local scripture corpus
(vault)             — show audit log
(seal "data")       — create SHA-256 seal
(trust)             — run trust gate check
(clear)             — clear terminal
(help)              — show commands
(about)             — about this machine
```

## Example Session

```
sunboot> (debate "consciousness")

;; RUNNING DEBATE: "consciousness"
;; ENKI:
  (propose (tension (quantum indeterminacy) (moral agency))
           (conclusion "Consciousness may bridge physics and theology"))
;; SENTINEL:
  (audit (type analogy) (confidence 0.6) (verdict HYPOTHESIS))
;; SEAL:
  hash: a1b2c3d4e5f6...
  trust: [████████████████░░░░] 80%
  status: SEALED ✓
```

## What Is Simulated

- ENKI agent proposing tensions from a local lookup table
- SENTINEL agent auditing claims with pattern matching
- SHA-256 seals (real Web Crypto API)
- Audit log persistence (localStorage, survives refresh)
- Route recovery (Holy Page fallback if kernel fails)

## What Is Not Claimed

- Real OS or hardware emulation
- Real Apple II emulation
- Real agent autonomy or inference
- Real formal proof verification
- Real network calls or API requests
- Real LISP interpreter (LISP syntax is UI only)

## Trust Deed

Every boot is sealed. Every action is audited. The trust gate checks:

1. Local-only execution
2. No hidden API calls
3. No paid service requirement
4. Audit log preserved until user clears
5. No route fails silently

See `TRUST_DEED.md` for the full covenant.

## GitHub Pages Setup

1. Push to `master`
2. Go to repo Settings → Pages
3. Source: `master` branch, `/ (root)`
4. The workflow in `.github/workflows/pages.yml` handles deployment

## License

Public domain. Use however you want.

One cockpit. Many agents. No token tax.
