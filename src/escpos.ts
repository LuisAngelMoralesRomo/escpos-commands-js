import { Buffer } from 'buffer';
import { BARCODE, BARCODE_FORMAT, BARCODE_HRI, CMD, FEED_CONTROL_SEQUENCES, FONT, HARDWARE, LINE_SPACING, MARGINS, TEXT_ALIGN, TEXT_STYLE, PAPER_CUT, CASH_DRAWER } from './commands';
import { MutableBuffer } from './mutable-buffer';

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

  public control(ctrl: FEED_CONTROL_SEQUENCES): Escpos {
    if (ctrl) {
      this.buffer.write(ctrl);
    }
    return this;
  }

  public text(content: string): Escpos {
    this.buffer.write(content);
    return this;
  }

  public font(font: FONT): Escpos {
    this.buffer.write(TEXT_STYLE.SET_FONT);
    this.buffer.write(font);
    return this;
  }

  public bold(set: boolean): Escpos {
    this.buffer.write(TEXT_STYLE.SET_BOLD);
    this.buffer.writeUInt8(Number(!!set));
    return this;
  }

  public margin(side: MARGINS, size: number): Escpos {
    this.buffer.write(side);
    this.buffer.writeUInt8(size);
    return this;
  }

  public feed(lines: number = 1): Escpos {
    lines = Math.floor(lines);
    if (lines > 0) {
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

  public align(align: TEXT_ALIGN): Escpos {
    this.buffer.write(align);
    return this;
  }

  public size(width: number, height: number): Escpos {
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
    this.buffer.write(font || FONT.A);

    this.buffer.write(BARCODE.SET_HRI);
    this.buffer.write(hri || BARCODE_HRI.OFF);

    this.buffer.write(BARCODE.SET_FONT);
    this.buffer.write(type || BARCODE_FORMAT.EAN13);

    code = String(code);
    this.buffer.write(code.length);
    this.buffer.write(Buffer.from(code, 'ascii'));
    this.buffer.write('\x00');

    return this;
  }

  // qrcode(code: string, version: number = 3, level: number = 3, size: number = 8): Escpos {
  //   this.buffer.write(CMD.CODE2D_FORMAT.CODE2D);
  //   this.buffer.writeUInt8(version);
  //   this.buffer.writeUInt8(level);
  //   this.buffer.writeUInt8(size);
  //   this.buffer.writeUInt16LE(code.length);
  //   this.buffer.write(code);
  //   return this;
  // }

  public pulse(pin: CASH_DRAWER, timeOn?: number, timeOff?: number): Escpos {
    if (pin) {
      this.buffer.write(pin);
      this.buffer.writeUInt8(timeOn ? Math.min(Math.max(Math.floor(timeOn / 2), 255), 0) : 255);
      this.buffer.writeUInt8(timeOff ? Math.min(Math.max(Math.floor(timeOff / 2), 255), 0) : 255);
    }
    return this;
  }

  public flush() {
    return this.buffer.flush();
  }

};
