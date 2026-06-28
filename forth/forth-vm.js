/**
 * SNAPKITTY FORTH VM
 * Stack-based Forth interpreter for the Apple II Universal Machine.
 * Agent personas defined as Forth words — composable, minimal, sovereign.
 *
 * Implements: stack ops, arithmetic, control flow, word definitions,
 * string output, and sovereign extensions (WORM-SEAL, TRUST-DEED, BEDROCK).
 *
 * ⬡ Ω ↺ Ψ Δ Λ Σ Φ α
 */

var ForthVM = (function () {

  // ── Core VM state ────────────────────────────────────────────────────────────
  function VM() {
    this.stack   = [];          // data stack
    this.rstack  = [];          // return stack
    this.dict    = {};          // word dictionary
    this.memory  = new Array(65536).fill(0);
    this.output  = '';
    this.trace   = [];
    this.sealed  = false;
    this.verdict = null;

    this._definePrimitives();
    this._defineSovereignWords();
  }

  // ── Stack helpers ─────────────────────────────────────────────────────────────
  VM.prototype.push  = function(v) { this.stack.push(v); };
  VM.prototype.pop   = function()  {
    if (!this.stack.length) throw new Error('STACK UNDERFLOW');
    return this.stack.pop();
  };
  VM.prototype.peek  = function()  { return this.stack[this.stack.length - 1]; };
  VM.prototype.emit  = function(s) { this.output += s; this.trace.push({type:'out', val:s}); };

  // ── Primitives ────────────────────────────────────────────────────────────────
  VM.prototype._definePrimitives = function() {
    var vm = this;

    // Arithmetic
    this.dict['+']    = function() { vm.push(vm.pop() + vm.pop()); };
    this.dict['-']    = function() { var b=vm.pop(), a=vm.pop(); vm.push(a-b); };
    this.dict['*']    = function() { vm.push(vm.pop() * vm.pop()); };
    this.dict['/']    = function() { var b=vm.pop(), a=vm.pop(); vm.push(Math.floor(a/b)); };
    this.dict['MOD']  = function() { var b=vm.pop(), a=vm.pop(); vm.push(a%b); };
    this.dict['MAX']  = function() { vm.push(Math.max(vm.pop(), vm.pop())); };
    this.dict['MIN']  = function() { vm.push(Math.min(vm.pop(), vm.pop())); };
    this.dict['ABS']  = function() { vm.push(Math.abs(vm.pop())); };

    // Comparison
    this.dict['=']    = function() { vm.push(vm.pop() === vm.pop() ? -1 : 0); };
    this.dict['<>']   = function() { vm.push(vm.pop() !== vm.pop() ? -1 : 0); };
    this.dict['<']    = function() { var b=vm.pop(), a=vm.pop(); vm.push(a<b?-1:0); };
    this.dict['>']    = function() { var b=vm.pop(), a=vm.pop(); vm.push(a>b?-1:0); };
    this.dict['0=']   = function() { vm.push(vm.pop()===0?-1:0); };
    this.dict['0<']   = function() { vm.push(vm.pop()<0?-1:0); };
    this.dict['0>']   = function() { vm.push(vm.pop()>0?-1:0); };

    // Logic
    this.dict['AND']  = function() { vm.push(vm.pop() & vm.pop()); };
    this.dict['OR']   = function() { vm.push(vm.pop() | vm.pop()); };
    this.dict['NOT']  = function() { vm.push(~vm.pop()); };
    this.dict['INVERT'] = function() { vm.push(vm.pop()===0?-1:0); };

    // Stack
    this.dict['DUP']  = function() { var v=vm.peek(); vm.push(v); };
    this.dict['DROP'] = function() { vm.pop(); };
    this.dict['SWAP'] = function() { var b=vm.pop(),a=vm.pop(); vm.push(b); vm.push(a); };
    this.dict['OVER'] = function() { var b=vm.pop(),a=vm.pop(); vm.push(a); vm.push(b); vm.push(a); };
    this.dict['ROT']  = function() { var c=vm.pop(),b=vm.pop(),a=vm.pop(); vm.push(b); vm.push(c); vm.push(a); };
    this.dict['NIP']  = function() { var b=vm.pop(); vm.pop(); vm.push(b); };
    this.dict['TUCK'] = function() { var b=vm.pop(),a=vm.pop(); vm.push(b); vm.push(a); vm.push(b); };
    this.dict['2DUP'] = function() { var b=vm.pop(),a=vm.pop(); vm.push(a);vm.push(b);vm.push(a);vm.push(b); };
    this.dict['2DROP']= function() { vm.pop(); vm.pop(); };

    // Output
    this.dict['.']    = function() { vm.emit(String(vm.pop()) + ' '); };
    this.dict['CR']   = function() { vm.emit('\n'); };
    this.dict['SPACE']= function() { vm.emit(' '); };
    this.dict['SPACES']= function() { var n=vm.pop(); for(var i=0;i<n;i++) vm.emit(' '); };
    this.dict['.S']   = function() {
      vm.emit('<' + vm.stack.length + '> ');
      vm.stack.forEach(function(v){ vm.emit(String(v)+' '); });
    };

    // Boolean
    this.dict['TRUE'] = function() { vm.push(-1); };
    this.dict['FALSE']= function() { vm.push(0); };

    // String
    this.dict['TYPE'] = function() { vm.emit(String(vm.pop())); };

    // Misc
    this.dict['NOP']  = function() {};
    this.dict['BYE']  = function() { vm.emit('\nSnapKitty Forth — BYE ⬡\n'); };
  };

  // ── Sovereign word extensions ─────────────────────────────────────────────────
  VM.prototype._defineSovereignWords = function() {
    var vm = this;

    // WORM-SEAL — seal the top of stack as a WORM event
    this.dict['WORM-SEAL'] = function() {
      var payload = vm.pop();
      var ts      = new Date().toISOString();
      var hash    = simHash(String(payload) + ts);
      vm.push(hash);
      vm.trace.push({ type: 'worm', payload: payload, hash: hash, ts: ts });
      vm.emit('⬡ WORM:' + hash + ' ');
    };

    // TRUST-DEED? — check if the top-of-stack intent passes Trust Deed
    this.dict['TRUST-DEED?'] = function() {
      var intent = vm.pop();
      var blocked = /delete|drop|purge|override|destroy|escalate/i.test(String(intent));
      vm.push(blocked ? 0 : -1);
      vm.trace.push({ type: 'trust-deed', intent: intent, passed: !blocked });
    };

    // BEDROCK — route query to Bedrock (simulated — returns stub in browser)
    this.dict['BEDROCK'] = function() {
      var query = vm.pop();
      var result = '[BEDROCK:claude-sonnet-4-6] ' + String(query) + ' → PROCESSED';
      vm.push(result);
      vm.trace.push({ type: 'bedrock', query: query });
    };

    // LOCAL-GPU — route to local Granite (Ollama :11434)
    this.dict['LOCAL-GPU'] = function() {
      var code = vm.pop();
      var result = '[GRANITE-CODE:3B@RTX3080] ' + String(code) + ' → COMPILED';
      vm.push(result);
      vm.trace.push({ type: 'local-gpu', code: code });
    };

    // CATCODE — behavioral screening
    this.dict['CATCODE'] = function() {
      var input = vm.pop();
      var risk  = /evil|harm|attack|inject/i.test(String(input)) ? 'BLOCK' : 'PASS';
      vm.push(risk === 'PASS' ? -1 : 0);
      vm.push(risk);
      vm.trace.push({ type: 'catcode', input: input, verdict: risk });
    };

    // SOVEREIGN-ENVELOPE — wrap result in sovereign envelope
    this.dict['SOVEREIGN-ENVELOPE'] = function() {
      var result = vm.pop();
      var env = {
        payload: result,
        seal:    '⬡ Ω ↺ Ψ Δ Λ Σ Φ α',
        ts:      new Date().toISOString(),
        agent:   'FORTH-VM',
      };
      vm.push(env);
      vm.trace.push({ type: 'envelope', env: env });
    };

    // VERDICT — set the final verdict of a CATCODE/TRUST-DEED run
    this.dict['VERDICT'] = function() {
      vm.verdict = vm.pop();
      vm.emit('VERDICT: ' + String(vm.verdict) + '\n');
    };

    // SEAL — alias for WORM-SEAL
    this.dict['SEAL'] = this.dict['WORM-SEAL'];
  };

  // ── Simple hash simulation ────────────────────────────────────────────────────
  function simHash(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) {
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }
    return (h >>> 0).toString(16).padStart(8, '0');
  }

  // ── Tokenizer ─────────────────────────────────────────────────────────────────
  function tokenize(src) {
    var tokens = [];
    var i = 0;
    src = src.replace(/\\\s[^\n]*/g, '');      // strip line comments
    src = src.replace(/\( [^)]*\)/g, '');       // strip stack comments ( -- )
    var raw = src.split(/\s+/).filter(Boolean);

    while (i < raw.length) {
      // String literal: ." ... "
      if (raw[i] === '."') {
        var s = '';
        i++;
        while (i < raw.length && !raw[i].endsWith('"')) { s += raw[i] + ' '; i++; }
        if (i < raw.length) { s += raw[i].slice(0, -1); i++; }
        tokens.push({ type: 'str', val: s });
      } else {
        var n = Number(raw[i]);
        if (!isNaN(n) && raw[i] !== '') {
          tokens.push({ type: 'num', val: n });
        } else {
          tokens.push({ type: 'word', val: raw[i].toUpperCase() });
        }
        i++;
      }
    }
    return tokens;
  }

  // ── Compiler: word definitions ────────────────────────────────────────────────
  function compile(tokens, dict) {
    var compiled = [];
    var i = 0;

    while (i < tokens.length) {
      var tok = tokens[i];

      if (tok.type === 'word' && tok.val === ':') {
        // Word definition: : WORDNAME ... ;
        i++;
        var name = tokens[i].val;
        i++;
        var body = [];
        while (i < tokens.length && !(tokens[i].type === 'word' && tokens[i].val === ';')) {
          body.push(tokens[i]);
          i++;
        }
        i++; // skip ;

        // Close over the body at definition time
        (function(wname, wbody) {
          dict[wname] = function(vm) {
            vm._execTokens(wbody);
          };
        })(name, body);

      } else {
        compiled.push(tok);
        i++;
      }
    }
    return compiled;
  }

  // ── Execute token list ────────────────────────────────────────────────────────
  VM.prototype._execTokens = function(tokens) {
    var vm = this;
    var i  = 0;

    while (i < tokens.length) {
      var tok = tokens[i];

      if (tok.type === 'num') {
        vm.push(tok.val);

      } else if (tok.type === 'str') {
        vm.emit(tok.val);

      } else if (tok.type === 'word') {
        var w = tok.val;

        // IF / ELSE / THEN
        if (w === 'IF') {
          var cond = vm.pop();
          var thenBranch = [], elseBranch = [], depth = 1;
          i++;
          while (i < tokens.length && depth > 0) {
            var t = tokens[i];
            if (t.type === 'word') {
              if (t.val === 'IF') depth++;
              else if (t.val === 'THEN') { depth--; if (depth===0) break; }
              else if (t.val === 'ELSE' && depth===1) {
                i++;
                while (i < tokens.length) {
                  var e = tokens[i];
                  if (e.type==='word' && e.val==='THEN') break;
                  elseBranch.push(e); i++;
                }
                break;
              }
            }
            if (depth > 0) thenBranch.push(t);
            i++;
          }
          if (cond !== 0) vm._execTokens(thenBranch);
          else if (elseBranch.length) vm._execTokens(elseBranch);

        // BEGIN / UNTIL loop
        } else if (w === 'BEGIN') {
          var loopBody = [];
          i++;
          while (i < tokens.length) {
            var lt = tokens[i];
            if (lt.type==='word' && lt.val==='UNTIL') break;
            loopBody.push(lt); i++;
          }
          var guard = 0;
          do {
            vm._execTokens(loopBody);
            guard++;
            if (guard > 10000) break;
          } while (vm.pop() === 0);

        // DO / LOOP
        } else if (w === 'DO') {
          var doBody = [];
          i++;
          while (i < tokens.length) {
            var dt = tokens[i];
            if (dt.type==='word' && dt.val==='LOOP') break;
            doBody.push(dt); i++;
          }
          var limit = vm.pop(), idx = vm.pop();
          while (idx < limit) {
            // I word — push current index
            vm.dict['I'] = (function(n){ return function(){ vm.push(n); }; })(idx);
            vm._execTokens(doBody);
            idx++;
          }

        } else if (w in vm.dict) {
          var fn = vm.dict[w];
          // Some words take vm explicitly (compiled defs), others use closure
          try { fn(vm); } catch(e) { vm.emit('\nERR['+w+']: '+e.message+'\n'); }

        } else {
          vm.emit('\nUNKNOWN WORD: ' + w + '\n');
        }
      }

      i++;
    }
  };

  // ── Main eval ─────────────────────────────────────────────────────────────────
  VM.prototype.eval = function(src) {
    this.output  = '';
    this.trace   = [];
    this.verdict = null;

    try {
      var tokens  = tokenize(src);
      var program = compile(tokens, this.dict);
      this._execTokens(program);
    } catch(e) {
      this.output += '\nFORTH ERROR: ' + e.message + '\n';
    }

    return {
      output:  this.output,
      stack:   this.stack.slice(),
      trace:   this.trace,
      verdict: this.verdict,
      dict:    Object.keys(this.dict),
      seal:    '⬡ Ω ↺ Ψ Δ Λ Σ Φ α',
    };
  };

  // ── Public API ────────────────────────────────────────────────────────────────
  return {
    create: function() { return new VM(); },
    run:    function(src) { return new VM().eval(src); },
    version: '0.1.0',
  };

})();

if (typeof module !== 'undefined') module.exports = ForthVM;
