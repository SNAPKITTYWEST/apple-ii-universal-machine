# SwiftWasm Runtime Layer

This folder contains the Swift source for the Apple II Universal Machine runtime.

## Status

**EXPERIMENTAL** — SwiftWasm is early-adopter technology. JS fallback remains required.

## Building

```bash
cd swift
swift build
```

For WebAssembly:
```bash
swift build --triple wasm32-unknown-wasi
```

## Exposed Functions

- `boot()` — Initialize system
- `status()` — Runtime status
- `trust(command)` — Trust contract check
- `evalLisp(expression)` — Evaluate s-expression
- `createSealPayload(command, output)` — Generate seal hash
- `agentStatus()` — Agent status

## Integration

The browser loads the `.wasm` file and calls Swift functions through JavaScript glue. If loading fails, the JavaScript simulator continues as fallback.

## Files

- `Package.swift` — Swift package manifest
- `Sources/AppleIIRuntime/Runtime.swift` — Command parsing, boot, status
- `Sources/AppleIIRuntime/TrustContract.swift` — Contract decisions
- `Sources/AppleIIRuntime/LispMachine.swift` — S-expression evaluator
- `Sources/AppleIIRuntime/WozSeal.swift` — SHA-256 seal generation
- `Sources/AppleIIRuntime/Exports.swift` — C-callable WASM exports
