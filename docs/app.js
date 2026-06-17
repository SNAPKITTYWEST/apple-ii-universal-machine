(function() {
  'use strict';

  // --- DOM refs ---
  var term = document.getElementById('terminal');
  var input = document.getElementById('cmd-input');
  var promptText = document.getElementById('prompt-text');
  var auditPanel = document.getElementById('audit-panel');
  var vaultPanel = document.getElementById('vault-panel');
  var vaultCount = document.getElementById('vault-count');
  var sealCount = document.getElementById('seal-count');
  var runtimeMode = document.getElementById('runtime-mode');
  var bootScreen = document.getElementById('boot-screen');
  var bootArt = document.getElementById('boot-art');
  var bootStatus = document.getElementById('boot-status');
  var app = document.getElementById('app');

  var history = [];
  var historyIdx = -1;
  var currentRuntime = 'holy-sim';
  var sealTotal = 0;

  // --- Terminal output ---
  function print(text, cls) {
    var d = document.createElement('div');
    d.className = 'line ' + (cls || 'l-green');
    d.textContent = text;
    term.appendChild(d);
    term.scrollTop = term.scrollHeight;
  }

  function prints(text, cls) {
    text.split('\n').forEach(function(l) { print(l, cls); });
  }

  function promptEcho(cmd) {
    print('HolySim> ' + cmd, 'l-dim');
  }

  // --- Audit update ---
  function refreshAudit() {
    var events = WozVault.readAuditLog();
    vaultCount.textContent = events.length;
    sealCount.textContent = sealTotal;
    auditPanel.innerHTML = '';
    var show = events.slice(-15);
    for (var i = 0; i < show.length; i++) {
      var e = show[i];
      var div = document.createElement('div');
      div.className = 'audit-entry';
      var line = '[' + (e.timestamp || '').slice(11, 19) + '] ' + e.type;
      if (e.agent) line += ' · ' + e.agent;
      div.textContent = line;
      if (e.seal) div.style.color = '#0ff';
      auditPanel.appendChild(div);
    }
    auditPanel.scrollTop = auditPanel.scrollHeight;
  }

  function refreshVault() {
    var events = WozVault.readAuditLog();
    vaultPanel.innerHTML = '';
    if (events.length === 0) {
      vaultPanel.innerHTML = '<div class="audit-entry" style="color:#333">empty</div>';
      return;
    }
    var snaps = WozVault.readSnapshots();
    var div = document.createElement('div');
    div.className = 'audit-entry';
    div.textContent = events.length + ' events · ' + snaps.length + ' snapshots';
    div.style.color = '#0f0';
    vaultPanel.appendChild(div);
  }

  // --- Contract check ---
  function contractCheck(action, args) {
    var result;
    switch (action) {
      case 'boot': result = AdaContract.canBoot(); break;
      case 'debate': result = AdaContract.canRunDebate(); break;
      case 'audit-write': result = AdaContract.canWriteAudit(); break;
      case 'clear': result = AdaContract.canClearVault(args && args.confirmed); break;
      case 'export': result = AdaContract.canExportSnapshot(); break;
      default: result = { allowed: true, contract: 'default' };
    }
    WozVault.writeAuditEvent({
      type: 'CONTRACT_CHECK',
      agent: 'ADA_SIM',
      action: action,
      result: result.allowed ? 'ALLOWED' : 'DENIED',
      contract: result.contract
    });
    return result;
  }

  // --- Seal ---
  async function doSeal(payload) {
    var s = await Seal.createSeal(payload);
    sealTotal++;
    WozVault.writeAuditEvent({ type: 'SEAL_CREATED', agent: 'SEAL', seal: s.hash });
    refreshAudit();
    return s;
  }

  // --- Commands ---
  var COMMANDS = {

    help: function() {
      prints(
        '╔══════════════════════════════════════════════════════════╗\n' +
        '║  APPLE II UNIVERSAL MACHINE — COMMANDS                  ║\n' +
        '╠══════════════════════════════════════════════════════════╣\n' +
        '║  help          — show this                              ║\n' +
        '║  boot          — reboot system                          ║\n' +
        '║  holy          — load holy page                         ║\n' +
        '║  debate        — run ENKI/SENTINEL debate               ║\n' +
        '║  debate "topic"— debate on specific topic               ║\n' +
        '║  vault         — show audit log                         ║\n' +
        '║  seal          — generate SHA-256 seal                  ║\n' +
        '║  status        — system status                          ║\n' +
        '║  export        — export vault snapshot as JSON          ║\n' +
        '║  clear         — clear terminal                         ║\n' +
        '║  clear-vault   — wipe Woz Vault (requires confirm)     ║\n' +
        '║  trust         — run trust gate                         ║\n' +
        '║  agents        — list agents                            ║\n' +
        '║  about         — about this machine                     ║\n' +
        '╚══════════════════════════════════════════════════════════╝',
        'l-cyan'
      );
    },

    about: function() {
      prints(
        '\n  APPLE II UNIVERSAL MACHINE\n' +
        '  Sun Boot MVP v1.0\n\n' +
        '  A local-first browser cockpit for agent simulation.\n' +
        '  No Node. No backend. No paid APIs.\n\n' +
        '  ROM:      GitHub Pages\n' +
        '  Kernel:   app.js\n' +
        '  Memory:   Woz Vault (localStorage)\n' +
        '  Seal:     SHA-256 (Web Crypto)\n' +
        '  Runtime:  ' + currentRuntime + '\n' +
        '  Agents:   ENKI (proposer) + SENTINEL (auditor)\n' +
        '  Contracts: Ada simulator (ada-contract-sim.js)\n\n' +
        '  "One cockpit. Many agents. No token tax."',
        'l-white'
      );
    },

    boot: function() {
      var c = contractCheck('boot');
      if (!c.allowed) { prints('ADA CONTRACT: DENIED — ' + c.reason, 'l-red'); return; }
      prints('ADA CONTRACT: ALLOWED (' + c.contract + ')', 'l-cyan');
      prints(AsciiRegistry.renderAscii('sunboot'), 'l-green');
      WozVault.writeAuditEvent({ type: 'REBOOT', agent: 'USER' });
      doSeal({ type: 'REBOOT_SEAL' }).then(function(s) {
        prints('SEAL: ' + s.hash.slice(0, 24) + '...', 'l-cyan');
        refreshAudit();
      });
    },

    holy: function() {
      prints(AsciiRegistry.renderAscii('verified'), 'l-green');
      prints('HOLY PAGE / RESCUE KERNEL', 'l-white');
      prints('WOZ VAULT: LOCAL-FIRST', 'l-dim');
      WozVault.writeAuditEvent({ type: 'HOLY_PAGE_LOAD', agent: 'USER' });
      refreshAudit();
    },

    debate: function(args) {
      var c = contractCheck('debate');
      if (!c.allowed) { prints('ADA CONTRACT: DENIED', 'l-red'); return; }
      prints('ADA CONTRACT: ALLOWED (' + c.contract + ')', 'l-cyan');

      var topic = args ? args.join(' ').replace(/"/g, '').trim() : '';
      if (!topic) topic = 'consciousness';

      prints('\n;; DEBATE: "' + topic + '"', 'l-cyan');
      WozVault.writeAuditEvent({ type: 'DEBATE_START', agent: 'ARENA', topic: topic });

      var DB = {
        consciousness: { e: '(propose (tension quantum moral) (conclusion "Consciousness bridges physics and theology"))', s: '(audit (type analogy) (confidence 0.6) (verdict HYPOTHESIS))', t: 0.6 },
        covenant: { e: '(propose (tension entanglement covenant) (conclusion "Both connect. Entanglement symmetric. Covenant meaningful."))', s: '(audit (type analogy) (confidence 0.7) (verdict ANALOGY))', t: 0.7 },
        'free will': { e: '(propose (requires indeterminacy intention) (conclusion "Neither alone suffices."))', s: '(audit (type hypothesis) (confidence 0.8) (verdict SUPPORTED))', t: 0.8 },
        metatron: { e: '(propose (tension enoch_transform theology_reject) (conclusion "Can consciousness transcend origin?"))', s: '(audit (type unresolved) (confidence 0.5) (verdict UNRESOLVED))', t: 0.5 },
        soul: { e: '(propose (nephesh = breath_of_god) (conclusion "Soul is consciousness oriented toward Creator"))', s: '(audit (type doctrine) (confidence 0.6) (verdict DOCTRINE))', t: 0.6 }
      };
      var d = DB[topic.toLowerCase()] || { e: '(propose (tension unknown) (conclusion "Requires exploration"))', s: '(audit (type unverified) (confidence 0.3) (verdict UNVERIFIED))', t: 0.3 };

      print('ENKI:', 'l-cyan');
      prints(d.e, 'l-white');
      WozVault.writeAuditEvent({ type: 'ENKI_OUTPUT', agent: 'ENKI', topic: topic });

      print('SENTINEL:', 'l-yellow');
      prints(d.s, 'l-white');
      WozVault.writeAuditEvent({ type: 'SENTINEL_AUDIT', agent: 'SENTINEL', topic: topic, trust: d.t });

      doSeal({ type: 'DEBATE', topic: topic, trust: d.t }).then(function(s) {
        prints('SEAL: ' + s.hash.slice(0, 32), 'l-cyan');
        prints('TRUST: ' + AsciiRegistry.trustDensityArt(d.t), 'l-green');
        prints('STATUS: VERIFIED', 'l-green');
        print('');
      });
    },

    vault: function() {
      var events = WozVault.readAuditLog();
      prints('\n;; WOZ VAULT — AUDIT LOG (' + events.length + ' events)', 'l-cyan');
      if (events.length === 0) {
        prints(';; empty', 'l-dim');
      } else {
        for (var i = 0; i < events.length; i++) {
          var e = events[i];
          var line = '  [' + (e.timestamp || '').slice(11, 19) + '] ' + e.type;
          if (e.agent) line += ' · ' + e.agent;
          if (e.seal) line += ' · seal:' + e.seal.slice(0, 12);
          print(line, e.type.indexOf('SEAL') >= 0 ? 'l-cyan' : 'l-dim');
        }
      }
      print('');
    },

    seal: function(args) {
      var data = args ? args.join(' ').replace(/"/g, '').trim() : 'manual-payload';
      doSeal({ type: 'MANUAL_SEAL', data: data }).then(function(s) {
        prints(
          ';; SHA-256 SEAL\n' +
          '  payload: "' + data + '"\n' +
          '  hash:    ' + s.hash + '\n' +
          '  time:    ' + s.timestamp + '\n' +
          '  status:  SEALED ✓',
          'l-cyan'
        );
        print('');
      });
    },

    status: function() {
      var events = WozVault.readAuditLog();
      prints(
        '\n╔══════════════════════════════════════╗\n' +
        '║  SYSTEM STATUS                       ║\n' +
        '╠══════════════════════════════════════╣\n' +
        '║  VERSION:   1.0.0                    ║\n' +
        '║  BOOT:      verified ✓               ║\n' +
        '║  VAULT:     ' + String(events.length).padStart(3) + ' events logged         ║\n' +
        '║  SEALS:     ' + String(sealTotal).padStart(3) + ' generated            ║\n' +
        '║  RUNTIME:   ' + currentRuntime.padEnd(25) + '║\n' +
        '║  AGENTS:    ENKI + SENTINEL          ║\n' +
        '║  CONTRACTS: Ada SIMULATED            ║\n' +
        '╚══════════════════════════════════════╝',
        'l-green'
      );
      print('');
    },

    agents: function() {
      prints(
        '\n╔══════════════════════════════════════╗\n' +
        '║  AGENTS                              ║\n' +
        '╠══════════════════════════════════════╣\n' +
        '║  🔮 ENKI       — tension proposer    ║\n' +
        '║  🛡️  SENTINEL  — claim auditor       ║\n' +
        '║                                      ║\n' +
        '║  All agents are local simulations.   ║\n' +
        '╚══════════════════════════════════════╝',
        'l-green'
      );
      print('');
    },

    trust: function() {
      var r = TrustDeed.gate({});
      prints(
        '\n;; TRUST GATE\n' +
        '  local_only:     ' + r.checks.local_only + '\n' +
        '  non_destructive:' + r.checks.non_destructive + '\n' +
        '  auditable:      ' + r.checks.auditable + '\n' +
        '  sealable:       ' + r.checks.sealable + '\n' +
        '  recoverable:    ' + r.checks.recoverable + '\n' +
        '  verdict:        ' + r.verdict,
        r.verdict === 'TRUST_APPROVED' ? 'l-green' : 'l-red'
      );
      print('');
    },

    export: function() {
      var c = contractCheck('export');
      if (!c.allowed) { prints('ADA CONTRACT: DENIED', 'l-red'); return; }
      var data = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        runtime: currentRuntime,
        events: WozVault.readAuditLog(),
        snapshots: WozVault.readSnapshots()
      };
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'woz-vault-snapshot-' + Date.now() + '.json';
      a.click();
      URL.revokeObjectURL(url);
      prints(';; SNAPSHOT EXPORTED ✓\n;; file: ' + a.download, 'l-green');
      WozVault.writeAuditEvent({ type: 'SNAPSHOT_EXPORT', agent: 'USER' });
      doSeal({ type: 'EXPORT_SEAL' }).then(function() { refreshAudit(); });
    },

    clear: function() {
      term.innerHTML = '';
    },

    'clear-vault': function() {
      var c = contractCheck('clear', { confirmed: true });
      if (!c.allowed) { prints('ADA CONTRACT: DENIED — ' + c.reason, 'l-red'); return; }
      WozVault.clearVault();
      sealTotal = 0;
      prints(';; WOZ VAULT CLEARED ✓', 'l-yellow');
      refreshAudit();
      refreshVault();
    }
  };

  // --- Input handler ---
  function parseAndExec(cmd) {
    cmd = cmd.trim();
    if (!cmd) return;
    promptEcho(cmd);
    history.push(cmd);
    historyIdx = history.length;

    var parts = cmd.split(/\s+/);
    var verb = parts[0].toLowerCase();
    var args = parts.slice(1);

    if (COMMANDS[verb]) {
      COMMANDS[verb](args);
    } else {
      print('Unknown: ' + verb + ' — type (help)', 'l-red');
    }
    refreshAudit();
    refreshVault();
  }

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var v = input.value;
      input.value = '';
      parseAndExec(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx > 0) { historyIdx--; input.value = history[historyIdx]; }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx < history.length - 1) { historyIdx++; input.value = history[historyIdx]; }
      else { historyIdx = history.length; input.value = ''; }
    }
  });

  // --- Button bar ---
  document.querySelectorAll('.btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var cmd = this.dataset.cmd;
      if (cmd === 'clear-vault') {
        if (!confirm('Clear all Woz Vault data?')) return;
      }
      input.value = cmd;
      parseAndExec(cmd);
      input.value = '';
    });
  });

  // --- Runtime selector ---
  document.querySelectorAll('.runtime-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      if (this.classList.contains('disabled')) return;
      document.querySelectorAll('.runtime-btn').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      currentRuntime = this.dataset.rt;
      runtimeMode.textContent = currentRuntime.toUpperCase();
      document.getElementById('runtime-badge').textContent = currentRuntime.toUpperCase();
      WozVault.writeAuditEvent({ type: 'RUNTIME_SWITCH', agent: 'USER', runtime: currentRuntime });
      prints(';; Runtime: ' + currentRuntime, 'l-cyan');
      refreshAudit();
    });
  });

  // --- Boot sequence ---
  function sleep(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }

  async function boot() {
    bootArt.textContent = AsciiRegistry.renderAscii('coldboot');
    WozVault.writeAuditEvent({ type: 'COLD_BOOT_START', agent: 'KERNEL' });

    await sleep(400);
    bootStatus.textContent = 'INITIALIZING WOZ VAULT...';

    await sleep(300);
    bootStatus.textContent = 'LOADING TRUST DEED...';

    await sleep(300);
    bootStatus.textContent = 'LOADING ADA CONTRACTS...';

    await sleep(300);
    bootStatus.textContent = 'SUN BOOT COMPLETE ✓';

    var seal = await Seal.createSeal({ type: 'SUN_BOOT', status: 'verified' });
    WozVault.writeAuditEvent({ type: 'BOOT_SEALED', agent: 'KERNEL', seal: seal.hash });
    sealTotal++;

    await sleep(500);
    bootScreen.style.display = 'none';
    app.style.display = 'flex';

    prints(AsciiRegistry.renderAscii('sunboot'), 'l-green');
    prints('Type "help" for commands. Every action audited and sealed.\n', 'l-dim');
    refreshAudit();
    refreshVault();
  }

  boot().catch(function(e) {
    bootStatus.textContent = 'BOOT FAILED: ' + e.message;
  });
})();
