import {useEffect, useRef} from 'react';
import {useFlipper} from '@react-navigation/devtools';
import {
  DefaultTheme,
  Theme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};
const useAppWithNavigationStateController = () => {
  useEffect(() => {
    console.log('useEffect splash');
    SplashScreen.hide();
  }, []);
  const routeNameRef = useRef<string | undefined>('');
  const navigationRef = useNavigationContainerRef();
  useFlipper(navigationRef);

  const onReady = () => {
    if (navigationRef.current !== null) {
      routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
    }
  };

  const onStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (previousRouteName !== currentRouteName) {
      //analytics
      /*
      *  await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName
      });*/
    }

    routeNameRef.current = currentRouteName;
  };

  return {onReady, onStateChange, theme, ref: navigationRef};
};

export default useAppWithNavigationStateController;
