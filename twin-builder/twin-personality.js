var TwinPersonality = {
  personalities: [
    { key: 'analytical', label: 'Analytical', description: 'Data-driven, logical, methodical, precise' },
    { key: 'creative', label: 'Creative', description: 'Imaginative, innovative, expressive, original' },
    { key: 'strategic', label: 'Strategic', description: 'Long-term thinker, planner, goal-oriented' },
    { key: 'investigator', label: 'Investigator', description: 'Curious, thorough, detail-oriented, research-focused' },
    { key: 'teacher', label: 'Teacher', description: 'Patient, explanatory, supportive, knowledge-sharing' },
    { key: 'builder', label: 'Builder', description: 'Hands-on, practical, maker, executor' },
    { key: 'auditor', label: 'Auditor', description: 'Critical, thorough, compliance-focused, quality-driven' },
    { key: 'visionary', label: 'Visionary', description: 'Big-picture, future-focused, ambitious, innovative' },
    { key: 'explorer', label: 'Explorer', description: 'Adventurous, open-minded, learning-focused, versatile' },
    { key: 'balanced', label: 'Balanced', description: 'Adaptable, even-tempered, flexible, all-around' }
  ],

  getAll: function() { return this.personalities; },
  get: function(key) { return this.personalities.find(function(p) { return p.key === key; }) || null; }
};
