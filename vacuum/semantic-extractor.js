var SemanticExtractor = {
  extract: function(text) {
    if (!text) return null;
    var words = text.toLowerCase().split(/\s+/);
    var sentences = text.split(/[.!?]+/).filter(function(s) { return s.trim().length > 0; });

    var entities = [];
    var actions = [];
    var topics = [];

    var entityPatterns = [
      { re: /\b(agent|user|system|server|client|node)\b/gi, type: 'entity' },
      { re: /\b(seal|vault|trust|contract|audit)\b/gi, type: 'domain' },
      { re: /\b(deploy|create|delete|update|run|build|test)\b/gi, type: 'action' },
      { re: /\b(python|javascript|rust|swift|haskell|ada|lisp)\b/gi, type: 'language' },
      { re: /\b(api|database|file|directory|module|package)\b/gi, type: 'artifact' }
    ];

    entityPatterns.forEach(function(p) {
      var m = text.match(p.re);
      if (m) {
        m.forEach(function(match) {
          var lower = match.toLowerCase();
          if (p.type === 'action') {
            if (actions.indexOf(lower) < 0) actions.push(lower);
          } else {
            if (entities.find(function(e) { return e.text === lower; })) return;
            entities.push({ text: lower, type: p.type });
          }
        });
      }
    });

    var stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for', 'on', 'with', 'at',
      'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'and', 'but',
      'or', 'nor', 'not', 'no', 'so', 'yet', 'both', 'either', 'neither', 'each',
      'every', 'all', 'any', 'few', 'more', 'most', 'other', 'some', 'such', 'than',
      'too', 'very', 'just', 'about', 'above', 'again', 'also', 'am', 'because'];

    var freq = {};
    words.forEach(function(w) {
      var clean = w.replace(/[^a-z0-9]/g, '');
      if (clean.length > 2 && stopWords.indexOf(clean) < 0) {
        freq[clean] = (freq[clean] || 0) + 1;
      }
    });

    topics = Object.keys(freq).sort(function(a, b) { return freq[b] - freq[a]; }).slice(0, 8);

    var sentiment = 0;
    var posWords = ['success', 'good', 'great', 'yes', 'allow', 'approved', 'passed', 'verified', 'online', 'active'];
    var negWords = ['error', 'fail', 'bad', 'no', 'deny', 'denied', 'blocked', 'offline', 'denied', 'invalid'];
    words.forEach(function(w) {
      if (posWords.indexOf(w) >= 0) sentiment += 0.1;
      if (negWords.indexOf(w) >= 0) sentiment -= 0.1;
    });
    sentiment = Math.max(-1, Math.min(1, sentiment));

    return {
      text: text.substring(0, 200),
      entities: entities,
      actions: actions,
      topics: topics,
      sentiment: Math.round(sentiment * 100) / 100,
      wordCount: words.length,
      sentenceCount: sentences.length
    };
  },

  render: function(result) {
    if (!result) return 'No meaning extracted.';
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  SEMANTIC EXTRACTION                                        ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  ENTITIES: ' + result.entities.map(function(e) { return e.text + '(' + e.type + ')'; }).join(', ').substring(0, 46).padEnd(46) + '║',
      '║  ACTIONS:  ' + result.actions.join(', ').substring(0, 46).padEnd(46) + '║',
      '║  TOPICS:   ' + result.topics.slice(0, 5).join(', ').substring(0, 46).padEnd(46) + '║',
      '║  SENTIMENT:' + String(result.sentiment).padEnd(46) + '║',
      '║  WORDS:    ' + String(result.wordCount).padEnd(46) + '║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
