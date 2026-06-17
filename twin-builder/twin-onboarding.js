var TwinOnboarding = {
  isFirstRun: function() {
    try { return !localStorage.getItem('apple_ii_twin_onboarded'); } catch { return true; }
  },

  markComplete: function() {
    try { localStorage.setItem('apple_ii_twin_onboarded', 'true'); } catch {}
  },

  show: function() {
    var div = document.createElement('div');
    div.id = 'twin-onboard-panel';
    div.innerHTML =
      '<div class="tw-onboard-content">' +
      '<div class="tw-onboard-title">WELCOME TO APPLE II UNIVERSAL MACHINE</div>' +
      '<div class="tw-onboard-sub">Create your Digital Twin.</div>' +
      '<div class="tw-onboard-desc">Your twin can help you think, plan, design, research, document, audit, and build.</div>' +
      '<div class="tw-onboard-buttons">' +
      '<button class="tw-onboard-btn" onclick="TwinOnboarding.createTwin()">CREATE MY TWIN</button>' +
      '<button class="tw-onboard-btn tw-onboard-skip" onclick="TwinOnboarding.skip()">SKIP — USE TERMINAL</button>' +
      '</div>' +
      '<div class="tw-onboard-label">OR TYPE: TwinHelp; · TwinDashboard; · CreateTwinFromWizard;</div>' +
      '</div>';
    document.body.appendChild(div);

    VoiceNarrator.speak('Welcome to Apple II Universal Machine, a GitHub-native Digital Twin Operating System. Build your twin, choose a profession, explore new roles, create agents, run simulations, and export everything locally.');
  },

  createTwin: function() {
    this.markComplete();
    var overlay = document.getElementById('twin-onboard-panel');
    if (overlay) overlay.remove();
    TwinWizard.start();
  },

  skip: function() {
    this.markComplete();
    var overlay = document.getElementById('twin-onboard-panel');
    if (overlay) overlay.remove();
  }
};
