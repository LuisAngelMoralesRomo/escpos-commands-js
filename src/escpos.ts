import { Buffer } from 'buffer';
import { ALIGN, BARCODE, BARCODE_FORMAT, BARCODE_HRI, CASH_DRAWER, CMD, CONTROL_CMD, FONT, HARDWARE, LINE_SPACING, MARGINS, PAPER_CUT, TEXT_CMD, QR, QR_MODEL, QR_CORRECTION_LEVEL } from './commands';
import { MutableBuffer } from 'mutable-buffer';

export * from './commands';

export class Escpos {

  private buffer: MutableBuffer;

  constructor() {
    this.buffer = new MutableBuffer();
  }

  public init(): Escpos {
    this.buffer.write(HARDWARE.INIT);
    return this;
  }

  public hardware(cmd: HARDWARE): Escpos {
    if (cmd) {
      this.buffer.write(cmd);
    }
    return this;
  }

  public control(ctrl: CONTROL_CMD): Escpos {
    if (ctrl) {
      this.buffer.write(ctrl);
    }
    return this;
  }

  public text(content: string): Escpos {
    this.buffer.write(content);
    return this;
  }

  public line(content: string): Escpos {
    this.buffer.write(content);
    this.buffer.write(CONTROL_CMD.LF);
    return this;
  }

  public format(options: {
    fontB?: boolean,
    bold?: boolean,
    doubleHeight?: boolean,
    doubleWidth?: boolean,
    italic?: boolean,
    underline?: boolean
  }): Escpos {
    this.buffer.write(TEXT_CMD.SET_FORMAT);
    this.buffer.writeUInt8(
      (+!!options.fontB << 0) +
      (+!!options.bold << 3) +
      (+!!options.doubleHeight << 4) +
      (+!!options.doubleWidth << 5) +
      (+!!options.italic << 6) +
      (+!!options.underline << 7)
    );
    return this;
  }

  public font(font: FONT): Escpos {
    this.buffer.write(TEXT_CMD.SET_FONT);
    this.buffer.write(font || FONT.A);
    return this;
  }

  public bold(set: boolean): Escpos {
    this.buffer.write(TEXT_CMD.SET_BOLD);
    this.buffer.writeUInt8(+!!set);
    return this;
  }

  public underline(set: boolean, double?: boolean): Escpos {
    this.buffer.write(TEXT_CMD.SET_UNDERLINE);
    this.buffer.writeUInt8(set ? double ? 2 : 1 : 0);
    return this;
  }

  public margin(side: MARGINS, size: number): Escpos {
    this.buffer.write(side);
    this.buffer.writeUInt8(size);
    return this;
  }

  public feed(lines: number = 1): Escpos {
    if (typeof lines === 'number' && lines > 0) {
      lines = Math.floor(lines);
      this.buffer.write(new Array(lines).fill(CMD.EOL).join(''));
    }
    return this;
  }

  public cut(mode?: PAPER_CUT) {
    if (mode) {
      this.buffer.write(mode);
    }
    return this;
  }

  public align(align: ALIGN): Escpos {
    this.buffer.write(TEXT_CMD.SET_ALIGN);
    this.buffer.write(align || ALIGN.LEFT);
    return this;
  }

  public size(width: number, height: number): Escpos {
    if (width && height) {
      width = Math.min(Math.max(Math.floor(width), 1), 8);
      height = Math.min(Math.max(Math.floor(height), 1), 8);
      this.buffer.write(TEXT_CMD.SET_SIZE);
      this.buffer.writeUInt8(((width - 1) << 4) + (height - 1));
    }
    return this;
  }

  public lineSpace(space?: number): Escpos {
    if (space === undefined || space < 0 || space > 255) {
      this.buffer.write(LINE_SPACING.DEFAULT);
    } else {
      space = Math.floor(space)
      this.buffer.write(LINE_SPACING.SET);
      this.buffer.writeUInt8(space);
    }
    return this;
  }

  public barcode(
    code: string | number,
    type?: BARCODE_FORMAT,
    width?: number,
    height?: number,
    hri?: BARCODE_HRI,
    font?: FONT
  ): Escpos {

    this.buffer.write(BARCODE.SET_WIDTH);
    if (typeof width !== 'number' || width < 2 || width > 6) {
      this.buffer.writeUInt8(2);
    } else {
      width = Math.floor(width);
      this.buffer.writeUInt8(width);
    }

    this.buffer.write(BARCODE.SET_HEIGHT);
    if (typeof height !== 'number' || height < 1 || height > 255) {
      this.buffer.writeUInt8(100);
    } else {
      height = Math.floor(height);
      this.buffer.writeUInt8(height);
    }

    this.buffer.write(BARCODE.SET_FONT);
    this.buffer.write(font || FONT.B);

    this.buffer.write(BARCODE.SET_HRI);
    this.buffer.write(hri || BARCODE_HRI.OFF);

    this.buffer.write(BARCODE.SET_FORMAT);
    this.buffer.write(type || BARCODE_FORMAT.EAN13);

    code = String(code);
    if (type > '\x40') {
      this.buffer.writeUInt8(code.length);
      this.buffer.write(Buffer.from(code, 'ascii'));
    } else {
      this.buffer.write(Buffer.from(code, 'ascii'));
      this.buffer.write(CMD.NUL);
    }

    return this;
  }

  public qrcode(value: string, model?: QR_MODEL, size?: number, correction?: QR_CORRECTION_LEVEL): Escpos {
    this.buffer.write(CMD.LF);

    this.buffer.write(QR.SET_MODEL);
    this.buffer.write(model || QR_MODEL.MODEL_2);
    this.buffer.write(CMD.NUL);

    this.buffer.write(QR.SET_SIZE);
    if (typeof size !== 'number' || size < 1 || size > 8) {
      this.buffer.writeUInt8(6);
    } else {
      size = Math.floor(size);
      this.buffer.writeUInt8(size);
    }

    this.buffer.write(QR.SET_ERROR);
    this.buffer.write(correction || QR_CORRECTION_LEVEL.MEDIUM);

    this.buffer.write(QR.SET_LENGTH);
    this.buffer.writeUInt16LE(value.length + 3);

    this.buffer.write(QR.SET_DATA);
    this.buffer.write(Buffer.from(value, 'ascii'));

    this.buffer.write(QR.PRINT);

    return this;
  }


  public pulse(pin: CASH_DRAWER, timeOn?: number, timeOff?: number): Escpos {
    if (pin) {
      this.buffer.write(pin);
      this.buffer.writeUInt8(timeOn ? Math.min(Math.max(Math.floor(timeOn / 2), 255), 0) : 255);
      this.buffer.writeUInt8(timeOff ? Math.min(Math.max(Math.floor(timeOff / 2), 255), 0) : 255);
    }
    return this;
  }

  public getBuffer(): Buffer {
    return this.buffer.flush();
  }

  public getArray(): number[] {
    return [...this.buffer.flush()];
  }

};
