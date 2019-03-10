import { Buffer } from 'buffer';
import { BARCODE_FORMAT, BARCODE_HRI, FEED_CONTROL_SEQUENCES, FONT, HARDWARE, MARGINS, TEXT_ALIGN, PAPER_CUT, CASH_DRAWER } from './commands';
export declare class Escpos {
    private buffer;
    constructor();
    init(): Escpos;
    hardware(cmd: HARDWARE): Escpos;
    control(ctrl: FEED_CONTROL_SEQUENCES): Escpos;
    text(content: string): Escpos;
    font(font: FONT): Escpos;
    bold(set: boolean): Escpos;
    margin(side: MARGINS, size: number): Escpos;
    feed(lines?: number): Escpos;
    cut(mode?: PAPER_CUT): this;
    align(align: TEXT_ALIGN): Escpos;
    size(width: number, height: number): Escpos;
    lineSpace(space?: number): Escpos;
    barcode(code: string | number, type?: BARCODE_FORMAT, width?: number, height?: number, hri?: BARCODE_HRI, font?: FONT): Escpos;
    pulse(pin: CASH_DRAWER, timeOn?: number, timeOff?: number): Escpos;
    flush(): Buffer;
}
