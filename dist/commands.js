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
var FEED_CONTROL_SEQUENCES;
(function (FEED_CONTROL_SEQUENCES) {
    FEED_CONTROL_SEQUENCES["LF"] = "\n";
    FEED_CONTROL_SEQUENCES["FF"] = "\f";
    FEED_CONTROL_SEQUENCES["CR"] = "\r";
    FEED_CONTROL_SEQUENCES["HT"] = "\t";
    FEED_CONTROL_SEQUENCES["VT"] = "\v";
})(FEED_CONTROL_SEQUENCES = exports.FEED_CONTROL_SEQUENCES || (exports.FEED_CONTROL_SEQUENCES = {}));
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
    PAPER_CUT["A"] = "\u001DVA";
    PAPER_CUT["B"] = "\u001DVB";
})(PAPER_CUT = exports.PAPER_CUT || (exports.PAPER_CUT = {}));
var TEXT_SIZE;
(function (TEXT_SIZE) {
    TEXT_SIZE["NORMAL"] = "\u001B!\0";
    TEXT_SIZE["DOUBLE_HEIGHT"] = "\u001B!\u0010";
    TEXT_SIZE["DOUBLE_WIDTH"] = "\u001B! ";
    TEXT_SIZE["DOUBLE_WIDTH_HEIGHT"] = "\u001B!0";
})(TEXT_SIZE = exports.TEXT_SIZE || (exports.TEXT_SIZE = {}));
var TEXT_ALIGN;
(function (TEXT_ALIGN) {
    TEXT_ALIGN["LEFT"] = "\u001Ba\0";
    TEXT_ALIGN["CENTER"] = "\u001Ba\u0001";
    TEXT_ALIGN["RIGHT"] = "\u001Ba\u0002";
})(TEXT_ALIGN = exports.TEXT_ALIGN || (exports.TEXT_ALIGN = {}));
var TEXT_STYLE;
(function (TEXT_STYLE) {
    TEXT_STYLE["SET_FONT"] = "\u001BM";
    TEXT_STYLE["SET_BOLD"] = "\u001BE";
    TEXT_STYLE["SET_UNDERLINE"] = "\u001B-";
    TEXT_STYLE["UNDERL_OFF"] = "\u001B-\0";
    TEXT_STYLE["UNDERL_ON"] = "\u001B-\u0001";
    TEXT_STYLE["UNDERL2_ON"] = "\u001B-\u0002";
    TEXT_STYLE["BOLD_OFF"] = "\u001BE\0";
    TEXT_STYLE["BOLD_ON"] = "\u001BE\u0001";
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
    BARCODE_FORMAT["CODE93"] = "H";
    BARCODE_FORMAT["CODE128"] = "I";
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
var IMAGE_FORMAT;
(function (IMAGE_FORMAT) {
    IMAGE_FORMAT["S_RASTER_N"] = "\u001Dv0\0";
    IMAGE_FORMAT["S_RASTER_2W"] = "\u001Dv0\u0001";
    IMAGE_FORMAT["S_RASTER_2H"] = "\u001Dv0\u0002";
    IMAGE_FORMAT["S_RASTER_Q"] = "\u001Dv0\u0003";
})(IMAGE_FORMAT = exports.IMAGE_FORMAT || (exports.IMAGE_FORMAT = {}));
var CODE2D_FORMAT;
(function (CODE2D_FORMAT) {
    CODE2D_FORMAT["TYPE_PDF417"] = "\u001BZ\0";
    CODE2D_FORMAT["TYPE_DATAMATRIX"] = "\u001BZ\u0001";
    CODE2D_FORMAT["TYPE_QR"] = "\u001BZ\u0002";
    CODE2D_FORMAT["CODE2D"] = "\u001BZ";
})(CODE2D_FORMAT = exports.CODE2D_FORMAT || (exports.CODE2D_FORMAT = {}));
var BITMAP_FORMAT;
(function (BITMAP_FORMAT) {
    BITMAP_FORMAT["BITMAP_S8"] = "\u001B*\0";
    BITMAP_FORMAT["BITMAP_D8"] = "\u001B*\u0001";
    BITMAP_FORMAT["BITMAP_S24"] = "\u001B* ";
    BITMAP_FORMAT["BITMAP_D24"] = "\u001B*!";
})(BITMAP_FORMAT = exports.BITMAP_FORMAT || (exports.BITMAP_FORMAT = {}));
var GSV0_FORMAT;
(function (GSV0_FORMAT) {
    GSV0_FORMAT["NORMAL"] = "\u001Dv0\0";
    GSV0_FORMAT["DOUBLE_HEIGHT"] = "\u001Dv0\u0001";
    GSV0_FORMAT["DOUBLE_WIDTH"] = "\u001Dv0\u0002";
    GSV0_FORMAT["DOUBLE_WIDTH_HEIGHT"] = "\u001Dv0\u0003";
})(GSV0_FORMAT = exports.GSV0_FORMAT || (exports.GSV0_FORMAT = {}));
