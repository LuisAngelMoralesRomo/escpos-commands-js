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
export declare enum CONTROL_CMD {
    LF = "\n",
    FF = "\f",
    CR = "\r",
    HT = "\t",
    VT = "\v"
}
export declare enum TEXT_CMD {
    SET_FORMAT = "\u001B!",
    SET_SIZE = "\u001D!",
    SET_UNDERLINE = "\u001B-",
    SET_FONT = "\u001BM",
    SET_BOLD = "\u001BE",
    SET_ALIGN = "\u001Ba"
}
export declare enum ALIGN {
    LEFT = "\0",
    CENTER = "\u0001",
    RIGHT = "\u0002"
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
    FULL_FEED = "\u001DVA\0",
    PARTIAL_FEED = "\u001DVB\0",
    FULL_MOVE = "\u001DVa\0",
    PARTIAL_MOVE = "\u001DVb\0",
    FULL_RETURN = "\u001DVg\0",
    PARTIAL_RETURN = "\u001DVh\0"
}
export declare enum TEXT_STYLE {
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
    B_UPC_A = "A",
    B_UPC_E = "B",
    B_EAN13 = "C",
    B_EAN8 = "D",
    B_CODE39 = "E",
    B_ITF = "F",
    CODABAR = "G",
    CODE93 = "H",
    CODE128 = "I",
    GS1_128 = "J",
    GS1_DATABAR_OMNIDIRECTIONAL = "K",
    GS1_DATABAR_TRUNCATED = "L",
    GS1_DATABAR_LIMITED = "M",
    GS1_DATABAR_EXPANDED = "N"
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
export declare enum QR {
    SET_MODEL = "\u001D(k\u0004\x001A",
    SET_SIZE = "\u001D(k\u0003\x001C",
    SET_ERROR = "\u001D(k\u0003\x001E",
    SET_LENGTH = "\u001D(k",
    SET_DATA = "1P0",
    PRINT = "\u001D(k\u0003\x001Q0"
}
export declare enum QR_MODEL {
    MODEL_1 = "1",
    MODEL_2 = "2",
    MICRO = "3"
}
export declare enum QR_CORRECTION_LEVEL {
    LOW = "0",
    MEDIUM = "1",
    QUARTILE = "2",
    HIGH = "3"
}
