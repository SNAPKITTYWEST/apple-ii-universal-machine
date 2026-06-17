var AgentProfile = {
  defaultResponses: {
    'researcher': {
      'explain': function(topic) {
        return 'RESEARCH REPORT: "' + topic + '"\n\n' +
          'FINDINGS:\n' +
          '  - ' + topic + ' operates on local-first principles\n' +
          '  - No remote API calls required\n' +
          '  - All data stays in browser localStorage\n' +
          '  - Sealed with SHA-256 for integrity\n\n' +
          'CONCLUSION: Local-first approach verified for ' + topic;
      },
      'default': function(topic) { return 'RESEARCH: Analyzing "' + topic + '"\n  Status: Complete\n  Confidence: 0.85\n  Source: Local simulation'; }
    },
    'auditor': {
      'default': function(topic) {
        return 'AUDIT REPORT: "' + topic + '"\n\n' +
          'CHECKS:\n' +
          '  [✓] Trust deed compliance\n' +
          '  [✓] Ada contract gates\n' +
          '  [✓] Seal integrity\n' +
          '  [✓] Vault audit trail\n\n' +
          'VERDICT: PASSED — All gates cleared';
      }
    },
    'builder': {
      'default': function(topic) {
        return 'BUILD REPORT: "' + topic + '"\n\n' +
          'COMPONENTS:\n' +
          '  - Core module: created\n' +
          '  - Tests: simulated\n' +
          '  - Documentation: generated\n\n' +
          'STATUS: Build complete (simulated)';
      }
    },
    'debater': {
      'default': function(topic) {
        return 'DEBATE: "' + topic + '"\n\n' +
          'POSITION A: Strong support with evidence\n' +
          'POSITION B: Moderate opposition with caveats\n' +
          'SYNTHESIS: Nuanced understanding requires both perspectives\n\n' +
          'VERDICT: PRODUCTIVE TENSION';
      }
    },
    'sentinel': {
      'default': function(topic) {
        return 'SENTINEL REPORT: "' + topic + '"\n\n' +
          'THREAT LEVEL: LOW\n' +
          '  - No remote execution detected\n' +
          '  - No hidden API calls\n' +
          '  - All actions audited\n\n' +
          'STATUS: MONITORING';
      }
    },
    'archivist': {
      'default': function(topic) {
        return 'ARCHIVE: "' + topic + '"\n\n' +
          '  - Indexed: ' + WozVault.readAuditLog().length + ' events\n' +
          '  - Sealed: ' + topic.length + ' bytes\n' +
          '  - Status: STORED\n\n' +
          'Archive operation complete.';
      }
    },
    'explorer': {
      'default': function(topic) {
        return 'EXPLORE: "' + topic + '"\n\n' +
          'SCAN RESULTS:\n' +
          '  - Files: ' + 12 + ' modules\n' +
          '  - Layers: 6 (Ada, Lisp, VM, ASM, Encoding, Runtime)\n' +
          '  - Agents: ' + AgentRegistry.count() + ' registered\n\n' +
          'MAP COMPLETE';
      }
    },
    'translator': {
      'default': function(topic) {
        return 'TRANSLATE: "' + topic + '"\n\n' +
          '  EN: ' + topic + '\n' +
          '  SIM: ' + topic.toUpperCase().split('').reverse().join('') + '\n' +
          '  GLYPH: ' + ReverseUnicode.mirror(topic) + '\n\n' +
          'Translation complete.';
      }
    }
  },

  generateResponse: function(agent, task) {
    var roleResponses = this.defaultResponses[agent.role] || this.defaultResponses['researcher'];
    var handler = roleResponses[task.toLowerCase().split(' ')[0]] || roleResponses['default'];
    return handler(task);
  }
};
