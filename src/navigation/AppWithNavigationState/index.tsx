import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from 'assets';
import useAppWithNavigationStateController from 'navigation/AppWithNavigationState/controller';
import MainNavigator from 'navigation/MainNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';

const AppWithNavigationState = () => {
  const {ref, theme, onStateChange, onReady} =
    useAppWithNavigationStateController();
  return (
    <NavigationContainer
      theme={theme}
      ref={ref}
      onReady={onReady}
      onStateChange={onStateChange}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <MainNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppWithNavigationState;
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
