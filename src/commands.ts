export enum CMD {
  LF = '\x0A',
  ESC = '\x1B',
  FS = '\x1C',
  GS = '\x1D',
  US = '\x1F',
  FF = '\x0C',
  DLE = '\x10',
  DC1 = '\x11',
  DC4 = '\x14',
  EOT = '\x04',
  NUL = '\x00',
  EOL = '\n',
}

export enum FEED_CONTROL_SEQUENCES {
  LF = '\x0A', // Print and line feed
  FF = '\x0C', // Form feed
  CR = '\x0D', // Carriage return
  HT = '\x09', // Horizontal tab
  VT = '\x0B', // Vertical tab
}

export enum LINE_SPACING {
  DEFAULT = '\x1B\x32',
  SET = '\x1B\x33'
}

export enum HARDWARE {
  INIT = '\x1B\x40', // Clear data in buffer and reset modes
  SELECT = '\x1B\x3D\x01', // Printer select
  RESET = '\x1B\x3F\x0A\x00', // Reset printer hardware
}

export enum CASH_DRAWER {
  KICK_2 = '\x1B\x70\x00', // Sends a pulse to pin 2 []
  KICK_5 = '\x1B\x70\x01', // Sends a pulse to pin 5 []
}

export enum MARGINS {
  BOTTOM = '\x1B\x4F', // Fix bottom size
  LEFT = '\x1B\x6C', // Fix left size
  RIGHT = '\x1B\x51', // Fix right size
}


export enum PAPER_CUT {
  FULL = '\x1D\x56\x00', // Full cut paper
  PARTIAL = '\x1D\x56\x01', // Partial cut paper
  A = '\x1D\x56\x41', // Partial cut paper
  B = '\x1D\x56\x42', // Partial cut paper
}

export enum TEXT_SIZE {
  NORMAL = '\x1B\x21\x00',
  DOUBLE_HEIGHT = '\x1B\x21\x10',
  DOUBLE_WIDTH = '\x1B\x21\x20',
  DOUBLE_WIDTH_HEIGHT = '\x1B\x21\x30',
}

export enum TEXT_ALIGN {
  LEFT = '\x1B\x61\x00',
  CENTER = '\x1B\x61\x01',
  RIGHT = '\x1B\x61\x02',
}

export enum TEXT_STYLE {
  SET_FONT = '\x1B\x4D',
  SET_BOLD = '\x1B\x45',
  SET_UNDERLINE = '\x1B\x2D',

  UNDERL_OFF = '\x1B\x2D\x00', // Underline font OFF
  UNDERL_ON = '\x1B\x2D\x01', // Underline font 1-dot ON
  UNDERL2_ON = '\x1B\x2D\x02', // Underline font 2-dot ON
  BOLD_OFF = '\x1B\x45\x00', // Bold font OFF
  BOLD_ON = '\x1B\x45\x01', // Bold font ON
  ITALIC_OFF = '\x1B\x35', // Italic font ON
  ITALIC_ON = '\x1B\x34', // Italic font ON
}

export enum BARCODE {
  SET_FORMAT = '\x1D\x6B',
  SET_HEIGHT = '\x1D\x68',
  SET_WIDTH = '\x1D\x77',
  SET_FONT = '\x1D\x66',
  SET_HRI = '\x1D\x48',
}

export enum BARCODE_FORMAT {
  UPC_A = '\x00',
  UPC_E = '\x01',
  EAN13 = '\x02',
  EAN8 = '\x03',
  CODE39 = '\x04',
  ITF = '\x05',
  NW7 = '\x06',
  CODE93 = '\x48',
  CODE128 = '\x49',
}

export enum BARCODE_HRI {
  OFF = '\x00',
  ABOVE = '\x01',
  BELOW = '\x02',
  BOTH = '\x03',
}

export enum FONT {
  A = '\x00', // \x30
  B = '\x01', // \x31
  C = '\x02', // \x32
  D = '\x03', // \x33
  E = '\x04', // \x34
  A_SPECIAL = '\x61',
  B_SPECIAL = '\x62',
}


export enum IMAGE_FORMAT {
  S_RASTER_N = '\x1D\x76\x30\x00', // Set raster image normal size
  S_RASTER_2W = '\x1D\x76\x30\x01', // Set raster image double width
  S_RASTER_2H = '\x1D\x76\x30\x02', // Set raster image double height
  S_RASTER_Q = '\x1D\x76\x30\x03', // Set raster image quadruple
}

export enum CODE2D_FORMAT {
  TYPE_PDF417 = '\x1B\x5A\x00',
  TYPE_DATAMATRIX = '\x1B\x5A\x01',
  TYPE_QR = '\x1B\x5A\x02',
  CODE2D = '\x1B\x5A',
}

export enum BITMAP_FORMAT {
  BITMAP_S8 = '\x1B\x2A\x00',
  BITMAP_D8 = '\x1B\x2A\x01',
  BITMAP_S24 = '\x1B\x2A\x20',
  BITMAP_D24 = '\x1B\x2A\x21'
}

export enum GSV0_FORMAT {
  NORMAL = '\x1D\x76\x30\x00',
  DOUBLE_HEIGHT = '\x1D\x76\x30\x01',
  DOUBLE_WIDTH = '\x1D\x76\x30\x02',
  DOUBLE_WIDTH_HEIGHT = '\x1D\x76\x30\x03'
}
