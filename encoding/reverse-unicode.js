var ReverseUnicode = {
  mirrorMap: {
    'a': '\u0250', 'b': '\u0183', 'c': '\u0254', 'd': '\u018A',
    'e': '\u01DD', 'f': '\u025F', 'g': '\u0283', 'h': '\u0265',
    'i': '\u0131', 'j': '\u027F', 'k': '\u029E', 'l': '\u026F',
    'm': '\u026D', 'n': '\u014B', 'o': '\u0275', 'p': '\u028C',
    'q': '\u0250', 'r': '\u027E', 's': '\u0282', 't': '\u0287',
    'u': '\u028A', 'v': '\u028C', 'w': '\u026D', 'x': '\u00D7',
    'y': '\u028E', 'z': '\u0251',
    'A': '\u2200', 'B': '\u0181', 'C': '\u0186', 'D': '\u018A',
    'E': '\u018E', 'F': '\u2132', 'G': '\u0193', 'H': '\u0179',
    'I': '\u0196', 'J': '\u017F', 'K': '\u0198', 'L': '\u02E1',
    'M': '\u019C', 'N': '\u014A', 'O': '\u019F', 'P': '\u01A3',
    'Q': '\u024A', 'R': '\u0280', 'S': '\u0161', 'T': '\u0166',
    'U': '\u0168', 'V': '\u0245', 'W': '\u024B', 'X': '\u00D7',
    'Y': '\u01B4', 'Z': '\u023F',
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
    '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    ' ': ' ', '.': '\u02D9', ',': '\u02CC', '!': '\u00A1',
    '?': '\u00BF', '(': ')', ')': '(', '[': ']', ']': '[',
    '{': '}', '}': '{', '<': '>', '>': '<', '"': '"', "'": "'"
  },

  reverse: function(input) {
    return input.split('').reverse().join('');
  },

  mirror: function(input) {
    var self = this;
    return input.split('').map(function(ch) {
      return self.mirrorMap[ch] || ch;
    }).join('');
  },

  restore: function(input) {
    var reverseMap = {};
    var self = this;
    Object.keys(this.mirrorMap).forEach(function(k) {
      reverseMap[self.mirrorMap[k]] = k;
    });
    return input.split('').map(function(ch) {
      return reverseMap[ch] || ch;
    }).join('');
  }
};
