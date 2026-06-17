var TwinSkills = {
  getByArchetype: function(archetypeKey) {
    var arch = TwinArchetypes.get(archetypeKey);
    return arch ? arch.skills : [];
  },

  getToolsByArchetype: function(archetypeKey) {
    var arch = TwinArchetypes.get(archetypeKey);
    return arch ? arch.tools : ['search', 'summarize'];
  },

  renderSkills: function(skills) {
    if (!skills || skills.length === 0) return 'none';
    return skills.map(function(s) {
      return s.replace(/-/g, ' ').replace(/\b\w/g, function(l) { return l.toUpperCase(); });
    }).join(', ');
  },

  renderTools: function(tools) {
    if (!tools || tools.length === 0) return 'none';
    return tools.join(', ');
  }
};
