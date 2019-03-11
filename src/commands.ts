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

export enum CONTROL_CMD {
  LF = '\x0A', // Print and line feed
  FF = '\x0C', // Form feed
  CR = '\x0D', // Carriage return
  HT = '\x09', // Horizontal tab
  VT = '\x0B', // Vertical tab
}

export enum TEXT_CMD {
  SET_FORMAT = '\x1B\x21',
  SET_SIZE = '\x1D\x21',
  SET_UNDERLINE = '\x1B\x2D',
  SET_FONT = '\x1B\x4D',
  SET_BOLD = '\x1B\x45',
  SET_ALIGN = '\x1B\x61',
}

export enum ALIGN {
  LEFT = '\x00',
  CENTER = '\x01',
  RIGHT = '\x02',
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
  KICK_2 = '\x1B\x70\x00',
  KICK_5 = '\x1B\x70\x01',
}

export enum MARGINS {
  BOTTOM = '\x1B\x4F',
  LEFT = '\x1B\x6C',
  RIGHT = '\x1B\x51',
}


export enum PAPER_CUT {
  FULL = '\x1D\x56\x00',
  PARTIAL = '\x1D\x56\x01',
  FULL_FEED = '\x1D\x56\x41\x00',
  PARTIAL_FEED = '\x1D\x56\x42\x00',
  FULL_MOVE = '\x1D\x56\x61\x00',
  PARTIAL_MOVE = '\x1D\x56\x62\x00',
  FULL_RETURN = '\x1D\x56\x67\x00',
  PARTIAL_RETURN = '\x1D\x56\x68\x00',
}

export enum TEXT_STYLE {
  ITALIC_OFF = '\x1B\x35',
  ITALIC_ON = '\x1B\x34',
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

  B_UPC_A = '\x41',
  B_UPC_E = '\x42',
  B_EAN13 = '\x43',
  B_EAN8 = '\x44',
  B_CODE39 = '\x45',
  B_ITF = '\x46',
  CODABAR = '\x47',
  CODE93 = '\x48',
  CODE128 = '\x49',
  GS1_128 = '\x4A',
  GS1_DATABAR_OMNIDIRECTIONAL = '\x4B',
  GS1_DATABAR_TRUNCATED = '\x4C',
  GS1_DATABAR_LIMITED = '\x4D',
  GS1_DATABAR_EXPANDED = '\x4E',
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

export enum QR {
  SET_MODEL = '\x1D\x28\x6B\x04\x00\x31\x41',
  SET_SIZE = '\x1D\x28\x6B\x03\x00\x31\x43',
  SET_ERROR = '\x1D\x28\x6B\x03\x00\x31\x45',
  SET_LENGTH = '\x1d\x28\x6b',
  SET_DATA = '\x31\x50\x30',
  PRINT = '\x1d\x28\x6b\x03\x00\x31\x51\x30'
}

export enum QR_MODEL {
  MODEL_1 = '\x31',
  MODEL_2 = '\x32',
  MICRO = '\x33',
}

export enum QR_CORRECTION_LEVEL {
  LOW = '\x30',
  MEDIUM = '\x31',
  QUARTILE = '\x32',
  HIGH = '\x33',
}

