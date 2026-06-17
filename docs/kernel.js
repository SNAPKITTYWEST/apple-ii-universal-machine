(function() {
  'use strict';

  var output = document.getElementById('term-output');
  var input = document.getElementById('term-input');
  var header = document.getElementById('term-header');
  var app = document.getElementById('app');
  var bootArt = document.getElementById('boot-art');
  var bootStatus = document.getElementById('boot-status');
  var bootScreen = document.getElementById('boot-screen');
  var history = [];
  var historyIdx = -1;

  // --- LISP-style REPL ---

  function print(text, cls) {
    var d = document.createElement('div');
    d.className = 'line ' + (cls || 'l-green');
    d.textContent = text;
    output.appendChild(d);
    output.scrollTop = output.scrollHeight;
  }

  function prints(text, cls) {
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
      print(lines[i], cls);
    }
  }

  function promptEcho(cmd) {
    print('sunboot> ' + cmd, 'l-dim');
  }

  // --- Commands as s-expressions ---

  var COMMANDS = {

    help: function() {
      prints(
        '╔══════════════════════════════════════════════════════╗\n' +
        '║  APPLE II UNIVERSAL MACHINE — LISP REPL             ║\n' +
        '╠══════════════════════════════════════════════════════╣\n' +
        '║                                                      ║\n' +
        '║  (status)        — system status                     ║\n' +
        '║  (agents)        — list agents                       ║\n' +
        '║  (debate "topic")— run ENKI/SENTINEL debate          ║\n' +
        '║  (query "term")  — search local corpus               ║\n' +
        '║  (vault)         — show audit log                    ║\n' +
        '║  (seal "data")   — create SHA-256 seal               ║\n' +
        '║  (trust)         — run trust gate                    ║\n' +
        '║  (clear)         — clear terminal                    ║\n' +
        '║  (help)          — show this                         ║\n' +
        '║  (about)         — about this machine                ║\n' +
        '║                                                      ║\n' +
        '╚══════════════════════════════════════════════════════╝',
        'l-cyan'
      );
    },

    about: function() {
      prints(
        '\n' +
        '  APPLE II UNIVERSAL MACHINE\n' +
        '  Sun Boot MVP v1.0\n\n' +
        '  A local-first browser cockpit for agent simulation.\n' +
        '  No Node. No backend. No paid APIs.\n\n' +
        '  ROM:      GitHub Pages\n' +
        '  Kernel:   kernel.js\n' +
        '  Memory:   Woz Vault (localStorage)\n' +
        '  Seal:     SHA-256 (Web Crypto)\n' +
        '  Agents:   ENKI (proposer) + SENTINEL (auditor)\n\n' +
        '  "One cockpit. Many agents. No token tax."',
        'l-white'
      );
    },

    status: function() {
      var events = WozVault.readAuditLog();
      var snaps = WozVault.readSnapshots();
      prints(
        '\n' +
        '╔══════════════════════════════════════╗\n' +
        '║  SYSTEM STATUS                       ║\n' +
        '╠══════════════════════════════════════╣\n' +
        '║  VERSION:   1.0.0                    ║\n' +
        '║  BOOT:      verified ✓               ║\n' +
        '║  VAULT:     ' + String(events.length).padStart(3) + ' events logged         ║\n' +
        '║  SNAPSHOTS: ' + String(snaps.length).padStart(3) + '                     ║\n' +
        '║  AGENTS:    ENKI + SENTINEL          ║\n' +
        '║  MODE:      local simulation         ║\n' +
        '╚══════════════════════════════════════╝',
        'l-green'
      );
    },

    agents: function() {
      prints(
        '\n' +
        '╔══════════════════════════════════════╗\n' +
        '║  AGENTS                              ║\n' +
        '╠══════════════════════════════════════╣\n' +
        '║  🔮 ENKI       — tension proposer    ║\n' +
        '║  🛡️  SENTINEL  — claim auditor       ║\n' +
        '║                                      ║\n' +
        '║  All agents are local simulations.   ║\n' +
        '║  No remote inference. No API calls.  ║\n' +
        '╚══════════════════════════════════════╝',
        'l-green'
      );
    },

    debate: function(args) {
      var topic = args.join(' ').replace(/"/g, '').trim();
      if (!topic) { print('Usage: (debate "topic")', 'l-yellow'); return; }

      prints('\n;; RUNNING DEBATE: "' + topic + '"\n', 'l-cyan');

      var ENKI_DB = {
        consciousness: {
          enki: '(propose (tension (quantum indeterminacy) (moral agency))\n         (conclusion "Consciousness may bridge physics and theology"))',
          sentinel: '(audit (type analogy) (confidence 0.6) (verdict HYPOTHESIS))\n;; analogy detected — not proof',
          trust: 0.6
        },
        covenant: {
          enki: '(propose (tension (entanglement non-local) (covenant relational))\n         (conclusion "Both connect. Entanglement is symmetric. Covenant is meaningful."))',
          sentinel: '(audit (type analogy) (confidence 0.7) (verdict ANALOGY))\n;; structural parallel — not equivalence',
          trust: 0.7
        },
        'free will': {
          enki: '(propose (requires quantum_indeterminacy moral_intention)\n         (conclusion "Neither alone suffices. Both required."))',
          sentinel: '(audit (type hypothesis) (confidence 0.8) (verdict SUPPORTED))\n;; both domains contribute',
          trust: 0.8
        },
        metatron: {
          enki: '(propose (tension enoch_transform) (tension theology_reject)\n         (conclusion "Boundary test: can consciousness transcend origin?"))',
          sentinel: '(audit (type unresolved) (confidence 0.5) (verdict UNRESOLVED))\n;; two traditions conflict',
          trust: 0.5
        },
        soul: {
          enki: '(propose (nephesh = breath_of_god)\n         (conclusion "Soul is consciousness oriented toward Creator"))',
          sentinel: '(audit (type doctrine) (confidence 0.6) (verdict DOCTRINE))\n;; requires faith, not physics',
          trust: 0.6
        }
      };

      var data = ENKI_DB[topic.toLowerCase()] || {
        enki: '(propose (tension (unknown) (unknown))\n         (conclusion "Topic requires exploration"))',
        sentinel: '(audit (type unverified) (confidence 0.3) (verdict UNVERIFIED))\n;; insufficient local data',
        trust: 0.3
      };

      WozVault.writeAuditEvent({ type: 'DEBATE_START', agent: 'ARENA', topic: topic });

      print(';; ENKI:', 'l-dim');
      prints(data.enki, 'l-cyan');
      WozVault.writeAuditEvent({ type: 'ENKI_OUTPUT', agent: 'ENKI', topic: topic });

      print('\n;; SENTINEL:', 'l-dim');
      prints(data.sentinel, 'l-yellow');
      WozVault.writeAuditEvent({ type: 'SENTINEL_AUDIT', agent: 'SENTINEL', topic: topic, trust: data.trust });

      Seal.createSeal({ type: 'DEBATE', topic: topic, trust: data.trust }).then(function(seal) {
        WozVault.writeAuditEvent({ type: 'DEBATE_SEALED', agent: 'ARENA', seal: seal.hash, topic: topic });
        prints(
          '\n;; SEAL:\n' +
          '  hash: ' + seal.hash.slice(0, 32) + '\n' +
          '  trust: ' + AsciiRegistry.trustDensityArt(data.trust) + '\n' +
          '  status: SEALED ✓',
          'l-cyan'
        );
        print('\n;; debate complete. logged to woz vault.\n', 'l-dim');
      });
    },

    query: function(args) {
      var term = args.join(' ').replace(/"/g, '').trim();
      if (!term) { print('Usage: (query "term")', 'l-yellow'); return; }

      var BIBLE = [
        {t:'Blessed are the merciful.',l:'Matthew 5:7',k:['mercy','merciful']},
        {t:'The truth will set you free.',l:'John 8:32',k:['truth','free']},
        {t:'I will establish my covenant.',l:'Genesis 17:7',k:['covenant','establish']},
        {t:'You shall not bear false witness.',l:'Exodus 20:16',k:['false','witness']}
      ];
      var ENOCH = [
        {t:'The Son of Man was chosen before creation.',l:'1 Enoch 46:1-4',k:['son','chosen','created']},
        {t:'Enoch walked with God and was taken.',l:'1 Enoch 12:1-2',k:['enoch','walked','taken']}
      ];
      var kw = term.toLowerCase().split(/\s+/);
      var stops = {the:1,a:1,an:1,in:1,on:1,of:1,to:1,is:1,it:1,or:1,and:1};
      var m = kw.filter(function(k){return k.length>=2&&!stops[k];});
      var all = BIBLE.concat(ENOCH);
      var hits = all.filter(function(e){return e.k.some(function(k){return m.some(function(q){return k.indexOf(q)>=0||q.indexOf(k)>=0;});});});

      print('\n;; QUERY: "' + term + '"', 'l-cyan');
      if (hits.length === 0) {
        print(';; no local citations found. confidence: 0.15', 'l-yellow');
      } else {
        print(';; ' + hits.length + ' citation(s) found:\n', 'l-green');
        for (var i = 0; i < hits.length; i++) {
          print('  "' + hits[i].t + '"', 'l-white');
          print('  — ' + hits[i].l, 'l-dim');
        }
        print('\n  confidence: ' + Math.min(0.4 + hits.length * 0.12, 0.95).toFixed(2), 'l-green');
      }
      print('');
    },

    vault: function() {
      var events = WozVault.readAuditLog();
      print('\n;; WOZ VAULT — AUDIT LOG', 'l-cyan');
      if (events.length === 0) {
        print(';; empty. run (debate "topic") to generate events.', 'l-dim');
      } else {
        for (var i = 0; i < events.length; i++) {
          var e = events[i];
          var line = '  [' + (e.timestamp || '??') + '] ' + e.type;
          if (e.agent) line += ' · ' + e.agent;
          if (e.seal) line += ' · seal:' + e.seal.slice(0, 12);
          var cls = e.type.indexOf('SEAL') >= 0 ? 'l-cyan' : 'l-dim';
          print(line, cls);
        }
        print('\n  total: ' + events.length + ' events', 'l-green');
      }
      print('');
    },

    seal: function(args) {
      var data = args.join(' ').replace(/"/g, '').trim() || 'default-payload';
      Seal.createSeal({ type: 'MANUAL_SEAL', data: data }).then(function(s) {
        prints(
          '\n;; SHA-256 SEAL\n' +
          '  payload: "' + data + '"\n' +
          '  hash:    ' + s.hash + '\n' +
          '  time:    ' + s.timestamp + '\n' +
          '  status:  SEALED ✓',
          'l-cyan'
        );
        WozVault.writeAuditEvent({ type: 'MANUAL_SEAL', agent: 'USER', seal: s.hash });
        print('');
      });
    },

    trust: function() {
      var result = TrustDeed.gate({});
      prints(
        '\n;; TRUST GATE\n' +
        '  local_only:     ' + result.checks.local_only + '\n' +
        '  non_destructive:' + result.checks.non_destructive + '\n' +
        '  auditable:      ' + result.checks.auditable + '\n' +
        '  sealable:       ' + result.checks.sealable + '\n' +
        '  recoverable:    ' + result.checks.recoverable + '\n' +
        '  verdict:        ' + result.verdict,
        result.verdict === 'TRUST_APPROVED' ? 'l-green' : 'l-red'
      );
      print('');
    },

    clear: function() {
      output.innerHTML = '';
    }
  };

  function parseAndExec(cmd) {
    cmd = cmd.trim();
    if (!cmd) return;

    promptEcho(cmd);
    history.push(cmd);
    historyIdx = history.length;

    // Parse LISP-style: (command arg1 arg2)
    var match = cmd.match(/^\(\s*(\w+)\s*(.*?)\s*\)$/);
    var verb, args;

    if (match) {
      verb = match[1].toLowerCase();
      // Split args, respecting quotes
      var raw = match[2];
      args = [];
      var inQuote = false;
      var current = '';
      for (var i = 0; i < raw.length; i++) {
        if (raw[i] === '"') { inQuote = !inQuote; continue; }
        if (raw[i] === ' ' && !inQuote) {
          if (current) args.push(current);
          current = '';
        } else {
          current += raw[i];
        }
      }
      if (current) args.push(current);
    } else {
      // Plain text fallback
      var parts = cmd.split(/\s+/);
      verb = parts[0].toLowerCase();
      args = parts.slice(1);
    }

    if (COMMANDS[verb]) {
      COMMANDS[verb](args);
    } else {
      print('Unknown command: ' + verb, 'l-red');
      print('Type (help) for commands.', 'l-dim');
    }
  }

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var cmd = input.value;
      input.value = '';
      parseAndExec(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx > 0) { historyIdx--; input.value = history[historyIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx < history.length - 1) { historyIdx++; input.value = history[historyIdx]; }
      else { historyIdx = history.length; input.value = ''; }
    }
  });

  // --- Boot sequence ---

  function sleep(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }

  async function boot() {
    bootArt.textContent = AsciiRegistry.renderAscii('coldboot');
    WozVault.writeAuditEvent({ type: 'COLD_BOOT_START', agent: 'KERNEL' });

    await sleep(500);
    bootStatus.textContent = 'INITIALIZING WOZ VAULT...';
    WozVault.writeAuditEvent({ type: 'VAULT_INIT', agent: 'KERNEL' });

    await sleep(400);
    bootStatus.textContent = 'LOADING TRUST DEED...';
    WozVault.writeAuditEvent({ type: 'TRUST_DEED_LOADED', agent: 'KERNEL' });

    await sleep(400);
    bootStatus.textContent = 'SUN BOOT COMPLETE ✓';

    var seal = await Seal.createSeal({ type: 'SUN_BOOT', status: 'verified' });
    WozVault.writeAuditEvent({ type: 'BOOT_SEALED', agent: 'KERNEL', seal: seal.hash });

    await sleep(600);

    bootScreen.style.display = 'none';
    app.style.display = 'flex';

    header.textContent = 'APPLE II UNIVERSAL MACHINE — SUN BOOT v1.0 — WOZ VAULT: ' + WozVault.readAuditLog().length + ' EVENTS';

    prints(AsciiRegistry.renderAscii('sunboot'), 'l-green');
    print('');
    print('Type (help) for commands. LISP syntax: (command "args")', 'l-dim');
    print('');
  }

  window.AppleII = {
    navigate: function(page) { window.location.hash = page; },
    getAuditLog: function() { return WozVault.readAuditLog(); },
    clearVault: function() { WozVault.clearVault(); location.reload(); }
  };

  boot().catch(function(e) {
    bootStatus.textContent = 'BOOT FAILED — ' + e.message;
  });
})();
