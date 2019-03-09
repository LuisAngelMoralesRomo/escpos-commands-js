import { MutableBuffer } from './mutable-buffer';
import { CMD } from './commands';

export class Escpos {

  private buffer: MutableBuffer;

  constructor() {
    this.buffer = new MutableBuffer();
  }

  public init(): Escpos {
    this.buffer.write(CMD.HARDWARE.HW_INIT);
    return this;
  }

  public boldOn(): Escpos {
    this.buffer.write(CMD.TEXT_FORMAT.TXT_BOLD_ON);
    return this;
  }

  public boldOff(): Escpos {
    this.buffer.write(CMD.TEXT_FORMAT.TXT_BOLD_OFF);
    return this;
  }

  public marginBottom(size: number): Escpos {
    this.buffer.write(CMD.MARGINS.BOTTOM);
    this.buffer.writeUInt8(size);
    return this;
  }

  public marginLeft(size: number): Escpos {
    this.buffer.write(CMD.MARGINS.LEFT);
    this.buffer.writeUInt8(size);
    return this;
  }

  public marginRight(size: number): Escpos {
    this.buffer.write(CMD.MARGINS.RIGHT);
    this.buffer.writeUInt8(size);
    return this;
  }

  public text(content: string, encoding?: string): Escpos {
    this.buffer.write(content, encoding);
    return this;
  }

  public feed(lines: number = 1): Escpos {
    if (lines <= 0) {
      return this;
    }
    lines = Math.floor(lines);
    this.buffer.write(new Array(lines).fill(CMD.EOL).join(''));
    return this;
  }

  public control(ctrl: 'LF' | 'FF' | 'CR' | 'HT' | 'VT'): Escpos {
    this.buffer.write(CMD.FEED_CONTROL_SEQUENCES[`CTL_${ctrl}`]);
    return this;
  }

  public align(align: 'LT' | 'CT' | 'RT'): Escpos {
    this.buffer.write(CMD.TEXT_FORMAT[`TXT_ALIGN_${align}`]);
    return this;
  }

  public font(family: 'A' | 'B' | 'C'): Escpos {
    this.buffer.write(CMD.TEXT_FORMAT[`TXT_FONT_${family}`]);
    return this;
  }

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

  public lineSpace(space?: number): Escpos {
    if (space === undefined) {
      this.buffer.write(CMD.LINE_SPACING.LS_DEFAULT);
    } else {
      space = Math.floor(space);
      if (space < 0) {
        space = 0;
      }
      this.buffer.write(CMD.LINE_SPACING.LS_SET);
      this.buffer.writeUInt8(space);
    }
    return this;
  }

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

  qrcode(code: string, version: number = 3, level: number = 3, size: number = 8): Escpos {
    this.buffer.write(CMD.CODE2D_FORMAT.CODE2D);
    this.buffer.writeUInt8(version);
    this.buffer.writeUInt8(level);
    this.buffer.writeUInt8(size);
    this.buffer.writeUInt16LE(code.length);
    this.buffer.write(code);
    return this;
  }

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

  public cut(part: boolean, feed: number = 3) {
    this.feed(feed);
    this.buffer.write(CMD.PAPER[part ? 'PAPER_PART_CUT' : 'PAPER_FULL_CUT']);
    return this;
  }

  public flush() {
    return this.buffer.flush();
  }

};
