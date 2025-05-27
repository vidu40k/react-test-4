import {FC, ReactNode} from 'react';
import {Keyboard, Pressable, StyleProp, ViewStyle} from 'react-native';

type Props = {
  style: StyleProp<ViewStyle>;
  children: ReactNode;
};
export const Wrapper: FC<Props> = ({style, children}) => (
  <Pressable style={style} onPress={Keyboard.dismiss}>
    {children}
  </Pressable>
);
