\ ══════════════════════════════════════════════════════════════════
\ FRANKENSTEIN WORKFLOW — FORTH PROGRAM
\ The complete Brain → Hands → Legs → Review pipeline
\ as a self-contained Forth program.
\
\ Run with:  ForthVM.run(frankensteinSrc)
\ ══════════════════════════════════════════════════════════════════

\ Load agent words first (in the VM dictionary)

\ ── Workflow entry point ──────────────────────────────────────────

: WORKFLOW-HEADER
  ." ╔══════════════════════════════════════╗ " CR
  ." ║   FRANKENSTEIN SOVEREIGN WORKFLOW   ║ " CR
  ." ║   ⬡ Ω ↺ Ψ Δ Λ Σ Φ α              ║ " CR
  ." ╚══════════════════════════════════════╝ " CR
;

: WORKFLOW-STEP ( step-name -- )
  ." ── Step: " TYPE ." ──────────────────── " CR
;

\ ── Step 1: BRAIN ─────────────────────────────────────────────────
: STEP-BRAIN ( task -- brain-output )
  ." BRAIN " WORKFLOW-STEP
  ." Agent: Claude Sonnet 4.6 (AWS Bedrock) " CR
  ." Responsibility: Reasoning, planning, strategy " CR
  BEDROCK
  ." Brain seal: " WORM-SEAL TYPE CR
;

\ ── Step 2: HANDS ─────────────────────────────────────────────────
: STEP-HANDS ( brain-output -- hands-output )
  ." HANDS " WORKFLOW-STEP
  ." Agent: FAISS + Neo4j + NetworkX " CR
  ." Responsibility: Semantic retrieval, graph context " CR
  ." Note: offline degradation — graceful if sidecar down " CR
  WORM-SEAL
  ." Hands seal: " DUP TYPE CR
;

\ ── Step 3: LEGS ──────────────────────────────────────────────────
: STEP-LEGS ( hands-output -- legs-output )
  ." LEGS " WORKFLOW-STEP
  ." Agent: Granite Code 3B (RTX 3080, Docker Ollama :11434) " CR
  ." Responsibility: Code generation, local execution " CR
  LOCAL-GPU
  WORM-SEAL
  ." Legs seal: " DUP TYPE CR
;

\ ── Step 4: REVIEW ────────────────────────────────────────────────
: STEP-REVIEW ( legs-output -- verdict )
  ." REVIEW " WORKFLOW-STEP
  ." Agent: Claude Sonnet 4.6 (AWS Bedrock) " CR
  ." Responsibility: Verification, final governance gate " CR
  CATCODE
  IF
    ." Review: PASS ✓ — output approved " CR
    WORM-SEAL
    ." Final seal: " TYPE CR
    -1
  ELSE
    ." Review: BLOCK ✗ — output rejected " CR
    DROP 0
  THEN
;

\ ── Full pipeline ─────────────────────────────────────────────────
: RUN-FRANKENSTEIN ( task -- )
  WORKFLOW-HEADER
  STEP-BRAIN
  STEP-HANDS
  STEP-LEGS
  STEP-REVIEW
  IF
    ." ✓ WORKFLOW COMPLETE — SOVEREIGN OUTPUT SEALED " CR
  ELSE
    ." ✗ WORKFLOW BLOCKED — Trust Deed or CATCODE rejection " CR
  THEN
  ." ⬡ Ω ↺ Ψ Δ Λ Σ Φ α " CR
;

\ ── Demo run ──────────────────────────────────────────────────────
." Loading Frankenstein workflow... " CR
." Run: task RUN-FRANKENSTEIN " CR
." Example: " CR
." audit-enterprise-accounts RUN-FRANKENSTEIN " CR
