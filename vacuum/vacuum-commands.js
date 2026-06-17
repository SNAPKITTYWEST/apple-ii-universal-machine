var VacuumCommands = {
  help: function() {
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  VACUUM PIPELINE — COMMANDS                                  ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  VacuumHelp;              — show this                       ║',
      '║  VacuumIngest "text";     — ingest raw text                 ║',
      '║  ExtractMeaning "text";   — extract entities & topics       ║',
      '║  ToLisp "text";           — convert text to Lisp            ║',
      '║  CompileEnvelope "(expr)";— compile to bytecode envelope    ║',
      '║  VerifyEnvelope;          — verify last envelope            ║',
      '║  RunEnvelope;             — run last verified envelope       ║',
      '║                                                                    ║',
      '║  PIPELINE: text → extract → schema → Lisp → envelope → seal  ║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  },

  ingest: function(args) {
    var text = args ? args.join(' ').replace(/"/g, '').trim() : '';
    if (!text) return { output: 'Usage: VacuumIngest "text here";', type: 'error' };
    var record = VacuumIngest.ingest(text);
    WozVault.writeAuditEvent({ type: 'VACUUM_INGEST', agent: 'VACUUM', words: record.wordCount });
    return { output: VacuumIngest.render(record), type: 'success' };
  },

  extract: function(args) {
    var text = args ? args.join(' ').replace(/"/g, '').trim() : '';
    if (!text) return { output: 'Usage: ExtractMeaning "text here";', type: 'error' };
    var result = SemanticExtractor.extract(text);
    WozVault.writeAuditEvent({ type: 'SEMANTIC_EXTRACT', agent: 'SEMAPHER', topics: result.topics.length });
    return { output: SemanticExtractor.render(result), type: 'success' };
  },

  toLisp: function(args) {
    var text = args ? args.join(' ').replace(/"/g, '').trim() : '';
    if (!text) return { output: 'Usage: ToLisp "text here";', type: 'error' };

    var extraction = SemanticExtractor.extract(text);
    var schema = SchemaMapper.mapToSchema(extraction);

    var lispExpr = '(event ' + schema.event + ')';
    var details = '(schema (category ' + schema.category + ') (confidence ' + schema.confidence + '))';
    var entities = '(entities ' + schema.entities.map(function(e) { return '(' + e.type + ' ' + e.text + ')'; }).join(' ') + ')';

    var fullExpr = '(pipeline ' + lispExpr + ' ' + details + ' ' + entities + ')';

    WozVault.writeAuditEvent({ type: 'VACUUM_TOLISP', agent: 'COMPILER', event: schema.event, lisp: fullExpr.substring(0, 100) });

    return {
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  TEXT → LISP                                                ║',
        '╠══════════════════════════════════════════════════════════════╣',
        '║  EVENT:    ' + schema.event.padEnd(47) + '║',
        '║  CATEGORY: ' + schema.category.padEnd(47) + '║',
        '║  LISP:                                                   ║',
        '║  ' + fullExpr.substring(0, 55).padEnd(55) + '║',
        '╚══════════════════════════════════════════════════════════════╝'
      ].join('\n'),
      type: 'success'
    };
  }
};
