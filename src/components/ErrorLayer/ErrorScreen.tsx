import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from 'assets';
import {Button, Text} from 'common/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FallbackComponentProps} from './ErrorBoundary';

const ErrorScreen: FC<FallbackComponentProps> = ({error, resetError}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.content}>
        <Text font={'SF22'} color={'black'} style={styles.text}>
          {`${error.name}: ${error.message}`}
        </Text>
        <Button text={'Go back'} onPress={resetError} style={styles.button} />
      </View>
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  button: {width: '100%'},
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 35,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
  },
});
