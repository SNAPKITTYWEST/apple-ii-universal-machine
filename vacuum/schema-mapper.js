var SchemaMapper = {
  mapToSchema: function(extraction) {
    if (!extraction) return null;

    var event = 'unknown';
    var category = 'general';
    var confidence = 0.3;

    var actionMap = {
      'deploy':    { event: 'deployment_requested',  category: 'devops',   confidence: 0.8 },
      'create':    { event: 'creation_requested',    category: 'creation', confidence: 0.7 },
      'delete':    { event: 'deletion_requested',    category: 'cleanup',  confidence: 0.8 },
      'update':    { event: 'update_requested',      category: 'maintenance', confidence: 0.7 },
      'run':       { event: 'execution_requested',   category: 'runtime',  confidence: 0.7 },
      'build':     { event: 'build_requested',       category: 'devops',   confidence: 0.8 },
      'test':      { event: 'test_requested',        category: 'quality',  confidence: 0.8 }
    };

    if (extraction.actions.length > 0) {
      var firstAction = extraction.actions[0];
      var mapped = actionMap[firstAction];
      if (mapped) {
        event = mapped.event;
        category = mapped.category;
        confidence = mapped.confidence;
      }
    }

    if (extraction.entities.length > 0) {
      var domainEntity = extraction.entities.find(function(e) { return e.type === 'domain'; });
      if (domainEntity) {
        event = domainEntity.text + '_' + event.split('_').pop();
      }
    }

    if (extraction.sentiment > 0.3) confidence += 0.1;
    if (extraction.sentiment < -0.3) confidence -= 0.1;
    confidence = Math.max(0, Math.min(1, confidence));

    return {
      event: event,
      category: category,
      confidence: Math.round(confidence * 100) / 100,
      entities: extraction.entities,
      actions: extraction.actions,
      topics: extraction.topics,
      sentiment: extraction.sentiment,
      normalizedAt: new Date().toISOString()
    };
  },

  render: function(schema) {
    if (!schema) return 'No schema generated.';
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  SCHEMA MAPPING                                             ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  EVENT:      ' + schema.event.padEnd(44) + '║',
      '║  CATEGORY:   ' + schema.category.padEnd(44) + '║',
      '║  CONFIDENCE: ' + String(schema.confidence).padEnd(44) + '║',
      '║  ENTITIES:   ' + schema.entities.length + ' found'.padEnd(44) + '║',
      '║  ACTIONS:    ' + schema.actions.join(', ').substring(0, 44).padEnd(44) + '║',
      '║  TOPICS:     ' + schema.topics.slice(0, 3).join(', ').substring(0, 44).padEnd(44) + '║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
