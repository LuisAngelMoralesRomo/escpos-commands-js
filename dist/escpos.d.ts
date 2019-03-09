export declare class Escpos {
    private buffer;
    constructor();
    init(): Escpos;
    boldOn(): Escpos;
    boldOff(): Escpos;
    marginBottom(size: number): Escpos;
    marginLeft(size: number): Escpos;
    marginRight(size: number): Escpos;
    text(content: string, encoding?: string): Escpos;
    feed(lines?: number): Escpos;
    control(ctrl: 'LF' | 'FF' | 'CR' | 'HT' | 'VT'): Escpos;
    align(align: 'LT' | 'CT' | 'RT'): Escpos;
    font(family: 'A' | 'B' | 'C'): Escpos;
    lineSpace(space?: number): Escpos;
    qrcode(code: string, version?: number, level?: number, size?: number): Escpos;
    cut(part: boolean, feed?: number): this;
    flush(): import("buffer").Buffer;
}
