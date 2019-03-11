import { Buffer } from 'buffer';
import { ALIGN, BARCODE_FORMAT, BARCODE_HRI, CASH_DRAWER, CONTROL_CMD, FONT, HARDWARE, MARGINS, PAPER_CUT, QR_MODEL, QR_CORRECTION_LEVEL } from './commands';
export declare class Escpos {
    private buffer;
    constructor();
    init(): Escpos;
    hardware(cmd: HARDWARE): Escpos;
    control(ctrl: CONTROL_CMD): Escpos;
    text(content: string): Escpos;
    format(options: {
        fontB?: boolean;
        bold?: boolean;
        doubleHeight?: boolean;
        doubleWidth?: boolean;
        italic?: boolean;
        underline?: boolean;
    }): Escpos;
    font(font: FONT): Escpos;
    bold(set: boolean): Escpos;
    underline(set: boolean, double?: boolean): Escpos;
    margin(side: MARGINS, size: number): Escpos;
    feed(lines?: number): Escpos;
    cut(mode?: PAPER_CUT): this;
    align(align: ALIGN): Escpos;
    size(width: number, height: number): Escpos;
    lineSpace(space?: number): Escpos;
    barcode(code: string | number, type?: BARCODE_FORMAT, width?: number, height?: number, hri?: BARCODE_HRI, font?: FONT): Escpos;
    qrcode(value: string, model?: QR_MODEL, size?: number, correction?: QR_CORRECTION_LEVEL): Escpos;
    pulse(pin: CASH_DRAWER, timeOn?: number, timeOff?: number): Escpos;
    getBuffer(): Buffer;
    getArray(): number[];
}
