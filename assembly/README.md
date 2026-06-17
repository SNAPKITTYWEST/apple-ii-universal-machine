# Assembly Layer

This folder contains simulated assembly artifacts for the Apple II Universal Machine.

## Files

- `boot.asm` — Demo assembly source (not executed, visual artifact only)
- `register-sim.js` — Simulated CPU register state (AX, BX, CX, DX, IP, FLAGS)
- `opcode-viewer.js` — Translates terminal commands into readable fake opcodes

## Status

**SIMULATED** — This is a register/opcode visualizer, not a real CPU emulator.

No native assembly is executed. All register state is maintained in JavaScript.

## Commands

- `AsmStatus;` — Show assembly layer status
- `Registers;` — Show current register state
- `Opcodes Boot;` — Show opcode for a command
