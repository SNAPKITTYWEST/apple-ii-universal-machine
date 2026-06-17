var RegisterSim = {
  registers: {
    AX: 0x0000,
    BX: 0x0000,
    CX: 0x0000,
    DX: 0x0000,
    IP: 0x0000,
    FLAGS: 0x0000
  },

  reset: function() {
    this.registers = { AX: 0, BX: 0, CX: 0, DX: 0, IP: 0, FLAGS: 0 };
  },

  set: function(name, value) {
    if (this.registers.hasOwnProperty(name)) {
      this.registers[name] = value & 0xFFFF;
    }
  },

  get: function(name) {
    return this.registers[name] || 0;
  },

  renderState: function() {
    var lines = [
      '╔══════════════════════════════════════╗',
      '║  CPU REGISTERS (SIMULATED)           ║',
      '╠══════════════════════════════════════╣',
      '║  AX:    ' + this._hex(this.registers.AX) + '                  ║',
      '║  BX:    ' + this._hex(this.registers.BX) + '                  ║',
      '║  CX:    ' + this._hex(this.registers.CX) + '                  ║',
      '║  DX:    ' + this._hex(this.registers.DX) + '                  ║',
      '║  IP:    ' + this._hex(this.registers.IP) + '                  ║',
      '║  FLAGS: ' + this._hex(this.registers.FLAGS) + '                  ║',
      '╚══════════════════════════════════════╝'
    ];
    return lines.join('\n');
  },

  _hex: function(v) {
    return '0x' + (v >>> 0).toString(16).toUpperCase().padStart(4, '0');
  }
};
