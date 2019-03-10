export declare enum CMD {
    LF = "\n",
    ESC = "\u001B",
    FS = "\u001C",
    GS = "\u001D",
    US = "\u001F",
    FF = "\f",
    DLE = "\u0010",
    DC1 = "\u0011",
    DC4 = "\u0014",
    EOT = "\u0004",
    NUL = "\0",
    EOL = "\n"
}
export declare enum FEED_CONTROL_SEQUENCES {
    LF = "\n",
    FF = "\f",
    CR = "\r",
    HT = "\t",
    VT = "\v"
}
export declare enum LINE_SPACING {
    DEFAULT = "\u001B2",
    SET = "\u001B3"
}
export declare enum HARDWARE {
    INIT = "\u001B@",
    SELECT = "\u001B=\u0001",
    RESET = "\u001B?\n\0"
}
export declare enum CASH_DRAWER {
    KICK_2 = "\u001Bp\0",
    KICK_5 = "\u001Bp\u0001"
}
export declare enum MARGINS {
    BOTTOM = "\u001BO",
    LEFT = "\u001Bl",
    RIGHT = "\u001BQ"
}
export declare enum PAPER_CUT {
    FULL = "\u001DV\0",
    PARTIAL = "\u001DV\u0001",
    A = "\u001DVA",
    B = "\u001DVB"
}
export declare enum TEXT_SIZE {
    NORMAL = "\u001B!\0",
    DOUBLE_HEIGHT = "\u001B!\u0010",
    DOUBLE_WIDTH = "\u001B! ",
    DOUBLE_WIDTH_HEIGHT = "\u001B!0"
}
export declare enum TEXT_ALIGN {
    LEFT = "\u001Ba\0",
    CENTER = "\u001Ba\u0001",
    RIGHT = "\u001Ba\u0002"
}
export declare enum TEXT_STYLE {
    SET_FONT = "\u001BM",
    SET_BOLD = "\u001BE",
    SET_UNDERLINE = "\u001B-",
    UNDERL_OFF = "\u001B-\0",
    UNDERL_ON = "\u001B-\u0001",
    UNDERL2_ON = "\u001B-\u0002",
    BOLD_OFF = "\u001BE\0",
    BOLD_ON = "\u001BE\u0001",
    ITALIC_OFF = "\u001B5",
    ITALIC_ON = "\u001B4"
}
export declare enum BARCODE {
    SET_FORMAT = "\u001Dk",
    SET_HEIGHT = "\u001Dh",
    SET_WIDTH = "\u001Dw",
    SET_FONT = "\u001Df",
    SET_HRI = "\u001DH"
}
export declare enum BARCODE_FORMAT {
    UPC_A = "\0",
    UPC_E = "\u0001",
    EAN13 = "\u0002",
    EAN8 = "\u0003",
    CODE39 = "\u0004",
    ITF = "\u0005",
    NW7 = "\u0006",
    CODE93 = "H",
    CODE128 = "I"
}
export declare enum BARCODE_HRI {
    OFF = "\0",
    ABOVE = "\u0001",
    BELOW = "\u0002",
    BOTH = "\u0003"
}
export declare enum FONT {
    A = "\0",
    B = "\u0001",
    C = "\u0002",
    D = "\u0003",
    E = "\u0004",
    A_SPECIAL = "a",
    B_SPECIAL = "b"
}
export declare enum IMAGE_FORMAT {
    S_RASTER_N = "\u001Dv0\0",
    S_RASTER_2W = "\u001Dv0\u0001",
    S_RASTER_2H = "\u001Dv0\u0002",
    S_RASTER_Q = "\u001Dv0\u0003"
}
export declare enum CODE2D_FORMAT {
    TYPE_PDF417 = "\u001BZ\0",
    TYPE_DATAMATRIX = "\u001BZ\u0001",
    TYPE_QR = "\u001BZ\u0002",
    CODE2D = "\u001BZ"
}
export declare enum BITMAP_FORMAT {
    BITMAP_S8 = "\u001B*\0",
    BITMAP_D8 = "\u001B*\u0001",
    BITMAP_S24 = "\u001B* ",
    BITMAP_D24 = "\u001B*!"
}
export declare enum GSV0_FORMAT {
    NORMAL = "\u001Dv0\0",
    DOUBLE_HEIGHT = "\u001Dv0\u0001",
    DOUBLE_WIDTH = "\u001Dv0\u0002",
    DOUBLE_WIDTH_HEIGHT = "\u001Dv0\u0003"
}
