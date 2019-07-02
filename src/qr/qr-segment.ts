
import { BitBuffer } from "./bit-buffer";

/**
 * A segment of character/binary/control data in a QR Code symbol.
 * This segment class imposes no length restrictions, but QR Codes have restrictions.
 * Even in the most favorable conditions, a QR Code can only hold 7089 characters of data.
 * Any segment longer than this is meaningless for the purpose of generating QR Codes.
 */
export class QrSegment {

  /**
   * QrSegment factory function from binary data.
   * @param data Byte array data to be encoded.
   * @returns Segment representing the given data encoded in byte mode.
   */
  public static fromBytes(data: byte[]): QrSegment {
    let bb = new BitBuffer();
    for (const byte of data) {
      bb.appendBits(byte, 8);
    }
    return new QrSegment(QrSegment.Mode.BYTE, data.length, bb);
  }


  /**
   * QrSegment factory function from decimal number.
   * @param digits Decimal number string to be encoded.
   * The characters allowed are: `0123456789`
   * @returns Segment representing the given number encoded in numeric mode.
   */
  public static fromNumeric(digits: string): QrSegment {
    if (!this.NUMERIC_REGEX.test(digits)) {
      throw new Error("String contains non-numeric characters");
    }
    let bb = new BitBuffer();
    for (let i = 0; i < digits.length;) {
      const n: int = Math.min(digits.length - i, 3);
      bb.appendBits(parseInt(digits.substr(i, n), 10), n * 3 + 1);
      i += n;
    }
    return new QrSegment(QrSegment.Mode.NUMERIC, digits.length, bb);
  }

  /**
   * QrSegment factory function from alphanumeric text.
   * @param text Alphanumeric string to be encoded.
   * The characters allowed are: `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:`
   * @returns Segment representing the given text encoded in alphanumeric mode.
   */
  public static fromAlphanumeric(text: string): QrSegment {
    if (!this.ALPHANUMERIC_REGEX.test(text)) {
      throw new Error("String contains unencodable characters in alphanumeric mode");
    }
    let bb = new BitBuffer();
    let i: int;
    for (i = 0; i + 2 <= text.length; i += 2) {
      let temp: int = QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)) * 45;
      temp += QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i + 1));
      bb.appendBits(temp, 11);
    }
    if (i < text.length) {
      bb.appendBits(QrSegment.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)), 6);
    }
    return new QrSegment(QrSegment.Mode.ALPHANUMERIC, text.length, bb);
  }

  /**
   * QrSegment factory function from UTF-8 text.
   * @param digits UTF-8 string to be encoded.
   * @returns Segment representing the given text encoded in byte mode.
   */
  private static fromUtf8(text: string): QrSegment {
    text = encodeURI(text);
    let result: byte[] = [];
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) != "%")
        result.push(text.charCodeAt(i));
      else {
        result.push(parseInt(text.substr(i + 1, 2), 16));
        i += 2;
      }
    }
    return QrSegment.fromBytes(result);
  }

  /**
   * QrSegment factory function from text.
   * @param digits String to be encoded.
   * @returns Segment representing the given text encoded in the most efficient encoding.
   */
  public static fromText(text: string): QrSegment {
    if (QrSegment.NUMERIC_REGEX.test(text)) {
      return QrSegment.fromNumeric(text);
    }
    if (QrSegment.ALPHANUMERIC_REGEX.test(text)) {
      return QrSegment.fromAlphanumeric(text);
    }
    return QrSegment.fromUtf8(text);
  }

  /**
   * QrSegment factory function from ECI assignment number.
   * @param assignmentNumber ECI assignment number to be encoded.
   * @returns Segment representing an Extended Channel Interpretation (ECI) designator with the given assignment value.
   */
  public static fromEci(assignmentNumber: int): QrSegment {
    let bb = new BitBuffer();
    if (assignmentNumber < 0) {
      throw "ECI assignment value out of range";
    } else if (assignmentNumber < (1 << 7)) {
      bb.appendBits(0, 1);
      bb.appendBits(assignmentNumber, 7);
    } else if (assignmentNumber < (1 << 14)) {
      bb.appendBits(2, 2);
      bb.appendBits(assignmentNumber, 14);
    } else if (assignmentNumber < (1 << 21)) {
      bb.appendBits(6, 3);
      bb.appendBits(assignmentNumber, 21);
    } else {
      throw "ECI assignment value out of range";
    }
    return new QrSegment(QrSegment.Mode.ECI, 0, bb);
  }

  public get dataBits(): bit[] {
    return this._dataBits.slice();
  }

  /**
   * QrSegment class constructor
   * 
   * Creates a new QR Code segment with the given attributes and data.
   * The character count (numChars) must agree with the mode and the bit buffer length,
   * but the constraint isn't checked. The given bit buffer is cloned and stored.
   * 
   * @param mode Mode indicator of the segment.
   * @param numChars The length of the segment's unencoded data.
   * Measured in:
   * - Characters for numeric/alphanumeric/kanji mode
   * - Bytes for byte mode
   * - 0 for ECI mode.
   * 
   * Always zero or positive. Not the same as the data's bit length.
   * 
   * @param _dataBits The data bits of the segment.
   */
  private constructor(
    public readonly mode: QrSegment.Mode,
    public readonly numChars: int,
    private readonly _dataBits: bit[]
  ) {
    if (numChars < 0) {
      throw "Invalid argument";
    }
    this._dataBits = this._dataBits.slice();
  }

  /**
   * Calculate number of bits needed to encode the segment.
   * @param version Version number.
   * @returns Number of bits needed to encode the segment at the given version.
   * @returns Infinity if the segment has too many characters to fit its length field.
   */
  public getTotalBitsCount(version: int): number {
    const ccbits: int = this.mode.charCountFieldWidth(version);
    if (this.numChars < (1 << ccbits)) {
      return 4 + ccbits + this._dataBits.length;
    }
    return Infinity;
  }

  /**
   * Describes all strings that are encodable in numeric mode.
   * A string is encodable iff each character is in the following set: `0123456789`.
   */
  private static readonly NUMERIC_REGEX: RegExp = /^[0-9]*$/;

  /**
   * Describes all strings that are encodable in alphanumeric mode.
   * A string is encodable iff each character is in the following set: `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:`
   */
  private static readonly ALPHANUMERIC_REGEX: RegExp = /^[A-Z0-9 $%*+.\/:-]*$/;

  /**
   * The set of all legal characters in alphanumeric mode,
   * where each character value maps to the index in the string.
   */
  private static readonly ALPHANUMERIC_CHARSET: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";

}

export namespace QrSegment {

	/**
	 * Describes how a segment's data bits are interpreted. Inmutable.
	 */
  export class Mode {
    public static readonly NUMERIC = new Mode(0x1, [10, 12, 14]);
    public static readonly ALPHANUMERIC = new Mode(0x2, [9, 11, 13]);
    public static readonly BYTE = new Mode(0x4, [8, 16, 16]);
    public static readonly KANJI = new Mode(0x8, [8, 10, 12]);
    public static readonly ECI = new Mode(0x7, [0, 0, 0]);

    /** 
     * QrSegment.Mode class constructor
     * @param modeBits The mode indicator bits. Unsigned 4-bit number (Range 0 to 15).
     * @param charCountFieldWidths Bit width of character count field for three different version ranges (Range 0 to 16).
     */
    private constructor(
      public readonly modeBits: int,
      private readonly charCountFieldWidths: [int, int, int]
    ) { }

    /**
     * Calculates the bit width of the character count field of this mode at the given version number.
     * @param version Version number.
     * @returns Bit width of the character count field of this mode at the given version number (Range 0 to 16)
     */
    public charCountFieldWidth(version: int): int {
      return this.charCountFieldWidths[Math.floor((version + 7) / 17)];
    }

  }
}
