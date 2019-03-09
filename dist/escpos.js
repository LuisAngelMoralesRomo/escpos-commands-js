"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mutable_buffer_1 = require("./mutable-buffer");
var commands_1 = require("./commands");
var Escpos = /** @class */ (function () {
    function Escpos() {
        this.buffer = new mutable_buffer_1.MutableBuffer();
    }
    Escpos.prototype.init = function () {
        this.buffer.write(commands_1.CMD.HARDWARE.HW_INIT);
        return this;
    };
    Escpos.prototype.boldOn = function () {
        this.buffer.write(commands_1.CMD.TEXT_FORMAT.TXT_BOLD_ON);
        return this;
    };
    Escpos.prototype.boldOff = function () {
        this.buffer.write(commands_1.CMD.TEXT_FORMAT.TXT_BOLD_OFF);
        return this;
    };
    Escpos.prototype.marginBottom = function (size) {
        this.buffer.write(commands_1.CMD.MARGINS.BOTTOM);
        this.buffer.writeUInt8(size);
        return this;
    };
    Escpos.prototype.marginLeft = function (size) {
        this.buffer.write(commands_1.CMD.MARGINS.LEFT);
        this.buffer.writeUInt8(size);
        return this;
    };
    Escpos.prototype.marginRight = function (size) {
        this.buffer.write(commands_1.CMD.MARGINS.RIGHT);
        this.buffer.writeUInt8(size);
        return this;
    };
    Escpos.prototype.text = function (content, encoding) {
        this.buffer.write(content, encoding);
        return this;
    };
    Escpos.prototype.feed = function (lines) {
        if (lines === void 0) { lines = 1; }
        if (lines <= 0) {
            return this;
        }
        lines = Math.floor(lines);
        this.buffer.write(new Array(lines).fill(commands_1.CMD.EOL).join(''));
        return this;
    };
    Escpos.prototype.control = function (ctrl) {
        this.buffer.write(commands_1.CMD.FEED_CONTROL_SEQUENCES["CTL_" + ctrl]);
        return this;
    };
    Escpos.prototype.align = function (align) {
        this.buffer.write(commands_1.CMD.TEXT_FORMAT["TXT_ALIGN_" + align]);
        return this;
    };
    Escpos.prototype.font = function (family) {
        this.buffer.write(commands_1.CMD.TEXT_FORMAT["TXT_FONT_" + family]);
        return this;
    };
    // public size(width: number, height: number): Escpos {
    //   if (2 >= width && 2 >= height) {
    //     this.buffer.write(CMD.TEXT_FORMAT.TXT_NORMAL);
    //     if (2 == width && 2 == height) {
    //       this.buffer.write(CMD.TEXT_FORMAT.TXT_4SQUARE);
    //     } else if (1 == width && 2 == height) {
    //       this.buffer.write(CMD.TEXT_FORMAT.TXT_2HEIGHT);
    //     } else if (2 == width && 1 == height) {
    //       this.buffer.write(CMD.TEXT_FORMAT.TXT_2WIDTH);
    //     }
    //   } else {
    //     this.buffer.write(CMD.TEXT_FORMAT.TXT_CUSTOM_SIZE(width, height));
    //   }
    //   return this;
    // }
    Escpos.prototype.lineSpace = function (space) {
        if (space === undefined) {
            this.buffer.write(commands_1.CMD.LINE_SPACING.LS_DEFAULT);
        }
        else {
            space = Math.floor(space);
            if (space < 0) {
                space = 0;
            }
            this.buffer.write(commands_1.CMD.LINE_SPACING.LS_SET);
            this.buffer.writeUInt8(space);
        }
        return this;
    };
    // barcode(code, type = 'CODE128', width = 3, height = 100, position = 'BTH', font = 'B') {
    //   let convertCode = String(code);
    //   if (typeof type === 'undefined' || type === null) {
    //     throw new TypeError('barcode type is required');
    //   }
    //   if (type === 'EAN13' && convertCode.length != 12) {
    //     throw new Error('EAN13 Barcode type requires code length 12');
    //   }
    //   if (type === 'EAN8' && convertCode.length != 7) {
    //     throw new Error('EAN8 Barcode type requires code length 7');
    //   }
    //   if (width >= 2 || width <= 6) {
    //     this.buffer.write(CMD.BARCODE_FORMAT.BARCODE_WIDTH[width]);
    //   } else {
    //     this.buffer.write(CMD.BARCODE_FORMAT.BARCODE_WIDTH_DEFAULT);
    //   }
    //   if (height >= 1 || height <= 255) {
    //     this.buffer.write(CMD.BARCODE_FORMAT.BARCODE_HEIGHT(height));
    //   } else {
    //     this.buffer.write(CMD.BARCODE_FORMAT.BARCODE_HEIGHT_DEFAULT);
    //   }
    //   this.buffer.write(CMD.BARCODE_FORMAT[
    //     'BARCODE_FONT_' + (font || 'B').toUpperCase()
    //   ]);
    //   this.buffer.write(CMD.BARCODE_FORMAT[
    //     'BARCODE_TXT_' + (position || 'BTH').toUpperCase()
    //   ]);
    //   this.buffer.write(CMD.BARCODE_FORMAT[
    //     'BARCODE_' + ((type || 'EAN13').replace('-', '_').toUpperCase())
    //   ]);
    //   let codeBytes = code.split('').map(s => s.charCodeAt(0));
    //   this.buffer.write(codeBytes.length);
    //   this.buffer.write(codeBytes);
    //   this.buffer.write('\x00');
    //   return this;
    // }
    Escpos.prototype.qrcode = function (code, version, level, size) {
        if (version === void 0) { version = 3; }
        if (level === void 0) { level = 3; }
        if (size === void 0) { size = 8; }
        this.buffer.write(commands_1.CMD.CODE2D_FORMAT.CODE2D);
        this.buffer.writeUInt8(version);
        this.buffer.writeUInt8(level);
        this.buffer.writeUInt8(size);
        this.buffer.writeUInt16LE(code.length);
        this.buffer.write(code);
        return this;
    };
    // hardware(hw: 'HW_INIT' | 'HW_SELECT' | 'HW_RESET') {
    //   this.buffer.write(CMD.HARDWARE[`HW_${hw}`]);
    //   return this.flush();
    // }
    // public cashdraw(pin: 2 | 5): Escpos {
    //   if (!pin) {
    //     return this;
    //   }
    //   this.buffer.write(CMD.CASH_DRAWER[`CD_KICK_${pin}`]);
    //   return this.flush();
    // }
    Escpos.prototype.cut = function (part, feed) {
        if (feed === void 0) { feed = 3; }
        this.feed(feed);
        this.buffer.write(commands_1.CMD.PAPER[part ? 'PAPER_PART_CUT' : 'PAPER_FULL_CUT']);
        return this;
    };
    Escpos.prototype.flush = function () {
        return this.buffer.flush();
    };
    return Escpos;
}());
exports.Escpos = Escpos;
;
