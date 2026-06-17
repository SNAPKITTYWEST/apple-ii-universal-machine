# Apple II Universal Machine — User Guide

A complete guide to operating the browser-native agent OS cockpit.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Terminal Basics](#terminal-basics)
3. [Core Commands](#core-commands)
4. [Ada Contracts](#ada-contracts)
5. [Lisp Machine](#lisp-machine)
6. [Assembly & Encoding](#assembly--encoding)
7. [Heterogeneous VM Lab](#heterogeneous-vm-lab)
8. [Fontana → Lisp → VM Pipeline](#fontana--lisp--vm-pipeline)
9. [Agent System](#agent-system)
10. [Digital Twins](#digital-twins)
11. [Mode Switching](#mode-switching)
12. [Ollama Agent-in-a-Box](#ollama-agent-in-a-box)
13. [Vacuum Pipeline](#vacuum-pipeline)
14. [Envelope System](#envelope-system)
15. [Export & Screenshots](#export--screenshots)
16. [Repo Staple & Cold Boot](#repo-staple--cold-boot)
17. [Capsule System](#capsule-system)
18. [Model Architectures](#model-architectures)
19. [GitHub-Native Integration](#github-native-integration)
20. [Keyboard Shortcuts](#keyboard-shortcuts)
21. [Troubleshooting](#troubleshooting)
22. [FAQ](#faq)

---

## Getting Started

### Opening the Cockpit

1. Navigate to `https://SNAPKITTYWEST.github.io/apple-ii-universal-machine/`
2. Watch the boot sequence (ASCII art + status messages)
3. The terminal appears with `HolySim>` prompt
4. Type `Help;` to see all commands

### Two Terminals

- **index.html** — Main terminal with status panel, audit log, runtime bar
- **holy-terminal.html** — Dedicated HolyC terminal with 100+ commands, button bar, full status

Both share the same Woz Vault (localStorage) and seal engine.

### First Commands

```
Help;                    Show all commands
Boot;                    Reboot with ASCII art
Status;                  System status + runtime detection
Seal;                    Generate SHA-256 seal
Debate("consciousness"); Run ENKI/SENTINEL debate
```

---

## Terminal Basics

### Input Format

Commands use HolyC-style syntax with semicolons:

```
CommandName;
CommandName "argument";
CommandName "arg1" "arg2";
```

Or parenthetical style:

```
CommandName(argument);
```

### Command History

- **↑ Arrow** — Previous command
- **↓ Arrow** — Next command
- **Enter** — Execute

### Button Bar

Click buttons for quick access to common commands. Buttons are grouped by layer.

### Status Bar

Shows live state:
- `VAULT: N` — Woz Vault event count
- `SEALS: N` — Total seals generated
- `OLLAMA: ONLINE/OFFLINE` — Ollama connection
- `MODEL: llama3.2` — Current model
- `MODE: APPLE` — Active mode
- `AGENTS: N` — Registered agents
- `TWINS: N` — Registered twins
- `CAPSULES: N` — Registered capsules
- `REPO STAPLE: VERIFIED/UNVERIFIED` — Staple status
- `GITHUB NATIVE: READY/AUTH REQUIRED` — GitHub auth

---

## Core Commands

### Help

```
Help;
```

Displays the full command reference organized by layer.

### Boot

```
Boot;
```

Runs Ada contract check, displays ASCII art boot sequence, generates seal, writes audit event.

### Status

```
Status;
```

Shows:
- System version
- Vault event count
- Seal count
- Runtime status (all adapters)
- Agent/twin/capsule counts

### Trust

```
Trust;
```

Runs the 8-gate trust check:
- `local_only` — No remote execution
- `non_destructive` — No data destruction
- `auditable` — All actions logged
- `sealable` — SHA-256 available
- `recoverable` — State can be restored

### Seal

```
Seal;
Seal "custom payload";
```

Generates SHA-256 hash via Web Crypto API. Writes to Woz Vault.

### Woz Vault

```
Vault;
```

Displays the full audit log with timestamps, event types, and seal hashes.

### Clear Vault

```
ClearVault;
```

Wipes all Woz Vault data. Requires Ada contract confirmation.

### Export

```
Export;
```

Downloads complete audit log + snapshots as JSON file.

### About

```
About;
```

System information including runtime, agents, contracts, and philosophy.

---

## Ada Contracts

### Ada Status

```
AdaStatus;
```

Shows all 7 contract gates and their status.

### Contracts

```
Contracts;
```

Lists all contract gates with descriptions.

### How Contracts Work

Ada contracts are real `.ads`/`.adb` source files enforced by a JavaScript simulator:

- `Boot` — Requires user confirmation
- `Debate` — Always allowed
- `WriteAudit` — Always allowed
- `ExportSnapshot` — Always allowed
- `ClearVault` — Requires user confirmation
- `InvokeLisp` — Always allowed
- `InvokeRuntime` — Always allowed

When a command requires a contract check, it runs through `ContractRegistry.check()` before execution.

---

## Lisp Machine

### Lisp Help

```
LispHelp;
```

Shows all Lisp commands.

### Evaluate Expressions

```
LispEval (+ 1 2);
LispEval (* 10 5);
LispEval (- 100 37);
```

Arithmetic operations on s-expressions.

### System Queries

```
LispEval (agent-status);
LispEval (trust-score);
LispEval (woz-vault-count);
LispEval (seal-state);
```

Query system state through Lisp.

### ASCII Art

```
LispEval (draw-agent);
```

Generate ASCII art representation of agents.

### Fontana Reaction

```
FontanaReact (agent trust audit);
FontanaReact (quantum consciousness);
```

Symbolic reaction chamber — transforms input symbols through reaction rules.

---

## Assembly & Encoding

### Assembly Status

```
AsmStatus;
```

Shows assembly layer status (simulated register/opcode viewer).

### CPU Registers

```
Registers;
```

Displays current CPU register state:
- `AX` — Accumulator
- `BX` — Base
- `CX` — Counter
- `DX` — Data
- `IP` — Instruction Pointer
- `FLAGS` — Status flags

### Opcodes

```
Opcodes Boot;
Opcodes Seal;
Opcodes Deploy;
```

Shows the opcode translation for a given command.

### Reverse Unicode

```
ReverseUnicode "Hello World";
```

Reverses and mirrors a string using Unicode character mapping.

### Glyph Seal

```
GlyphSeal "No token tax";
```

Creates a visual seal with:
- Original text
- Reversed text
- Mirrored text
- SHA-256 hash

### Restore Unicode

```
RestoreUnicode "dlroW olleH";
```

Restores a mirrored/reversed string to original.

---

## Heterogeneous VM Lab

### Prolog Gate

```
PrologAsk allowed(boot_agent);
PrologAsk requires_seal(deploy_code);
```

Symbolic rule lookup against 18 predefined rules. Returns ALLOWED, DENIED, or REQUIRES_SEAL.

### Macro Expansion

```
MacroExpand boot_agent;
MacroExpand deploy_code;
MacroExpand audit_trail;
```

Expands high-level intent into step-by-step execution plan.

### Bytecode VM

```
BytecodeRun PUSH 1 PUSH 2 ADD PRINT;
BytecodeRun PUSH 5 PUSH 3 SUB PRINT;
```

Safe stack-based interpreter with operations:
- `PUSH value` — Push to stack
- `ADD` — Add top two
- `SUB` — Subtract
- `MUL` — Multiply
- `PRINT` — Output top
- `HALT` — Stop

1000 step limit. No external dependencies.

### Brainfuck Tape

```
BrainfuckRun ++>+++<[->+<]>.;
```

Sandboxed Brainfuck interpreter:
- 30,000 cells
- 5,000 step limit
- Bracket balance validation
- No infinite loop risk

### Machine Viewer

```
MachineView boot_agent;
MachineView deploy_code;
```

Generates fake opcode artifact for visual representation. NOT EXECUTED.

### VM Trace

```
VMTrace boot_agent;
VMTrace audit_trail;
```

Runs full pipeline: Prolog → Macros → Bytecode → Machine View → SHA-256 seal.

---

## Fontana → Lisp → VM Pipeline

### Fontana Decode

```
FontanaDecode agent trust audit;
FontanaDecode deploy payment received;
```

Decodes Fontana symbols into:
- Lisp s-expression
- Bytecode operations

### Lisp Expand

```
LispExpand (agent trust audit);
LispExpand (deploy payment received);
```

Expands a Lisp expression into detailed form.

### Lisp to VM

```
LispToVM (boot);
LispToVM (agent trust audit);
```

Compiles Lisp expression to VM bytecode.

### Full Pipeline Example

```
FontanaDecode agent trust audit;
→ Produces Lisp: (event agent_trust_audit)
→ Produces bytecode: [PUSH_EVENT, DEFINE_EVENT, LOAD_AGENT, CHECK_TRUST, SEAL, HALT]
```

---

## Agent System

### Agent Help

```
AgentHelp;
```

Shows all agent commands.

### Spawn Agent

```
SpawnAgent "Researcher";
SpawnAgent "Auditor" auditor;
SpawnAgent "Builder" builder;
```

Creates a new agent with:
- Unique ID (`agent_...`)
- Name
- Role (8 options)
- Tools
- Permissions
- Memory scope
- SHA-256 seal

### Agent Roles

| Role | Tools | Permissions |
|------|-------|-------------|
| `researcher` | search, summarize, cite | read, audit |
| `auditor` | verify, seal, log | read, audit |
| `builder` | create, edit, compile | read, write |
| `debater` | propose, challenge, synthesize | read, audit |
| `archivist` | store, index, retrieve | read, write |
| `sentinel` | monitor, alert, block | read, audit |
| `explorer` | scan, map, discover | read |
| `translator` | decode, encode, transform | read, write |

### List Agents

```
ListAgents;
```

Shows all registered agents with run counts.

### Run Agent

```
RunAgent "Researcher" "analyze system";
RunAgent "Auditor" "verify trust deed";
```

Runs agent on task. Generates role-appropriate response. Writes audit event + seal.

### Inspect Agent

```
InspectAgent "Researcher";
```

Shows full agent profile: ID, name, role, tools, permissions, memory, mode, runs, seal.

### Delete Agent

```
DeleteAgent "Researcher";
```

Removes agent from registry.

---

## Digital Twins

### Twin Help

```
TwinHelp;
```

Shows all twin commands.

### Create Twin

```
CreateTwin "Analyst";
```

Creates a digital twin with:
- Unique ID (`twin_...`)
- Name
- Default role: analyst
- Default personality: methodical
- SHA-256 seal

### Design Twin

```
DesignTwin "Analyst" role="researcher" memory="persistent";
DesignTwin "Analyst" personality="methodical" permissions="read,audit";
```

Customize twin specifications.

### Twin Roles

- `analyst` — Pattern analysis, data flow, risk assessment
- `builder` — Component identification, build planning
- `researcher` — Source analysis, findings summary

### List / Run / Inspect / Delete

```
ListTwins;
RunTwin "Analyst" "review code quality";
InspectTwin "Analyst";
DeleteTwin "Analyst";
```

Same pattern as agents.

---

## Mode Switching

### List Modes

```
ListModes;
```

Shows all 6 modes with themes:

| Mode | Theme | Focus |
|------|-------|-------|
| `apple` | terminal-green | Full command set |
| `linux` | terminal-amber | Shell-focused |
| `windows` | terminal-blue | PowerShell-style |
| `holy` | terminal-gold | Faith-governed |
| `vm` | terminal-cyan | VM-focused |
| `agent` | terminal-magenta | Agent-focused |

### Switch Mode

```
SwitchMode linux;
SwitchMode vm;
SwitchMode holy;
```

Filters available commands. Updates prompt and theme.

### Current Mode

```
CurrentMode;
```

Shows active mode name, theme, and prompt.

---

## Ollama Agent-in-a-Box

### Ollama Status

```
OllamaStatus;
```

Shows connection status, URL, model, model count, last probe time.

### Connect Ollama

```
ConnectOllama;
```

Probes `http://localhost:11434` with 3-second timeout.

If offline: `OLLAMA: OFFLINE — using simulated agent mode`
If online: Lists detected models.

### List Models

```
ListModels;
```

Shows 10 default models + any detected local models:

| Model | Best For |
|-------|----------|
| `llama3.2` | General purpose |
| `llama3.1` | Fast inference |
| `mistral` | Reasoning |
| `codellama` | Code generation |
| `phi3` | Compact |
| `gemma2` | Balanced |
| `qwen2.5` | Multilingual |
| `deepseek-coder` | Code specialist |
| `neural-chat` | Conversational |
| `starling-lm` | Alignment |

### Spawn Ollama Agent

```
SpawnAgent "Researcher";
```

Creates agent with current Ollama model.

### Design Agent

```
DesignAgent "Researcher" role="research" model="llama3.2" mode="linux";
```

Configure agent model and role.

### Run Agent

```
RunAgent "Researcher" "Explain local-first AI";
```

If Ollama is online: sends to `localhost:11434/api/generate`
If offline: returns simulated response with label

---

## Vacuum Pipeline

### Vacuum Help

```
VacuumHelp;
```

Shows vacuum commands and pipeline.

### Vacuum Ingest

```
VacuumIngest "The customer paid the invoice on Tuesday";
```

Stores raw text with:
- Word count
- Sentence count
- Character count
- Timestamp

### Extract Meaning

```
ExtractMeaning "The customer paid the invoice on Tuesday";
```

Extracts:
- Entities (customer, invoice)
- Actions (paid)
- Topics (payment, customer)
- Sentiment (-1 to +1)
- Word/sentence counts

### To Lisp

```
ToLisp "customer paid invoice";
ToLisp "deploy payment received";
```

Full pipeline:
1. Extract meaning from text
2. Map to normalized schema
3. Generate Lisp s-expression

Output:
```
EVENT: customer_paid_invoice
CATEGORY: payment
LISP: (pipeline (event customer_paid_invoice) (schema (category payment) (confidence 0.7)))
```

---

## Envelope System

### Compile Envelope

```
CompileEnvelope "(event payment received)";
CompileEnvelope "(event agent_trust_audit)";
```

Pipeline:
1. Parse Lisp expression
2. Compile to bytecode
3. Build signed envelope
4. Execute bytecode trace
5. Write audit event + seal

Envelope format:
```json
{
  "envelopeId": "env_...",
  "type": "BYTECODE_ENVELOPE",
  "source": "(event payment received)",
  "lisp": "(event payment received)",
  "bytecode": ["PUSH_EVENT", "DEFINE_EVENT", "VERIFY", "SEAL", "HALT"],
  "trust": "ALLOWED",
  "seal": "sha256...",
  "createdAt": "2026-06-17T...",
  "mode": "apple",
  "verified": true
}
```

### Verify Envelope

```
VerifyEnvelope;
```

8-check verification:
- Has ID
- Has type
- Has source
- Has Lisp expression
- Has bytecode array
- Has seal
- Has trust
- Seal length ≥ 32

### Run Envelope

```
RunEnvelope;
```

Executes verified bytecode. Outputs step trace. Writes audit + seal.

### Export Envelope

```
ExportEnvelope;
```

Downloads envelope as JSON file.

---

## Export & Screenshots

### Screenshot Terminal

```
ScreenshotTerminal;
```

Renders terminal content to canvas, downloads as PNG image.

### Export Proof

```
ExportProof;
```

Full proof package including:
- Agent name
- Model
- Prompt
- Response
- Timestamp
- Mode
- Seal
- Audit count

Downloads as JSON.

---

## Repo Staple & Cold Boot

### Staple Repo

```
StapleRepo;
```

Generates manifest:
```json
{
  "repo": "apple-ii-universal-machine",
  "version": "1.0.0",
  "files": [...],
  "fileCount": 100,
  "buildTimestamp": "...",
  "pageSeal": "sha256...",
  "vaultSnapshotHash": "sha256...",
  "vaultEvents": 42,
  "agentCount": 3,
  "twinCount": 2,
  "capsuleCount": 1,
  "mode": "apple",
  "verified": true
}
```

### Verify Staple

```
VerifyStaple;
```

Checks 7 conditions:
- Has repo name
- Has version
- Has files
- Has timestamp
- Has page seal
- Has vault hash
- Seal length ≥ 32

### Cold Boot

```
ColdBoot;
```

Replays boot sequence:
1. Read staple manifest
2. Check Woz Vault
3. Verify page seal
4. Restore last known state
5. Print SUN BOOT COMPLETE

### Staple Status

```
StapleStatus;
```

Shows verified/unverified, repo, version, file count, page seal, cold boot status.

---

## Capsule System

### Capsule Help

```
CapsuleHelp;
```

Shows all capsule commands.

### Create Capsule

```
CreateCapsule "Researcher";
```

Creates capsule with:
- Name
- Type: agent
- Architecture: transformer
- Model: ollama/llama3.2
- Runtime: ollama
- Tools, permissions, evals
- Limitations (honest labels)
- Intended use
- SHA-256 seal

### Design Capsule

```
DesignCapsule "Researcher" arch="mamba" model="ollama/mistral" runtime="ollama";
DesignCapsule "Researcher" limitations="Simulated only|No remote calls" intendedUse="Local research";
```

### List Capsules

```
ListCapsules;
```

Shows all capsules with type, architecture, and model.

### Inspect Capsule

```
InspectCapsule "Researcher";
```

Full capsule profile.

### Run Capsule

```
RunCapsule "Researcher" "Explain local-first AI";
```

If Ollama online: sends to model
If offline: returns simulated response

### Verify Capsule

```
VerifyCapsule "Researcher";
```

8-check verification of capsule metadata.

### Staple Capsule

```
StapleCapsule "Researcher";
```

Links capsule to repo staple manifest.

### Export Capsule

```
ExportCapsule "Researcher";
```

Downloads capsule as JSON.

### Generate Agent Card

```
GenerateAgentCard "Researcher";
```

Downloads Markdown card with:
- Intended use
- Limitations
- Model/runtime
- Memory policy
- Permissions
- Eval commands
- Woz Vault seal
- Repo staple info

### Generate Model Card

```
GenerateModelCard "Researcher";
```

Downloads model card with architecture, base model, training status (SIMULATED).

---

## Model Architectures

### List Architectures

```
ListArchitectures;
```

Shows available architectures:

| Architecture | Description |
|-------------|-------------|
| `transformer` | Attention-based, standard LLM |
| `mamba` | State-space model, linear complexity |
| `hybrid` | Transformer + Mamba combination |

### Select Architecture

When creating or designing capsules:

```
CreateCapsule "Researcher" arch="mamba";
DesignCapsule "Researcher" arch="hybrid";
```

---

## GitHub-Native Integration

### GitHub Help

```
GitHubHelp;
```

Shows all GitHub commands.

### GitHub Login

```
GitHubLogin "ghp_your_token_here";
```

**Security rules:**
- Token stored in `sessionStorage` only (not `localStorage`)
- Never committed to repo
- Never written to Woz Vault
- Never shown in terminal output
- Cleared on page close

### GitHub Status

```
GitHubStatus;
```

Shows authentication status, username, scopes.

### GitHub Logout

```
GitHubLogout;
```

Clears token from sessionStorage.

### Create Inverted Repo

```
CreateInvertedRepo "my-agent-os";
CreateInvertedRepo "my-twin-os" twin;
CreateInvertedRepo "my-vacuum-os" vacuum;
CreateInvertedRepo "my-vm-lab" vm;
```

Creates GitHub repo via API with:
- README.md
- TRUST_DEED.md
- capsule.json
- woz-staple.json
- index.html
- .github/workflows/pages.yml
- .github/workflows/capsule-verify.yml

### Create Repo From Template

```
CreateRepoFromTemplate "my-agent-os";
```

Same as CreateInvertedRepo with template selection.

### Staple Remote Repo

```
StapleRemoteRepo "owner/repo";
```

Writes `woz-staple.json` to remote repo.

### Verify Remote Repo

```
VerifyRemoteRepo "owner/repo";
```

Reads and verifies remote staple manifest.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Execute command |
| `↑` | Previous command |
| `↓` | Next command |
| `Tab` | (not yet implemented) |

---

## Troubleshooting

### "Unknown: command"

Command not recognized. Type `Help;` for full list.

### "ADA CONTRACT: DENIED"

Command requires contract confirmation. For `ClearVault;`, confirm when prompted.

### "Ollama: OFFLINE"

Ollama not running at localhost:11434. Start Ollama or use simulated mode.

### "No envelope built"

Run `CompileEnvelope` before `VerifyEnvelope` or `RunEnvelope`.

### "Agent not found"

Agent name must match exactly (case-sensitive). Run `ListAgents;` to see registered agents.

### "Token not valid"

GitHub token must start with `ghp_` or `github_pat_`. Check token permissions.

### Vault seems empty

Run `Boot;` or `Seal;` to generate events. Check `Vault;` for audit log.

---

## FAQ

### Is this real HolyC?

No. This is a browser-safe simulation. All execution is JavaScript in the browser. The Ada contract source files (`.ads`/`.adb`) are real Ada but enforced by a JS simulator.

### Does Ollama work?

If you have Ollama running at localhost:11434, yes. Otherwise, all agent runs use simulated mode with honest labels.

### Can I break it?

No. All VM execution is sandboxed (step limits, cell limits). Brainfuck has 5000 steps max. Bytecode VM has 1000 steps max.

### Where is data stored?

All data is in browser `localStorage`. No server. No database. No cloud. Clear your browser data to reset.

### Can I export everything?

Yes. `Export;` downloads audit log. `ExportProof;` downloads full proof package. `ExportCapsule "N";` downloads capsule JSON. `ScreenshotTerminal;` downloads terminal as PNG.

### How do I verify integrity?

Run `VerifyStaple;` to check repo staple. Run `VerifyCapsule "N";` to check capsule. Run `Trust;` to check trust gates. Every action generates a SHA-256 seal.

### What is cold boot?

`ColdBoot;` reads the repo staple manifest, checks Woz Vault, verifies the page seal, restores last known state, and prints SUN BOOT COMPLETE. It proves the live page is attached to the repo state.

### What is an inverted repo?

An inverted repo is where the source of truth is architectural intent and trust rules, not applications. The repo IS the runtime manifest, proof source, capsule source, and cold-boot source.

---

*Apple II Universal Machine · Browser-native agent OS cockpit · No token tax*
