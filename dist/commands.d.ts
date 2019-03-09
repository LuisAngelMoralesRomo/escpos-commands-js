export declare const CMD: {
    LF: string;
    ESC: string;
    FS: string;
    GS: string;
    US: string;
    FF: string;
    DLE: string;
    DC1: string;
    DC4: string;
    EOT: string;
    NUL: string;
    EOL: string;
    FEED_CONTROL_SEQUENCES: {
        CTL_LF: string;
        CTL_FF: string;
        CTL_CR: string;
        CTL_HT: string;
        CTL_VT: string;
    };
    LINE_SPACING: {
        LS_DEFAULT: string;
        LS_SET: string;
    };
    HARDWARE: {
        HW_INIT: string;
        HW_SELECT: string;
        HW_RESET: string;
    };
    CASH_DRAWER: {
        CD_KICK_2: string;
        CD_KICK_5: string;
    };
    MARGINS: {
        BOTTOM: string;
        LEFT: string;
        RIGHT: string;
    };
    PAPER: {
        PAPER_FULL_CUT: string;
        PAPER_PART_CUT: string;
        PAPER_CUT_A: string;
        PAPER_CUT_B: string;
    };
    TEXT_FORMAT: {
        TXT_NORMAL: string;
        TXT_2HEIGHT: string;
        TXT_2WIDTH: string;
        TXT_4SQUARE: string;
        TXT_CUSTOM_SIZE: (width: any, height: any) => string;
        TXT_HEIGHT: {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
        };
        TXT_WIDTH: {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
        };
        TXT_UNDERL_OFF: string;
        TXT_UNDERL_ON: string;
        TXT_UNDERL2_ON: string;
        TXT_BOLD_OFF: string;
        TXT_BOLD_ON: string;
        TXT_ITALIC_OFF: string;
        TXT_ITALIC_ON: string;
        TXT_FONT_A: string;
        TXT_FONT_B: string;
        TXT_FONT_C: string;
        TXT_ALIGN_LT: string;
        TXT_ALIGN_CT: string;
        TXT_ALIGN_RT: string;
    };
    BARCODE_FORMAT: {
        BARCODE_TXT_OFF: string;
        BARCODE_TXT_ABV: string;
        BARCODE_TXT_BLW: string;
        BARCODE_TXT_BTH: string;
        BARCODE_FONT_A: string;
        BARCODE_FONT_B: string;
        BARCODE_HEIGHT: (height: any) => string;
        BARCODE_WIDTH: {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
        };
        BARCODE_HEIGHT_DEFAULT: string;
        BARCODE_WIDTH_DEFAULT: string;
        BARCODE_UPC_A: string;
        BARCODE_UPC_E: string;
        BARCODE_EAN13: string;
        BARCODE_EAN8: string;
        BARCODE_CODE39: string;
        BARCODE_ITF: string;
        BARCODE_NW7: string;
        BARCODE_CODE93: string;
        BARCODE_CODE128: string;
    };
    CODE2D_FORMAT: {
        TYPE_PDF417: string;
        TYPE_DATAMATRIX: string;
        TYPE_QR: string;
        CODE2D: string;
    };
    IMAGE_FORMAT: {
        S_RASTER_N: string;
        S_RASTER_2W: string;
        S_RASTER_2H: string;
        S_RASTER_Q: string;
    };
    BITMAP_FORMAT: {
        BITMAP_S8: string;
        BITMAP_D8: string;
        BITMAP_S24: string;
        BITMAP_D24: string;
    };
    GSV0_FORMAT: {
        GSV0_NORMAL: string;
        GSV0_DW: string;
        GSV0_DH: string;
        GSV0_DWDH: string;
    };
};
