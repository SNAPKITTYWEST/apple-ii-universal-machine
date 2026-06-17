# Apple II Universal Machine

A standalone GitHub Pages cockpit combining Apple II terminal aesthetics with faith-governed agent simulation.

## What This Is

- Apple II terminal boot sequence
- HolyC-style REPL (syntax: `Command("args");`)
- ENKI/SENTINEL debate arena with SHA-256 seals
- Ada contract simulation (real Ada source + JS enforcer)
- Lisp Machine simulator (s-expression evaluator)
- Fontana-style symbolic FFI simulator
- Assembly register/opcode viewer
- Reverse Unicode + Glyph Seal layer
- SwiftWasm runtime adapter (experimental)
- Woz Vault audit memory (localStorage)

## Honest Labels

All agents are **browser-simulated**. No real Ring 0 HolyC execution. No remote API calls. This is a research prototype.

## Ada + Lisp Machine Layer

This project includes:
- Ada/SPARK-style source contracts as artifacts (`trust_contract.ads`, `trust_contract.adb`)
- JavaScript Ada simulator for browser enforcement (`ada-contract-sim.js`)
- Browser-local Lisp Machine simulator (`lisp-machine.js`)
- Safe s-expression parser (`sexpr-parser.js`)
- Fontana-style symbolic FFI simulator (`fontana-ffi-sim.js`)

The browser does not execute native Ada or native Lisp yet. Future versions may compile contract and Lisp layers to WASM.

## SwiftWasm Runtime

This project uses JavaScript for the browser cockpit and SwiftWasm for portable runtime logic. SwiftWasm is experimental/early-adopter technology, so JS fallback remains required.

Swift source is in `/swift/` with:
- Command parsing
- Trust contract decisions
- Lisp expression evaluation
- Woz seal payload generation
- Agent status generation

## Files

```
index.html              Boot screen + full terminal
holy-terminal.html      Dedicated HolyC terminal
debate.html             Debate arena
styles.css              Terminal styling
app.js                  Main controller
seal.js                 SHA-256 via Web Crypto
woz-vault.js            localStorage audit memory
ascii-registry.js       ASCII art states + trust density bars
trust-deed.js           Trust gate
contracts/              Ada contract source + JS simulator + registry
lisp/                   Lisp Machine + Fontana FFI simulator
assembly/               Assembly register/opcode viewer
encoding/               Reverse Unicode + Glyph Seal
runtime/                Runtime adapters (holy-sim, swift-wasm)
swift/                  SwiftWasm source (experimental)
```

## How to Use

1. Open `index.html` in a browser
2. Boot sequence runs automatically
3. Type `help;` for commands
4. Try `boot;`, `seal;`, `debate("consciousness");`
5. Try `LispEval (+ 1 2);`, `FontanaReact (agent trust audit);`
6. Try `Registers;`, `GlyphSeal "No token tax";`

## Trust Deed

See [TRUST_DEED.md](TRUST_DEED.md) for governing rules.

## License

Research use only. Not production.
