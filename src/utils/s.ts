import {Platform, StyleSheet} from 'react-native';

const font2 = {
  light: {
    ios: 'SFPRODISPLAYLIGHT',
    android: 'SFPRODISPLAYLIGHT',
  },
  regular: {
    ios: 'Space Grotesk',
    android: 'SpaceGrotesk-Regular',
  },
  medium: {
    ios: 'Space Grotesk',
    android: 'SpaceGrotesk-Medium',
  },
  semibold: {
    ios: 'Space Grotesk',
    android: 'SpaceGrotesk-SemiBold',
  },
  bold: {
    ios: 'Space Grotesk',
    android: 'SpaceGrotesk-Bold',
  },
};
const font = {
  light: {
    ios: 'Space Grotesk',
    android: 'SpaceGrotesk-Light',
  },
  regular: {
    ios: 'Space Grotesk',
    android: 'SpaceGrotesk-Regular',
  },
  medium: {
    ios: 'Space Grotesk',
    android: 'SpaceGrotesk-Medium',
  },
  semibold: {
    ios: 'Space Grotesk',
    android: 'SpaceGrotesk-SemiBold',
  },
  bold: {
    ios: 'Space Grotesk',
    android: 'SpaceGrotesk-Bold',
  },
};

export const s = StyleSheet.create({
  light: {
    fontFamily: Platform.select({
      ios: font.light.ios,
      android: font.light.android,
    }),
    fontWeight: '300',
  },
  regular: {
    fontFamily: Platform.select({
      ios: font.regular.ios,
      android: font.regular.android,
    }),
    fontWeight: '400',
  },
  medium: {
    fontFamily: Platform.select({
      ios: font.medium.ios,
      android: font.medium.android,
    }),
    fontWeight: '500',
  },
  semibold: {
    fontFamily: Platform.select({
      ios: font.semibold.ios,
      android: font.semibold.android,
    }),
    fontWeight: '600',
  },
  bold: {
    fontFamily: Platform.select({
      ios: font.bold.ios,
      android: font.bold.android,
    }),
    fontWeight: '700',
  },
});
export const s2 = StyleSheet.create({
  light: {
    fontFamily: Platform.select({
      ios: font2.light.ios,
      android: font2.light.android,
    }),
    fontWeight: '300',
  },
  regular: {
    fontFamily: Platform.select({
      ios: font.regular.ios,
      android: font.regular.android,
    }),
    fontWeight: '400',
  },
  medium: {
    fontFamily: Platform.select({
      ios: font.medium.ios,
      android: font.medium.android,
    }),
    fontWeight: '500',
  },
  semibold: {
    fontFamily: Platform.select({
      ios: font.semibold.ios,
      android: font.semibold.android,
    }),
    fontWeight: '600',
  },
  bold: {
    fontFamily: Platform.select({
      ios: font.bold.ios,
      android: font.bold.android,
    }),
    fontWeight: '700',
  },
});
