# Encoding Layer

This folder contains the Reverse Unicode and Glyph Seal system.

## Files

- `reverse-unicode.js` — Reversible character mirroring and reversal
- `glyph-seal.js` — Creates visual seals with reversed/mirrored text + SHA-256

## Functions

- `reverseUnicode(input)` — Reverses string character order
- `mirrorGlyphs(input)` — Maps characters to Unicode mirror glyphs
- `restoreUnicode(input)` — Restores mirrored text to original
- `GlyphSeal.create(input)` — Creates full glyph seal with hash

## Status

**ONLINE** — Pure JavaScript, no external dependencies.

## Commands

- `ReverseUnicode "text";` — Reverse a string
- `GlyphSeal "text";` — Create glyph seal with hash
- `RestoreUnicode "text";` — Restore mirrored text
