# Apple II Universal Machine

A standalone GitHub Pages cockpit combining Apple II terminal aesthetics with faith-governed agent simulation.

## What This Is

- Apple II terminal boot sequence
- HolyC-style REPL (syntax: `Command("args");`)
- ENKI/SENTINEL debate arena with SHA-256 seals
- Ada contract simulation (real Ada source + JS enforcer)
- Woz Vault audit memory (localStorage)
- Runtime selector (HOLY_SIM active, WASM/WebLLM/Ollama coming soon)

## Honest Labels

All agents are **browser-simulated**. No real Ring 0 HolyC execution. No remote API calls. This is a research prototype.

## Files

```
index.html          Boot screen + full terminal
holy-terminal.html  Dedicated HolyC terminal
debate.html         Debate arena with runtime selector
styles.css          Terminal styling
app.js              Main controller (13 commands)
seal.js             SHA-256 via Web Crypto
woz-vault.js        localStorage audit memory
ascii-registry.js   ASCII art states + trust density bars
trust-deed.js       Trust gate (5 rules)
runtime/            Runtime adapters (holy-sim active, others future)
contracts/          Ada contract source + JS simulator
```

## How to Use

1. Open `index.html` in a browser
2. Boot sequence runs automatically
3. Type `help;` for commands
4. Try `boot;`, `seal;`, `debate("consciousness");`

## Roadmap

- [ ] HolyC WASM adapter
- [ ] WebLLM browser inference
- [ ] Ollama desktop bridge
- [ ] Real Ada contract compilation

## Trust Deed

See [TRUST_DEED.md](TRUST_DEED.md) for governing rules.

## License

Research use only. Not production.