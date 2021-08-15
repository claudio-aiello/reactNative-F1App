const NAMED_COLORS = {
  darkBlue: '#1D2329',
  grayBlue: '#2C343A',
  whiteFlash: '#EDF2F4',
  lightRed: '#EF233C',
  strongRed: '#DE1C16',
  lightGrayBlue: '#3C454C',
  lightGray: '#87939c',
  white: '#FFFFFF',
};

const THEME_COLORS = {
  ...NAMED_COLORS,

  // alias the named colors by use-case
  backgroundMain: NAMED_COLORS.darkBlue,
  backgroundLight: NAMED_COLORS.grayBlue,
  backgroundRed: NAMED_COLORS.strongRed,
  cardBackground: NAMED_COLORS.grayBlue,
  textTitle: NAMED_COLORS.white,
  textCaption: NAMED_COLORS.lightGray,
  textImportant: NAMED_COLORS.strongRed,
};

export default {
  ...THEME_COLORS,
};
