var ScreenshotExport = {
  capture: async function() {
    var term = document.getElementById('terminal') || document.getElementById('terminal');
    if (!term) return { error: 'No terminal element found' };

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var lines = term.innerText.split('\n');
    var lineHeight = 16;
    var padding = 20;
    var maxWidth = 0;

    var font = '13px "Courier New", monospace';
    ctx.font = font;
    lines.forEach(function(l) {
      var w = ctx.measureText(l).width;
      if (w > maxWidth) maxWidth = w;
    });

    canvas.width = Math.ceil(maxWidth) + padding * 2;
    canvas.height = lines.length * lineHeight + padding * 2;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = font;
    ctx.fillStyle = '#00ff00';
    lines.forEach(function(line, i) {
      ctx.fillText(line, padding, padding + i * lineHeight + lineHeight);
    });

    var timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    var filename = 'apple-ii-terminal-' + timestamp + '.png';

    return new Promise(function(resolve) {
      canvas.toBlob(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        resolve({
          filename: filename,
          width: canvas.width,
          height: canvas.height,
          lines: lines.length,
          timestamp: new Date().toISOString()
        });
      }, 'image/png');
    });
  },

  renderResult: function(result) {
    if (result.error) return 'SCREENSHOT ERROR: ' + result.error;
    return [
      '╔══════════════════════════════════════════════════════════════╗',
      '║  SCREENSHOT CAPTURED                                         ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  FILE:     ' + result.filename.padEnd(47) + '║',
      '║  SIZE:     ' + (result.width + 'x' + result.height).padEnd(47) + '║',
      '║  LINES:    ' + String(result.lines).padEnd(47) + '║',
      '║  TIME:     ' + result.timestamp.substring(0, 19).padEnd(47) + '║',
      '╚══════════════════════════════════════════════════════════════╝'
    ].join('\n');
  }
};
