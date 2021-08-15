import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const LAYOUT_SIZES = {
  baseMargin: 14, 
  basePadding: 14,
  sectionMargin: 30,
  sectionPadding: 26,
  heraderTopPadding: 30,
  deviceWidth: width,
  deviceHeight: height
}

export default {
  ...LAYOUT_SIZES
}