import {FC} from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {colors, fonts, ColorTypes, FontsTypes} from 'assets';

type Props = TextProps & {
  color?: ColorTypes;
  font?: FontsTypes;
};

export const Text: FC<Props> = props => (
  <RNText
    {...props}
    style={[
      props.style,
      props.color && {color: colors[props.color]},
      props.font && fonts[props.font],
    ]}
  />
);
