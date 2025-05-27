import {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';

export const useKeyboard = () => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardWillShow', event => {
      setHeight(Platform.OS === 'ios' ? event.endCoordinates.height : 0);
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardWillHide', () => {
      setHeight(0);
    });

    return () => subscription.remove();
  }, []);

  return {height};
};
