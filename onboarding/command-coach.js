var CommandCoach = {
  check: function(input) {
    if (!input || input.length < 2) return null;
    var clean = input.toLowerCase().replace(/;$/,'').trim();
    if (!clean) return null;

    var suggestion = CopilotGuide.suggestCommand(clean);
    return suggestion;
  },

  show: function(msg) {
    var coach = document.getElementById('command-coach');
    if (!coach) {
      coach = document.createElement('div');
      coach.id = 'command-coach';
      document.body.appendChild(coach);
    }
    coach.textContent = msg;
    coach.style.display = 'block';
    var self = this;
    setTimeout(function() { coach.style.display = 'none'; }, 5000);
  },

  onUnknown: function(cmd) {
    var suggestion = this.check(cmd);
    if (suggestion) {
      this.show('COPILOT: ' + suggestion);
      VoiceNarrator.speak(suggestion.replace('Did you mean:', 'Did you mean'));
    }
  }
};
