(function() {
  'use strict';

  const bootArt = document.getElementById('boot-art');
  const bootStatus = document.getElementById('boot-status');
  const app = document.getElementById('app');
  const bootScreen = document.getElementById('boot-screen');

  function log(msg) { bootStatus.textContent = msg; }

  async function boot() {
    log('LOADING SUN BOOT...');

    bootArt.textContent = AsciiRegistry.renderAscii('coldboot');
    WozVault.writeAuditEvent({ type: 'COLD_BOOT_START', agent: 'KERNEL' });
    await sleep(400);

    log('INITIALIZING WOZ VAULT...');
    WozVault.writeAuditEvent({ type: 'VAULT_INIT', agent: 'KERNEL' });
    await sleep(300);

    log('LOADING TRUST DEED...');
    WozVault.writeAuditEvent({ type: 'TRUST_DEED_LOADED', agent: 'KERNEL' });
    await sleep(300);

    const route = detectRoute();
    WozVault.writeAuditEvent({ type: 'ROUTE_LOAD', agent: 'KERNEL', route: route });
    await sleep(300);

    let success = false;
    try {
      if (route === 'debate') {
        success = await loadPage('debate.html');
      } else if (route === 'audit') {
        success = await loadPage('audit.html');
      } else {
        success = await loadPage('holy.html');
      }
    } catch (e) {
      success = false;
    }

    if (!success) {
      log('ROUTE FAILED — FALLBACK TO HOLY PAGE');
      WozVault.writeAuditEvent({ type: 'HOLY_FALLBACK', agent: 'KERNEL', reason: 'route_failed' });
      await loadPage('holy.html');
    }

    const seal = await Seal.createSeal({ type: 'BOOT_COMPLETE', route: route });
    WozVault.writeAuditEvent({ type: 'BOOT_SEALED', agent: 'KERNEL', seal: seal.hash });

    bootArt.textContent = AsciiRegistry.renderAscii('sunboot');
    log('BOOT SEALED ✓');
    await sleep(600);

    bootScreen.style.display = 'none';
    app.style.display = 'block';
  }

  function detectRoute() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    if (page === 'debate' || page === 'audit') return page;
    const hash = window.location.hash.replace('#', '');
    if (hash === 'debate' || hash === 'audit') return hash;
    return 'holy';
  }

  async function loadPage(file) {
    try {
      const resp = await fetch(file);
      if (!resp.ok) return false;
      const html = await resp.text();
      app.innerHTML = html;
      const scripts = app.querySelectorAll('script');
      for (const old of scripts) {
        const s = document.createElement('script');
        s.textContent = old.textContent;
        document.body.appendChild(s);
        old.remove();
      }
      return true;
    } catch {
      return false;
    }
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  window.AppleII = {
    navigate(page) { window.location.search = '?page=' + page; },
    getAuditLog() { return WozVault.readAuditLog(); },
    clearVault() { WozVault.clearVault(); location.reload(); }
  };

  boot().catch(() => {
    bootStatus.textContent = 'BOOT FAILED — REDIRECTING';
    setTimeout(() => { window.location.search = ''; }, 1000);
  });
})();
