import {FC, useCallback, useMemo} from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors, FontsTypes} from 'assets';
import {useKeyboard} from 'common/hooks';
import * as Progress from 'react-native-progress';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Text} from './Text';

export type Props = {
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  color?: ColorValue;
  font?: FontsTypes;
  text: string;
  active?: boolean;
  disabled?: boolean;
  onPress: () => void;
};
export const Button: FC<Props> = ({
  active = true,
  disabled = false,
  font = 'SF22',
  loading = false,
  onPress,
  style,
  color,
  text,
}) => {
  const insets = useSafeAreaInsets();
  const {height} = useKeyboard();

  const calculatedStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      marginBottom: height + (insets.bottom ? insets.bottom / 2 : 0),
    }),
    [height, insets.bottom],
  );

  const onPressButton = useCallback(() => {
    if (!disabled && active) {
      onPress && onPress();
    }
  }, [active, disabled, onPress]);

  return (
    <View style={[style, calculatedStyle]}>
      <TouchableOpacity
        style={[
          styles.touchable,
          color && {backgroundColor: color},
          disabled && styles.disabled,
        ]}
        onPress={onPressButton}>
        {loading ? (
          <Progress.CircleSnail color={['#DEDEDE', 'white']} />
        ) : (
          <Text font={font} color={'white'}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  disabled: {backgroundColor: colors.grey_1},
  touchable: {
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 15,
    flexBasis: 55,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
