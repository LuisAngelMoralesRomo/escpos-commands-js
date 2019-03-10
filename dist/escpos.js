"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
var commands_1 = require("./commands");
var mutable_buffer_1 = require("./mutable-buffer");
var Escpos = /** @class */ (function () {
    function Escpos() {
        this.buffer = new mutable_buffer_1.MutableBuffer();
    }
    Escpos.prototype.init = function () {
        this.buffer.write(commands_1.HARDWARE.INIT);
        return this;
    };
    Escpos.prototype.hardware = function (cmd) {
        if (cmd) {
            this.buffer.write(cmd);
        }
        return this;
    };
    Escpos.prototype.control = function (ctrl) {
        if (ctrl) {
            this.buffer.write(ctrl);
        }
        return this;
    };
    Escpos.prototype.text = function (content) {
        this.buffer.write(content);
        return this;
    };
    Escpos.prototype.font = function (font) {
        this.buffer.write(commands_1.TEXT_STYLE.SET_FONT);
        this.buffer.write(font);
        return this;
    };
    Escpos.prototype.bold = function (set) {
        this.buffer.write(commands_1.TEXT_STYLE.SET_BOLD);
        this.buffer.writeUInt8(Number(!!set));
        return this;
    };
    Escpos.prototype.margin = function (side, size) {
        this.buffer.write(side);
        this.buffer.writeUInt8(size);
        return this;
    };
    Escpos.prototype.feed = function (lines) {
        if (lines === void 0) { lines = 1; }
        lines = Math.floor(lines);
        if (lines > 0) {
            this.buffer.write(new Array(lines).fill(commands_1.CMD.EOL).join(''));
        }
        return this;
    };
    Escpos.prototype.cut = function (mode) {
        if (mode) {
            this.buffer.write(mode);
        }
        return this;
    };
    Escpos.prototype.align = function (align) {
        this.buffer.write(align);
        return this;
    };
    Escpos.prototype.size = function (width, height) {
        if (width && height) {
            width = Math.min(Math.max(Math.floor(width), 1), 8);
            height = Math.min(Math.max(Math.floor(height), 1), 8);
            this.buffer.writeUInt8(((width - 1) << 4) + (height - 1));
        }
        return this;
        // if (2 >= width && 2 >= height) {
        //   this.buffer.write(CMD.TEXT_FORMAT.TXT_NORMAL);
        //   if (2 == width && 2 == height) {
        //     this.buffer.write(CMD.TEXT_FORMAT.TXT_4SQUARE);
        //   } else if (1 == width && 2 == height) {
        //     this.buffer.write(CMD.TEXT_FORMAT.TXT_2HEIGHT);
        //   } else if (2 == width && 1 == height) {
        //     this.buffer.write(CMD.TEXT_FORMAT.TXT_2WIDTH);
        //   }
        // }
    };
    Escpos.prototype.lineSpace = function (space) {
        if (space === undefined || space < 0 || space > 255) {
            this.buffer.write(commands_1.LINE_SPACING.DEFAULT);
        }
        else {
            space = Math.floor(space);
            this.buffer.write(commands_1.LINE_SPACING.SET);
            this.buffer.writeUInt8(space);
        }
        return this;
    };
    Escpos.prototype.barcode = function (code, type, width, height, hri, font) {
        this.buffer.write(commands_1.BARCODE.SET_WIDTH);
        if (typeof width !== 'number' || width < 2 || width > 6) {
            this.buffer.writeUInt8(2);
        }
        else {
            width = Math.floor(width);
            this.buffer.writeUInt8(width);
        }
        this.buffer.write(commands_1.BARCODE.SET_HEIGHT);
        if (typeof height !== 'number' || height < 1 || height > 255) {
            this.buffer.writeUInt8(100);
        }
        else {
            height = Math.floor(height);
            this.buffer.writeUInt8(height);
        }
        this.buffer.write(commands_1.BARCODE.SET_FONT);
        this.buffer.write(font || commands_1.FONT.A);
        this.buffer.write(commands_1.BARCODE.SET_HRI);
        this.buffer.write(hri || commands_1.BARCODE_HRI.OFF);
        this.buffer.write(commands_1.BARCODE.SET_FONT);
        this.buffer.write(type || commands_1.BARCODE_FORMAT.EAN13);
        code = String(code);
        this.buffer.write(code.length);
        this.buffer.write(buffer_1.Buffer.from(code, 'ascii'));
        this.buffer.write('\x00');
        return this;
    };
    // qrcode(code: string, version: number = 3, level: number = 3, size: number = 8): Escpos {
    //   this.buffer.write(CMD.CODE2D_FORMAT.CODE2D);
    //   this.buffer.writeUInt8(version);
    //   this.buffer.writeUInt8(level);
    //   this.buffer.writeUInt8(size);
    //   this.buffer.writeUInt16LE(code.length);
    //   this.buffer.write(code);
    //   return this;
    // }
    Escpos.prototype.pulse = function (pin, timeOn, timeOff) {
        if (pin) {
            this.buffer.write(pin);
            this.buffer.writeUInt8(timeOn ? Math.min(Math.max(Math.floor(timeOn / 2), 255), 0) : 255);
            this.buffer.writeUInt8(timeOff ? Math.min(Math.max(Math.floor(timeOff / 2), 255), 0) : 255);
        }
        return this;
    };
    Escpos.prototype.flush = function () {
        return this.buffer.flush();
    };
    return Escpos;
}());
exports.Escpos = Escpos;
;
