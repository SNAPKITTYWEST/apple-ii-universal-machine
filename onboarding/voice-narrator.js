var VoiceNarrator = {
  enabled: true,
  muted: false,
  speaking: false,
  currentUtterance: null,

  speak: function(text) {
    if (!this.enabled || this.muted) return;
    if (!('speechSynthesis' in window)) return;

    this.stop();
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    var self = this;
    utterance.onstart = function() { self.speaking = true; };
    utterance.onend = function() { self.speaking = false; };
    utterance.onerror = function() { self.speaking = false; };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  },

  stop: function() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.speaking = false;
    this.currentUtterance = null;
  },

  pause: function() {
    if ('speechSynthesis' in window && this.speaking) {
      window.speechSynthesis.pause();
    }
  },

  resume: function() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  },

  toggle: function() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
  },

  toggleMute: function() {
    this.muted = !this.muted;
    if (this.muted) this.stop();
  },

  speakStep: function(step) {
    if (step && step.narration) this.speak(step.narration);
  }
};
