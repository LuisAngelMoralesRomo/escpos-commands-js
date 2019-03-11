"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buffer_1 = require("buffer");
var commands_1 = require("./commands");
var mutable_buffer_1 = require("mutable-buffer");
// import { create } from 'qrcode';
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
    Escpos.prototype.format = function (options) {
        this.buffer.write(commands_1.TEXT_CMD.SET_FORMAT);
        this.buffer.writeUInt8((+!!options.fontB << 0) +
            (+!!options.bold << 3) +
            (+!!options.doubleHeight << 4) +
            (+!!options.doubleWidth << 5) +
            (+!!options.italic << 6) +
            (+!!options.underline << 7));
        return this;
    };
    Escpos.prototype.font = function (font) {
        this.buffer.write(commands_1.TEXT_CMD.SET_FONT);
        this.buffer.write(font || commands_1.FONT.A);
        return this;
    };
    Escpos.prototype.bold = function (set) {
        this.buffer.write(commands_1.TEXT_CMD.SET_BOLD);
        this.buffer.writeUInt8(+!!set);
        return this;
    };
    Escpos.prototype.underline = function (set, double) {
        this.buffer.write(commands_1.TEXT_CMD.SET_UNDERLINE);
        this.buffer.writeUInt8(set ? double ? 2 : 1 : 0);
        return this;
    };
    Escpos.prototype.margin = function (side, size) {
        this.buffer.write(side);
        this.buffer.writeUInt8(size);
        return this;
    };
    Escpos.prototype.feed = function (lines) {
        if (lines === void 0) { lines = 1; }
        if (typeof lines === 'number' && lines > 0) {
            lines = Math.floor(lines);
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
        this.buffer.write(commands_1.TEXT_CMD.SET_ALIGN);
        this.buffer.write(align || commands_1.ALIGN.LEFT);
        return this;
    };
    Escpos.prototype.size = function (width, height) {
        if (width && height) {
            width = Math.min(Math.max(Math.floor(width), 1), 8);
            height = Math.min(Math.max(Math.floor(height), 1), 8);
            this.buffer.write(commands_1.TEXT_CMD.SET_SIZE);
            this.buffer.writeUInt8(((width - 1) << 4) + (height - 1));
        }
        return this;
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
        this.buffer.write(font || commands_1.FONT.B);
        this.buffer.write(commands_1.BARCODE.SET_HRI);
        this.buffer.write(hri || commands_1.BARCODE_HRI.OFF);
        this.buffer.write(commands_1.BARCODE.SET_FORMAT);
        this.buffer.write(type || commands_1.BARCODE_FORMAT.EAN13);
        code = String(code);
        if (type > '\x40') {
            this.buffer.writeUInt8(code.length);
            this.buffer.write(buffer_1.Buffer.from(code, 'ascii'));
        }
        else {
            this.buffer.write(buffer_1.Buffer.from(code, 'ascii'));
            this.buffer.write(commands_1.CMD.NUL);
        }
        return this;
    };
    Escpos.prototype.qrcode = function (value, model, size, correction) {
        this.buffer.write(commands_1.CMD.LF);
        this.buffer.write(commands_1.QR.SET_MODEL);
        this.buffer.write(model || commands_1.QR_MODEL.MODEL_2);
        this.buffer.write(commands_1.CMD.NUL);
        this.buffer.write(commands_1.QR.SET_SIZE);
        if (typeof size !== 'number' || size < 1 || size > 8) {
            this.buffer.writeUInt8(6);
        }
        {
            size = Math.floor(size);
            this.buffer.writeUInt8(size);
        }
        this.buffer.write(commands_1.QR.SET_ERROR);
        this.buffer.write(correction || commands_1.QR_CORRECTION_LEVEL.MEDIUM);
        this.buffer.write(commands_1.QR.SET_LENGTH);
        this.buffer.writeUInt16LE(value.length + 3);
        this.buffer.write(commands_1.QR.SET_DATA);
        this.buffer.write(buffer_1.Buffer.from(value, 'ascii'));
        this.buffer.write(commands_1.QR.PRINT);
        return this;
    };
    // public qrimage(value: string): Escpos {
    //   const qr = create(value).modules;
    //   const bytes: any[] = []
    //   for (let i = 0; i < qr.data.length; i += qr.size) {
    //     bytes.push(qr.data.slice(i, i + qr.size).map(bit => bit ? 0xFF : 0x00));
    //     bytes.push(qr.data.slice(i, i + qr.size).map(bit => bit ? 0xFF : 0x00));
    //     bytes.push(qr.data.slice(i, i + qr.size).map(bit => bit ? 0xFF : 0x00));
    //     bytes.push(qr.data.slice(i, i + qr.size).map(bit => bit ? 0xFF : 0x00));
    //     bytes.push(qr.data.slice(i, i + qr.size).map(bit => bit ? 0xFF : 0x00));
    //     bytes.push(qr.data.slice(i, i + qr.size).map(bit => bit ? 0xFF : 0x00));
    //     bytes.push(qr.data.slice(i, i + qr.size).map(bit => bit ? 0xFF : 0x00));
    //     bytes.push(qr.data.slice(i, i + qr.size).map(bit => bit ? 0xFF : 0x00));
    //   }
    //   const size: number = qr.size * 8 
    //   this.buffer.write([
    //     0x1d, 0x76, 0x30, 0x00,
    //     (size >> 3) & 0xff, (((size >> 3) >> 8) & 0xff),
    //     size & 0xff, ((size >> 8) & 0xff),
    //     bytes,
    //   ]);
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
