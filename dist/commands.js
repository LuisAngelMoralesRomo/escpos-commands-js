"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CMD;
(function (CMD) {
    CMD["LF"] = "\n";
    CMD["ESC"] = "\u001B";
    CMD["FS"] = "\u001C";
    CMD["GS"] = "\u001D";
    CMD["US"] = "\u001F";
    CMD["FF"] = "\f";
    CMD["DLE"] = "\u0010";
    CMD["DC1"] = "\u0011";
    CMD["DC4"] = "\u0014";
    CMD["EOT"] = "\u0004";
    CMD["NUL"] = "\0";
    CMD["EOL"] = "\n";
})(CMD = exports.CMD || (exports.CMD = {}));
var CONTROL_CMD;
(function (CONTROL_CMD) {
    CONTROL_CMD["LF"] = "\n";
    CONTROL_CMD["FF"] = "\f";
    CONTROL_CMD["CR"] = "\r";
    CONTROL_CMD["HT"] = "\t";
    CONTROL_CMD["VT"] = "\v";
})(CONTROL_CMD = exports.CONTROL_CMD || (exports.CONTROL_CMD = {}));
var TEXT_CMD;
(function (TEXT_CMD) {
    TEXT_CMD["SET_FORMAT"] = "\u001B!";
    TEXT_CMD["SET_SIZE"] = "\u001D!";
    TEXT_CMD["SET_UNDERLINE"] = "\u001B-";
    TEXT_CMD["SET_FONT"] = "\u001BM";
    TEXT_CMD["SET_BOLD"] = "\u001BE";
    TEXT_CMD["SET_ALIGN"] = "\u001Ba";
})(TEXT_CMD = exports.TEXT_CMD || (exports.TEXT_CMD = {}));
var ALIGN;
(function (ALIGN) {
    ALIGN["LEFT"] = "\0";
    ALIGN["CENTER"] = "\u0001";
    ALIGN["RIGHT"] = "\u0002";
})(ALIGN = exports.ALIGN || (exports.ALIGN = {}));
var LINE_SPACING;
(function (LINE_SPACING) {
    LINE_SPACING["DEFAULT"] = "\u001B2";
    LINE_SPACING["SET"] = "\u001B3";
})(LINE_SPACING = exports.LINE_SPACING || (exports.LINE_SPACING = {}));
var HARDWARE;
(function (HARDWARE) {
    HARDWARE["INIT"] = "\u001B@";
    HARDWARE["SELECT"] = "\u001B=\u0001";
    HARDWARE["RESET"] = "\u001B?\n\0";
})(HARDWARE = exports.HARDWARE || (exports.HARDWARE = {}));
var CASH_DRAWER;
(function (CASH_DRAWER) {
    CASH_DRAWER["KICK_2"] = "\u001Bp\0";
    CASH_DRAWER["KICK_5"] = "\u001Bp\u0001";
})(CASH_DRAWER = exports.CASH_DRAWER || (exports.CASH_DRAWER = {}));
var MARGINS;
(function (MARGINS) {
    MARGINS["BOTTOM"] = "\u001BO";
    MARGINS["LEFT"] = "\u001Bl";
    MARGINS["RIGHT"] = "\u001BQ";
})(MARGINS = exports.MARGINS || (exports.MARGINS = {}));
var PAPER_CUT;
(function (PAPER_CUT) {
    PAPER_CUT["FULL"] = "\u001DV\0";
    PAPER_CUT["PARTIAL"] = "\u001DV\u0001";
    PAPER_CUT["FULL_FEED"] = "\u001DVA\0";
    PAPER_CUT["PARTIAL_FEED"] = "\u001DVB\0";
    PAPER_CUT["FULL_MOVE"] = "\u001DVa\0";
    PAPER_CUT["PARTIAL_MOVE"] = "\u001DVb\0";
    PAPER_CUT["FULL_RETURN"] = "\u001DVg\0";
    PAPER_CUT["PARTIAL_RETURN"] = "\u001DVh\0";
})(PAPER_CUT = exports.PAPER_CUT || (exports.PAPER_CUT = {}));
var TEXT_STYLE;
(function (TEXT_STYLE) {
    TEXT_STYLE["ITALIC_OFF"] = "\u001B5";
    TEXT_STYLE["ITALIC_ON"] = "\u001B4";
})(TEXT_STYLE = exports.TEXT_STYLE || (exports.TEXT_STYLE = {}));
var BARCODE;
(function (BARCODE) {
    BARCODE["SET_FORMAT"] = "\u001Dk";
    BARCODE["SET_HEIGHT"] = "\u001Dh";
    BARCODE["SET_WIDTH"] = "\u001Dw";
    BARCODE["SET_FONT"] = "\u001Df";
    BARCODE["SET_HRI"] = "\u001DH";
})(BARCODE = exports.BARCODE || (exports.BARCODE = {}));
var BARCODE_FORMAT;
(function (BARCODE_FORMAT) {
    BARCODE_FORMAT["UPC_A"] = "\0";
    BARCODE_FORMAT["UPC_E"] = "\u0001";
    BARCODE_FORMAT["EAN13"] = "\u0002";
    BARCODE_FORMAT["EAN8"] = "\u0003";
    BARCODE_FORMAT["CODE39"] = "\u0004";
    BARCODE_FORMAT["ITF"] = "\u0005";
    BARCODE_FORMAT["NW7"] = "\u0006";
    BARCODE_FORMAT["B_UPC_A"] = "A";
    BARCODE_FORMAT["B_UPC_E"] = "B";
    BARCODE_FORMAT["B_EAN13"] = "C";
    BARCODE_FORMAT["B_EAN8"] = "D";
    BARCODE_FORMAT["B_CODE39"] = "E";
    BARCODE_FORMAT["B_ITF"] = "F";
    BARCODE_FORMAT["CODABAR"] = "G";
    BARCODE_FORMAT["CODE93"] = "H";
    BARCODE_FORMAT["CODE128"] = "I";
    BARCODE_FORMAT["GS1_128"] = "J";
    BARCODE_FORMAT["GS1_DATABAR_OMNIDIRECTIONAL"] = "K";
    BARCODE_FORMAT["GS1_DATABAR_TRUNCATED"] = "L";
    BARCODE_FORMAT["GS1_DATABAR_LIMITED"] = "M";
    BARCODE_FORMAT["GS1_DATABAR_EXPANDED"] = "N";
})(BARCODE_FORMAT = exports.BARCODE_FORMAT || (exports.BARCODE_FORMAT = {}));
var BARCODE_HRI;
(function (BARCODE_HRI) {
    BARCODE_HRI["OFF"] = "\0";
    BARCODE_HRI["ABOVE"] = "\u0001";
    BARCODE_HRI["BELOW"] = "\u0002";
    BARCODE_HRI["BOTH"] = "\u0003";
})(BARCODE_HRI = exports.BARCODE_HRI || (exports.BARCODE_HRI = {}));
var FONT;
(function (FONT) {
    FONT["A"] = "\0";
    FONT["B"] = "\u0001";
    FONT["C"] = "\u0002";
    FONT["D"] = "\u0003";
    FONT["E"] = "\u0004";
    FONT["A_SPECIAL"] = "a";
    FONT["B_SPECIAL"] = "b";
})(FONT = exports.FONT || (exports.FONT = {}));
var QR;
(function (QR) {
    QR["SET_MODEL"] = "\u001D(k\u0004\x001A";
    QR["SET_SIZE"] = "\u001D(k\u0003\x001C";
    QR["SET_ERROR"] = "\u001D(k\u0003\x001E";
    QR["SET_LENGTH"] = "\u001D(k";
    QR["SET_DATA"] = "1P0";
    QR["PRINT"] = "\u001D(k\u0003\x001Q0";
})(QR = exports.QR || (exports.QR = {}));
var QR_MODEL;
(function (QR_MODEL) {
    QR_MODEL["MODEL_1"] = "1";
    QR_MODEL["MODEL_2"] = "2";
    QR_MODEL["MICRO"] = "3";
})(QR_MODEL = exports.QR_MODEL || (exports.QR_MODEL = {}));
var QR_CORRECTION_LEVEL;
(function (QR_CORRECTION_LEVEL) {
    QR_CORRECTION_LEVEL["LOW"] = "0";
    QR_CORRECTION_LEVEL["MEDIUM"] = "1";
    QR_CORRECTION_LEVEL["QUARTILE"] = "2";
    QR_CORRECTION_LEVEL["HIGH"] = "3";
})(QR_CORRECTION_LEVEL = exports.QR_CORRECTION_LEVEL || (exports.QR_CORRECTION_LEVEL = {}));
