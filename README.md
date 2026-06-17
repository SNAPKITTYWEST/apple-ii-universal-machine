# Apple II Universal Machine

Sun Boot MVP — a static GitHub Pages cockpit for local agent simulation.

## What This Is

A plain HTML/CSS/JS boot cockpit that runs entirely in the browser. No Node. No backend. No paid APIs.

- **ROM**: GitHub Pages hosts the files
- **Bootloader**: `index.html` loads the kernel
- **Kernel**: `kernel.js` handles routing and audit
- **Holy Page**: rescue fallback when anything breaks
- **Debate Arena**: local ENKI + SENTINEL agent simulation
- **Woz Vault**: localStorage audit memory (append-only)
- **Seal**: SHA-256 via browser Web Crypto API
- **ASCII**: visual dashboard with trust density bars

## How to Open Locally

Just open `index.html` in any modern browser. No server needed.

```
open index.html
```

Or use the GitHub Pages URL after deploy.

## GitHub Pages Deploy

Push to `master` branch. The workflow in `.github/workflows/pages.yml` deploys automatically.

URL format: `https://<username>.github.io/apple-ii-universal-machine/`

## What Is Simulated

- ENKI agent proposing tensions (local lookup table)
- SENTINEL agent auditing claims (pattern matching)
- SHA-256 seals (real Web Crypto)
- Audit log persistence (localStorage)
- Route recovery (Holy Page fallback)

## What Is Not Claimed

- Real OS or hardware emulation
- Real Apple II emulation
- Real agent autonomy or inference
- Real formal proof
- Real network calls

## Commands

In the debate page, type a topic:
- `consciousness`
- `covenant`
- `free will`
- `metatron`
- `soul`

Or any other text — ENKI will respond with a generic exploration.

## Trust Deed

See `TRUST_DEED.md` for the governing covenant.

One cockpit. Many agents. No token tax.
