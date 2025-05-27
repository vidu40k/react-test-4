import {StyleSheet} from 'react-native';
export const fonts = StyleSheet.create({
  SF13: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 15.51,
  },
  SF17: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 20.29,
  },
  SF22: {
    fontFamily: 'SFUIDisplay-Medium',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26.25,
  },
  SF24: {
    fontFamily: 'SFUIDisplay-Semibold',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 29,
  },
  SF34: {
    fontFamily: 'SFUIDisplay-Semibold',
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
  },
});

export type FontsTypes = keyof typeof fonts;
