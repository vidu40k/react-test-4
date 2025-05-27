import {FC, useCallback} from 'react';
import {
  Image,
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {images} from 'assets';
import {hitSlop} from 'common/constants';

type Props = {
  style?: StyleProp<ViewStyle>;
  icon?: number;
};
export const BackButton: FC<Props> = ({style, icon}) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    Keyboard.dismiss();
    navigation.goBack();
  }, [navigation]);

  return (
    <TouchableOpacity
      hitSlop={hitSlop}
      onPress={onPress}
      style={[styles.container, style]}>
      <Image style={styles.image} source={icon || images.icon_back} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    margin: 20,
  },
  image: {height: 25, width: 25},
});
